
import { useState } from "react";
import CustomInput from "../../Components/CustomInput";

export default function NovoLogin() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div>
            <h3>Novo Login</h3>
            <p>
                <CustomInput
                    title="Nome"
                    name="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <CustomInput
                    title="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </p>
        </div>
    )
}