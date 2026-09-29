import { Link, useLocation } from "react-router-dom";
import TagMark from "./TagMark";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 z-40 border-b ${
        isHome
          ? "border-white/10 bg-ink-950/90 backdrop-blur"
          : "border-slate-200/70 bg-paper-50/90 backdrop-blur"
      }`}
      style={{
        borderColor: isHome ? "rgba(255,255,255,0.4)" : "var(--color-paper-200)",
        
        backgroundColor: isHome ? "#000F26" : "rgba(255,255,255,0.9)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <TagMark className="h-7 w-7" />
          <span
            className="font-display text-lg font-semibold tracking-tight"
            style={{ color: isHome ? "#FFFFFF" : "#000F26" }}
          >
            Find&nbsp;Itt&nbsp;Back
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/#how-it-works"
            className="hidden font-body text-sm font-medium sm:block"
            style={{ color: isHome ? "#8FB5E8" : "#4A90E2" }}
          >
            How it works
          </Link>
          <Link
            to="/items"
            className="hidden font-body text-sm font-medium sm:block"
            style={{ color: isHome ? "#8FB5E8" : "#4A90E2" }}
          >
            Registered items
          </Link>
          <Link
            to="/add"
            className="rounded-full px-4 py-2 font-body text-sm font-semibold transition hover:-translate-y-0.5"
            style={{ backgroundColor: "#4A90E2", color: "#FFFFFF" }}
          >
            Register an item
          </Link>
        </nav>
      </div>
    </header>
  );
}