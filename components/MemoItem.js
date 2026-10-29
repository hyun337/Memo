import { View, Text, StyleSheet, Pressable } from 'react-native'; 

// MemoItem 컴포넌트: 타임라인의 메모 하나를 표시하는 UI
export default function MemoItem({ time, content, onSelect }) { 
  return (
    <View style={styles.memoItemContainer}>
      <Text style={styles.memoTime}>{time}</Text>
      <Pressable 
        onPress={onSelect} // 메모 내용 클릭 시 onSelect 함수 실행 (수정 모드 진입)
        style={({ pressed }) => [
          styles.memoBubble,
          pressed && styles.memoBubblePressed 
        ]}
      >
        <Text style={styles.memoContent}>{content}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  memoItemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  memoTime: {
    fontSize: 12,
    color: '#A1887F',
    marginRight: 8,
    marginTop: 4,
  },
  memoBubble: {
    backgroundColor: '#EFEBE9',
    borderRadius: 16,
    padding: 12,
    maxWidth: '80%',
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memoBubblePressed: {
    opacity: 0.7,
  },
  memoContent: {
    fontSize: 14,
    color: '#5D4037',
    lineHeight: 20,
  },
});
