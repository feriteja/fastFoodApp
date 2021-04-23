import {Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';

const support = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text
          style={{fontSize: 20, fontWeight: 'bold', color: '#EC5156'}}
          numberOfLines={2}>
          Thanks to them for providing free assets
        </Text>
        <Gap height={20} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textGratitude}>flaticon</Text>
        </View>
        <Text style={styles.textGratitude}>freepik</Text>
        <Text style={styles.textGratitude}>pngtree</Text>
        <Text style={styles.textGratitude}>pngPlay</Text>
        <Text style={styles.textGratitude}>vhv.rs</Text>
        <Text style={styles.textGratitude}>pngarts</Text>
        <Text style={styles.textGratitude}>pngmart</Text>
        <Text style={styles.textGratitude}>nicepng</Text>
        <Text style={styles.textGratitude}>pngimg</Text>

        <Gap height={20} />
        <Text
          style={{fontSize: 20, fontWeight: 'bold', color: '#EC5156'}}
          numberOfLines={2}>
          and dribbble which has provided inspiration
        </Text>
        <Gap height={10} />
        <Text style={styles.textGratitude}>Food Delivery // Mobile App</Text>
        <Text style={styles.textGratitude}>by: blacklead studio</Text>
      </View>
    </View>
  );
};

export default support;

const styles = StyleSheet.create({
  content: {paddingHorizontal: 20, paddingVertical: 20},
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textGratitude: {
    fontSize: 16,
  },
});
