/* global chrome */
import CryptoHelper from "./CryptoHelper.js";

export default class LoginServices {
  // Retorna todos os logins descriptografados
  async GetLogin() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["login"], async (result) => {
        if (!result.login) return resolve([]);
        try {
          const decrypted = await CryptoHelper.decryptData(result.login);
          resolve(decrypted);
        } catch (e) {
          console.error("Erro ao descriptografar:", e);
          resolve([]); // ou lançar erro se quiser
        }
      });
    });
  }

  // Salva um novo login
  async SaveLogin(novoLogin) {
    const listaAtual = await this.GetLogin();
    const novaLista = [...listaAtual, novoLogin];
    const encrypted = await CryptoHelper.encryptData(novaLista);

    return new Promise((resolve) => {
      chrome.storage.local.set({ login: encrypted }, resolve);
    });
  }

  // Edita um login pelo ID
  async EditLogin(id, novosDados) {
    const lista = await this.GetLogin();
    const novaLista = lista.map((login) =>
      login.id === id ? { ...login, ...novosDados } : login
    );
    const encrypted = await CryptoHelper.encryptData(novaLista);

    return new Promise((resolve) => {
      chrome.storage.local.set({ login: encrypted }, resolve);
    });
  }

  // Deleta um login pelo ID
  async DeleteLogin(id) {
    const lista = await this.GetLogin();
    const novaLista = lista.filter((login) => login.id !== id);
    const encrypted = await CryptoHelper.encryptData(novaLista);

    return new Promise((resolve) => {
      chrome.storage.local.set({ login: encrypted }, resolve);
    });
  }

  // Exporta logins descriptografados em JSON legível
  async ExportarLogins() {
    const lista = await this.GetLogin();
    return JSON.stringify(lista, null, 2);
  }

  // Importa JSON e criptografa antes de salvar
  async ImportarLogins(jsonString) {
    return new Promise(async (resolve, reject) => {
      try {
        const dados = JSON.parse(jsonString);
        if (!Array.isArray(dados)) {
          return reject("Conteúdo inválido.");
        }

        const encrypted = await CryptoHelper.encryptData(dados);
        chrome.storage.local.set({ login: encrypted }, resolve);
      } catch (erro) {
        reject("Erro ao importar JSON: " + erro.message);
      }
    });
  }
}
