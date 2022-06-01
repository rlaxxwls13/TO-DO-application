import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Tags } from './Tag';
import { Octicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import CircleButton from './CircleButton';

/**
 * 할일 리스트 UI
 * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}[]} data 할일 오브젝트 배열
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @param {void} onSuccess 완료 이벤트, 전달 값: index
 * @param {void} onDelete 완료 이벤트, 전달 값: index
 * @returns
 */
export const Todos = ({
  data,
  onPress = () => {},
  onSuccess = () => {},
  onDelete = () => {},
}) => (
  <FlatList
    data={data}
    renderItem={({ item, index }) => (
      <Todo
        item={item}
        index={index}
        onPress={onPress}
        onSuccess={onSuccess}
        onDelete={onDelete}
      />
    )}
    style={styles.todos}
  />
);

//입력된 두 날짜의 차이를 계산하는 함수
const remainingDay = (start, end) => {
  return Math.abs(
    (new Date(start).getTime() - new Date(end).getTime()) / (1000 * 60)
  );
};

/**
 * 할일 UI
 * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}} item 할일 오브젝트
 * @param {void} onPress 클릭시 이벤트, 전달 값: 할일 오브젝트
 * @param {void} onSuccess 완료 이벤트, 전달 값: index
 * @returns
 */
export const Todo = ({ item, index, onPress, onSuccess, onDelete }) => {
  let [pressed, setPressed] = useState(false);
  const _onPress = () => {
    onPress(item);
  };

  const _onSuccess = () => {
    onSuccess(index);
  };

  const _onDelete = () => {
    onDelete(index);
  };

  let currentProgress = remainingDay(new Date(), item.endDate);
  let fullProgress = remainingDay(item.startDate, item.endDate);

  let remainDay = currentProgress / (60 * 24);
  let remainHour = (currentProgress % (24 * 60)) / 60;
  let remainMinute = (remainHour % 1) * 60;

  return (
    <Pressable style={styles.todo} onPress={_onPress}>
      <Tags data={item.tags} />
      <Text>{item.name}</Text>
      <Progress.Bar progress={1 - currentProgress / fullProgress} width={350} />
      <View style={styles.date}>
        <Text>{item.startDate.toLocaleDateString() + ' ~ '}</Text>
        <Text>{item.endDate.toLocaleDateString()}</Text>
        <Text>
          {' '}
          남은 시간:{' '}
          {remainDay > 1
            ? Math.floor(remainDay) + '일 ' + Math.floor(remainHour) + '시간'
            : Math.floor(remainHour) + '시간' + Math.floor(remainMinute) + '분'}
        </Text>
        <CircleButton width={30} height={30} onPress={_onSuccess}>
          <Octicons
            name={item.successed ? 'check-circle-fill' : 'check-circle'}
            size={24}
            color="black"
            borderRadius={100}
          />
        </CircleButton>
        <CircleButton width={30} height={30} onPress={_onDelete}>
          <Octicons
            name="x-circle"
            size={24}
            color="black"
            borderRadius={100}
          />
        </CircleButton>
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
