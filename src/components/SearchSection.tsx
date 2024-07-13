import { useEffect, useState } from 'react';
import CardsList from './CardsList';
import { CardData } from '../types/interfaces';
import Api from '../api/Api';
import SearchBar from './SearchBar';
import Loader from './Loader';

const searchQueryKey = 'searchQuery';
const api = new Api();

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(searchQueryKey) || ''
  );
  const [isFetching, setFetching] = useState<boolean>(false);
  const [list, setList] = useState<CardData[] | []>([]);

  const handleSearch = async (searchQuery: string) => {
    localStorage.setItem(searchQueryKey, searchQuery);

    setFetching(true);

    try {
      const data = await api.searchCardsByName(searchQuery);
      setSearchQuery(searchQuery);
      setList(data);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchBar value={searchQuery} onSearch={handleSearch} />
      </div>
      <div className="cards-section">
        {isFetching ? <Loader /> : <CardsList list={list} />}
      </div>
    </>
  );
}
