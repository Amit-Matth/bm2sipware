import { NextResponse } from 'next/server';
import { getImageKitAuthParams } from '@/lib/imagekit';

export async function GET() {
  try {
    const authParams = getImageKitAuthParams();
    return NextResponse.json(authParams);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to generate ImageKit authentication parameters', details: err.message },
      { status: 500 }
    );
  }
}
