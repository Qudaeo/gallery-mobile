import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type IProps = {
  appColumnCount: 1 | 2;
  toggleColumnCount?: () => void;
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
      style={[
        styles.columnToggleButton,
        {
          backgroundColor: isAppInternetReachable
            ? isFetchingInProgress
              ? 'rgba(255, 255, 102, 0.7)'
              : 'rgba(153, 255, 153, 0.7)'
            : 'rgba(255, 26, 26, 0.7)',
        },
      ]}
      onPress={() => {
        toggleColumnCount && toggleColumnCount();
      }}>
      <Text
        testID="TouchableOpacityText"
        style={{
          fontSize: 25,
          paddingBottom: 1,
        }}>
        {appColumnCount}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleColumnCount;

const styles = StyleSheet.create({
  columnToggleButton: {
    position: 'absolute',
    right: 15,
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'rgba(180, 180, 180,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
  },
});
