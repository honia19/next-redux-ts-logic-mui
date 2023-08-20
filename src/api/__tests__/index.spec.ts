import { API_HOST } from '@/api/apiRoutes';
import { httpClient } from '@/api/index';

describe('httpClient', () => {
  it('should have the correct base URL', () => {
    expect(httpClient.defaults.baseURL).toBe(API_HOST);
  });

  it('should use the correct params serializer', () => {
    const params: Record<string, any> = { foo: 'bar', baz: ['qux', 'quux'] };
    const serializedParams = 'foo=bar&baz%5B%5D=qux&baz%5B%5D=quux';

    //@ts-expect-error it is callable method
    const serialized = httpClient.defaults.paramsSerializer?.(params);
    expect(serialized).toBe(serializedParams);
  });
});
