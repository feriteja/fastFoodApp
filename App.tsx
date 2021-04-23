import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {notifConfig, notifCreateChanel} from './src/config/notify/notify';
import {Provider, useDispatch} from 'react-redux';
import Store from '@redux/store';
import Router from '@router';

const App = () => {
  notifConfig;
  notifCreateChanel();

  return (
    <Provider store={Store}>
      <View style={{flex: 1}}>
        <Router />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
