import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { searchCardsByName } from '../api/pokemonApi';
import { SearchSection } from '../components/SearchSection';
import { fakeCardList } from '../test/mocks/fakeData';

jest.mock('../Api');

describe('SearchSection', () => {
  test('the component triggers API call to get cards', async () => {
    (searchCardsByName as jest.Mock).mockResolvedValue(fakeCardList);

    await act(async () =>
      render(
        <Router>
          <SearchSection />
        </Router>
      )
    );

    expect(searchCardsByName).toHaveBeenCalled();
  });
});
