import {AnyAction} from 'redux';
import * as ActionState from '../action';

const initialState: [] = [];

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionState.COUNT_CART:
      const findIdx = state.findIndex(a => a.id === action.id);
      if (findIdx == -1) {
        return [...state, {...action.payload, count: action.count}];
      }
      if (action.count == 0) {
        const filterArr = state.filter(a => a.id != action.id);
        return filterArr;
      }

      const newArray = [...state];

      newArray.splice(findIdx, 1, {...action.payload, count: action.count});
      return newArray;

    case ActionState.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}
