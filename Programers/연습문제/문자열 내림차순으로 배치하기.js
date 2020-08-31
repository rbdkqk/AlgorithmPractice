/* 문자열 내림차순으로 배치하기 (2020.09.01) 
  
  '연습문제' 파트, 난이도 1단계  -  50분 (문제 자체를 제대로 이해하지 못하여 시간이 상당히 소요됨) 

  1. 문제 설명
    
    문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
    s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

  2. 제한사항

    str은 길이 1 이상인 문자열입니다.


  3. 입출력 예
    
    s	: 'Zbcdefg'	
    return : 'gfedcbZ'
    

  4. 복잡도 계산

    - 시간복잡도 : O(nlogn) -  (참고링크 : https://falsy.me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-3-%EC%A0%95%EB%A0%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-1/)
          v8엔진에서(크롬) 자바스크립트의 .sort() 메소드는 퀵 정렬로 구현되어 있음. 
          최악의 경우 시간 복잡도는 O(n2)가 되는데, 그럴 확률이 정말 낮으므로, 예외적으로 O(nlogn)으로 이야기 한다고 한다.

    - 공간복잡도 : O(n)  - 
          splittedString 라는 배열을 만들어서 s 문자열을 분할한 뒤 정렬하므로, n만큼의 공간을 차지할 것으로 생각함.
          그러나, sort() 메소드나 reverse(), reduce() 메소드 역시 공간복잡도의 계산에 넣어야 할 것인데, 이 부분은 잘 모르겠음.

*/

function solution(s) {
  var answer = "";

  let splittedString = s.split("");

  answer = splittedString
    .sort()
    .reverse()
    .reduce((acc, cur) => (acc = acc + cur));

  return answer;
}
