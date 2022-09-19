import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../common/colors';

const GalleryActivityIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size={'large'} color={colors.red_e4914e} />
  </View>
);

export default GalleryActivityIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
