import ImageKit from 'imagekit';
import crypto from 'crypto';

export const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/bm2sipware';
export const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_demo_imagekit_key';
export const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY || 'private_demo_imagekit_key';

let imagekitInstance = null;

export function getImageKitInstance() {
  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imagekitInstance;
}

/**
 * Generate authentication parameters for client-side uploads
 */
export function getImageKitAuthParams() {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 2400; // 40 minutes from now

  try {
    const ik = getImageKitInstance();
    const authParams = ik.getAuthenticationParameters(token, expire);
    return {
      ...authParams,
      publicKey: IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    };
  } catch (err) {
    // Fallback crypto HMAC-SHA1 calculation if SDK call fails
    const signature = crypto
      .createHmac('sha1', IMAGEKIT_PRIVATE_KEY)
      .update(token + expire)
      .digest('hex');
    return {
      token,
      expire,
      signature,
      publicKey: IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    };
  }
}

/**
 * Server-side upload to ImageKit
 */
export async function uploadToImageKit(fileOrBuffer, fileName, folder = '/custom-prints', tags = ['custom-print']) {
  const ik = getImageKitInstance();
  let fileBuffer;

  if (typeof fileOrBuffer === 'string') {
    fileBuffer = fileOrBuffer; // Base64 or URL
  } else if (fileOrBuffer instanceof Buffer) {
    fileBuffer = fileOrBuffer;
  } else if (fileOrBuffer && typeof fileOrBuffer.arrayBuffer === 'function') {
    const ab = await fileOrBuffer.arrayBuffer();
    fileBuffer = Buffer.from(ab);
  } else {
    fileBuffer = fileOrBuffer;
  }

  const response = await ik.upload({
    file: fileBuffer,
    fileName: fileName || `design-${Date.now()}`,
    folder: folder,
    tags: tags,
    useUniqueFileName: true,
  });

  return response;
}

/**
 * Generate transformed ImageKit URL
 */
export function getTransformedUrl(src, transformations = []) {
  if (!src) return '';
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    src = `${IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
  }

  if (transformations.length === 0) return src;

  const ik = getImageKitInstance();
  return ik.url({
    src: src,
    transformation: transformations,
  });
}
