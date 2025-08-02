// import { useState } from "react";
import { FaPen, FaTrash, FaWindowMaximize  } from "react-icons/fa";
import "./style.css";

export default function Card({ handleClickOpenOrg, handleClickDelete, handleClickEdit, item }) {

  return (
    <div className="box-card-wrapper" >
      <div className="box-card" key={item.id}>
        <div className="box-card-title">
          {item.org.toLocaleUpperCase()} | {item.titulo.toLocaleUpperCase()}
        </div>

        <div className="box-card-menu">
          <div title="abrir" onClick={(e) => { e.stopPropagation(); handleClickOpenOrg(item.id); }}>
            <FaWindowMaximize className="menu-icone" />
          </div>
          <div title="Editar" onClick={(e) => { e.stopPropagation(); handleClickEdit(item.id); }}>
            <FaPen className="menu-icone" />
          </div>
          <div title="Deletar" onClick={(e) => { e.stopPropagation(); handleClickDelete(item.id); }}>
            <FaTrash className="menu-icone" />
          </div>
        </div>
      </div>
    </div>
  );
}