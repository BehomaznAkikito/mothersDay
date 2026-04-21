// My Page (Account)
function MyPage({ onBack, onSelect }) {
  const orders = [
    { id: 'ZF-2025-1183', date: '2025-05-08', total: 5880, status: '配達完了', items: '華やぎの花束とスイーツ' },
    { id: 'ZF-2024-0927', date: '2024-11-14', total: 4980, status: '配達完了', items: 'プリザーブド ローズと和菓子' },
    { id: 'ZF-2024-0412', date: '2024-05-09', total: 6480, status: '配達完了', items: 'カーネーションと焼菓子の詰合せ' },
  ];
  const favorites = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).slice(0, 3);

  return (
    <main className="mypage-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 80px' }}>
      <div style={{
        fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)',
        textTransform: 'uppercase', marginBottom: 16,
      }}>
        ─── My Page
      </div>
      <h1 className="mypage-title" style={{
        fontFamily: "'Marcellus', 'Noto Serif JP', serif",
        fontSize: 40, fontWeight: 400, margin: '0 0 8px',
      }}>
        マイページ
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginTop: 0, marginBottom: 48 }}>
        いつもご利用ありがとうございます、<span style={{color:'var(--fg)'}}>つむぎ</span> 様
      </p>

      <div className="mypage-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start',
      }}>
        {/* SIDE — profile */}
        <aside className="mypage-side" style={{
          background: 'var(--surface-tint)', padding: 32,
        }}>
          <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: 20 }}>
            Profile
          </div>
          <dl style={{ margin: 0, display: 'grid', gap: 16 }}>
            <InfoRow label="お名前" value="鈴木 つむぎ"/>
            <InfoRow label="メールアドレス" value="tsumugi@example.com"/>
            <InfoRow label="電話番号" value="090-1234-5678"/>
            <InfoRow label="ご住所" value={'〒150-0001\n東京都渋谷区神宮前 1-2-3'}/>
            <InfoRow label="会員ランク" value="Gold（2020年〜）"/>
          </dl>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <a href="#" onClick={(e)=>e.preventDefault()} style={{
              fontSize: 12, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '.08em',
            }}>会員情報を編集する →</a>
          </div>
        </aside>

        {/* MAIN */}
        <section>
          {/* ORDER HISTORY */}
          <h2 style={{
            fontFamily: "'Marcellus', 'Noto Serif JP', serif",
            fontSize: 22, fontWeight: 400, margin: '0 0 20px',
          }}>
            ご注文履歴
          </h2>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {orders.map(o => (
              <div key={o.id} className="mypage-order-row" style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr auto',
                gap: 16, padding: '20px 0', alignItems: 'center',
                borderBottom: '1px solid var(--line)', fontSize: 13,
              }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '.08em', color: 'var(--fg-muted)' }}>{o.id}</div>
                  <div style={{ marginTop: 4 }}>{o.items}</div>
                </div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{o.date}</div>
                <div>
                  <span style={{
                    fontSize: 11, letterSpacing: '.08em', padding: '4px 10px',
                    background: 'var(--surface-tint)', color: 'var(--fg)',
                  }}>{o.status}</span>
                </div>
                <div style={{ fontFamily: "'Marcellus', serif", fontSize: 16, textAlign: 'right' }}>
                  {typeof formatYen === 'function' ? formatYen(o.total) : '¥' + o.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* FAVORITES */}
          <h2 style={{
            fontFamily: "'Marcellus', 'Noto Serif JP', serif",
            fontSize: 22, fontWeight: 400, margin: '48px 0 20px',
          }}>
            お気に入り
          </h2>
          <div className="mypage-favs" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          }}>
            {favorites.map(p => (
              <article key={p.id} onClick={() => onSelect && onSelect(p.id)}
                style={{ cursor: 'pointer' }}>
                <div style={{ marginBottom: 12 }}>
                  {typeof ProductImage === 'function'
                    ? <ProductImage product={p} ratio="1/1"/>
                    : <div style={{ background: 'var(--surface-tint)', aspectRatio: '1/1' }}/>}
                </div>
                <div style={{
                  fontSize: 14, fontFamily: "'Marcellus', 'Noto Serif JP', serif",
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>
                  {typeof formatYen === 'function' ? formatYen(p.price) : '¥' + p.price?.toLocaleString()}
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <a href="#" onClick={(e)=>{e.preventDefault(); onBack && onBack();}}
               style={{ fontSize: 12, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '.12em' }}>
              ← ショッピングに戻る
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 4 }}>
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: 13, color: 'var(--fg)', whiteSpace: 'pre-line' }}>{value}</dd>
    </div>
  );
}

Object.assign(window, { MyPage });
