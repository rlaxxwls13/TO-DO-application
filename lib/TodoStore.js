import { useState } from "react";

// 사용자 정의 Hook: To-do, Tag 저장소
export function useTodo() {
  /** @type {[{name: string, desc: string, tags: typeof tagState, date: number}[], React.Dispatch<any>]} */
  const [todoState, setTodoState] = useState([]); // {name, desc, tags, date}
  /** @type {[{name: string, color: string}[], React.Dispatch<any>]} */
  const [tagState, setTagState] = useState([]); // {name, color}

  /**
   * @param {{name: string, desc: string, tags: typeof tagState, date: number}} data
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
