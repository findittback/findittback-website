import { useEffect, useState } from "react";
import { qrDataUrl } from "../lib/qr";

const BLUE = "#4A90E2";
const NAVY = "#000F26";

export default function QrImage({
  value,
  size = 180,
  alt = "QR code",
  downloadName,
  className = "",
  headerText = "SCAN FOR OWNER DETAILS",
  footerText = "Open camera • Scan • Contact owner",
  showBadge = true,
}) {
  const renderKey = [value, size, headerText, footerText, showBadge].join("|");
  const [rendered, setRendered] = useState({ key: null, url: null });
  const src = rendered.key === renderKey ? rendered.url : null;

  // Card aspect ratio (height / width)
  const ratio = 1.3;

  useEffect(() => {
    let cancelled = false;

    // Hi-res QR render
    const S = size * 2;

    qrDataUrl(value, { size: S })
      .then((qrUrl) => {
        if (cancelled) return;

        const img = new Image();

        img.onload = () => {
          if (cancelled) return;

          const W = S;
          const H = Math.round(S * ratio);

          const canvas = document.createElement("canvas");
          canvas.width = W;
          canvas.height = H;

          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          // =====================================================
          // CARD BACKGROUND
          // =====================================================

          ctx.fillStyle = "#FFFFFF";

          roundedRect(
            ctx,
            0,
            0,
            W,
            H,
            W * 0.07
          );

          ctx.fill();

          // =====================================================
          // HEADER BAND
          // =====================================================

          const headerH = H * 0.11;

          ctx.save();

          roundedRect(
            ctx,
            0,
            0,
            W,
            H,
            W * 0.07
          );

          ctx.clip();

          const grad = ctx.createLinearGradient(
            0,
            0,
            W,
            0
          );

          grad.addColorStop(0, "#2F6FD0");
          grad.addColorStop(1, BLUE);

          ctx.fillStyle = grad;

          ctx.fillRect(
            0,
            0,
            W,
            headerH
          );

          ctx.restore();

          // Header text
          ctx.fillStyle = "#FFFFFF";

          ctx.font = `700 ${Math.round(
            W * 0.05
          )}px sans-serif`;

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.fillText(
            headerText,
            W / 2,
            headerH / 2
          );

          // =====================================================
          // QR CODE
          // =====================================================

          const pad = W * 0.06;

          const qrSize = W - pad * 2;

          const qrX = pad;

          const qrY =
            headerH + pad * 0.7;

          ctx.drawImage(
            img,
            qrX,
            qrY,
            qrSize,
            qrSize
          );

          // =====================================================
          // CENTER BADGE
          // =====================================================

          if (showBadge) {
            const cx = W / 2;

            const cy =
              qrY + qrSize / 2;

            const R =
              qrSize * 0.1;

            // -----------------------------
            // White outer circle
            // -----------------------------

            ctx.beginPath();

            ctx.arc(
              cx,
              cy,
              R * 1.25,
              0,
              Math.PI * 2
            );

            ctx.fillStyle = "#FFFFFF";

            ctx.fill();

            // -----------------------------
            // Blue circle
            // -----------------------------

            const bg =
              ctx.createLinearGradient(
                cx - R,
                cy - R,
                cx + R,
                cy + R
              );

            bg.addColorStop(
              0,
              "#2F6FD0"
            );

            bg.addColorStop(
              1,
              BLUE
            );

            ctx.beginPath();

            ctx.arc(
              cx,
              cy,
              R,
              0,
              Math.PI * 2
            );

            ctx.fillStyle = bg;

            ctx.fill();

            // -----------------------------
            // Person icon
            // -----------------------------

            ctx.save();

            ctx.beginPath();

            ctx.arc(
              cx,
              cy,
              R,
              0,
              Math.PI * 2
            );

            ctx.clip();

            ctx.fillStyle = "#FFFFFF";

            // Head
            ctx.beginPath();

            ctx.arc(
              cx,
              cy - R * 0.22,
              R * 0.3,
              0,
              Math.PI * 2
            );

            ctx.fill();

            // Shoulders
            ctx.beginPath();

            ctx.ellipse(
              cx,
              cy + R * 0.85,
              R * 0.62,
              R * 0.62,
              0,
              Math.PI,
              0
            );

            ctx.fill();

            ctx.restore();

            // -----------------------------
            // Dashed ring
            // -----------------------------

            ctx.beginPath();

            ctx.arc(
              cx,
              cy,
              R * 1.12,
              0,
              Math.PI * 2
            );

            ctx.setLineDash([
              R * 0.18,
              R * 0.12,
            ]);

            ctx.strokeStyle =
              "rgba(255,255,255,0.9)";

            ctx.lineWidth =
              R * 0.05;

            ctx.stroke();

            ctx.setLineDash([]);
          }

          // =====================================================
          // FOOTER
          // =====================================================

          const footY =
            qrY +
            qrSize +
            pad * 0.6;

          ctx.fillStyle = NAVY;

          ctx.font = `600 ${Math.round(
            W * 0.042
          )}px sans-serif`;

          ctx.textAlign = "center";
          ctx.textBaseline = "top";

          ctx.fillText(
            footerText,
            W / 2,
            footY
          );

          // =====================================================
          // OUTER BORDER
          // =====================================================

          ctx.strokeStyle = BLUE;

          ctx.lineWidth =
            W * 0.012;

          roundedRect(
            ctx,
            ctx.lineWidth / 2,
            ctx.lineWidth / 2,
            W - ctx.lineWidth,
            H - ctx.lineWidth,
            W * 0.07
          );

          ctx.stroke();

          // =====================================================
          // FINAL IMAGE
          // =====================================================

          setRendered({
            key: renderKey,
            url: canvas.toDataURL("image/png"),
          });
        };

        img.onerror = () => {
          if (!cancelled) {
            console.error(
              "Failed to load QR image."
            );
          }
        };

        img.src = qrUrl;
      })
      .catch((error) => {
        if (!cancelled) {
          console.error(
            "QR generation failed:",
            error
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    value,
    size,
    headerText,
    footerText,
    showBadge,
    renderKey,
  ]);

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl ${className}`}
        style={{
          width: size,
          height: size * ratio,
          backgroundColor: "#FFFFFF",
        }}
      >
        <span
          className="font-mono text-[10px]"
          style={{
            color: NAVY,
          }}
        >
          generating…
        </span>
      </div>
    );
  }

  // =====================================================
  // QR IMAGE
  // =====================================================

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={src}
        alt={alt}
        width={size}
        height={size * ratio}
        className={className}
      />

      {downloadName && (
        <a
          href={src}
          download={downloadName}
          className="font-body text-xs font-semibold underline decoration-dotted underline-offset-4"
          style={{
            color: BLUE,
          }}
        >
          Download QR (PNG)
        </a>
      )}
    </div>
  );
}

// =====================================================
// ROUNDED RECTANGLE HELPER
// =====================================================

function roundedRect(
  ctx,
  x,
  y,
  w,
  h,
  r
) {
  ctx.beginPath();

  ctx.moveTo(
    x + r,
    y
  );

  ctx.arcTo(
    x + w,
    y,
    x + w,
    y + h,
    r
  );

  ctx.arcTo(
    x + w,
    y + h,
    x,
    y + h,
    r
  );

  ctx.arcTo(
    x,
    y + h,
    x,
    y,
    r
  );

  ctx.arcTo(
    x,
    y,
    x + w,
    y,
    r
  );

  ctx.closePath();
}