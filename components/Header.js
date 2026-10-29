import { View, Text, StyleSheet, Pressable } from 'react-native';

// Header 컴포넌트: 화면 상단의 날짜 정보,네비게이션 아이콘 표시
export default function Header({ currentDate, onCalendarPress, showBackButton, onBackPress }) {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        // CalendarView에서 사용하는 뒤로 가기 버튼
        <Pressable 
          onPress={onBackPress}
          style={({ pressed }) => [styles.backButton, pressed && styles.iconPressed]}
        >
          <Text style={styles.backButtonText}>← 돌아가기</Text>
        </Pressable>
      ) : (
        // WeekView에서 사용하는 현재 날짜 표시
        <Text style={styles.headerDate}>{currentDate}</Text>
      )}
      {!showBackButton && (
        <View style={styles.headerIcons}>
          <Pressable 
            onPress={onCalendarPress} // 아이콘 클릭 시 CalendarView로 이동
            style={({ pressed }) => [
              styles.iconButton, 
              pressed && styles.iconPressed
            ]}
          >
            <Text style={styles.iconText}>📅</Text> 
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5EBE0',
  },
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  iconPressed: {
    opacity: 0.7,
  },
  iconText: {
    fontSize: 20,
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#8D6E63',
    fontWeight: '500',
  },
});
