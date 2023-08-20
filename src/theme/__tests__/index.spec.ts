import { theme } from '../index';

it('should render theme', () => {
  expect(theme).toMatchSnapshot();
});
