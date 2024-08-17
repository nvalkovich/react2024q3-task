import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { FormWithHookPage } from './pages/FormWithHookPage';
import { UncontrolledFormPage } from './pages/UncontrolledFormPage';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
          <Route path="/with-hook-form" element={<FormWithHookPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
