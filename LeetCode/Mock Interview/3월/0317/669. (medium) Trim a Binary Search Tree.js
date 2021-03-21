/*  0317 Mock Interview : 669. (medium) Trim a Binary Search Tree  // tag : Tree, Recursion

  Given the `root` of a binary search tree and the lowest and highest boundaries as `low` and `high`, 
    trim the tree so that all its elements lies in [low, high]. 
    Trimming the tree should not change the relative structure of the elements that will remain in the tree 
      (i.e., any node's descendant should remain a descendant). 
    It can be proven that there is a unique answer.

  Return the root of the trimmed binary search tree. 
      Note that the root may change depending on the given bounds.


  Constraints:
    The number of nodes in the tree in the range [1, 10^4].
    0 <= Node.val <= 10^4
    The value of each node in the tree is unique.
    root is guaranteed to be a valid binary search tree.
    0 <= low <= high <= 10^4


  Example 1:
    Input: root = [1,0,2], low = 1, high = 2
    Output: [1,null,2]

  Example 2:
    Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
    Output: [3,2,null,1]

  Example 3:
    Input: root = [1], low = 1, high = 2
    Output: [1]

  Example 4:
    Input: root = [1,null,2], low = 1, high = 3
    Output: [1,null,2]

  Example 5:
    Input: root = [1,null,2], low = 2, high = 4
    Output: [2]

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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */

// 실패 - 접근법을 잘 모르겠다 / 다른 사람들의 코드를 봐도 잘 이해되지 않음
var trimBST = function (root, low, high) {
  let stack = [root];

  while (stack.length) {
    let currentNode = stack.pop();

    if (currentNode.val < low || high < currentNode.val) {
      if (
        currentNode.left &&
        (currentNode.left.val >= low || high >= currentNode.left.val)
      ) {
        currentNode = currentNode.left;
      } else if (
        currentNode.right &&
        (currentNode.right.val >= low || high >= currentNode.right.val)
      ) {
        currentNode = currentNode.right;
      }
    }

    if (currentNode.left) stack.push(currentNode.left);
    if (currentNode.right) stack.push(currentNode.right);
  }

  return root;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution with Recursion
var trimBST = function (root, L, R) {
  if (root === null) {
    return null;
  }

  if (root.val > R) {
    // skip and go left
    return trimBST(root.left, L, R);
  }

  if (root.val < L) {
    // skip and go right
    return trimBST(root.right, L, R);
  }

  // connect left and right child to the next qualified node
  root.left = trimBST(root.left, L, R);
  root.right = trimBST(root.right, L, R);

  return root;
};

// ======================================================================================

// 다른 사람의 코드 : [JS] Post-order recursive DFS (linear time, logarithmic space)
function trimBST(root, low, high) {
  if (!root) return null;

  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);

  if (root.val < low) return root.right;
  if (root.val > high) return root.left;

  return root;
}
