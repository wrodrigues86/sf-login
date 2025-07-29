import { useState } from "react";
import CustomInput from "../../Components/CustomInput";
import CustomSelect from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

export default function NovoLogin() {
  const [org, setOrg] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [grupo, setGrupo] = useState("");
  const [url, setUrl] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleChangeOrg = (value) => {
    setOrg(value);

    if (value === "") {
      setUrl("");
      setIsReadOnly(false);
      return; // só retorna aqui
    }

    setIsReadOnly(true);

    if (value === "SANDBOX") {
      setUrl("https://test.salesforce.com");
    } else {
      setUrl("https://login.salesforce.com");
    }
  };

  return (
    <div>
      <CustomSelect
        title="Tipo"
        name="grupo"
        value={org}
        onChange={(e) => handleChangeOrg(e.target.value)}
        options={["SANDBOX", "PRODUÇÃO"]}
      />

      {!isReadOnly && (
        <CustomInput
          title="Url"
          name="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}

      <CustomInput
        title="Grupo"
        name="grupo"
        type="text"
        value={grupo}
        onChange={(e) => setGrupo(e.target.value)}
      />

      <CustomInput
        title="Título"
        name="titulo"
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <CustomInput
        title="Descrição"
        name="descricao"
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <CustomInput
        title="Usuário"
        name="usuario"
        type="email"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <CustomInput
        title="Senha"
        name="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <CustomButton bgColor="red" TextColor="#ffffff" titulo="Excluir" />
          <CustomButton
            bgColor="#06472cff"
            TextColor="#ffffff"
            titulo="Salvar"
          />
        </div>
      </div>
    </div>
  );
}
