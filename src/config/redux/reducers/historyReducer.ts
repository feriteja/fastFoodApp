import {AnyAction} from 'redux';
import * as ActionState from '../action';

const initialState: [] = [];

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionState.ALL_PROCESS:
      return [...action.payload];

    case ActionState.ON_PROCESS:
      return [...state, action.payload];

    case ActionState.CLEAR_PROCESS:
      return initialState;

    default:
      return state;
  }
}
