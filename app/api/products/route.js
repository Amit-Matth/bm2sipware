import {list} from '@/lib/db';
import {NextResponse} from 'next/server';
export async function GET(){return NextResponse.json(await list('products',{active: {$ne: false}}))}
