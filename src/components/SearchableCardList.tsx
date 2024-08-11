import { CardData } from '@/src/types/interfaces';
import SearchInput from './SearchInput';
import CardList from './CardList';
import Pagination from './Pagination';
import { FlyoutElement } from './FlyoutElement';
import styles from '../styles/SearchableCardList.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../services/theme/ThemeProvider';

type SearchableCardListProps = {
  list: CardData[];
  totalCount: number;
};

export default function SearchableCardList({
  list,
  totalCount,
}: SearchableCardListProps) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className="main-section" data-testid="main-section">
        <div
          className={styles.search}
          data-testid="search-section"
          data-theme={theme.themeValue}
        >
          <h1 className="title">Pokémon cards</h1>
          <SearchInput />
        </div>
        <div
          className={styles.cards}
          data-testid="cards-section"
          data-theme={theme.themeValue}
        >
          <CardList list={list} />
        </div>
        <div
          className={styles.pagination}
          data-testid="pagination-section"
          data-theme={theme.themeValue}
        >
          <Pagination totalCount={totalCount} />
        </div>
        <div className={styles.flyout} data-theme={theme.themeValue}>
          <FlyoutElement />
        </div>
      </div>
    </>
  );
}
