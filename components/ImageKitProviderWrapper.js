'use client';

import { ImageKitProvider } from '@imagekit/next';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/bm2sipware';
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_demo_imagekit_key';

const authenticator = async () => {
  try {
    const response = await fetch('/api/imagekit/auth');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication request failed: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.error(`ImageKit authentication error: ${error.message}`);
    throw error;
  }
};

export default function ImageKitProviderWrapper({ children }) {
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
