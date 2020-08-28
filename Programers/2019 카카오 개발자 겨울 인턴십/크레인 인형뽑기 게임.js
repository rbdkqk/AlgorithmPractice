/* 크레인 인형뽑기 게임 (2020.08.29) 
  
    '2019 카카오 개발자 겨울 인턴십' 파트, 난이도 1단계  -  의사코드 작성 포함, 50분 내외 소요


  1. 문제 설명 

    (그림이 있으므로, 링크를 달아 둠)
    (https://programmers.co.kr/learn/courses/30/lessons/64061)
    
    인형뽑기 기계에서 크레인으로 인형을 뽑아다가, 새로운 바구니에 쌓아나감.
    바구니에 같은 인형이 연속 2개 들어가면, 같은 모양 인형 2개가 없어짐.


  2. 제한사항

    board 배열은 2차원 배열로 크기는 5 x 5 이상 30 x 30 이하입니다.
    board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
    0은 빈 칸을 나타냅니다.
    1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
    moves 배열의 크기는 1 이상 1,000 이하입니다.
    moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.



  3. 입출력 예
    
    board	: [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]]	
    moves : [1,5,3,5,1,2,1,4]
    result : 4


  4. 복잡도 계산
    - 시간복잡도 : O(n^2)  (처리를 위해, n X n 의 2차원 배열을 (2회) 순환하게 되므로...)
    - 공간복잡도 : O(n^2)  (처리를 위해, n X n 의 2차원 배열을 새롭게 만들게 되므로...)
*/

function solution(board, moves) {
  var answer = 0;

  let rotatedBoard = [];

  for (let i = 0; i < board.length; i++) {
    let innerBoard = [];
    for (let j = 0; j < board[i].length; j++) {
      innerBoard[j] = board[j][i];
    }
    rotatedBoard.push(innerBoard);
  }

  let bucket = [];

  for (let k = 0; k < moves.length; k++) {
    for (let l = 0; l < rotatedBoard[moves[k] - 1].length; l++) {
      if (rotatedBoard[[moves[k] - 1]][l] === 0) {
        continue;
      } else {
        if (rotatedBoard[[moves[k] - 1]][l] !== bucket[bucket.length - 1]) {
          bucket.push(rotatedBoard[[moves[k] - 1]][l]);
        } else {
          bucket.pop();
          answer = answer + 2;
        }
        rotatedBoard[[moves[k] - 1]][l] = 0;
        break;
      }
    }
  }

  return answer;
}
