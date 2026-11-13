import crypto from 'crypto';import {cookies} from 'next/headers';
const sign=v=>crypto.createHmac('sha256',process.env.ADMIN_SESSION_SECRET).update(v).digest('hex');
export const makeToken=()=>{const e=Date.now()+864e5*7;return `${e}.${sign(String(e))}`};
export function isAdmin(){const t=cookies().get('admin')?.value;if(!t)return false;const[e,s]=t.split('.');
 if(!e||!s||Number(e)<Date.now())return false;const a=Buffer.from(s),b=Buffer.from(sign(e));return a.length===b.length&&crypto.timingSafeEqual(a,b)}
