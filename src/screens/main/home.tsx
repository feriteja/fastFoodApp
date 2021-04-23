import {CheckOut, Gap} from '@components';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CardItem} from '@components';
import {
  clearItemList,
  getItemList,
  getSpecificList,
} from '@redux/action/itemAction';
import {clearCart} from '@redux/action/cartAction';
import {checkAuth} from '@redux/action/authAction';
import authFirebase from '@react-native-firebase/auth';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {item} from '@constants/item';
import {listenOrder} from '@constants/firebaseFunc/listenToOrder';
import firestore from '@react-native-firebase/firestore';
import {notifCreateChanel, showNotif} from '../../config/notify/notify';

const foodMenu = [
  {
    name: 'all',
    icon: require('../../assets/icon/png/023-fastFood.png'),
    value: 'all',
  },
  {
    name: 'Burger',
    icon: require('../../assets/icon/png/011-burger.png'),
    value: 'burger',
  },
  {
    name: 'Pizza',
    icon: require('../../assets/icon/png/008-pizza.png'),
    value: 'pizza',
  },
  {
    name: 'Drink',
    icon: require('../../assets/icon/png/015-SoftDrink.png'),
    value: 'softDrink',
  },
];

const home = () => {
  const [curentCatFood, setCurentCatFood] = useState(0);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const dataList = useSelector(state => state?.item?.data);
  const isCartWithItem = useSelector(state => state?.cart);
  const auth = useSelector(state => state.auth?.info);

  useEffect(() => {
    dispatch(getItemList());
    dispatch(checkAuth());
    // listenOrder();

    const subs = firestore()
      .collection('user')
      .doc(authFirebase()?.currentUser?.uid)
      .collection('invoice')
      .onSnapshot(querySnap => {
        querySnap.docChanges().forEach((change, idx) => {
          const changelID = change.doc.id;
          notifCreateChanel(changelID);
          if (change.type === 'modified') {
            console.log(change.doc.id);
            change.doc.data().status === 'success'
              ? showNotif({
                  changelID: changelID,
                  message: 'Hello sir',
                  submessage: 'Your order has been arrived :)',
                  numberID: idx,
                })
              : change.doc.data().status === 'deliver'
              ? showNotif({
                  changelID: changelID,
                  message: 'Hello sir',
                  submessage: 'Your order will be arrived in minutes ',
                })
              : null;
          }
        });
      });

    return () => {
      console.log('invokCoba');
      dispatch(clearItemList);
      dispatch(clearCart);
      // listenOrder();
      subs();
    };
  }, []);

  useEffect(() => {
    dispatch(getSpecificList(foodMenu[curentCatFood].value));
  }, [curentCatFood]);

  const findUsername = () => {
    if (!auth?.email) return '';

    let theUsername = [...auth.email];
    const findIdx = theUsername.findIndex(a => a == '@');
    theUsername.splice(findIdx, 99);
    return theUsername.join('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 70}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconEntypo name="chevron-right" size={25} color={'#222'} />
          </TouchableOpacity>
          <Text style={styles.textGreeting}>
            Hello,
            <Text style={{fontWeight: 'bold'}}> {findUsername() || ''}</Text>
          </Text>
        </View>
        <Gap height={40} />
        <View style={styles.searchSection}>
          <View>
            <Text style={{fontSize: 16}}>Find your</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              favourite foods
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('search')}
            style={{
              padding: 5,
              backgroundColor: '#fff',
              elevation: 1,
              borderRadius: 10,
            }}>
            <IconFeather name="search" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuOption}>
          <ScrollView
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              overflow: 'visible',
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {foodMenu.map((a, i) => {
              return (
                <TouchableOpacity
                  onPress={() => setCurentCatFood(i)}
                  style={[
                    styles.menuCatContainer,
                    {backgroundColor: curentCatFood == i ? '#EC5156' : '#fff'},
                  ]}
                  key={i + 'menuCateg'}>
                  <Image source={a.icon} style={{height: 30, width: 30}} />
                  <Text> {a.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.menuItem}>
          {dataList?.map((a: item, i: number) => (
            <View key={i + a.id + a.count}>
              <CardItem item={a} />
            </View>
          ))}
        </View>
      </ScrollView>
      {isCartWithItem.length > 0 && <CheckOut />}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',

    overflow: 'visible',
  },
  header: {paddingHorizontal: 20, paddingTop: 20},
  textGreeting: {
    fontSize: 16,
  },

  searchSection: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuOption: {
    flexDirection: 'row',
  },
  menuCatContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
  },
  menuItem: {
    paddingHorizontal: 20,
  },
});
