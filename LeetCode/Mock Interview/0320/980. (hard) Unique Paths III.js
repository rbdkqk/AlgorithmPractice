/*  0320 Mock Interview : 980. (hard) Unique Paths III  // tag : Backtracking, Depth-first Search

  On a 2-dimensional grid, there are 4 types of squares:
    1 represents the starting square.  There is exactly one starting square.
    2 represents the ending square.  There is exactly one ending square.
    0 represents empty squares we can walk over.
    -1 represents obstacles that we cannot walk over.

  Return the number of 4-directional walks from the starting square to the ending square, 
    that walk over every non-obstacle square exactly once.


  Note:
    1 <= grid.length * grid[0].length <= 20


  Example 1:
    Input: [[1,0,0,0],
            [0,0,0,0],
            [0,0,2,-1]]
    Output: 2
    Explanation: We have the following two paths: 
      1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
      2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)

  Example 2:
    Input: [[1,0,0,0],
            [0,0,0,0],
            [0,0,0,2]]
    Output: 4
    Explanation: We have the following four paths: 
      1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
      2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
      3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
      4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)

  Example 3:
    Input: [[0,1],
            [2,0]]
    Output: 0
    Explanation: 
      There is no path that walks over every empty square exactly once.
      Note that the starting and ending square can be anywhere in the grid.

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

// backtracking인 것 같은데, 자신이 없어서 찾아보니 hard 문제길래 크게 고민하지 않고 바로 답을 봤음. 그래도 잘 모르겠다
var uniquePathsIII = function (grid) {};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution with backtracking
var uniquePathsIII = function (grid) {
  let count = 0;
  let row;
  let col;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        count++;
      }
      if (grid[i][j] == 1) {
        row = i;
        col = j;
      }
    }
  }

  return findPaths(grid, count + 1, row, col).length;
};

function findPaths(grid, count, row, col) {
  if (
    row < 0 ||
    row > grid.length - 1 ||
    col < 0 ||
    col > grid[0].length - 1 ||
    grid[row][col] == -1 ||
    (grid[row][col] == 2 && count > 0)
  ) {
    return [];
  }

  if (grid[row][col] == 2) {
    return [[row, col]];
  }

  let orig = grid[row][col];

  grid[row][col] = -1; // mark as visited

  let results = [];

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (let i = 0; i < directions.length; i++) {
    const [r, c] = directions[i];

    const paths = findPaths(grid, count - 1, row + r, col + c);

    for (let j = 0; j < paths.length; j++) {
      results.push([[row, col]].concat(paths[j]));
    }
  }

  grid[row][col] = orig; // unvisit for next iteration

  return results;
}

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript solution
function uniquePathsIII(grid) {
  if (grid == null || grid.length === 0) return 0;

  const h = grid.length;
  const w = grid[0].length;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let start;
  let end;
  let emptyCount = 1;
  let res = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] === 0) emptyCount++;
      else if (grid[i][j] === 1) start = [i, j];
      else if (grid[i][j] === 2) end = [i, j];
    }
  }

  function go(x, y, count) {
    if (grid[x][y] === -1 || grid[x][y] === Infinity) return;

    if (x === end[0] && y === end[1]) {
      if (count === emptyCount) res++;
      return;
    }

    grid[x][y] = Infinity; // Mark visited
    for (const [di, dj] of dirs) {
      const i = x + di;
      const j = y + dj;
      if (i < 0 || i >= h || j < 0 || j >= w) continue;
      go(i, j, count + 1);
    }
    grid[x][y] = 0; // Reset
  }

  go(start[0], start[1], 0);
  return res;
}
