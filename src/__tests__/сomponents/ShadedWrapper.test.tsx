import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCardList } from '@/src/__mocks__/MockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import ShadedWrapper from '@/src/components/ShadedWrapper';
import SearchableCardList from '@/src/components/SearchableCardList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const data = mockCardList[0];

describe('Details loader', () => {
  const mockStore = configureStore();
  const store = mockStore({
    cards: {
      selectedCards: [],
    },
  });

  beforeEach(() => {
    mockRouter.push({ query: { details: `${data.id}` } });
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ShadedWrapper>
            <SearchableCardList list={[]} totalCount={0} />
          </ShadedWrapper>
        </RouterContext.Provider>
      </Provider>
    );
  });

  test('clicking the shaded wrapper remove details from search params', async () => {
    expect(mockRouter.query.details).toBe(data.id);
    await userEvent.click(screen.getByTestId('shaded-wrapper'));
    expect(mockRouter.query.details).toBe(undefined);
  });
});
