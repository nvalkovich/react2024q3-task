import './App.css';
import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>
    </div>
  );
}
