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
      content: <CalenderTab todos={todos} />,
      menu: <Text style={styles.menuText}>달력</Text>,
    },
    {
      content: <TodoTab todos={todos} tags={tags} />,
      menu: <Text style={styles.menuText}>할 일</Text>,
    },
    {
      content: <StatTab />,
      menu: <Text style={styles.menuText}>통계</Text>,
    },
  ];

  const [selected, setSelected] = useState(1);

  const selectedAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(selectedAnim, {
      toValue: selected,
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
              style={{
                ...styles.content,
                left: selectedAnim.interpolate({
                  inputRange: [0, 2],
                  outputRange: [0, -deviceWidth * 2],
                }),
              }}
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
          <View style={styles.selectedContainer}>
            <Animated.View
              style={{
                ...styles.selected,
                left: selectedAnim.interpolate({
                  inputRange: [0, 2],
                  outputRange: [`-${100 / 3}%`, `${100 / 3}%`],
                }),
                transform: [
                  {
                    scale: selectedAnim.interpolate({
                      inputRange: [0, 0.5, 1, 1.5, 2],
                      outputRange: [1, 0.3, 1, 0.3, 1],
                    }),
                  },
                ],
              }}
            />
          </View>
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
    backgroundColor: '#ededed',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },

  menu: {
    flex: 1,
  },

  menuText: {
    fontSize: 20,
  },

  selectedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    paddingVertical: 5,
  },

  selected: {
    width: '30%',
    height: '90%',
    backgroundColor: '#6b6b6b',
    // position: 'absolute',
    left: '0%',
    borderRadius: 5,
  },
});
