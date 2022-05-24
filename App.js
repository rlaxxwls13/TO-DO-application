import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useTodo } from './lib/TodoStore';
import TodoTab from './tabs/TodoTab';
import CircleButton from './components/CircleButton';
import CalenderTab from './tabs/CalenderTab';
import StatTab from './tabs/StatTab';

const deviceWidth = Dimensions.get('window').width;

export default function App() {
  const { todos, tags } = useTodo();

  const tabs = [
    {
      content: <CalenderTab />,
      menu: <Text>Calender</Text>,
    },
    {
      content: <TodoTab todos={todos} tags={tags} />,
      menu: <Text>Todos</Text>,
    },
    {
      content: <StatTab />,
      menu: <Text>Stat</Text>,
    },
  ];

  const [selected, setSelected] = useState(1);

  const leftAnim = useRef(new Animated.Value(-deviceWidth)).current;

  useEffect(() => {
    console.log(leftAnim);
    Animated.timing(leftAnim, {
      toValue: selected * -deviceWidth,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.bezier(0.3, 0.01, 0.42, 0.99),
    }).start();
  }, [selected]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <View style={styles.contents}>
          {tabs.map((tab, i) => (
            <Animated.View
              style={{ ...styles.content, left: leftAnim }}
              key={i}
            >
              {tab.content}
            </Animated.View>
          ))}
        </View>
        <View style={styles.menus}>
          {tabs.map((tab, i) => (
            <CircleButton
              style={styles.menu}
              onPress={() => setSelected(i)}
              key={i}
            >
              {tab.menu}
            </CircleButton>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  contents: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },

  content: {
    width: deviceWidth,
    left: 0,
  },

  menus: {
    height: 70,
    backgroundColor: '#ffbdbd',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  menu: {
    flex: 1,
  },
});
