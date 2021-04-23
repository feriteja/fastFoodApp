import {combineReducers} from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  cart: cartReducer,
  history: historyReducer,
});

export default rootReducer;
