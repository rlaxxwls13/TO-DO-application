import { StyleSheet, TouchableOpacity, View } from "react-native";

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
