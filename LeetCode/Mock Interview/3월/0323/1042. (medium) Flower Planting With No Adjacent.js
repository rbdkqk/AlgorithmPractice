/*  0323 Mock Interview : 1042. (medium) Flower Planting With No Adjacent  // tag : Graph

  You have `n` gardens, labeled from 1 to n, 
    and an array `paths` where paths[i] = [xi, yi] describes a bidirectional path between garden xi to garden yi. 
    In each garden, you want to plant one of 4 types of flowers.

  All gardens have at most 3 paths coming into or leaving it.

  Your task is to choose a flower type for each garden such that, 
    for any two gardens connected by a path, they have different types of flowers.

  Return any such a choice as an array answer, 
    where answer[i] is the type of flower planted in the (i+1)th garden. 

  The flower types are denoted 1, 2, 3, or 4. 

  It is guaranteed an answer exists.


  Constraints:
    1 <= n <= 10^4
    0 <= paths.length <= 2 * 10^4
    paths[i].length == 2
    1 <= xi, yi <= n
    xi != yi
    Every garden has at most 3 paths coming into or leaving it.


  Example 1:
    Input: n = 3, paths = [[1,2],[2,3],[3,1]]
    Output: [1,2,3]
    Explanation:
      Gardens 1 and 2 have different types.
      Gardens 2 and 3 have different types.
      Gardens 3 and 1 have different types.
        Hence, [1,2,3] is a valid answer. Other valid answers include [1,2,4], [1,4,2], and [3,2,1].

  Example 2:
    Input: n = 4, paths = [[1,2],[3,4]]
    Output: [1,2,1,2]

  Example 3:
    Input: n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
    Output: [1,2,3,4]

*/

/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */

// 실패 : 접근법이 떠오르지 않는다
var gardenNoAdj = function (n, paths) {
  let answer = new Array(n);

  for (let i = 0; i < paths.length; i++) {
    let front = paths[i][0];
    let back = path[i][1];
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript easy to understand OOP solution,
class Garden {
  constructor(n) {
    this.no = n;
    this.neighbors = [];
    this.flower = null;
  }

  connectTo(garden) {
    if (this.neighbors.includes[garden]) {
      return;
    }
    this.neighbors.push(garden);
  }

  canPlate(flower) {
    return (
      this.flower === null && this.neighbors.every((n) => n.flower !== flower)
    );
  }

  hasFlower() {
    return this.flower !== null;
  }

  plate(flower) {
    this.flower = flower;
  }
}

var gardenNoAdj = function (N, paths) {
  const gardens = new Map();

  for (let i = 1; i <= N; i++) {
    gardens.set(i, new Garden(i));
  }

  for (const [g1, g2] of paths) {
    gardens.get(g1).connectTo(gardens.get(g2));
    gardens.get(g2).connectTo(gardens.get(g1));
  }

  const flowers = [];

  for (let [n, garden] of gardens) {
    let flower = 1;

    while (!garden.hasFlower()) {
      if (garden.canPlate(flower)) {
        garden.plate(flower);
        flowers.push(flower);
      } else {
        flower++;
      }
    }
  }

  return flowers;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript
const gardenNoAdj = (n, paths) => {
  const graph = Array(n);

  paths.forEach(([u, v]) => {
    u -= 1;
    v -= 1;
    graph[u] = graph[u] || [];
    graph[v] = graph[v] || [];
    graph[u].push(v);
    graph[v].push(u);
  });

  const result = Array(n).fill(1);

  graph.forEach((out, u) => {
    result[u] = [1, 2, 3, 4].find((num) => {
      return out.every((v) => result[v] !== num);
    });
  });

  return result;
};
