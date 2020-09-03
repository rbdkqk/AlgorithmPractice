/* 문자열을 정수로 바꾸기 (2020.09.04) 
  
  '연습문제' 파트, 난이도 1단계  -  50분 (문제 자체를 제대로 이해하지 못하여 시간이 상당히 소요됨) 

  1. 문제 설명
    
    문자열 s를 숫자로 변환한 결과를 반환하는 함수, solution을 완성하세요.


  2. 제한사항

    s의 길이는 1 이상 5이하입니다.
    s의 맨앞에는 부호(+, -)가 올 수 있습니다.
    s는 부호와 숫자로만 이루어져있습니다.
    s는 0으로 시작하지 않습니다.


  3. 입출력 예
    
    str	: '1234'	
    return : 1234

    str	: '-1234'	
    return : -1234
    

  4. 복잡도 계산

    - 시간복잡도 : O(n) - s 문자열을 splittedString 배열로 바꿔주니, s 문자열을 한바퀴 돌려야 함
    - 공간복잡도 : O(n) - s 문자열을 splittedString 배열로 바꿔주니, splittedString 배열만큼의 자리가 필요함

*/

function solution(s) {
  var answer = 0;

  let splittedString = s.split("");

  let plusMinus = 1;

  if (s[0] === "-") {
    plusMinus = -1;
    splittedString.shift();
  } else if (s[0] === "+") {
    plusMinus = 1;
    splittedString.shift();
  }

  answer = Number(splittedString.join("")) * plusMinus;

  return answer;
}
