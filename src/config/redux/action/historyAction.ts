import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as action from './index';

const getHistoryList = () => {
  return async (dispatch: any) => {
    const invoicePath = firestore()
      .collection('user')
      .doc(auth().currentUser?.uid)
      .collection('invoice');

    const data = await invoicePath.orderBy('time', 'desc').get();

    const dataList = data.docs.map(a => {
      return {...a.data(), id: a.id};
    });

    dispatch({type: action.ALL_PROCESS, payload: dataList});
  };
};

const clearHistory = {
  type: action.CLEAR_PROCESS,
};

export {getHistoryList, clearHistory};
