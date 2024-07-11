import { Component } from 'react';
import Card from './Card';
import './styles/CardsList.css';
import { CardData } from '../types/interfaces';

type CardListProps = {
  list: CardData[];
};

class CardList extends Component<CardListProps> {
  render() {
    return this.props.list.length ? (
      <div className="card-list">
        {this.props.list.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    ) : (
      <p>No cards were found for this request</p>
    );
  }
}

export default CardList;