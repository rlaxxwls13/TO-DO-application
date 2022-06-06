import { StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import AutoView from './AutoView';

/**
 * 태그 리스트 UI
 * @param {*} data 태그 오브젝트 배열
 * @param {*} onPress 클릭 이벤트, 전달 값:태그 오브젝트
 * @param {*} onLongPress LongPress 이벤트, 전달 값:태그 오브젝트
 * @param {*} style
 * @param {*} prePressed 이미 선택되어 있는 태그 오브젝트 배열
 * @returns
 */
export const Tags = ({
  data,
  onPress = () => {},
  style,
  prePressed = [],
  onLongPress = () => {},
}) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <Tag
        item={item}
        onPress={onPress}
        prePressed={prePressed}
        onLongPress={onLongPress}
      />
    )}
    horizontal
    style={{ ...styles.tags, ...style }}
  />
);

/**
 * 태그 UI
 * @param {*} item 태그 오브젝트
 * @param {*} onPress 클릭 이벤트, 전달 값:태그 오브젝트
 * @param {*} onLongPress LongPress 이벤트, 전달 값:태그 오브젝트
 * @param {*} prePressed 이미 선택되어 있는 태그 오브젝트 배열
 * @returns
 */
export const Tag = ({ item, onPress, prePressed, onLongPress }) => {
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

  const _onLongPress = () => {
    onLongPress(item);
  };

  return (
    <Pressable
      style={{
        backgroundColor: `${item.color}${pressed ? '77' : 'FF'}`,
        ...styles.tag,
      }}
      onPress={() => _onPress()}
      onLongPress={() => _onLongPress()}
    >
      <AutoView />
      <Text>{item.name}</Text>
      <AutoView />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tags: {
    flex: 1,
    width: '90%',
    maxHeight: 25,
    minHeight: 25,
  },

  tag: {
    heigh: 25,
    width: 65,
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 5,
  },
});
