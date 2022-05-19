import { StyleSheet, TouchableOpacity, View } from "react-native";

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
export default function CircleButton({ children, backgroundColor, onPress, padding, width, height, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, backgroundColor, padding, width, height, ...style }}>
      <View style={{ flex: 1 }} />
      {children}
      <View style={{ flex: 1 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
  },
});
