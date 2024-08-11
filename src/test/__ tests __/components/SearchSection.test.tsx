import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchSection } from '../../../components/SearchSection';
import { renderWithProviders } from '../../test-utils';
import * as pokemonCardsApi from '../../../services/pokemonCardsApi';

describe('SearchSection', () => {
  const spyAPIcall = jest.spyOn(pokemonCardsApi, 'useSearchCardsQuery');
  test('the component triggers API call to get cards', async () => {
    await act(async () =>
      renderWithProviders(
        <Router>
          <SearchSection />
        </Router>
      )
    );

    expect(spyAPIcall).toHaveBeenCalled();
  });
});
