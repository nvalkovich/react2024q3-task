import { CardData } from '../../api/types';
import { Link, useSearchParams } from 'react-router-dom';
import './Card.css';
import { CardSelect } from '../CardSelect/CardSelect';

type CardProps = {
  data: CardData;
};

export function Card({ data }: CardProps) {
  const [searchParams] = useSearchParams();
  searchParams.set('id', data.id);

  return (
    <Link
      data-testid="card"
      to={{ pathname: 'details', search: searchParams.toString() }}
    >
      <div className="card">
        <p className="card__name">{data.name}</p>
        <img
          className="card__image"
          src={data.images?.small}
          alt={data.name}
        ></img>
        <div className="card-data">
          <ul className="card__details-list card-details-list">
            <li className="card-details-list__item">
              Level: {data.level || 'Unknown'}
            </li>
            <li className="card-details-list__item">
              Rarity: {data.rarity || 'Unknown'}
            </li>
          </ul>
          <div className="card-checkbox">
            <CardSelect currentCard={data} />
          </div>
        </div>
      </div>
    </Link>
  );
}
