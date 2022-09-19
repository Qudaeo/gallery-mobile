import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {commonStyles} from '../../common/styles';
import {colors} from '../../common/colors';

type IProps = {
  appColumnCount: 1 | 2;
  toggleColumnCount: () => void;
  isAppInternetReachable: boolean | null;
  isFetchingInProgress: boolean;
};

const ToggleColumnCount: React.FC<IProps> = ({
  appColumnCount,
  toggleColumnCount,
  isAppInternetReachable,
  isFetchingInProgress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        commonStyles.container,
        styles.columnToggleButton,
        {
          backgroundColor: isAppInternetReachable
            ? isFetchingInProgress
              ? colors.yellow_ffff6695
              : colors.green_99ff9995
            : colors.red_ff1a1a95,
        },
      ]}
      onPress={toggleColumnCount}>
      <Text testID="TouchableOpacityText" style={styles.text}>
        {appColumnCount}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleColumnCount;

const styles = StyleSheet.create({
  columnToggleButton: {
    borderWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    fontSize: 25,
    paddingBottom: 1,
    color: colors.black_4a4443,
    fontWeight: '700',
  },
});
