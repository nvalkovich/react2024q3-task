import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { wrapper } from '@/src/store';
import {
  searchCards,
  getRunningQueriesThunk,
  getCardById,
} from '../services/api/pokemonCardsApi';
import Details from '../components/Details';
import ErrorBoundary from '../components/ErrorBoundary';
import ShadedWrapper from '../components/ShadedWrapper';
import SearchableCardList from '../components/SearchableCardList';
import { CardResponse, CardListResponse } from '../services/api/responseTypes';
import { ThemeProvider } from '../services/theme/ThemeProvider';

const defaultSearchQuery = {
  q: '*',
  page: '1',
  pageSize: '12',
};

export type HomePageProps = {
  cardsData: CardListResponse;
  detailedCardData: CardResponse | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps<HomePageProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const searchQuery = {
      ...defaultSearchQuery,
      ...context.query,
    };

    const { details } = context.query;

    let cards = null;
    let cardDetails = null;

    if (
      typeof searchQuery.page === 'string' &&
      typeof searchQuery.pageSize === 'string'
    ) {
      cards = await store.dispatch(searchCards.initiate(searchQuery));
    }

    if (typeof details === 'string') {
      cardDetails = await store.dispatch(getCardById.initiate(details));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cardsData: cards?.data as CardListResponse,
        detailedCardData: details ? (cardDetails?.data as CardResponse) : null,
      },
    };
  });

export default function Home({ cardsData, detailedCardData }: HomePageProps) {
  const isShaded = Boolean(detailedCardData);
  const list = cardsData?.data || [];
  const totalCount = cardsData?.totalCount || 0;

  return (
    <>
      <Head>
        <title>Pokémon cards</title>
        <meta name="title" content="Pokemon cards" />
        <link rel="icon" type="image/svg+xml" href="./svg/pokeball.svg" />
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <div className="app-container">
            {isShaded ? (
              <ShadedWrapper>
                <SearchableCardList list={list} totalCount={totalCount} />
              </ShadedWrapper>
            ) : (
              <SearchableCardList list={list} totalCount={totalCount} />
            )}
            {detailedCardData && <Details card={detailedCardData.data} />}
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
