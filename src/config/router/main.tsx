import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Faq, Home, OrderHistory, Settings, Support} from '@screens';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {logOut} from '@redux/action/authAction';

const {width, height} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

const CusDrawerItem = ({title = '', navigate = 'home', ...props}) => {
  const navigation = useNavigation();

  const isFocus = props?.state?.index == props.idx;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isFocus ? '#EC5156' : 'transparent',
        width: width / 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
      onPress={() => {
        navigation.navigate(navigate);
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: isFocus ? '#fff' : '#000',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const DrawerContent = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    navigation.reset({index: 0, routes: [{name: 'auth'}]});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <CusDrawerItem title={'Home'} navigate={'home'} idx={0} {...props} />
        <CusDrawerItem
          title={'Order History'}
          navigate={'orderHistory'}
          idx={1}
          {...props}
        />
        <CusDrawerItem
          title={'Settings'}
          navigate={'settings'}
          idx={2}
          {...props}
        />
        <CusDrawerItem title={'Faq'} navigate={'faq'} idx={3} {...props} />
        <CusDrawerItem
          title={'Support'}
          navigate={'support'}
          idx={4}
          {...props}
        />
        <TouchableOpacity
          onPress={() => logOutHandler()}
          style={{
            marginTop: 20,
            width: width / 2,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#EC5156',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@assets/icon/png/011-burger.png')}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 10,
          height: (width * 2) / 3,
          width: (width * 2) / 3,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

const main = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{width, height}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="orderHistory" component={OrderHistory} />
      <Drawer.Screen name="settings" component={Settings} />
      <Drawer.Screen name="faq" component={Faq} />
      <Drawer.Screen name="support" component={Support} />
    </Drawer.Navigator>
  );
};

export default main;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
