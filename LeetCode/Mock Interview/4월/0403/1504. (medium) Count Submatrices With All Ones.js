/*  0403 Mock Interview : 1504. (medium) Count Submatrices With All Ones  //  tag : Dynamic Programming

  Given a rows * columns matrix `mat` of ones and zeros, 
    return how many submatrices have all ones.


  Constraints:
    1 <= rows <= 150
    1 <= columns <= 150
    0 <= mat[i][j] <= 1


  Example 1:
    Input: mat = [[1,0,1],
                  [1,1,0],
                  [1,1,0]]
    Output: 13
    Explanation:
      There are 6 rectangles of side 1x1.
      There are 2 rectangles of side 1x2.
      There are 3 rectangles of side 2x1.
      There is 1 rectangle of side 2x2. 
      There is 1 rectangle of side 3x1.
      Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.

  Example 2:
    Input: mat = [[0,1,1,0],
                  [0,1,1,1],
                  [1,1,1,0]]
    Output: 24
    Explanation:
      There are 8 rectangles of side 1x1.
      There are 5 rectangles of side 1x2.
      There are 2 rectangles of side 1x3. 
      There are 4 rectangles of side 2x1.
      There are 2 rectangles of side 2x2. 
      There are 2 rectangles of side 3x1. 
      There is 1 rectangle of side 3x2. 
      Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.

  Example 3:
    Input: mat = [[1,1,1,1,1,1]]
    Output: 21

  Example 4:
    Input: mat = [[1,0,1],
                  [0,1,0],
                  [1,0,1]]
    Output: 5

*/

/**
 * @param {number[][]} mat
 * @return {number}
 */

// 실패 : 3월 1일에 만났던 문제인데, 그때도 오늘도 손도 대지 못함. 아이디어 자체가 떠오르질 않는다.
var numSubmat = function (mat) {};

// ======================================================================================

// 다른 사람의 코드 : Javascript with explanation - O(N^4)O(1) -> O(N^3)O(N^2) -> O(N^3)O(N) -> O(N^2)O(N)
// 참고 : https://leetcode.com/problems/count-submatrices-with-all-ones/discuss/720265/Java-Detailed-Explanation-From-O(MNM)-to-O(MN)-by-using-Stack.
// 봐도 잘 모르겠다

// O(n^4) time // O(1) space
var numSubmatBrute = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let ele = mat[i][j];
      if (!ele) continue;
      let temp = getAllForIndex(mat, i, j, m, n);
      count += temp;
    }
  }
  return count;
};

function getAllForIndex(mat, a, b, m, n) {
  let bound = n;
  let count = 0;

  for (let i = a; i < m; i++) {
    for (let j = b; j < bound; j++) {
      if (!mat[i][j]) {
        bound = j;
        continue;
      }
      count += 1;
    }
  }

  return count;
}

// --------------------------------------- //

// O(n2) space O(n^3) complexity
var numSubmatDP = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  let ans = 0;

  let prefix = Array.from(Array(m), () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (mat[i][j]) {
        count += 1;
      } else {
        count = 0;
      }

      prefix[i][j] = count;
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let res = Infinity;

      for (let k = i; k < m; k++) {
        if (!prefix[k][j]) break;
        res = Math.min(res, prefix[k][j]);
        ans += res;
      }
    }
  }

  return ans;
};

// --------------------------------------- //

// O(n) space O(n^3) complexity
var numSubmatNspace = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  let ans = 0;
  let height = new Array(n).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      height[j] = mat[i][j] == 0 ? 0 : height[j] + 1;
      let min = height[j];
      for (let k = j; k >= 0; k--) {
        if (min < 1) break;
        min = Math.min(min, height[k]);
        ans += min;
      }
    }
  }

  return ans;
};

// --------------------------------------- //

// O(n) space O(n^2) complexity - stack based approach
var numSubmat = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const height = new Array(n).fill(0);
  let res = 0;

  for (let i = 0; i < m; i++) {
    let stack = [];
    for (let j = 0; j < n; j++) {
      height[j] = mat[i][j] === 0 ? 0 : height[j] + 1;
      let sum = 0;
      while (stack.length && height[stack[stack.length - 1][0]] >= height[j]) {
        stack.pop();
      }

      if (stack.length) {
        sum +=
          height[j] * (j - stack[stack.length - 1][0]) +
          stack[stack.length - 1][1];
      } else {
        sum += height[j] * (j + 1);
      }
      stack.push([j, sum]);
      res += sum;
    }
  }

  return res;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript with Explanation
// '??' 연산자(nullish coalescing 연산자) - '값이 null 또는 undefined인 경우에 기본값을 정해준다' ( `||` 연산자와 다름)
var numSubmat = function (mat) {
  const M = mat.length;
  const N = (mat[0] || []).length;
  const INF = Number.MAX_SAFE_INTEGER;

  // console.log ({ M, N })

  // 1) First `maintain` a matrix `acc` of the same sizes as the input
  const acc = Array.from({ length: M }, (_) => Array.from({ length: N }));

  // 2) Fill the `acc` with a value acc[i][j] represents # of possible 1 x k rectangles ending its right corner at (i,j) (The DP part)
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      acc[i][j] = mat[i][j] ? 1 + (acc[i][j - 1] ?? 0) : 0;
    }
  }

  // 3) For each `potential` bottom right corner of a square:

  // mat = [[1,0,1],
  //        [1,1,0],
  //        [1,1,0]]

  // acc = [[1,0,1],
  //        [1,2,0],
  //        [1,2,0]]   then the potential squares of right corner at (i,j) = (2,1) are contributed by:
  //           ^               1) h == 1: min { acc[2][1] } => +2, viz, a 1x1 and a 1x2
  //                           2) h == 2: min { acc[2][1] ,
  //                                            acc[1][1] } => +2, viz, a 2x2 and a 2x1
  //                           3) h == 3: min { acc[2][1] ,
  //                                            acc[1][1] ,
  //                                            acc[0][1] } => +0, viz, impossible to draw a rectangle of height 3
  //                                      ------------------------------
  //  therefore, at this round (i,j)=(2,1),
  //    we have found +2+2+0 = 4 possible rectangles of various shapes all shared the same bottom right corner (2,1)
  let count = 0;
  for (let i = 0; i < M; i++) {
    // enumerate all possible corners
    for (let j = 0; j < N; j++) {
      for (let x = i, min = INF; x >= 0; x--) {
        // enumerate all possible hights
        min = Math.min(min, acc[x][j]);
        count += min;
      }
    }
  }

  // console.log (acc)
  // console.log (count)

  return count;
};

// ======================================================================================

// 다른 사람의 코드 : O(1) space and O(mn) time.
// ('JavaScript solution 100% time and 100% space' 글의 댓글에 남겨진 코드 - 복잡도가 정말 저런지 잘 모르겠다)
// `let min` 이하의 삼항연산자 부분이 무슨 뜻인지 이해되지 않음
var numSubmat = function (mat) {
  const n = mat.length;
  const m = mat[0].length;
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (mat[i][j] === 1) {
        let min = (mat[i][j] = j > 0 ? 1 + mat[i][j - 1] : 1);
        res += mat[i][j];
        let k = i - 1;
        while (k >= 0 && min > 0) {
          min = Math.min(min, mat[k--][j]);
          res += min;
        }
      }
    }
  }

  return res;
};
