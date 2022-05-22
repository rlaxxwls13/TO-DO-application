import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tags } from './Tag';
import CircleButton from './CircleButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import AddTagWindow from './AddTagWindow';
//dateTimePicker 임포트(날짜 선택창 추가하는 라이브러리임)
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/**
 * 할일 추가 창
 * @param {object} item 편집시 할일 오브젝트 전달
 * @param {void} onSubmit 확인 버튼 이벤트, 전달 값: 할일 오브젝트
 * @param {void} onCancel 취소 버튼 이벤트
 * @returns
 */
export default function AddWindow({
  item = undefined,
  tags,
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const [addTodoTags, setAddTodoTags] = useState([]);
  const [addTodoTitle, setAddTodoTitle] = useState('');
  const [addTodoDesc, setAddTodoDesc] = useState('');
  //날짜를 Todo에 저장할 state + 날짜 선택기를 표시할 때 쓰는 state
  const [addTodoStartDate, setAddTodoStartDate] = useState(new Date());
  const [addTodoEndDate, setAddTodoEndate] = useState(
    new Date(addTodoStartDate.getTime() + 8.64e7)
  );
  const [datePickerVisable, setDatePickerVisable] = useState(false);
  //시작 날짜를 선택하는지 확인하는 state
  const [datePickerIsStart, setDatePickerIsStart] = useState(true);

  useEffect(() => {
    if (item !== undefined) {
      setAddTodoTags(item.tags);
      setAddTodoTitle(item.name);
      setAddTodoDesc(item.desc);
      setAddTodoStartDate(item.startDate);
      setAddTodoEndate(item.endDate);
    }
  }, []);

  //날짜 선택기를 보여주고 숨기는 함수 + 어떤 날자를 선택하는지 결정함
  const showDatePicker = (start) => {
    setDatePickerVisable(true);
    setDatePickerIsStart(start);
  };
  const hideDatePicker = () => setDatePickerVisable(false);
  //날짜를 state에 저장하는 부분
  const onDateConfirm = (date) => {
    if (datePickerIsStart) setAddTodoStartDate((current) => date);
    else setAddTodoEndate((current) => date);
    hideDatePicker();
  };

  const [addTagWindow, setAddTagWindow] = useState(false);

  const onTagSubmit = ({ name, color }) => {
    setAddTagWindow(false);
    tags.push({ name, color });
  };

  const onTagCancel = () => {
    setAddTagWindow(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.addWindowTitle}
          placeholder="제목"
          onChangeText={setAddTodoTitle}
          value={addTodoTitle}
        />
        <TextInput
          style={styles.addWindowDesc}
          placeholder="설명"
          onChangeText={setAddTodoDesc}
          value={addTodoDesc}
        />
        {/* 날짜 추가하는 버튼 */}
        <View style={styles.datePicker}>
          <CircleButton
            width={100}
            height={50}
            onPress={() => showDatePicker(true)}
          >
            <Text>시작일</Text>
            <Text>{addTodoStartDate.toLocaleDateString()}</Text>
          </CircleButton>
          <CircleButton
            width={100}
            height={50}
            onPress={() => showDatePicker(false)}
          >
            <Text>종료일</Text>
            <Text>{addTodoEndDate.toLocaleDateString()}</Text>
          </CircleButton>
        </View>
        <DateTimePickerModal
          isVisible={datePickerVisable}
          mode="date"
          onConfirm={onDateConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.buttons}>
          <Tags
            data={tags.data}
            prePressed={item === undefined ? [] : item.tags}
            onPress={(item) => {
              if (addTodoTags.includes(item)) {
                setAddTodoTags(addTodoTags.filter((v) => v !== item));
              } else {
                setAddTodoTags([...addTodoTags, item]);
              }
            }}
          />
          <CircleButton onPress={() => setAddTagWindow(true)}>
            <SimpleLineIcons name="plus" size={24} color="black" />
          </CircleButton>
        </View>
        <View style={styles.buttons}>
          <CircleButton
            style={styles.button}
            onPress={() => {
              if (addTodoTitle !== '') {
                onSubmit({
                  name: addTodoTitle,
                  desc: addTodoDesc,
                  tags: addTodoTags,
                  startDate: addTodoStartDate,
                  endDate: addTodoEndDate,
                });
              }
            }}
          >
            <SimpleLineIcons name="check" size={24} color="black" />
          </CircleButton>
          <CircleButton style={styles.button} onPress={onCancel}>
            <SimpleLineIcons name="close" size={24} color="black" />
          </CircleButton>
        </View>
      </View>
      {addTagWindow ? (
        <AddTagWindow onSubmit={onTagSubmit} onCancel={onTagCancel} />
      ) : (
        <></>
      )}
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
    backgroundColor: '#ffd6d655',
  },

  content: {
    width: '80%',
    height: '50%',
    backgroundColor: '#ffdbdb',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
  },

  addWindowTitle: {
    textAlign: 'center',
    fontSize: 25,
  },

  tags: {
    width: '90%',
  },

  addWindowDesc: {
    textAlign: 'center',
    width: '80%',
    fontSize: 15,
    flex: 1,
  },

  datePicker: {
    flexDirection: 'row',
  },

  buttons: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  button: {
    marginHorizontal: 5,
  },
});
