/*  0328 Mock Interview : 59. (medium) Spiral Matrix II  // tag : Array

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

// 다른 사람의 코드 : Clean JavaScript solution

// Reference from a similar question
// https://leetcode.com/problems/spiral-matrix/discuss/20573/A-concise-C++-implementation-based-on-Directions

// When traversing the matrix in the spiral order, at any time we follow one out of the following four directions:
// RIGHT DOWN LEFT UP. Suppose we are working on a 5 x 3 matrix as such:
// 0  1  2  3  4  5
//    6  7  8  9 10
//   11 12 13 14 15
//
// Imagine a cursor starts off at (0, -1), i.e. the position at '0', then we can achieve the spiral order by doing
// the following:
// 1. Go right 5 times
// 2. Go down 2 times
// 3. Go left 4 times
// 4. Go up 1 times.
// 5. Go right 3 times
// 6. Go down 0 times -> quit

const generateMatrix = (n) => {
  const matrix = [...Array(n)].map(() => Array(n).fill(null));
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // right, down, left, up
  const steps = [n, n - 1];

  let num = 1;
  let dir = 0;
  let x = 0;
  let y = -1;

  while (steps[dir % 2] > 0) {
    for (let i = 0; i < steps[dir % 2]; i++) {
      x += dirs[dir][0];
      y += dirs[dir][1];
      matrix[x][y] = num++;
    }

    steps[dir % 2]--;
    dir = (dir + 1) % 4;
  }
  return matrix;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript easy to read.
// Still O(n^2) like all other solutions posted.
// Not the fastest if you look at the ms timer on leetcode but I think it's easier to follow and it is self documenting.

// 다 알겠는데, `if (grid[ni]?.[nj] !== true)` 에서 ?. 이 부분은 무슨 뜻인지 전혀 모르겠다
const generateMatrix = function (n) {
  const getNextDirection = (currDir) => {
    const nextDir = {
      e: 's',
      s: 'w',
      w: 'n',
      n: 'e',
    };
    return nextDir[currDir];
  };

  const getNextIndex = (i, j, direction) => {
    const nextIndex = {
      e: [i, j + 1],
      s: [i + 1, j],
      w: [i, j - 1],
      n: [i - 1, j],
    };
    return nextIndex[direction];
  };

  const grid = Array(n)
    .fill(0)
    .map((row) => Array(n).fill(true));

  let counter = 1;
  let direction = 'e';
  let i = 0;
  let j = 0;

  while (counter <= n * n) {
    grid[i][j] = counter;
    let [ni, nj] = getNextIndex(i, j, direction);

    if (grid[ni]?.[nj] !== true) {
      direction = getNextDirection(direction);
      [ni, nj] = getNextIndex(i, j, direction);
    }

    i = ni;
    j = nj;
    counter += 1;
  }

  return grid;
};
