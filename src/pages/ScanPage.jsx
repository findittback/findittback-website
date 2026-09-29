import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import {
  getPublicItem,
  markItemFound,
  scanUrl as buildScanUrl,
} from "../lib/store";

import { itemTypeLabel, STATUS_META } from "../lib/itemTypes";
import { phoneDigits } from "../lib/countryCodes";

import TagMark from "../components/TagMark";
import QrImage from "../components/QrImage";

export default function ScanPage() {
  const { code } = useParams();
  const [searchParams] = useSearchParams();

  const embedded = searchParams.get("d");

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [confirmingFound, setConfirmingFound] = useState(false);
  const [markingFound, setMarkingFound] = useState(false);
  const [foundNoticeOnly, setFoundNoticeOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getPublicItem(code, embedded)
      .then((data) => {
        if (!cancelled) {
          setItem(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't find a tag with this code.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  async function handleMarkFound() {
    setMarkingFound(true);

    try {
      if (item.source === "local") {
        const updated = await markItemFound(code);

        setItem({
          ...updated,
          source: "local",
        });
      } else {
        // Viewed from another device via the embedded link.
        // There's no server to persist this to, so just acknowledge it.
        setItem({
          ...item,
          status: "recovered",
        });

        setFoundNoticeOnly(true);
      }

      setConfirmingFound(false);
    } finally {
      setMarkingFound(false);
    }
  }

  const hasPhone = !!item?.owner_phone;
  const hasEmail = !!item?.owner_email;
  const hasContact = hasPhone || hasEmail;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#000F26" }}
    >
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-10 sm:py-16">
        {/* LOGO */}
        <Link to="/" className="mx-auto mb-8 flex items-center gap-2">
          <TagMark className="h-6 w-6" />

          <span
            className="font-display text-base font-semibold"
            style={{ color: "#FFFFFF" }}
          >
            Find It Back
          </span>
        </Link>

        {/* LOADING */}
        {loading && (
          <p
            className="text-center font-body text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Looking up this tag…
          </p>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div
            className="rounded-3xl p-8 text-center"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <h1
              className="font-display text-xl font-semibold"
              style={{ color: "#000F26" }}
            >
              Tag not found
            </h1>

            <p
              className="mt-2 font-body text-sm"
              style={{ color: "#4C5A70" }}
            >
              {error} Double-check the code and try again.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl px-5 py-3 font-body text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                backgroundColor: "#4A90E2",
                color: "#FFFFFF",
              }}
            >
              Go Home
            </Link>
          </div>
        )}

        {/* ITEM */}
        {item && !loading && (
          <div
            className="rise-in overflow-hidden rounded-3xl"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {/* ITEM PHOTO */}
            {item.photo && (
              <img
                src={item.photo}
                alt={item.item_name || "Item"}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-8">
              {/* TYPE + STATUS */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "#4A90E2" }}
                >
                  {itemTypeLabel(item.item_type).toUpperCase()}
                </span>

                <span
                  className="rounded-full px-3 py-1 font-body text-xs font-semibold"
                  style={{
                    backgroundColor:
                      STATUS_META[item.status]?.bg || "#EEF5FF",
                    color: STATUS_META[item.status]?.fg || "#000F26",
                  }}
                >
                  {STATUS_META[item.status]?.label || "Active"}
                </span>
              </div>

              {/* ITEM NAME */}
              <h1
                className="mt-3 font-display text-2xl font-semibold tracking-tight"
                style={{ color: "#000F26" }}
              >
                {item.item_name || "This item"}
              </h1>

              {/* DESCRIPTION */}
              {item.description && (
                <p
                  className="mt-2 font-body text-sm leading-relaxed"
                  style={{ color: "#4C5A70" }}
                >
                  {item.description}
                </p>
              )}

              {/* OWNER */}
              <div
                className="mt-6 border-t pt-6"
                style={{ borderColor: "#E5ECF5" }}
              >
                <p
                  className="font-body text-sm"
                  style={{ color: "#4C5A70" }}
                >
                  This item belongs to
                </p>

                <p
                  className="mt-1 font-display text-xl font-semibold"
                  style={{ color: "#000F26" }}
                >
                  {item.owner_name ||
                    "Someone who hasn't shared their name"}
                </p>

                {item.owner_address && (
                  <p
                    className="mt-1 font-body text-sm"
                    style={{ color: "#4C5A70" }}
                  >
                    {item.owner_address}
                  </p>
                )}
              </div>

              {/* CONTACT BUTTONS */}
              <div className="mt-6 flex flex-col gap-3">
                {/* CALL */}
                {hasPhone && (
                  <a
                    href={`tel:${phoneDigits(item.owner_phone)}`}
                    className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-body text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "#4A90E2",
                      color: "#FFFFFF",
                    }}
                  >
                    Call {item.owner_phone}
                  </a>
                )}

                {/* WHATSAPP */}
                {hasPhone && (
                  <a
                    href={`https://wa.me/${phoneDigits(item.owner_phone)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-body text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      borderColor: "#000F26",
                      color: "#000F26",
                    }}
                  >
                    Message on WhatsApp
                  </a>
                )}

                {/* EMAIL */}
                {hasEmail && (
                  <a
                    href={`mailto:${item.owner_email}`}
                    className="flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-body text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      borderColor: "#E5ECF5",
                      color: "#4C5A70",
                    }}
                  >
                    Email {item.owner_email}
                  </a>
                )}

                {/* NO CONTACT */}
                {!hasContact && (
                  <p
                    className="rounded-xl border border-dashed px-5 py-3.5 text-center font-body text-sm"
                    style={{
                      borderColor: "#E5ECF5",
                      color: "#4C5A70",
                    }}
                  >
                    The owner didn't leave a phone number or email on this
                    tag.
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <p
                className="mt-8 text-center font-body text-xs leading-relaxed"
                style={{ color: "#8A98AA" }}
              >
                If found, please reach out to help return this item. Thank
                you for taking a moment to help a stranger.
              </p>

              {/* MARK AS FOUND */}
              {item.status !== "recovered" ? (
                <div
                  className="mt-6 rounded-2xl border p-5"
                  style={{
                    borderColor: "#DCEBFA",
                    backgroundColor: "#EEF5FF",
                  }}
                >
                  {!confirmingFound ? (
                    <button
                      onClick={() => setConfirmingFound(true)}
                      className="flex w-full items-center justify-center gap-2 font-body text-sm font-semibold"
                      style={{ color: "#4A90E2" }}
                    >
                      <CheckCircle2 className="h-4 w-4" />

                      Already returned to the owner? Mark it found
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <p
                        className="text-center font-body text-sm font-medium"
                        style={{ color: "#4A90E2" }}
                      >
                        Confirm — this item has been returned
                        {item.owner_name
                          ? ` to ${item.owner_name}`
                          : ""}
                        ?
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleMarkFound}
                          disabled={markingFound}
                          className="rounded-full px-5 py-2 font-body text-xs font-semibold disabled:opacity-60"
                          style={{
                            backgroundColor: "#4A90E2",
                            color: "#FFFFFF",
                          }}
                        >
                          {markingFound
                            ? "Marking…"
                            : "Yes, mark as found"}
                        </button>

                        <button
                          onClick={() => setConfirmingFound(false)}
                          className="font-body text-xs font-medium"
                          style={{ color: "#4C5A70" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl border p-4 font-body text-sm font-semibold"
                  style={{
                    borderColor: "#DCEBFA",
                    backgroundColor: "#EEF5FF",
                    color: "#4A90E2",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4" />

                  {foundNoticeOnly
                    ? "Thanks! Please also let the owner know directly if you can."
                    : "This item has already been marked as found"}
                </div>
              )}

              {/* QR CODE */}
              <div
                className="mt-6 flex flex-col items-center gap-2 border-t pt-6"
                style={{ borderColor: "#E5ECF5" }}
              >
                <p
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "#8A98AA" }}
                >
                  THIS TAG'S QR CODE
                </p>

                <div
                  className="rounded-2xl border-2 p-2"
                  style={{ borderColor: "#4A90E2" }}
                >
                  <QrImage
                    value={buildScanUrl(item)}
                    size={120}
                    alt={`QR code for ${
                      item.item_name || "this item"
                    }`}
                    downloadName={`findmeback-${item.code}.png`}
                  />
                </div>
              </div>

              {/* OWNER MANAGEMENT NOTE */}
              <p
                className="mt-3 text-center font-body text-xs leading-relaxed"
                style={{ color: "#8A98AA" }}
              >
                Is this your tag? Open the private manage link you saved at
                registration to edit details or update your photo.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <p
        className="pb-8 text-center font-body text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        Powered by Find It Back — tag your own belongings at{" "}
        <Link
          to="/"
          className="underline decoration-dotted underline-offset-4"
        >
          findmeback.com
        </Link>
      </p>
    </div>
  );
}