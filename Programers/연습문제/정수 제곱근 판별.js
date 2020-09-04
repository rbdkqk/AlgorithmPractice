/* 정수 제곱근 판별 (2020.09.04) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 내외 소요 

  1. 문제 설명
    
    임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
    n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, 
    n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.


  2. 제한사항

    n은 1이상, 50000000000000 이하인 양의 정수입니다.


  3. 입출력 예
    
    n	: 121	
    return : 144
    
    n	: 3	
    return : -1


  4. 복잡도 계산
    - 시간복잡도 : O(1)  - 숫자의 계산을 위한 Math.pow / Math.floor 메소드만을 활용하므로, 무언가를 순회하지 않음.
    - 공간복잡도 : O(1)  - 제곱근 pow, 거기서 소수점을 버린 값, 답을 위한 answer 3개만 활용함.
*/

function solution(n) {
  var answer = 0;

  let pow = Math.pow(n, 0.5);

  if (pow === Math.floor(pow)) {
    answer = (pow + 1) * (pow + 1);
  } else {
    answer = -1;
  }

  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  (1) while 반복문 안에서, x를 하나하나 늘려가며 x*x와 n을 비교하는 방식

  (2) Math.sqrt() 메소드를 활용하는 방식

  (3) Number.isInteger() 메소드를 활용하는 방식

  (4) parseInt 를 활용하는 방식

*/
