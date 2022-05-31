import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CircleButton from '../components/CircleButton';
import { Ionicons } from '@expo/vector-icons';


function getRandomColor() {
  const color = ['#']

  for(let i = 0;i<6;i++){
    color.push(Math.floor(Math.random() * 16).toString(16))
  }

  return color.join('')
}



//날짜 사이의 기간을 색칠해서 리턴하는 함수
const period = {};

export function getPeriod(dataArr) {

  for (let i = 0; i < dataArr.length; i++) {
    const date = new Date(dataArr[i].startDate);
    const dates = [];
    const color =
      dataArr[i].tags[0]?.color === undefined
        ? getRandomColor()
        : dataArr[i].tags[0].color;

    while (date <= dataArr[i].endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    for (let k = 0; k < dates.length; k++) {
      const key = dates[k].toISOString().substring(0, 10);
      if (!(key in period)) period[key] = {periods: []}
      else period[key] = {periods: [...period[key].periods]}
    }

    for (let k = 0; k < dates.length; k++) {
      const key = dates[k].toISOString().substring(0, 10);
      let isUnique = true
      
      for(let j=0;j<period[key].periods.length;j++){
        if (period[key].periods[j].name === dataArr[i].name) isUnique = false
      }

      if (k===0 && isUnique) period[key].periods.push({startingDay: true, color: color, name: dataArr[i].name});
      else if(k=== dates.length-1 && isUnique) period[key].periods.push({endingDay: true, color: color, name: dataArr[i].name});
      else if(isUnique) period[key].periods.push({color: color, name: dataArr[i].name});
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
        <Ionicons name="md-refresh" size={24} color="black" />
      </CircleButton>
      <View style={styles.calender}>
        <Calendar markingType="multi-period" markedDates={markedDate} />
      </View>
    </View>
  );
}

//달력을 한국어로 바꾸는 코드
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

//스타일
const styles = StyleSheet.create({
  calender: {
    alignContent: 'center',
  },
});
