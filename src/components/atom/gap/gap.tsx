import React, {FC} from 'react';
import {View, Text, ViewStyle, ViewProps} from 'react-native';

interface props {
  width?: number;
  height?: number;
  style?: ViewStyle;
  prop?: ViewProps;
}

const gap: FC<props> = ({width = 0, height = 0, style = {}, ...prop}) => {
  return (
    <View style={{height, width, ...style}} {...prop}>
      <Text></Text>
    </View>
  );
};

export default gap;
