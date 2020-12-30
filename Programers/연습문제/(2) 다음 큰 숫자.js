/* 다음 큰 숫자 (2020.11.26) 
  
  '연습문제' 파트, 난이도 2단계  -  15분 
    - 2진수 구하기를 쉽게 넘겨서 짧게 끝난 것.
    - 2진수 구하는 방법을 내가 직접 구현하도록 해야 한다.


  1. 문제 설명
    
    자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.
      - 조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
      - 조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
      - 조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.

    예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.

    자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.


  2. 제한사항

    n은 1,000,000 이하의 자연수 입니다.


  3. 입출력 예
    
    n : 78 (1001110)
    result : 83 (1010011)
    
    n : 15 (1111)
    result : 23 (10111)
    

  4. 복잡도 계산
    - 시간복잡도 : ???  - while문이 얼마나 돌아갈지 모르겠음
                          count_1 함수에서 string을 1바퀴씩 돌리는데, 이게 while문 한번마다 실행되므로, 여기서 복잡도가 증가할 것임
                          convertNumber(2진수변환) 기능을 내가 직접 구현한다면, 시간복잡도가 증가할 것임

    - 공간복잡도 : O(1) - currentNextNumber 변수에 숫자를 쌓아나갈 뿐
*/

function solution(n) {
  var answer = 0;
  // n을 2진수로 바꿔서 1의 개수를 세어놓고,
  // while 반복문으로 n보다 큰 수를 하나씩 2진수로 바꿔가면서, 위에서 해놓은 숫자랑 비교해서
  // 1의 개수가 같은 숫자가 나오면 break 걸고 return;

  let numberOneCount = count_1(convertNumber(n));
  let currentNextNumber = n + 1;

  while (true) {
    if (numberOneCount === count_1(convertNumber(currentNextNumber))) {
      answer = currentNextNumber;
      break;
    } else {
      currentNextNumber++;
    }
  }
  return answer;
}

// 2진수 구하기
function convertNumber(number) {
  // 2진수 구하기를 쉽게 넘겨서 짧게 끝난 것.
  // 2진수 구하는 방법을 내가 직접 구현하도록 해야 한다.
  return number.toString(2);
}

// 1의 개수 세기
function count_1(string) {
  let result = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "1") {
      result++;
    }
  }
  return result;
}

// ===========================================================================================

/*

  쉬운 진수 변환 방법 : https://minhanpark.github.io/today-i-learned/binary-change/
    - 십진수에서 다른 진수로 변환 시킬때는 toString을 사용
    - 다른 진수에서 십진수로 변환시킬때는 parseInt를 사용

*/

// 2진수 등을 변환하는 기능을 내가 직접 만들 수 있는지 고민해야 한다.
