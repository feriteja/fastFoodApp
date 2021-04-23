import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {item} from '@constants/item';

const cardConfirmItem = ({item}: {item: item}) => {
  const sum = item.price * item.count;
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: item.photoURL}}
        style={{height: 80, width: 80, resizeMode: 'contain'}}
      />
      <View style={styles.content}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
        <Text>x{item.count}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Rp. {item.price}</Text>
          <Text style={{fontSize: 18, color: '#EC5156', fontWeight: 'bold'}}>
            Rp. {sum}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default cardConfirmItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 1,
    marginVertical: 5,
  },
  content: {flex: 1, justifyContent: 'space-around', marginLeft: 10},
});
