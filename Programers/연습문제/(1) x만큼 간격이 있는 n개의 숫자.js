/* x만큼 간격이 있는 n개의 숫자 (2020.09.10) 
  
  '연습문제' 파트, 난이도 1단계  -  15분 이내 소요 
    (14번 테스트케이스가 안풀리는데, 다른 사람들도 그런 사람들이 있는 것 같다)

  1. 문제 설명
    
    함수 solution은 정수 x와 자연수 n을 입력 받아,
    x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 
    다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.


  2. 제한사항

    x는 -10000000 이상, 10000000 이하인 정수입니다.
    n은 1000 이하인 자연수입니다.


  3. 입출력 예
    
    x	: 2
    n : 5
    answer : [2,4,6,8,10]
    
    x	: 4
    n : 3
    answer : [4,8,12]

    x	: -4
    n : 2
    answer : [-4, -8]

*/

function solution(x, n) {
  var answer = [];

  if (x === 0) {
    // 이 부분 추가해서 8번 테스트 해결함
    for (let i = 0; i < n; i++) {
      answer.push(x);
    }
  } else if (x < 0) {
    for (let i = x; i >= x * n; i = i + x) {
      answer.push(i);
    }
  } else {
    for (let i = x; i <= x * n; i = i + x) {
      answer.push(i);
    }
  }
  // 14번 테스트만 에러가 나오는데 왜이러는지 모르겠음
  return answer;
}

/* 기록해 둘 사항 

  14번 테스트케이스가 풀리지 않는데, 다른사람도 좀 그런 것 같음.

*/
