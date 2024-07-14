import './App.css';
import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<SearchSection />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
