import {AuthInput, Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {regisAuth} from '@redux/action/authAction';
import {useDispatch} from 'react-redux';

const register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const regisHandler = () => {
    if (
      email == '' ||
      phone == '' ||
      name == '' ||
      password == '' ||
      confPassword == ''
    ) {
      setErrMessage('Please fill the blank input');
      return;
    }
    if (password !== confPassword) {
      setErrMessage('Password not match');
      return;
    }
    setLoading(true);
    dispatch(
      regisAuth({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
        phone: phone.trim(),
      }),
    ).then(a => {
      setLoading(false);
      a == 'success' ? navigation.replace('confirmMail') : setErrMessage(a);
    });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#00000022',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#ca2222" />
        </View>
      )}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Sign Up</Text>

        {errMessage?.length > 0 && (
          <>
            <Gap height={30} />
            <Text style={{color: '#ca0000', fontSize: 16}}>{errMessage}</Text>
          </>
        )}
        <Gap height={20} />
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <AuthInput
            type="default"
            value={name}
            placeholder="name"
            onChangeText={(a: string) => setName(a)}
          />
          <AuthInput
            type="phone"
            value={phone}
            placeholder="phone"
            onChangeText={(a: string) => setPhone(a)}
          />
          <AuthInput
            type="email"
            value={email}
            placeholder="email"
            onChangeText={(a: string) => setEmail(a)}
          />
          <AuthInput
            type="password"
            value={password}
            placeholder="password"
            onChangeText={(a: string) => setPassword(a)}
          />
          <AuthInput
            type="password"
            value={confPassword}
            placeholder="confirm password"
            onChangeText={(a: string) => setConfPassword(a)}
          />
          <Gap height={10} />

          <TouchableOpacity
            onPress={() => regisHandler()}
            style={styles.loginButton}>
            <Text style={{color: '#fff', fontSize: 18}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#EC5156',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    left: 20,
    right: 20,
  },
});
