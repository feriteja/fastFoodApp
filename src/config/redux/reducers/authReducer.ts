import {AnyAction} from 'redux';
import * as ActionState from '../action';

const initialState = {info: null};

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionState.CHECK_AUTH:
      return {info: action.payload};

    case ActionState.LOGINAUTH:
      console.log(action.payload);
      return {info: action.payload};

    case ActionState.LOGOUTAUTH:
      return {info: null};

    default:
      return state;
  }
}
