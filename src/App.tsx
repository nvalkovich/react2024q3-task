import { ErrorBoundary } from './components/ErrorBoundary';
import { Router } from './components/Router';
import { ThemeProvider } from './services/theme/ThemeProvider';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
}
