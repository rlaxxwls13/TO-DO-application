import { Text, View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';


function getPeriod(startDate, endDate){
  const date = new Date(startDate);
  const dates = [];
  const period = {};

  while (date <= endDate){
    dates.push(new Date(date));
    date.setDate(date.getDate()+1);
  }
  console.log(dates);
  return dates; 
  }

export default function CalenderTab(todos) {
  
  let data = todos.todos.data



  return (
    <View>
      <Text>CalenderTab</Text>
      <View style={styles.calender}>
        <Calendar
          markingType='period'
          markedDates={{
            '2022-05-20': { startingDay: true, color: 'rgb(167,224,163)' },
            '2022-05-21':{color: 'rgb(167,224,163)'},
            '2022-05-30': { endingDay: true, color: 'rgb(167,224,163)' },
          }}
        />
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
