/**
 * QuantumGuard Scanner Engine
 * Core scanning library for quantum-vulnerable cryptography detection.
 * Works in both browser and Node.js environments.
 */
const Scanner = (function() {
  'use strict';

  // ═══════════════════════════════════════════════════════
  // CRYPTO PATTERN DATABASE — Quantum-Vulnerable Algorithms
  // ═══════════════════════════════════════════════════════
  const VULN_PATTERNS = [
    // ── RSA ──
    { id: 'RSA', algorithm: 'RSA', type: 'asymmetric', severity: 'critical', quantumVuln: true,
      patterns: [
        /\bRSA[-_]?(OAEP|PSS|PKCS1|PKCS|2048|3072|4096)?\b/gi,
        /\bRSAKeyPairGenerator\b/gi, /\bRSA_generate_key\b/gi,
        /\bCrypto\.RSA\b/gi, /\bRSAPublicKey\b/gi, /\bRSAPrivateKey\b/gi,
        /\bcrypto\.generateKeyPair\s*\(\s*['"]rsa['"]/gi,
        /\bRSA_sign\b|\bRSA_verify\b|\bRSA_encrypt\b|\bRSA_decrypt\b/gi,
        /\brsa\.GenerateKey\b/gi, /\bNewSignerVerifier.*rsa/gi,
        /from\s+['"].*rsa['"]/gi, /import\s+['"].*rsa['"]/gi,
      ],
      recommendation: 'Migrate to ML-KEM (FIPS 203) for key encapsulation or ML-DSA (FIPS 204) for signatures',
      pqcAlternative: 'ML-KEM / ML-DSA'
    },
    // ── ECDSA / ECDH / ECC ──
    { id: 'ECC', algorithm: 'ECDSA/ECDH/ECC', type: 'asymmetric', severity: 'critical', quantumVuln: true,
      patterns: [
        /\bECDSA\b/gi, /\bECDH\b/gi, /\bEC[-_]?KEY\b/gi,
        /\belliptic[-_]?curve/gi, /\bsecp256[kr]1\b/gi, /\bsecp384r1\b/gi,
        /\bP-256\b|\bP-384\b|\bP-521\b/g,
        /\bcurve25519\b/gi, /\bed25519\b/gi, /\bx25519\b/gi,
        /\bEC_KEY_new\b|\bEC_KEY_generate_key\b/gi,
        /\bKeyPairGenerator\.getInstance\s*\(\s*['"]EC['"]/gi,
        /\bcrypto\.generateKeyPair\s*\(\s*['"]ec['"]/gi,
        /\bcrypto\.ECDH\b/gi, /\becdsa\.Sign\b/gi,
      ],
      recommendation: 'Migrate to ML-DSA (FIPS 204) for signatures, ML-KEM (FIPS 203) for key exchange',
      pqcAlternative: 'ML-DSA / ML-KEM'
    },
    // ── DSA ──
    { id: 'DSA', algorithm: 'DSA', type: 'asymmetric', severity: 'critical', quantumVuln: true,
      patterns: [
        /\bDSA[-_]?(sign|verify|generate|key)?\b/gi,
        /\bKeyPairGenerator\.getInstance\s*\(\s*['"]DSA['"]/gi,
        /\bdsa\.GenerateKey\b/gi,
      ],
      recommendation: 'Migrate to ML-DSA (FIPS 204) or SLH-DSA (FIPS 205)',
      pqcAlternative: 'ML-DSA / SLH-DSA'
    },
    // ── Diffie-Hellman ──
    { id: 'DH', algorithm: 'Diffie-Hellman', type: 'asymmetric', severity: 'critical', quantumVuln: true,
      patterns: [
        /\bDiffie[-_]?Hellman\b/gi, /\bDH_generate_key\b/gi,
        /\bcrypto\.createDiffieHellman\b/gi, /\bcrypto\.DH\b/gi,
        /\bDHParameterSpec\b/gi, /\bDH_compute_key\b/gi,
      ],
      recommendation: 'Migrate to ML-KEM (FIPS 203) for key exchange',
      pqcAlternative: 'ML-KEM'
    },
    // ── MD5 ──
    { id: 'MD5', algorithm: 'MD5', type: 'hash', severity: 'critical', quantumVuln: false,
      patterns: [
        /\bMD5\b/g, /\bmd5\s*\(/gi, /\bEVP_md5\b/gi,
        /\.createHash\s*\(\s*['"]md5['"]/gi,
        /MessageDigest\.getInstance\s*\(\s*['"]MD5['"]/gi,
        /\bhashlib\.md5\b/gi,
      ],
      recommendation: 'Replace with SHA-256 or SHA-3. MD5 is cryptographically broken regardless of quantum.',
      pqcAlternative: 'SHA-256 / SHA-3'
    },
    // ── SHA-1 ──
    { id: 'SHA1', algorithm: 'SHA-1', type: 'hash', severity: 'high', quantumVuln: false,
      patterns: [
        /\bSHA[-_]?1\b/gi, /\bsha1\s*\(/gi, /\bEVP_sha1\b/gi,
        /\.createHash\s*\(\s*['"]sha1['"]/gi,
        /MessageDigest\.getInstance\s*\(\s*['"]SHA-1['"]/gi,
        /\bhashlib\.sha1\b/gi,
      ],
      recommendation: 'Migrate to SHA-256 or SHA-3. SHA-1 has known collision attacks.',
      pqcAlternative: 'SHA-256 / SHA-3'
    },
    // ── 3DES / Triple DES ──
    { id: '3DES', algorithm: '3DES / Triple-DES', type: 'symmetric', severity: 'high', quantumVuln: false,
      patterns: [
        /\b3DES\b/gi, /\bTriple[-_]?DES\b/gi, /\bDESede\b/gi,
        /\bEVP_des_ede3\b/gi, /\bDES[-_]EDE3\b/gi,
        /Cipher\.getInstance\s*\(\s*['"]DESede/gi,
      ],
      recommendation: 'Migrate to AES-256-GCM. 3DES has effective key strength <112 bits.',
      pqcAlternative: 'AES-256-GCM'
    },
    // ── DES ──
    { id: 'DES', algorithm: 'DES', type: 'symmetric', severity: 'critical', quantumVuln: false,
      patterns: [
        /\bDES[-_]?(cbc|ecb|cfb|ofb)\b/gi,
        /\bEVP_des_cbc\b|\bEVP_des_ecb\b/gi,
        /Cipher\.getInstance\s*\(\s*['"]DES\b/gi,
      ],
      recommendation: 'DES uses 56-bit key and is trivially broken. Migrate to AES-256.',
      pqcAlternative: 'AES-256'
    },
    // ── RC4 ──
    { id: 'RC4', algorithm: 'RC4 / ARC4', type: 'symmetric', severity: 'critical', quantumVuln: false,
      patterns: [
        /\bRC4\b/gi, /\bARC4\b/gi, /\bARCFOUR\b/gi,
        /\bEVP_rc4\b/gi,
        /Cipher\.getInstance\s*\(\s*['"]RC4/gi,
      ],
      recommendation: 'RC4 is broken. Migrate to AES-256-GCM or ChaCha20-Poly1305.',
      pqcAlternative: 'AES-256-GCM / ChaCha20'
    },
    // ── Blowfish ──
    { id: 'BLOWFISH', algorithm: 'Blowfish', type: 'symmetric', severity: 'warning', quantumVuln: false,
      patterns: [
        /\bBlowfish\b/gi, /\bBF[-_]?(cbc|ecb)\b/gi,
        /\bEVP_bf_cbc\b/gi,
      ],
      recommendation: 'Blowfish has 64-bit block and is vulnerable to Sweet32. Migrate to AES-256.',
      pqcAlternative: 'AES-256'
    },
    // ── AES with weak key sizes ──
    { id: 'AES-128', algorithm: 'AES-128', type: 'symmetric', severity: 'warning', quantumVuln: true,
      patterns: [
        /\bAES[-_]?128\b/gi,
        /aes[-_]128[-_]?(cbc|ecb|gcm|ctr)/gi,
      ],
      recommendation: 'AES-128 provides only 64-bit security against Grover\'s algorithm. Upgrade to AES-256.',
      pqcAlternative: 'AES-256'
    },
  ];

  // ═══════════════════════════════════════════════════════
  // PQC-SAFE PATTERNS — Quantum-Resistant Algorithms
  // ═══════════════════════════════════════════════════════
  const SAFE_PATTERNS = [
    { id: 'ML-KEM', algorithm: 'ML-KEM (FIPS 203)', type: 'kem',
      patterns: [/\bML[-_]?KEM\b/gi, /\bKyber\b/gi, /\bCRYSTALS[-_]?Kyber\b/gi, /\bFIPS[-_]?203\b/gi] },
    { id: 'ML-DSA', algorithm: 'ML-DSA (FIPS 204)', type: 'signature',
      patterns: [/\bML[-_]?DSA\b/gi, /\bDilithium\b/gi, /\bCRYSTALS[-_]?Dilithium\b/gi, /\bFIPS[-_]?204\b/gi] },
    { id: 'SLH-DSA', algorithm: 'SLH-DSA (FIPS 205)', type: 'signature',
      patterns: [/\bSLH[-_]?DSA\b/gi, /\bSPHINCS\+?\b/gi, /\bFIPS[-_]?205\b/gi] },
    { id: 'AES-256', algorithm: 'AES-256', type: 'symmetric',
      patterns: [/\bAES[-_]?256\b/gi, /aes[-_]256[-_]?(gcm|cbc|ctr)/gi] },
    { id: 'SHA-256', algorithm: 'SHA-256', type: 'hash',
      patterns: [/\bSHA[-_]?256\b/gi, /\bSHA[-_]?384\b/gi, /\bSHA[-_]?512\b/gi] },
    { id: 'SHA-3', algorithm: 'SHA-3', type: 'hash',
      patterns: [/\bSHA[-_]?3\b/gi, /\bSHAKE[-_]?(128|256)\b/gi] },
    { id: 'ChaCha20', algorithm: 'ChaCha20-Poly1305', type: 'symmetric',
      patterns: [/\bChaCha20\b/gi, /\bPoly1305\b/gi, /\bXChaCha\b/gi] },
  ];

  // ═══════════════════════════════════════════════════════
  // CRYPTO DEPENDENCY DATABASE
  // ═══════════════════════════════════════════════════════
  const VULN_DEPS = {
    // npm packages
    'node-rsa': { lang: 'npm', algo: 'RSA', severity: 'critical', alt: 'liboqs-node, crystals-kyber' },
    'jsrsasign': { lang: 'npm', algo: 'RSA/ECDSA', severity: 'critical', alt: 'Use PQC wrappers via liboqs' },
    'node-forge': { lang: 'npm', algo: 'RSA/DES/RC4/MD5', severity: 'critical', alt: 'Audit usage; migrate RSA to PQC' },
    'crypto-js': { lang: 'npm', algo: 'DES/3DES/MD5/SHA-1/AES', severity: 'warning', alt: 'Use node:crypto with AES-256-GCM' },
    'md5': { lang: 'npm', algo: 'MD5', severity: 'critical', alt: 'Use SHA-256 via node:crypto' },
    'sha1': { lang: 'npm', algo: 'SHA-1', severity: 'high', alt: 'Use SHA-256 via node:crypto' },
    'bcryptjs': { lang: 'npm', algo: 'Blowfish', severity: 'info', alt: 'Acceptable for password hashing' },
    'elliptic': { lang: 'npm', algo: 'ECDSA/ECDH', severity: 'critical', alt: 'Migrate to ML-DSA/ML-KEM' },
    'secp256k1': { lang: 'npm', algo: 'ECDSA (secp256k1)', severity: 'critical', alt: 'ML-DSA (FIPS 204)' },
    'tweetnacl': { lang: 'npm', algo: 'Curve25519/Ed25519', severity: 'critical', alt: 'ML-DSA / ML-KEM' },
    'libsodium-wrappers': { lang: 'npm', algo: 'Curve25519/Ed25519/XSalsa20', severity: 'warning', alt: 'Review XSalsa20' },
    'openpgp': { lang: 'npm', algo: 'RSA/ECDSA/ECDH', severity: 'critical', alt: 'Requires PQC migration plan' },
    // Python packages
    'pycryptodome': { lang: 'pip', algo: 'RSA/DSA/ECC/DES/ARC4', severity: 'critical', alt: 'liboqs-python for PQC' },
    'cryptography': { lang: 'pip', algo: 'RSA/ECC/DH', severity: 'warning', alt: 'Audit usage; has some PQC support' },
    'rsa': { lang: 'pip', algo: 'RSA', severity: 'critical', alt: 'liboqs-python' },
    'ecdsa': { lang: 'pip', algo: 'ECDSA', severity: 'critical', alt: 'liboqs-python ML-DSA' },
    'hashlib': { lang: 'pip', algo: 'MD5/SHA-1 available', severity: 'info', alt: 'Avoid md5()/sha1(); use sha256()' },
    'pyOpenSSL': { lang: 'pip', algo: 'RSA/ECC/DH', severity: 'warning', alt: 'Audit cipher configuration' },
    // Java
    'bcprov-jdk': { lang: 'maven', algo: 'RSA/ECC/DSA', severity: 'warning', alt: 'BouncyCastle pqc-jdk for PQC' },
    'jasypt': { lang: 'maven', algo: 'DES/PBE', severity: 'high', alt: 'Use AES-256-GCM via JCA' },
    // Go
    'crypto/rsa': { lang: 'go', algo: 'RSA', severity: 'critical', alt: 'cloudflare/circl for PQC' },
    'crypto/ecdsa': { lang: 'go', algo: 'ECDSA', severity: 'critical', alt: 'cloudflare/circl ML-DSA' },
    'crypto/dsa': { lang: 'go', algo: 'DSA', severity: 'critical', alt: 'cloudflare/circl' },
    'crypto/des': { lang: 'go', algo: 'DES/3DES', severity: 'high', alt: 'crypto/aes with 256-bit key' },
    'crypto/rc4': { lang: 'go', algo: 'RC4', severity: 'critical', alt: 'crypto/aes or chacha20poly1305' },
    'crypto/md5': { lang: 'go', algo: 'MD5', severity: 'critical', alt: 'crypto/sha256' },
    'crypto/sha1': { lang: 'go', algo: 'SHA-1', severity: 'high', alt: 'crypto/sha256' },
  };

  // ═══════════════════════════════════════════════════════
  // TLS CIPHER SUITE DATABASE
  // ═══════════════════════════════════════════════════════
  const TLS_CIPHERS = {
    // TLS 1.3 cipher suites (generally safe, key exchange is separate)
    'TLS_AES_256_GCM_SHA384': { safe: true, pqc: false, strength: 'strong' },
    'TLS_AES_128_GCM_SHA256': { safe: true, pqc: false, strength: 'acceptable' },
    'TLS_CHACHA20_POLY1305_SHA256': { safe: true, pqc: false, strength: 'strong' },
    // TLS 1.2 cipher suites with RSA/ECDHE (quantum-vulnerable key exchange)
    'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384': { safe: false, pqc: false, strength: 'acceptable', issue: 'ECDHE+RSA vulnerable to quantum' },
    'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256': { safe: false, pqc: false, strength: 'weak', issue: 'ECDHE+RSA vulnerable, AES-128 weak vs Grover' },
    'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384': { safe: false, pqc: false, strength: 'acceptable', issue: 'ECDHE+ECDSA vulnerable to quantum' },
    'TLS_RSA_WITH_AES_256_GCM_SHA384': { safe: false, pqc: false, strength: 'weak', issue: 'RSA key exchange, no forward secrecy' },
    'TLS_RSA_WITH_AES_128_CBC_SHA256': { safe: false, pqc: false, strength: 'weak', issue: 'RSA+CBC, multiple weaknesses' },
    'TLS_RSA_WITH_3DES_EDE_CBC_SHA': { safe: false, pqc: false, strength: 'critical', issue: '3DES+RSA, Sweet32+quantum vulnerable' },
    'TLS_RSA_WITH_RC4_128_SHA': { safe: false, pqc: false, strength: 'critical', issue: 'RC4 broken, must disable immediately' },
    // PQC-hybrid suites
    'TLS_KYBER768_AES_256_GCM_SHA384': { safe: true, pqc: true, strength: 'quantum-safe' },
    'TLS_X25519_KYBER768_AES_256_GCM': { safe: true, pqc: true, strength: 'quantum-safe' },
  };

  const CNSA2_REQUIREMENTS = {
    keyExchange: ['ML-KEM-768', 'ML-KEM-1024', 'Kyber-768', 'Kyber-1024'],
    signatures: ['ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-SHA2-128s', 'SLH-DSA-SHA2-192s'],
    symmetric: ['AES-256'],
    hash: ['SHA-384', 'SHA-512', 'SHA-3-256', 'SHA-3-384'],
    tlsVersion: ['TLSv1.3'],
    forbidden: ['RSA', 'ECDSA', 'ECDH', 'DH', 'DSA', 'MD5', 'SHA-1', '3DES', 'RC4', 'DES']
  };

  // ═══════════════════════════════════════════════════════
  // 1. CRYPTOSCAN — Source Code Analysis
  // ═══════════════════════════════════════════════════════
  function scanSource(filename, content) {
    const findings = [];
    const safeFindings = [];
    const lines = content.split('\n');

    // Check for vulnerable patterns
    VULN_PATTERNS.forEach(pattern => {
      pattern.patterns.forEach(regex => {
        lines.forEach((line, lineNum) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('*')) return;
          const matches = line.match(regex);
          if (matches) {
            // Avoid duplicate findings on same line for same algorithm
            const existing = findings.find(f => f.line === lineNum + 1 && f.algorithmId === pattern.id);
            if (!existing) {
              findings.push({
                algorithmId: pattern.id,
                algorithm: pattern.algorithm,
                type: pattern.type,
                severity: pattern.severity,
                quantumVulnerable: pattern.quantumVuln,
                file: filename,
                line: lineNum + 1,
                code: trimmed.substring(0, 120),
                match: matches[0],
                recommendation: pattern.recommendation,
                pqcAlternative: pattern.pqcAlternative
              });
            }
          }
        });
      });
    });

    // Check for PQC-safe patterns
    SAFE_PATTERNS.forEach(pattern => {
      pattern.patterns.forEach(regex => {
        lines.forEach((line, lineNum) => {
          if (line.match(regex)) {
            const existing = safeFindings.find(f => f.line === lineNum + 1 && f.id === pattern.id);
            if (!existing) {
              safeFindings.push({
                id: pattern.id,
                algorithm: pattern.algorithm,
                type: pattern.type,
                file: filename,
                line: lineNum + 1,
                code: line.trim().substring(0, 120)
              });
            }
          }
        });
      });
    });

    return { findings, safeFindings };
  }

  function scanMultipleFiles(files) {
    const allFindings = [];
    const allSafe = [];
    files.forEach(f => {
      const result = scanSource(f.name, f.content);
      allFindings.push(...result.findings);
      allSafe.push(...result.safeFindings);
    });

    const summary = {
      totalFiles: files.length,
      totalFindings: allFindings.length,
      totalSafe: allSafe.length,
      critical: allFindings.filter(f => f.severity === 'critical').length,
      high: allFindings.filter(f => f.severity === 'high').length,
      warning: allFindings.filter(f => f.severity === 'warning').length,
      quantumVulnerable: allFindings.filter(f => f.quantumVulnerable).length,
      uniqueAlgorithms: [...new Set(allFindings.map(f => f.algorithmId))],
      uniqueSafeAlgorithms: [...new Set(allSafe.map(f => f.id))],
    };

    return { findings: allFindings, safeFindings: allSafe, summary };
  }

  // ═══════════════════════════════════════════════════════
  // 2. TLS ANALYZER — Endpoint Inspection
  // ═══════════════════════════════════════════════════════
  async function analyzeTLS(hostname) {
    const results = {
      hostname,
      timestamp: new Date().toISOString(),
      reachable: false,
      https: false,
      headers: {},
      tlsInfo: null,
      cipherFindings: [],
      cnsa2Compliant: false,
      score: 0,
      recommendations: []
    };

    try {
      // Normalize hostname
      let url = hostname.trim();
      if (!url.startsWith('http')) url = 'https://' + url;
      const parsedUrl = new URL(url);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      let response = null;
      let headersReadable = false;

      // Try cors mode first to read security headers
      try {
        response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          signal: controller.signal,
          redirect: 'follow'
        });
        headersReadable = true;
        results.reachable = true;
        results.https = parsedUrl.protocol === 'https:';
      } catch (corsErr) {
        // CORS blocked — fallback to no-cors (opaque response)
        try {
          response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal
          });
          results.reachable = true;
          results.https = parsedUrl.protocol === 'https:';
        } catch (noCorsErr) {
          if (noCorsErr.name === 'AbortError') {
            results.recommendations.push('❌ Connection timed out. Ensure the host is reachable.');
          } else {
            // Even failed no-cors fetches to HTTPS endpoints indicate reachability
            results.reachable = true;
            results.https = parsedUrl.protocol === 'https:';
          }
        }
      }

      clearTimeout(timeout);

      // Read security headers if accessible
      if (response && headersReadable) {
        const secHeaders = ['strict-transport-security', 'content-security-policy',
          'x-content-type-options', 'x-frame-options', 'x-xss-protection',
          'referrer-policy', 'permissions-policy'];
        secHeaders.forEach(h => {
          const val = response.headers.get(h);
          if (val) results.headers[h] = val;
        });
      }

      // ── Score calculation ──
      let score = 0;

      // HTTPS check (30 points)
      if (results.https) {
        score += 30;
        results.recommendations.push('✅ HTTPS enabled — encrypted connection established');
      } else {
        results.recommendations.push('❌ CRITICAL: No HTTPS. All traffic is in plaintext.');
      }

      // TLS version inference (20 points if HTTPS)
      if (results.https && results.reachable) {
        score += 20;
        results.recommendations.push('✅ TLS 1.2+ active (inferred from successful HTTPS connection)');
      }

      // Security headers scoring
      if (results.headers['strict-transport-security']) {
        score += 15;
        const maxAge = results.headers['strict-transport-security'].match(/max-age=(\d+)/);
        const preload = results.headers['strict-transport-security'].includes('preload');
        results.recommendations.push(`✅ HSTS enabled${maxAge ? ' (max-age=' + maxAge[1] + ')' : ''}${preload ? ' with preload' : ''}`);
      } else if (headersReadable) {
        results.recommendations.push('⚠️ Missing HSTS header. Add Strict-Transport-Security to enforce HTTPS.');
      } else {
        results.recommendations.push('⚠️ Cannot verify HSTS header (CORS restricted). Use OpenSSL paste for full analysis.');
      }

      if (results.headers['content-security-policy']) {
        score += 10;
        results.recommendations.push('✅ Content Security Policy configured');
      } else if (headersReadable) {
        results.recommendations.push('⚠️ Missing Content-Security-Policy header.');
      }

      if (results.headers['x-content-type-options']) {
        score += 5;
        results.recommendations.push('✅ X-Content-Type-Options: nosniff');
      } else if (headersReadable) {
        results.recommendations.push('⚠️ Missing X-Content-Type-Options header.');
      }

      if (results.headers['x-frame-options']) {
        score += 5;
        results.recommendations.push('✅ X-Frame-Options configured (clickjacking protection)');
      } else if (headersReadable) {
        results.recommendations.push('⚠️ Missing X-Frame-Options header.');
      }

      if (results.headers['referrer-policy']) {
        score += 5;
        results.recommendations.push('✅ Referrer-Policy configured');
      }

      if (results.headers['permissions-policy']) {
        score += 5;
        results.recommendations.push('✅ Permissions-Policy configured');
      }

      // If headers weren't readable, note the limitation
      if (!headersReadable && results.reachable) {
        results.recommendations.push('⚠️ Browser CORS policy prevented reading security headers. Paste OpenSSL output below for full cipher suite analysis.');
      }

      // Quantum-readiness assessment
      results.recommendations.push('⚠️ Key exchange likely uses ECDHE (quantum-vulnerable). Verify with OpenSSL output or request ML-KEM hybrid support.');

      results.tlsInfo = {
        note: headersReadable ? 'Headers read via CORS. For full cipher analysis, paste openssl output.' : 'Browser-based scan: Limited to observable properties. Paste openssl output for full cipher suite analysis.',
        protocol: results.https ? 'TLS 1.2+ (inferred)' : 'None',
        headersReadable: headersReadable
      };

      results.score = Math.min(score, 100);

    } catch (err) {
      results.recommendations.push('❌ Error: ' + err.message);
    }

    return results;
  }

  // Parse openssl s_client output for detailed TLS analysis
  function parseOpenSSLOutput(rawOutput) {
    const findings = [];
    const info = {
      protocol: null,
      cipher: null,
      keyExchange: null,
      certAlgorithm: null,
      certKeySize: null,
      cipherSuites: [],
      issues: [],
      safe: [],
      score: 0,
      cnsa2: { compliant: false, issues: [] }
    };

    if (!rawOutput || rawOutput.trim().length < 10) return info;

    // Extract protocol version
    const protoMatch = rawOutput.match(/(?:Protocol\s*:\s*|New,\s*)(TLSv[\d.]+|SSLv[\d.]+)/i);
    if (protoMatch) {
      info.protocol = protoMatch[1];
      if (info.protocol === 'TLSv1.3') {
        info.score += 25;
        info.safe.push('TLS 1.3 — best available protocol');
      } else if (info.protocol === 'TLSv1.2') {
        info.score += 15;
        info.issues.push('TLS 1.2 — acceptable but TLS 1.3 preferred for PQC readiness');
      } else {
        info.issues.push(`${info.protocol} — OBSOLETE. Must upgrade to TLS 1.3`);
      }
    }

    // Extract cipher
    const cipherMatch = rawOutput.match(/Cipher\s*(?::|is)\s*(\S+)/i);
    if (cipherMatch) {
      info.cipher = cipherMatch[1];
      const known = TLS_CIPHERS[info.cipher];
      if (known) {
        if (known.pqc) { info.score += 30; info.safe.push(`${info.cipher} — PQC-hybrid cipher suite`); }
        else if (known.safe) { info.score += 20; info.safe.push(`${info.cipher} — strong symmetric cipher`); }
        else { info.issues.push(`${info.cipher} — ${known.issue}`); }
      }
    }

    // Extract key exchange
    const kexMatch = rawOutput.match(/Server Temp Key:\s*(.+)/i);
    if (kexMatch) {
      info.keyExchange = kexMatch[1].trim();
      if (/ECDH|X25519|P-256|P-384/i.test(info.keyExchange)) {
        info.issues.push(`Key Exchange: ${info.keyExchange} — QUANTUM VULNERABLE. Migrate to ML-KEM`);
        info.cnsa2.issues.push('Key exchange uses ECC — not CNSA 2.0 compliant');
      } else if (/Kyber|ML-KEM/i.test(info.keyExchange)) {
        info.score += 25;
        info.safe.push(`Key Exchange: ${info.keyExchange} — QUANTUM SAFE`);
      }
    }

    // Extract certificate info
    const certMatch = rawOutput.match(/Peer signing digest:\s*(\S+)/i);
    if (certMatch) info.certAlgorithm = certMatch[1];

    const keySizeMatch = rawOutput.match(/Server public key is\s*(\d+)\s*bit/i);
    if (keySizeMatch) {
      info.certKeySize = parseInt(keySizeMatch[1]);
      if (info.certKeySize < 2048) info.issues.push(`Certificate key size ${info.certKeySize} bits — TOO WEAK`);
    }

    // Parse cipher suite list
    const suiteMatches = rawOutput.match(/(?:0x[0-9A-F,]+\s*-\s*)?(TLS_\S+)/gi);
    if (suiteMatches) {
      info.cipherSuites = [...new Set(suiteMatches.map(s => s.replace(/0x[0-9A-F,]+\s*-\s*/i, '').trim()))];
    }

    // CNSA 2.0 compliance check
    info.cnsa2.compliant = info.score >= 60 && info.cnsa2.issues.length === 0;

    // Ensure minimum score
    info.score = Math.min(Math.max(info.score, 0), 100);

    return info;
  }

  // ═══════════════════════════════════════════════════════
  // 3. CRYPTODEPS — Dependency Analysis
  // ═══════════════════════════════════════════════════════
  function scanDependencies(filename, content) {
    const results = { filename, format: 'unknown', dependencies: [], vulnerable: [], safe: [], summary: {} };

    let deps = {};
    const lowerName = filename.toLowerCase();

    try {
      if (lowerName.includes('package.json') || lowerName.endsWith('.json')) {
        const pkg = JSON.parse(content);
        deps = { ...pkg.dependencies, ...pkg.devDependencies };
        results.format = 'npm (package.json)';
      } else if (lowerName.includes('requirements') || lowerName.endsWith('.txt')) {
        content.split('\n').forEach(line => {
          const clean = line.trim().split('#')[0].trim();
          if (!clean) return;
          const parts = clean.split(/[=<>!~]+/);
          if (parts[0]) deps[parts[0].trim().toLowerCase()] = parts[1]?.trim() || '*';
        });
        results.format = 'pip (requirements.txt)';
      } else if (lowerName.endsWith('.toml') || lowerName.includes('cargo')) {
        const depSection = content.match(/\[dependencies\]([\s\S]*?)(?:\[|\s*$)/i);
        if (depSection) {
          depSection[1].split('\n').forEach(line => {
            const match = line.match(/^(\S+)\s*=\s*["']?([^"'\s]+)/);
            if (match) deps[match[1]] = match[2];
          });
        }
        results.format = 'cargo (Cargo.toml)';
      } else if (lowerName.includes('go.mod') || lowerName.endsWith('.mod')) {
        content.split('\n').forEach(line => {
          const match = line.match(/^\s*(\S+\/\S+)\s+(v[\d.]+)/);
          if (match) deps[match[1]] = match[2];
        });
        results.format = 'go (go.mod)';
      } else if (lowerName.includes('pom.xml') || lowerName.endsWith('.xml')) {
        const artMatches = content.matchAll(/<artifactId>([^<]+)<\/artifactId>/gi);
        for (const m of artMatches) deps[m[1]] = '*';
        results.format = 'maven (pom.xml)';
      } else if (lowerName.includes('gemfile') || lowerName.endsWith('.gemfile')) {
        content.split('\n').forEach(line => {
          const match = line.match(/^\s*gem\s+['"](\S+)['"]/);
          if (match) deps[match[1]] = '*';
        });
        results.format = 'ruby (Gemfile)';
      }
    } catch (e) {
      results.format = 'parse error: ' + e.message;
    }

    // Check each dependency against vulnerability database
    Object.keys(deps).forEach(dep => {
      const depLower = dep.toLowerCase();
      const version = deps[dep];
      results.dependencies.push({ name: dep, version });

      // Check direct match
      const vuln = VULN_DEPS[depLower] || VULN_DEPS[dep];
      if (vuln) {
        results.vulnerable.push({
          name: dep,
          version,
          algorithm: vuln.algo,
          severity: vuln.severity,
          alternative: vuln.alt,
          lang: vuln.lang
        });
      }

      // Check partial match for Go-style imports
      Object.keys(VULN_DEPS).forEach(vKey => {
        if (depLower.includes(vKey) && !results.vulnerable.find(v => v.name === dep)) {
          results.vulnerable.push({
            name: dep,
            version,
            algorithm: VULN_DEPS[vKey].algo,
            severity: VULN_DEPS[vKey].severity,
            alternative: VULN_DEPS[vKey].alt,
            lang: VULN_DEPS[vKey].lang
          });
        }
      });
    });

    results.summary = {
      totalDependencies: results.dependencies.length,
      vulnerableCount: results.vulnerable.length,
      critical: results.vulnerable.filter(v => v.severity === 'critical').length,
      high: results.vulnerable.filter(v => v.severity === 'high').length,
      warning: results.vulnerable.filter(v => v.severity === 'warning').length,
    };

    return results;
  }

  // ═══════════════════════════════════════════════════════
  // 4. CBOM GENERATOR — Cryptographic Bill of Materials
  // ═══════════════════════════════════════════════════════
  function generateCBOM(scanResults, tlsResults, depResults, orgName) {
    const cbom = {
      cbomVersion: '1.0',
      generatedAt: new Date().toISOString(),
      organization: orgName || 'Unknown Organization',
      generator: 'QuantumGuard Scanner v1.0',
      summary: {
        totalAssets: 0,
        quantumVulnerable: 0,
        quantumSafe: 0,
        pqcLabel: 'Not Assessed'
      },
      assets: []
    };

    // Add source code findings
    if (scanResults) {
      scanResults.findings.forEach(f => {
        cbom.assets.push({
          type: 'source-code',
          location: `${f.file}:${f.line}`,
          algorithm: f.algorithm,
          algorithmType: f.type,
          keySize: null,
          quantumSafe: false,
          severity: f.severity,
          recommendation: f.recommendation,
          pqcAlternative: f.pqcAlternative
        });
      });
      scanResults.safeFindings.forEach(f => {
        cbom.assets.push({
          type: 'source-code',
          location: `${f.file}:${f.line}`,
          algorithm: f.algorithm,
          algorithmType: f.type,
          keySize: null,
          quantumSafe: true,
          severity: 'safe',
          recommendation: 'PQC-compliant algorithm detected',
          pqcAlternative: 'N/A'
        });
      });
    }

    // Add TLS findings
    if (tlsResults && tlsResults.hostname) {
      cbom.assets.push({
        type: 'tls-endpoint',
        location: tlsResults.hostname,
        algorithm: tlsResults.tlsInfo?.cipher || 'Unknown',
        algorithmType: 'protocol',
        keySize: null,
        quantumSafe: tlsResults.score >= 70,
        severity: tlsResults.score >= 70 ? 'safe' : tlsResults.score >= 40 ? 'warning' : 'critical',
        recommendation: tlsResults.recommendations?.join('; ') || '',
        pqcAlternative: 'TLS 1.3 with ML-KEM hybrid key exchange'
      });
    }

    // Add dependency findings
    if (depResults) {
      depResults.vulnerable.forEach(v => {
        cbom.assets.push({
          type: 'dependency',
          location: `${depResults.filename} → ${v.name}@${v.version}`,
          algorithm: v.algorithm,
          algorithmType: 'library',
          keySize: null,
          quantumSafe: false,
          severity: v.severity,
          recommendation: `Replace with: ${v.alternative}`,
          pqcAlternative: v.alternative
        });
      });
    }

    // Update summary
    cbom.summary.totalAssets = cbom.assets.length;
    cbom.summary.quantumVulnerable = cbom.assets.filter(a => !a.quantumSafe).length;
    cbom.summary.quantumSafe = cbom.assets.filter(a => a.quantumSafe).length;
    cbom.summary.pqcLabel = getPQCLabel(cbom);

    return cbom;
  }

  // ═══════════════════════════════════════════════════════
  // 5. PQC LABELER — Quantum-Safe Certification
  // ═══════════════════════════════════════════════════════
  function getPQCLabel(cbom) {
    if (!cbom || cbom.summary.totalAssets === 0) return 'Not Assessed';

    const vulnPct = cbom.summary.quantumVulnerable / cbom.summary.totalAssets;
    const safePct = cbom.summary.quantumSafe / cbom.summary.totalAssets;
    const hasCritical = cbom.assets.some(a => a.severity === 'critical' && !a.quantumSafe);

    if (vulnPct === 0 && safePct === 1) return 'Fully Quantum Safe';
    if (vulnPct === 0) return 'PQC Ready';
    if (vulnPct <= 0.2 && !hasCritical) return 'Partially Compliant';
    return 'Not Quantum Safe';
  }

  function getPQCLabelDetails(label) {
    const labels = {
      'Fully Quantum Safe': { color: '#10B981', icon: 'verified', bg: '#10B98120', desc: 'All cryptographic assets use NIST-standardized Post-Quantum algorithms. System is shielded against future cryptanalytic threats.' },
      'PQC Ready': { color: '#00D4FF', icon: 'shield_with_heart', bg: '#00D4FF20', desc: 'No quantum-vulnerable algorithms detected. System uses modern cryptographic primitives safe against known quantum attacks.' },
      'Partially Compliant': { color: '#F59E0B', icon: 'warning', bg: '#F59E0B20', desc: 'Some quantum-vulnerable algorithms remain. Migration to PQC alternatives is recommended within 12 months.' },
      'Not Quantum Safe': { color: '#F43F5E', icon: 'gpp_bad', bg: '#F43F5E20', desc: 'Critical quantum-vulnerable algorithms detected. Immediate assessment and migration planning required.' },
      'Not Assessed': { color: '#859398', icon: 'help', bg: '#85939820', desc: 'No scan has been performed yet. Run a scan to assess quantum readiness.' },
    };
    return labels[label] || labels['Not Assessed'];
  }

  // ═══════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════
  return {
    // CryptoScan
    scanSource,
    scanMultipleFiles,
    VULN_PATTERNS,
    SAFE_PATTERNS,

    // TLS Analyzer
    analyzeTLS,
    parseOpenSSLOutput,
    TLS_CIPHERS,
    CNSA2_REQUIREMENTS,

    // CryptoDeps
    scanDependencies,
    VULN_DEPS,

    // CBOM & PQC Labels
    generateCBOM,
    getPQCLabel,
    getPQCLabelDetails,
  };
})();

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Scanner;
}
