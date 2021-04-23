import * as action from './index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const checkAuth = () => {
  return (dispatch: any) => {
    const authInfo = auth().currentUser;

    dispatch({type: action.CHECK_AUTH, payload: authInfo});
  };
};

const loginAuth = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const info = await auth().signInWithEmailAndPassword(email, password);

      if (!info.user.emailVerified) {
        auth().signOut();
        return 'Please verivy your email';
      }

      dispatch({
        type: action.LOGINAUTH,
        payload: {email: info.user.email, uid: info.user.uid},
      });

      return 'success';
    } catch (error) {
      return 'invalid email/password';
    }
  };
};

const regisAuth = ({
  email,
  password,
  name,
  phone,
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  return async (dispatch: any) => {
    const date = new Date().getTime() / 1000;

    try {
      const authInfo = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      authInfo.user.sendEmailVerification();

      await firestore()
        .collection('user')
        .doc(authInfo.user.uid)
        .set({name, phone, createdAt: date});

      await auth().signOut();

      return 'success';
    } catch (error) {}
  };
};

const logOut = () => {
  return async (dispatch: any) => {
    dispatch({type: action.CLEAR_ITEM});
    dispatch({type: action.CLEAR_CART});
    dispatch({type: action.CLEAR_PROCESS});
    await auth().signOut();
    dispatch({type: action.LOGOUTAUTH});
  };
};

export {checkAuth, loginAuth, regisAuth, logOut};
