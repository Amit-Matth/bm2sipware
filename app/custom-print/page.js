'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { inr } from '@/lib/format';
import { buildSrc } from '@imagekit/next';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/bm2sipware';

const PRODUCTS = [
  { id: 'custom-ceramic-white', name: 'White Ceramic Coffee Mug', basePrice: 499, image: '/products/White Ceramic Coffee Mug.png' },
  { id: 'custom-ceramic-black', name: 'Black Ceramic Coffee Mug', basePrice: 520, image: '/products/Black Ceramic Coffee Mug.png' },
  { id: 'custom-enamel', name: 'White Enamel Mug', basePrice: 499, image: '/products/White Enamel Mug.png' },
  { id: 'custom-magic', name: 'Magic Ceramic Coffee Mug', basePrice: 549, image: '/products/Magic Ceramic Coffee Mug.png' },
  { id: 'custom-colour', name: 'Colour Ceramic Coffee Mug', basePrice: 520, image: '/products/Colour Ceramic Coffee Mug.png' },
  { id: 'custom-sipper', name: 'Aluminium Sipper Bottle', basePrice: 549, image: '/products/Aluminium Sipper Bottle.png' },
  { id: 'custom-steel', name: 'Stainless Steel Water Bottle', basePrice: 599, image: '/products/Stainless Steel Water Bottle.png' }
];

const CUSTOM_DESIGN_FEE = 50;

export default function CustomPrint() {
  const { add } = useCart();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [size, setSize] = useState('11 OZ (325 ml)');
  const [sizeExtra, setSizeExtra] = useState(0);

  // ImageKit states
  const [imagePreview, setImagePreview] = useState('');
  const [ikUrl, setIkUrl] = useState('');
  const [ikFileId, setIkFileId] = useState('');
  const [uploading, setUploading] = useState(false);

  // ImageKit transformation options
  const [rotation, setRotation] = useState(0);
  const [fitMode, setFitMode] = useState('pad_resize'); // pad_resize, crop, extract
  const [filterEffect, setFilterEffect] = useState('normal'); // normal, grayscale, sepia, contrast, sharpen
  const [quality, setQuality] = useState(90);

  const [customText, setCustomText] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set immediate local data-url preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Upload file to ImageKit
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('customText', customText);
      fd.append('folder', '/custom-prints');

      const res = await fetch('/api/imagekit/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setIkUrl(data.url);
        setIkFileId(data.fileId);
      } else {
        console.warn('ImageKit server upload error:', data.error);
      }
    } catch (err) {
      console.error('Failed uploading to ImageKit:', err);
    } finally {
      setUploading(false);
    }
  };

  // Compute live transformed ImageKit URL
  const getProcessedDesignUrl = () => {
    if (!ikUrl) return imagePreview;

    const transformations = [];
    if (fitMode) transformations.push({ focus: 'center', raw: `cm-${fitMode}` });
    if (rotation) transformations.push({ raw: `rt-${rotation}` });
    if (filterEffect === 'grayscale') transformations.push({ raw: 'e-grayscale' });
    if (filterEffect === 'sepia') transformations.push({ raw: 'e-sepia' });
    if (filterEffect === 'contrast') transformations.push({ raw: 'e-contrast' });
    if (filterEffect === 'sharpen') transformations.push({ raw: 'e-sharpen' });
    if (quality < 100) transformations.push({ quality });

    try {
      return buildSrc({
        urlEndpoint,
        src: ikUrl,
        transformation: transformations,
      });
    } catch (e) {
      return ikUrl;
    }
  };

  const activeDesignUrl = getProcessedDesignUrl() || selectedProduct.image;
  const itemPrice = selectedProduct.basePrice + sizeExtra + CUSTOM_DESIGN_FEE;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const customItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      slug: 'custom-print',
      name: `Custom Print: ${selectedProduct.name} (${size})`,
      price: itemPrice,
      image: activeDesignUrl,
      images: [activeDesignUrl],
      rawDesignUrl: ikUrl || imagePreview || selectedProduct.image,
      processedDesignUrl: activeDesignUrl,
      imageKitFileId: ikFileId,
      imageKitTransformations: {
        rotation,
        fitMode,
        filterEffect,
        quality
      },
      customText,
      isCustom: true
    };

    add(customItem, qty);
    setAdded(true);
    setTimeout(() => {
      router.push('/cart');
    }, 800);
  };

  return (
    <div className="wrap" style={{ maxWidth: 1100, padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ display: 'inline-block', background: 'var(--sage)', color: 'var(--ink)', padding: '6px 16px', borderRadius: 99, fontWeight: 600, fontSize: '0.85rem', marginBottom: 12 }}>
          ⚡ ImageKit.io Powered Design Studio
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, marginBottom: 14 }}>Order Custom Printed Drinkware</h1>
        <p style={{ color: 'var(--mute)', fontSize: '1.05rem', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
          Upload your artwork or photo, apply real-time ImageKit processing, and preview your custom drinkware with an additional design fee of just <b>₹50</b>!
        </p>
      </div>

      <div className="custom-print-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 36, alignItems: 'start' }}>

        {/* Product Selection & Live Preview Card */}
        <div style={{ background: '#fff', padding: 28, borderRadius: 'var(--r)', border: '1px solid var(--line)', position: 'sticky', top: 96 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Live Preview</h3>
            <span style={{ fontSize: '0.75rem', background: '#eef2ff', color: 'var(--blue)', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>
              ImageKit Optimized
            </span>
          </div>

          <div style={{ aspectRatio: '1', borderRadius: 20, overflow: 'hidden', background: 'var(--sage)', marginBottom: 20, position: 'relative', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}>
            <img src={activeDesignUrl} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }} />

            {uploading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', color: 'var(--blue)', fontWeight: 700, fontSize: '0.95rem' }}>
                <div>
                  <div style={{ width: 32, height: 32, border: '3px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 10px' }} />
                  Processing on ImageKit.io...
                </div>
              </div>
            )}

            {imagePreview && !uploading && (
              <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 12px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600 }}>
                ✓ Custom Design Loaded
              </div>
            )}
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{selectedProduct.name}</h4>
          <p style={{ color: 'var(--mute)', fontSize: '0.9rem', marginBottom: 16 }}>Size: {size}</p>

          <div style={{ background: 'var(--bg)', padding: 16, borderRadius: 12, border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 6 }}>
              <span>Base Product Price</span>
              <span>{inr(selectedProduct.basePrice + sizeExtra)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 6, color: 'var(--blue)', fontWeight: 600 }}>
              <span>Custom Design Fee</span>
              <span>+ {inr(CUSTOM_DESIGN_FEE)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
              <span>Item Total</span>
              <span>{inr(itemPrice)}</span>
            </div>
          </div>
        </div>

        {/* Customization Form */}
        <form onSubmit={handleAddToCart} style={{ background: '#fff', padding: 28, borderRadius: 'var(--r)', border: '1px solid var(--line)', display: 'grid', gap: 24 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Customize Your Order</h3>

          {/* 1. Choose Product */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: 12 }}>1. Choose Drinkware Base</label>
            <div style={{ display: 'grid', gap: 10 }}>
              {PRODUCTS.map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 12, cursor: 'pointer', background: selectedProduct.id === p.id ? 'var(--sage)' : '#fff', fontWeight: selectedProduct.id === p.id ? 700 : 500, fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                    <input
                      type="radio"
                      name="product"
                      checked={selectedProduct.id === p.id}
                      onChange={() => setSelectedProduct(p)}
                      style={{ accentColor: 'var(--blue)', flexShrink: 0 }}
                    />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                  </div>
                  <small style={{ color: 'var(--mute)', flexShrink: 0, fontWeight: 700, fontSize: '0.9rem' }}>{inr(p.basePrice)}</small>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Choose Size */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: 10 }}>2. Select Size Capacity</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => { setSize('11 OZ (325 ml)'); setSizeExtra(0); }}
                style={{ padding: '12px', borderRadius: 12, border: '1px solid var(--line)', background: sizeExtra === 0 ? 'var(--blue)' : '#fff', color: sizeExtra === 0 ? '#fff' : 'var(--ink)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
              >
                11 OZ (325 ml)
              </button>
              <button
                type="button"
                onClick={() => { setSize('25 OZ (750 ml)'); setSizeExtra(400); }}
                style={{ padding: '12px', borderRadius: 12, border: '1px solid var(--line)', background: sizeExtra === 400 ? 'var(--blue)' : '#fff', color: sizeExtra === 400 ? '#fff' : 'var(--ink)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
              >
                25 OZ (+{inr(400)})
              </button>
            </div>
          </div>

          {/* 3. Upload Design */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: 8 }}>3. Upload Your Artwork or Design</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ padding: 10, border: '1px solid var(--line)', borderRadius: 12, background: '#fff', width: '100%', fontSize: '0.9rem' }}
            />
            <small style={{ color: 'var(--mute)', display: 'block', marginTop: 6, fontSize: '0.8rem' }}>
              Uploads and optimizes via ImageKit.io. Supports PNG, JPG, WEBP, or AVIF.
            </small>
          </div>

          {/* ImageKit Processing & Transformation Options */}
          {imagePreview && (
            <div style={{ background: 'var(--bg)', padding: 16, borderRadius: 16, border: '1px solid var(--line)', display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--blue)' }}>🎨 ImageKit Processing Tools</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--mute)' }}>Real-time Resizing &amp; FX</span>
              </div>

              {/* Rotation Control */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Rotate Design:</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[0, 90, 180, 270].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRotation(r)}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--line)', background: rotation === r ? 'var(--blue)' : '#fff', color: rotation === r ? '#fff' : 'var(--ink)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {r}°
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Effects */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Filter Effect:</label>
                <select
                  value={filterEffect}
                  onChange={e => setFilterEffect(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--line)', background: '#fff', fontSize: '0.85rem' }}
                >
                  <option value="normal">Normal (Original Colors)</option>
                  <option value="grayscale">Black &amp; White (Grayscale)</option>
                  <option value="sepia">Vintage Sepia</option>
                  <option value="contrast">High Contrast</option>
                  <option value="sharpen">HD Sharpen</option>
                </select>
              </div>

              {/* Fit Mode */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Aspect Fit Mode:</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setFitMode('pad_resize')}
                    style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--line)', background: fitMode === 'pad_resize' ? 'var(--blue)' : '#fff', color: fitMode === 'pad_resize' ? '#fff' : 'var(--ink)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Fit &amp; Pad
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitMode('crop')}
                    style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--line)', background: fitMode === 'crop' ? 'var(--blue)' : '#fff', color: fitMode === 'crop' ? '#fff' : 'var(--ink)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Fill / Crop
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Custom Notes */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: 8 }}>4. Custom Notes or Text (Optional)</label>
            <textarea
              rows={3}
              placeholder="E.g. Please print 'Happy Anniversary Riya & Amit' on the back side."
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              style={{ padding: 12, border: '1px solid var(--line)', borderRadius: 12, width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          {/* Quantity */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: 8 }}>Quantity</label>
            <div className="qty" style={{ display: 'inline-flex' }}>
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span style={{ minWidth: 36, textAlign: 'center' }}>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="btn" disabled={added || uploading} style={{ width: '100%', padding: 16, fontSize: '1.05rem', marginTop: 8 }}>
            {added ? '✓ Custom Print Added to Cart!' : `Add Custom Print to Cart — ${inr(itemPrice * qty)}`}
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 850px) {
          .custom-print-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
