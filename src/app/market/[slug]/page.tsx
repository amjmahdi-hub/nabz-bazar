import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { faNumber, getMarket } from "@/lib/market";

export default async function MarketDetail({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  const item = (await getMarket()).find((x) => x.slug === slug);
  if (!item) notFound();
  const p = item.latest_prices[0];
  return <><Header/><main className="detail container">
    <Link href="/#markets" className="back">← بازگشت به بازارها</Link>
    <div className="detail-head"><div><span className="eyebrow">{item.symbol}</span><h1>{item.name_fa}</h1><p>آخرین داده معتبر ثبت‌شده</p></div><div><strong className="big-number">{faNumber(p.price, item.unit === "دلار" ? 2 : 0)}</strong><span>{item.unit}</span><em className={p.change_percent >= 0 ? "up":"down"}>{p.change_percent >= 0 ? "+":""}{faNumber(p.change_percent,2)}٪</em></div></div>
    <div className="chart-card"><div className="chart-tools"><b>روند قیمت</b><div><button className="active">۱ روز</button><button>۱ هفته</button><button>۱ ماه</button><button>۱ سال</button></div></div><svg className="detail-chart" viewBox="0 0 900 260" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0052ff" stopOpacity=".18"/><stop offset="1" stopColor="#0052ff" stopOpacity="0"/></linearGradient></defs><path className="gridline" d="M0 50H900M0 120H900M0 190H900"/><path className="area" d="M0 210 C80 190,120 205,180 165 S280 190,350 135 S460 155,520 100 S630 118,700 72 S810 96,900 42 L900 260H0Z"/><path className="line" d="M0 210 C80 190,120 205,180 165 S280 190,350 135 S460 155,520 100 S630 118,700 72 S810 96,900 42"/></svg></div>
    <div className="info-grid"><div><small>منبع</small><b>{p.source_name}</b></div><div><small>زمان مشاهده</small><b>چند دقیقه پیش</b></div><div><small>وضعیت کیفیت</small><b className="up">معتبر آزمایشی</b></div></div>
  </main></>;
}
