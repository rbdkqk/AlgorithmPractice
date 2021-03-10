/*  0310 Mock Interview : 743. (medium) Network Delay Time  //  tag : Heap, Depth-first Search, Breadth-first Search, Graph

  You are given a network of `n` nodes, labeled from 1 to n. 
  
  You are also given `times`, a list of travel times as directed edges times[i] = [ui, vi, wi], 
    where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

  We will send a signal from a given node `k`. 
    Return the time it takes for all the `n` nodes to receive the signal. 
    If it is impossible for all the `n` nodes to receive the signal, return -1.


  Constraints:
    1 <= k <= n <= 100
    1 <= times.length <= 6000
    times[i].length == 3
    1 <= ui, vi <= n
    ui != vi
    0 <= wi <= 100
    All the pairs (ui, vi) are unique. (i.e., no multiple edges.)


  Example 1:
    Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
    Output: 2
    
  Example 2:
    Input: times = [[1,2,1]], n = 2, k = 1
    Output: 1

  Example 3:
    Input: times = [[1,2,1]], n = 2, k = 2
    Output: -1

*/

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

// 실패 - 문제 자체를 내가 정확히 이해하지 못한 것 같음
// 내가 이해한 문제의 요구사항 : 'k node에서 n node로 가기까지의 모든 time의 합을 구하기'
// 예제 : networkDelayTime([[1,2,1],[2,3,2],[1,3,4]], 3 , 1)  //  정답 : 3
// 아래 내 코드대로라면 4가 나온다. 문제에서도 1 -> 3을 요구하고, [1,3,4] 안에서 바로 4를 찾을 수 있는데, 왜 3이 나와야 하는지 이해되지 않는다.
// [1,2,1],[2,3,2] 이걸 거쳐가면 3이니까 3이라는 것 같은데, 가장 짧은걸 찾으라는 조건은 없지 않나?
var networkDelayTime = function (times, n, k) {
  let map = new Map();

  for (let i = 0; i < times.length; i++) {
    map.set(times[i][1], { source: times[i][0], time: times[i][2] });

    if (n === k) {
      if (times[i][0] === k) {
        return times[i][2];
      }
    }

    if (times[i][0] === k && times[i][1] === n) {
      return times[i][2];
    }
  }

  let currentObj = map.get(n);
  let previousNode = currentObj.source;
  let timeSum = currentObj.time;

  if (times.length === 1 || n === k) {
    if (previousNode === k) {
      return timeSum;
    } else {
      return -1;
    }
  }

  while (true) {
    let checkObj = map.get(previousNode);

    if (checkObj === undefined) {
      return -1;
    }

    currentObj = checkObj;
    previousNode = currentObj.source;
    timeSum += currentObj.time;

    if (previousNode === k) {
      return timeSum;
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript Bellman-Ford solution
// Introduction to Bellman-Ford : https://www.youtube.com/watch?v=obWXjtg0L64
//
const networkDelayTime = (times, N, K) => {
  const time = Array(N + 1).fill(Infinity);
  time[K] = 0;
  for (let i = 0; i < N; i++) {
    for (const [u, v, t] of times) {
      if (time[u] === Infinity) continue;
      if (time[v] > time[u] + t) {
        time[v] = time[u] + t;
      }
    }
  }

  let res = 0;
  for (let i = 1; i <= N; i++) {
    res = Math.max(res, time[i]);
  }
  return res === Infinity ? -1 : res;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Using Dijkstra Algorithm and Priority Queue (faster than 88.14% of js submissions)
// Based on Dijkstra Algorithm (using Priority Queue). Finding distance from source node K
// Dijkstra Algorithm(다익스트라 알고리즘) : 그래프에서, 하나의 정점에서 다른 모든 정점까지의 최단경로를 구하는 알고리즘 - https://hsp1116.tistory.com/42
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    if (this.isEmpty()) return 'Underflow';
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length == 0;
  }
}

class Graph {
  constructor(N) {
    this.num_vertices = N;
    this.AdjList = new Map();
  }
  addVertex(v) {
    this.AdjList.set(v, []);
  }
  addEdge(x, y, wt) {
    this.AdjList.get(x).push({ node: y, wt: wt });
  }
}

var networkDelayTime = function (times, N, K) {
  let graph = new Graph(N);
  let distance = {};
  let pq = new PriorityQueue();
  for (var i = 1; i <= N; i++) {
    graph.addVertex(i);
    distance[i] = Infinity;
  }
  times.forEach(function (time) {
    graph.addEdge(time[0], time[1], time[2]);
  });
  distance[K] = 0;
  pq.enqueue(K, 0);
  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.element;
    let weight = minNode.priority;
    let adjVertexes = graph.AdjList.get(currNode);
    adjVertexes.forEach(function (neigh) {
      let temp = distance[currNode] + neigh.wt;
      if (temp < distance[neigh.node]) {
        distance[neigh.node] = temp;
        pq.enqueue(neigh.node, distance[neigh.node]);
      }
    });
  }
  let time = 0;
  Object.keys(distance).forEach(function (node) {
    if (distance[node] > time) {
      time = distance[node];
    }
  });
  return time == Infinity ? -1 : time;
};
