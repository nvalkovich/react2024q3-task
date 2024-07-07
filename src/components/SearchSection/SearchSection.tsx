import { Component } from 'react';
import CardsList from '../CardsList';
import { CardData } from '../../types/interfaces';
import Api from '../../api/Api';
import SearchBar from '../SearchBar';

type SearchSectionState = {
  searchQuery: string;
  list: CardData[];
}

const searchQueryKey = 'searchQuery';

class SearchSection extends Component<object, SearchSectionState> {
  private api: Api;

  constructor(props: object) {
    super(props);
    const searchQuery = localStorage.getItem(searchQueryKey);
    this.state = {
      searchQuery: searchQuery ?? '',
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
    const data = await this.api.searchCardsByName(searchQuery);
    this.setState({ list: data, searchQuery: searchQuery});
  }

  render() {
    return (
      <>
        <SearchBar value={this.state.searchQuery} onSearch={this.handleSearch}/>
        <CardsList list={this.state.list}/>
      </>
    );
  }
}

export default SearchSection;