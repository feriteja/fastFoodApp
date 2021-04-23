import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';

const confirmMail = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 30,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>registration is successful please confirm your mail</Text>
      </View>
    </View>
  );
};

export default confirmMail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
