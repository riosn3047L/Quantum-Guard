/**
 * Mock Node.js Crypto Utilities
 * Contains quantum-vulnerable patterns for CryptoScan testing
 */
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

// ── RSA Key Pair Generation ──
function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
  return { publicKey, privateKey };
}

// ── ECDH Key Exchange ──
function performECDH() {
  const ecdh = crypto.ECDH('secp256k1');
  ecdh.generateKeys();
  return ecdh.getPublicKey('hex');
}

// ── ECDSA Digital Signature ──
function signWithECDSA(data, privateKey) {
  const { publicKey, privateKey: pk } = crypto.generateKeyPair('ec', {
    namedCurve: 'P-256'
  });
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  return sign.sign(pk, 'hex');
}

// ── MD5 Hash (BROKEN!) ──
function hashMD5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

// ── SHA-1 Hash (Deprecated) ──
function hashSHA1(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

// ── DES Encryption (Trivially broken) ──
function encryptDES_cbc(data, key) {
  const cipher = crypto.createCipheriv('des-cbc', key.slice(0, 8), Buffer.alloc(8));
  return Buffer.concat([cipher.update(data), cipher.final()]);
}

// ── Triple-DES (Sweet32 vulnerable) ──
function encrypt3DES(data, key) {
  const cipher = crypto.createCipheriv('DES-EDE3-CBC', key.slice(0, 24), Buffer.alloc(8));
  return Buffer.concat([cipher.update(data), cipher.final()]);
}

// ── Diffie-Hellman (Quantum Vulnerable) ──
function createDHExchange() {
  const dh = crypto.createDiffieHellman(2048);
  dh.generateKeys();
  return dh;
}

// ── Ed25519 Signing (Quantum Vulnerable) ──
function signEd25519(message) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  const signature = crypto.sign(null, Buffer.from(message), privateKey);
  return { publicKey, signature };
}

// ── AES-128-GCM (Weak vs Grover) ──
function encryptAES128(data, key) {
  const cipher = crypto.createCipheriv('aes-128-gcm', key.slice(0, 16), crypto.randomBytes(12));
  return Buffer.concat([cipher.update(data), cipher.final()]);
}

// ═══ QUANTUM-SAFE IMPLEMENTATIONS ═══

// ── AES-256-GCM (Quantum Resistant) ──
function encryptAES256(data, key) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key.slice(0, 32), crypto.randomBytes(12));
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return { encrypted, tag: cipher.getAuthTag() };
}

// ── SHA-256 (Quantum Resistant) ──
function hashSHA256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// ── SHA-512 (Quantum Resistant) ──
function hashSHA512(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

// ── ChaCha20-Poly1305 (Quantum Resistant Symmetric) ──
function encryptChaCha20(data, key) {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 });
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return { encrypted, nonce, tag: cipher.getAuthTag() };
}

module.exports = {
  generateRSAKeyPair, performECDH, signWithECDSA,
  hashMD5, hashSHA1, encryptDES_cbc, encrypt3DES,
  createDHExchange, signEd25519, encryptAES128,
  encryptAES256, hashSHA256, hashSHA512, encryptChaCha20
};
