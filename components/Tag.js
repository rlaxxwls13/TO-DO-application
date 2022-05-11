import { StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";

export const Tags = ({ data, onPress = undefined, style, prePressed = [] }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <Tag item={item} onPress={onPress} prePressed={prePressed} />}
    horizontal
    style={{ ...styles.tags, ...style }}
  />
);

export const Tag = ({ item, onPress, prePressed }) => {
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (prePressed.includes(item)) {
      setPressed(true);
    }
  }, []);
  const _onPress = () => {
    if (onPress !== undefined) {
      setPressed(!pressed);
      onPress(item);
    }
  };
  return (
    <Pressable
      style={{ backgroundColor: `${item.color}${pressed ? "77" : "FF"}`, ...styles.tag }}
      onPress={() => _onPress()}
    >
      <Text styles={styles.name}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tags: {
    flex: 1,
    width: "90%",
    maxHeight: 30,
    minHeight: 30,
  },

  tag: {
    heigh: 30,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 10,
    color: "black",
    marginRight: 5,
  },

  name: {
    textalign: "center",
  },
});
