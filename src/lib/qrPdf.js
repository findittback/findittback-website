import { jsPDF } from "jspdf";
import { qrDataUrl } from "./qr";

// Available sticker sizes for the printable sheet (mm side length of the QR
// square itself; the printed card is a little larger to leave room for the
// brand label above and the code below).
export const QR_SHEET_SIZES = [
  { key: "small", label: "Small · 20mm", mm: 20 },
  { key: "medium", label: "Medium · 30mm", mm: 30 },
  { key: "large", label: "Large · 45mm", mm: 45 },
  { key: "xlarge", label: "Extra large · 60mm", mm: 60 },
];

const PAGE = { w: 210, h: 297 }; // A4 portrait, mm
const MARGIN = 10;
const GAP = 6;
const LABEL_H = 5.5; // space above QR for "FIND ME"
const CODE_H = 4.5; // space below QR for the tag code

/**
 * @param {object} opts
 * @param {string} opts.code       Tag code, printed under each QR.
 * @param {string} opts.scanUrl    URL encoded into every QR.
 * @param {string} opts.brandText  Text printed above each QR (default "FIND ME").
 * @param {Array<{ size: string, qty: number }>} opts.selections
 */
export async function generateQrSheetPdf({ code, scanUrl, brandText = "FIND ME", selections }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const qrPng = await qrDataUrl(scanUrl, { size: 512 });

  let x = MARGIN;
  let y = MARGIN;
  let rowMaxH = 0;

  function ensureSpace(cardW, cardH) {
    if (x + cardW > PAGE.w - MARGIN) {
      x = MARGIN;
      y += rowMaxH + GAP;
      rowMaxH = 0;
    }
    if (y + cardH > PAGE.h - MARGIN) {
      doc.addPage();
      x = MARGIN;
      y = MARGIN;
      rowMaxH = 0;
    }
  }

  function drawCard(mm) {
    const cardW = mm;
    const cardH = LABEL_H + mm + CODE_H;
    ensureSpace(cardW, cardH);

    // cut guide
    doc.setDrawColor(180, 180, 180);
    doc.setLineDashPattern([1, 1], 0);
    doc.rect(x, y, cardW, cardH);
    doc.setLineDashPattern([], 0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(Math.max(5, Math.min(8, mm * 0.22)));
    doc.setTextColor(20, 30, 40);
    doc.text(brandText, x + cardW / 2, y + LABEL_H - 1.3, { align: "center" });

    doc.addImage(qrPng, "PNG", x, y + LABEL_H, mm, mm);

    doc.setFont("courier", "normal");
    doc.setFontSize(Math.max(4.5, Math.min(6.5, mm * 0.16)));
    doc.setTextColor(90, 100, 110);
    doc.text(code, x + cardW / 2, y + LABEL_H + mm + CODE_H - 1, { align: "center" });

    x += cardW + GAP;
    rowMaxH = Math.max(rowMaxH, cardH);
  }

  let totalCards = 0;
  for (const sel of selections) {
    const size = QR_SHEET_SIZES.find((s) => s.key === sel.size);
    if (!size || !sel.qty) continue;
    for (let i = 0; i < sel.qty; i++) {
      drawCard(size.mm);
      totalCards++;
    }
  }

  if (totalCards === 0) {
    drawCard(QR_SHEET_SIZES[1].mm);
  }

  return doc;
}
