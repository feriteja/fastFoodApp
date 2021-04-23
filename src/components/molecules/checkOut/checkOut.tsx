import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const checkOut = () => {
  const cart = useSelector(state => state.cart);

  const navigation = useNavigation();

  const sumPrice = useMemo(() => {
    const sumMap = cart.map(a => a.count * a.price);
    const sumRes = sumMap.reduce((a, b) => a + b, 0);

    return sumRes;
  }, [cart]);
  const sumItem = useMemo(() => {
    const sumMap = cart.map(a => a.count);
    const sumRes = sumMap.reduce((a, b) => a + b, 0);

    return sumRes;
  }, [cart]);

  const auth = useSelector(state => state.auth);

  const checkoutHandler = () => {
    auth.info
      ? navigation.navigate('confirm')
      : navigation.navigate('auth', {
          screen: 'login',
          params: {message: 'please login first'},
        });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => checkoutHandler()}
      style={styles.checkOutItem}>
      <View>
        <Text>{sumItem} Item</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
          Rp. {sumPrice}
        </Text>
      </View>
      <View>
        <Image
          source={require('../../../assets/icon/png/032-checkout.png')}
          style={{height: 30, width: 30}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default checkOut;

const styles = StyleSheet.create({
  checkOutItem: {
    flexDirection: 'row',
    position: 'absolute',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 20,
    backgroundColor: '#EC5156',
  },
});
