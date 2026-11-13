'use client';

import {useEffect, useState} from 'react';
import {inr} from '@/lib/format';

const api = (u, m = 'GET', b) =>
  fetch(u, {
    method: m,
    body: b && (b instanceof FormData ? b : JSON.stringify(b))
  }).then(r => r.json());

function IconRefresh({size=14, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 4}}>
      <path d="M23 4v6h-6"></path>
      <path d="M1 20v-6h6"></path>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );
}

function IconDownload({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}

function IconArrowUpRight({size=14, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: 2}}>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

export default function Panel() {
  const [tab, setTab] = useState('overview');
  const [orders, setO] = useState([]);
  const [prods, setP] = useState([]);
  const [cps, setC] = useState([]);
  const [edit, setE] = useState(null);
  const [resendingId, setResendingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all'); // 'all' | 'cod' | 'online' | 'success' | 'failed'

  const load = async () => {
    setLoading(true);
    try {
      const [o, p, c] = await Promise.all([
        api('/api/admin/orders'),
        api('/api/admin/products'),
        api('/api/admin/coupons')
      ]);
      setO(o || []);
      setP(p || []);
      setC(c || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const paid = orders.filter(
    o => o.payment_status === 'paid' || (o.payment_mode === 'cod' && o.status === 'delivered')
  );
  const rev = paid.reduce((a, o) => a + o.total, 0);

  const successfulCount = orders.filter(o => o.qikink_status === 'sent').length;
  const codCount = orders.filter(o => o.payment_mode === 'cod').length;
  const onlineCount = orders.filter(o => o.payment_mode === 'online').length;
  const failedCount = orders.filter(o => o.qikink_status?.startsWith('failed')).length;

  const filteredOrders = orders.filter(o => {
    const matchesSearch = !search ||
      o.number?.toLowerCase().includes(search.toLowerCase()) ||
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone?.includes(search) ||
      o.email?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (orderFilter === 'cod') return o.payment_mode === 'cod';
    if (orderFilter === 'online') return o.payment_mode === 'online';
    if (orderFilter === 'success') return o.qikink_status === 'sent';
    if (orderFilter === 'failed') return o.qikink_status?.startsWith('failed');
    return true;
  });

  const exportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Email', 'Phone', 'Total (INR)', 'Payment Mode', 'Payment Status', 'Fulfillment Status', 'Qikink Status'];
    const rows = orders.map(o => [
      o.number,
      new Date(o.created_at).toLocaleString(),
      `"${o.name}"`,
      o.email,
      o.phone,
      o.total,
      o.payment_mode,
      o.payment_status,
      o.status,
      `"${o.qikink_status || ''}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${Date.now()}.csv`;
    a.click();
  };

  const T = ({id, children}) => (
    <button className={'chip' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>
      {children}
    </button>
  );

  async function save(e) {
    e.preventDefault();
    const r = await api('/api/admin/products', 'POST', new FormData(e.target));
    if (r.error) alert(r.error);
    else {
      setE(null);
      load();
    }
  }

  async function cp(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    await api('/api/admin/coupons', 'POST', f);
    e.target.reset();
    load();
  }

  return (
    <div className="wrap" style={{padding: '32px 16px'}}>
      <div className="row" style={{marginBottom: 24, gap: 16, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.4rem)'}}>Admin Dashboard</h1>
          <button
            className="btn ghost"
            onClick={load}
            disabled={loading}
            style={{padding: '6px 12px', fontSize: '0.85rem'}}
          >
            {loading ? 'Refreshing…' : <><IconRefresh /> Refresh</>}
          </button>
        </div>
        <div className="chips" style={{gap: 8, flexWrap: 'wrap'}}>
          <T id="overview">Overview</T>
          <T id="orders">Orders {orderFilter !== 'all' && `(${orderFilter})`}</T>
          <T id="products">Products</T>
          <T id="coupons">Coupons</T>
        </div>
      </div>

      {tab === 'overview' && (
        <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16}}>
          <div className="box" style={{padding: 20}}>
            <small style={{color: 'var(--mute)'}}>Revenue (paid)</small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4}}>{inr(rev)}</h2>
          </div>
          <div
            className="box"
            style={{padding: 20, cursor: 'pointer', transition: 'transform 0.15s'}}
            onClick={() => { setOrderFilter('all'); setTab('orders'); }}
            title="Click to view all orders"
          >
            <small style={{color: 'var(--mute)'}}>Total Orders <IconArrowUpRight /></small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4}}>{orders.length}</h2>
          </div>
          <div
            className="box"
            style={{padding: 20, cursor: 'pointer', transition: 'transform 0.15s', background: '#f4fbf7'}}
            onClick={() => { setOrderFilter('success'); setTab('orders'); }}
            title="Click to view successful Qikink orders"
          >
            <small style={{color: '#2e7d32'}}>Successful Orders <IconArrowUpRight color="#2e7d32" /></small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4, color: '#2e7d32'}}>{successfulCount}</h2>
          </div>
          <div
            className="box"
            style={{padding: 20, cursor: 'pointer', transition: 'transform 0.15s', background: '#f0f4ff'}}
            onClick={() => { setOrderFilter('online'); setTab('orders'); }}
            title="Click to view online prepaid orders"
          >
            <small style={{color: 'var(--blue)'}}>Online Orders <IconArrowUpRight color="var(--blue)" /></small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4, color: 'var(--blue)'}}>{onlineCount}</h2>
          </div>
          <div
            className="box"
            style={{padding: 20, cursor: 'pointer', transition: 'transform 0.15s'}}
            onClick={() => { setOrderFilter('cod'); setTab('orders'); }}
            title="Click to view COD orders"
          >
            <small style={{color: 'var(--mute)'}}>COD Orders <IconArrowUpRight /></small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4}}>{codCount}</h2>
          </div>
          <div
            className="box"
            style={{padding: 20, cursor: 'pointer', transition: 'transform 0.15s', background: '#fdf4f4'}}
            onClick={() => { setOrderFilter('failed'); setTab('orders'); }}
            title="Click to view Qikink failures"
          >
            <small style={{color: '#d93838'}}>Qikink Failures <IconArrowUpRight color="#d93838" /></small>
            <h2 style={{fontSize: '1.5rem', marginTop: 4, color: '#d93838'}}>{failedCount}</h2>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <>
          <div style={{marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'}}>
            <input
              placeholder="Search orders by number, name, email, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{flex: '1 1 240px', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--line)', background: '#fff', fontSize: '0.95rem'}}
            />
            <select
              value={orderFilter}
              onChange={e => setOrderFilter(e.target.value)}
              style={{
                width: 'auto',
                minWidth: 230,
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid var(--line)',
                background: '#fff',
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: 'var(--ink)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
            >
              <option value="all">All Filters</option>
              <option value="success">Successful (Qikink Sent)</option>
              <option value="online">Online / Prepaid Orders</option>
              <option value="cod">COD Orders</option>
              <option value="failed">Qikink Failures</option>
            </select>
            <button className="btn ghost" onClick={exportCSV} style={{padding: '12px 20px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0}}>
              <IconDownload /> Export CSV
            </button>
          </div>

          <div style={{overflowX: 'auto', background: '#fff', borderRadius: 16, border: '1px solid var(--line)'}}>
            <table style={{minWidth: 640}}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Qikink Status / Tracking</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => (
                  <tr key={o.id}>
                    <td><b>{o.number}</b></td>
                    <td>
                      {o.name}
                      <br />
                      <small style={{color: 'var(--mute)'}}>{o.phone} · {o.email}</small>
                    </td>
                    <td>{inr(o.total)}</td>
                    <td>
                      {o.payment_mode} · {o.payment_status}
                    </td>
                    <td>
                      <span style={{color: o.qikink_status?.startsWith('failed') ? '#d93838' : '#2e7d32', fontWeight: o.qikink_status === 'sent' ? 600 : 400}}>
                        {o.qikink_status || '-'}
                      </span>
                      {o.tracking_url && (
                        <>
                          <br />
                          <a href={o.tracking_url} target="_blank" rel="noreferrer" style={{fontSize: '0.8rem', color: 'var(--blue)'}}>
                            Track Shipment <IconArrowUpRight size={10} />
                          </a>
                        </>
                      )}
                    </td>
                    <td>
                      <select
                        value={o.status}
                        onChange={async e => {
                          await api('/api/admin/orders', 'PATCH', {
                            id: o.id,
                            status: e.target.value
                          });
                          load();
                        }}
                        style={{padding: '6px 10px', fontSize: '0.85rem'}}
                      >
                        {['placed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="link"
                        disabled={resendingId === o.id}
                        onClick={async () => {
                          setResendingId(o.id);
                          await api('/api/admin/orders', 'PATCH', {
                            id: o.id,
                            retryQikink: true
                          });
                          setResendingId(null);
                          load();
                        }}
                      >
                        {resendingId === o.id ? 'Resending…' : 'Resend Qikink'}
                      </button>
                      {o.payment_mode === 'cod' && o.payment_status !== 'paid' && (
                        <>
                          <br />
                          <button
                            className="link"
                            onClick={async () => {
                              await api('/api/admin/orders', 'PATCH', {
                                id: o.id,
                                cod_paid: true
                              });
                              load();
                            }}
                          >
                            Mark COD paid
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {!filteredOrders.length && (
                  <tr>
                    <td colSpan="7" style={{textAlign: 'center', padding: 24, color: 'var(--mute)'}}>
                      No orders found matching your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'products' && (
        <>
          <button className="btn" onClick={() => { setE({}); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            + Add New Mug
          </button>

          {edit && (
            <form className="box form" style={{margin: '20px 0', padding: 20}} onSubmit={save}>
              <input type="hidden" name="id" defaultValue={edit.id || ''} />
              <div className="f2">
                <input name="name" required placeholder="Product Name" defaultValue={edit.name} />
                <input name="slug" required placeholder="slug-like-this" defaultValue={edit.slug} />
              </div>
              <textarea name="description" placeholder="Product Description" defaultValue={edit.description} rows={3} />
              <div className="f2">
                <input name="category" placeholder="Category" defaultValue={edit.category} />
                <input name="qikink_sku" placeholder="Qikink SKU" defaultValue={edit.qikink_sku || 'UMCM-Wh-11oz Black'} />
              </div>
              <div className="f2">
                <input name="price" type="number" required placeholder="Price ₹" defaultValue={edit.price} />
                <input name="compare_price" type="number" placeholder="Compare-at price ₹" defaultValue={edit.compare_price} />
              </div>
              <label style={{fontSize: '0.9rem', fontWeight: 600}}>
                Mockup images (first is cover)
                <input name="files" type="file" accept="image/*" multiple style={{marginTop: 6}} />
              </label>
              <input name="design_url" placeholder="Print-ready design URL" defaultValue={edit.design_url} />
              <div style={{display: 'flex', gap: 16, margin: '8px 0'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.9rem'}}>
                  <input type="checkbox" name="active" style={{width: 'auto'}} defaultChecked={edit.active ?? true} /> Active
                </label>
                <label style={{display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.9rem'}}>
                  <input type="checkbox" name="featured" style={{width: 'auto'}} defaultChecked={edit.featured} /> Featured
                </label>
              </div>
              <div style={{display: 'flex', gap: 10, marginTop: 12}}>
                <button className="btn" style={{padding: '10px 24px'}}>Save Product</button>
                <button type="button" className="btn ghost" onClick={() => setE(null)} style={{padding: '10px 24px'}}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div style={{overflowX: 'auto', background: '#fff', borderRadius: 16, border: '1px solid var(--line)', marginTop: 20}}>
            <table style={{minWidth: 540}}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100'}
                        alt={p.name}
                        style={{width: 42, height: 42, objectFit: 'cover', borderRadius: 8, background: '#eee'}}
                      />
                    </td>
                    <td><b>{p.name}</b></td>
                    <td>{p.category}</td>
                    <td>{inr(p.price)}</td>
                    <td>{p.active ? 'Live' : 'Hidden'}</td>
                    <td>
                      <button className="link" onClick={() => { setE(p); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                        Edit
                      </button>{' '}
                      ·{' '}
                      <button
                        className="link"
                        onClick={async () => {
                          if (confirm('Delete this product?')) {
                            await api('/api/admin/products', 'DELETE', {id: p.id});
                            load();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'coupons' && (
        <>
          <form className="form f2" style={{marginBottom: 20, background: '#fff', padding: 20, borderRadius: 16, border: '1px solid var(--line)'}} onSubmit={cp}>
            <input name="code" required placeholder="COUPON CODE" />
            <select name="type">
              <option value="percent">Percent off (%)</option>
              <option value="flat">Flat ₹ off</option>
            </select>
            <input name="value" type="number" required placeholder="Discount Value" />
            <input name="min_order" type="number" placeholder="Min Order ₹" />
            <button className="btn" style={{gridColumn: '1 / -1', padding: '12px'}}>
              Save Coupon
            </button>
          </form>

          <div style={{overflowX: 'auto', background: '#fff', borderRadius: 16, border: '1px solid var(--line)'}}>
            <table style={{minWidth: 440}}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Min Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cps.map(c => (
                  <tr key={c.label || c.code}>
                    <td><b>{c.code}</b></td>
                    <td>{c.type === 'percent' ? c.value + '%' : inr(c.value)}</td>
                    <td>min {inr(c.min_order || 0)}</td>
                    <td>
                      <button
                        className="link"
                        onClick={async () => {
                          await api('/api/admin/coupons', 'DELETE', {code: c.code});
                          load();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
