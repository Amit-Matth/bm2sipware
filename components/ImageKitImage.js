'use client';

import { Image as IKNextImage, buildSrc } from '@imagekit/next';
import { useState } from 'react';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/bm2sipware';

export default function ImageKitImage({
  src,
  alt = '',
  width = 500,
  height = 500,
  transformation = [],
  className = '',
  style = {},
  priority = false,
  ...props
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`ph ${className}`} role="img" aria-label={alt} style={{ display: 'grid', placeItems: 'center', background: 'var(--sage)', color: 'var(--mute)', ...style }}>
        ☕
      </div>
    );
  }

  const isImageKitUrl = src.includes('ik.imagekit.io') || src.startsWith('/') && !src.startsWith('/_next') && !src.startsWith('/favicon');

  if (isImageKitUrl) {
    const cleanSrc = src.includes('ik.imagekit.io') ? src.replace(/^https?:\/\/ik\.imagekit\.io\/[^/]+/, '') : src;
    return (
      <IKNextImage
        urlEndpoint={urlEndpoint}
        src={cleanSrc.startsWith('/') ? cleanSrc : `/${cleanSrc}`}
        alt={alt}
        width={width}
        height={height}
        transformation={transformation}
        className={className}
        style={style}
        onError={() => setError(true)}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
      {...props}
    />
  );
}
