/*  1351. Count Negative Numbers in a Sorted Matrix  //  tag : Array, Binaray Search

  Given a `m x n` matrix `grid`
    which is sorted in non-increasing order both row-wise and column-wise, 
    return the number of negative numbers in `grid`.


  Follow up: Could you find an O(n + m) solution?


  Constraints:
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 100
    -100 <= grid[i][j] <= 100


  Example 1:
    Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
    Output: 8
    Explanation: There are 8 negatives number in the matrix.

  Example 2:
    Input: grid = [[3,2],[1,0]]
    Output: 0

  Example 3:
    Input: grid = [[1,-1],[-1,-1]]
    Output: 3

  Example 4:
    Input: grid = [[-1]]
    Output: 1

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

/* 내가 제출한 코드

  시간복잡도 : O(n) : grid 배열을 1회 순회하며 각 값을 평가함
  공간복잡도 : O(1) : answer 1개 변수의 값(숫자)을 변화시켜 나갈 뿐임

  Runtime: 84 ms, faster than 50.66% of JavaScript online submissions for Count Negative Numbers in a Sorted Matrix.
  Memory Usage: 39.6 MB, less than 93.81% of JavaScript online submissions for Count Negative Numbers in a Sorted Matrix.

 */

// 일단 평소 하던대로 작성해서 성공했음
// Follow up: Could you find an O(n + m) solution? 라고 하니까, 다른 방법을 고민해 봐야 한다
var countNegatives = function (grid) {
  let answer = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] < 0) {
        answer++;
      }
    }
  }

  return answer;
};

// ======================================================================================

// Follow up: Could you find an O(n + m) solution?

// 다른 사람의 답
var countNegatives = function (grid) {
  const height = grid.length;
  const width = grid[0].length;
  let row = height - 1;
  let column = 0;
  let answer = 0;

  while (row >= 0 && column < width) {
    if (grid[row][column] >= 0) {
      column++;
    } else {
      answer += width - column;
      row--;
    }
  }
  return answer;
};

// 실패한 내 코드
var countNegatives = function (grid) {
  // inner array는 큰 수부터 작은 수 순서로 나열되어 있음
  // 0번째 inner array의 뒤부터 판단해서 최초의 음수값이 몇번째 index에 있는지 알아내고,
  // 1번째 inner array부터는 그 index부터 거꾸로만 판단하되 index값을 갱신한다
  let answer = 0;
  let lastIndex = grid[0].length - 1;
  let innerLength = grid[0].length;
  debugger;
  for (let i = 0; i < grid.length; i++) {
    for (let j = lastIndex; j >= 0; j--) {
      if (grid[i][j] >= 0) {
        answer += innerLength - (j + 1);
        lastIndex = j;
        break;
      }
    }
    continue;
  }

  return answer;
};
