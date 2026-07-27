import Link from "next/link";
import { faNumber, MarketItem } from "@/lib/market";

export function MarketTable({ items, compact = false }: { items: MarketItem[]; compact?: boolean }) {
  return (
    <div className="market-table">
      <div className="market-head">
        <span>بازار</span><span>قیمت</span><span>تغییر ۲۴ ساعت</span><span>وضعیت</span>
      </div>
      {items.map((item) => {
        const latest = item.latest_prices[0];
        const up = latest.change_percent >= 0;
        return (
          <Link href={`/market/${item.slug}`} className="market-row" key={item.id}>
            <span className="asset">
              <b className={`asset-icon ${item.category}`}>{item.symbol.slice(0, 2)}</b>
              <span><strong>{item.name_fa}</strong><small>{item.symbol}</small></span>
            </span>
            <span className="number">{faNumber(latest.price, item.unit === "دلار" ? 2 : 0)} <small>{item.unit}</small></span>
            <span className={`number change ${up ? "up" : "down"}`}>{up ? "+" : ""}{faNumber(latest.change_percent, 2)}٪</span>
            <span className="status"><i /> {compact ? "فعال" : "داده آزمایشی"}</span>
          </Link>
        );
      })}
    </div>
  );
}
