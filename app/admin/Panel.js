'use client';

import {useEffect, useState} from 'react';
import {inr} from '@/lib/format';

const api = (u, m = 'GET', b) =>
  fetch(u, {
    method: m,
    body: b && (b instanceof FormData ? b : JSON.stringify(b))
  }).then(r => r.json());

const urlEndpoint = 'https://ik.imagekit.io/bm2sipware';
const getImgUrl = (src) => {
  if (!src) return 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100';
  if (src.includes('ik.imagekit.io')) return src;
  if (src.startsWith('/')) return `${urlEndpoint}${src}`;
  return `${urlEndpoint}/${src}`;
};

const PRODUCT_HIGHLIGHTS_MAP = {
  'White Ceramic Mug': '11 Oz, Glossy Finish, Fade Proof Print, Ceramic Mug, Full White, OEKO-TEX Certified, Box Packing, No Minimums',
  'Black Ceramic Mug': '11 Oz, Glossy Finish, Fade Proof Print, Ceramic Mug, Full Black Color, OEKO-TEX Certified, Box Packing, No Minimums',
  'White Enamel Mug': '11 Oz, Silver Rim, Enamel Coated, Stainless Steel, Dishwasher Safe, OEKO-TEX Certified, Fade Proof Print, No Minimums',
  'Magic Mug': '11 Oz, Glossy Finish, Fade Proof Print, Ceramic Mug, Magic Mug, OEKO-TEX Certified, Box Packing, No Minimums',
  'Colour Mug': '11 Oz, Glossy Finish, Fade Proof Print, Ceramic Mug, 8 Colors, OEKO-TEX Certified, Box Packing, No Minimums',
  'Aluminium Sipper Bottle': '750 ml, Glossy Finish, Fade Proof Print, Aluminum Bottle, Clip Cap, OEKO-TEX Certified, Eco-Friendly Nature, No Minimums',
  'Steel Bottle': '25 Oz, Stainless Steel, Engraved, Leak Proof, BPA Free, Eco Friendly, Custom Gifting, No Minimums'
};

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

function IconZap({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}

function IconSparkles({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
    </svg>
  );
}

function IconFlame({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.229 1.15-3.05a2.5 2.5 0 0 0 2.35 1.05z"></path>
    </svg>
  );
}

function IconTag({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
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
  const [previewImg, setPreviewImg] = useState(null);
  const [couponType, setCouponType] = useState('percent');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [formNiche, setFormNiche] = useState('Roots');
  const [formProductType, setFormProductType] = useState('White Ceramic Mug');
  const [nicheDropdownOpen, setNicheDropdownOpen] = useState(false);
  const [productTypeDropdownOpen, setProductTypeDropdownOpen] = useState(false);
  const [formHighlights, setFormHighlights] = useState([]);

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

  useEffect(() => {
    if (previewImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [previewImg]);

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
    const data = {
      code: e.target.code.value,
      type: couponType,
      value: e.target.value.value,
      min_order: e.target.min_order.value
    };
    await api('/api/admin/coupons', 'POST', data);
    e.target.reset();
    setCouponType('percent');
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
          <T id="discounts">Discounts</T>
        </div>
      </div>

      {loading && tab === 'products' && (
        <div style={{height: 3, width: '100%', background: 'rgba(36,60,143,0.1)', borderRadius: 99, overflow: 'hidden', marginBottom: 20}}>
          <div style={{height: '100%', width: '40%', background: 'var(--blue)', borderRadius: 99, animation: 'loadingBar 1.2s infinite ease-in-out'}} />
        </div>
      )}

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

            {/* Custom Modern Orders Filter Dropdown */}
            <div style={{position: 'relative', display: 'inline-block'}}>
              <button
                type="button"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                style={{
                  minWidth: 230,
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '1px solid var(--line)',
                  background: '#fff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: 'var(--ink)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 600
                }}
              >
                <span>
                  {orderFilter === 'all' && 'All Filters'}
                  {orderFilter === 'success' && 'Successful (Qikink Sent)'}
                  {orderFilter === 'online' && 'Online / Prepaid Orders'}
                  {orderFilter === 'cod' && 'COD Orders'}
                  {orderFilter === 'failed' && 'Qikink Failures'}
                </span>
                <span style={{fontSize: '0.8rem', color: 'var(--mute)', transform: filterDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}>▾</span>
              </button>

              {filterDropdownOpen && (
                <>
                  <div
                    onClick={() => setFilterDropdownOpen(false)}
                    style={{position: 'fixed', inset: 0, zIndex: 90}}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      left: 0,
                      minWidth: 260,
                      background: '#fff',
                      borderRadius: 14,
                      border: '1px solid var(--line)',
                      boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
                      padding: 6,
                      zIndex: 95,
                      display: 'grid',
                      gap: 2
                    }}
                  >
                    {[
                      {id: 'all', label: 'All Filters'},
                      {id: 'success', label: 'Successful (Qikink Sent)'},
                      {id: 'online', label: 'Online / Prepaid Orders'},
                      {id: 'cod', label: 'COD Orders'},
                      {id: 'failed', label: 'Qikink Failures'}
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setOrderFilter(opt.id);
                          setFilterDropdownOpen(false);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: 0,
                          background: orderFilter === opt.id ? 'rgba(36,60,143,0.08)' : 'transparent',
                          color: orderFilter === opt.id ? 'var(--blue)' : 'var(--ink)',
                          fontWeight: orderFilter === opt.id ? 700 : 500,
                          fontSize: '0.9rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

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
          {!edit && (
            <button className="btn" onClick={() => {
              setE({});
              setFormNiche('Roots');
              setFormProductType('White Ceramic Mug');
              setFormHighlights((PRODUCT_HIGHLIGHTS_MAP['White Ceramic Mug'] || '').split(',').map(s => s.trim()).filter(Boolean));
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}>
              + Add New Product
            </button>
          )}

          {edit && (
            <form className="box form" style={{margin: '20px 0', padding: 20}} onSubmit={save} encType="multipart/form-data">
              <input type="hidden" name="id" defaultValue={edit.id || ''} />

              <input name="name" required placeholder="Product Name *" defaultValue={edit.name} />
              <textarea name="description" required placeholder="Product Description *" defaultValue={edit.description} rows={3} />

              <div className="f2" style={{alignItems: 'start'}}>
                <div>
                  <label style={{fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4}}>Niche</label>
                  <input type="hidden" name="niche" value={formNiche} />
                  <div style={{position: 'relative'}}>
                    <button
                      type="button"
                      onClick={() => setNicheDropdownOpen(!nicheDropdownOpen)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: '1px solid var(--line)',
                        background: '#fff',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        color: 'var(--ink)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <span>{formNiche}</span>
                      <span style={{fontSize: '0.8rem', color: 'var(--mute)', transform: nicheDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}>▾</span>
                    </button>

                    {nicheDropdownOpen && (
                      <>
                        <div onClick={() => setNicheDropdownOpen(false)} style={{position: 'fixed', inset: 0, zIndex: 90}} />
                        <div style={{position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: '100%', background: '#fff', borderRadius: 14, border: '1px solid var(--line)', boxShadow: '0 12px 36px rgba(0,0,0,0.1)', padding: 6, zIndex: 95, display: 'grid', gap: 2}}>
                          {[
                            {id: 'Roots', label: 'Roots'},
                            {id: 'Wealth', label: 'Wealth'},
                            {id: 'Relationships', label: 'Relationships'},
                            {id: 'Technology', label: 'Technology'}
                          ].map(opt => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setFormNiche(opt.id);
                                setNicheDropdownOpen(false);
                              }}
                              style={{
                                padding: '10px 14px',
                                borderRadius: 10,
                                border: 0,
                                background: formNiche === opt.id ? 'rgba(36,60,143,0.08)' : 'transparent',
                                color: formNiche === opt.id ? 'var(--blue)' : 'var(--ink)',
                                fontWeight: formNiche === opt.id ? 700 : 500,
                                fontSize: '0.9rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4}}>Product Type (Auto-sets specs/highlights)</label>
                  <input type="hidden" name="product_type" value={formProductType} />
                  <div style={{position: 'relative'}}>
                    <button
                      type="button"
                      onClick={() => setProductTypeDropdownOpen(!productTypeDropdownOpen)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: '1px solid var(--line)',
                        background: '#fff',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        color: 'var(--ink)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <span>{formProductType}</span>
                      <span style={{fontSize: '0.8rem', color: 'var(--mute)', transform: productTypeDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}>▾</span>
                    </button>

                    {productTypeDropdownOpen && (
                      <>
                        <div onClick={() => setProductTypeDropdownOpen(false)} style={{position: 'fixed', inset: 0, zIndex: 90}} />
                        <div style={{position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: '100%', background: '#fff', borderRadius: 14, border: '1px solid var(--line)', boxShadow: '0 12px 36px rgba(0,0,0,0.1)', padding: 6, zIndex: 95, display: 'grid', gap: 2, maxHeight: 240, overflowY: 'auto'}}>
                          {[
                            'White Ceramic Mug',
                            'Black Ceramic Mug',
                            'White Enamel Mug',
                            'Magic Mug',
                            'Colour Mug',
                            'Aluminium Sipper Bottle',
                            'Steel Bottle'
                          ].map(pt => (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => {
                                setFormProductType(pt);
                                const defaultStr = PRODUCT_HIGHLIGHTS_MAP[pt] || '';
                                setFormHighlights(defaultStr ? defaultStr.split(',').map(s => s.trim()).filter(Boolean) : []);
                                setProductTypeDropdownOpen(false);
                              }}
                              style={{
                                padding: '10px 14px',
                                borderRadius: 10,
                                border: 0,
                                background: formProductType === pt ? 'rgba(36,60,143,0.08)' : 'transparent',
                                color: formProductType === pt ? 'var(--blue)' : 'var(--ink)',
                                fontWeight: formProductType === pt ? 700 : 500,
                                fontSize: '0.9rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {pt}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Width Product Highlights Container with Removable Chips */}
              <div style={{marginTop: 12, padding: '14px 16px', background: 'rgba(36,60,143,0.04)', borderRadius: 14, border: '1px solid rgba(36,60,143,0.12)'}}>
                <input type="hidden" name="highlights_text" value={formHighlights.join(', ')} />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8}}>
                  <b style={{color: 'var(--blue)', fontSize: '0.88rem'}}><IconSparkles size={16} color="var(--blue)" />Auto Specs / Highlights Tags (Click × to remove any tag):</b>
                  {formHighlights.length === 0 && (
                    <button
                      type="button"
                      onClick={() => setFormHighlights((PRODUCT_HIGHLIGHTS_MAP[formProductType] || '').split(',').map(s => s.trim()).filter(Boolean))}
                      style={{fontSize: '0.78rem', color: 'var(--blue)', background: 'none', border: 0, cursor: 'pointer', fontWeight: 700, textDecoration: 'underline'}}
                    >
                      Reset Default Tags
                    </button>
                  )}
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10}}>
                  {formHighlights.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 12px',
                        background: '#fff',
                        border: '1px solid rgba(36,60,143,0.25)',
                        color: 'var(--blue)',
                        borderRadius: 99,
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setFormHighlights(prev => prev.filter((_, i) => i !== idx))}
                        style={{
                          border: 0,
                          background: 'rgba(36,60,143,0.1)',
                          color: 'var(--blue)',
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          cursor: 'pointer',
                          fontWeight: 800,
                          display: 'grid',
                          placeItems: 'center',
                          padding: 0,
                          fontSize: '0.85rem',
                          lineHeight: 1
                        }}
                        title={`Remove "${tag}"`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="f2">
                <input name="qikink_sku" placeholder="Qikink SKU" defaultValue={edit.qikink_sku || 'UMCM-Wh-11oz'} />
                <input name="price" type="number" required placeholder="Price ₹ *" defaultValue={edit.price} />
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 12px 0'}}>
                <input type="checkbox" name="on_sale" id="on_sale" defaultChecked={edit.on_sale} style={{width: 18, height: 18, accentColor: 'var(--blue)'}} />
                <label htmlFor="on_sale" style={{fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'}}><IconZap size={16} color="currentColor" />Feature on Top Deals / Sale Page</label>
              </div>

              {/* 3 Asset types: Cover Image, Design, Dimensions with both URL and File upload */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 12, background: '#f9f9f8', padding: 14, borderRadius: 12, border: '1px solid var(--line)'}}>
                <div style={{fontWeight: 700, fontSize: '0.9rem'}}>1. Cover Image</div>
                <div className="f2">
                  <input name="cover_image_url" placeholder="Cover Image URL (ImageKit)" defaultValue={edit.cover_image_url || ''} />
                  <label style={{fontSize: '0.85rem', fontWeight: 600}}>
                    Or Choose File:
                    <input name="cover_image_file" type="file" accept="image/*" style={{marginTop: 4, display: 'block'}} />
                  </label>
                </div>

                <div style={{fontWeight: 700, fontSize: '0.9rem', marginTop: 4}}>2. Print-ready Design</div>
                <div className="f2">
                  <input name="design_url" placeholder="Print-ready Design URL (ImageKit)" defaultValue={edit.design_url || ''} />
                  <label style={{fontSize: '0.85rem', fontWeight: 600}}>
                    Or Choose File:
                    <input name="design_file" type="file" accept="image/*" style={{marginTop: 4, display: 'block'}} />
                  </label>
                </div>

                <div style={{fontWeight: 700, fontSize: '0.9rem', marginTop: 4}}>3. Dimensions / Spec</div>
                <div className="f2">
                  <input name="dimensions_url" placeholder="Dimensions / Spec URL (ImageKit)" defaultValue={edit.dimensions_url || ''} />
                  <label style={{fontSize: '0.85rem', fontWeight: 600}}>
                    Or Choose File:
                    <input name="dimensions_file" type="file" accept="image/*" style={{marginTop: 4, display: 'block'}} />
                  </label>
                </div>
              </div>

              {edit.images && edit.images.length > 0 && (
                <div>
                  <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--mute)'}}>Existing Product Images:</span>
                  <div style={{display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap'}}>
                    {edit.images.map((imgUrl, i) => (
                      <div key={i} style={{width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)', background: '#f5f5f5'}}>
                        <img src={getImgUrl(imgUrl)} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input name="images_text" placeholder="Additional ImageKit Image URLs (comma-separated)" defaultValue={edit.images?.join(', ') || ''} />

              <label style={{fontSize: '0.9rem', fontWeight: 600}}>
                Or Upload Multiple Mockup Files (Auto-uploaded to ImageKit)
                <input name="files" type="file" accept="image/*" multiple style={{marginTop: 6}} />
              </label>

              <div style={{display: 'flex', gap: 10, marginTop: 16}}>
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
                  <th>Niche</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={getImgUrl(p.images?.[0])}
                        alt={p.name}
                        onClick={() => setPreviewImg(getImgUrl(p.images?.[0]))}
                        title="Click to view full image preview"
                        style={{width: 42, height: 42, objectFit: 'cover', borderRadius: 8, background: '#eee', cursor: 'pointer', transition: 'transform 0.2s'}}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </td>
                    <td><b>{p.name}</b></td>
                    <td><span className="chip" style={{padding: '4px 10px', fontSize: '0.8rem', background: 'rgba(36,60,143,0.08)', color: 'var(--blue)', border: 0}}>{p.niche || 'Original Sipware'}</span></td>
                    <td>{inr(p.price)}</td>
                    <td>
                      <button className="link" onClick={() => {
                        setE(p);
                        setFormNiche(p.niche || 'Roots');
                        const pt = p.product_type || 'White Ceramic Mug';
                        setFormProductType(pt);
                        const existingHighlights = p.specs?.Highlights || p.specs?.Features || PRODUCT_HIGHLIGHTS_MAP[pt] || '';
                        setFormHighlights(existingHighlights ? existingHighlights.split(',').map(s => s.trim()).filter(Boolean) : []);
                        window.scrollTo({top: 0, behavior: 'smooth'});
                      }}>
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

      {tab === 'discounts' && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, width: '100%'}}>
          {/* Left Column: Form */}
          <div style={{background: '#fff', padding: 28, borderRadius: 20, border: '1px solid var(--line)'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 800, marginBottom: 6}}><IconZap size={20} color="currentColor" />Create New Sale Event</h3>
            <p style={{color: 'var(--mute)', fontSize: '0.88rem', marginBottom: 20, lineHeight: 1.5}}>
              Configure the active promotional sale banner text and discount percentage across the store.
            </p>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const newSale = {
                id: Date.now().toString(),
                title: fd.get('title'),
                percent: Number(fd.get('percent')) || 10,
                subtitle: fd.get('subtitle'),
                active: true
              };
              let existing = [];
              try { existing = JSON.parse(localStorage.getItem('salesList') || '[]'); } catch {}
              const updated = [newSale, ...existing.map(s => ({...s, active: false}))];
              try {
                localStorage.setItem('salesList', JSON.stringify(updated));
                localStorage.setItem('saleBannerSettings', JSON.stringify({
                  title: newSale.title,
                  subtitle: newSale.subtitle,
                  percent: newSale.percent
                }));
                alert('New Sale Event created and activated successfully!');
                e.currentTarget.reset();
              } catch {
                alert('Saved successfully!');
              }
            }} style={{display: 'grid', gap: 14}}>
              <div>
                <label style={{fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: 4}}>Sale Event Title</label>
                <input name="title" placeholder="e.g. Mega Vibe Sale — Flat 10% OFF" required style={{width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontSize: '0.92rem'}} />
              </div>
              <div>
                <label style={{fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: 4}}>Discount Percentage (%)</label>
                <input name="percent" type="number" min="1" max="100" defaultValue="10" required style={{width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontSize: '0.92rem'}} />
              </div>
              <div>
                <label style={{fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: 4}}>Subtitle / Description</label>
                <input name="subtitle" placeholder="e.g. Direct 10% OFF applied automatically!" required style={{width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontSize: '0.92rem'}} />
              </div>
              <button className="btn" style={{padding: '12px 24px', marginTop: 6, width: '100%', borderRadius: 12}}>+ Create &amp; Activate Sale Event</button>
            </form>
          </div>

          {/* Right Column: Live Storefront Preview & Controls */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {/* Live Banner Preview Box */}
            <div style={{background: '#fff', padding: 24, borderRadius: 20, border: '1px solid var(--line)'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 14}}>
                <IconSparkles size={16} color="var(--blue)" />Live Store Banner Preview
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap'}}>
                {/* Sale Info Badge */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--blue), #16202B)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: 99,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <IconZap size={16} color="#fff" />
                  <span>Mega Vibe Sale &mdash; Flat 10% OFF &bull; <span style={{opacity: 0.9, fontWeight: 500}}>Direct 10% OFF</span></span>
                </div>

                {/* Heavy Discount Products CTA Button */}
                <div
                  style={{
                    background: 'var(--blue)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: 99,
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 4px 14px rgba(36, 60, 143, 0.35)'
                  }}
                >
                  <IconFlame size={16} color="#fff" />Heavy Discount Products &rarr;
                </div>
              </div>
            </div>

            {/* General Discount Info Box */}
            <div style={{background: 'rgba(36,60,143,0.04)', padding: 20, borderRadius: 20, border: '1px solid rgba(36,60,143,0.12)', fontSize: '0.88rem', color: 'var(--ink)'}}>
              <b style={{color: 'var(--blue)', fontSize: '0.92rem', display: 'block', marginBottom: 6}}><IconTag size={18} color="var(--blue)" />Automatic Direct Discounts Active</b>
              <p style={{margin: 0, color: 'var(--mute)', lineHeight: 1.5}}>
                Every product listed in your store automatically displays a 10% strikethrough original price, giving buyers an immediate direct discount without needing any promo codes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Preview Lightbox Modal */}
      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: 16
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#fff',
              padding: 20,
              borderRadius: 20,
              maxWidth: 520,
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid var(--line)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              boxSizing: 'border-box'
            }}
          >
            <button
              onClick={() => setPreviewImg(null)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                color: 'var(--ink)',
                zIndex: 10
              }}
            >
              &times;
            </button>
            <img
              src={getImgUrl(previewImg)}
              alt="Full Product Preview"
              style={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: 12,
                background: '#fff',
                marginBottom: 12
              }}
            />
            <div style={{fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)'}}>
              Product Image Preview
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
