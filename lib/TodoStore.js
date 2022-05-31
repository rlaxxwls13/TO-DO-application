import { useState } from 'react';

// 사용자 정의 Hook: To-do, Tag 저장소
export function useTodo() {
  /** @type {[{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}[], React.Dispatch<any>]} */
  const [todoState, setTodoState] = useState([]); // {name, desc, tags, date}
  /** @type {[{name: string, color: string}[], React.Dispatch<any>]} */
  const [tagState, setTagState] = useState([]); // {name, color}

  /**
   * @param {{name: string, desc: string, tags: typeof tagState, startDate: Date, endDate: Date, successed: boolean}} data
   */
  function push(data) {
    // if (tags.includes(data.tags)) {
    setTodoState([...todoState, data]);
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
    setTagState([...tagState, tag]);
  }

  function editTag(i, tag) {
    setTagState(tagState.slice().splice(i, 1, tag));
  }

  function removeTag(i) {
    setTagState(tagState.slice().splice(i, 1));
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
