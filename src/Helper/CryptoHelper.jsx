/* global chrome */

class CryptoHelper {
  // senha mestra em memória
  static masterPassword = null;

  // define a senha mestra (chamado uma vez após o login do usuário)
  static setMasterPassword(password) {
    this.masterPassword = password;
  }

  // busca ou cria salt aleatório no storage
  static async getOrCreateSalt() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["salt"], (result) => {
        if (result.salt) {
          resolve(new Uint8Array(result.salt));
        } else {
          const newSalt = crypto.getRandomValues(new Uint8Array(16));
          chrome.storage.local.set({ salt: Array.from(newSalt) }, () => {
            resolve(newSalt);
          });
        }
      });
    });
  }

  // gera a chave AES a partir da master password + salt
  static async getKey() {
    if (!this.masterPassword) {
      throw new Error(
        "Master password não definida. Use CryptoHelper.setMasterPassword() primeiro."
      );
    }

    const salt = await this.getOrCreateSalt();
    const enc = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(this.masterPassword),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // criptografa qualquer objeto
  static async encryptData(data) {
    const key = await this.getKey();
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(JSON.stringify(data))
    );

    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    };
  }

  // descriptografa objeto
  static async decryptData(encryptedObject) {
    const key = await this.getKey();
    const iv = new Uint8Array(encryptedObject.iv);
    const data = new Uint8Array(encryptedObject.data);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decrypted));
  }
}

export default CryptoHelper;
