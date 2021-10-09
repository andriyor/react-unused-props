export function TextFunc({ border, size, color, padding, margin, underline, align, weight }) {
  return (
    <div
      style={{
        textDecoration: underline ? 'underline' : 'inherit',
        textAlign: align,
        fontWeight: weight,
        border: border,
        fontSize: `${size}px`,
        color: color,
        padding: `${padding}px`,
        margin: `${margin}px`,
      }}
    >
      Lorem ipsum dolor sit amet.
    </div>
  );
}
