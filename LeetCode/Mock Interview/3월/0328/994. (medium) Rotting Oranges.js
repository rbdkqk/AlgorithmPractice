/*  0328 Mock Interview : 994. (medium) Rotting Oranges  // tag : Breadth-first Search

  You are given an `m x n grid` where each cell can have one of three values:
    0 representing an empty cell,
    1 representing a fresh orange, or
    2 representing a rotten orange.

  Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

  Return the minimum number of minutes that must elapse until no cell has a fresh orange. 
    If this is impossible, return -1.


  Note:
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 10
    grid[i][j] is 0, 1, or 2.


  Example 1:
    Input: grid =  [[2,1,1],
                    [1,1,0],
                    [0,1,1]]
    Output: 4

  Example 2:
    Input: grid =  [[2,1,1],
                    [0,1,1],
                    [1,0,1]]
    Output: -1
    Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

  Example 3:
    Input: grid = [[0,2]]
    Output: 0
    Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

// 실패 : Maximum call stack size exceeded
var orangesRotting = function (grid) {
  let answer = 0;

  function recursion(i, j, count) {
    if (i === grid.length || j === grid.length || grid[i][j] === 0) {
      return;
    }

    if (grid[i][j] === 1) {
      grid[i][j] = 2;
    }

    answer = Math.max(answer, count);

    recursion(i, j + 1, count + 1);
    recursion(i + 1, j, count + 1);
    recursion(i, j - 1, count + 1);
    recursion(i - 1, j, count + 1);
  }

  for (let k = 0; k < grid.length; k++) {
    for (let l = 0; l < grid.length; l++) {
      recursion(k, l, 0);
    }
  }

  for (let n = 0; n < grid.length; n++) {
    for (let m = 0; m < grid.length; m++) {
      if (grid[n][m] === 1) {
        return -1;
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution

// The idea
// Use BFS - search level by level, each level = another minute
// Get the original rotten oranges, and start bfs from them
var orangesRotting = function (grid) {
  let queue = [];
  let minutes = 0;
  let fresh = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) fresh++;
      if (grid[i][j] == 2) queue.push([i, j]);
    }
  }

  while (queue.length != 0 && fresh) {
    let dR = [0, -1, 0, 1];
    let dC = [-1, 0, 1, 0];

    let next = [];
    while (queue.length != 0) {
      let current = queue.shift();
      for (let i = 0; i < dR.length; i++) {
        let nR = current[0] + dR[i];
        let nC = current[1] + dC[i];
        if (nR >= 0 && nC >= 0 && nR < grid.length && nC < grid[0].length) {
          if (grid[nR][nC] == 1) {
            grid[nR][nC] = 2;
            fresh--;
            next.push([nR, nC]);
          }
        }
      }
    }
    minutes++;
    queue = next;
  }

  return fresh == 0 ? minutes : -1;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Solution with Comments
// Intuition:
// Start BFS from rotten oranges by adding them to the queue, and mark them as visited.
// Each node on the queue will have a steps variable that will track the depth of the BFS from rotten to fresh orange.
// When BFS finishes check for any isolated fresh oranges that were not rotted and return -1 if found any.
var orangesRotting = function (grid) {
  if (!grid.length || !grid[0].length) return -1;

  const q = [];

  const visited = new Array(grid.length);

  // add rotten oranges to the queue and mark them as visited.
  for (let i = 0; i < grid.length; i++) {
    visited[i] = new Array(grid[0].length).fill(false);

    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        q.push([i, j, 0]);
        visited[i][j] = true; // mark rotten oranges as visited.
      }
    }
  }

  // max steps taken to rot.
  let maxSteps = 0;
  while (q.length) {
    const size = q.length;

    for (let i = 0; i < size; i++) {
      const [r, c, steps] = q.shift();

      maxSteps = Math.max(maxSteps, steps);

      for (const [nr, nc] of getNeighbors(grid, visited, r, c)) {
        q.push([nr, nc, steps + 1]);
        visited[nr][nc] = true;
      }
    }
  }

  // check if there's any unvisited fresh orange left.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) return -1;
    }
  }

  return maxSteps;
};

function getNeighbors(grid, visited, r, c) {
  const neighbors = [];
  const d = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  for (let i = 0; i < d.length; i++) {
    const nr = r + d[i][0];
    const nc = c + d[i][1];

    if (isValid(grid, visited, nr, nc)) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}

function isValid(grid, visited, r, c) {
  const inBounds = r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
  if (!inBounds) return false;
  // not visited and is a fresh orange.
  return !visited[r][c] && grid[r][c] === 1;
}
