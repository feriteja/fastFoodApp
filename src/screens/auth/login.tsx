import {AuthInput, Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {loginAuth} from '@redux/action/authAction';
import {useDispatch} from 'react-redux';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const loginHandler = () => {
    if (email == '' || password == '') {
      setErrMessage('Please fill the blank input');
      return;
    }
    setLoading(true);

    dispatch(loginAuth(email, password)).then(res => {
      if (res == 'success') {
        setLoading(false);
        navigation.reset({index: 0, routes: [{name: 'main'}]});
      } else {
        setErrMessage(res);
        setLoading(false);
      }
    });
  };

  useEffect(() => {}, []);

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
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#EC5156'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>FastFoDel</Text>
        <Text>Deliver to you</Text>
        <Gap height={30} />
        {errMessage.length > 0 && (
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ff2222'}}>
            {errMessage}
          </Text>
        )}
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <AuthInput
            type="email"
            placeholder="email"
            value={email}
            onChangeText={(a: string) => setEmail(a)}
          />
          <AuthInput
            type="password"
            placeholder="password"
            value={password}
            onChangeText={(a: string) => setPassword(a)}
          />
          <Gap height={10} />
          <Pressable
            style={{alignSelf: 'flex-end'}}
            onPress={() => navigation.navigate('forgot')}>
            <Text style={{fontSize: 14, color: '#EC5156', fontWeight: 'bold'}}>
              Forgot password
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => loginHandler()}
            style={styles.loginButton}>
            <Text style={{color: '#fff', fontSize: 18}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default login;

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
