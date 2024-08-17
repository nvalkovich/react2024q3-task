import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockCardList } from '@/src/__mocks__/MockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FlyoutElement } from '@/src/components/FlyoutElement';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockStore = configureStore();
const store = mockStore({
  cards: {
    selectedCards: mockCardList,
  },
});

describe('Flyout element render', () => {
  global.URL.createObjectURL = jest.fn();
  test('the flyout element renders correctly', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <FlyoutElement />
        </RouterContext.Provider>
      </Provider>
    );

    expect(
      screen.getByText(`${mockCardList.length} items are selected`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('unselect_btn')).toBeInTheDocument();
    expect(screen.getByTestId('download_csv_btn')).toBeInTheDocument();
  });
});
