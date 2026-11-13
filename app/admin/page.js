import {redirect} from 'next/navigation';import {isAdmin} from '@/lib/admin';import Panel from './Panel';
export const dynamic='force-dynamic';
export default function Admin(){if(!isAdmin())redirect('/admin/login');return <Panel/>}
