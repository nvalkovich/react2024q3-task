import { CardData } from '../types/interfaces';
import './styles/Card.css';

type CardProps = {
  data: CardData;
};

export default function Card({ data }: CardProps) {
  return (
    <div className="card">
      <p>{data.name}</p>
      <img className="card__name" src={data.images.small} alt={data.name}></img>
    </div>
  );
}
