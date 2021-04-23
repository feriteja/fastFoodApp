import {useNavigation} from '@react-navigation/core';
import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getItemList, processItems} from '@redux/action/itemAction';

const bottomConfirm = () => {
  const cart = useSelector(state => state.cart);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const confirmHandler = () => {
    dispatch(processItems(cart));
    dispatch(getItemList());
    navigation.navigate('successProcessed');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('detailOrder')}>
      <View>
        <Text style={{}}>{sumItem} Item</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
          Rp. {sumPrice}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => confirmHandler()}>
          <Image
            source={require('../../../assets/icon/png/032-checkout.png')}
            style={{height: 30, width: 30}}
          />
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default bottomConfirm;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#EC5156',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
