import { call } from '../api';

/**
 * @name  getQuestions
 * @param {amount} params
 */
export function getQuestions(params) {
  return call(null, 'GET', params);
}
