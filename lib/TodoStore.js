import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

// 사용자 정의 Hook: To-do, Tag 저장소
export function useTodo() {
  /** @type {[{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}[], React.Dispatch<any>]} */
  const [todoState, setTodoState] = useState([]); // {name, desc, tags, date}
  /** @type {[{id: string, name: string, color: string}[], React.Dispatch<any>]} */
  const [tagState, setTagState] = useState([]); // {name, color}
  const [init, setInit] = useState(false);

  useEffect(() => {
    // FileSystem.deleteAsync(`${FileSystem.documentDirectory}user.json`);
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((v) => {
      if (v.includes('user.json')) {
        FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}user.json`
        ).then((v) => {
          let data = JSON.parse(v);
          data.todo = data.todo.map((todo) => {
            todo.tags = todo.tags.map((tag) =>
              data.tag.find((v) => v.id === tag.id)
            );
            todo.startDate = new Date(todo.startDate);
            todo.endDate = new Date(todo.endDate);
            return todo;
          });
          setTagState(data.tag);
          setTodoState(data.todo);
          setInit(true);
        });
      } else {
        setInit(true);
      }
    });
  }, []);

  useEffect(() => {
    if (init) {
      let res = JSON.stringify({ todo: todoState, tag: tagState });
      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}user.json`,
        res
      );
    }
  });

  /**
   * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}} data
   */
  function push(data) {
    // if (tags.includes(data.tags)) {
    let copy = todoState.slice();
    const pos = copy.findIndex((i) => i.successed == true);
    copy.splice(pos, 0, data);
    setTodoState(copy);
    // setTodoState([...todoState, data]);
    // }
  }

  function edit(i, data) {
    let copy = todoState.slice();
    copy.splice(i, 1, data);
    setTodoState(copy);
  }

  /**
   * @param {number} i index
   */
  function remove(i) {
    let copy = todoState.slice();
    copy.splice(i, 1);
    setTodoState(copy);
  }

  function updateSuccessed(i) {
    let copy = todoState.slice();
    copy[i].successed = !copy[i].successed;
    if (copy[i].successed) {
      copy.push(copy[i]);
      copy.splice(i, 1);
    } else {
      const pos = copy.findIndex((i) => i.successed == true);
      copy.splice(pos, 0, copy[i]);
      copy.splice(i + 1, 1);
    }
    setTodoState(copy);
  }

  /**
   * @param {{name: string, color: string}} tag
   */
  function pushTag(tag) {
    let hex = genHex();
    while (tagState.findIndex((v) => v.id === hex) !== -1) {
      hex = genHex();
    }
    setTagState([...tagState, { id: hex, ...tag }]);
  }

  function editTag(i, tag) {
    let copy = tagState.slice();
    copy.splice(i, 1, { ...tag, id: tagState[i].id });
    setTagState(copy);
    const filterTodo = todoState.map((todo) => {
      todo.tags = todo.tags.map((v) => (v === tagState[i] ? copy[i] : v));
      return todo;
    });
    setTodoState(filterTodo);
  }

  function removeTag(i) {
    const filterTodo = todoState.map((todo) => {
      todo.tags = todo.tags.filter((tag) => tag !== tagState[i]);
      return todo;
    });
    setTodoState(filterTodo);
    let copy = tagState.slice();
    copy.splice(i, 1);
    setTagState(copy);
  }

  return {
    todos: {
      data: todoState,
      push,
      edit,
      updateSuccessed,
      remove,
    },
    tags: {
      data: tagState,
      push: pushTag,
      edit: editTag,
      remove: removeTag,
    },
  };
}

function genHex(size = 6) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}
