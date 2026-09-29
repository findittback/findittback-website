import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { listItems } from "../lib/store";
import { itemTypeIcon, itemTypeLabel, STATUS_META } from "../lib/itemTypes";

export default function ItemsList() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    listItems()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load the list right now.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <span className="font-mono text-xs tracking-widest" style={{ color: "#4A90E2" }}>
        REGISTERED TAGS
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "#000F26" }}>
        Yes — items are really being tagged.
      </h1>
      <p className="mt-3 max-w-xl font-body text-base" style={{ color: "#4F6075" }}>
        Items you've registered on Find It Back, from this browser. No phone numbers or emails
        here — open a tag to see its own scan page.
      </p>

      {error && (
        <p className="mt-10 font-body text-sm" style={{ color: "#D14343" }}>
          {error}
        </p>
      )}

      {!items && !error && (
        <p className="mt-10 font-body text-sm" style={{ color: "#4F6075" }}>
          Loading registered tags…
        </p>
      )}

      {items && items.length === 0 && (
        <div
          className="mt-10 rounded-2xl border border-dashed p-10 text-center"
          style={{ borderColor: "#E5EAF2" }}
        >
          <p className="font-body text-sm" style={{ color: "#4F6075" }}>
            No items registered yet.
          </p>
          <Link
            to="/add"
            className="mt-4 inline-block rounded-full px-6 py-3 font-body text-sm font-semibold transition hover:-translate-y-0.5"
            style={{ backgroundColor: "#4A90E2", color: "#FFFFFF" }}
          >
            Register the first one
          </Link>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = itemTypeIcon(item.item_type);
            const status = STATUS_META[item.status];
            return (
              <Link
                key={item.code}
                to={`/i/${item.code}`}
                className="group flex flex-col gap-4 rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: "#E5EAF2", backgroundColor: "#FFFFFF" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(74,144,226,0.12)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#4A90E2" }} strokeWidth={1.75} />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 font-body text-xs font-semibold"
                    style={{ backgroundColor: status.bg, color: status.fg }}
                  >
                    {status.label}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold" style={{ color: "#000F26" }}>
                    {item.item_name}
                  </h3>
                  <p className="mt-0.5 font-body text-sm" style={{ color: "#4F6075" }}>
                    {itemTypeLabel(item.item_type)}
                  </p>
                </div>

                <div
                  className="mt-auto flex items-center justify-between border-t pt-3"
                  style={{ borderColor: "#EEF1F6" }}
                >
                  <span className="flex items-center gap-1.5 font-body text-xs font-medium" style={{ color: "#2E9E6B" }}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Registered
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#8A99AD" }}>
                    {item.code}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}