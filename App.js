import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { useTodo } from './lib/TodoStore';
import { Octicons } from '@expo/vector-icons';
import { Tags } from './components/Tag';
import { Todos } from './components/Todo';
import AddWindow from './components/AddWindow';
import CircleButton from './components/CircleButton';

export default function App() {
  const { todos, tags } = useTodo();
  const [addWindow, setAddWindow] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [selectedTag, setSelectedTag] = useState([]);

  const onSubmit = ({ name, desc, tags, startDate, endDate }) => {
    setAddWindow(false);
    if (selected === undefined) {
      todos.push({ name, desc, tags, startDate, endDate});
    } else {
      todos.edit(
        todos.data.findIndex((v) => v === selected),
        { name, desc, tags, startDate, endDate}
      );
      setSelected(undefined);
    }
  };

  const onCancel = () => {
    setSelected(undefined);
    setAddWindow(false);
  };

  const openEdit = (item) => {
    setAddWindow(true);
    setSelected(item);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Tags
          data={tags.data}
          style={{ marginBottom: 10 }}
          onPress={(item) => {
            if (selectedTag.includes(item)) {
              setSelectedTag(selectedTag.filter((v) => v !== item));
            } else {
              setSelectedTag([...selectedTag, item]);
            }
          }}
        />
        <Todos
          data={
            selectedTag.length === 0
              ? todos.data
              : todos.data.filter((v) => multiInlcudes(v.tags, selectedTag))
          }
          onPress={(item) => openEdit(item)}
        />
        <CircleButton
          backgroundColor="#ffdbe7"
          onPress={() => setAddWindow(true)}
          style={styles.addButton}
        >
          <Octicons name="plus" size={24} color="black" borderRadius={100} />
        </CircleButton>
        {addWindow ? (
          <AddWindow
            tags={tags}
            onSubmit={onSubmit}
            onCancel={onCancel}
            item={selected}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    </>
  );
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  addButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
