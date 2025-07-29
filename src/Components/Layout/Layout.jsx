import "./Layout.css";
import { FaHome } from 'react-icons/fa';
import { MdAdd } from "react-icons/md";
import { MdBuild } from 'react-icons/md';

export default function Layout({ tela, setTela, children }) {
    return (
        <div class="box">
            <header className="box-header">
                <div className="box-header-title">
                    Salesforce Auto Login
                </div>
                 <div className="box-header-menu">

                    <button className={`menu ${tela === "Home" ? "ativo" : ""}`}
                    onClick={() => setTela("Home")}>
                    <FaHome size={20} />
                    </button>

                    <button className={`menu ${tela === "Novo" ? "ativo" : ""}`}
                    onClick={() => setTela("Novo")}>
                    <MdAdd size={20} />
                    </button>

                    <button className={`menu ${tela === "Ferramentas" ? "ativo" : ""}`}
                    onClick={() => setTela("Ferramentas")}>
                    <MdBuild size={20} />
                    </button>
                </div>

            </header>
            <main className="box-container">{children}</main>
            <footer className="box-footer">
            </footer>
        </div>
    );
}