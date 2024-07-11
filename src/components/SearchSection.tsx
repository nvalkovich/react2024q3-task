import { Component } from 'react';
import CardsList from './CardsList';
import { CardData } from '../types/interfaces';
import Api from '../api/Api';
import SearchBar from './SearchBar';
import Loader from './Loader';

type SearchSectionState = {
  searchQuery: string;
  isFetching: boolean;
  list: CardData[];
};

const searchQueryKey = 'searchQuery';

class SearchSection extends Component<object, SearchSectionState> {
  private api: Api;

  constructor(props: object) {
    super(props);
    const searchQuery = localStorage.getItem(searchQueryKey);
    this.state = {
      searchQuery: searchQuery ?? '',
      isFetching: false,
      list: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.api = new Api();
  }

  async componentDidMount() {
    await this.handleSearch(this.state.searchQuery);
  }

  async handleSearch(searchQuery: string) {
    localStorage.setItem(searchQueryKey, searchQuery);

    this.setState({ isFetching: true });

    try {
      const data = await this.api.searchCardsByName(searchQuery);
      this.setState({ list: data, searchQuery });
    } finally {
      this.setState({ isFetching: false });
    }
  }

  render() {
    return (
      <>
        <div className="search-section">
          <h1 className="title">Pokémon cards</h1>
          <SearchBar
            value={this.state.searchQuery}
            onSearch={this.handleSearch}
          />
        </div>
        <div className="cards-section">
          {this.state.isFetching ? (
            <Loader />
          ) : (
            <CardsList list={this.state.list} />
          )}
        </div>
      </>
    );
  }
}

export default SearchSection;
