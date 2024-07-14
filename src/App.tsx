import './App.css';
import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './components/Details';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchSection />}>
              <Route index element={null} />
              <Route path="details" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
