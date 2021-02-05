/*  0205 : 104. (easy) Maximum Depth of Binary Tree  //  tag : Tree, Depth-first Search, Recursion

  Given the `root` of a binary tree, return its maximum depth.

  A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.


  Constraints:
    The number of nodes in the tree is in the range [0, 10^4].
    -100 <= Node.val <= 100


  Example 1: (그림 생략)
    Input: root = [3,9,20,null,null,15,7]
    Output: 3

  Example 2:
    Input: root = [1,null,2]
    Output: 2

  Example 3:
    Input: root = []
    Output: 0
  
  Example 4:
    Input: root = [0]
    Output: 1

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
 * @return {number}
 */

/*  내가 작성한 코드

  시간복잡도 : O(n) : root부터 시작해서 모든 node를 전부 탐색해야 함
  공간복잡도 : O(n) : root부터 시작해서 모든 node를 전부 탐색하는 동안, 매번 각 재귀호출이 진행되고 그때마다 콜스택이 쌓임

  Runtime: 88 ms, faster than 67.20% of JavaScript online submissions for Maximum Depth of Binary Tree.
  Memory Usage: 41.5 MB, less than 47.83% of JavaScript online submissions for Maximum Depth of Binary Tree.
  
*/
var maxDepth = function (root) {
  let depth = 1;

  if (root === null) {
    return 0;
  }

  function recursion(node, startDepth) {
    if (node === null) {
      return;
    }

    if (depth < startDepth) {
      depth = startDepth;
    }

    recursion(node.left, startDepth + 1);
    recursion(node.right, startDepth + 1);
  }

  recursion(root, 1);

  return depth;
};

// ======================================================================================

// 다른 사람의 코드 : My solution in javascript
// 나는 생각하지 못할 방식임
var maxDepth = function (root) {
  if (root === undefined || root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// ======================================================================================

// 다른 사람의 코드 : Two easy solution using JavaScript

// Solution 1: non-recursive
var maxDepth = function (root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length !== 0) {
    depth++;
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
    }
    queue.splice(0, len);
  }
  return depth;
};

// Solution 2: recursive
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
