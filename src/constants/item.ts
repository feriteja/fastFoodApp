import {ImageProps, ImageSourcePropType, ImageURISource} from 'react-native';

export interface item {
  count?: number;
  type: string;
  detail: string;
  name: string;
  price: number;
  photoURL: string;
  id: string;
}

export interface itemHistory {
  status: string;
  order: {
    type: string;
    detail: string;
    id: string;
    count: number;
    photoURL: string;
    name: string;
    price: number;
  }[];

  time: number;
  id: string;
}
