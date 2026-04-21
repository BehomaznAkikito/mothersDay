// Shared atoms: Header, Footer, Logo, SVG placeholders, etc.

const { useState, useEffect, useMemo, useRef, createContext, useContext } = React;

// ====== THEME CONTEXT ======
const ThemeContext = createContext(null);

const THEMES = {
  luxe: {
    name: 'Luxe',
    '--bg': '#F6F3EE',
    '--bg-elevated': '#FFFFFF',
    '--bg-inverse': '#0E0E0E',
    '--fg': '#0E0E0E',
    '--fg-muted': '#6B6760',
    '--fg-inverse': '#F6F3EE',
    '--line': '#E3DED5',
    '--line-strong': '#1A1A1A',
    '--accent': '#A8864B',      // muted gold
    '--accent-ink': '#826634',
    '--surface-tint': '#EFEAE0',
    '--shadow': '0 1px 2px rgba(20,18,14,.04), 0 8px 24px rgba(20,18,14,.06)',
  },
  soft: {
    name: 'Soft',
    '--bg': '#FBF7F4',
    '--bg-elevated': '#FFFFFF',
    '--bg-inverse': '#2A1E20',
    '--fg': '#2A1E20',
    '--fg-muted': '#8B7A7C',
    '--fg-inverse': '#FBF7F4',
    '--line': '#EFE3DE',
    '--line-strong': '#D9BFB6',
    '--accent': '#C77A7A',      // dusty rose
    '--accent-ink': '#A75A5A',
    '--surface-tint': '#F3E6DE',
    '--shadow': '0 1px 2px rgba(80,40,40,.04), 0 8px 24px rgba(80,40,40,.06)',
  },
  casual: {
    name: 'Casual',
    '--bg': '#FFFDF7',
    '--bg-elevated': '#FFFFFF',
    '--bg-inverse': '#1E2B24',
    '--fg': '#1E2B24',
    '--fg-muted': '#6B7A72',
    '--fg-inverse': '#FFFDF7',
    '--line': '#E7EAE3',
    '--line-strong': '#1E2B24',
    '--accent': '#5B8C6E',      // fresh green
    '--accent-ink': '#3E6B50',
    '--surface-tint': '#EEF3EA',
    '--shadow': '0 1px 2px rgba(20,40,30,.04), 0 8px 24px rgba(20,40,30,.06)',
  },
};

function applyTheme(themeKey) {
  const t = THEMES[themeKey] || THEMES.luxe;
  const root = document.documentElement;
  Object.entries(t).forEach(([k, v]) => {
    if (k.startsWith('--')) root.style.setProperty(k, v);
  });
}

// ====== PRODUCT DATA ======
const PRODUCTS = [
  {
    id: 'bloom-001',
    name: '華やぎの花束とスイーツ',
    nameEn: 'Bloom & Sweets Set',
    price: 4980,
    tagline: '定番人気。春の花とバターサブレのセット',
    color: '#E7B6B2',
    category: '花 × 焼菓子',
    details: ['季節の生花アレンジ（直径 約18cm）', '焼菓子 6種 12個入り', '母の日メッセージカード付き'],
    featured: true,
  },
  {
    id: 'bloom-002',
    name: 'プリザーブド ローズと和菓子',
    nameEn: 'Preserved Rose & Wagashi',
    price: 5880,
    tagline: '永く残るプリザーブドと京の和菓子',
    color: '#D4A5A5',
    category: '花 × 和菓子',
    details: ['プリザーブドローズ BOX', '京の上生菓子 8個入り', 'メッセージカード付き'],
  },
  {
    id: 'bloom-003',
    name: 'カーネーション花束とマカロン',
    nameEn: 'Carnation & Macaron',
    price: 4280,
    tagline: '母の日クラシック。カーネーションを上質に',
    color: '#EAC3C0',
    category: '花 × 洋菓子',
    details: ['カーネーション花束', 'マカロン 10個入り', 'メッセージカード付き'],
  },
  {
    id: 'bloom-004',
    name: 'ホワイトブーケとフィナンシェ',
    nameEn: 'White Bouquet & Financier',
    price: 5480,
    tagline: '清楚な白一色ブーケと焼菓子の組合せ',
    color: '#EFE9E1',
    category: '花 × 焼菓子',
    details: ['白系季節花ブーケ', 'フィナンシェ 8個入り', 'メッセージカード付き'],
  },
  {
    id: 'bloom-005',
    name: '胡蝶蘭ミニとカステラ',
    nameEn: 'Mini Phalaenopsis & Castella',
    price: 7980,
    tagline: '格別な贈り物に。胡蝶蘭と長崎カステラ',
    color: '#F5E6D3',
    category: '花 × 和菓子',
    details: ['胡蝶蘭ミニ鉢（3本立）', '長崎カステラ 1本', '化粧箱入り'],
  },
  {
    id: 'bloom-006',
    name: 'アジサイ鉢とチョコレート',
    nameEn: 'Hydrangea & Chocolate',
    price: 4680,
    tagline: '長く楽しめる鉢植えとベルギーチョコ',
    color: '#B8C5D9',
    category: '花 × 洋菓子',
    details: ['アジサイ鉢（5号）', 'ベルギーチョコ 15個入り', 'メッセージカード付き'],
  },
];

// SVG PLACEHOLDER / real image
// If product.id matches "bloom-NNN" we assume assets/<id>.jpg exists.
const BLOOM_IMAGES = new Set(['bloom-001','bloom-002','bloom-003','bloom-004','bloom-005','bloom-006']);

function ProductImage({ product, ratio = '1/1', label = true }) {
  const [r1, r2] = ratio.split('/').map(Number);
  const hasPhoto = BLOOM_IMAGES.has(product.id);

  if (hasPhoto) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        background: product.color,
      }}>
        <img src={`assets/${product.id}.jpg`} alt={product.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}/>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      background: product.color,
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${r1*100} ${r2*100}`} preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, opacity: .28, mixBlendMode: 'multiply' }}>
        <defs>
          <pattern id={`weave-${product.id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0,0,0,.35)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#weave-${product.id})`}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,.4), transparent 60%)',
      }}/>
      {label && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 10,
            letterSpacing: '.08em',
            color: 'rgba(20,15,10,.55)',
            textTransform: 'uppercase',
            padding: '4px 10px',
            border: '1px solid rgba(20,15,10,.25)',
          }}>
            [ {product.nameEn} — photo ]
          </div>
        </div>
      )}
    </div>
  );
}

// ====== WORDMARK ======
function Wordmark({ size = 22 }) {
  return (
    <div style={{
      fontFamily: "'Marcellus', 'Noto Serif JP', serif",
      fontSize: size,
      letterSpacing: '.18em',
      color: 'var(--fg)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
    }}>
      <span>Zun Florist</span>
      <span style={{ fontSize: size * 0.45, letterSpacing: '.3em', color: 'var(--fg-muted)' }}>
        — GIFT MAISON
      </span>
    </div>
  );
}

// ====== HEADER ======
function Header({ page, onNav, cartCount }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navItems = [
    { label: '母の日ギフト', page: 'list', active: page === 'list' },
    { label: 'ギフトボックス', page: 'giftbox', active: page === 'giftbox' },
    { label: 'カード制作', page: 'card', active: page === 'card' },
    { label: '手渡しギフト', page: 'delivery', active: page === 'delivery' },
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      {/* Thin announcement bar */}
      <div className="announce-bar" style={{
        borderBottom: '1px solid var(--line)',
        fontSize: 11,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--fg-muted)',
        padding: '8px 40px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>Mother's Day 2026 · Orders close May 8</span>
        <span>Free Shipping · 全国送料無料</span>
      </div>
      {/* Main bar */}
      <div className="header-main" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '20px 40px',
        gap: 32,
      }}>
        {/* Desktop nav */}
        <nav className="desktop-only" style={{ display: 'flex', gap: 28, fontSize: 13, letterSpacing: '.08em' }}>
          {navItems.map(n => (
            <a key={n.label} href="#" onClick={(e)=>{e.preventDefault(); if (n.page) onNav(n.page);}}
               style={{
                 color: n.active ? 'var(--fg)' : 'var(--fg-muted)',
                 textDecoration: 'none',
                 fontWeight: n.active ? 500 : 400,
               }}>
              {n.label}
            </a>
          ))}
        </nav>
        {/* Mobile hamburger */}
        <button
          className="mobile-only icon-btn"
          aria-label="メニューを開く"
          onClick={() => setDrawerOpen(true)}
          style={{ display: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        <a href="#" className="header-logo-link" onClick={(e)=>{e.preventDefault(); onNav('list');}} style={{textDecoration:'none', justifySelf: 'center'}}>
          <MobileAwareWordmark/>
        </a>

        {/* Desktop actions */}
        <div className="desktop-only" style={{ display: 'flex', gap: 22, justifyContent: 'flex-end', fontSize: 13, alignItems: 'center' }}>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav('contact');}}
             style={{color: page === 'contact' ? 'var(--fg)' : 'var(--fg-muted)', textDecoration:'none'}}>お問い合わせ</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav('mypage');}}
             style={{color: page === 'mypage' ? 'var(--fg)' : 'var(--fg-muted)', textDecoration:'none'}}>マイページ</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav('cart');}}
             style={{color:'var(--fg)', textDecoration:'none', display:'flex', alignItems:'center', gap:6}}>
            Cart
            <span style={{
              background: 'var(--fg)',
              color: 'var(--fg-inverse)',
              fontSize: 10,
              minWidth: 18, height: 18,
              padding: '0 5px',
              borderRadius: 9,
              display:'inline-flex', alignItems:'center', justifyContent:'center',
            }}>
              {cartCount}
            </span>
          </a>
        </div>

        {/* Mobile cart icon */}
        <button
          className="mobile-only icon-btn"
          aria-label="カート"
          onClick={() => onNav('cart')}
          style={{ display: 'none', justifySelf: 'end', position: 'relative' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h2l2.6 10.4A2 2 0 0 0 10.55 18h7.9a2 2 0 0 0 1.95-1.57L22 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10.5" cy="20.5" r="1.3" fill="currentColor"/>
            <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor"/>
          </svg>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: 2, right: 0,
              background: 'var(--fg)', color: 'var(--fg-inverse)',
              fontSize: 9, minWidth: 16, height: 16,
              padding: '0 4px', borderRadius: 8,
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              letterSpacing: 0,
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={'mobile-drawer-backdrop' + (drawerOpen ? ' open' : '')}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={'mobile-drawer' + (drawerOpen ? ' open' : '')} aria-hidden={!drawerOpen}>
        <div className="mobile-drawer-head">
          <Wordmark size={18}/>
          <button className="icon-btn" aria-label="閉じる" onClick={() => setDrawerOpen(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="mobile-drawer-nav">
          {navItems.map(n => (
            <a key={n.label} href="#"
               onClick={(e) => { e.preventDefault(); if (n.page) onNav(n.page); setDrawerOpen(false); }}
               style={{ color: n.active ? 'var(--fg)' : 'var(--fg)', fontWeight: n.active ? 500 : 400 }}>
              {n.label}
            </a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); onNav('contact'); setDrawerOpen(false); }}>お問い合わせ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNav('mypage'); setDrawerOpen(false); }}>マイページ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNav('cart'); setDrawerOpen(false); }}>
            カート（{cartCount}）
          </a>
        </nav>
      </aside>
    </header>
  );
}

function MobileAwareWordmark() {
  return (
    <div className="header-logo-wordmark" style={{
      fontFamily: "'Marcellus', 'Noto Serif JP', serif",
      fontSize: 22,
      letterSpacing: '.18em',
      color: 'var(--fg)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
    }}>
      <span>Zun Florist</span>
      <span style={{ fontSize: 10, letterSpacing: '.3em', color: 'var(--fg-muted)' }}>
        — GIFT MAISON
      </span>
    </div>
  );
}

// ====== FOOTER ======
function Footer({ onNav }) {
  const nav = onNav || (()=>{});
  return (
    <footer className="footer" style={{
      borderTop: '1px solid var(--line)',
      marginTop: 120,
      padding: '60px 40px 40px',
      background: 'var(--bg)',
    }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, maxWidth: 1440, margin: '0 auto' }}>
        <div className="footer-intro">
          <Wordmark size={20}/>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--fg-muted)', marginTop: 16, maxWidth: 320 }}>
            創業1923年。季節の花と上質な菓子を、心を込めて贈り届ける老舗の贈り物専門店。
          </p>
        </div>
        <FooterCol title="Shop" items={['Mother\'s Day', 'Flowers', 'Sweets', 'Gift Sets']}/>
        <FooterCol title="Service" items={['Shipping', 'Returns', 'FAQ', 'Contact']}/>
        <FooterCol title="Company" items={['About', 'Journal', 'Stores', 'Careers']}/>
      </div>
      <div className="footer-bottom" style={{
        maxWidth: 1440, margin: '40px auto 0',
        paddingTop: 24, borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '.08em',
      }}>
        <span>© 2026 Zun Florist</span>
        <span style={{ display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>プライバシーポリシー</a>
          <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>利用規約</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); nav('tokutei');}}
             style={{ color: 'inherit', textDecoration: 'underline' }}>特定商取引法に基づく表記</a>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{
        fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
        color: 'var(--fg)', marginBottom: 16,
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display:'grid', gap: 10 }}>
        {items.map(i => (
          <li key={i}><a href="#" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

// ====== BUTTONS ======
function PrimaryButton({ children, onClick, fullWidth, size='md' }) {
  const padding = size==='lg' ? '18px 32px' : '14px 24px';
  return (
    <button onClick={onClick} style={{
      background: 'var(--fg)',
      color: 'var(--fg-inverse)',
      border: 'none',
      padding,
      fontSize: 13,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'inherit',
      transition: 'opacity .15s',
    }}
    onMouseOver={e=>e.currentTarget.style.opacity='.85'}
    onMouseOut={e=>e.currentTarget.style.opacity='1'}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, fullWidth }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent',
      color: 'var(--fg)',
      border: '1px solid var(--fg)',
      padding: '14px 24px',
      fontSize: 13,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'inherit',
    }}>
      {children}
    </button>
  );
}

// ====== PRICE ======
function formatYen(n) {
  return '¥' + n.toLocaleString('ja-JP');
}

Object.assign(window, {
  THEMES, applyTheme, ThemeContext,
  PRODUCTS, ProductImage, Wordmark,
  Header, Footer, PrimaryButton, GhostButton,
  formatYen,
});
