// Gift Box page
function GiftBoxPage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-section" style={{
        padding: '40px 40px 60px',
        borderBottom: '1px solid var(--line)',
        position: 'relative',
        backgroundImage: 'url("assets/gift.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 640,
        display: 'flex',
        alignItems: 'flex-start',
      }}>
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
            ─── Gift Box · Packaging
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
              textShadow: '0 2px 8px rgba(0,0,0,.35)',
            }}>
              丁寧に梱包された<br/>フラワー＆お菓子のギフトボックス
            </h1>
            <p className="hero-copy" style={{
              fontSize: 14, lineHeight: 2.4, color: '#fff',
              margin: 0, maxWidth: 760, fontWeight: 500,
              textShadow: '0 1px 4px rgba(0,0,0,.4)',
            }}>
              お母様の手元に届けられる当日に丁寧に梱包されます。
              あらかじめ書いていただいたあなたからお母様へのメッセージを印刷したカードを添えて、
              お母様のお手元に。
            </p>
          </div>
        </div>
      </section>

      {/* PACKING FULL-BLEED IMAGE */}
      <section className="giftbox-packing" style={{
        padding: 0,
      }}>
        <img src="assets/packing.jpg" alt="ギフトボックスの梱包"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}/>
      </section>
    </main>
  );
}

Object.assign(window, { GiftBoxPage });
