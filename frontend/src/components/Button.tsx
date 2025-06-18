import './Button.css';

interface ButtonProps {
  texto: string;
  tipo?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

function Button({ texto, tipo = 'button', loading = false }: ButtonProps) {
  return (
    <button type={tipo} className="button" disabled={loading}>
      {loading ? 'Processando...' : texto}
    </button>
  );
}

export default Button;
