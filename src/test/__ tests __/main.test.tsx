import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../../store';
import App from '../../App';

test('it renders', () => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );

  expect(screen.getByText('Pokémon cards')).toBeInTheDocument();
});
