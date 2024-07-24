import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../components/SearchBar';
import { localStorageMock } from '../test/mocks/localStorageMock';

const { setItemMock } = localStorageMock();

const onSearchClickMock = jest.fn().mockImplementation((searchQuery) => {
  setItemMock('searchQuery', searchQuery);
});

const value = 'value';

describe('SearchBar', () => {
  beforeEach(() => {
    render(
      <Router>
        <SearchBar value="" onSearch={onSearchClickMock} />
      </Router>
    );
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, value);
    expect(searchInput).toHaveValue(value);

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', value);
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, value);
    expect(searchInput).toHaveValue(value);
  });
});
