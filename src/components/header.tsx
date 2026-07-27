import Link from "next/link";

export function Header() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link className="brand" href="/">نبض<span>بازار</span></Link>
        <nav>
          <Link href="/#markets">بازارها</Link>
          <Link href="/#funds">صندوق‌ها</Link>
          <Link href="/data">درباره داده‌ها</Link>
        </nav>
        <div className="nav-actions">
          <button aria-label="جستجو" className="icon-button">⌕</button>
          <Link className="admin-link" href="/admin">پنل مدیریت</Link>
        </div>
      </div>
    </header>
  );
}
