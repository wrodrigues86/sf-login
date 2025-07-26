import "./Layout.css";
import { FaHome } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { MdBuild } from 'react-icons/md';


export default function Layout({ tela, setTela, children }) {
    return (
        <div class="box">
            <header>
                
                <IoSearch size={24} />

                <button className={`menu ${tela === "Home" ? "ativo" : ""}`}
                    onClick={() => setTela("Home")}>
                    <FaHome size={24} />
                </button>

                <button className={`menu ${tela === "Ferramentas" ? "ativo" : ""}`}
                    onClick={() => setTela("Ferramentas")}>
                    <MdBuild size={24} />
                </button>
            </header>
            <main>{children}</main>
            <footer className="footer">
            </footer>
        </div>
    );
}