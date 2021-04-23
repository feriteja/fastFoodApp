import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import IconFeather from 'react-native-vector-icons/Feather';

interface props {
  type: 'phone' | 'email' | 'password' | 'default';
  value: string;
  placeholder: string;
  onChangeText: (a: string) => void;
}

const authInput: React.FC<props> = ({
  onChangeText,
  type,
  value,
  placeholder,
}) => {
  const [isHide, setIsHide] = useState(true);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <IconFeather
        name={
          type === 'email'
            ? 'mail'
            : type == 'phone'
            ? 'smartphone'
            : type == 'password'
            ? 'lock'
            : 'user'
        }
        size={20}
        style={{paddingHorizontal: 10}}
      />
      <TextInput
        value={value}
        onChangeText={a => onChangeText(a)}
        secureTextEntry={type == 'password' && isHide}
        placeholder={placeholder}
        autoCapitalize="none"
        keyboardType={
          type == 'email'
            ? 'email-address'
            : type == 'phone'
            ? 'number-pad'
            : 'default'
        }
        placeholderTextColor="#888"
        style={{
          padding: 0,
          margin: 0,
          fontSize: 16,
          borderBottomWidth: 0.5,
          flex: 1,
          color: '#000',
        }}
      />
      {type === 'password' && (
        <TouchableOpacity onPress={() => setIsHide(a => !a)}>
          {value.length > 0 && (
            <IconFeather
              name={type === 'password' && isHide ? 'eye-off' : 'eye'}
              size={20}
              style={{paddingHorizontal: 10}}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default authInput;

const styles = StyleSheet.create({});
