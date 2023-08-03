import { API_HOST, API_V2 } from '@/api/apiRoutes';
import { httpClient, defaultClient, httpClientV2 } from '@/api/index';

describe('httpClient', () => {
  it('should have the correct base URL', () => {
    expect(httpClient.defaults.baseURL).toBe(API_HOST);
  });

  it('should use the correct params serializer', () => {
    const params = { foo: 'bar', baz: ['qux', 'quux'] };
    const serializedParams = 'foo=bar&baz%5B%5D=qux&baz%5B%5D=quux';

    const serialized = httpClient.defaults.paramsSerializer?.(params);
    expect(serialized).toBe(serializedParams);
  });
});

describe('defaultClient', () => {
  it('should use the correct params serializer', () => {
    const params = { foo: 'bar', baz: ['qux', 'quux'] };
    const serializedParams = 'foo=bar&baz%5B%5D=qux&baz%5B%5D=quux';

    const serialized = defaultClient.defaults.paramsSerializer?.(params);
    expect(serialized).toBe(serializedParams);
  });
});

describe('httpClientV2', () => {
  it('should have the correct base URL', () => {
    expect(httpClientV2.defaults.baseURL).toBe(API_V2);
  });

  it('should use the correct params serializer', () => {
    const params = { foo: 'bar', baz: ['qux', 'quux'] };
    const serializedParams = 'foo=bar&baz%5B%5D=qux&baz%5B%5D=quux';

    const serialized = httpClientV2.defaults.paramsSerializer?.(params);
    expect(serialized).toBe(serializedParams);
  });
});
