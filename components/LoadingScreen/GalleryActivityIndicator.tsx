import {ActivityIndicator, View} from 'react-native';
import React from 'react';

const GalleryActivityIndicator: React.FC = () => (
  <View
    style={{
      position: 'absolute',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

export default GalleryActivityIndicator;
