import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Header from '../components/Header';
import { formatDateKey } from '../App';

// CalendarView 컴포넌트: 달력 화면을 렌더링, 날짜 선택 기능 담당
export default function CalendarView({ onBack, memos, onDateSelect }) {
  const today = new Date();
  // 현재 달력에 표시할 월의 1일 날짜 저장하는 상태
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  // 특정 월의 날짜 정보 계산하는 함수
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // 해당 월의 첫 날과 마지막 날 계산
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate(); // 해당 월의 총 일수
    const startDayOfWeek = firstDay.getDay(); // 해당 월의 시작 요일 (0=일요일)
    
    return { daysInMonth, startDayOfWeek, year, month };
  };

  // 특정 날짜에 메모가 있는지 확인 (달력 Dot 표시)
  const hasMemoOnDate = (year, month, day) => {
    // 타겟 날짜의 Date Key 생성
    const targetDateKey = formatDateKey(new Date(year, month, day));
    // 모든 메모 배열(memos) 순회하며 해당 날짜 키와 일치하는 메모 하나라도 있는지 확인
    return memos.some(memo => memo.dateKey === targetDateKey);
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    // 현재 월에서 1을 뺀 새로운 Date 객체 생성해 상태 업데이트
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  // 다음 달로 이동
  const handleNextMonth = () => {
    // 현재 월에 1을 더한 새로운 Date 객체 생성해 상태 업데이트
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // 달력의 날짜 클릭 시 실행되는 함수
  const handleDatePress = (day) => {
    // 클릭된 연/월/일로 Date 객체 생성
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // App.js에서 받은 함수 호출해 선택된 날짜와 화면 전환 처리
    onDateSelect(selectedDate);  
  };

  const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const days = [];
  
  // 1. 해당 월의 시작 요일가지 빈 칸(null) 채움
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  
  // 2. 해당 월의 날짜(1월~마지막 일) 배열에 채움
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // UI 렌더링 부분
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBackButton={true} // 뒤로 가기 버튼 표시 
        onBackPress={onBack} // 뒤로 가기 버튼 클릭 시 WeekView로 돌아가는 함수 전달
      />
      
      <View style={styles.calendarWrapper}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Pressable onPress={handlePrevMonth} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>←</Text>
            </Pressable>
            <Text style={styles.calendarTitle}>
              {year}년 {month + 1}월
            </Text>
            <Pressable onPress={handleNextMonth} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>→</Text>
            </Pressable>
          </View>

          <View style={styles.weekDaysRow}>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <Text key={index} style={styles.weekDayLabel}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {days.map((day, index) => (
              <View key={index} style={styles.calendarCell}>
                {day ? (   // day가 null이 아닐 경우 (빈 칸이 아닐 경우)
                  <Pressable 
                    style={({ pressed }) => [
                      styles.dateButton,
                      pressed && styles.dateButtonPressed
                    ]}
                    onPress={() => handleDatePress(day)} // 날짜 클릭 이벤트 처리
                  >
                    <Text style={styles.dateText}>{day}</Text>
                    {hasMemoOnDate(year, month, day) && (
                      <View style={styles.memoDot} />
                    )}
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  calendarWrapper: {
    flex: 1,
    padding: 16,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EBE0',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4037',
  },
  monthButton: {
    padding: 8,
  },
  monthButtonText: {
    fontSize: 24,
    color: '#8D6E63',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 8,
  },
  weekDayLabel: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    color: '#8D6E63',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  dateButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dateButtonPressed: {
    backgroundColor: '#F5EBE0',
  },
  dateText: {
    fontSize: 14,
    color: '#5D4037',
  },
  memoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D7A86E',
    marginTop: 2,
  },
});
