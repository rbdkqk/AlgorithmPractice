/* 수박수박수박수박수박수? (2020.09.03)
  
  '연습문제' 파트, 난이도 1단계  -  5분

  1. 문제 설명
    
    길이가 n이고, 수박수박수박수....와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 
    예를들어 n이 4이면 수박수박을 리턴하고 3이라면 수박수를 리턴하면 됩니다.


  2. 제한사항

    n은 길이 10,000이하인 자연수입니다.


  3. 입출력 예
    
    n	: 3	
    return : "수박수"

    n	: 4	
    return : "수박수박"
    

  4. 복잡도 계산

    - 시간복잡도 : O(n)  -  1부터 n끼지 반복문을 돌리므로, O(n)  
    - 공간복잡도 : O(1)  -  answer 하나의 변수에 계속 누적시키므로, O(1)

*/

function solution(n) {
  var answer = "";

  for (let i = 1; i <= n; i++) {
    if (i % 2 !== 0) {
      answer = answer + "수";
    } else {
      answer = answer + "박";
    }
  }

  return answer;
}
