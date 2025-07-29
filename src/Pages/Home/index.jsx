import { useState } from "react";
import "./style.css";
import Card from "../../Components/Card";

export default function Home()
{
    const [ logins, setLogins ] = useState([
        {
            "id": "1",
            "org": "DEV",
            "titulo": "b wilson Sons Dev",
            "descricao": "",
            "grupo": "wilson Sons",
            "url": "https://test.salesforce.com",
            "usuario": "wrodrigues@triscal.com.br.wilsonsons.mfase2dev",
            "senha": "Tr1sc@l123456"
        },
                {
            "id": "2",
            "org": "DEV",
            "titulo": " a wilson Sons Dev",
            "descricao": "",
            "grupo": "wilson Sons",
            "url": "https://test.salesforce.com",
            "usuario": "wrodrigues@triscal.com.br.wilsonsons.mfase2dev",
            "senha": "Tr1sc@l123456"
        }
    ])

    return (
        <>
            {
                logins.length > 0 ? (
                    logins.sort((a, b) => a.grupo.localeCompare(b.grupo))
                    .map((item, index) => <Card key={index} item={item} />)
                ) : (
                    <div className="not-found">Nenhum login encontrado.</div>
                )
            }
        </>
    );
}