import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#000F26" }}>
        Page not found
      </h1>
      <p className="mt-3 font-body text-sm" style={{ color: "var(--color-slate-600)" }}>
        That page doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full px-6 py-3 font-body text-sm font-semibold"
        style={{ backgroundColor: "var(--color-brass-400)", color: "#000F26" }}
      >
        Back home
      </Link>
    </div>
  );
}
