import { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
  render() {
    return (
      <div className='search-container'>
        <input
          type="text"
          className="input"
        />
        <button className="btn">Search</button>
      </div>
    );
  }
}

export default SearchBar;