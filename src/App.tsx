import { ErrorBoundary } from './components/ErrorBoundary';
import { Router } from './components/Router';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </div>
  );
}
