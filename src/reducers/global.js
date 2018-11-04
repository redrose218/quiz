import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = {
  questions: []
};

const setQuestions = (state, action) => ({
  ...state,
  questions: action.payload
});

const actionHandlers = {
  [Types.SET_QUESTIONS]: setQuestions,
};

export default createReducer(initialState, actionHandlers);
