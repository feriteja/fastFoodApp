import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './main';
import Auth from './auth';
import {Search, ConfirmCheckout, DetailOrder} from '@screens';
import successProcessed from 'screens/main/stack/successProcessed';
import orderHistoryDetail from 'screens/main/history/orderHistoryDetail';

const Stack = createStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="auth" component={Auth} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="confirm" component={ConfirmCheckout} />
        <Stack.Screen name="detailOrder" component={DetailOrder} />
        <Stack.Screen name="successProcessed" component={successProcessed} />
        <Stack.Screen name="historyDetail" component={orderHistoryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
