import { ChangeEvent, Component } from 'react';
import './styles/SearchBar.css';
import ErrorButton from './ErrorButton';

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
};

type SearchState = {
  value: string;
  validationMessage: string | null;
};

class SearchBar extends Component<SearchProps, SearchState> {
  private validationRegExp: RegExp;

  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: props.value,
      validationMessage: null,
    };
    this.validationRegExp = /^[0-9a-zA-Z\s]+$/;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value, validationMessage: null });
  }

  handleClick() {
    if (!this.state.value.match(this.validationRegExp) && this.state.value) {
      this.setState({
        validationMessage:
          'Invalid search request. Please, use Latin characters',
      });
      return;
    }

    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            className="input"
          />
          {this.state.validationMessage && (
            <span className="input-message">
              {this.state.validationMessage}
            </span>
          )}
        </div>
        <button onClick={this.handleClick} className="btn btn-search">
          Search
        </button>
        <ErrorButton />
      </div>
    );
  }
}

export default SearchBar;
