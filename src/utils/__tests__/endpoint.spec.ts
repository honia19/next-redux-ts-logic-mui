import endpoint from '../endpoint';

it('returns endpoint object', () => {
  expect(endpoint('FEATURE NAME', 'GET', '/route')).toEqual({
    endpoint: 'FEATURE NAME GET /route',
    url: '/route',
  });
});
