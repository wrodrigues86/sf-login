import { useState } from "react";
import Home from "./Pages/Home";
import Ferramentas from "./Pages/Ferramentas";
import Layout from "./Components/Layout/Layout";
import NovoLogin from "./Pages/NovoLogin";

export default function App() {

    const [tela, setTela] = useState("Home");
    const [dados, setDados] = useState(null);

    const handleTela = () => {
        if (tela === "Home") { return <Home setTela={setTela} setDados={setDados}  /> };
        if (tela === "Novo") { return <NovoLogin setTela={setTela} dados={dados} setDados={setDados} /> };
        if (tela === "Ferramentas") { return <Ferramentas /> };
    };

    return (
        <Layout tela={tela} setTela={setTela}>
            {handleTela()}
        </Layout>
    )
}