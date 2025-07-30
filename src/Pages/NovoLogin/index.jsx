import { useState } from "react";
import CustomInput from "../../Components/CustomInput";
import CustomSelect from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import LoginServices from "../../Services/LoginServices";
import LoginDto from "../../Model/LoginDto";

export default function NovoLogin({ setTela, dados, setDados }) {

  const [loginDto, setLoginDto] = useState(dados || new LoginDto(
    {
      id: "",
      org: "",
      titulo: "",
      descricao: "",
      grupo: "",
      url: "",
      usuario: "",
      senha: ""
    }
  ));

  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleChangeOrg = (value) => {
    if (value === "") {
      setLoginDto(prev => ({ ...prev, org: "", url: "" }));
      setIsReadOnly(false);
      return;
    }

    // Define url baseado no value
    const url = value === "SANDBOX"
      ? "https://test.salesforce.com"
      : "https://login.salesforce.com";

    // Atualiza org, url e o isReadOnly
    setLoginDto(prev => ({ ...prev, org: value, url }));
    setIsReadOnly(true);
  };


  const handleClickSave = () => {

    const loginService = new LoginServices();

    // Em edição
    if(dados !== null)
    {
      loginService.EditLogin(dados.id, loginDto);
      console.log(typeof dados);
    } else {
      const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
      const loginComId = { ...loginDto, id };
      loginService.SaveLogin(loginComId);
    }

    alert('Salvo com sucesso.');
    setTela("Home");
    setLoginDto([]);
    setIsReadOnly(false);
    setDados(null);
  }

  const handleChangeField = (e) => {
    setLoginDto(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClickCancel = () => {
    setTela("Home");
    setLoginDto([]);
    setIsReadOnly(false);
    setDados(null);
  };

  return (
    <div>
      <CustomSelect
        title="Tipo"
        name="org"
        value={loginDto.org}
        onChange={(e) => handleChangeOrg(e.target.value)}
        options={["SANDBOX", "PRODUÇÃO"]}
      />

      {!isReadOnly && (
        <CustomInput
          title="Url"
          name="url"
          type="url"
          value={loginDto.url}
          onChange={(e) => handleChangeField(e)}
        />
      )}

      <CustomInput
        title="Grupo"
        name="grupo"
        type="text"
        value={loginDto.grupo}
        onChange={(e) => handleChangeField(e)}
      />

      <CustomInput
        title="Título"
        name="titulo"
        type="text"
        value={loginDto.titulo}
        onChange={(e) => handleChangeField(e)}
      />

      <CustomInput
        title="Descrição"
        name="descricao"
        type="text"
        value={loginDto.descricao}
        onChange={(e) => handleChangeField(e)}
      />

      <CustomInput
        title="Usuário"
        name="usuario"
        type="email"
        value={loginDto.usuario}
        onChange={(e) => handleChangeField(e)}
      />

      <CustomInput
        title="Senha"
        name="senha"
        type="password"
        value={loginDto.senha}
        onChange={(e) => handleChangeField(e)}
      />

      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <CustomButton bgColor="#cccccc" TextColor="#000000" titulo="Cancelar" onClick={handleClickCancel} />
          <CustomButton bgColor="#06472cff" TextColor="#ffffff" titulo="Salvar" onClick={handleClickSave} />
        </div>
      </div>
    </div>
  );
}
