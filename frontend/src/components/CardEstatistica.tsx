import './CardEstatistica.css';

interface CardEstatisticaProps {
  titulo: string;
  valor: number;
}

function CardEstatistica({ titulo, valor }: CardEstatisticaProps) {
  return (
    <div className="card-estatistica">
      <div className="card-titulo">{titulo}</div>
      <div className="card-valor">{valor}</div>
    </div>
  );
}

export default CardEstatistica;
