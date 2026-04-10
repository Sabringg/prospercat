import { NextResponse } from 'next/server'

const TITLES: Record<string, string[]> = {
  Etsy: [
    'Handmade {product} — Perfect Gift for {theme}',
    '{product} | Artisan Quality | Free Shipping',
    'Beautiful {product} — Best Seller | Shop Now',
    'Premium {product} — Handcrafted with Love',
    '{product} — Unique Design | Limited Stock',
  ],
  Shopify: [
    '{product} — Premium Quality You\'ll Love',
    'Elevate Your Style with Our {product}',
    'The {product} You\'ve Been Looking For',
    '{product} — Modern Design, Timeless Quality',
    'Shop the Best {product} Online Today',
  ],
  Amazon: [
    '{product} — #1 Best Seller in Category',
    'Premium {product} — Amazon\'s Choice',
    '{product} — 4.8 Stars | Free Shipping',
    'Top-Rated {product} — Buy Now',
    '{product} — 30-Day Money Back Guarantee',
  ],
}

const TAG_TEMPLATES: string[][] = [
  ['gift', 'handmade', 'cozy', 'premium', 'aesthetic', 'home decor', 'unique', ' bestseller', 'popular', 'trending', 'perfect gift', 'stylish', 'modern'],
  ['organic', 'natural', 'eco-friendly', 'sustainable', 'handcrafted', 'artisan', 'vintage', 'rustic', 'minimalist', 'boho', 'chic', 'luxury', 'elegant'],
  ['candle', 'soy wax', 'lavender', 'vanilla', 'scented', 'aromatherapy', 'relaxation', 'self-care', 'spa', 'zen', 'calming', 'fragrant', 'ambiance'],
]

const DESCRIPTIONS: Record<string, string[]> = {
  Etsy: [
    'Handcrafted with care, this beautiful {product} makes the perfect thoughtful gift for yourself or loved ones. Made using premium materials, each piece is unique. Ideal for {theme} enthusiasts. Shipping available worldwide.',
    'Our best-selling {product} is back in stock! Handmade by skilled artisans with attention to every detail. Perfect for {theme} lovers. Add to cart before it sells out again!',
    'Transform your space with this stunning {product}. Designed for {theme} enthusiasts who appreciate quality and style. Makes an excellent gift for any occasion.',
  ],
  Shopify: [
    'Elevate your everyday with this premium {product}. Crafted from high-quality materials for lasting durability and style. Perfect for the modern shopper who values both form and function.',
    'Designed with you in mind, this {product} combines modern aesthetics with practical functionality. Whether for yourself or as a gift, it\'s sure to impress. Order today!',
  ],
  Amazon: [
    'Customer\'s #1 Choice! This premium {product} delivers exceptional quality at an unbeatable value. Backed by our 100% satisfaction guarantee. Prime shipping available. Order now!',
    'Join thousands of happy customers who chose our {product}. Engineered for superior performance and built to last. 30-day hassle-free returns. Don\'t miss out!',
  ],
}

function generateTags(product: string): string[] {
  const allTags: string[] = []
  TAG_TEMPLATES.forEach(template => {
    const shuffled = [...template].sort(() => Math.random() - 0.5)
    allTags.push(...shuffled.slice(0, 5))
  })
  return [...new Set(allTags)].slice(0, 13)
}

export async function POST(req: Request) {
  try {
    const { product, platform } = await req.json()

    if (!product || typeof product !== 'string') {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
    }

    const safeProduct = product.trim().slice(0, 100)
    const safePlatform = PLATFORMS.includes(platform) ? platform : 'Etsy'

    // Simulate AI delay
    await new Promise(r => setTimeout(r, 800))

    const titles = TITLES[safePlatform]
    const descriptions = DESCRIPTIONS[safePlatform]

    // Generate variety by rotating based on product name length
    const idx = safeProduct.length % titles.length
    const descIdx = safeProduct.length % descriptions.length

    // Replace placeholders
    const themes = ['home decor', 'gift giving', 'self-care', 'wellness', 'lifestyle', 'cozy living']
    const theme = themes[safeProduct.length % themes.length]

    let title = titles[idx].replace('{product}', safeProduct).replace('{theme}', theme)
    let description = descriptions[descIdx].replace(/{product}/g, safeProduct).replace(/{theme}/g, theme)

    const tags = generateTags(safeProduct)

    return NextResponse.json({
      title,
      tags,
      description,
      platform: safePlatform
    })
  } catch {
    return NextResponse.json({ error: 'Failed to generate listing' }, { status: 500 })
  }
}

export const PLATFORMS = ['Etsy', 'Shopify', 'Amazon']
