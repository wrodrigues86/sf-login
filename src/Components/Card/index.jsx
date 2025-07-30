import { FaPen } from 'react-icons/fa'; // Caneta sólida
import { FaTrash } from 'react-icons/fa'; // Lixeira cheia
import "./style.css";

export default function Card({handleClickDelete, handleClickEdit, item})
{
    const handleClickOpen = (id) => {
        alert('abrir');
    };

    return (
        <div className="box-card" key={item.id}>
            <idv  onClick={handleClickOpen} className="box-card-title">
                {item.org.toLocaleUpperCase()} | {item.titulo.toLocaleUpperCase()}
            </idv>
            <idv className="box-card-menu">
                <div title="Editar" onClick={() => handleClickEdit(item.id)}><FaPen className="menu-icone" /></div>
                <div title="Deletar" onClick={() => handleClickDelete(item.id)}><FaTrash className="menu-icone" /></div>
            </idv>
        </div>
    );
}