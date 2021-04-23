import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryList, clearHistory} from '@redux/action/historyAction';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';
import {CardHistory, Gap} from '@components';

const orderHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getHistoryList());
    return () => {
      dispatch(clearHistory);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getHistoryList());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={history}
          keyExtractor={(a, i) => i + a.id}
          ItemSeparatorComponent={() => <Gap height={10} />}
          renderItem={({index, item}) => {
            return <CardHistory item={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default orderHistory;

const styles = StyleSheet.create({
  header: {paddingHorizontal: 20, paddingTop: 20},
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
