import { CardData } from '../../api/types';
import Card from '../Card/Card';
import './CardsList.css';

type CardListProps = {
  list: CardData[];
};

export function CardsList({ list }: CardListProps) {
  if (!list.length) {
    return <p>No cards were found for this request</p>;
  }

  return (
    <div className="card-list" data-testid="card-list">
      {list.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  );
}
