import '@testing-library/jest-dom';
import CardsList from '../components/CardsList';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const list = [
  { id: 'xy2-96', name: 'Sacred Ash', supertype: 'Trainer' },
  { id: 'pl2-92', name: "Lucian's Assignment", supertype: 'Trainer' },
  {
    id: 'smp-SM108',
    name: "Ash's Pikachu",
    supertype: 'Pokémon',
  },
];

describe('CardList', () => {
  test('an appropriate message is displayed if no cards are present.', () => {
    render(
      <Router>
        <CardsList list={[]} />
      </Router>
    );
    expect(screen.getByText(/No cards were found/i)).toBeInTheDocument();
  });

  test('it renders cards', () => {
    render(
      <Router>
        render(
        <CardsList list={list} />)
      </Router>
    );
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  test('it renders the specified number of cards', async () => {
    render(
      <Router>
        render(
        <CardsList list={list} />)
      </Router>
    );

    const cards = await screen.findAllByText(/level/i);
    expect(cards).toHaveLength(list.length);
  });
});
