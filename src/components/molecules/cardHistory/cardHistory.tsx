import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {itemHistory} from '@constants/item';

interface props {
  item: itemHistory;
}

const cardHistory: React.FC<props> = ({item}) => {
  const navigation = useNavigation();

  const itemCount = () => {
    const counting = item.order
      .map(a => a.count)
      .reduce((cur, acum) => cur + acum);
    return counting;
  };

  const itemSumPrice = () => {
    const itemCount = item.order
      .map(a => a.count * a.price)
      .reduce((cur, acum) => cur + acum);
    return itemCount;
  };

  const color =
    item.status == 'success'
      ? '#4bb543'
      : item.status == 'deliver'
      ? '#FF9900'
      : '#aaa';

  const theDate = () => {
    const date = new Date(item.time * 1000);
    return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('historyDetail', {item})}
      style={styles.container}>
      <Image
        source={require('../../../assets/icon/png/011-burger.png')}
        style={{height: 80, width: 80, resizeMode: 'contain'}}
      />
      <View style={styles.cardContent}>
        <Text style={{fontWeight: 'bold'}}>{theDate()}</Text>
        <Text style={{}}>{itemCount()}</Text>
        <View style={styles.cardDetail}>
          <Text style={styles.textPrice}>RP. {itemSumPrice()}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: color,
                height: 15,
                width: 15,
                borderRadius: 15,
                marginRight: 5,
              }}
            />
            <Text style={{color, textTransform: 'capitalize'}}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default cardHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
    flexDirection: 'row',
  },
  cardContent: {marginLeft: 10, justifyContent: 'space-between', flex: 1},
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textPrice: {color: '#EC5156', fontSize: 16, fontWeight: 'bold'},
});
