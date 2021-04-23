import {AnyAction} from 'redux';
import * as ActionState from '../action';

const initialState: [] = [];

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionState.GETITEM:
      return {allData: action.payload, data: action.payload};

    case ActionState.GETSPECLIST:
      if (action.payload == 'all') {
        return {...state, data: state.allData};
      }

      const filtering = state?.allData?.filter(a => a.type == action.payload);
      return {...state, data: filtering};

    case ActionState.CLEAR_ITEM:
      return {allData: [], data: []};

    case ActionState.UPDATE_COUNT:
      const findIdxAllData = state.allData.findIndex(a => a.id === action.id);
      const findIdxData = state.data.findIndex(a => a.id === action.id);

      const newARr = {...state};

      newARr.allData.splice(findIdxAllData, 1, {
        ...action.payload,
        count: action.count,
      });
      newARr.data.splice(findIdxData, 1, {
        ...action.payload,
        count: action.count,
      });

      return newARr;

    default:
      return state;
  }
}
