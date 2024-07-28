import { ChangeEvent, useEffect, useState } from 'react';
import { ErrorButton } from '../ErrorButton';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { search } from '../../store/slices/searchSlice';
import { setPage } from '../../store/slices/paginationSlice';
import './SearchBar.css';

const validationRegExp = /^[0-9a-zA-Z\s]+$/;

export function SearchBar() {
  const dispatch = useAppDispatch();

  const onSearch = (query: string) => {
    dispatch(setPage('1'));
    dispatch(search(query));
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
      dispatch(search(stateValue));
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
