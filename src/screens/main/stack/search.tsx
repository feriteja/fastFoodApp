import {CardItem, Gap} from '@components';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';

const search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [dataList, setDataList] = useState([]);
  const allData = useSelector(state => state.item.allData);

  const navigation = useNavigation();

  const searchCoba = () => {
    const check = allData.filter(a =>
      a.name.toLowerCase().includes(searchVal.toLowerCase()),
    );
    setDataList(check);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fafafa',
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerSearchContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="search for your favourite food ?"
          placeholderTextColor="#888"
          onChangeText={a => setSearchVal(a)}
          value={searchVal}
        />
        <TouchableOpacity
          onPress={() => searchCoba()}
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
          <IconFeather name="search" size={25} />
        </TouchableOpacity>
      </View>
      <Gap height={20} />
      <View style={styles.contentSearch}>
        {dataList.length > 0 ? (
          dataList.map((a, i) => {
            return <CardItem item={a} key={i + a.id} />;
          })
        ) : searchVal.length == 0 ? (
          <View></View>
        ) : (
          <Text>no found</Text>
        )}
      </View>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({
  contentSearch: {
    marginHorizontal: 20,
  },
  headerSearchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 100,
    elevation: 1,
    marginTop: 30,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
    margin: 0,
    fontSize: 18,
    color: '#000',
  },
  header: {paddingHorizontal: 20, paddingTop: 20},
});
