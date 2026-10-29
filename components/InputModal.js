import { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native'; 

// InputModal 컴포넌트: 메모 추가 및 수정을 위한 입력 모달
export default function InputModal({ visible, onClose, initialContent, onSubmit, onDelete, isEditing }) {
  // 모달 내부에서 사용자가 입력하는 텍스트 상태
  const [text, setText] = useState(initialContent || '');

  // 모달이 열리거나 initialContent가 변경될 때 텍스트 상태를 초기화/업데이트
  useEffect(() => {
    setText(initialContent || '');
  }, [visible, initialContent]);

  // 추가 or 수정 버튼 클릭 시 실행
  const handleSubmit = () => {
    if (text.trim()) { // 텍스트가 공백이 아닐 경우에만
      onSubmit(text); // 상위 컴포넌트(WeekView)의 추가/수정 함수 호출 후 텍스트 전달
      setText(''); // 입력 필드 초기화
    }
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={true}
      onRequestClose={onClose} // 뒤로 가기 버튼 처리
    >
      <Pressable 
        style={styles.modalContainer}
        onPress={onClose} 
      >
        <Pressable style={styles.modalContent} onPress={() => {}}> 
          <Text style={styles.modalTitle}>{isEditing ? '메모 수정' : '새 메모'}</Text> 
          <TextInput
            style={styles.modalInput}
            value={text}
            onChangeText={setText} // 입력 시 텍스트 상태 업데이트
            multiline
            autoFocus
            placeholder="메모를 입력하세요..."
            placeholderTextColor="#A1887F"
          />
          <View style={styles.modalButtons}>
            <Pressable 
              style={({ pressed }) => [
                styles.modalButton, 
                styles.modalButtonPrimary, 
                pressed && styles.modalButtonPrimaryPressed
              ]} 
              onPress={handleSubmit}
            >
              <Text style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>
                {isEditing ? '수정' : '추가'}
              </Text>
            </Pressable>
            
            {isEditing && (
              <Pressable 
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.deleteButton,
                  pressed && styles.deleteButtonPressed
                ]} 
                onPress={onDelete} // 상위 컴포넌트의 삭제 함수 호출
              >
                <Text style={[styles.modalButtonText, styles.deleteButtonText]}>삭제</Text>
              </Pressable>
            )}
            
            <Pressable 
              style={({ pressed }) => [
                styles.modalButton, 
                pressed && styles.modalButtonPressed
              ]} 
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>취소</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#5D4037',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 8,
    padding: 12,
    minHeight: 200,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    color: '#5D4037',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#EFEBE9',
  },
  modalButtonPrimary: {
    backgroundColor: '#D7A86E',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  modalButtonPressed: {
    opacity: 0.7,
  },
  modalButtonPrimaryPressed: {
    backgroundColor: '#C29958',
  },
  deleteButtonPressed: {
    backgroundColor: '#FFCDD2',
  },
  modalButtonText: {
    fontSize: 14,
    color: '#8D6E63',
  },
  modalButtonTextPrimary: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#D84315',
    fontWeight: '600',
  },
});
