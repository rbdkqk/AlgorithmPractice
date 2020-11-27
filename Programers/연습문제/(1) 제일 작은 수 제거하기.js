/* 제일 작은 수 제거하기 (2020.11.27) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 내외 소요 

  1. 문제 설명
    
    정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 
    단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 
    예를 들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.


  2. 제한사항

    arr은 길이 1 이상인 배열입니다.
    인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.


  3. 입출력 예
    
    arr	: [4,3,2,1]
    return : [4,3,2]
    
    arr	: [10]
    return : [-1]


  4. 복잡도 계산
    - 시간복잡도 : O(n)  - arr 배열을 한바퀴 돌려가며 answer에 넣어줘야 함
    - 공간복잡도 : O(n)  - arr 배열에서 1개 빠졌다면, answer 배열은 arr 배열의 길이보다 1 작음
*/

function solution(arr) {
  var answer = [];
  // 가장 작은 수를 찾아서
  // arr 안의 모든 원소와 위에서 찾은 가장 작은 수를 비교해서, 다르면 answer에 push
  // length가 0이면 -1을 넣어주고, 아니면 그냥 넘어가고
  // 리턴
  let min = Math.min(...arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      answer.push(arr[i]);
    }
  }
  if (answer.length === 0) {
    answer.push(-1);
  }
  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  // 접근법 : splice를 활용하여 필요 없는(가장 작은) 위치의 값을 뽑아서 없앤다 
  // 문제점 : 이렇게 indexOf로 잡으면 조건에 일치하는 가장 앞의 index만 처리하게 된다
    // 가령, [4, 3, 2, 1, 1, 1, 1] 의 결과는 [4, 3, 2, 1, 1, 1] 이 되어버려서, 1을 다 빼내지 못함

  function solution(arr) {
    arr.splice(arr.indexOf(Math.min(...arr)), 1);
    if (arr.length < 1) return [-1];
    return arr;
  }

*/
