import { useEffect, useState } from 'react';
import CardsList from './CardsList';
import { CardData } from '../types/interfaces';
import SearchBar from './SearchBar';
import Loader from './Loader';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import './styles/SearchSection.css';
import { searchCardsByName } from '../Api';

const lsQueryKey = 'searchQuery';
const lsPageSizeKey = 'cardsPerPage';

export default function SearchSection() {
  const [lsQueryValue, setLsQueryValue] = useLocalStorage(lsQueryKey);
  const [lsPageSizeValue, setPageSizeValue] = useLocalStorage(lsPageSizeKey);

  const [searchQuery, setSearchQuery] = useState<string>(lsQueryValue);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [list, setList] = useState<CardData[] | []>([]);
  const [pageSize, setPageSize] = useState<number>(+lsPageSizeValue || 20);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParms] = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');

  const navigate = useNavigate();
  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParms({ page: '1' });
  };

  const onPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate({ search: searchParams.toString() });
  };

  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageSizeValue(newPageSize.toString());
    setSearchParms({ page: '1' });
  };

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  useEffect(() => {
    const search = async () => {
      setLsQueryValue(searchQuery);
      setFetching(true);

      try {
        const cards = await searchCardsByName(searchQuery, page, pageSize);
        setList(cards.data);
        setTotalCount(cards.totalCount);
        setSearchQuery(searchQuery);
      } finally {
        setFetching(false);
      }
    };
    search().catch(console.error);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page, pageSize]);

  const leftSectionContent = (
    <div className="left-section">
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchBar value={lsQueryValue} onSearch={handleSearch} />
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
            <Pagination
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {isShaded ? (
        <div className="shaded-wrapper" onClick={onWrapperClick}>
          {leftSectionContent}
        </div>
      ) : (
        leftSectionContent
      )}
      <div className="right-section">
        <Outlet />
      </div>
    </>
  );
}
