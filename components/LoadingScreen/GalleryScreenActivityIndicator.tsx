import {ActivityIndicator, View} from 'react-native';
import React from 'react';

const GalleryScreenActivityIndicator: React.FC = () => (
  <View
    style={{
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      zIndex: 100,
      borderWidth: 1,
      width: '100%',
      height: '100%',
    }}>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

export default GalleryScreenActivityIndicator;
