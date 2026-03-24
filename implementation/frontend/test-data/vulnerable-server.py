"""
Mock Python Server - Contains various quantum-vulnerable cryptographic patterns
Used for testing QuantumGuard CryptoScan tool
"""
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Cipher import DES, ARC4, Blowfish
from ecdsa import SigningKey, NIST256p
import ssl

# ── RSA Key Generation (Quantum Vulnerable) ──
def generate_rsa_keys():
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

# ── ECDSA Signing (Quantum Vulnerable) ──
def sign_message(message):
    sk = SigningKey.generate(curve=NIST256p)
    signature = sk.sign(message.encode())
    return signature

# ── MD5 Hashing (Broken regardless of quantum) ──
def hash_password_md5(password):
    return hashlib.md5(password.encode()).hexdigest()

# ── SHA-1 Hashing (Deprecated) ──
def hash_token_sha1(token):
    return hashlib.sha1(token.encode()).hexdigest()

# ── DES Encryption (56-bit key, trivially broken) ──
def encrypt_data_des(data, key):
    cipher = DES.new(key[:8], DES.MODE_ECB)
    padded = data + b'\x00' * (8 - len(data) % 8)
    return cipher.encrypt(padded)

# ── RC4 Stream Cipher (Broken) ──
def encrypt_rc4(data, key):
    cipher = ARC4.new(key)
    return cipher.encrypt(data)

# ── Diffie-Hellman Key Exchange (Quantum Vulnerable) ──
class DiffieHellmanExchange:
    def __init__(self):
        self.prime = 23
        self.generator = 5

    def generate_key(self, private_key):
        return pow(self.generator, private_key, self.prime)

    def DH_compute_key(self, other_public, private_key):
        return pow(other_public, private_key, self.prime)

# ── AES-128 (Weak against Grover's algorithm) ──
from Crypto.Cipher import AES
def encrypt_aes128(data, key):
    cipher = AES.new(key[:16], AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(data)
    return cipher.nonce, ciphertext, tag

# ── Blowfish (64-bit block, Sweet32 vulnerable) ──
def encrypt_blowfish(data, key):
    cipher = Blowfish.new(key, Blowfish.MODE_CBC)
    return cipher.encrypt(data)

# ── TLS Configuration with weak ciphers ──
def create_ssl_context():
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ctx.set_ciphers('TLS_RSA_WITH_AES_128_CBC_SHA256:TLS_RSA_WITH_3DES_EDE_CBC_SHA')
    return ctx

# ═══ PQC-Safe Implementations ═══

# ML-KEM (FIPS 203) - Quantum Safe Key Encapsulation
def generate_ml_kem_keypair():
    keypair = ML_KEM.keygen(768)
    return keypair

# ML-DSA (FIPS 204) - Quantum Safe Digital Signatures
def sign_with_ml_dsa(message, private_key):
    signature = ML_DSA.sign(message, private_key)
    return signature

# SLH-DSA (FIPS 205) - Stateless Hash-Based Signatures
def verify_slh_dsa_signature(message, signature, public_key):
    result = SLH_DSA.verify(message, signature, public_key)
    return result

# AES-256-GCM - Quantum Resistant Symmetric Encryption
def encrypt_aes256_gcm(data, key):
    cipher = AES.new(key[:32], AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(data)
    return cipher.nonce, ciphertext, tag

# SHA-256 Hashing - Quantum Resistant
def secure_hash(data):
    return hashlib.sha256(data.encode()).hexdigest()

# SHA-3 Hashing - Latest NIST standard
def secure_hash_sha3(data):
    return hashlib.sha3_256(data.encode()).hexdigest()
