import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register, Forgot, ConfirmMail} from '@screens';

const Stack = createStackNavigator();

const auth = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="confirmMail" component={ConfirmMail} />
      <Stack.Screen name="forgot" component={Forgot} />
    </Stack.Navigator>
  );
};

export default auth;
