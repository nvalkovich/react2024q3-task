import { CardData } from '../../types/interfaces';
import Card from '../Card/Card';
import './CardsList.css';

type CardListProps = {
  list: CardData[];
};

export function CardsList({ list }: CardListProps) {
  return list?.length ? (
    <div className="card-list" data-testid="card-list">
      {list.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
