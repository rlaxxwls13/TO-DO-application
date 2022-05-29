import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CircleButton from '../components/CircleButton';
import { Octicons } from '@expo/vector-icons';

//날짜 사이의 기간을 색칠해서 리턴하는 함수
function getPeriod(dataArr) {
  const period = {};

  for (let i = 0; i < dataArr.length; i++) {
    const date = new Date(dataArr[i].startDate);
    const dates = [];
    const color = dataArr[i].tags[0]?.color === undefined ? '#a7e0a3' : dataArr[i].tags[0].color

    while (date <= dataArr[i].endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    dates.push(new Date(dataArr[i].endDate));

    for (let k = 0; k < dates.length; k++) {
      const key = dates[k].toISOString().substring(0, 10);
      if (k === 0) period[key] = { color: color, startingDay: true };
      else if (k === dates.length - 1)
        period[key] = { color: color, endingDay: true };
      else period[key] = { color: color };
    }
  }

  return period;
}

export default function CalenderTab(todos) {
  let data = todos.todos.data;

  const [markedDate, setMarkedDate] = useState({});

  const onPress = () => {
    setMarkedDate((current) => getPeriod(data));
  };

  return (
    <View>
      <Text>CalenderTab</Text>
      <CircleButton onPress={onPress} color="#ffffff">
        <Octicons name="plus" size={24} color="black" borderRadius={100} />
      </CircleButton>
      <View style={styles.calender}>
        <Calendar markingType="period" markedDates={markedDate} />
      </View>
    </View>
  );
}

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const styles = StyleSheet.create({
  calender: {
    alignContent: 'center',
  },
});
