// Product List page
const { useState: useStateList } = React;

function ListPage({ onSelect, onReadStory }) {
  const [category, setCategory] = React.useState('all');
  const categories = ['all', '花 × 焼菓子', '花 × 和菓子', '花 × 洋菓子'];
  const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <main>
      {/* HERO */}
      <section className="hero-section" style={{
        padding: '40px 40px 60px',
        borderBottom: '1px solid var(--line)',
        position: 'relative',
        backgroundImage: 'url("assets/hero.jpg?v=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 640,
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        {/* legibility overlay — darken top-left for white text */}
        <div className="hero-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 45%, rgba(0,0,0,0) 75%)',
          pointerEvents: 'none',
        }}/>
        <div className="hero-inner" style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', width: '100%' }}>
          <div className="hero-eyebrow" style={{
            fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase',
            color: '#fff', marginBottom: 28, opacity: .9,
            textShadow: '0 1px 2px rgba(0,0,0,.3)',
          }}>
            ─── Mother's Day · 2026
          </div>
          <div>
            <h1 className="hero-title" style={{
              fontFamily: "'Marcellus', 'Noto Serif JP', serif",
              fontSize: 36,
              lineHeight: 1.3,
              fontWeight: 700,
              letterSpacing: '-.01em',
              margin: '0 0 40px',
              color: '#fff',
              maxWidth: 960,
              whiteSpace: 'nowrap',
              textShadow: '0 2px 8px rgba(0,0,0,.35)',
            }}>
              箱を開けた瞬間、<br/><span style={{ fontStyle: 'italic', color: '#FFD9C9' }}>『これ好き』</span>が伝わる。<br/>
              母の日のカーネーションと、<br/>ひとくちのお菓子。
            </h1>
            <p className="hero-copy" style={{
              fontSize: 14, lineHeight: 2.4, color: '#fff',
              margin: 0, maxWidth: 480, fontWeight: 500,
              textShadow: '0 1px 4px rgba(0,0,0,.4)',
            }}>
              いつも想っているのに、言葉にするのは少し照れくさい。
              そんな気持ちをのせて、季節の花とこだわりのお菓子を、
              母の日に。全国送料無料・5月8日までのご注文で母の日にお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip" style={{
        padding: '22px 40px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--surface-tint)',
      }}>
        <div className="trust-strip-grid" style={{
          maxWidth: 1440, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          fontSize: 12, letterSpacing: '.08em', color: 'var(--fg)',
          textAlign: 'center',
        }}>
          <div>全国送料無料</div>
          <div>母の日指定配送</div>
          <div>生花は産地直送</div>
          <div>メッセージカード無料</div>
        </div>
      </section>

      {/* FILTER */}
      <section className="filter-section" style={{ padding: '64px 40px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="filter-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
          <h2 className="filter-title" style={{
            fontFamily: "'Marcellus', 'Noto Serif JP', serif",
            fontSize: 32, fontWeight: 400, margin: 0, color: 'var(--fg)',
          }}>
            Gift Sets
            <span style={{ fontSize: 13, color: 'var(--fg-muted)', marginLeft: 16, letterSpacing: '.1em' }}>
              {filtered.length} items
            </span>
          </h2>
          <div className="filter-chips" style={{ display: 'flex', gap: 4 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                background: category === c ? '#6E3A3A' : 'transparent',
                color: category === c ? '#FBF3EC' : 'var(--fg)',
                border: '1px solid ' + (category === c ? '#6E3A3A' : 'var(--line)'),
                padding: '8px 16px',
                fontSize: 12,
                letterSpacing: '.08em',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                {c === 'all' ? 'すべて' : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="product-grid-section" style={{ padding: '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="product-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px 32px',
        }}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} onSelect={() => onSelect(p.id)} index={i}/>
          ))}
        </div>
      </section>

      {/* EDITORIAL BAND */}
      <section className="editorial-band" style={{
        background: '#6E3A3A',  /* dusty wine/rose — mother's day appropriate */
        color: '#FBF3EC',
        padding: '96px 40px',
      }}>
        <div className="editorial-grid" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center',
        }}>
          <div style={{ aspectRatio: '4/5', background: 'rgba(255,255,255,.08)', position:'relative', overflow: 'hidden' }}>
            <img src="assets/atelier.jpg" alt="アトリエで花束を仕立てるフローリスト"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}/>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.28em', color: '#F4C9B8', marginBottom: 24 }}>
              OUR CRAFT
            </div>
            <h3 className="editorial-title" style={{
              fontFamily: "'Marcellus', 'Noto Serif JP', serif",
              fontSize: 44, lineHeight: 1.15, fontWeight: 400, margin: '0 0 24px',
            }}>
              花を選ぶ人の、<br/>その手元まで。
            </h3>
            <p className="editorial-copy" style={{ fontSize: 15, lineHeight: 2, opacity: .75, maxWidth: 480, marginBottom: 32 }}>
              提携農家から届く季節の花を、専属のフローリストが一つひとつ束ねます。
              お菓子はすべて、自社工房の職人が焼き上げたもの。
              届いた時に一番美しい状態になるよう、発送当日の朝に仕立てます。
            </p>
            <GhostButtonDark onClick={()=>{ onReadStory && onReadStory(); }}>Read the story</GhostButtonDark>
          </div>
        </div>
      </section>
    </main>
  );
}

function GhostButtonDark({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent',
      color: 'var(--fg-inverse)',
      border: '1px solid var(--fg-inverse)',
      padding: '14px 24px',
      fontSize: 12,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      fontFamily: 'inherit',
    }}>{children}</button>
  );
}

function ProductCard({ product, onSelect, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onClick={onSelect}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{ cursor: 'pointer' }}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20,
      }}>
        <div style={{
          transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
        }}>
          <ProductImage product={product} ratio="4/5"/>
        </div>
        {product.featured && (
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: '#E36B5E', color: '#FFF7F2',
            fontSize: 11, letterSpacing: '.08em', padding: '6px 12px',
            fontWeight: 600,
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>★ 当店イチオシ</div>
        )}
        <div className="product-cta-overlay" style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: 16,
          transform: hover ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
        }}>
          <div style={{
            background: '#6E3A3A', color: '#FBF3EC',
            textAlign: 'center', padding: '14px',
            fontSize: 13, letterSpacing: '.08em',
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 500,
          }}>
            このギフトを見る
          </div>
        </div>
      </div>
      <div>
        <div style={{
          fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--fg-muted)', marginBottom: 6,
        }}>
          №{String(index+1).padStart(2,'0')} · {product.category}
        </div>
        <h3 className="product-card-title" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 20, fontWeight: 400, margin: 0, color: 'var(--fg)',
          letterSpacing: '.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {product.name}
        </h3>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: 16, marginTop: 6,
        }}>
          <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.5, flex: 1 }}>
            {product.tagline}
          </p>
          <div style={{
            fontFamily: "'Marcellus', serif", fontSize: 18, color: 'var(--fg)',
            whiteSpace: 'nowrap',
          }}>
            {formatYen(product.price)}
          </div>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { ListPage });
