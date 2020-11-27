/* 정수 내림차순으로 배치하기 (2020.11.27) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 내외 소요 

  1. 문제 설명
    
    함수 solution은 정수 n을 매개변수로 입력받습니다. 
    n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 
    예를 들어 n이 118372면 873211을 리턴하면 됩니다.


  2. 제한사항

    n은 1이상 8000000000 이하인 자연수입니다.


  3. 입출력 예
    
    n	: 118372
    return : 873211
    


  4. 복잡도 계산
    - 시간복잡도 : O(nlogn)  - split 배열을 sort를 통해 정렬해야 한다. 자바스크립트는 퀵정렬로 구성되어 있다고 한다. 
                              - sort 안에서 조건을 주고 있는데, 이렇게 해도 퀵정렬일까?
                              - join 단계에서도 split 배열을 한바퀴 다 돌아야 하는 것 같다. 

    - 공간복잡도 : O(n)  - split 배열을 만들어야 하고 이 배열의 길이는 n의 자릿수와 같을 것임

*/

function solution(n) {
  return Number(
    String(n)
      .split("")
      .sort((a, b) => Number(b) - Number(a))
      .join("")
  );
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  function solution(n) {
    const newN = n + "";
    const newArr = newN.split("").sort().reverse().join("");

    return +newArr;
  }


  // return +newArr;  부분에 관하여, "단항 연산자 + 를 사용하여 값을 숫자로 변환 할 수도 있습니다"
  // + '42';   // 42
  // + '010';  // 10
  // + '0x10'; // 16  // 이건 무슨 뜻일까? 16진수인가?
  

*/

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  function solution(n) {
    return parseInt((n+"").split("").sort().reverse().join(""));
  }

*/
