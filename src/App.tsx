import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { FormWithHook } from './pages/FormWithHook';
import { UncontrolledForm } from './pages/UnkontrolledForm';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/with-hook-form" element={<FormWithHook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
