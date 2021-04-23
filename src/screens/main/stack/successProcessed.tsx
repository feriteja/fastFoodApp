import {Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
  BackHandlerStatic,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';

const successProcessed = () => {
  const navigation = useNavigation();

  const backHandlerRef = useRef(null);

  const backHandler = () => {
    navigation.navigate('main');
    return true;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      backHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => backHandler(),
      );

      return () => {
        backHandlerRef.current.remove();
      };
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fafafa',
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <IconEntypo name="chevron-left" size={25} color={'#222'} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Thanks for your order
        </Text>
        <Gap height={20} />
        <Image
          source={require('../../../assets/icon/png/customerService.png')}
          style={{resizeMode: 'contain', height: 200, width: 200}}
        />
        <Gap height={20} />
        <Text>your order will be processed, please wait :{')'}</Text>
        <Gap height={40} />

        <TouchableOpacity
          style={{
            backgroundColor: '#EC5156',
            borderRadius: 10,
            width: 200,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('home')}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default successProcessed;

const styles = StyleSheet.create({
  header: {paddingHorizontal: 20, paddingTop: 20},
});
