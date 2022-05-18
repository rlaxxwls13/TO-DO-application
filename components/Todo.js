import { StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useState } from "react";
import { Tags } from "./Tag";

/**
 * 할일 리스트 UI
 * @param {{name: string, desc: string, tags: typeof tagState, date: number}[]} data 할일 오브젝트 배열
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @returns
 */
export const Todos = ({ data, onPress = () => {} }) => (
  <FlatList data={data} renderItem={({ item }) => <Todo item={item} onPress={onPress} />} style={styles.todos} />
);

/**
 * 할일 UI
 * @param {{name: string, desc: string, tags: typeof tagState, date: number}} item 할일 오브젝트
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @returns
 */
export const Todo = ({ item, onPress }) => {
  let [pressed, setPressed] = useState(false);
  const _onPress = () => {
    onPress(item);
  };
  return (
    <Pressable style={styles.todo} onPress={_onPress}>
      <Tags data={item.tags} />
      <Text>{item.name}</Text>
      <Text>{item.date}</Text>
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
