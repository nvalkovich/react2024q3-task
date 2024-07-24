import { ChangeEvent, useState } from 'react';
import {ErrorButton } from '../ErrorButton';
import './SearchBar.css';

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
};

const validationRegExp = /^[0-9a-zA-Z\s]+$/;

export function SearchBar({ value, onSearch }: SearchProps) {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    setValidationMessage(null);
  };

  const handleClick = () => {
    if (!currentValue.match(validationRegExp) && currentValue) {
      setValidationMessage(
        'Invalid search request. Please, use only Latin characters'
      );
      return;
    }

    onSearch(currentValue);
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          data-testid="search-input"
          type="text"
          value={currentValue}
          onChange={handleChange}
          className="input"
        />
        {validationMessage && (
          <span className="input-message">{validationMessage}</span>
        )}
      </div>
      <button
        data-testid="search-button"
        onClick={handleClick}
        className="btn btn-search"
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
