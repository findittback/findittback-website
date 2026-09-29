import { COUNTRY_CODES } from "../lib/countryCodes";

export default function PhoneInput({ countryCode, number, onCountryCodeChange, onNumberChange, placeholder }) {
  return (
    <div className="mt-2 flex gap-2">
      <select
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className="w-[128px] shrink-0 rounded-xl border bg-white px-2 py-3 font-body text-sm outline-none"
        style={{ borderColor: "var(--color-paper-200)" }}
        aria-label="Country code"
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.code + c.country} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={number}
        onChange={(e) => onNumberChange(e.target.value)}
        placeholder={placeholder || "e.g. 81690 XXXXX"}
        className="w-full rounded-xl border px-4 py-3 font-body text-base outline-none"
        style={{ borderColor: "var(--color-paper-200)" }}
      />
    </div>
  );
}
