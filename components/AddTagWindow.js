import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import CircleButton from './CircleButton';
import { ColorSwatch } from './ColorSwatch';
import { SimpleLineIcons } from '@expo/vector-icons';
import AutoView from './AutoView';

/**
 * 태그 추가 창
 * @param {*} item 기존 태그 오브젝트
 * @param {void} onSubmit 확인 버튼 이벤트, 전달 값: 태그 오브젝트
 * @param {void} onCancel 취소 버튼 이벤트
 * @param {void} onDelete 삭제 버튼 이벤트, 전달 값: 태그 오브젝트
 * @returns
 */
export default function AddTagWindow({
  item = undefined,
  onSubmit,
  onCancel,
  onDelete,
}) {
  const [name, setName] = useState(item === undefined ? '' : item.name);
  const selectedState = useState(item === undefined ? '' : item.color);
  const [selected, setSelected] = selectedState;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.name}
          placeholder="태그 이름"
          onChangeText={setName}
          value={name}
        />
        <ColorSwatch selectedState={selectedState} />
        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: '#b0b0b0',
            marginVertical: 20,
          }}
        />
        <View style={styles.buttons}>
          <CircleButton onPress={onCancel}>
            <Text style={{ fontSize: 20, color: '#b0b0b0' }}>취소</Text>
          </CircleButton>
          {item === undefined ? (
            <AutoView />
          ) : (
            <CircleButton onPress={() => onDelete(item)} style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, color: '#ff6b6b' }}>삭제</Text>
            </CircleButton>
          )}

          <CircleButton
            onPress={() => {
              if (name !== '' && selected !== '') {
                onSubmit({
                  name,
                  color: selected,
                });
              }
            }}
          >
            <Text style={{ fontSize: 20, color: '#2eb3b3' }}>
              {item === undefined ? '추가' : '변경'}
            </Text>
          </CircleButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#91919155',
  },

  content: {
    width: 400,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    borderRadius: 5,
  },

  name: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: 'row',
    bottom: 0,
  },
});
