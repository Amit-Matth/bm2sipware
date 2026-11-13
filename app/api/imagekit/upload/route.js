import { NextResponse } from 'next/server';
import { uploadToImageKit } from '@/lib/imagekit';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const customText = formData.get('customText') || '';
    const folder = formData.get('folder') || '/custom-prints';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = `design_${Date.now()}_${file.name || 'image.png'}`;
    const result = await uploadToImageKit(
      file,
      fileName,
      folder,
      ['custom-print', 'user-design', customText ? 'with-notes' : 'artwork']
    );

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
      filePath: result.filePath,
      thumbnailUrl: result.thumbnailUrl || result.url,
      size: result.size,
      height: result.height,
      width: result.width,
    });
  } catch (err) {
    console.error('ImageKit upload API error:', err);
    return NextResponse.json(
      { error: 'ImageKit design upload failed', details: err.message },
      { status: 500 }
    );
  }
}
