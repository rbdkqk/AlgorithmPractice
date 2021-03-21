/*  0320 Mock Interview : 807. (medium) Max Increase to Keep City Skyline  // tag : ???

  In a 2 dimensional array `grid`, each value `grid[i][j]` represents the height of a building located there. 
    We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). 
    Height 0 is considered to be a building as well. 

  At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. 

  A city's skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

  What is the maximum total sum that the height of the buildings can be increased?


  Note:
    1 < grid.length = grid[0].length <= 50.
    All heights grid[i][j] are in the range [0, 100].
    All buildings in grid[i][j] occupy the entire grid cell: that is, they are a 1 x 1 x grid[i][j] rectangular prism.


  Example 1:
    Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]

    Output: 35

    Explanation: 
      The grid is:
      [ [3, 0, 8, 4], 
        [2, 4, 5, 7],
        [9, 2, 6, 3],
        [0, 3, 1, 0] ]

      The skyline viewed from top or bottom is: [9, 4, 8, 7]
      The skyline viewed from left or right is: [8, 7, 9, 3]

      The grid after increasing the height of buildings without affecting skylines is:

      gridNew = [ [8, 4, 8, 7],
                  [7, 4, 7, 7],
                  [9, 4, 8, 7],
                  [3, 3, 3, 3] ]

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

// 문제가 요구하는 내용 자체를 이해하는게 어려웠다...
// 요구하는 최종 결과값 : `변경된 grid와 기존 grid 사이에서, 각 요소들에 추가된 값(높이)의 총합`

// 성공 : 35분 소요
// Runtime: 92 ms
// Memory Usage: 40.4 MB
var maxIncreaseKeepingSkyline = function (grid) {
  let turnedGrid = new Array(grid.length);

  for (let i = 0; i < grid.length; i++) {
    let innerArray = new Array();
    for (let j = 0; j < grid[i].length; j++) {
      innerArray.push(grid[j][i]);
    }
    turnedGrid[i] = innerArray;
  }

  let answer = new Array(grid.length);

  let sum = 0;

  for (let k = 0; k < grid.length; k++) {
    let innerAnswer = new Array();
    for (let l = 0; l < grid.length; l++) {
      let max = Math.min(Math.max(...grid[k]), Math.max(...turnedGrid[l]));
      innerAnswer.push(max);
      // 사실 문제는 이 sum만 요구한다
      sum += max - grid[k][l];
    }
    answer[k] = innerAnswer;
  }

  // return answer;
  // answer 배열을 만든게 아까워서, 이 answer 배열 리턴하는 코드를 그냥 둘 것임
  // 사실 answer 배열을 만들 필요 없이, 위와 같이 sum 값만 처리해도 된다

  return sum;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution keeps track of row & col maxes
// 이중 배열(?)을 또 만들게 아니고, 이렇게 row / col 을 그냥 따로 하는게 더 깔끔하고 좋을 수 있었다
// 마지막 값을 내놓는 방법은 비슷한 것 같음. 다만 Math.max 처리를 그 앞에 해놓는다는 점이 다름
// 그래서 전체적으로는 내 방법과 비슷하다고 생각함
var maxIncreaseKeepingSkyline = function (grid) {
  let rows = new Array(grid.length).fill(0);
  let cols = new Array(grid[0].length).fill(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      rows[i] = Math.max(rows[i], grid[i][j]);
      cols[j] = Math.max(cols[j], grid[i][j]);
    }
  }

  let inc = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      inc += Math.min(rows[i], cols[j]) - grid[i][j];
    }
  }

  return inc;
};

// ======================================================================================

// 다른 사람의 코드 : Clear, Understandable Solution using Map and Meaningful Variables (~90% Speed, 50% Memory) O(n^2)
// 최대값을 찾기 위해 객체를 활용한다는 점에서 보다 유리할 수 있겠음

/**
To maximize the height while maintaining the height of the skyline from the view of the top/botttom and right/left:
    GOAL: At every A[row][col] we need to find the max of that row, column, and then make the current A[i][j] = the minimum of the two, as long as it's greater than the current value
      1) Make a nested for loop to go though each value and find the max col and rows
          - We will store this in a map/object for fast access.
      2) Go though the whole 2D array, find the Min(max of that col, max of that row) and replace the current Array[row][col]!
      3) Pet a dog for happiness   
*/

var maxIncreaseKeepingSkyline = function (grid) {
  let rowM = {}; // Map for the rows max
  let colsM = {}; // Map for the columns max
  let sum = 0; // Total height we can add

  //findMaxRowsCols will go though each row and col and populate the max of each row
  // and colum in a key: value way.
  //From the example, after this function runs the map looks like:
  //console.log(rowM) => { '0': 8, '1': 7, '2': 9, '3': 3 }
  //console.log(colsM)=> { '0': 9, '1': 4, '2': 8, '3': 7 }
  findMaxRowsCols(grid, rowM, colsM);

  //Now that we have the max of a given row and column, let's see how much we can replace each cell by
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      //The new height should be the MIN of the max of a given row and column (so we dont ruine the skyline;)
      let newH = Math.min(rowM[row], colsM[col]);
      //If the current height is smaller do the replacement and count! (saves us some uneeded work)
      if (grid[row][col] < newH) {
        sum += newH - grid[row][col];
        grid[row][col] = newH;
      }
    }
  }

  return sum;
};

var findMaxRowsCols = function (grid, rowM, colsM) {
  //Find the max of each row
  for (let row = 0; row < grid.length; row++) {
    let max = 0;
    for (let curr = 0; curr < grid[0].length; curr++) {
      if (grid[row][curr] > max) {
        max = grid[row][curr];
      }
      rowM[row] = max;
    }
  }

  //Find the max for each column
  for (let col = 0; col < grid.length; col++) {
    let max = 0;
    for (let curr = 0; curr < grid.length; curr++) {
      if (grid[curr][col] > max) {
        max = grid[curr][col];
      }
      colsM[col] = max;
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution with reducers ( ~50ms speed, 34.9 MB memory)
// 댓글에서, 객체를 활용할 것을 지적받음
var maxIncreaseKeepingSkyline = function (grid) {
  if (!grid.length) return 0;

  const topSkyline = getTopSkyline(grid);
  const leftSkyline = getLeftSkyline(grid);

  // Go through each building to calculate max height that can be increased
  return grid.reduce((result, row, i) => {
    return row.reduce((rowResult, height, j) => {
      return (rowResult += Math.min(leftSkyline[i], topSkyline[j]) - height);
    }, result);
  }, 0);
};

// Get highest buildings visible from the left
function getLeftSkyline(grid) {
  return grid.map((row) => Math.max.apply(0, row));
}

// Get highest buildings visible from the top
function getTopSkyline(grid) {
  return grid[0].map((height, i) =>
    grid.reduce((max, row, j) => (max = Math.max(max, grid[j][i])), 0)
  );
}
