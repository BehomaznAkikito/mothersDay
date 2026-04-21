// Product Detail page
function DetailPage({ productId, onAdd, onBack, onGoCart }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [qty, setQty] = React.useState(1);
  const [cardMessage, setCardMessage] = React.useState('いつもありがとう');
  const [delivery, setDelivery] = React.useState('2026-05-10');
  const [wrap, setWrap] = React.useState('standard');

  // Gallery sources: index 0 = hero, 1..4 = thumbnails.
  // `slots` holds indices into this list; slots[0] is the main image,
  // slots[1..4] are what's shown under each thumb position. Clicking a
  // thumb swaps its slot with slots[0], so tapping it again restores.
  const gallerySources = React.useMemo(() => [
    { src: `assets/${product.id}.jpg`, alt: product.name },
    { src: `assets/${product.id}-scale.jpg`, alt: `${product.name} — サイズ感` },
    { src: `assets/${product.id}-gift.jpg`,  alt: `${product.name} — 梱包` },
    { src: `assets/${product.id}-card.jpg`,  alt: `${product.name} — メッセージカード` },
    { src: `assets/delivery.jpg`,            alt: `配送・お渡し` },
  ], [product.id, product.name]);
  const [slots, setSlots] = React.useState([0, 1, 2, 3, 4]);
  React.useEffect(() => { setSlots([0, 1, 2, 3, 4]); }, [product.id]);
  const swapToMain = (thumbIdx) => {
    setSlots(prev => {
      const next = [...prev];
      [next[0], next[thumbIdx + 1]] = [next[thumbIdx + 1], next[0]];
      return next;
    });
  };

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    onAdd({ ...product, qty, cardMessage, delivery, wrap });
  };

  return (
    <main>
      {/* BREADCRUMB */}
      <div className="detail-breadcrumb" style={{
        maxWidth: 1440, margin: '0 auto',
        padding: '24px 40px 0',
        fontSize: 11, letterSpacing: '.14em', color: 'var(--fg-muted)', textTransform: 'uppercase',
      }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onBack();}} style={{color:'inherit', textDecoration:'none'}}>Shop</a>
        <span style={{ margin: '0 12px' }}>/</span>
        <span>{product.category}</span>
        <span style={{ margin: '0 12px' }}>/</span>
        <span style={{ color: 'var(--fg)' }}>{product.nameEn}</span>
      </div>

      {/* MAIN */}
      <section className="detail-main" style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 40px 80px' }}>
        <div className="detail-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Gallery */}
          <div>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 5',
              overflow: 'hidden',
              background: product.color,
            }}>
              <img src={gallerySources[slots[0]].src} alt={gallerySources[slots[0]].alt}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 12 }}>
              {[0,1,2,3].map(i => {
                const s = gallerySources[slots[i+1]];
                return (
                  <button key={i} onClick={() => swapToMain(i)} aria-label={`切替: ${s.alt}`}
                    style={{
                      cursor: 'pointer',
                      border: '1px solid var(--line)',
                      padding: 0, background: 'transparent',
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                    }}>
                    <img src={s.src} alt={s.alt}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                      }}/>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="detail-info" style={{ position: 'sticky', top: 120 }}>
            <div style={{
              fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)', marginBottom: 20,
              textTransform: 'uppercase',
            }}>
              ─── {product.category}
            </div>
            <h1 className="detail-title" style={{
              fontFamily: "'Marcellus', 'Noto Serif JP', serif",
              fontSize: 42, fontWeight: 400, lineHeight: 1.15,
              margin: '0 0 12px', color: 'var(--fg)',
            }}>
              {product.name}
            </h1>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)', letterSpacing: '.08em', marginBottom: 28 }}>
              {product.nameEn}
            </div>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 12,
              paddingBottom: 32, borderBottom: '1px solid var(--line)', marginBottom: 32,
            }}>
              <div className="detail-price-main" style={{ fontFamily: "'Marcellus', serif", fontSize: 36, color: 'var(--fg)' }}>
                {formatYen(product.price)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>税込 · 送料無料</div>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--fg-muted)', marginBottom: 32 }}>
              {product.tagline}。<br/>
              産地直送の季節の花と、自社工房で焼き上げたお菓子を、
              手仕事の美しい包みでお届けします。
            </p>

            {/* Option sections */}
            <OptionRow label="お届け日">
              <select value={delivery} onChange={(e)=>setDelivery(e.target.value)} style={selectStyle}>
                <option value="2026-05-08">5月8日(金) · 母の日前日</option>
                <option value="2026-05-09">5月9日(土)</option>
                <option value="2026-05-10">5月10日(日) · 母の日当日</option>
                <option value="2026-05-11">5月11日(月) · 翌日</option>
              </select>
            </OptionRow>

            <OptionRow label="ラッピング">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  {v:'standard', label:'Standard', sub:'無料'},
                  {v:'premium', label:'Premium', sub:'+¥500'},
                  {v:'furoshiki', label:'風呂敷', sub:'+¥1,200'},
                ].map(opt => (
                  <button key={opt.v} onClick={()=>setWrap(opt.v)} style={{
                    padding: '14px 10px',
                    border: '1px solid ' + (wrap === opt.v ? 'var(--fg)' : 'var(--line)'),
                    background: wrap === opt.v ? 'var(--surface-tint)' : 'var(--bg-elevated)',
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--fg)', letterSpacing: '.08em' }}>{opt.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 4 }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </OptionRow>

            <OptionRow label="メッセージカード" optional>
              <textarea value={cardMessage} onChange={(e)=>setCardMessage(e.target.value)} rows={2}
                placeholder="お母さんへのひとこと"
                style={{
                  width: '100%', padding: 12, border: '1px solid var(--line)',
                  background: 'var(--bg-elevated)', fontFamily: 'inherit',
                  fontSize: 13, color: 'var(--fg)', resize: 'none',
                }}/>
            </OptionRow>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--fg)',
              }}>
                <button onClick={()=>setQty(Math.max(1, qty-1))} style={qtyBtnStyle}>−</button>
                <div style={{ width: 48, textAlign: 'center', fontSize: 14 }}>{qty}</div>
                <button onClick={()=>setQty(qty+1)} style={qtyBtnStyle}>+</button>
              </div>
              <div style={{ flex: 1 }}>
                <PrimaryButton fullWidth onClick={handleAdd} size="lg">
                  カートに追加 — {formatYen(product.price * qty)}
                </PrimaryButton>
              </div>
            </div>

            {/* Trust row */}
            <div style={{
              marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)',
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16,
              fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '.06em',
            }}>
              <div><div style={{color:'var(--fg)', marginBottom:4}}>送料無料</div>全国一律</div>
              <div><div style={{color:'var(--fg)', marginBottom:4}}>産地直送</div>朝摘みの新鮮さ</div>
              <div><div style={{color:'var(--fg)', marginBottom:4}}>ギフト仕様</div>熨斗・手提げ無料</div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="detail-description-section" style={{
        background: 'var(--surface-tint)',
        padding: '96px 40px',
      }}>
        <div className="detail-description-grid" style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)', textTransform: 'uppercase',
          }}>
            ─── Details
          </div>
          <div>
            <h2 className="detail-description-title" style={{
              fontFamily: "'Marcellus', 'Noto Serif JP', serif",
              fontSize: 28, fontWeight: 400, margin: '0 0 24px',
              lineHeight: 1.4, color: 'var(--fg)',
            }}>
              一輪の花と、<br/>ひとくちの贅沢を、あなたらしく。
            </h2>
            <p style={{ fontSize: 14, lineHeight: 2, color: 'var(--fg-muted)', marginBottom: 40 }}>
              花は、贈る人と贈られる人の間に「特別な時間」を生み出します。
              あわせてお届けするのは、自社工房の職人が小さなバッチで焼き上げるお菓子。
              素材の甘み、生地の香り、口どけの余韻まで、すべてが「ありがとう」を語る一皿になるように仕立てました。
            </p>
            <div style={{ display: 'grid', gap: 16 }}>
              {product.details.map((d, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
                  paddingBottom: 16, borderBottom: '1px solid var(--line)',
                  fontSize: 13, color: 'var(--fg)',
                }}>
                  <div style={{ fontFamily: "'Marcellus', serif", color: 'var(--accent-ink)' }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  <div>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="related-section" style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 40px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Marcellus', 'Noto Serif JP', serif", fontSize: 32, fontWeight: 400, margin: 0 }}>
            You may also like
          </h2>
          <a href="#" onClick={(e)=>{e.preventDefault(); onBack();}}
            style={{fontSize:12, letterSpacing:'.12em', color:'var(--fg-muted)', textDecoration:'none'}}>
            View all →
          </a>
        </div>
        <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {related.map((p, i) => <ProductCard key={p.id} product={p} onSelect={()=>{}} index={i}/>)}
        </div>
      </section>
    </main>
  );
}

function OptionRow({ label, optional, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase',
        color: 'var(--fg)', marginBottom: 10, display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{label}</span>
        {optional && <span style={{color:'var(--fg-muted)'}}>Optional</span>}
      </div>
      {children}
    </div>
  );
}

const selectStyle = {
  width: '100%', padding: '14px 12px',
  border: '1px solid var(--line)',
  background: 'var(--bg-elevated)',
  fontFamily: 'inherit', fontSize: 13, color: 'var(--fg)',
  appearance: 'none', cursor: 'pointer',
};

const qtyBtnStyle = {
  width: 44, height: 44, border: 'none', background: 'transparent',
  cursor: 'pointer', fontSize: 16, color: 'var(--fg)', fontFamily: 'inherit',
};

Object.assign(window, { DetailPage });
