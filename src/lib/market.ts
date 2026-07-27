export type MarketItem = {
  id: string;
  slug: string;
  symbol: string;
  name_fa: string;
  category: string;
  unit: string;
  sort_order: number;
  latest_prices: {
    price: number;
    change_value: number;
    change_percent: number;
    observed_at: string;
    source_name: string;
  }[];
};

const fallback: MarketItem[] = [
  ["usd-irr", "USD", "دلار آمریکا", "currency", "تومان", 98750, 0.72],
  ["eur-irr", "EUR", "یورو", "currency", "تومان", 114200, 0.31],
  ["gold-18k", "G18", "طلای ۱۸ عیار", "gold", "تومان", 7862400, 0.64],
  ["emami-coin", "EMAMI", "سکه امامی", "coin", "تومان", 91250000, -0.48],
  ["global-gold", "XAU", "طلای جهانی", "commodity", "دلار", 2371.4, 0.22],
  ["global-silver", "XAG", "نقره جهانی", "commodity", "دلار", 31.2, -0.16],
  ["brent", "BRENT", "نفت برنت", "commodity", "دلار", 82.7, 0.91],
  ["gold-fund-alpha", "طلا", "صندوق طلای آفتاب", "fund", "تومان", 18420, 1.65],
].map((x, i) => ({
  id: String(i),
  slug: x[0] as string,
  symbol: x[1] as string,
  name_fa: x[2] as string,
  category: x[3] as string,
  unit: x[4] as string,
  sort_order: i,
  latest_prices: [{
    price: x[5] as number,
    change_value: 0,
    change_percent: x[6] as number,
    observed_at: new Date().toISOString(),
    source_name: "داده آزمایشی",
  }],
}));

export async function getMarket(): Promise<MarketItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ujqvnbsepoudtlifcuvt.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_ECAZXZwrD2lb8VGQcDqsTg_Y864YKuB";
  try {
    const response = await fetch(
      `${url}/rest/v1/instruments?select=id,slug,symbol,name_fa,category,unit,sort_order,latest_prices(price,change_value,change_percent,observed_at,source_name)&is_active=eq.true&order=sort_order`,
      { headers: { apikey: key }, next: { revalidate: 60 } },
    );
    if (!response.ok) return fallback;
    const data = await response.json();
    const normalized = data.map((item: MarketItem & { latest_prices: MarketItem["latest_prices"] | MarketItem["latest_prices"][number] | null }) => ({
      ...item,
      latest_prices: Array.isArray(item.latest_prices)
        ? item.latest_prices
        : item.latest_prices
          ? [item.latest_prices]
          : [],
    })).filter((item: MarketItem) => item.latest_prices.length > 0);
    return normalized.length ? normalized : fallback;
  } catch {
    return fallback;
  }
}

export function faNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: digits,
  }).format(value);
}
