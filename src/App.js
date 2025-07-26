import { useState } from "react";
import Home from "./Pages/Home";
import Ferramentas from "./Pages/Ferramentas";
import Layout from "./Components/Layout/Layout";

export default function App() {

    const [tela, setTela] = useState("Home");

    const handleTela = () => {
        if (tela === "Home") { return <Home /> };
        if (tela === "Ferramentas") { return <Ferramentas /> };
    };

    return (
        <Layout tela={tela} setTela={setTela}>
            {handleTela()}
        </Layout>
    )
}