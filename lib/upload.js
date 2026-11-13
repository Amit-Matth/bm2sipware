import { uploadToImageKit } from './imagekit';

export async function uploadImage(file) {
  try {
    const result = await uploadToImageKit(
      file,
      file.name || `upload-${Date.now()}`,
      '/products',
      ['product', 'sipware']
    );
    if (result && result.url) {
      return result.url;
    }
  } catch (err) {
    console.error('ImageKit upload error:', err.message);
    throw new Error(`Image upload failed: ${err.message}`);
  }

  throw new Error('Image upload failed: No URL returned from ImageKit.');
}
