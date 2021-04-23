import * as action from './index';

import {item} from '@constants/item';

const countItemCart = ({
  id,
  data,
  count,
}: {
  id: string;
  data: item;
  count: number;
}) => {
  return (dispatch: any) => {
    dispatch({type: action.COUNT_CART, payload: data, count: count, id});
  };
};

const countUpdate = ({
  id,
  data,
  count,
}: {
  id: string;
  data: item;
  count: number;
}) => {
  return (dispatch: any) => {
    dispatch({type: action.UPDATE_COUNT, payload: data, count: count, id});
  };
};

const clearCart = {
  type: action.CLEAR_CART,
};

export {countItemCart, countUpdate, clearCart};
