import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../../common/styles';
import {colors} from '../../common/colors';

type IProps = {
  messageText: string;
};

const TextMessage: React.FC<IProps> = ({messageText}) => (
  <View style={[commonStyles.flex1, commonStyles.container]}>
    <Text style={styles.text}>{messageText}</Text>
  </View>
);

export default TextMessage;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: colors.black_000000,
  },
});
