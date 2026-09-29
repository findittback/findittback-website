import { useState } from "react";
import { Printer } from "lucide-react";
import { QR_SHEET_SIZES, generateQrSheetPdf } from "../lib/qrPdf";

const DEFAULT_QTY = { small: 4, medium: 2, large: 1, xlarge: 0 };

export default function PrintQrSheet({ code, scanUrl, brandText = "FIND ME" }) {
  const [selected, setSelected] = useState({ small: true, medium: true, large: false, xlarge: false });
  const [qty, setQty] = useState(DEFAULT_QTY);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  function toggle(key) {
    setSelected((s) => ({ ...s, [key]: !s[key] }));
  }

  function setQuantity(key, value) {
    const n = Math.max(0, Math.min(30, Number(value) || 0));
    setQty((q) => ({ ...q, [key]: n }));
  }

  async function handleGenerate() {
    setError(null);
    const selections = QR_SHEET_SIZES.filter((s) => selected[s.key] && qty[s.key] > 0).map((s) => ({
      size: s.key,
      qty: qty[s.key],
    }));
    if (selections.length === 0) {
      setError("Pick at least one size with a quantity of 1 or more.");
      return;
    }
    setGenerating(true);
    try {
      const doc = await generateQrSheetPdf({ code, scanUrl, brandText, selections });
      doc.save(`findmeback-${code}-qr-sheet.pdf`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-paper-200)", backgroundColor: "var(--color-paper-100)" }}>
      <div className="flex items-center gap-2">
        <Printer className="h-4 w-4" style={{ color: "var(--color-brass-500)" }} />
        <p className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
          Print a QR sticker sheet
        </p>
      </div>
      <p className="mt-1 font-body text-xs" style={{ color: "var(--color-slate-600)" }}>
        Pick one size, or mix several, and get a single printable PDF sheet with cut guides.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {QR_SHEET_SIZES.map((size) => (
          <label
            key={size.key}
            className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5"
            style={{ borderColor: "var(--color-paper-200)", backgroundColor: "#fff" }}
          >
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={!!selected[size.key]}
                onChange={() => toggle(size.key)}
                className="h-4 w-4"
              />
              <span className="font-body text-sm font-medium" style={{ color: "#000F26" }}>
                {size.label}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-body text-xs" style={{ color: "var(--color-slate-400)" }}>
                Qty
              </span>
              <input
                type="number"
                min={0}
                max={30}
                value={qty[size.key]}
                disabled={!selected[size.key]}
                onChange={(e) => setQuantity(size.key, e.target.value)}
                className="w-16 rounded-lg border px-2 py-1 font-body text-sm outline-none disabled:opacity-40"
                style={{ borderColor: "var(--color-paper-200)" }}
              />
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-3 font-body text-xs" style={{ color: "var(--color-lost-500)" }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={generating}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-60"
        style={{ backgroundColor: "#000F26", color: "#F7F5F0" }}
      >
        {generating ? "Preparing PDF…" : "Download printable PDF"}
      </button>
    </div>
  );
}
