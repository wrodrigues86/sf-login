export default function CustomButton({ titulo, bgColor, TextColor, ...props }) {
  return (
      <button
        {...props}
        style={{
          padding: '10px',
          backgroundColor: bgColor,
          color: TextColor,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width:"80px",
        }}
      >
        {titulo}
      </button>
  );
}
