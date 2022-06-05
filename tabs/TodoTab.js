import { StyleSheet, View, TextInput } from 'react-native';
import { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { Tags } from '../components/Tag';
import { Todos } from '../components/Todo';
import AddWindow from '../components/AddWindow';
import CircleButton from '../components/CircleButton';
import AutoView from '../components/AutoView';

export default function TodoTab({ todos, tags }) {
  const [addWindow, setAddWindow] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [selectedTag, setSelectedTag] = useState([]);
  const [search, setSearch] = useState('');

  const onSubmit = ({ name, desc, tags, startDate, endDate }) => {
    setAddWindow(false);
    if (selected === undefined) {
      todos.push({ name, desc, tags, startDate, endDate });
    } else {
      todos.edit(
        todos.data.findIndex((v) => v === selected),
        { name, desc, tags, startDate, endDate }
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
      <View style={styles.tags}>
        <AutoView />
        <Tags
          data={tags.data}
          onPress={(item) => {
            if (selectedTag.includes(item)) {
              setSelectedTag(selectedTag.filter((v) => v !== item));
            } else {
              setSelectedTag([...selectedTag, item]);
            }
          }}
        />
        <AutoView />
      </View>
      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <Octicons name="search" size={24} color="black" borderRadius={100} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="검색"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <Todos
        data={
          selectedTag.length === 0
            ? todos.data.filter((v) => v.name.includes(search))
            : todos.data.filter(
                (v) =>
                  multiInlcudes(v.tags, selectedTag) && v.name.includes(search)
              )
        }
        onPress={(item) => openEdit(item)}
        onSuccess={(i) => todos.updateSuccessed(i)}
        onDelete={(i) => todos.remove(i)}
      />
      <CircleButton
        backgroundColor="#ededed"
        onPress={() => setAddWindow(true)}
        style={styles.addButton}
      >
        <Octicons name="plus" size={24} color="black" />
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

  tags: {
    height: 40,
    marginHorizontal: 25,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  search: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#f0f0f0',
  },

  searchIcon: {
    backgroundColor: '#f0f0f0',
    width: 50,
    padding: 5,
    alignItems: 'center',
  },

  searchInput: {
    marginHorizontal: 10,
  },
});
