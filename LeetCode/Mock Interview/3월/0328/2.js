/*  0328 Mock Interview :   // tag : 

  Given a positive integer n, 
    generate an n x n matrix filled with elements from 1 to n2 in spiral order.


  Constraints:
    1 <= n <= 20


  Example 1:
    Input: n = 3
    Output:  [[1,2,3],
              [8,9,4],
              [7,6,5]]

  Example 2:
    Input: n = 1
    Output: [[1]]

*/

/**
 * @param {number} n
 * @return {number[][]}
 */

// 실패 : 조건에 따라 방향을 바꿔가며 i, j 값을 변경하면 될 것 같은데, 논리를 구성하지 못함
var generateMatrix = function (n) {
  if (n === 1) {
    return [[1]];
  }

  let answer = [];

  for (let i = 0; i < n; i++) {
    answer.push([]);
  }

  let i = 0;
  let j = 0;

  let direction = 1;

  let currentNumber = 1;

  while (i < n && j < n) {
    answer[i][j] = currentNumber;

    currentNumber++;

    if (direction === 1) {
      if (i < n - direction) {
        i++;
      } else {
        j++;
      }

      if (i === j) {
        direction *= -1;
      }

      continue;
    }

    if (direction === -1) {
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 :
