import QRCode from "qrcode";

// Generates a PNG data URL for a QR code encoding `text`.
// errorCorrectionLevel "H" (30% recovery) is used so a logo/text
// overlay in the center doesn't break scannability.
export async function qrDataUrl(text, { size = 320, margin = 1, dark = "#000F26", light = "#FFFFFF" } = {}) {
  return QRCode.toDataURL(text, {
    width: size,
    margin,
    errorCorrectionLevel: "H",
    color: { dark, light },
  });
}