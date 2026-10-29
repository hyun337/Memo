import { ScrollView, StyleSheet } from 'react-native';
import MemoItem from './MemoItem';

// MemoList 컴포넌트: 필터링된 메모 배열을 받아 목록 형태로 렌더링
export default function MemoList({ memos, onSelect }) {
  return (
    <ScrollView 
      style={styles.memoList} 
      contentContainerStyle={styles.memoListContent}
    >
      {memos.map((memo) => (
        <MemoItem 
          key={memo.id} // 메모 객체의 고유 ID를 key로 사용
          time={memo.time} 
          content={memo.content} 
          onSelect={() => onSelect(memo)} // 메모 클릭 시 해당 메모 객체를 상위 컴포넌트로 전달
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  memoList: {
    flex: 1,
  },
  memoListContent: {
    padding: 16,
    paddingBottom: 80, 
  },
});
