import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Tags } from './Tag';
import * as Progress from 'react-native-progress';


/**
 * 할일 리스트 UI
 * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date}[]} data 할일 오브젝트 배열
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @returns
 */
export const Todos = ({ data, onPress = () => {} }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <Todo item={item} onPress={onPress} />}
    style={styles.todos}
  />
);

/**
 * 할일 UI
 * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date}} item 할일 오브젝트
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @returns
 */

  //입력된 두 날짜의 차이를 계산하는 함수
  const remainingDay =(start, end) => {
  return Math.abs(
    (new Date(start).getTime() - new Date(end).getTime()) / (1000 * 60)
  )
}

export const Todo = ({ item, onPress }) => {
  let [pressed, setPressed] = useState(false);
  const _onPress = () => {
    onPress(item);
  };

  let currentProgress = remainingDay(new Date(), item.endDate)
  let fullProgress = remainingDay(item.startDate, item.endDate)

  let remainDay = currentProgress / (60 * 24)
  let remainHour = (currentProgress - remainDay * 60) / 60
  let remainMinute = (remainHour % 1) * 60

  console.log(remainDay)
  console.log(remainHour)
  console.log(remainMinute)

  return (
    <Pressable style={styles.todo} onPress={_onPress}>
      <Tags data={item.tags} />
      <Text>{item.name}</Text>
      <Progress.Bar progress={1 - (currentProgress/fullProgress)} width={350}/>
      <View style={styles.date}>
        <Text>{item.startDate.toLocaleDateString() + " ~ "}</Text>
        <Text>{item.endDate.toLocaleDateString()}</Text>
        <Text> 남은 시간: {
        (remainDay > 1) ?
        Math.floor(remainDay) + '일 ' + Math.round(remainHour) + '시간' : 
        Math.floor(remainHour) + '시간' + Math.round(remainMinute) + '분'
        }</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  todos: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },

  todo: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ff9e9e',
    padding: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },

  date: {
    flexDirection: 'row',
  },
});
