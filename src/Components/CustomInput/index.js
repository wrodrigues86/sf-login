import "./style.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CustomInput({ title, type, ...props }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="box-input" style={{ position: "relative" }}>
      <label htmlFor={title}>{title}</label>
      <input
        className="input" id={title} type={isPassword ? (mostrarSenha ? "text" : "password") : type} {...props}
        style={isPassword ? { paddingRight: "35px" } : {}}
      />
      {isPassword && (
        <span
          onClick={() => setMostrarSenha(!mostrarSenha)}
          style={{
            position: "absolute",
            top: "36px",
            right: "10px",
            cursor: "pointer",
            color: "#4caf50",
          }}
        >
          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
}
