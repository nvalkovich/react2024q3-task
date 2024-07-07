import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CardsList from './components/CardsList/CardsList';
import './App.css';

class App extends Component {
  constructor(props: object) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchQuery: string) {
    console.log(searchQuery);
  }

  render() {
    return (
      <div className='app-container'>
        <SearchBar onSearch={this.handleSearch}/>
        <CardsList />
      </div>
    );
  }
}

export default App;