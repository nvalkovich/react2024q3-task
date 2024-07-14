import { useEffect, useState } from 'react';
import CardsList from './CardsList';
import { CardData } from '../types/interfaces';
import Api from '../api/Api';
import SearchBar from './SearchBar';
import Loader from './Loader';
import useLocalStorageQuery from './hooks/useLocalStorageQueryValue';
import Pagination from './Pagination';

const api = new Api();

export default function SearchSection() {
  const [lsQueryValue, setLsQueryValue] = useLocalStorageQuery();
  const [searchQuery, setSearchQuery] = useState<string>(lsQueryValue);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [list, setList] = useState<CardData[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  useEffect(() => {
    const search = async () => {
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
      <div className="cards-section">
        {isFetching ? <Loader /> : <CardsList list={list} />}
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
  );
}
