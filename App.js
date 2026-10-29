import { useState } from 'react';
import WeekView from './screens/WeekView';
import CalendarView from './screens/CalendarView';

// 모든 컴포넌트에서 재사용할 수 있도록 날짜를 'YYYY-MM-DD' 형식으로 변환하는 유틸리티 함수 export
export const formatDateKey = (date) => {
  const year = date.getFullYear();
  // 월은 0부터 시작하므로 +1, padStart 이용해 항상 두 자리로 (01)
  const month = String(date.getMonth() + 1).padStart(2, '0');
  // 일자 추출하고 항상 두 자리로 (05)
  const day = String(date.getDate()).padStart(2, '0');
  // 최종적으로 메모 필터링하는 데 사용할 고유한 날짜 키 반환
  return `${year}-${month}-${day}`;
};

// 최상위 컴포넌트: 모든 상태 관리, 화면 분기
export default function App() {
  // 현재 어떤 화면(Week, Calendar)을 보여줄지 결정하는 상태
  const [currentScreen, setCurrentScreen] = useState('Week');
  // 모든 메모 데이터를 저장하는 중앙 상태. 메모 추가/수정/삭제 시 setMemos 사용
  const [memos, setMemos] = useState([]);
  
  // 현재 사용자가 보고 있는 날짜 저장하는 상태 (Date 객체 전체 사용)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // CalendarView에서 특정 날짜 선택 시 실행되는 핸들러 함수
  const handleDateSelect = (newDate) => {
    // 선택된 날짜로 상태 업데이트
    setSelectedDate(newDate);
    // 날짜 선택 후 자동으로 WeekView 화면으로 이동
    setCurrentScreen('Week');
  };

  // 조건부 렌더링: currentSCreen 상태에 따라 보여줄 컴포넌트 결정
  if (currentScreen === 'Calendar') {
    return (
      <CalendarView 
        // 뒤로 가기 버튼 클릭 시 WeekView로 돌아가도록 상태 변경 함수 전달
        onBack={() => setCurrentScreen('Week')}
        memos={memos}
        // 달력에서 날짜 클릭 시 실행할 함수 전달
        onDateSelect={handleDateSelect}
      />
    );
  }
  // 기본값: currentScreen이 Week일 때 WeekView 렌더링
  return (
    <WeekView 
      // 달력 버튼 클릭시 CalendarView로 이동하는 함수 전달
      onNavigateToCalendar={() => setCurrentScreen('Calendar')}
      // 모든 메모 데이터, 상태 변경 함수 WeekView에 전달
      memos={memos}
      setMemos={setMemos}
      // 현재 선택된 날짜 정보, 날짜 변경 함수 전달
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}
