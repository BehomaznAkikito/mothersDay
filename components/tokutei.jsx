// 特定商取引法に基づく表記
function TokuteiPage({ onBack }) {
  const rows = [
    ['販売事業者', '株式会社 Zun Florist'],
    ['運営責任者', '鈴木 太郎'],
    ['所在地', '〒150-0001\n東京都渋谷区神宮前 1-2-3 Zun Building 4F'],
    ['電話番号', '0120-1923-23\n（受付時間 10:00–18:00／土日祝定休）'],
    ['メールアドレス', 'support@zunflorist.example'],
    ['ホームページURL', 'https://zunflorist.example'],
    ['販売価格', '各商品ページに税込価格で表示しております。'],
    ['商品代金以外の必要料金', '全国送料無料（一部離島を除く）。\nラッピングの種別によって追加料金が発生する場合がございます。'],
    ['お支払方法', 'クレジットカード／銀行振込／コンビニ決済／Amazon Pay'],
    ['お支払時期', 'クレジットカードはご注文時確定。\n銀行振込・コンビニ決済はご注文から7日以内にお支払いください。'],
    ['商品の引渡し時期', 'ご指定の配送日に合わせて、提携フローリストより当日お届けいたします。\n母の日当日お届けをご希望の場合、5月8日（金）までにご注文ください。'],
    ['返品・交換について', '商品の性質上、お客様都合によるご返品はお受けしておりません。\n万一、商品に不備があった場合は、お届け日より3日以内にご連絡ください。'],
    ['キャンセルについて', '生花を使用しているため、ご注文後のキャンセルは承れません。\n配送日の変更については、発送日の3日前までにご連絡ください。'],
  ];

  return (
    <main className="tokutei-main" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px 80px' }}>
      <div style={{
        fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)',
        textTransform: 'uppercase', marginBottom: 16,
      }}>
        ─── Legal
      </div>
      <h1 className="tokutei-title" style={{
        fontFamily: "'Marcellus', 'Noto Serif JP', serif",
        fontSize: 32, fontWeight: 400, margin: '0 0 12px',
      }}>
        特定商取引法に基づく表記
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 12, marginBottom: 40 }}>
        最終更新日：2026年4月1日
      </p>

      <dl className="tokutei-list" style={{
        margin: 0, borderTop: '1px solid var(--line)',
      }}>
        {rows.map(([label, value]) => (
          <div key={label} className="tokutei-row" style={{
            display: 'grid', gridTemplateColumns: '220px 1fr',
            padding: '20px 0', gap: 24,
            borderBottom: '1px solid var(--line)',
            alignItems: 'start',
          }}>
            <dt style={{
              fontSize: 12, letterSpacing: '.08em', color: 'var(--fg)', fontWeight: 500,
            }}>{label}</dt>
            <dd style={{
              margin: 0, fontSize: 13, lineHeight: 2, color: 'var(--fg)',
              whiteSpace: 'pre-line',
            }}>{value}</dd>
          </div>
        ))}
      </dl>

      <div style={{ marginTop: 48 }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onBack && onBack();}}
           style={{ fontSize: 12, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '.12em' }}>
          ← ショッピングに戻る
        </a>
      </div>
    </main>
  );
}

Object.assign(window, { TokuteiPage });
