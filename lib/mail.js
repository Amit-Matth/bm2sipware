export async function sendMail(to,subject,html){
  if(process.env.DISABLE_EMAILS === 'true' || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'demo') return;
  await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},
  body:JSON.stringify({from:process.env.MAIL_FROM,to,subject,html})}).catch(()=>{})
}
export const orderMail=(o)=>`<h2>Thanks, ${o.name}. Order ${o.number} is confirmed.</h2><p>Total ${o.total} (${o.payment_mode==='cod'?'pay on delivery':'paid online'}).</p><p><a href="${process.env.SITE_URL}/order/${o.id}">Track your order</a></p>`;
