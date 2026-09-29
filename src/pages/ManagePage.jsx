import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteManagedItem, getManagedItem, updateManagedItem } from "../lib/store";
import { ITEM_TYPES, STATUS_META } from "../lib/itemTypes";
import { splitPhone, joinPhone } from "../lib/countryCodes";
import PhoneInput from "../components/PhoneInput";
import QrImage from "../components/QrImage";
import PrintQrSheet from "../components/PrintQrSheet";

export default function ManagePage() {
  const { code, token } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [form, setForm] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getManagedItem(code, token)
      .then((data) => {
        if (cancelled) return;
        setItem(data);
        const { countryCode: cc, number } = splitPhone(data.owner_phone);
        setCountryCode(cc);
        setPhoneNumber(number);
        setForm({
          owner_name: data.owner_name || "",
          owner_email: data.owner_email || "",
          owner_address: data.owner_address || "",
          item_type: data.item_type || "",
          item_name: data.item_name || "",
          description: data.description || "",
        });
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code, token]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateManagedItem(
        code,
        token,
        { ...form, owner_phone: joinPhone(countryCode, phoneNumber) },
        photo
      );
      setItem(updated);
      setPhoto(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(status) {
    const updated = await updateManagedItem(code, token, { status });
    setItem(updated);
  }

  async function handleDelete() {
    await deleteManagedItem(code, token);
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <p className="font-body text-sm" style={{ color: "#4F6075" }}>
          Opening your tag…
        </p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-semibold" style={{ color: "#000F26" }}>
          This manage link isn't valid
        </h1>
        <p className="mt-3 font-body text-sm" style={{ color: "#4F6075" }}>
          Either the link was typed wrong, this tag was deleted, or it was created in a different
          browser than this one. Manage links only work in the browser that created the tag, and
          can't be recovered if lost — you'd need to register a new tag.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-16 sm:px-8" style={{ backgroundColor: "#F5F4EF" }}>
    <div className="mx-auto max-w-3xl">
      <span className="font-mono text-xs tracking-widest" style={{ color: "#4A90E2" }}>
        MANAGE TAG · {code}
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight" style={{ color: "#000F26" }}>
        {item.item_name || "Untitled item"}
      </h1>

      {/* Status control */}
      <div
        className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border p-4 shadow-sm"
        style={{ borderColor: "#E5EAF2", backgroundColor: "#FFFFFF" }}
      >
        <span className="font-body text-sm font-medium" style={{ color: "#4F6075" }}>
          Status:
        </span>
        {Object.entries(STATUS_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setStatus(key)}
            className="rounded-full px-4 py-1.5 font-body text-xs font-semibold transition"
            style={{
              backgroundColor: item.status === key ? meta.fg : meta.bg,
              color: item.status === key ? "#FFFFFF" : meta.fg,
            }}
          >
            {meta.label}
          </button>
        ))}
      </div>

      <div
        className="mt-10 grid grid-cols-1 gap-10 rounded-2xl border p-6 shadow-sm sm:grid-cols-[200px_1fr] sm:p-9"
        style={{ borderColor: "#E5EAF2", backgroundColor: "#FFFFFF" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl border-2 p-3" style={{ borderColor: "#4A90E2" }}>
            <QrImage value={item.scan_url} size={160} alt={`QR code for ${item.item_name}`} downloadName={`findmeback-${code}.png`} />
          </div>
          <p className="text-center font-mono text-xs" style={{ color: "#8A99AD" }}>
            {item.scan_count || 0} scan{item.scan_count === 1 ? "" : "s"}
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Your name <span style={{ color: "#8A99AD" }}>(optional)</span>
            </label>
            <input
              value={form.owner_name}
              onChange={(e) => update("owner_name", e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#E5EAF2" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
                Phone number <span style={{ color: "#8A99AD" }}>(optional)</span>
              </label>
              <PhoneInput
                countryCode={countryCode}
                number={phoneNumber}
                onCountryCodeChange={(v) => { setCountryCode(v); setSaved(false); }}
                onNumberChange={(v) => { setPhoneNumber(v); setSaved(false); }}
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
                Email <span style={{ color: "#8A99AD" }}>(optional)</span>
              </label>
              <input
                type="email"
                value={form.owner_email}
                onChange={(e) => update("owner_email", e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
                style={{ borderColor: "#E5EAF2" }}
              />
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Address <span style={{ color: "#8A99AD" }}>(optional)</span>
            </label>
            <input
              value={form.owner_address}
              onChange={(e) => update("owner_address", e.target.value)}
              placeholder="e.g. area / locality, city"
              className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#E5EAF2" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
                Item type <span style={{ color: "#8A99AD" }}>(optional)</span>
              </label>
              <select
                value={form.item_type}
                onChange={(e) => update("item_type", e.target.value)}
                className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-body text-base outline-none"
                style={{ borderColor: "#E5EAF2" }}
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
                Item name <span style={{ color: "#8A99AD" }}>(optional)</span>
              </label>
              <input
                value={form.item_name}
                onChange={(e) => update("item_name", e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
                style={{ borderColor: "#E5EAF2" }}
              />
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Description <span style={{ color: "#8A99AD" }}>(optional)</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
              style={{ borderColor: "#E5EAF2" }}
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold" style={{ color: "#000F26" }}>
              Photo <span style={{ color: "#8A99AD" }}>(optional)</span>
            </label>
            <div className="mt-2 flex items-center gap-4">
              {(photoPreview || item.photo) && (
                <img
                  src={photoPreview || item.photo}
                  alt="Item"
                  className="h-16 w-16 rounded-lg object-cover"
                  style={{ border: "1px solid #E5EAF2" }}
                />
              )}
              <label
                className="cursor-pointer rounded-xl border border-dashed px-4 py-3 font-body text-sm font-medium"
                style={{ borderColor: "#E5EAF2", color: "#4F6075" }}
              >
                {photo ? photo.name : item.photo ? "Change photo" : "Add a photo"}
                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full px-6 py-3 font-body text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundColor: "#4A90E2", color: "#FFFFFF" }}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saved && (
              <span className="font-body text-sm font-medium" style={{ color: "#2E9E6B" }}>
                Saved — reprint your QR below to carry the update
              </span>
            )}
          </div>
        </form>
      </div>

      <div className="mt-10">
        <PrintQrSheet code={code} scanUrl={item.scan_url} brandText="FIND ME" />
      </div>

      <div
        className="mt-10 rounded-2xl border p-6 shadow-sm"
        style={{ borderColor: "#F3D2D2", backgroundColor: "#FFFFFF" }}
      >
        <h2 className="font-display text-lg font-semibold" style={{ color: "#000F26" }}>
          Delete this tag
        </h2>
        <p className="mt-1 font-body text-sm" style={{ color: "#4F6075" }}>
          This removes the tag from your dashboard on this device. Any printed QR codes already
          out in the world will keep showing the details they were printed with, since they don't
          depend on a server.
        </p>
        {!confirmingDelete ? (
          <button
            onClick={() => setConfirmingDelete(true)}
            className="mt-4 rounded-full border px-5 py-2.5 font-body text-sm font-semibold"
            style={{ borderColor: "#D14343", color: "#D14343" }}
          >
            Delete tag
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="rounded-full px-5 py-2.5 font-body text-sm font-semibold"
              style={{ backgroundColor: "#D14343", color: "#FFFFFF" }}
            >
              Yes, delete permanently
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              className="font-body text-sm font-medium"
              style={{ color: "#4F6075" }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}