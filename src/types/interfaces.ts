export interface QueryParams {
  key: string;
  value: string | number;
}

export interface CardData {
  id: string;
  name: string;
  flavorText?: string;
  images: {
    small: string;
    large: string;
  };
}

export interface CardsResponse {
  data: CardData[];
  page: number;
  pageSize: number;
  totalCount: number;
}
