'use client'
import { useState } from 'react'

const PLATFORMS = ['Etsy', 'Shopify', 'Amazon']

export default function DemoPage() {
  const [product, setProduct] = useState('')
  const [platform, setPlatform] = useState('Etsy')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ title: string; tags: string[]; description: string } | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!product.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, platform })
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fff 0%, #f8f7ff 100%)' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #e4ddf5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18 }}>
          <img src="/images/prospercat-logo.png" alt="ProsperCat" style={{ width: 32, height: 32, borderRadius: 8 }} />
          ProsperCat
        </div>
        <div style={{ fontSize: 13, color: '#5a5a72' }}>Try it free — No sign up required</div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 24px 40px' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>
          Generate Your Listing in <span style={{ color: '#7c3aed' }}>30 Seconds</span>
        </h1>
        <p style={{ fontSize: 16, color: '#5a5a72', maxWidth: 500, margin: '0 auto' }}>
          Enter your product name, select platform, and get AI-generated titles, tags, and descriptions instantly.
        </p>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 12px 48px rgba(124,58,237,0.1)', border: '1px solid #e4ddf5' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#5a5a72', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Product Name</label>
            <input
              type="text"
              value={product}
              onChange={e => setProduct(e.target.value)}
              placeholder="e.g. Lavender Soy Candle, Handmade Ceramic Mug..."
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e4ddf5', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#7c3aed'}
              onBlur={e => e.target.style.borderColor = '#e4ddf5'}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#5a5a72', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Platform</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 12, border: platform === p ? '2px solid #7c3aed' : '1.5px solid #e4ddf5',
                    background: platform === p ? '#ede8ff' : '#fff', color: platform === p ? '#7c3aed' : '#5a5a72',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !product.trim()}
            style={{
              width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: loading || !product.trim() ? '#ccc' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(124,58,237,0.3)', transition: 'all 0.2s'
            }}
          >
            {loading ? '⏳ Generating...' : '⚡ Generate Listing'}
          </button>

          {error && <p style={{ color: '#dc2626', fontSize: 14, marginTop: 16, textAlign: 'center' }}>{error}</p>}

          <p style={{ fontSize: 12, color: '#9090a8', marginTop: 16, textAlign: 'center' }}>
            ✨ 3 Free Generations Daily — No Sign-Up Required
          </p>
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginTop: 24, background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 12px 48px rgba(124,58,237,0.1)', border: '1px solid #e4ddf5' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Generated Title</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0d0d1a' }}>{result.title}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>13精准 Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.tags.map((tag, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: '#ede8ff', color: '#7c3aed', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Description</div>
              <div style={{ fontSize: 14, color: '#5a5a72', lineHeight: 1.7 }}>{result.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
