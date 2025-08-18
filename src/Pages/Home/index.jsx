import { useState, useEffect } from "react";
import "./style.css";
import Card from "../../Components/Card";
import LoginServices from "../../Services/LoginServices";
import CryptoHelper from "../../Helper/CryptoHelper";

export default function Home({ reload, setTela, setDados }) {
    const [logins, setLogins] = useState([]);

    CryptoHelper.setMasterPassword("eb87Aa5oZw6tYlhtiIxj9cBPviBJZrTaIzzgmtWdkU6EBtdbZQCMKH6YglmAYRsQ");

    useEffect(() => {
        const loginService = new LoginServices();
        loginService.GetLogin().then((dados) => {
            setLogins(dados || []);
        });
    }, [reload]);

    const handleClickDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este item?")) {
            const login = new LoginServices();
            login.DeleteLogin(id);

            // Atualiza a lista mostrada
            const novaLista = logins.filter(item => item.id !== id);
            setLogins(novaLista);
        }
    };

    const handleClickEdit = (id) => {
        const loginSelecionado = logins.find(item => item.id === id);
        setTela("Novo");
        setDados(loginSelecionado);
    }

    const handleClickOpenOrg = (id) => {
        const org = logins.find(item => item.id === id);

        /* global chrome */
        chrome.tabs.create({ url: org.url }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (username, password) => {
                    function tryLogin() {
                        const userField = document.getElementById('username');
                        const passField = document.getElementById('password');
                        const loginBtn = document.getElementById('Login');

                        if (userField && passField && loginBtn) {
                            userField.value = username;
                            passField.value = password;
                            loginBtn.click();
                        } else {
                            setTimeout(tryLogin, 500);
                        }
                    }
                    tryLogin();
                },
                args: [org.usuario, org.senha]
            });
        });
    }

    return (
        <>
            {
                logins.length > 0 ? (
                    logins.sort((a, b) => a.grupo.localeCompare(b.grupo))
                        .map((item, index) =>
                            <Card handleClickOpenOrg={handleClickOpenOrg} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} key={index} item={item} />)
                ) : (
                    <div className="not-found">Nenhum registro encontrado.</div>
                )
            }
        </>
    );
}