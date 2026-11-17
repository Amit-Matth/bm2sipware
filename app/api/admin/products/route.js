import {NextResponse} from 'next/server';
import crypto from 'crypto';
import {isAdmin} from '@/lib/admin';
import {col,list,now} from '@/lib/db';
import {uploadImage} from '@/lib/upload';

const deny=()=>NextResponse.json({error:'Unauthorized'},{status:401});

const PRODUCT_SPECS_MAP = {
  'White Ceramic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Features': 'Full White, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Black Ceramic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Features': 'Full Black Color, OEKO-TEX Certified, Box Packing, No Minimums' },
  'White Enamel Mug': { 'Capacity': '11 Oz', 'Finish': 'Silver Rim', 'Print': 'Fade Proof Print', 'Material': 'Stainless Steel (Enamel Coated)', 'Features': 'Dishwasher Safe, OEKO-TEX Certified, No Minimums' },
  'Magic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Thermal Ceramic', 'Features': 'Magic Mug, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Colour Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Features': '8 Colors, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Aluminium Sipper Bottle': { 'Capacity': '750 ml', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Aluminum Bottle', 'Features': 'Clip Cap, OEKO-TEX Certified, Eco-Friendly Nature, No Minimums' },
  'Steel Bottle': { 'Capacity': '25 Oz', 'Finish': 'Engraved', 'Print': 'Engraved', 'Material': 'Stainless Steel', 'Features': 'Leak Proof, BPA Free, Eco Friendly, Custom Gifting, No Minimums' }
};

export async function GET(){
  if(!isAdmin())return deny();
  return NextResponse.json(await list('products'));
}

export async function POST(req){
  if(!isAdmin())return deny();
  const f=await req.formData();

  try {
    let coverUrl = f.get('cover_image_url') || '';
    const coverFile = f.get('cover_image_file');
    if (coverFile && typeof coverFile === 'object' && coverFile.size > 0) {
      coverUrl = await uploadImage(coverFile);
    }

    let designUrl = f.get('design_url') || '';
    const designFile = f.get('design_file');
    if (designFile && typeof designFile === 'object' && designFile.size > 0) {
      designUrl = await uploadImage(designFile);
    }

    let dimensionsUrl = f.get('dimensions_url') || '';
    const dimensionsFile = f.get('dimensions_file');
    if (dimensionsFile && typeof dimensionsFile === 'object' && dimensionsFile.size > 0) {
      dimensionsUrl = await uploadImage(dimensionsFile);
    }

    const imgs = [];
    for(const file of f.getAll('files')){
      if(file && typeof file === 'object' && file.size > 0) {
        imgs.push(await uploadImage(file));
      }
    }

    const id=f.get('id');
    const productType = f.get('product_type') || 'White Ceramic Mug';
    const name = f.get('name');
    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'product-' + Date.now();

    const highlightsText = f.get('highlights_text');
    const defaultSpecs = PRODUCT_SPECS_MAP[productType] || { 'Material': 'Ceramic', 'Print': 'HD Sublimation', 'Capacity': '325ml', 'Care': 'Dishwasher & microwave safe' };

    const rawPrice = +f.get('price') || 499;
    const compare_at_price = Math.round(rawPrice * 1.10);

    const row={
      name,
      slug,
      description: f.get('description'),
      category: productType,
      niche: f.get('niche') || 'Roots',
      product_type: productType,
      price: rawPrice,
      compare_at_price,
      qikink_sku: f.get('qikink_sku') || 'UMCM-Wh-11oz',
      design_url: designUrl || coverUrl,
      dimensions_url: dimensionsUrl,
      cover_image_url: coverUrl,
      active: true,
      featured: true,
      on_sale: f.get('on_sale') === 'on',
      specs: highlightsText !== null && highlightsText !== undefined ? { ...defaultSpecs, 'Highlights': highlightsText } : defaultSpecs
    };

    const allImages = [];
    if (coverUrl) allImages.push(coverUrl);
    if (designUrl && !allImages.includes(designUrl)) allImages.push(designUrl);
    if (dimensionsUrl && !allImages.includes(dimensionsUrl)) allImages.push(dimensionsUrl);

    const imagesText = f.get('images_text');
    if (imagesText) {
      const extra = imagesText.split(',').map(s => s.trim()).filter(Boolean);
      for (const e of extra) {
        if (!allImages.includes(e)) allImages.push(e);
      }
    } else if (imgs.length > 0) {
      for (const img of imgs) {
        if (!allImages.includes(img)) allImages.push(img);
      }
    }

    row.images = allImages.length > 0 ? allImages : (coverUrl ? [coverUrl] : []);

    const c=await col('products');
    if(id) {
      await c.updateOne({id},{$set:row});
    } else {
      await c.insertOne({
        id: crypto.randomUUID(),
        sold: 0,
        created_at: now(),
        ...row
      });
    }
  }catch(e){
    return NextResponse.json({error:e.message},{status:400});
  }
  return NextResponse.json({});
}

export async function DELETE(req){
  if(!isAdmin())return deny();
  const{id}=await req.json();
  await(await col('products')).deleteOne({id});
  return NextResponse.json({ok:true});
}
