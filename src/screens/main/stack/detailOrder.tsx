import {BottomConfirm, CardConfirmItem, Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';

const detailOrder = () => {
  const cart = useSelector(state => state.cart);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailItem}>
        <FlatList
          data={cart}
          ItemSeparatorComponent={() => <Gap height={10} />}
          keyExtractor={(a, i) => i + a.id}
          renderItem={({item, index}) => <CardConfirmItem item={item} />}
        />
      </View>
      <View
        style={{position: 'absolute', bottom: 0, zIndex: 9, left: 0, right: 0}}>
        <BottomConfirm />
      </View>
    </View>
  );
};

export default detailOrder;

const styles = StyleSheet.create({
  header: {paddingHorizontal: 20, paddingTop: 20},

  detailItem: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
