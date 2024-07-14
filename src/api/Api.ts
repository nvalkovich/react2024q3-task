import { CardsResponse, QueryParams } from '../types/interfaces';

class Api {
  private baseURL: string;

  private path: { [key: string]: string };

  constructor() {
    this.baseURL = 'https://api.pokemontcg.io/v2';
    this.path = {
      cards: '/cards',
    };
  }

  public getQueryString(queryParams: QueryParams[]): string {
    let string = '';

    if (queryParams.length) {
      string = `?${queryParams
        .map((x): string => `${x.key}=${x.value}`)
        .join('&')}`;
    }

    return string;
  }

  public async searchCardsByName(
    name: string,
    page: number = 1,
    pageSize: number
  ): Promise<CardsResponse> {
    const query = this.getQueryString([
      { key: 'pageSize', value: `${pageSize}` },
      { key: 'page', value: `${page}` },
      { key: 'q', value: `name:${name.trim().replaceAll(' ', '*')}*` },
    ]);
    const url = `${this.baseURL}${this.path.cards}${query}`;

    const response = await fetch(url);

    return await response.json();
  }
}

export default Api;
