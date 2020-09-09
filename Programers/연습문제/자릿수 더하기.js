/* 자릿수 더하기 (2020.09.09) 
  
  '연습문제' 파트, 난이도 1단계  -  3분 내외 소요 

  1. 문제 설명
    
    자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
    예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.


  2. 제한사항

    N의 범위 : 100,000,000 이하의 자연수


  3. 입출력 예
    
    N	: 123	
    answer : 6
    
    N	: 987
    answer : 24


  4. 복잡도 계산
    - 시간복잡도 : O(n)  - 
        주어진 숫자를 강제로 문자열로 변환하고 for문을 돌리므로, 자릿수만큼 탐색해야 해서 O(n)일 듯
        숫자를 바로 처리할 수 있도록 한다면 더 나아지지 않을까?

    - 공간복잡도 : O(1)  - answer 변수는 숫자이며, 숫자에 더하여 누적시키고 있음.
*/

function solution(n) {
  var answer = 0;

  n = n + "";

  for (let i = 0; i < n.length; i++) {
    answer += Number(n[i]);
  }

  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  <reduce / parseInt 를 사용하는 방법>
    
    function solution(n){
      return (n+"").split("").reduce((acc, curr) => acc + parseInt(curr), 0)
    }

*/
