// -----------------------------------------------------------------------
// Find It Back — frontend-only data layer.
//
// There is no server. Two things work together so tags still work when a
// stranger scans your sticker on a completely different phone/browser:
//
// 1. `localStorage` on THIS device — your personal "my tags" dashboard.
//    Lets you list, edit, mark found, and delete tags you created here.
//
// 2. A small snapshot of the item's public details is base64-encoded
//    directly into the scan link (and therefore into the QR code itself).
//    That's what makes the tag work for someone else, on their own
//    phone, with zero backend — the QR *is* the database record for the
//    public scan page. If you edit your details later, reprint the QR so
//    the new sticker carries the updated snapshot.
// -----------------------------------------------------------------------

const STORAGE_KEY = "findItBack:items:v1";
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

function generateCode(length = 6) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

function uuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function origin() {
  return typeof window !== "undefined" ? window.location.origin : "";
}

// ---- self-contained payload (embedded in the link / QR) ---------------

function toBase64Url(str) {
  const b64 = btoa(unescape(encodeURIComponent(str)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

// Short keys to keep the URL (and therefore the QR) compact.
function encodePayload(item) {
  const compact = {
    n: item.owner_name || "",
    p: item.owner_phone || "",
    e: item.owner_email || "",
    a: item.owner_address || "",
    t: item.item_type || "other",
    m: item.item_name || "",
    d: item.description || "",
    s: item.status || "active",
  };
  return toBase64Url(JSON.stringify(compact));
}

function decodePayload(encoded) {
  try {
    const compact = JSON.parse(fromBase64Url(encoded));
    return {
      owner_name: compact.n || "",
      owner_phone: compact.p || "",
      owner_email: compact.e || "",
      owner_address: compact.a || "",
      item_type: compact.t || "other",
      item_name: compact.m || "",
      description: compact.d || "",
      status: compact.s || "active",
    };
  } catch {
    return null;
  }
}

export function scanUrl(item) {
  const encoded = encodePayload(item);
  return `${origin()}/i/${item.code}?d=${encoded}`;
}

export function manageUrl(item) {
  return `${origin()}/manage/${item.code}/${item.edit_token}`;
}

function toPublic(item) {
  const { edit_token: _editToken, ...rest } = item;
  return rest;
}

// ---- CRUD --------------------------------------------------------------

export async function createItem(fields, photoFile) {
  const items = readAll();
  let code = generateCode();
  while (items.some((i) => i.code === code)) code = generateCode();

  const photo = photoFile ? await fileToDataUrl(photoFile) : null;
  const now = new Date().toISOString();

  const item = {
    id: uuid(),
    code,
    edit_token: uuid(),
    owner_name: fields.owner_name || "",
    owner_phone: fields.owner_phone || "",
    owner_email: fields.owner_email || "",
    owner_address: fields.owner_address || "",
    item_type: fields.item_type || "other",
    item_name: fields.item_name || "",
    description: fields.description || "",
    photo,
    status: "active",
    scan_count: 0,
    created_at: now,
    updated_at: now,
  };

  items.unshift(item);
  writeAll(items);

  return {
    ...toPublic(item),
    edit_token: item.edit_token,
    scan_url: scanUrl(item),
    manage_url: manageUrl(item),
  };
}

export async function listItems() {
  return readAll().map((item) => ({
    code: item.code,
    item_type: item.item_type,
    item_name: item.item_name || "Untitled item",
    status: item.status,
  }));
}

// Looks up a scanned tag. Prefers the live local copy (so the owner's own
// device always reflects the latest edits/status), and falls back to the
// snapshot embedded in the URL — this is the path a stranger's phone takes.
export async function getPublicItem(code, embeddedData) {
  const items = readAll();
  const idx = items.findIndex((i) => i.code === code);

  if (idx !== -1) {
    items[idx].scan_count = (items[idx].scan_count || 0) + 1;
    writeAll(items);
    return { ...toPublic(items[idx]), source: "local" };
  }

  if (embeddedData) {
    const decoded = decodePayload(embeddedData);
    if (decoded) {
      return {
        code,
        ...decoded,
        photo: null,
        scan_count: null,
        source: "link",
      };
    }
  }

  throw new Error("not_found");
}

export async function markItemFound(code) {
  const items = readAll();
  const idx = items.findIndex((i) => i.code === code);
  if (idx === -1) throw new Error("not_found");
  items[idx].status = "recovered";
  items[idx].updated_at = new Date().toISOString();
  writeAll(items);
  return toPublic(items[idx]);
}

export async function getManagedItem(code, token) {
  const items = readAll();
  const item = items.find((i) => i.code === code && i.edit_token === token);
  if (!item) throw new Error("not_found");
  return { ...item, scan_url: scanUrl(item), manage_url: manageUrl(item) };
}

export async function updateManagedItem(code, token, fields, photoFile) {
  const items = readAll();
  const idx = items.findIndex((i) => i.code === code && i.edit_token === token);
  if (idx === -1) throw new Error("not_found");

  const photo = photoFile ? await fileToDataUrl(photoFile) : items[idx].photo;

  items[idx] = {
    ...items[idx],
    ...fields,
    photo,
    updated_at: new Date().toISOString(),
  };
  writeAll(items);
  const item = items[idx];
  return { ...item, scan_url: scanUrl(item), manage_url: manageUrl(item) };
}

export async function deleteManagedItem(code, token) {
  const items = readAll();
  const next = items.filter((i) => !(i.code === code && i.edit_token === token));
  writeAll(next);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
