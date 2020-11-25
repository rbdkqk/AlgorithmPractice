/* 2016년 (2020.11.25) 
  
  '연습문제' 파트, 난이도 1단계  -  20분 내외 소요 


  1. 문제 설명
    
    2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 
    요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT 입니다. 
    예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 TUE를 반환하세요.


  2. 제한사항

    2016년은 윤년입니다.
    2016년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)


  3. 입출력 예
    
    a : 5
    b : 24
    result : 'TUE'


  4. 복잡도
    (1) 시간복잡도 : O(n) - daysOfMonth 배열을 1번 순회하며 sumOfdays에 한달의 날짜들을 누적시킴
    (2) 공간복잡도 : O(1) - 답을 내기 위해 주어져 있는 sumOfdays 변수에, 값을 누적시키기 때문에 별도 공간이 소요되지 않음.

*/

function solution(a, b) {
  // 09:00 ~ 09:20
  // 총 날짜를 계산하고, 7로 나눠서 나머지로 처리한다
  // 1월 1일이 금요일이므로, 나머지가 0이면 금요일로 처리(?)
  // (가령, 1월 8일 : 7일 추가된 결과임. 7로 나누면 나머지 0)
  let daysOfMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dayOfWeek = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];

  let sumOfdays = 0;
  for (let i = 0; i < a; i++) {
    sumOfdays = sumOfdays + daysOfMonth[i];
  }
  return dayOfWeek[(sumOfdays + (b - 1)) % 7];
}
