/* 문자열 다루기 기본 (2020.09.02) 
  
  '연습문제' 파트, 난이도 1단계  -  15분


  1. 문제 설명
    
    문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 
    예를 들어 s가 a234이면 False를 리턴하고 1234라면 True를 리턴하면 됩니다.


  2. 제한사항

    s는 길이 1 이상, 길이 8 이하인 문자열입니다.


  3. 입출력 예
    
    s	: 'a234'	
    return : false

    s : '1234"
    return : true
    

  4. 복잡도 계산

    - 시간복잡도 : O(n) -  s 문자열을 한바퀴 반복문 돌리니까 n의 시간복잡도

    - 공간복잡도 : O(1) -  새로운 변수를 선언하거나 값을 판단하는 내용이 딱히 없고 단순함. 
          
*/

function solution(s) {
  var answer = true;

  let sLength = s.length;

  if (sLength === 4 || sLength === 6) {
    answer = true;
  } else {
    answer = false;
  }

  for (let i = 0; i < sLength; i++) {
    if (isNaN(s[i])) {
      answer = false;
      break;
    }
  }

  return answer;
}

/* 공부할 사항

  isNaN 함수를 활용해야 NaN 여부를 파악해야 한다
  if ( value === NaN ) 이런 방식으로 판단이 되지 않음

*/
