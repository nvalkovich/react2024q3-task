import { useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar';
import { CardsList } from '../CardsList';
import { CardData } from '../../api/types';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { searchCardsByName } from '../../api/pokemonApi';
import { useAppSelector } from '../../store/hooks';
import './SearchSection.css';

export function SearchSection() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);
  const currentPage = useAppSelector((state) => state.pagination.page);

  const [isFetching, setFetching] = useState(false);
  const [list, setList] = useState<CardData[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  useEffect(() => {
    const search = async () => {
      setFetching(true);

      try {
        const cards = await searchCardsByName(
          searchQuery,
          currentPage,
          itemsPerPage
        );
        setList(cards.data);
        setTotalCount(cards.totalCount);
      } finally {
        setFetching(false);
      }
    };

    search().catch(console.error);
  }, [searchQuery, currentPage, itemsPerPage]);

  return (
    <>
      <div
        className={isShaded ? 'shaded-wrapper' : 'wrapper'}
        onClick={isShaded ? onWrapperClick : undefined}
      >
        <div className="left-section">
          <div className="search-section">
            <h1 className="title">Pokémon cards</h1>
            <SearchBar />
          </div>
          {isFetching ? (
            <div className="cards-loader-container">
              <Loader />
            </div>
          ) : (
            <>
              <div className="cards-section">
                <CardsList list={list} />
              </div>
              <div className="pagination-section">
                <Pagination totalCount={totalCount} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="right-section">
        <Outlet />
      </div>
    </>
  );
}
