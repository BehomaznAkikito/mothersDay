// Cart + Checkout complete
function CartPage({ cart, onUpdateQty, onRemove, onCheckout, onBack }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const wrapFee = cart.reduce((s, it) => s + (it.wrap === 'premium' ? 500 : it.wrap === 'furoshiki' ? 1200 : 0) * it.qty, 0);
  const total = subtotal + wrapFee;

  if (cart.length === 0) {
    return (
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)', marginBottom: 24 }}>
          ─── Cart
        </div>
        <h1 style={{ fontFamily: "'Marcellus', serif", fontSize: 48, fontWeight: 400, margin: '0 0 20px' }}>
          Your cart is empty
        </h1>
        <p style={{ color: 'var(--fg-muted)', marginBottom: 40 }}>
          お気に入りのギフトを、ぜひ見つけてください。
        </p>
        <PrimaryButton onClick={onBack} size="lg">ショップへ戻る</PrimaryButton>
      </main>
    );
  }

  return (
    <main className="cart-main" style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 40px 80px' }}>
      {/* Progress */}
      <CheckoutProgress step={0}/>

      <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'start', marginTop: 40 }}>
        {/* Items */}
        <section>
          <h1 className="cart-title" style={{
            fontFamily: "'Marcellus', 'Noto Serif JP', serif",
            fontSize: 36, fontWeight: 400, margin: '0 0 32px',
          }}>
            Shopping Cart <span style={{color:'var(--fg-muted)', fontSize:16}}>({cart.length})</span>
          </h1>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {cart.map((item, idx) => (
              <CartItem key={idx} item={item} idx={idx} onUpdateQty={onUpdateQty} onRemove={onRemove}/>
            ))}
          </div>

          <a href="#" onClick={(e)=>{e.preventDefault(); onBack();}}
            style={{
              display: 'inline-block', marginTop: 32,
              fontSize: 12, letterSpacing: '.12em', color: 'var(--fg-muted)', textDecoration: 'none',
            }}>
            ← ショッピングを続ける
          </a>
        </section>

        {/* Summary */}
        <aside className="cart-summary" style={{
          background: 'var(--surface-tint)',
          padding: 36,
          position: 'sticky', top: 120,
        }}>
          <h2 style={{
            fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
            margin: '0 0 24px', color: 'var(--fg)',
          }}>
            Order Summary
          </h2>

          <SummaryRow label="小計" value={formatYen(subtotal)}/>
          <SummaryRow label="ラッピング" value={wrapFee ? formatYen(wrapFee) : '—'}/>
          <SummaryRow label="配送料" value="無料"/>

          <div style={{
            margin: '24px 0', borderTop: '1px solid var(--line-strong)',
          }}/>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 28,
          }}>
            <div style={{ fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>Total</div>
            <div style={{ fontFamily: "'Marcellus', serif", fontSize: 32 }}>{formatYen(total)}</div>
          </div>

          <PrimaryButton fullWidth onClick={onCheckout} size="lg">
            レジに進む
          </PrimaryButton>

          <div style={{
            marginTop: 20, padding: 16, background: 'var(--bg-elevated)',
            fontSize: 12, lineHeight: 1.7, color: 'var(--fg-muted)',
          }}>
            <div style={{ color: 'var(--fg)', marginBottom: 6, letterSpacing: '.08em' }}>
              ✓ 5月8日(金)までのご注文で母の日当日お届け
            </div>
            お支払方法：クレジットカード / 銀行振込 / コンビニ決済 / Amazon Pay
          </div>
        </aside>
      </div>
    </main>
  );
}

function CheckoutProgress({ step }) {
  const steps = ['01 Cart', '02 Shipping', '03 Payment', '04 Complete'];
  return (
    <div className="checkout-progress" style={{
      display: 'flex', gap: 32, paddingBottom: 32,
      borderBottom: '1px solid var(--line)',
    }}>
      {steps.map((s, i) => (
        <div key={i} style={{
          fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase',
          color: i <= step ? 'var(--fg)' : 'var(--fg-muted)',
          borderTop: i <= step ? '1px solid var(--fg)' : '1px solid transparent',
          paddingTop: 14,
          flex: 1,
        }}>
          {s}
        </div>
      ))}
    </div>
  );
}

function CartItem({ item, idx, onUpdateQty, onRemove }) {
  return (
    <div className="cart-item" style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr auto',
      gap: 24,
      padding: '24px 0',
      borderBottom: '1px solid var(--line)',
      alignItems: 'start',
    }}>
      <div style={{ width: '100%', maxWidth: 120 }}>
        <ProductImage product={item} ratio="4/5" label={false}/>
      </div>
      <div>
        <div style={{
          fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--fg-muted)', marginBottom: 6,
        }}>
          {item.category}
        </div>
        <h3 className="cart-item-name" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 20, fontWeight: 400, margin: '0 0 12px',
        }}>
          {item.name}
        </h3>
        <div style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>
          <div>お届け：{item.delivery}</div>
          <div>ラッピング：{ {standard:'Standard', premium:'Premium', furoshiki:'風呂敷'}[item.wrap]}</div>
          {item.cardMessage && <div style={{fontStyle:'italic'}}>"{item.cardMessage}"</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid var(--line)',
          }}>
            <button onClick={()=>onUpdateQty(idx, Math.max(1, item.qty-1))} style={smallQtyBtn}>−</button>
            <div style={{ width: 32, textAlign: 'center', fontSize: 13 }}>{item.qty}</div>
            <button onClick={()=>onUpdateQty(idx, item.qty+1)} style={smallQtyBtn}>+</button>
          </div>
          <button onClick={()=>onRemove(idx)} style={{
            background: 'none', border: 'none',
            fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-muted)',
            cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit',
          }}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item-price" style={{
        fontFamily: "'Marcellus', serif", fontSize: 20, color: 'var(--fg)', textAlign: 'right',
      }}>
        {formatYen(item.price * item.qty)}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '8px 0', fontSize: 13, color: 'var(--fg)',
    }}>
      <span style={{color:'var(--fg-muted)'}}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const smallQtyBtn = {
  width: 32, height: 32, border: 'none', background: 'transparent',
  cursor: 'pointer', fontSize: 14, color: 'var(--fg)', fontFamily: 'inherit',
};

// ====== CONFIRM PAGE ======
function ConfirmPage({ cart, onRestart, onBack }) {
  const orderNum = React.useMemo(() => 'OM-' + Math.floor(Math.random() * 900000 + 100000), []);
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const wrapFee = cart.reduce((s, it) => s + (it.wrap === 'premium' ? 500 : it.wrap === 'furoshiki' ? 1200 : 0) * it.qty, 0);
  const total = subtotal + wrapFee;
  const firstItem = cart[0];

  return (
    <main className="confirm-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 80px' }}>
      <CheckoutProgress step={3}/>

      <div className="confirm-hero" style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--fg)', color: 'var(--fg-inverse)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, marginBottom: 24,
        }}>✓</div>
        <div style={{ fontSize: 11, letterSpacing: '.28em', color: 'var(--accent-ink)', marginBottom: 16 }}>
          ─── Order Confirmed
        </div>
        <h1 className="confirm-title" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 56, fontWeight: 400, margin: '0 0 20px', lineHeight: 1.1,
        }}>
          ご注文ありがとうございました
        </h1>
        <p style={{ fontSize: 15, color: 'var(--fg-muted)', maxWidth: 520, margin: '0 auto 16px', lineHeight: 1.8 }}>
          お届け日の前日に発送いたします。配送状況はご登録メールにお送りしました。
        </p>
        <div className="confirm-meta-row" style={{
          display:'inline-flex', gap: 32, fontSize: 12, letterSpacing: '.12em',
          color: 'var(--fg-muted)', marginTop: 24,
        }}>
          <div>Order № <span style={{color:'var(--fg)'}}>{orderNum}</span></div>
          <div>Total <span style={{color:'var(--fg)'}}>{formatYen(total)}</span></div>
        </div>
      </div>

      {/* Summary card */}
      <div className="confirm-summary" style={{
        background: 'var(--surface-tint)',
        padding: 48,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
        maxWidth: 900, margin: '0 auto',
      }}>
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--fg-muted)', marginBottom: 16,
          }}>Delivery To</div>
          <div style={{ fontSize: 15, lineHeight: 1.8 }}>
            山田 花子 様<br/>
            〒100-0001 東京都千代田区<br/>
            千代田1-1-1<br/>
            090-0000-0000
          </div>
          <div style={{
            marginTop: 24, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--fg-muted)', marginBottom: 16,
          }}>Delivery Date</div>
          <div style={{ fontSize: 18, fontFamily: "'Marcellus', serif" }}>
            {firstItem?.delivery || '2026-05-10'}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--fg-muted)', marginBottom: 16,
          }}>Order Details</div>
          {cart.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '12px 0', borderBottom: '1px solid var(--line)',
              fontSize: 13,
            }}>
              <div>
                <div>{item.name}</div>
                <div style={{color:'var(--fg-muted)', fontSize:11, marginTop:2}}>× {item.qty}</div>
              </div>
              <div style={{fontFamily:"'Marcellus',serif"}}>{formatYen(item.price * item.qty)}</div>
            </div>
          ))}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-strong)',
            fontSize: 14,
          }}>
            <span>Total</span>
            <span style={{fontFamily:"'Marcellus',serif", fontSize: 22}}>{formatYen(total)}</span>
          </div>
        </div>
      </div>

      <div className="confirm-actions" style={{
        textAlign: 'center', marginTop: 48,
        display: 'flex', gap: 16, justifyContent: 'center',
      }}>
        <GhostButton onClick={onBack}>ショップに戻る</GhostButton>
        <PrimaryButton onClick={onRestart}>注文履歴を見る</PrimaryButton>
      </div>

      {/* Editorial close */}
      <div className="confirm-editorial" style={{
        marginTop: 120, padding: '80px 40px', borderTop: '1px solid var(--line)',
        textAlign: 'center',
      }}>
        <div className="confirm-editorial-text" style={{
          fontFamily: "'Marcellus', 'Noto Serif JP', serif",
          fontSize: 32, lineHeight: 1.5, maxWidth: 640, margin: '0 auto',
          color: 'var(--fg)', fontStyle: 'italic',
        }}>
          「ありがとう」と伝える、<br/>その一瞬のために。
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { CartPage, ConfirmPage });
