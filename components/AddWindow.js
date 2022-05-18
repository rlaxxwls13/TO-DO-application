import { StyleSheet, View, TextInput, Button, Text} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Tags } from './Tag'
import CircleButton from './CircleButton'
import { SimpleLineIcons } from '@expo/vector-icons'
import AddTagWindow from './AddTagWindow'
//dateTimePicker 임포트(날짜 선택창 추가하는 라이브러리임)
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddWindow({
  item = undefined,
  tags,
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const [addTodoTags, setAddTodoTags] = useState([])
  const [addTodoTitle, setAddTodoTitle] = useState('')
  const [addTodoDesc, setAddTodoDesc] = useState('')
  //날짜를 Todo에 저장할 state + 날짜 선택기를 표시할 때 쓰는 state
  const [addTodoDate, setAddTodoDate] = useState(new Date())
  const [DatePickerVisable, setDatePickerVisable] = useState(false)

  useEffect(() => {
    if (item !== undefined) {
      setAddTodoTags(item.tags)
      setAddTodoTitle(item.name)
      setAddTodoDesc(item.desc)
      setAddTodoDate(item.date)
    }
  }, [])

  //날짜 선택기를 보여주고 숨기는 함수
  const showDatePicker = () => setDatePickerVisable(true)
  const hideDatePicker = () => setDatePickerVisable(false)
  //날짜를 state에 저장하는 부분
  const handleConfirm = (date) => {
    //date는 object임에 주의할것
    setAddTodoDate((current)=>date);
    hideDatePicker();
  }

  const [addTagWindow, setAddTagWindow] = useState(false)

  const onTagSubmit = ({ name, color }) => {
    setAddTagWindow(false)
    tags.push({ name, color })
  }

  const onTagCancel = () => {
    setAddTagWindow(false)
  }

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
        <Text>{"날짜:" + JSON.stringify(addTodoDate)}</Text>
        <Button title="날짜" style={styles.datePicker} onPress={showDatePicker} value={addTodoDate} />
          <DateTimePickerModal
            isVisible={DatePickerVisable}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        <View style={styles.buttons}>
          <Tags
            data={tags.data}
            prePressed={item === undefined ? [] : item.tags}
            onPress={(item) => {
              if (addTodoTags.includes(item)) {
                setAddTodoTags(addTodoTags.filter((v) => v !== item))
              } else {
                setAddTodoTags([...addTodoTags, item])
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
                  date: addTodoDate,
                })
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
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    bottom: 100,
    height: '120%',
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

  datePicker:{
    textAlign: "center",
    backgroundColor: "#ffffff",
  },

  buttons: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  button: {
    marginHorizontal: 5,
  },
})
