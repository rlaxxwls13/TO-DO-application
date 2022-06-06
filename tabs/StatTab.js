import { Text, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useState, useEffect } from 'react';
import CircleButton from '../components/CircleButton';
import { Todos } from '../components/Todo';

export default function StatTab({ todos, selectedTag }) {
  const [mode, setMode] = useState(0);
  const [filterTodo, setFilterTodo] = useState(todos.data);

  useEffect(() => {
    setTodo(mode);
  }, [mode, selectedTag]);

  const setTodo = (i) => {
    const now = new Date();
    let copy = todos.data.slice();
    switch (i) {
      case 1: //일간
        copy = copy.filter(
          (v) =>
            v.endDate.getFullYear() === now.getFullYear() &&
            v.endDate.getMonth() === now.getMonth() &&
            v.endDate.getDate() === now.getDate()
        );
        break;

      case 2: //주간
        const s = now.getDate() - now.getDay();
        let start = new Date();
        start.setDate(s);
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setDate(s + 6);
        end.setHours(23, 59, 59, 59);
        copy = copy.filter((v) => v.endDate >= start && v.endDate <= end);
        break;

      case 3: //월간
        copy = copy.filter(
          (v) =>
            v.endDate.getFullYear() === now.getFullYear() &&
            v.endDate.getMonth() === now.getMonth()
        );
        break;

      default:
        break;
    }
    copy =
      selectedTag.length === 0
        ? copy
        : copy.filter((v) => multiInlcudes(v.tags, selectedTag));
    setFilterTodo(copy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>완료율</Text>
      <Progress.Circle
        progress={getProgress(filterTodo)}
        size={180}
        borderWidth={1}
        thickness={5}
        showsText={true}
        strokeCap="round"
      />
      <View style={styles.buttons}>
        {['전체', '일간', '주간', '월간'].map((v, i) => (
          <CircleButton onPress={() => setMode(i)} key={i}>
            <Text
              style={[
                styles.button,
                {
                  opacity: mode === i ? 1 : 0.2,
                  fontWeight: mode === i ? '600' : '100',
                },
              ]}
            >
              {v}
            </Text>
          </CircleButton>
        ))}
      </View>
      <Text style={styles.contentTitle}>진행중인 일</Text>
      <Todos data={filterTodo.filter((v) => !v.successed)} />
      <Text style={styles.contentTitle}>완료된 일</Text>
      <Todos data={filterTodo.filter((v) => v.successed)} />
    </View>
  );
}

function getProgress(todos) {
  return todos.length > 0
    ? todos.reduce((prev, cur) => (cur.successed ? prev + 1 : prev), 0) /
        todos.length
    : 0;
}

function multiInlcudes(arr, search) {
  let res = true;
  for (let i = 0; i < search.length; i++) {
    const e = search[i];
    res = arr.includes(e);
    if (!res) break;
  }
  return res;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    margin: 10,
  },

  button: {
    fontSize: 15,
    padding: 5,
  },

  contentTitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
  },
});
