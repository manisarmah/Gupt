export function xorEncrypt(plaintext, key) {
  let ciphertext = "";
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    ciphertext += String.fromCharCode(charCode);
  }
  return ciphertext;
}

export function xorDecrypt(ciphertext, key) {
  return xorEncrypt(ciphertext, key);
}
