/*  0305 Mock Interview : 547. (medium) Number of Provinces  //  tag : Depth-first Search, Union Find

  There are `n` cities. 
    Some of them are connected, while some are not. 
    If city `a` is connected directly with city `b`, and city b is connected directly with city `c`,
      then city `a` is connected indirectly with city `c`.

  A `province` is a group of directly or indirectly connected cities and no other cities outside of the group.

  You are given an n x n matrix `isConnected`
    where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, 
    and `isConnected[i][j] = 0` otherwise.

  Return the total number of `provinces`.


  Constraints:
    1 <= n <= 200
    n == isConnected.length
    n == isConnected[i].length
    isConnected[i][j] is 1 or 0.
    isConnected[i][i] == 1
    isConnected[i][j] == isConnected[j][i]


  Example 1:
    Input: isConnected = [[1,1,0],
                          [1,1,0],
                          [0,0,1]]
    Output: 2 

  Example 2:
    Input: isConnected = [[1,0,0],
                          [0,1,0],
                          [0,0,1]]
    Output: 3

*/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */

// 실패 (접근법을 잘 모르겠음)
// 내가 이해한 내용 : 연결되어 있는 도시는 하나의 그룹임. 원하는 리턴값은 그룹의 개수
// 그러므로, 1번 예제는 2개짜리 1개 그룹과 1개짜리 1개 그룹 해서 총 2개 그룹, 2번 예제는 각각이 연결되지 않았으므로 3개의 그룹
var findCircleNum = function (isConnected) {
  let answer = 0;

  let array = isConnected.reduce((acc, cur) => {
    acc.push(
      cur.reduce((accVal, curVal) => {
        return accVal + curVal;
      })
    );
    return acc;
  }, []);

  let set = new Set();

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 1) {
      answer++;
    } else {
      set.add(array[i]);
    }
  }

  return answer + set.size;
};

// ======================================================================================

// 다른 사람의 코드 : javascript dfs+map w/ comments
// 1인 위치(i, j)를 찾으면 거기서부터 그 다음 연결 그 다음 연결 이런식으로 찾아가면서,
// 방문했던 곳은 제외하기 위해 set을 사용한다고 생각은 했는데,
// 나는 그걸 dfs 방식으로 구현할 생각을 하지 못함
function findCircleNum(M) {
  // visited set
  const visited = new Set();
  // friend circles count
  let circles = 0;

  // iterate thru matrix
  for (let i = 0; i < M.length; i++) {
    // check if this friend has been visited before
    if (!visited.has(i)) {
      // start dfs for this friend
      dfs(i);
      // this is another friend circle
      circles++;
    }
  }

  return circles;

  // helper method to do dfs traversal thru M
  function dfs(i) {
    // go thru this friend's friends
    for (let j = 0; j < M.length; j++) {
      // check if this is a friend, and not visited before
      if (M[i][j] === 1 && !visited.has(j)) {
        // add as visited
        visited.add(j);
        // call dfs
        dfs(j);
      }
    }
  }
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript DFS beats 98.97%

var findCircleNum = function (isConnected) {
  let visited = new Set(),
    provs = 0;
  for (let i = 0; i < isConnected.length; i++) {
    if (!visited.has(i)) {
      provs++;
      DFS(isConnected, i, visited);
    }
  }
  return provs;
};

const DFS = (isConnected, i, visited) => {
  visited.add(i);
  for (let j = 1; j < isConnected.length; j++) {
    if (isConnected[i][j] && !visited.has(j)) {
      DFS(isConnected, j, visited);
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 3 Solutions: Union Find, DFS & BFS

// Union Find: (합집합 찾기 : 여러개의 노드가 존재할 때, 두 노드가 같은 그래프에 속하는지 판별하는 알고리즘)
// 참고 : https://blog.naver.com/ndb796/221230967614
var findCircleNum = function (M) {
  let res = 0;
  const dsu = new DSU(M.length);
  for (let row = 0; row < M.length; row++) {
    for (let col = 0; col < M[0].length; col++) {
      if (M[row][col] === 1) {
        dsu.union(row, col);
      }
    }
  }
  return new Set(M.map((m, i) => dsu.find(i))).size;
};

class DSU {
  constructor(N) {
    this.parent = [...new Array(N).keys()];
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(x, y) {
    this.parent[this.find(x)] = this.find(y);
  }
}

// DFS:
var findCircleNum = function (M) {
  const seen = new Set();
  let res = 0;
  const dfs = (i) => {
    for (let j = 0; j < M[0].length; j++) {
      if (M[i][j] === 1 && !seen.has(j)) {
        seen.add(j);
        dfs(j);
      }
    }
  };
  for (let i = 0; i < M.length; i++) {
    if (!seen.has(i)) {
      dfs(i);
      res++;
    }
  }

  return res;
};

// BFS:
var findCircleNum = function (M) {
  const seen = new Set();
  let res = 0;
  let stack = [];
  for (let i = 0; i < M.length; i++) {
    if (!seen.has(i)) {
      stack.push(i);
      while (stack.length) {
        const curr = stack.pop();
        seen.add(curr);
        for (let j = 0; j < M[0].length; j++) {
          if (M[curr][j] === 1 && !seen.has(j)) {
            stack.push(j);
          }
        }
      }
      res++;
    }
  }
  return res;
};
