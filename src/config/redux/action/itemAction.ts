import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as action from './index';

const getItemList = () => {
  return async (dispatch: any) => {
    const data1 = await firestore()
      .collection('food')
      .orderBy('type', 'asc')
      .get();

    const dataList = data1.docs.map(a => {
      return {...a.data(), id: a.id};
    });

    dispatch({type: action.GETITEM, payload: dataList});
  };
};

const getSpecificList = (type: string) => {
  return (dispatch: any) => {
    dispatch({type: action.GETSPECLIST, payload: type});
  };
};

const processItems = (dataCart: any) => {
  return async (dispatch: any) => {
    const date = new Date().getTime() / 1000;
    const time = Math.round(date);

    try {
      const invoicePath = firestore()
        .collection('user')
        .doc(auth().currentUser?.uid)
        .collection('invoice');
      const keepHistory = await invoicePath.add({
        time,
        status: 'process',
        order: dataCart,
      });
      const theHistory = await invoicePath.doc(keepHistory.id).get();

      dispatch({type: action.ON_PROCESS, payload: theHistory.data()});
      dispatch({type: action.CLEAR_CART});
      return 'success';
    } catch (error) {}
  };
};

const clearItemList = {
  type: action.CLEAR_ITEM,
};

export {getItemList, clearItemList, getSpecificList, processItems};
