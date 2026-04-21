// Contact page
function ContactPage({ onBack }) {
  const [subject, setSubject] = React.useState('お届けについて');

  return (
    <main className="contact-main" style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 40px 80px' }}>
      <div style={{
        fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)',
        textTransform: 'uppercase', marginBottom: 16,
      }}>
        ─── Contact
      </div>
      <h1 className="contact-title" style={{
        fontFamily: "'Marcellus', 'Noto Serif JP', serif",
        fontSize: 40, fontWeight: 400, margin: '0 0 12px',
      }}>
        お問い合わせ
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 13, lineHeight: 2, margin: '0 0 48px', maxWidth: 640 }}>
        ご注文・配送・ラッピングに関するご質問はこちらからお気軽にお問い合わせください。
        内容を確認のうえ、2営業日以内にご返信いたします。
      </p>

      <div className="contact-grid" style={{
        display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, alignItems: 'start',
      }}>
        {/* FORM */}
        <form onSubmit={(e)=>{ e.preventDefault(); alert('サンプルサイトのため送信は行われません。'); }}>
          <Field label="お名前" required>
            <input type="text" placeholder="山田 花子" style={inputStyle}/>
          </Field>
          <Field label="メールアドレス" required>
            <input type="email" placeholder="hanako@example.com" style={inputStyle}/>
          </Field>
          <Field label="お問い合わせ種別" required>
            <select value={subject} onChange={(e)=>setSubject(e.target.value)} style={inputStyle}>
              <option>お届けについて</option>
              <option>ラッピングについて</option>
              <option>商品について</option>
              <option>ギフトカードについて</option>
              <option>その他</option>
            </select>
          </Field>
          <Field label="ご注文番号（任意）">
            <input type="text" placeholder="ZF-YYYY-XXXX" style={inputStyle}/>
          </Field>
          <Field label="お問い合わせ内容" required>
            <textarea rows={6} placeholder="ご質問・ご要望をご記入ください" style={{ ...inputStyle, resize: 'vertical' }}/>
          </Field>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, alignItems: 'center' }}>
            <PrimaryButton size="lg">送信する</PrimaryButton>
            <a href="#" onClick={(e)=>{e.preventDefault(); onBack && onBack();}}
               style={{ fontSize: 12, color: 'var(--fg-muted)', textDecoration: 'none', letterSpacing: '.12em' }}>
              ← ショッピングに戻る
            </a>
          </div>
        </form>

        {/* SIDE INFO */}
        <aside style={{ background: 'var(--surface-tint)', padding: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: 18 }}>
            Direct Contact
          </div>
          <dl style={{ margin: 0, display: 'grid', gap: 18, fontSize: 13, lineHeight: 1.8 }}>
            <div>
              <dt style={sideDtStyle}>お電話</dt>
              <dd style={sideDdStyle}>0120-1923-23<br/><span style={{color:'var(--fg-muted)', fontSize:12}}>（10:00–18:00／土日祝定休）</span></dd>
            </div>
            <div>
              <dt style={sideDtStyle}>メール</dt>
              <dd style={sideDdStyle}>support@zunflorist.example</dd>
            </div>
            <div>
              <dt style={sideDtStyle}>よくあるご質問</dt>
              <dd style={sideDdStyle}>
                <a href="#" onClick={(e)=>e.preventDefault()} style={{color:'var(--fg)', textDecoration:'underline'}}>FAQ を見る</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}

const inputStyle = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  border: '1px solid var(--line)', padding: '12px 14px',
  fontFamily: 'inherit', fontSize: 14, background: 'var(--bg)', color: 'var(--fg)',
};
const sideDtStyle = { fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 4 };
const sideDdStyle = { margin: 0 };

function Field({ label, required, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 20 }}>
      <span style={{ display: 'block', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg)', marginBottom: 8 }}>
        {label}{required && <span style={{ color: '#C04B3D', marginLeft: 6 }}>*</span>}
      </span>
      {children}
    </label>
  );
}

Object.assign(window, { ContactPage });
