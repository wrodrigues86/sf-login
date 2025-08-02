export default class LoginServices {
  // // Salva um objeto de login
  // /* global chrome */
  // SaveLogin = (dadosLogin) => {
  //     chrome.storage.local.set({ login: dadosLogin }, () => {
  //         console.log("Login salvo:", dadosLogin);
  //     });
  // }

  // // Recupera os dados salvos (retorna Promise)
  // GetLogin = () => {
  //     return new Promise((resolve) => {
  //         chrome.storage.local.get(["login"], (result) => {
  //             resolve(result.login || null);
  //         });
  //     });
  // }

  // // Edita o login atual com novos dados
  // EditLogin = (novosDados) => {
  //     this.GetLogin().then((loginAtual) => {
  //         const loginAtualizado = { ...loginAtual, ...novosDados };

  //         chrome.storage.local.set({ login: loginAtualizado }, () => {
  //             console.log("Login editado:", loginAtualizado);
  //         });
  //     });
  // }

  // DeleteLogin = () => {
  //     chrome.storage.local.remove("login", () => {
  //         console.log("Login deletado!");
  //     });
  // };

  // Adiciona um novo login à lista
  SaveLogin = (novoLogin) => {
    const listaAtual = JSON.parse(localStorage.getItem("login")) || [];
    const novaLista = [...listaAtual, novoLogin];
    localStorage.setItem("login", JSON.stringify(novaLista));
  };

  // Retorna toda a lista de logins
  GetLogin = () => {
    return new Promise((resolve) => {
      const dados = localStorage.getItem("login");
      resolve(dados ? JSON.parse(dados) : []);
    });
  };

  // Edita um login específico pelo ID
  EditLogin = (id, novosDados) => {
    this.GetLogin().then((lista) => {
      const novaLista = lista.map((login) =>
        login.id === id ? { ...login, ...novosDados } : login
      );

      localStorage.setItem("login", JSON.stringify(novaLista));
      console.log("Login editado:", id);
    });
  };

  // Remove um login específico pelo ID
  DeleteLogin = (id) => {
    this.GetLogin().then((lista) => {
      const novaLista = lista.filter((login) => login.id !== id);
      localStorage.setItem("login", JSON.stringify(novaLista));
    });
  };
}
