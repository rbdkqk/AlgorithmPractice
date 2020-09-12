/* 평균 구하기 (2020.09.12) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 이내 소요 

  1. 문제 설명
    
    정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.


  2. 제한사항

    arr은 길이 1 이상, 100 이하인 배열입니다.
    arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.


  3. 입출력 예
    
    arr	: [1,2,3,4]	
    return : 2.5

    arr	: [5,5]
    return : 5


  4. 복잡도
    (1) 시간복잡도 : O(n) - arr 배열을 1번 순회하며 reduce 처리하기 때문
    (2) 공간복잡도 : O(1) - 답을 내기 위해 주어져 있는 answer 변수에, 값을 누적시키기 때문에 별도 공간이 소요되지 않음.

*/

function solution(arr) {
  var answer = 0;
  return (answer = arr.reduce((a, b) => a + b) / arr.length);
}
