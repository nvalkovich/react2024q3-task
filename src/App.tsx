import { Component } from 'react';
import './App.css';
import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <ErrorBoundary>
          <SearchSection />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
