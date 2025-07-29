
export default function CustomSelect({ title, options = [], ...props }) {
  return (
    <div className="box-input">
      <label htmlFor={title}>{title}</label>
      <select className="input" id={title} {...props}>
        <option value="">Selecione</option>
        {options.map((opcao, index) => (
          <option key={index} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}
