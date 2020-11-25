/* 삼각 달팽이 (2020.10.17) 
  
  '월간 코드 챌린지 시즌1' 파트, 난이도 2단계  -  60분 손대고 못풀어서 다른 사람 답 참고함


  1. 문제 설명
    
    정수 n이 매개변수로 주어집니다. 
    다음 그림과 같이 밑변의 길이와 높이가 n인 삼각형에서 맨 위 꼭짓점부터 반시계 방향으로 달팽이 채우기를 진행한 후, 
    첫 행부터 마지막 행까지 모두 순서대로 합친 새로운 배열을 return 하도록 solution 함수를 완성해주세요.


  2. 제한사항

    n은 1 이상 1,000 이하입니다.


  3. 입출력 예
    
    n	// result
    4	// [1,2,9,3,10,8,4,5,6,7]
    5	// [1,2,12,3,13,11,4,14,15,10,5,6,7,8,9]
    6	// [1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]
    

  4. 복잡도 계산
    - 시간복잡도 : O(n^2)  - 

    - 공간복잡도 : O(n)  - 

*/

function solution(n) {
  var answer = [];

  let arr = [];

  // 빈 칸들로 구성된 이중배열 arr을 생성한다
  for (let i = 0; i < n; i++) {
    let innerArr = [];
    for (let j = 0; j < i + 1; j++) {
      innerArr.push(0);
    }
    arr.push(innerArr);
  }

  let max = (n * (n + 1)) / 2; // 총 개수

  let top = 0; //상단
  let left = 0; //좌측
  let bottom = n - 1; //하단
  let right = n - 1; //우측

  let value = 1;

  while (max >= value) {
    // 하단이동
    for (let i = top; i <= bottom; i++) {
      if (max < value) break;
      arr[i][left] = value++;
    }

    if (max < value) {
      break;
    }

    top++;
    left++;

    // 우측이동
    for (let j = left; j <= right; j++) {
      if (max < value) break;
      arr[bottom][j] = value++;
    }

    if (max < value) {
      break;
    }

    bottom--;
    right--;

    let index = right;

    //상단 이동
    for (let i = bottom; i >= top; i--) {
      if (max < value) {
        break;
      }
      arr[i][index--] = value++;
    }

    top++;
    right--;
  } // while 반복문은 여기까지

  let index = 0;

  // 위와 같이 정리된 이중배열 arr을 answer에 하나하나 넣어줌
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      answer[index++] = arr[i][j];
    }
  }

  return answer;
}

/* 기록해 둘 사항

  혼자 못 풀어서 다른 분의 코드를 참고함 - 그나마도 자바스크립트는 없어서 자바 보고 참고함

    - https://youngest-programming.tistory.com/402
        1. 먼저 4개의 인덱스 top(상단), left(좌측), bottom(하단), right(우측) 을 세팅합니다.
        2. 최대크기만큼 value를 채웠다면 break합니다.
        3. 가장 상단에 있는 가장 짧은 상태입니다. 하단이동 탐색을 합니다. top인덱스 -> bottom인덱스 까지 value 를 넣어줍니다. 다 넣어준 후 해당 top은 다 탐색한게 되므로 top++ 해주고 첫번째 인덱스도 다 탐색한게 되므로 left++ 해줍니다.
        4. 가장 밑바닥에 있는 가장 긴 상태입니다. 우측이동 탐색을 합니다. left인덱스 -> right 인덱스까지 value를 넣어줍니다. 다 넣어준 후 해당 bottom은 다 탐색한게 되므로 bottom-- 해주고 가장 마지막 right 인덱스도 다 탐색한게 되므로 right-- 해줍니다. 
        5. 상단 이동 탐색을 합니다. bottom 인덱스 -> top 인덱스까지 value를 넣어줍니다. 다 넣어준 후 가장 상단까지 탐색한 이후이므로 top++ 해주고 가장 큰 right도 탐색한게 되므로 right--를 해줍니다.
        6. 이것들을 2의 조건이 될때까지 반복합니다.

    - https://velog.io/@delay/programmers68645
    - https://limjun92.github.io/programmers_algorithm/%EC%82%BC%EA%B0%81-%EB%8B%AC%ED%8C%BD%EC%9D%B4/

*/

/*  답을 제출한 뒤 다른 사람이 제출한 답을 보고 아래에 남겨 둠

function solution(n) {
  let a = Array(n)
    .fill()
    .map((_, i) => Array(i + 1).fill());

  let row = -1;
  let col = 0;
  let fill = 0;

  for (let i = n; i > 0; i -= 3) {
    a[++row][col] = ++fill;

    for (let j = 0; j < i - 1; j++) {
      a[++row][col] = ++fill;
    }

    for (let j = 0; j < i - 1; j++) {
      a[row][++col] = ++fill;
    }

    for (let j = 0; j < i - 2; j++) {
      a[--row][--col] = ++fill;
    }
  }

  return a.flat();
}

*/
