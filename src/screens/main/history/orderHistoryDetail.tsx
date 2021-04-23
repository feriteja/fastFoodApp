import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {itemHistory} from '@constants/item';
import {CardItem} from '@components';

const orderHistoryDetail = ({route}: any) => {
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

  const theDate = () => {
    const date = new Date(item.time * 1000);
    return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
  };

  const item: itemHistory = route.params.item;

  const color =
    item.status == 'success'
      ? '#4bb543'
      : item.status == 'deliver'
      ? '#FF9900'
      : '#aaa';

  useEffect(() => {}, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
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
          <Text
            style={{
              color,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              textShadowRadius: 0.5,
              textShadowColor: '#000',
              fontSize: 18,
            }}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{theDate()}</Text>
        <FlatList
          data={item.order}
          contentContainerStyle={{paddingBottom: 180}}
          keyExtractor={(a, i) => a.id}
          renderItem={({item, index}) => (
            <CardItem item={item} editable={false} />
          )}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 80,
          paddingHorizontal: 20,
          paddingVertical: 10,
          left: 0,
          right: 0,
          backgroundColor: '#EC5156',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
          x{itemCount()}
          {itemCount() > 1 ? ' items' : ' item'}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
          Rp. {itemSumPrice()}
        </Text>
      </View>
    </View>
  );
};

export default orderHistoryDetail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
