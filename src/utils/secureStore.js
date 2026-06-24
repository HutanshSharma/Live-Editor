
const KEY = 'nc_v1::a7F9$kQ2#pL!mZ8^wR4&xY6*tB1@cV3';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function xorBytes(bytes) {
  const key = encoder.encode(KEY);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ key[i % key.length];
  }
  return out;
}

function bytesToBase64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// DJB2 hash algorithm
function checksum(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

export function secureEncode(value) {
  const json = JSON.stringify(value);
  const payload = bytesToBase64(xorBytes(encoder.encode(json)));
  return checksum(payload + KEY) + '.' + payload;
}

export function secureDecode(str) {
  if (typeof str !== 'string') return null;
  const dot = str.indexOf('.');
  if (dot < 0) return null;

  const sum = str.slice(0, dot);
  const payload = str.slice(dot + 1);

  if (checksum(payload + KEY) !== sum) return null;

  try {
    const json = decoder.decode(xorBytes(base64ToBytes(payload)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
