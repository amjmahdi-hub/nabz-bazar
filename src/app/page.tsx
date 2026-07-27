import Link from "next/link";
import { Header } from "@/components/header";
import { MarketTable } from "@/components/market-table";
import { faNumber, getMarket } from "@/lib/market";

export default async function Home() {
  const market = await getMarket();
  const highlights = market.slice(0, 4);
  const funds = market.filter((x) => x.category === "fund");
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">تصویر روشن از بازار امروز</span>
              <h1>قیمت‌ها را ساده،<br/><em>شفاف</em> و یک‌جا ببینید.</h1>
              <p>ارز، طلا، سکه، کالاهای جهانی و حباب صندوق‌ها؛ همراه با تاریخچه و زمان آخرین به‌روزرسانی.</p>
              <div className="hero-actions">
                <Link className="primary-button" href="#markets">مشاهده بازارها</Link>
                <Link className="text-button" href="/data">درباره داده‌ها ←</Link>
              </div>
              <small className="disclaimer">اطلاعات این وب‌سایت صرفاً جهت اطلاع‌رسانی است و توصیه سرمایه‌گذاری نیست.</small>
            </div>
            <div className="market-preview">
              <div className="preview-top"><span>نمای بازار</span><span className="live"><i/> داده آزمایشی</span></div>
              {highlights.map((item) => {
                const p = item.latest_prices[0];
                return <div className="preview-row" key={item.id}>
                  <span><b>{item.symbol.slice(0,2)}</b>{item.name_fa}</span>
                  <strong>{faNumber(p.price, item.unit === "دلار" ? 2 : 0)}</strong>
                  <em className={p.change_percent >= 0 ? "up" : "down"}>{p.change_percent >= 0 ? "+" : ""}{faNumber(p.change_percent,2)}٪</em>
                </div>;
              })}
              <div className="mini-chart" aria-hidden="true"><svg viewBox="0 0 460 90" preserveAspectRatio="none"><path d="M0 65 C45 58,55 75,98 56 S155 48,190 59 S245 18,285 34 S350 12,380 25 S425 8,460 16"/><path className="fill" d="M0 65 C45 58,55 75,98 56 S155 48,190 59 S245 18,285 34 S350 12,380 25 S425 8,460 16 L460 90 L0 90Z"/></svg></div>
            </div>
          </div>
        </section>

        <section className="stats"><div className="container stats-grid">
          <div><strong>۱۴+</strong><span>بازار منتخب</span></div>
          <div><strong>۱ دقیقه</strong><span>هدف به‌روزرسانی</span></div>
          <div><strong>۲۴/۷</strong><span>دسترسی به تاریخچه</span></div>
          <div><strong>شفاف</strong><span>منبع و زمان داده</span></div>
        </div></section>

        <section className="section container" id="markets">
          <div className="section-title"><div><span className="eyebrow">بازار در یک نگاه</span><h2>آخرین قیمت‌ها</h2></div><span className="updated">آخرین بررسی: چند دقیقه پیش</span></div>
          <div className="tabs"><button className="active">همه بازارها</button><button>ارز</button><button>طلا و سکه</button><button>جهانی</button><button>صندوق‌ها</button></div>
          <MarketTable items={market.slice(0, 10)} />
          <p className="sample-note">تمام قیمت‌های فعلی آزمایشی‌اند و تا اتصال منبع دارای مجوز، مبنای تصمیم مالی نیستند.</p>
        </section>

        <section className="dark-section" id="funds">
          <div className="container dark-grid">
            <div><span className="eyebrow blue">مقایسه هوشمندتر</span><h2>حباب صندوق‌ها،<br/>بدون محاسبه دستی.</h2><p>فاصله قیمت بازار از NAV را کنار هم مقایسه کنید و روند تاریخی هر صندوق را ببینید.</p><Link className="light-button" href="#fund-list">مشاهده صندوق‌ها</Link></div>
            <div className="fund-card" id="fund-list">
              <div className="fund-card-head"><span>صندوق‌های طلا</span><small>بر اساس حباب</small></div>
              {(funds.length ? funds : market.slice(-2)).map((f, i) => <div className="fund-row" key={f.id}><span><b>{f.symbol.slice(0,2)}</b>{f.name_fa}</span><span><small>حباب</small><strong className={i ? "down":"up"}>{i ? "−۱٫۱۰٪":"+۱٫۶۶٪"}</strong></span></div>)}
              <div className="formula">حباب = (قیمت بازار − NAV) ÷ NAV × ۱۰۰</div>
            </div>
          </div>
        </section>

        <section className="ad container"><span>تبلیغات</span><div><small>جایگاه برند شما</small><strong>با مخاطبان علاقه‌مند به بازارهای مالی دیده شوید.</strong></div><button>اطلاعات بیشتر</button></section>
      </main>
      <footer><div className="container footer-grid"><div><div className="brand">نبض<span>بازار</span></div><p>مرجع شفاف اطلاعات بازار برای فارسی‌زبانان.</p></div><div><b>بازارها</b><a>ارز</a><a>طلا و سکه</a><a>کالاهای جهانی</a></div><div><b>اطلاعات</b><a>روش محاسبه</a><a>منابع داده</a><a>سلب مسئولیت</a></div><div><b>ارتباط</b><a>همکاری تبلیغاتی</a><a>تماس با ما</a></div></div><div className="container legal">© ۱۴۰۵ نبض بازار — همه حقوق محفوظ است.</div></footer>
    </>
  );
}
