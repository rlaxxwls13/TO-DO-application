import { StyleSheet, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Tags } from "./Tag";
import CircleButton from "./CircleButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import AddTagWindow from "./AddTagWindow";

export default function AddWindow({ item = undefined, tags, onSubmit = () => {}, onCancel = () => {} }) {
  const [addTodoTags, setAddTodoTags] = useState([]);
  const [addTodoTitle, setAddTodoTitle] = useState("");
  const [addTodoDesc, setAddTodoDesc] = useState("");

  useEffect(() => {
    if (item !== undefined) {
      setAddTodoTags(item.tags);
      setAddTodoTitle(item.name);
      setAddTodoDesc(item.desc);
    }
  }, []);

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
        <TextInput style={styles.addWindowDesc} placeholder="설명" onChangeText={setAddTodoDesc} value={addTodoDesc} />
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
              if (addTodoTitle !== "") {
                onSubmit({
                  name: addTodoTitle,
                  desc: addTodoDesc,
                  tags: addTodoTags,
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
      {addTagWindow ? <AddTagWindow onSubmit={onTagSubmit} onCancel={onTagCancel} /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd6d655",
  },

  content: {
    width: "80%",
    height: "50%",
    backgroundColor: "#ffdbdb",
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
  },

  addWindowTitle: {
    textAlign: "center",
    fontSize: 25,
  },

  tags: {
    width: "90%",
  },

  addWindowDesc: {
    textAlign: "center",
    width: "80%",
    fontSize: 15,
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
    marginVertical: 5,
  },

  button: {
    marginHorizontal: 5,
  },
});
