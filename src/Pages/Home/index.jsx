import { useState, useEffect } from "react";
import "./style.css";
import Card from "../../Components/Card";
import LoginServices from "../../Services/LoginServices";

export default function Home({ setTela, setDados }) {
    const [logins, setLogins] = useState([]);

    useEffect(() => {
        const login = new LoginServices();
        login.GetLogin().then((dados) => {
            console.log("Dados carregados:", dados);
            if (dados != null) {
                setLogins(dados);
            }
        });
    }, []);

    const handleClickDelete = (id) => {
        const login = new LoginServices();
        login.DeleteLogin(id);

        // Atualiza a lista mostrada
        const novaLista = logins.filter(item => item.id !== id);
        setLogins(novaLista);
    };

    const handleClickEdit = (id) => {
        const loginSelecionado = logins.find(item => item.id === id);
        setTela("Novo");
        setDados(loginSelecionado);
    }

    return (
        <>
            {
                logins.length > 0 ? (
                    logins.sort((a, b) => a.grupo.localeCompare(b.grupo))
                        .map((item, index) => <Card handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} key={index} item={item} />)
                ) : (
                    <div className="not-found">Nenhum login encontrado.</div>
                )
            }
        </>
    );
}