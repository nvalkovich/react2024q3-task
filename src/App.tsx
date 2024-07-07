import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CardsList from './components/CardsList/CardsList';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <SearchBar />
        <CardsList />
      </div>
    );
  }
}

export default App;