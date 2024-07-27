import { ChangeEvent, useEffect, useState } from 'react';
import { ErrorButton } from '../ErrorButton';
import { useAppSelector } from '../../store/hooks';
import { search } from '../../store/searchSlice';
import { useAppDispatch } from '../../store/hooks';
import { setPage } from '../../store/paginationSlice';
import './SearchBar.css';

const validationRegExp = /^[0-9a-zA-Z\s]+$/;

export function SearchBar() {
  const dispatch = useAppDispatch();
  const searchNewQuery = (query: string) => dispatch(search(query));
  const changePage = (query: string) => dispatch(setPage(query));

  const onSearch = (query: string) => {
    searchNewQuery(query);
    changePage('1');
  };

  const searchQuery = useAppSelector((store) => store.search.searchQuery);

  const [stateValue, setStateValue] = useState(searchQuery);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateValue(event.target.value);
    setValidationMessage(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(stateValue);
    }
  };

  const handleClick = () => {
    if (!stateValue.match(validationRegExp) && stateValue) {
      setValidationMessage(
        'Invalid search request. Please, use Latin characters'
      );
      return;
    }

    onSearch(stateValue);
  };

  useEffect(() => {
    if (stateValue && stateValue.length) {
      onSearch(stateValue);
    }
  }, []);

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          data-testid="search-input"
          type="text"
          value={stateValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="input"
        />
        {validationMessage && (
          <span className="input-message">{validationMessage}</span>
        )}
      </div>
      <button data-testid="search-button" onClick={handleClick} className="btn">
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
