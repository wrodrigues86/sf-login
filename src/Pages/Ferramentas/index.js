import { useState } from "react";
import LoginServices from "./../../Services/LoginServices";
import "./styles.css"; // vamos criar esse arquivo

export default function Ferramentas() {
  const [jsonExportado, setJsonExportado] = useState("");
  const [jsonImportado, setJsonImportado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const service = new LoginServices();

  const exportar = () => {
    service.ExportarLogins().then((json) => {
      setJsonExportado(json);
      setMensagem("✔ Logins exportados com sucesso!");
    });
  };

  const importar = () => {
    service.ImportarLogins(jsonImportado)
      .then(() => {
        setMensagem("✔ Logins importados com sucesso!");
        setJsonImportado("");
      })
      .catch((err) => setMensagem("❌ Erro ao importar: " + err));
  };

  const copiar = () => {
    navigator.clipboard.writeText(jsonExportado);
    setMensagem("📋 JSON copiado para a área de transferência!");
  };

  return (
    <div className="ferramentas-container">
      <h1 className="titulo">🔧 Ferramentas de Backup</h1>

      {/* Exportar */}
      <section className="bloco">
        <h2 className="subtitulo">📤 Exportar Logins</h2>
        <div className="botoes">
          <button className="botao azul" onClick={exportar}>Gerar JSON</button>
          {jsonExportado && <button className="botao cinza" onClick={copiar}>Copiar JSON</button>}
        </div>
        {jsonExportado && (
          <textarea
            className="textarea"
            rows={8}
            readOnly
            value={jsonExportado}
          />
        )}
      </section>

      {/* Importar */}
      <section className="bloco">
        <h2 className="subtitulo">📥 Importar Logins</h2>
        <textarea
          className="textarea"
          rows={8}
          placeholder="Cole aqui o JSON a ser importado..."
          value={jsonImportado}
          onChange={(e) => setJsonImportado(e.target.value)}
        />
        <button className="botao verde" onClick={importar}>Importar JSON</button>
      </section>

      {/* Mensagem */}
      {mensagem && <div className="mensagem">{mensagem}</div>}

      <footer className="creditos">
        <span>Desenvolvido por Wellington Rodrigues</span>
        <span className="versao">Versão 1.1</span>
      </footer>
    </div>

  );
}
