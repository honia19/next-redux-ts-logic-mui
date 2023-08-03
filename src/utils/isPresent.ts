import { isNil, isEmpty } from 'ramda';

const isPresent = <T>(data: T): boolean => !isNil(data) && !isEmpty(data);

export default isPresent;
