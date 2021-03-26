/*  0326 Mock Interview : 404. (easy) Sum of Left Leaves  // tag : Tree

  Find the sum of all left leaves in a given binary tree.


  Example :
    Input: 
            3
          /   \
        9     20
            /   \
          15      7
    Output: There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.

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

// 성공 : 5분 소요 (더 간단하게 짤 수는 없을까?)
// Runtime: 76 ms
// Memory Usage: 40 MB
var sumOfLeftLeaves = function (root) {
  let answer = 0;

  let stack = [root];

  if (root === null) {
    return answer;
  }

  while (stack.length) {
    let length = stack.length;

    for (let i = 0; i < length; i++) {
      let currentNode = stack.pop();

      if (currentNode.left) {
        if (!currentNode.left.left && !currentNode.left.right) {
          answer += currentNode.left.val;
        }

        stack.push(currentNode.left);
      }

      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Simple Recursive JavaScript Solution
const sumOfLeftLeaves = (x, isLeft) => {
  if (!x) return 0;
  if (!x.left && !x.right && isLeft) return x.val;

  return sumOfLeftLeaves(x.left, true) + sumOfLeftLeaves(x.right, false);
};

// ======================================================================================

// 다른 사람의 코드 : Simple JavaScript, 3 lines, beats 100%
var sumOfLeftLeaves = function (root, left = false) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return left ? root.val : 0;
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution - Recursive Approach
var sumOfLeftLeaves = function (root) {
  return dfs(root, false);

  function dfs(node, isLeft) {
    if (node == null) return 0;

    if (node.left == null && node.right == null && isLeft) {
      return node.val;
    }

    const left = dfs(node.left, true);
    const right = dfs(node.right, false);

    return left + right;
  }
};
