import { StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useState } from "react";
import { Tags } from "./Tag";

export const Todos = ({ data, onPress = () => {} }) => (
  <FlatList data={data} renderItem={({ item }) => <Todo item={item} onPress={onPress} />} style={styles.todos} />
);

export const Todo = ({ item, onPress }) => {
  let [pressed, setPressed] = useState(false);
  const _onPress = () => {
    onPress(item);
    console.warn(item);
  };
  return (
    <Pressable style={styles.todo} onPress={_onPress}>
      <Tags data={item.tags} />
      <Text>{item.name}</Text>
      <Text>{"날짜:" + JSON.stringify(item.date)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  todos: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },

  todo: {
    width: "90%",
    height: 100,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ff9e9e",
    padding: 8,
    marginBottom: 10,
    alignSelf: "center",
  },
});
