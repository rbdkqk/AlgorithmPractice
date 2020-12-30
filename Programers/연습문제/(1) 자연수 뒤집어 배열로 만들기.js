/* 자연수 뒤집어 배열로 만들기 (2020.11.26) 
  
  '연습문제' 파트, 난이도 1단계  -  3분 내외 소요 

  1. 문제 설명
    
    자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 
    예를 들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.


  2. 제한사항

    n은 10,000,000,000이하인 자연수입니다.


  3. 입출력 예
    
    N	: 123	
    answer : 6
    
    N	: 987
    answer : 24


  4. 복잡도 계산
    - 시간복잡도 : O(n)  - 
        주어진 숫자를 강제로 문자열로 변환하고 for문을 돌리므로, 자릿수만큼 탐색해야 해서 O(n)일 듯
        숫자를 바로 처리할 수 있도록 한다면 더 나아지지 않을까? (나눠서 나머지를 처리하는 방법이 있지 않을까? 라고 생각만 해 봄)

    - 공간복잡도 : O(n)  - answer 와 array 변수는 배열이며, n 숫자가 늘어날수록 이 두 배열도 길어질 것임
*/

function solution(n) {
  var answer = [];
  let array = String(n).split("");

  for (let i = array.length - 1; i >= 0; i--) {
    answer.push(Number(array[i]));
  }

  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  function solution(n) {
  // 문자풀이
  // return (n+"").split("").reverse().map(v => parseInt(v));

  // 숫자풀이
  var arr = [];

  do {
      arr.push(n%10);
      n = Math.floor(n/10);
  } while (n>0);

  return arr;
}

*/

function solution(number, k) {
  var answer = "";
  // 큰 순서대로 재배열해서 풀려고 했는데 실패한다
  // 지금 있는 순서를 유지해야 하는 듯
  // 1개씩 지워나가면서, '그 때의 가장 큰 수'와 '하나 줄인 k를 재귀 연산'에 넣고 다시 돌린다
  let duplicatedNumber = number;
  let duplicatedK = k;
  while (duplicatedK > 0) {
    let duplicatedNumberArray = duplicatedNumber.split("");
    let array = [];

    for (let i = 0; i < duplicatedNumberArray.length; i++) {
      array.push(
        Number(
          duplicatedNumberArray
            .slice(0, i)
            .concat(duplicatedNumberArray.slice(i + 1))
            .join("")
        )
      );
    }

    duplicatedNumber = Math.max.apply(null, array);
    duplicatedK--;
    if (duplicatedK === 0) {
      answer = String(duplicatedNumber);
    }
  }

  return answer;
}
