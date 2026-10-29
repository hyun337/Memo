import { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import WeekDays from '../components/WeekDays';
import MemoList from '../components/MemoList';
import AddButton from '../components/AddButton';
import InputModal from '../components/InputModal';
import { formatDateKey } from '../App';

// WeekView 컴포넌트: 주간 뷰의 모든 로직, UI 담당
export default function WeekView({ onNavigateToCalendar, memos, setMemos, selectedDate, setSelectedDate }) {
  // 메모 추가/수정 모달의 표시 여부 관리하는 상태
  const [modalVisible, setModalVisible] = useState(false);
  // 수정할 메모 있을 경우 해당 메모 객체 저장하는 상태 (새 메모 추가 시에는 null)
  const [selectedMemo, setSelectedMemo] = useState(null);

  // 현재 선택된 날짜 정보를 '월 일 (요일)' 형식의 문자열로 반환하는 유틸리티 함수
  const getCurrentDate = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = selectedDate.getMonth() + 1;
    const date = selectedDate.getDate();
    const dayOfWeek = days[selectedDate.getDay()]; 
    
    return `${month}월 ${date}일 (${dayOfWeek})`;
  };
  
  // 새 메모 추가 처리 함수 
  const handleAddMemo = (content) => {
    const now = new Date();
    // 시:분 형식으로 시간 자동 기록 (자동 타임스탬프)
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const dateKey = formatDateKey(selectedDate); 
    
    // 새로운 메모 객체 생성
    const newMemo = {
      id: Date.now(), // 고유 ID (밀리초 사용)
      time: time,     
      content: content,
      dateKey: dateKey  // 이 키를 통해 날짜별로 메모 분류/필터링
    };
    
    // App.js의 memos 배열에 새 메모 추가해 상태 업데이트
    setMemos([...memos, newMemo]);
    setModalVisible(false); // 모달 닫기
  };

  // 메모 삭제 처리 ㅎ마수
  const handleDeleteMemo = (idToDelete) => {
    // 삭제할 ID와 일치하지 않는 메모만 남기고 배열 필터링해 상태 업데이트
    setMemos(memos.filter(memo => memo.id !== idToDelete));
    setModalVisible(false);
    setSelectedMemo(null);
  };
  
  // 메모 수정 처리 함수
  const handleEditMemo = (newContent) => {
    if (!selectedMemo) return; // 수정 대상 메모가 없으면 종료
    
    // memos 배열 순회하며 ID가 일치하는 메모의 content만 업데이트해 상태 변경
    setMemos(memos.map(memo => 
      memo.id === selectedMemo.id 
        ? { ...memo, content: newContent } 
        : memo
    ));
    
    setModalVisible(false);
    setSelectedMemo(null);
  };

  //MemoItem 클릭 시 실행되는 함수 (수정 모드로 전환)
  const handleMemoPress = (memo) => {
    setSelectedMemo(memo); // 선택된 메모를 상태에 저장
    setModalVisible(true); // 모달 열기 (수정 모드)
  };
  
  // '+' 버튼 클릭 시 실행되는 함수 (추가 모드로 전환)
  const handleAddButtonPress = () => {
    setSelectedMemo(null); // 새 메모 추가이므로 selectedMemo를 null로 설정
    setModalVisible(true); // 모달 열기 (추가 모드)
  };

  // 현재 선택된 날짜의 메모만 필터링
  const currentDateKey = formatDateKey(selectedDate); // 현재 날짜의 Date Key 생성
  // 전체 메모 배열에서 dateke가 현재 날짜의 키와 일치하는 메모만 추출
  const filteredMemos = memos.filter(memo => memo.dateKey === currentDateKey);

  // UI 렌더링 부분
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        currentDate={getCurrentDate()}  // 현재 날짜 문자열을 Header에 전달
        onCalendarPress={onNavigateToCalendar} // CalendarView로 이동하는 함수 전달
        showBackButton={false}
      />
      <WeekDays 
        selectedDay={selectedDate.getDay()} // 현재 선택된 요일 인덱스 전달 (0=일요일)
        onDaySelect={(dayIndex) => {
          // 요일 탭 클릭 시 날짜 업데이트하는 로직
          const newDate = new Date(selectedDate); // 현재 요일과의 차이 계산
          const diff = dayIndex - selectedDate.getDay(); // 날짜를 해당 요일로 변경
          newDate.setDate(selectedDate.getDate() + diff);
          setSelectedDate(newDate); //App.js의 상태 변경 함수 호출
        }} 
      />
      <MemoList 
        memos={filteredMemos}  // 필터링된 메모만 List에 전달
        onSelect={handleMemoPress} // 메모 항목 클릭 시 실행될 함수 전달
      />
      <AddButton onPress={handleAddButtonPress} />
      
      <InputModal
        visible={modalVisible}
        initialContent={selectedMemo?.content || ''} // 수정 모드면 기존 내용, 아니면 빈 문자열
        onClose={() => {
          setModalVisible(false);
          setSelectedMemo(null);
        }}
        // selectedMemo가 잇으면 수정(handleEditMemo), 없으면 추가 (handleAddMemo) 로직 실행
        onSubmit={selectedMemo ? handleEditMemo : handleAddMemo}
        // 수정 모드일 때만 삭제 함수 전달
        onDelete={selectedMemo ? () => handleDeleteMemo(selectedMemo.id) : null}
        isEditing={!!selectedMemo} // 선택된 메모가 있으면 true (수정 모드)
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
});
