/*  0323-1 Mock Interview : 542. (medium) 01 Matrix  // tag : Depth-first Search, Breadth-first Search

  Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

  The distance between two adjacent cells is 1.


  Motes:
    The number of elements of the given matrix will not exceed 10,000.
    There are at least one 0 in the given matrix.
    The cells are adjacent in only four directions: up, down, left and right.


  Example 1:
    Input:
      [[0,0,0],
      [0,1,0],
      [0,0,0]]
    Output:
      [[0,0,0],
      [0,1,0],
      [0,0,0]]

  Example 2:
    Input:
      [[0,0,0],
      [0,1,0],
      [1,1,1]]
    Output:
      [[0,0,0],
      [0,1,0],
      [1,2,1]]


*/
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

// 실패 : RangeError: Maximum call stack size exceeded
var updateMatrix = function (matrix) {
  let answer = new Array();

  for (let i = 0; i < answer.length; i++) {
    let innerArray = new Array();
    for (let j = 0; j < answer.length; j++) {
      innerArray.push(recursion(matrix, i, j, 0));
    }
    answer[i] = innerArray;
  }

  return answer;
};

function recursion(grid, i, j, distance) {
  if (grid[i][j] === undefined || i >= grid.length || j >= grid.length) {
    return;
  }

  if (grid[i][j] === 0) {
    return distance;
  }

  return Math.min(
    recursion(grid, i, j + 1, distance + 1),
    recursion(grid, i, j - 1, distance + 1),
    recursion(grid, i + 1, j, distance + 1),
    recursion(grid, i - 1, j, distance + 1)
  );
}

// ======================================================================================

// 다른 사람의 코드 : Heavily commented JavaScript solution using BFS
var updateMatrix = function (matrix) {
  // General approach is: Loop over the full matrix to find all zeroes first.
  // Add those to a queue and start a classic BFS, writing down a number +1
  // of the position we find in the Q. That way, all the neigbors of the zeroes will become 1's
  // all their neighbors 2's etc.
  // As we're looking for the initial set of zeroes, mark the others, mark as infinity
  // because we don't want to get confused with future 1s we want to write down.

  let i, l, j, m;

  let q = [];

  // Find all zeroes in the matrix
  for (i = 0, l = matrix.length; i < l; i++) {
    for (j = 0, m = matrix[0].length; j < m; j++) {
      if (matrix[i][j] === 0) {
        // Note the third param here, a zero to keep track of which "level" we're at.
        // The zeroes are obviously at zero.
        // Later in the bfs we will increase this for each unvisited neighbor
        q.push([i, j, 0]);
      } else {
        matrix[i][j] = Infinity;
      }
    }
  }

  // little helper array to find neighbors in a quick forEach loop.
  let dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Start BFS. BFS is the right choice so we minimize attempted double visits
  // BFS is like a stain that spreads, while DFS is like tendrils reaching out.
  while (q.length) {
    let pos = q.shift();

    // write value if we find it's lower than current (like those infinities)
    if (matrix[pos[0]][pos[1]] > pos[2]) {
      matrix[pos[0]][pos[1]] = pos[2];
    }

    // Look at all neighbor positions. Are they on the board? Are they not yet visited?
    // If yes to both, add to the q, with an increased "level" param at pos [2]
    dir.forEach(function (d) {
      let next = [pos[0] + d[0], pos[1] + d[1], pos[2] + 1];
      // valid next coordinates?
      if (
        next[0] > -1 &&
        next[0] < matrix.length &&
        next[1] > -1 &&
        next[1] < matrix[0].length
      ) {
        // not yet marked?
        if (matrix[next[0]][next[1]] === Infinity) {
          // add to q, but with increased index, which we stored at pos[2]
          q.push(next);
        }
      }
    });
  }

  return matrix;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript both DP & BFS solution

// DP
var updateMatrix = function (matrix) {
  const rowLen = matrix.length,
    colLen = matrix[0].length;
  const dist = new Array(rowLen)
    .fill([])
    .map(() => new Array(colLen).fill(Infinity));
  const getDist = (row, col, [rd, cd]) =>
    Math.min(dist[row][col], dist[row + rd][col + cd] + 1);
  // top, left, down, right
  const dir = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  // check left & top
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (!matrix[i][j]) dist[i][j] = 0;
      else {
        if (!i && !j) continue;
        if (i > 0 && j > 0) {
          dist[i][j] = Math.min(getDist(i, j, dir[0]), getDist(i, j, dir[1]));
        } else {
          dist[i][j] = i ? getDist(i, j, dir[1]) : getDist(i, j, dir[0]);
        }
      }
    }
  }
  // check right & bottom
  for (let i = rowLen - 1; i >= 0; i--) {
    for (let j = colLen - 1; j >= 0; j--) {
      if (matrix[i][j]) {
        if (i === rowLen - 1 && j === colLen - 1) continue;
        if (i < rowLen - 1 && j < colLen - 1) {
          dist[i][j] = Math.min(getDist(i, j, dir[2]), getDist(i, j, dir[3]));
        } else {
          dist[i][j] =
            i < rowLen - 1 ? getDist(i, j, dir[3]) : getDist(i, j, dir[2]);
        }
      }
    }
  }
  return dist;
};

// BFS
var updateMatrix = function (matrix) {
  const queue = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 1) {
        matrix[i][j] = Infinity;
      } else {
        queue.push([i, j]);
      }
    }
  }
  bfs(matrix, queue);
  return matrix;
};

const bfs = (matrix, queue) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const validate = (row, col) =>
    col >= 0 && row >= 0 && row < matrix.length && col < matrix[0].length;
  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of directions) {
      const row = x + dx;
      const col = y + dy;
      if (validate(row, col) && matrix[row][col] > matrix[x][y] + 1) {
        matrix[row][col] = matrix[x][y] + 1;
        queue.push([row, col]);
      }
    }
  }
};
