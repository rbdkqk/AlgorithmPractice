/*  0228 Mock Interview : 675. (hard) Cut Off Trees for Golf Event  //  tag : Breadth-first Search

  You are asked to cut off all the treess in a forest for a golf event. 
  
  The forest is represented as an `m x n` matrix. 
  
  In this matrix:
    0 means the cell cannot be walked through.
    1 represents an empty cell that can be walked through.
    A number greater than 1 represents a tree in a cell that can be walked through, and this number is the tree's height.
    In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.

  You must cut off the trees in order from shortest to tallest. 
    When you cut off a tree, the value at its cell becomes 1 (an empty cell).

  Starting from the point (0, 0), return the minimum steps you need to walk to cut off all the trees. 
    If you cannot cut off all the trees, return -1.

  You are guaranteed that no two trees have the same height, 
    and there is at least one tree needs to be cut off.


  Constraints:
    m == forest.length
    n == forest[i].length
    1 <= m, n <= 50
    0 <= forest[i][j] <= 10^9


  Example 1:
    Input: forest = [[1,2,3],[0,0,4],[7,6,5]]
    Output: 6
    Explanation: 
      Following the path above allows you to cut off the trees from shortest to tallest in 6 steps.

  Example 2:
    Input: forest = [[1,2,3],[0,0,0],[7,6,5]]
    Output: -1
    Explanation: 
      The trees in the bottom row cannot be accessed as the middle row is blocked.

  Example 3:
    Input: forest = [[2,3,4],[0,0,5],[8,7,6]]
    Output: 6
    Explanation: 
      You can follow the same path as Example 1 to cut off all the trees.
      Note that you can cut off the first tree at (0, 0) before making any steps.

*/

/**
 * @param {number[][]} forest
 * @return {number}
 */

// 실패
var cutOffTree = function (forest) {
  let allTree = 0;
  for (let innerArray of forest) {
    for (let count of innerArray) {
      allTree += count;
    }
  }

  let answer = 0;

  function step(i, j) {
    if (forest[i][j] === undefined) {
      return 0;
    }

    if (forest[i][j] === 0) {
      return -1;
    }

    if (forest[i][j] > 1) {
      allTree -= forest[i][j];
      return 1;
    }

    if (forest[i][j + 1]) answer += step(i, j + 1);
    if (forest[i][j - 1]) answer += step(i, j - 1);
    if (forest[i + 1][j]) answer += step(i + 1, j);
    if (forest[i - 1][j]) answer += step(i - 1, j);
  }

  step(0, 0);

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Solution BFS with Comments

var cutOffTree = function (forest) {
  const R = forest.length;
  const C = forest[0].length;

  const sortedTrees = sortTreesByHeight(forest);

  let sr = 0,
    sc = 0; // start node.
  let steps = 0; // steps taken to cut all trees.

  while (sortedTrees.length) {
    const [tr, tc] = sortedTrees.shift();

    // run BFS from start to target node.
    const partialSteps = cutOffTreeBfs(forest, sr, sc, tr, tc);

    if (partialSteps >= 0) {
      // increment steps by partialSteps, and set the start
      // node of the BFS to be the target we just reached.
      steps += partialSteps;
      sr = tr;
      sc = tc;
    } else {
      return -1;
    }
  }
  return steps;
};

function sortTreesByHeight(forest) {
  const trees = [];
  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[0].length; j++) {
      if (forest[i][j] > 1) {
        trees.push([i, j, forest[i][j]]);
      }
    }
  }
  // sort height from smallest to biggest.
  trees.sort((x, y) => x[2] - y[2]);
  return trees;
}

function cutOffTreeBfs(forest, sr, sc, tr, tc) {
  const R = forest.length;
  const C = forest[0].length;

  // add start node to the queue with a dist of 0.
  const queue = [[sr, sc, 0]];

  // create visited matrix and initialize it to false.
  const visited = new Array(R);
  for (let i = 0; i < R; i++) {
    visited[i] = new Array(C).fill(false);
  }

  // mark the start node as visited.
  visited[sr][sc] = true;

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    // if we reached the target, return the distance so far.
    if (r == tr && c === tc) {
      return dist;
    }

    // get the neighbors of the current node,
    // getNeighbors will return only valid neighbors.
    const neighbors = getNeighbors(R, C, forest, visited, r, c);

    for (const [nr, nc] of neighbors) {
      visited[nr][nc] = true;
      // add neighbor to the queue
      // and set its distance by current dist plus 1.
      queue.push([nr, nc, dist + 1]);
    }
  }

  return -1;
}

function getNeighbors(R, C, forest, visited, r, c) {
  const neighbors = [];
  // direction vectors for moving in the matrix.
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (let i = 0; i < directions.length; i++) {
    const nr = r + directions[i][0];
    const nc = c + directions[i][1];
    // add only valid nodes.
    if (isValid(R, C, forest, visited, nr, nc)) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}

function isValid(R, C, forest, visited, r, c) {
  const inBounds = r >= 0 && r < R && c >= 0 && c < C;
  if (!inBounds || visited[r][c]) return false;
  // valid node = not visited and not an obstacle;
  return !visited[r][c] && forest[r][c] !== 0;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript Short and Simple BFS Solution [Beats 100%]
var cutOffTree = function (forest) {
  const trees = forest
    .flat()
    .filter((x) => x && x !== 1)
    .sort((a, b) => b - a);
  let currPos = [0, 0],
    totalDist = 0;

  while (trees.length) {
    const grid = [...forest.map((row) => [...row])];
    const res = getDist(currPos, trees.pop(), grid);
    if (res == null) return -1;
    const [pos, dist] = res;
    currPos = pos;
    totalDist += dist;
  }
  return totalDist;

  function getDist(start, target, grid) {
    const dir = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let queue = [start],
      dist = 0;

    while (queue.length) {
      const next = [];

      for (let [r, c] of queue) {
        if (grid[r][c] === target) return [[r, c], dist];
        if (!grid[r][c]) continue;

        for (let [x, y] of dir) {
          x += r;
          y += c;
          if (
            x >= 0 &&
            x < grid.length &&
            y >= 0 &&
            y < grid[0].length &&
            grid[x][y]
          )
            next.push([x, y]);
        }
        grid[r][c] = 0;
      }
      dist++;
      queue = next;
    }
    return null;
  }
};
