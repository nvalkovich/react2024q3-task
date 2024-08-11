import { http, HttpResponse, delay } from 'msw';
import { mockCardList } from '../mockData';

export const handlers = [
  http.get('https://api.pokemontcg.io/v2', async () => {
    await delay(100);
    return HttpResponse.json(mockCardList);
  }),
];
