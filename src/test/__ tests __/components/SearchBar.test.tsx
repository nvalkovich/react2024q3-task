import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SearchBar } from '../../../components/SearchBar';
import { setPage } from '../../../store/slices/paginationSlice';
import { setupStore } from '../../../store';
import { search } from '../../../store/slices/searchSlice';

const store = setupStore();
store.dispatch(search(''));

describe('SearchBar Component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  test('renders the search input and button', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(input).toHaveValue('Test');
  });

  test('dispatches actions on button click with valid input', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(setPage('1'));
    expect(store.dispatch).toHaveBeenCalledWith(search('Test'));
  });

  test('shows validation message on invalid input', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Тест' } }); // Cyrillic characters
    fireEvent.click(button);

    expect(
      screen.getByText('Invalid search request. Please, use Latin characters')
    ).toBeInTheDocument();
  });

  test('does not dispatch actions on clicking button with invalid input', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Тест' } }); // Cyrillic characters
    fireEvent.click(button);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test('dispatches actions on Enter key down with valid input', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(store.dispatch).toHaveBeenCalledWith(setPage('1'));
    expect(store.dispatch).toHaveBeenCalledWith(search('Test'));
  });

  test('dispatches actions on mount when stateValue is present', () => {
    store.dispatch(search('As'));

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(search('As'));
  });
});
