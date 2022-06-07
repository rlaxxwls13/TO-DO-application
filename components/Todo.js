import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import CircleButton from './CircleButton';
import AutoView from './AutoView';

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
  onSuccess = undefined,
  onDelete = undefined,
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

  const dday = Math.ceil(
    Math.abs(item.endDate - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Pressable
      style={index === 0 ? { ...styles.todo, marginTop: 15 } : styles.todo}
      onPress={_onPress}
    >
      <View style={styles.tags}>
        <AutoView />
        {item.tags.map((tag, i) => (
          <View style={{ ...styles.tag, backgroundColor: tag.color }} key={i} />
        ))}
        <AutoView />
      </View>
      <View style={styles.content}>
        <AutoView />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <AutoView />
      </View>
      <View style={styles.date}>
        <AutoView />
        {onSuccess !== undefined ? (
          <CircleButton width={30} height={30} onPress={_onSuccess}>
            <Octicons
              name={item.successed ? 'check-circle-fill' : 'check-circle'}
              size={24}
              color="black"
              borderRadius={100}
            />
          </CircleButton>
        ) : (
          <></>
        )}
        {dday < 0 ? (
          <></>
        ) : (
          <Text style={styles.dday}>{dday == 0 ? 'D-DAY' : `D-${dday}`}</Text>
        )}
        <AutoView />
      </View>
      {onDelete !== undefined ? (
        <CircleButton width={25} height={25} onPress={_onDelete}>
          <Octicons name="x" size={20} color="black" borderRadius={100} />
        </CircleButton>
      ) : (
        <></>
      )}
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
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  date: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 60,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
  },

  desc: {},

  tags: {
    width: 40,
    marginHorizontal: 8,
    alignItems: 'center',
  },

  tag: {
    width: 30,
    height: 10,
    borderRadius: 100,
    marginVertical: 2,
  },

  dday: {
    fontSize: 15,
    fontWeight: '500',
  },
});
