/*  0304 Mock Interview : 1192. (hard) Critical Connections in a Network  //  tag : Depth-first Search

  There are `n` servers numbered from `0` to `n-1` 
    connected by undirected server-to-server connections forming a network 
      where `connections[i] = [a, b]` represents a connection between servers `a` and `b`. 

  Any server can reach any other server directly or indirectly through the network.

  A `critical connection` is a connection that, 
    if removed, will make some server unable to reach some other server.

  Return all critical connections in the network in any order.


  Constraints:
    1 <= n <= 10^5
    n-1 <= connections.length <= 10^5
    connections[i][0] != connections[i][1]
    There are no repeated connections.


  Example 1:
    Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
    Output: [[1,3]]
    Explanation: [[3,1]] is also accepted.

*/

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */

// 내가 이해한 문제의 뜻 : '연결된 서버가 단 1개인 연결들을 찾아내라'(2개 이상과 연결되었다면 하나가 끊겨도 살아남으니까)
// => '어떤 서버는 전체 중에 1번만 언급되었을 것이다. 그 연결을 찾아내서 모아서 리턴하자'
// => 틀린 접근이었음
var criticalConnections = function (n, connections) {
  let answer = [];

  let map = new Map();

  for (let i = 0; i < connections.length; i++) {
    for (let j = 0; j < 2; j++) {
      if (!map.has(connections[i][j])) {
        map.set(connections[i][j], 1);
      } else {
        map.set(connections[i][j], map.get(connections[i][j]) + 1);
      }
    }
  }

  let keys = map.keys();

  for (let eachKey of keys) {
    if (map.get(eachKey) !== 1) {
      map.delete(eachKey);
    }
  }

  for (let l = 0; l < connections.length; l++) {
    for (let m = 0; m < 2; m++) {
      if (map.has(connections[l][m])) {
        answer.push(connections[l].slice());
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Step-by-step explanation for dummies (tags : javascript / tarjan)
// 설명을 읽어는 봤고 알아둬야 할 것 같은 내용인데, 생각해 내기는 어렵다...
/* link : https://leetcode.com/problems/critical-connections-in-a-network/discuss/550837/Step-by-step-explanation-for-dummies

  1. Finding cycles in graphs
    Graph traversals are very similar to tree traversals. 
    When you're traversing a tree with depth-first-search (DFS), there is no way that you're going to visit an already visited node again. 
    This is because there is only one path to enter a node.

    This cannot be guaranteed in case of a graph traversal with DFS, because there can be multiple paths to enter one node. 
      (which is the reason you have to keep track of visited nodes in graph DFS). 
    So we can say in any connected set of nodes, if there is only one path to enter a node then it is a tree, otherwise it's a graph. 
    When there are multiple paths to enter a node, it means there is a cycle in that set of connected nodes. 

    In other words, graphs are trees with cycles. Or, trees are graphs without cycles.

    When you're traversing a graph with DFS, consider as if you're doing DFS on a tree. 
    As soon as you find that a child is actually an ancestor of a node (also called a backlink), you'd know that current node is part of a cycle.


  2. `Trajan's algorithm`
    Run a DFS traversal on the graph. 
    As you're visiting a node, save the timestamp of your visit with the node. 
    
    After you have visited all of the nodes, for each node find out (and store as a property of this node) the timestamp of oldest visited node that is reachable from this node (let's call this "lowlink", but it can be anything). 
    
    At the end, you'd find out that the nodes that belong to same cycle have the same lowlink values.
    Since the purpose of timestamp is only to find out the order in which nodes were traversed, you can use a simple integer starting from 0 and increment it every time you visit a new node.

*/

const buildAdjList = (n, connections) => {
  const r = Array(n)
    .fill()
    .map(() => []);

  for (let c of connections) {
    const [a, b] = c;
    r[a].push(b);
    r[b].push(a);
  }

  return r;
};

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
  const adjList = buildAdjList(n, connections);
  const orderList = Array(n).fill();
  const lowlinkList = Array(n).fill();

  let order = 0;
  const cycles = [];
  const critical = [];

  const strongConnect = (i, p) => {
    orderList[i] = order++;
    lowlinkList[i] = orderList[i];

    for (const j of adjList[i]) {
      if (j === p) {
        continue;
      }

      if (orderList[j] === undefined) {
        strongConnect(j, i);
      }

      lowlinkList[i] = Math.min(lowlinkList[i], lowlinkList[j]);

      // A higher lowlink value for node `j` means that the oldest
      // ancestor that could be reached from node `j` is still younger
      // than node `i`. Had there been any other path from `j` to `i`,
      // `j`'s lowlink value would have been lower. Hence this connection
      // is critical.
      if (lowlinkList[j] > orderList[i]) {
        critical.push([i, j]);
      }
    }
  };

  for (const i in adjList) {
    if (orderList[+i] !== undefined) {
      continue;
    }

    strongConnect(+i);
  }

  return critical;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution. Detailed Explanation
/*
  Goal is to 'find edges that don't lead to a cycle'.

  rank   - time stamp of your dfs traversal
  minObs - without retraversing through visited node (but you will "peek" to observe the rank of visited node)
            lowest rank observed on that path (path ends when it hits a leaf or a dead end (all children are already visited))

  You will have a cycle if a child's minObs is lower than or equal to rank 
    (example, if child's minObs is equal to the nodes rank that it hit itself on the way, thus a cycle. 
      lower minObs would mean it would eventually lead back to the node itself, so same meaning)
  
  so mark your graph with rank and along the way keep track of minObs for each node. 
  if node.rank > child.minObs, edge between node and child is a bridge since that edge will never lead back to the node itself along the way.
*/

const criticalConnections = (n, connections) => {
  // need graph to traverse
  const graph = createGraph(n, connections);

  // so you never retraverse visited path. if child was visited and IS NOT a direct parent, you will
  // end up peeking for its value to keep track of minObs in the way
  const visited = new Set();
  let rank = 0;

  // this will be your output. if condition meets, edge will be pushed here
  const output = [];

  // dfs function in this scope so variable rank is easily updated
  function dfs(node, parent) {
    visited.add(node.val);

    // by default, minObs will be at the greatest its own rank
    node.rank = rank;
    node.minObs = rank;

    // increment rank for next nodes
    rank++;

    node.children.forEach((child) => {
      // don't revisit your parent
      if (child === parent) {
        return;
      }
      if (visited.has(child)) {
        // if node visited, just peek the value
        node.minObs = Math.min(node.minObs, graph[child].minObs);
        return;
      } else {
        // traverse and also update minObs so its parent can use it later
        node.minObs = Math.min(node.minObs, dfs(graph[child], node.val));
      }

      // condition explained in the comments above
      if (node.rank < graph[child].minObs) output.push([node.val, child]);
    });

    return node.minObs;
  }

  dfs(graph[connections[0][0]], connections[0][0]);

  return output;
};

function createGraph(n, connections) {
  const output = {};

  for (let i = 0; i < n; i++) {
    output[i] = { val: i, children: [], rank: -Infinity, minObs: Infinity };
  }

  connections.forEach((connection) => {
    output[connection[0]].children.push(connection[1]);
    output[connection[1]].children.push(connection[0]);
  });

  return output;
}
