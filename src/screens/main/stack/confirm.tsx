import {BottomConfirm, CardConfirmItem, Gap} from '@components';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import StoreLocation from '../../../assets/icon/svg/storeLocation.svg';

const {width, height} = Dimensions.get('window');

const confirm = () => {
  const [myLocation, setMyLocation] = useState<any>(null);
  const [storeLocation, setStoreLocation] = useState([]);

  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation();

  const getCurrentPosition = async () => {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: 'Use Location ?',
      ok: 'YES',
      cancel: 'NO',
    });

    if (Object.is(check.status, 'enabled')) {
      Geolocation.getCurrentPosition(
        info => {
          setMyLocation(info);
        },
        err => {
          navigation.navigate('home');
        },
        {enableHighAccuracy: false, timeout: 20000},
      );
    } else if (!Object.is(check.status, 'enabled')) {
      navigation.navigate('home');
    }
  };

  const getStoreLocation = async () => {
    try {
      const data = await firestore().collection('store').get();

      const locations = data.docs.map((a, i) => a.data());

      setStoreLocation(locations);
    } catch (error) {}
  };

  useEffect(() => {
    getStoreLocation();
    getCurrentPosition();
  }, []);

  if (myLocation == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>wait</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconEntypo
            name="chevron-left"
            size={25}
            color={'#222'}
            style={{
              padding: 10,
              borderRadius: 99,
              backgroundColor: '#ffffffaa',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            mapRef?.current?.animateCamera({
              center: {
                latitude: myLocation?.coords?.latitude,
                longitude: myLocation?.coords?.longitude,
              },
            })
          }
          style={{padding: 10, borderRadius: 99, backgroundColor: '#ffffffaa'}}>
          <IconMaterial name="my-location" size={24} />
        </TouchableOpacity>
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        collapsable={true}
        customMapStyle={[
          {
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ]}
        userLocationAnnotationTitle="here"
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        style={{height: height, width}}
        initialRegion={{
          latitude: myLocation?.coords?.latitude || 0,
          longitude: myLocation?.coords?.longitude || 0,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}>
        {storeLocation.map((a, i) => {
          return (
            <Marker
              title={a.name}
              key={i + a.latitude}
              coordinate={{latitude: a.latitude, longitude: a.longitude}}>
              <StoreLocation height={40} width={40} />
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{position: 'absolute', bottom: 0, zIndex: 9, left: 0, right: 0}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            zIndex: 3,
          }}>
          <Text style={{fontSize: 16}}>Est order.</Text>
          <Text style={{fontSize: 18, color: '#EC5156', fontWeight: 'bold'}}>
            30 m
          </Text>
        </View>
        <BottomConfirm />
      </View>
    </View>
  );
};

export default confirm;

const styles = StyleSheet.create({
  header: {
    top: 20,
    left: 20,
    right: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 99,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
