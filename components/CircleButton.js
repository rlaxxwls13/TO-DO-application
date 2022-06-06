import { StyleSheet, TouchableOpacity } from 'react-native';
import AutoView from './AutoView';

/**
 * 디자인된 둥근 버튼
 * @param {*} backgroundColor 배경 색
 * @param {*} onPress 클릭시 이벤트
 * @param {*} padding
 * @param {*} width
 * @param {*} height
 * @param {*} style
 * @returns
 */
export default function CircleButton({
  children,
  backgroundColor,
  onPress,
  padding,
  width,
  height,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor,
        padding,
        width,
        height,
        ...style,
      }}
    >
      <AutoView />
      {children}
      <AutoView />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
  },
});
