import { ChangeEvent, Component } from 'react';
import './SearchBar.css';

type SearchProps = {
  value: string,
  onSearch: (query: string) => void;
};

type SearchState = {
  value: string,
};

class SearchBar extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { value: props.value };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className='search-container'>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className="input"
        />
        <button onClick={this.handleClick} className="btn">Search</button>
      </div>
    );
  }
}

export default SearchBar;