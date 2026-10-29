  import { View, Text, StyleSheet, Pressable } from 'react-native'; 

// WeekDays 컴포넌트: 주간 뷰 상단의 요일 탭 렌더링
  export default function WeekDays({ selectedDay, onDaySelect }) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    
    return (
      <View style={styles.weekDaysContainer}>
        {days.map((day, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.dayButton,
              selectedDay === index && styles.dayButtonSelected, // 현재 선택된 요일 스타일 적용
              pressed && styles.dayButtonPressed,
            ]}
            onPress={() => onDaySelect(index)} // 클릭된 요일의 인덱스를 상위 컴포넌트로 전달
          >
            <Text style={[
              styles.dayText,
              selectedDay === index && styles.dayTextSelected
            ]}>
              {day}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  const styles = StyleSheet.create({
    weekDaysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#D7CCC8',
    },
    dayButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    dayButtonSelected: {
      backgroundColor: '#D7A86E', 
    },
    dayButtonPressed: {
      opacity: 0.7, 
    },
    dayText: {
      fontSize: 14,
      color: '#8D6E63',
    },
    dayTextSelected: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });
