/*  0217: 111. (easy) Minimum Depth of Binary Tree  //  tag : Tree, Depth-first Search

  Given a binary tree, find its minimum depth.

  The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

  
  Note: A leaf is a node with no children.


  Constraints:
    The number of nodes in the tree is in the range [0, 10^5].
    -1000 <= Node.val <= 1000


  Example 1:
    Input: root = [3,9,20,null,null,15,7]
    Output: 2

  Example 2:
    Input: root = [2,null,3,null,4,null,5,null,6]
    Output: 5

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

  시간복잡도 : O(n) : BFS 방식으로 전체 배열의 각 요소를 모두 탐색함
  공간복잡도 : O(n) : root 트리가 길어질수록 queue 배열 역시 더 많은 공간을 사용하게 될 것

  Runtime: 248 ms, faster than 91.13% of JavaScript online submissions for Minimum Depth of Binary Tree.
  Memory Usage: 73.9 MB, less than 83.45% of JavaScript online submissions for Minimum Depth of Binary Tree.

*/
var minDepth = function (root) {
  let queue = [root];

  let depth = 1;

  if (!root) return 0;

  while (queue.length) {
    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      if (!currentNode.left && !currentNode.right) {
        return depth;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    depth++;
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript clear solution
var minDepth = function (root) {
  if (root === null) return 0;
  if (root.left === null) return minDepth(root.right) + 1;
  if (root.right === null) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript simple BFS 100%
var minDepth = function (root) {
  if (!root) return 0;
  let depth = 1;
  let queue = [root];
  if (!root.left && !root.right) return depth;

  while (queue.length > 0) {
    let queueLength = queue.length;

    for (let i = 0; i < queueLength; i++) {
      let node = queue.shift();

      if (!node.left && !node.right) return depth;
      else {
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    depth++;
  }

  return depth;
};
