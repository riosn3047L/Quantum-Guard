package security

import (
	"crypto/des"
	"crypto/dsa"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/md5"
	"crypto/rand"
	"crypto/rc4"
	"crypto/rsa"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/x509"
	"fmt"
	"math/big"
)

// GenerateRSAKey generates a 2048-bit RSA key pair
func GenerateRSAKey() (*rsa.PrivateKey, error) {
	key, err := rsa.GenerateKey(rand.Reader, 2048)
	return key, err
}

// SignWithECDSA creates an ECDSA signature using P-256 curve
func SignWithECDSA(data []byte) ([]byte, error) {
	privateKey, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	hash := sha256.Sum256(data)
	r, s, err := ecdsa.Sign(rand.Reader, privateKey, hash[:])
	if err != nil {
		return nil, err
	}
	return append(r.Bytes(), s.Bytes()...), nil
}

// GenerateDSAKey creates a new DSA key
func GenerateDSAKey() (*dsa.PrivateKey, error) {
	params := new(dsa.Parameters)
	dsa.GenerateParameters(params, rand.Reader, dsa.L1024N160)
	key := new(dsa.PrivateKey)
	key.PublicKey.Parameters = *params
	dsa.GenerateKey(key, rand.Reader)
	return key, nil
}

// HashMD5 computes MD5 hash (INSECURE)
func HashMD5(data []byte) []byte {
	hash := md5.Sum(data)
	return hash[:]
}

// HashSHA1 computes SHA-1 hash (DEPRECATED)
func HashSHA1(data []byte) []byte {
	hash := sha1.Sum(data)
	return hash[:]
}

// EncryptDES encrypts using DES (BROKEN - 56 bit key)
func EncryptDES(data, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key[:8])
	if err != nil {
		return nil, err
	}
	dst := make([]byte, len(data))
	block.Encrypt(dst, data)
	return dst, nil
}

// NewRC4Cipher creates an RC4 stream cipher (BROKEN)
func NewRC4Cipher(key []byte) (*rc4.Cipher, error) {
	return rc4.NewCipher(key)
}

// ═══ QUANTUM-SAFE ═══

// SecureHash uses SHA-256 (quantum resistant)
func SecureHash(data []byte) []byte {
	hash := sha256.Sum256(data)
	return hash[:]
}

// ML-KEM integration placeholder
func InitMLKEM() {
	fmt.Println("Initializing ML-KEM-768 for quantum-safe key exchange")
}
