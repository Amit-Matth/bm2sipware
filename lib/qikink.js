// Verify field names against Qikink's current API docs before going live.
const base=()=>process.env.QIKINK_BASE_URL;
async function token(){const r=await fetch(base()+'/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
 body:new URLSearchParams({ClientId:process.env.QIKINK_CLIENT_ID,client_secret:process.env.QIKINK_CLIENT_SECRET})});
 const j=await r.json();if(!j.Accesstoken)throw new Error('Qikink auth failed');return j.Accesstoken}
export async function pushToQikink(o){
 const t=await token();const[first,...rest]=(o.name||'').split(' ');const a=o.address;
 const body={
  order_number: (o.number || '').slice(0, 15),
  qikink_shipping:'1',
  gateway: o.payment_mode === 'cod' ? 'COD' : 'Prepaid',
  total_order_value: String(o.total),
  line_items:o.items.map(i=>({
   search_from_my_products: 0,
   print_type_id: "5",
   quantity: String(i.qty),
   price: String(i.price),
   sku: 'UMCM-Wh-11oz Black',
   designs:[{
    design_code:(i.slug||'mug').slice(0,20),
    width_inches:'',
    height_inches:'',
    placement_sku:'fr',
    design_link:i.design_url||'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
    mockup_link:i.image||'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d'
   }]
  })),
  shipping_address:{
   first_name:first||'Customer',
   last_name:rest.join(' ')||'.',
   address1:a.line1,
   address2:a.line2||'',
   phone:o.phone,
   email:o.email,
   city:a.city,
   zip:a.pincode,
   province:a.state,
   country_code:'IN'
  }
 };
 const r=await fetch(base()+'/api/order/create',{method:'POST',headers:{'Content-Type':'application/json',ClientId:process.env.QIKINK_CLIENT_ID,Accesstoken:t},body:JSON.stringify(body)});
 const j=await r.json();if(!r.ok)throw new Error(JSON.stringify(j));return j}
