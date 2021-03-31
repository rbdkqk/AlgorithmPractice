/*  0331 Mock Interview : 1466. (medium) Reorder Routes to Make All Paths Lead to the City Zero  // tag : Tree, Depth-first Search

  There are n cities numbered from 0 to n-1 and n-1 roads such that there is only one way to travel between two different cities (this network form a tree). 
    Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

  Roads are represented by connections where connections[i] = [a, b] represents a road from city a to b.

  This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

  Your task consists of reorienting some roads such that each city can visit the city 0. 
    Return the minimum number of edges changed.

  It's guaranteed that each city can reach the city 0 after reorder.


  Constraints:
    2 <= n <= 5 * 10^4
    connections.length == n-1
    connections[i].length == 2
    0 <= connections[i][0], connections[i][1] <= n-1
    connections[i][0] != connections[i][1]


  Example 1:
    Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
    Output: 3
    Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).

  Example 2:
    Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
    Output: 2
    Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).

  Example 3:
    Input: n = 3, connections = [[1,0],[2,0]]
    Output: 0

*/

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */

// 실패 : 문제가 원하는 결론은 알겠는데, 어떻게 접근해야 하는지 모르겠다. - linked list?? tree??s
var minReorder = function (n, connections) {};

// ======================================================================================

// 다른 사람의 코드 : Javascript BFS, easy to understand.
/*  Thinking process:
  Since the target is to minimize the number of road to reverse so that all cities can reach city 0, then for those directly connected to 0,
    say nodes , if it's already in the right direction, no change; if otherwise, reverse it. 
  Same idea applies to the remaining cities that connected to nodes.

  The basic idea is to record the distances for all cities to city 0, regardless of the direction. 
  So imagine the goal is to reach city 0, and for one of the roads [src, dest], 
    if the distance from src to 0 is greater than distance from dest to 0, 
    it means you are heading to the right direction, like getting nearer towards city 0. 
  Otherwise, it means you are heading farther from city 0, then the road should be reversed.
*/
var minReorder = function (n, connections) {
  const dist = Array(n).fill(-1);
  dist[0] = 0;
  let unknowns = n - 1;
  while (unknowns) {
    connections.forEach(([src, dest]) => {
      if (dist[src] != -1 && dist[dest] == -1) {
        dist[dest] = dist[src] + 1;
        --unknowns;
      } else if (dist[dest] != -1 && dist[src] == -1) {
        dist[src] = dist[dest] + 1;
        --unknowns;
      }
    });
  }
  let ans = 0;
  connections.forEach(([src, dest]) => {
    if (dist[src] < dist[dest]) ++ans;
  });
  return ans;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution using sets and sorting
/*
  Basic idea is that the connections are in a form of a tree so no cycles exist.
  the algo below helps in discovering all nodes that reach 0 without any change.
  Further checks all the connections for if they any node which is already reaches 0 a connection of the node which we are currently checking.
  add those nodes to set and continue.
  if they are not reachable then switch the connection and check if it's reachable now. if yes increment the count.
*/
var minReorder = function (n, connections) {
  connections.sort(function (a, b) {
    return a[0] - b[0];
  });
  connections.sort(function (a, b) {
    return a[1] - b[1];
  });
  var s = new Set();
  s.add(0);
  var count = 0;
  for (var i = 0; i < connections.length; i++) {
    if (s.has(connections[i][1])) {
      s.add(connections[i][0]);
    } else {
      if (s.has(connections[i][0])) {
        s.add(connections[i][1]);
        count++;
      }
    }
  }
  return count;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] simple DFS recursion
// First we record the edges in two maps (one forward, one backward).
// Then we dfs from zero and find the edges in the wrong direction.
var minReorder = function (n, connections) {
  let ans = 0;
  const visited = {};
  const mapForward = {};
  const mapBackward = {};
  for (let i = 0; i < connections.length; i++) {
    const [a, b] = connections[i];
    if (mapForward[a]) {
      mapForward[a].push(b);
    } else {
      mapForward[a] = [b];
    }
    if (mapBackward[b]) {
      mapBackward[b].push(a);
    } else {
      mapBackward[b] = [a];
    }
  }
  const dfs = (key, forward) => {
    if (visited[key]) {
      return;
    }
    visited[key] = true;
    if (forward) {
      ans++;
    }
    const f = mapForward[key];
    const b = mapBackward[key];
    if (f) {
      for (let i = 0; i < f.length; i++) {
        const element = f[i];
        dfs(element, true);
      }
    }
    if (b) {
      for (let i = 0; i < b.length; i++) {
        const element = b[i];
        dfs(element, false);
      }
    }
  };
  dfs(0, false);
  return ans;
};
