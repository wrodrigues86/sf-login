
export default function CustomInput({ title, ...props }) {
  return (
    <div style={{ marginBottom: '10px' }}>
        <label htmlFor={title}>{title}:</label>
        <input id={title} {...props} />
    </div>
  );
}
