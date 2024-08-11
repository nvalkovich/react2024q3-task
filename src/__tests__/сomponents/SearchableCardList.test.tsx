import 'whatwg-fetch';
import { HomePageProps, getServerSideProps } from '@/src/pages';
import '@testing-library/jest-dom';
import { ParsedUrlQuery } from 'querystring';
import SearchableCardList from '@/src/components/SearchableCardList';
import { GetServerSidePropsContext } from 'next';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('SearchableCardList', () => {
  const page = '1';
  const pageSize = '4';
  const mockStore = configureStore();
  const store = mockStore({
    cards: {
      selectedCards: [],
    },
  });

  it('renders correctly with gssp', async () => {
    const context = {
      query: { page, pageSize } as ParsedUrlQuery,
    };

    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext
    )) as { props: HomePageProps };

    const { cardsData } = props;

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <SearchableCardList
            list={cardsData?.data}
            totalCount={cardsData?.totalCount}
          />
        </RouterContext.Provider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('search-section')).toBeInTheDocument();
      expect(screen.getByTestId('cards-section')).toBeInTheDocument();
      expect(screen.getAllByTestId('card')).toHaveLength(+pageSize);
      expect(screen.getByTestId('pagination-section')).toBeInTheDocument();
    });
  });
});
