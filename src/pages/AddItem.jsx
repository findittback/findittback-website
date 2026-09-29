import { useState } from "react";
import { Link } from "react-router-dom";
import { createItem } from "../lib/store";
import { ITEM_TYPES } from "../lib/itemTypes";
import { DEFAULT_COUNTRY_CODE, joinPhone } from "../lib/countryCodes";
import PhoneInput from "../components/PhoneInput";
import QrImage from "../components/QrImage";
import PrintQrSheet from "../components/PrintQrSheet";

const initialForm = {
  owner_name: "",
  owner_email: "",
  owner_address: "",
  item_type: "",
  item_name: "",
  description: "",
};

export default function AddItem() {
  const [form, setForm] = useState(initialForm);
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await createItem(
        { ...form, owner_phone: joinPhone(countryCode, phoneNumber) },
        photo
      );
      setResult(created);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl border p-8 sm:p-12" style={{ borderColor: "#8FB5E8", backgroundColor: "#FFFFFF" }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs"
            style={{ backgroundColor: "var(--color-recovered-100)", color: "var(--color-recovered-500)" }}
          >
            Tag created
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "#000F26" }}>
            {result.item_name || "Your item"} is ready to travel.
          </h1>
          <p className="mt-3 font-body text-base" style={{ color: "var(--color-slate-600)" }}>
            Print the QR below and stick it on the item. Save your private manage link somewhere
            safe — it's the only way to update or remove this tag later.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-2xl border-2 p-3" style={{ borderColor: "#4A90E2" }}>
                <QrImage value={result.scan_url} size={180} alt={`QR code for ${result.item_name}`} downloadName={`findmeback-${result.code}.png`} />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <PrintQrSheet code={result.code} scanUrl={result.scan_url} brandText="FIND ME" />
          </div>

          <div
            className="mt-6 rounded-xl border p-4 font-body text-xs leading-relaxed"
            style={{ borderColor: "#8FB5E8", backgroundColor: "rgba(143,181,232,0.1)", color: "var(--color-slate-600)" }}
          >
            Heads up: this tag works without any server — the details you entered are saved to
            this browser <em>and</em> baked directly into the QR code you just printed. That's
            what lets a stranger's phone read your tag with no app and no login. If you edit your
            details later, reprint the QR so the new sticker carries the update — the old sticker
            will keep showing what was on it when you printed it.
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => {
                setResult(null);
                setForm(initialForm);
                setCountryCode(DEFAULT_COUNTRY_CODE);
                setPhoneNumber("");
                setPhoto(null);
                setPhotoPreview(null);
              }}
              className="rounded-full border px-6 py-3 font-body text-sm font-semibold"
              style={{ borderColor: "#000F26", color: "#000F26" }}
            >
              Register another item
            </button>
            <Link
              to={`/manage/${result.code}/${result.edit_token}`}
              className="rounded-full px-6 py-3 font-body text-sm font-semibold"
              style={{ backgroundColor: "#4A90E2", color: "#FFFFFF" }}
            >
              Open manage page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-16 sm:px-8" style={{ backgroundColor: "rgba(143,181,232,0.08)" }}>
      <div className="mx-auto max-w-2xl">
        <span className="font-mono text-xs tracking-widest" style={{ color: "#4A90E2" }}>
          REGISTER AN ITEM
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "#000F26" }}>
          Give it a tag.
        </h1>
        <p className="mt-3 font-body text-base" style={{ color: "var(--color-slate-600)" }}>
          Every field below is optional — fill in as much or as little as you're comfortable
          sharing. More detail makes it easier for a finder to reach you.
        </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:p-9" style={{ borderColor: "#8FB5E8", backgroundColor: "#FFFFFF" }}>
        <div>
          <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
            Your name <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
          </label>
          <input
            value={form.owner_name}
            onChange={(e) => update("owner_name", e.target.value)}
            placeholder="Enter your name"
            className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
            style={{ borderColor: "#8FB5E8" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Phone number <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
            </label>
            <PhoneInput
              countryCode={countryCode}
              number={phoneNumber}
              onCountryCodeChange={setCountryCode}
              onNumberChange={setPhoneNumber}
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Email <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
            </label>
            <input
              type="email"
              value={form.owner_email}
              onChange={(e) => update("owner_email", e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#8FB5E8" }}
            />
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
            Address <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
          </label>
          <input
            value={form.owner_address}
            onChange={(e) => update("owner_address", e.target.value)}
            placeholder="e.g. area / locality, city"
            className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
            style={{ borderColor: "#8FB5E8" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Item type <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
            </label>
            <select
              value={form.item_type}
              onChange={(e) => update("item_type", e.target.value)}
              className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#8FB5E8" }}
            >
              {ITEM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Item name <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
            </label>
            <input
              value={form.item_name}
              onChange={(e) => update("item_name", e.target.value)}
              placeholder="e.g. Blue backpack"
              className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#8FB5E8" }}
            />
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
            Description <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Anything that helps someone recognise it."
            className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
            style={{ borderColor: "#8FB5E8" }}
          />
        </div>

        <div>
          <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
            Photo <span style={{ color: "var(--color-slate-400)" }}>(optional)</span>
          </label>
          <div className="mt-2 flex items-center gap-4">
            {photoPreview && (
              <img src={photoPreview} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
            )}
            <label
              className="cursor-pointer rounded-xl border border-dashed px-4 py-3 font-body text-sm font-medium"
              style={{ borderColor: "#8FB5E8", color: "var(--color-slate-600)" }}
            >
              {photo ? photo.name : "Choose a photo"}
              <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </label>
          </div>
          <p className="mt-2 font-body text-xs" style={{ color: "var(--color-slate-400)" }}>
            Photos are saved on this device only — they won't appear when someone else scans your
            printed QR from a different phone.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-full px-6 py-3.5 font-body text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-60"
          style={{ backgroundColor: "#4A90E2", color: "#FFFFFF" }}
        >
          {submitting ? "Creating your tag…" : "Create my tag"}
        </button>
      </form>
      </div>
    </div>
  );
}