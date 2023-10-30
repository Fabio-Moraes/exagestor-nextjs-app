import CryptoJS from 'crypto-js';

const secretKey = 'super_secret_key';

interface EncryptedObject {
  ciphertext: string;
  salt: string;
}

export function encryptObject(object: Record<string, any>): string {
  const objectString = JSON.stringify(object);
  const ciphertext = CryptoJS.AES.encrypt(objectString, secretKey).toString();
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const encryptedObject: EncryptedObject = {
    ciphertext,
    salt,
  };
  return encodeURIComponent(JSON.stringify(encryptedObject));
}

export function decryptObject(encryptedText: string): Record<string, any> {
  const encryptedObject: EncryptedObject = JSON.parse(decodeURIComponent(encryptedText));
  const bytes = CryptoJS.AES.decrypt(encryptedObject.ciphertext, secretKey);
  const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedObject;
}
