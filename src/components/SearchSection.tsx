import { useEffect, useState } from 'react';
import CardsList from './CardsList';
import { CardData } from '../types/interfaces';
import Api from '../api/Api';
import SearchBar from './SearchBar';
import Loader from './Loader';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

const lsQueryKey = 'searchQuery';
const lsPageSizeKey = 'cardsPerPage';

const api = new Api();

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParms({ page: '1' });
  };

  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate({ search: searchParams.toString() });
  };

  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageSizeValue(newPageSize.toString());
    setSearchParms({ page: '1' });
  };

  useEffect(() => {
    const search = async () => {
      console.log(lsQueryValue);
      setLsQueryValue(searchQuery);
      setFetching(true);

      try {
        const cards = await api.searchCardsByName(searchQuery, page, pageSize);
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

  return (
    <>
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchBar value={searchQuery} onSearch={handleSearch} />
      </div>
      {isFetching ? (
        <div className="loader-container">
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
    </>
  );
}
