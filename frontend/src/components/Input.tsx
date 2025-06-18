import './Input.css';

interface InputProps {
  placeholder: string;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipo?: string;
}

function Input({ placeholder, valor, onChange, tipo = 'text' }: InputProps) {
  return (
    <input
      type={tipo}
      placeholder={placeholder}
      value={valor}
      onChange={onChange}
      className="input-field"
      required
    />
  );
}

export default Input;
