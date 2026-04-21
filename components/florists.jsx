// Florists story page
const FLORISTS = [
  {
    id: 'florist-0001',
    area: '東京都・町田市',
    shop: 'フラワーショップ・まちだ',
    name: '田町 萌',
    honorific: 'さん',
    bio:
      '町田の商店街で祖母の代から続く小さな花店を営んでいます。母の日のアレンジメントは、贈る方の「お母さんの好きな色」を必ずお聞きしてから仕立てるのが決まりごと。淡いピンクと白を基調に、芍薬やスプレーバラで柔らかな表情を添えます。カーネーションは一本だけ少し長めに残し、花束を解いた時に真っ先に目に入るよう配置しています。',
  },
  {
    id: 'florist-0002',
    area: '北海道・札幌市',
    shop: '札幌ブルーム',
    name: '北村 蒼介',
    honorific: 'さん',
    bio:
      '北海道の厳しい冬を越えて咲く花たちの強さが好きで、札幌の地でアトリエを構えて12年になります。母の日のブーケは、道内の契約農家から届いたカーネーションとユーカリを主役に、雪解け後の野に咲く花のような、凛とした佇まいを意識して束ねています。受け取った方が思わず深呼吸したくなる、そんな一束を心掛けています。',
  },
  {
    id: 'florist-0003',
    area: '福岡県・福岡市博多区',
    shop: '博多フローラ',
    name: '博多 健太',
    honorific: 'さん',
    bio:
      '博多の市場で働く母の姿を見て育ち、花屋を志しました。男性らしい大胆な構成を得意としつつ、母の日には必ず母から教わった「一本一本に手紙を込める」心持ちで仕立てます。芯に深紅のカーネーションを据え、周囲に白とクリームのバラを重ねる構成は、祖母が好んでいた花束へのオマージュ。力強さと優しさの同居する一束をお届けします。',
  },
  {
    id: 'florist-0004',
    area: '京都府・京都市',
    shop: '京花舎 にしじん',
    name: '西陣 彩',
    honorific: 'さん',
    bio:
      '西陣織の工房が並ぶ路地裏で、季節の花と和の設えを融合させた花仕事を続けています。母の日には和紙や水引を添え、床の間にもしっくり馴染むアレンジを。紅碧のカーネーションに芍薬や撫子を合わせ、日本の五月の空気を一束に閉じ込めるように仕立てます。お母様が毎日眺めても飽きない、静かな一輪を目指しています。',
  },
  {
    id: 'florist-0005',
    area: '石川県・金沢市',
    shop: '金澤草花堂',
    name: '金澤 美咲',
    honorific: 'さん',
    bio:
      '金沢の町家を改装した店舗で、加賀の伝統色を花で表現する仕事をしています。母の日のアレンジは、加賀五彩を下敷きに、臙脂・黄土・草・群青・古代紫を花で置き換えて構成。主役は石川県産のカーネーションで、地元の職人が漉いた和紙で仕立てたリボンで結びます。どこか懐かしい、けれど今の気分に寄り添う花束を大切にしています。',
  },
  {
    id: 'florist-0006',
    area: '沖縄県・那覇市',
    shop: '那覇ガーデン',
    name: '比嘉 直樹',
    honorific: 'さん',
    bio:
      '沖縄本島で育った南国の花々と、本土から届く季節の花を組み合わせるのが私の流儀です。母の日には、県産のブーゲンビリアやハイビスカスを添えた、太陽のような明るいブーケを仕立てます。カーネーションにはあえて鮮やかなオレンジを選び、受け取ったお母様の顔がぱっと明るくなる瞬間を想像しながら。島の風を感じる一束を全国へお届けします。',
  },
];

function FloristsPage({ onBack }) {
  return (
    <main className="florists-main">
      {/* HERO */}
      <section className="florists-hero" style={{
        padding: '80px 40px 60px',
        textAlign: 'center',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)',
          textTransform: 'uppercase', marginBottom: 24,
        }}>
          ─── Our Florists
        </div>
        <h1 className="florists-title" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 44, fontWeight: 400, margin: '0 0 20px',
          lineHeight: 1.3,
        }}>
          花を選ぶ人の、その手元まで。
        </h1>
        <p className="florists-lead" style={{
          fontSize: 14, lineHeight: 2.2, color: 'var(--fg-muted)',
          margin: '0 auto', maxWidth: 680,
        }}>
          Zun Florist の母の日ギフトは、全国各地で花と向き合い続けてきたフローリストたちが、
          発送当日の朝に一束ずつ仕立てます。お母様のもとに届く花を、
          選び、束ね、送り出す——その人たちの物語です。
        </p>
      </section>

      {/* FLORIST LIST */}
      <section className="florists-section" style={{
        maxWidth: 1200, margin: '0 auto', padding: '80px 40px',
      }}>
        <div className="florists-list" style={{ display: 'grid', gap: 96 }}>
          {FLORISTS.map((f, i) => (
            <FloristCard key={f.id} florist={f} index={i}/>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '0 40px 80px' }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onBack && onBack();}}
           style={{ fontSize: 12, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '.12em' }}>
          ← ショッピングに戻る
        </a>
      </section>
    </main>
  );
}

function FloristCard({ florist, index }) {
  const reverse = index % 2 === 1;
  return (
    <article className="florist-card" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 64,
      alignItems: 'center',
      direction: reverse ? 'rtl' : 'ltr',
    }}>
      <div style={{ direction: 'ltr' }}>
        <div style={{
          aspectRatio: '2/3',
          overflow: 'hidden',
          background: 'var(--surface-tint)',
        }}>
          <img src={`assets/${florist.id}.png`} alt={`${florist.name} ${florist.honorific}のポートレート`}
            style={{
              display: 'block', width: '100%', height: '100%',
              objectFit: 'cover',
            }}/>
        </div>
      </div>
      <div className="florist-body" style={{ direction: 'ltr' }}>
        <div style={{
          fontSize: 11, letterSpacing: '.18em', color: 'var(--accent-ink)',
          textTransform: 'uppercase', marginBottom: 14,
        }}>
          №{String(index + 1).padStart(2, '0')} · Florist
        </div>
        <div className="florist-area" style={{
          fontSize: 12, letterSpacing: '.14em', color: 'var(--fg-muted)',
          marginBottom: 8,
        }}>
          {florist.area}
        </div>
        <div className="florist-shop" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 18, color: 'var(--fg)',
          marginBottom: 4,
        }}>
          {florist.shop}
        </div>
        <h2 className="florist-name" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 32, fontWeight: 400, margin: '0 0 28px',
          lineHeight: 1.2,
        }}>
          {florist.name}<span style={{ fontSize: 18, marginLeft: 10, color: 'var(--fg-muted)' }}>{florist.honorific}</span>
        </h2>
        <p className="florist-bio" style={{
          fontSize: 14, lineHeight: 2.2, color: 'var(--fg)',
          margin: 0, maxWidth: 520,
        }}>
          {florist.bio}
        </p>
      </div>
    </article>
  );
}

Object.assign(window, { FloristsPage, FLORISTS });
