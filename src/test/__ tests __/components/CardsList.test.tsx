import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { CardsList } from '../../../components/CardsList';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockCardList } from '../../__mocks__/mockData';
import { renderWithProviders } from '../../test-utils';
import { setupStore } from '../../../store';
import { setCards } from '../../../store/slices/cardsSlice';

const store = setupStore();
store.dispatch(setCards(mockCardList));

describe('CardList without cards', () => {
  test('an appropriate message is displayed if no cards are present.', () => {
    renderWithProviders(
      <Router>
        <CardsList />
      </Router>
    );

    expect(screen.getByText(/No cards were found/i)).toBeInTheDocument();
  });
});

describe('CardList with cards', () => {
  beforeEach(() => {
    renderWithProviders(
      <Router>
        <CardsList />
      </Router>,
      { store }
    );
  });

  test('it renders cards', () => {
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  test('it renders the specified number of cards', async () => {
    const cards = await screen.findAllByText(/level/i);
    expect(cards).toHaveLength(mockCardList.length);
  });
});
