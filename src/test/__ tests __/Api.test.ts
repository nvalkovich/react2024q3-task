import { getQueryString } from '../../api/pokemonApi';
import { mockQueryParams } from '../__mocks__/mockData';

describe('Api', () => {
  test('get query string', async () => {
    expect(getQueryString(mockQueryParams)).toBe('?pageSize=4&page=1&q=pok');
  });
});
