  import { Pressable, Text, StyleSheet } from 'react-native'; 

// AddButton 컴포넌트: 메모 추가를 위한 플로팅 액션 버튼
  export default function AddButton({ onPress }) {
    return (
      <Pressable 
        style={({ pressed }) => [
          styles.addButton, 
          pressed && styles.addButtonPressed
        ]} 
        onPress={onPress} // 버튼 클릭 시 상위 컴포넌트의 핸들러 실행 (모달 열기)
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    addButton: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#D7A86E',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#5D4037',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    addButtonPressed: {
      backgroundColor: '#C29958',
    },
    addButtonText: {
      fontSize: 32,
      color: '#FFFFFF',
      fontWeight: '300',
    },
  });
