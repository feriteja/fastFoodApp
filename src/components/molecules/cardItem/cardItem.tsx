import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {item} from '@constants/item';
import {countItemCart, countUpdate} from '@redux/action/cartAction';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';

interface props {
  item: item;
  editable?: boolean;
}

const cardItem: FC<props> = ({item, editable = true}) => {
  const [itemCount, setItemCount] = useState(item.count || 0);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const addCart = () => {
    setItemCount(prev => prev + 1);
    dispatch(countItemCart({count: itemCount + 1, data: item, id: item.id}));
    dispatch(countUpdate({count: itemCount + 1, data: item, id: item.id}));
  };
  const minCart = () => {
    setItemCount(prev => prev - 1);
    dispatch(countItemCart({count: itemCount - 1, data: item, id: item.id}));
    dispatch(countUpdate({count: itemCount - 1, data: item, id: item.id}));
  };

  useEffect(() => {
    return () => {};
  }, [item]);

  return (
    <View style={styles.container}>
      <Image
        style={{height: 120, width: 120, resizeMode: 'contain'}}
        source={{
          uri: item.photoURL,
        }}
      />
      <View style={styles.cardDetail}>
        <Text style={styles.textCardTitle}>{item.name}</Text>
        <Text numberOfLines={3} style={styles.textCardDetail}>
          {item.detail}
        </Text>
        <View style={styles.priceNaction}>
          <Text style={styles.textCardPrice}>Rp. {item.price}</Text>
          {editable ? (
            <View style={styles.cardActionContainer}>
              <TouchableOpacity
                disabled={itemCount == 0}
                onPress={() => minCart()}
                style={[
                  styles.cardButtonAction,
                  {backgroundColor: itemCount == 0 ? '#ddd' : '#fff'},
                ]}>
                <IconEntypo name="minus" size={15} />
              </TouchableOpacity>
              <Text>{isFocused ? itemCount : ''}</Text>
              <TouchableOpacity
                onPress={() => addCart()}
                style={[styles.cardButtonAction, {backgroundColor: '#EC5156'}]}>
                <IconEntypo name="plus" size={15} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              x{isFocused ? itemCount : ''}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default cardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 1,
    marginVertical: 5,
  },
  cardDetail: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  cardActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardButtonAction: {
    borderRadius: 10,
    elevation: 2,
    height: 30,
    width: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textCardDetail: {
    flexWrap: 'wrap',
    color: '#777',
  },
  textCardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC5156',
  },
  priceNaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
