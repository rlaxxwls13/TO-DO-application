import { Text, View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState } from 'react';
import License from '../components/License';
import CircleButton from '../components/CircleButton';

//날짜 사이의 기간을 색칠해서 리턴하는 함수
export function getPeriod(dataArr) {
  const period = {};

  for (let i = 0; i < dataArr.length; i++) {
    const date = new Date(dataArr[i].startDate);
    const dates = [];

    //dates 안에 두 날짜와 그 사이의 날짜를 추가
    while (date <= dataArr[i].endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    if (!(dataArr[i].endDate in dates)) dates.push(dataArr[i].endDate);

    //dates 안의 날짜를 key로 갖는 오브젝트 생성
    for (let k = 0; k < dates.length; k++) {
      const key = dates[k].toISOString().substring(0, 10);
      if (!(key in period)) period[key] = { periods: [] };
      else period[key] = { periods: [...period[key].periods] };
    }

    //추가된 할 일의 name을 비교하여 이미 추가된 날짜인지 판별 후 아니면 새로 추가
    for (let k = 0; k < dates.length; k++) {
      const key = dates[k].toISOString().substring(0, 10);
      const prevKey =
        k !== 0 ? dates[k - 1].toISOString().substring(0, 10) : '';
      const color =
        dataArr[i].tags[0]?.color === undefined
          ? '#656A8F'
          : dataArr[i].tags[0].color;
      let isUnique = true;

      for (let j = 0; j < period[key].periods.length; j++) {
        if (period[key].periods[j].name === dataArr[i].name) isUnique = false;
      }

      if (k === 0 && isUnique)
        period[key].periods.push({
          startingDay: true,
          color: color,
          name: dataArr[i].name,
        });
      else if (k === dates.length - 1 && isUnique)
        period[key].periods.push({
          endingDay: true,
          color: period[prevKey].periods[0].color,
          name: dataArr[i].name,
        });
      else if (isUnique)
        period[key].periods.push({
          color: period[prevKey].periods[0].color,
          name: dataArr[i].name,
        });
    }
  }

  return period;
}

export default function CalenderTab(todos) {
  const markedDates = getPeriod(todos.todos.data);
  const [showLicense, setShowLicense] = useState(false);

  return (
    <View style={styles.container}>
      <Text>CalenderTab</Text>
      <View style={styles.calender}>
        <Calendar markingType="multi-period" markedDates={markedDates} />
      </View>
      <CircleButton
        onPress={() => setShowLicense(true)}
        style={styles.licenseButton}
        width={100}
        height={30}
        backgroundColor="#ededed"
      >
        <Text>LICENSE</Text>
      </CircleButton>
      {showLicense ? <License onClose={() => setShowLicense(false)} /> : <></>}
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
  container: {
    height: '100%',
  },

  calender: {
    alignContent: 'center',
    flex: 1,
  },

  licenseButton: {
    margin: 20,
    alignSelf: 'flex-end',
  },
});
