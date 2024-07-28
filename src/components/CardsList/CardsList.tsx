import { useAppSelector } from '../../store/hooks';
import { Card } from '../Card';
import './CardsList.css';

export function CardsList() {
  const list = useAppSelector((state) => state.cards.cardsList);

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
