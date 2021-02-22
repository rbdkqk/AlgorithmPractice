/*  0221 Mock Interview : 515. (medium) Find Largest Value in Each Tree Row  //  tag : Tree, Depth-first Search, Breadth-first Search

  Given the root of a binary tree, 
    return an array of the largest value in each row of the tree (0-indexed).


  Constraints:
    The number of nodes in the tree will be in the range [0, 104].
    -2^31 <= Node.val <= 2^31 - 1


  Example 1:
    Input: root = [1,3,2,5,3,null,9]
    Output: [1,3,9]

  Example 2:
    Input: root = [1,2,3]
    Output: [1,3]

  Example 3:
    Input: root = [1]
    Output: [1]

  Example 4:
    Input: root = [1,null,2]
    Output: [1,2]

  Example 5:
    Input: root = []
    Output: []

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

/*  내가 작성한 코드

  시간복잡도 : O(n) : BFS 방식의 탐색 (의문 : answer 배열을 만들기 위해, queue 배열을 매번 돌리는 점에서 시간복잡도가 불리해질 수 있을 듯)
  공간복잡도 : O(n) : queue 배열은 전체 노드보다 적을 것임

  Runtime: 100 ms, faster than 41.18% of JavaScript online submissions for Find Largest Value in Each Tree Row.
  Memory Usage: 44 MB, less than 15.69% of JavaScript online submissions for Find Largest Value in Each Tree Row.

*/
var largestValues = function (root) {
  let queue = [root];

  let answer = [];

  if (root === null) {
    return [];
  }

  while (queue.length) {
    let length = queue.length;

    let max = queue[0].val;

    for (let node of queue) {
      if (node.val > max) {
        max = node.val;
      }
    }

    answer.push(max);

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Clean JS fast code
// DFS 방식으로 탐색하면서도, level 매개변수를 활용해서 res 배열의 [level]번째 위치 값을 매번 바꿔주는 방식
var largestValues = function (root) {
  let res = [];
  if (!root) return res;
  function trav(node, level) {
    if (!node) return;
    if (res[level] == undefined || res[level] < node.val) res[level] = node.val;
    if (node.left) trav(node.left, level + 1);
    if (node.right) trav(node.right, level + 1);
  }
  trav(root, 0);
  return res;
};

// ======================================================================================

// 다른 사람의 코드 : Easy Javascript Solution (BFS)
// `-Infinity`의 활용방법을 나는 잘 모름
// 최대값을 가져오기 위해 (나는 for 반복문을 한번 더 돌렸는데) for 반복문 하나 안에서 모두 처리해 냄
var largestValues = function (root) {
  if (!root) return [];
  let queue = [];
  let results = [];
  queue.push(root);
  while (queue.length) {
    const length = queue.length;
    let max = -Infinity;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      if (max < node.val) max = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    results.push(max);
  }
  return results;
};
