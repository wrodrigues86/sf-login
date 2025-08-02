export default class LoginServices {
  // Adiciona um novo login à 
  /* global chrome */
  SaveLogin = (novoLogin) => {
    return this.GetLogin().then((listaAtual) => {
      const novaLista = [...listaAtual, novoLogin];
      return new Promise((resolve) => {
        chrome.storage.local.set({ login: novaLista }, () => {
          console.log("Login salvo:", novoLogin);
          resolve();
        });
      });
    });
  };

  // Retorna toda a lista de logins
  GetLogin = () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(["login"], (result) => {
        resolve(result.login || []);
      });
    });
  };

  // Edita um login específico pelo ID
  EditLogin = (id, novosDados) => {
    return this.GetLogin().then((lista) => {
      const novaLista = lista.map((login) =>
        login.id === id ? { ...login, ...novosDados } : login
      );
      return new Promise((resolve) => {
        chrome.storage.local.set({ login: novaLista }, () => {
          console.log("Login editado:", id);
          resolve();
        });
      });
    });
  };

  // Remove um login específico pelo ID
  DeleteLogin = (id) => {
    return this.GetLogin().then((lista) => {
      const novaLista = lista.filter((login) => login.id !== id);
      return new Promise((resolve) => {
        chrome.storage.local.set({ login: novaLista }, () => {
          console.log("Login deletado:", id);
          resolve();
        });
      });
    });
  };

  ExportarLogins = () => {
    return this.GetLogin().then((lista) => {
      return JSON.stringify(lista, null, 2); // retorna o JSON formatado
    });
  };

  ImportarLogins = (jsonString) => {
    return new Promise((resolve, reject) => {
      try {
        const dados = JSON.parse(jsonString);

        if (!Array.isArray(dados)) {
          return reject("Conteúdo inválido.");
        }

        chrome.storage.local.set({ login: dados }, () => {
          console.log("Dados importados:", dados);
          resolve();
        });
      } catch (erro) {
        reject("Erro ao importar JSON: " + erro.message);
      }
    });
  };
}
