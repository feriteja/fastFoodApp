import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {notifCreateChanel, showNotif} from '../../config/notify/notify';

export const listenOrder = () => {
  const userID = auth().currentUser?.uid;

  if (userID == undefined) return;

  const listening = firestore()
    .collection('user')
    .doc(userID)
    .collection('invoice')
    .onSnapshot(querySnap => {
      querySnap.docChanges().forEach((change, idx) => {
        const changelID = change.doc.id;
        notifCreateChanel(changelID);
        if (change.type === 'modified') {
          change.doc.data().status === 'success'
            ? showNotif({
                changelID: changelID,
                message: 'Hello sir',
                submessage: 'Your order has been arrived :)',
                numberID: idx,
              })
            : change.doc.data().status === 'deliver'
            ? showNotif({
                changelID: changelID,
                message: 'Hello sir',
                submessage: 'Your order will be arrived in minutes ',
              })
            : null;
        }
      });
    });

  return listening;
};
