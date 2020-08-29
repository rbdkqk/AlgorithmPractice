/* 문자열 내 p와 y의 개수 (2020.08.30) 
  
  '연습문제' 파트, 난이도 1단계  -  3분 이내 소요 

  1. 문제 설명
    
    대문자와 소문자가 섞여있는 문자열 s가 주어집니다. 
    s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 
    'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 
    단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.


  2. 제한사항

    문자열 s의 길이 : 50 이하의 자연수
    문자열 s는 알파벳으로만 이루어져 있습니다.


  3. 입출력 예
    
    s	: 'pPoooyY'	
    answer : 'true'
    
    s	: 'Pyy'	
    answer : 'false'


  4. 복잡도 계산
    - 시간복잡도 : O(n)  - s 문자열을 한바퀴 돌았으므로, n의 시간복잡도
    - 공간복잡도 : O(1)  - 값을 저장하기 위해 추가로 만든 변수는 p와 y 이며, 이 자리에 값을 계속 누적만 시키고 있으므로, 1의 시간복잡도

*/

function solution(s) {
  var answer = "";

  if (s.length % 2 === 0) {
    answer = answer + s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    answer = s[Math.floor(s.length / 2)];
  }

  return answer;
}

/* 기록해 둘 사항

  (1) match 메소드를 활용한 답안. (아래 코드)

    function numPY(s) {
      return s.match(/p/ig).length == s.match(/y/ig).length;
    }

      - p와 y가 둘 다 없을 때는 match 함수는 null을 반환하므로, 
      - 해당 match의 결과가 null일 때는 그 변수에 0을 넣어준 뒤 그 변수를 비교하는 방식으로 해결해야 예외처리를 완벽하게 할 수 있다.
      - match의(/p/ig) 와 match의(/y/ig) 로 표현된, 인자로 넣어준 부분을 공부해야 한다.


  (2) toUpperCase 및 split 을 활용한 답안. (아래 코드)

    function numPY(s){
      return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;
    } 

      - toUpperCase와 split을 하면서 시간복잡도는 결국 O(n)이 될 것 같다.
    

*/
