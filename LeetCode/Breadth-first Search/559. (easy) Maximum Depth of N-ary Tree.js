/*  559. Maximum Depth of N-ary Tree  //  tag : Tree, Depth-first Search, Breadth-first Search

  Given a n-ary tree, find its maximum depth.
  The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
  Nary-Tree input serialization is represented in their level order traversal, 
    each group of children is separated by the null value (See examples).


  Constraints:
    The depth of the n-ary tree is less than or equal to 1000.
    The total number of nodes is between [0, 10^4].


  Example 1: 

                  1
              /   |   \
            3     2     4
          /   \
        5       6

    Input: root = [1,null,3,2,4,null,5,6]
    Output: 3


  Example 2: (그림 생략)

    Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    Output: 5

*/

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */

/*  30분 안에 못 풀었음 : 다른 사람의 답을 기록에 남김

  시간복잡도 : O(n) : 전체 node들을 다 탐색해야 함
  공간복잡도 : O(1) : max라는 1개 변수의 값을 변경해 나갈 뿐임

*/

var maxDepth = function (root) {
  if (root == null) {
    return 0;
  }

  let max = 0;

  for (let child of root.children) {
    max = Math.max(max, maxDepth(child));
  }

  return max + 1;
};

// ======================================================================================

// 다른 사람의 답 : DFS Recursion with helper function:
var maxDepth = function (root) {
  if (!root) return 0;
  let max = -1;

  const helper = (node, depth) => {
    if (depth > max) max = depth;
    for (let c of node.children) {
      helper(c, depth + 1);
    }
  };

  helper(root, 1);
  return max;
};

// ======================================================================================

// 다른 사람의 답 : BFS iteration : 내가 처음에 시도했던 방식과 유사해 보임
var maxDepth = function (root) {
  if (!root) return 0;
  // Note: it is not advised to use array as queue
  let queue = [],
    depthCount = 0;
  queue.push(root);

  while (queue.length > 0) {
    let len = queue.length;

    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      for (let child of node.children) queue.push(child);
    }
    depthCount++;
  }
  return depthCount;
};
