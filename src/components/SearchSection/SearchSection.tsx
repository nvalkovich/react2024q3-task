import { useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import { CardsList } from '../CardsList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useSearchCardsQuery } from '../../services/pokemonCardsApi';
import { setMainLoading } from '../../store/slices/loadingSlice';
import { setTotalCount } from '../../store/slices/paginationSlice';
import { setCards } from '../../store/slices/cardsSlice';
import './SearchSection.css';
import { FlyoutElement } from '../FlyoutElement/FlyoutElement';

export function SearchSection() {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);
  const currentPage = useAppSelector((state) => state.pagination.page);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  const navigate = useNavigate();

  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  const { data: response, isFetching } = useSearchCardsQuery({
    pageSize: itemsPerPage,
    page: currentPage,
    name: searchQuery,
  });

  useEffect(() => {
    dispatch(setCards(response?.data || []));
    dispatch(setMainLoading(isFetching));
    dispatch(setTotalCount(Number(response?.totalCount)));
  }, [response, isFetching]);

  const isLoading = useAppSelector((state) => state.loading.mainLoading);

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
          {isLoading ? (
            <div className="cards-loader-container">
              <Loader />
            </div>
          ) : (
            <>
              <div className="cards-section">
                <CardsList />
              </div>
              <div className="pagination-section">
                <Pagination />
              </div>
              <div className="flayout-section">
                <FlyoutElement />
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
