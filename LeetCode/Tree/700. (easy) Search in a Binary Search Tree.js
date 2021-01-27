/*  700. (easy) Search in a Binary Search Tree  //  tag : Tree

  You are given the `root` of a binary search tree (BST) and an integer `val`.

  Find the node in the BST that the node's value equals `val` 
    and return the subtree rooted with that node.
  
  If such a node does not exist, return null. 


  Constraints:
    The number of nodes in the tree is in the range [1, 5000].
    1 <= Node.val <= 10^7
    root is a binary search tree.
    1 <= val <= 10^7


  Example 1:
    Input: root = [4,2,7,1,3], val = 2
    Output: [2,1,3] 

  Example 2:
    Input: root = [4,2,7,1,3], val = 5
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
 * @param {number} val
 * @return {TreeNode}
 */

/* 내가 작성한 코드 (2) : 다른 사람의 답을 보고 참고해서 수정함
  - 이진 트리이므로, '좌측은 나보다 작고 우측은 나보다 크다'

  시간복잡도 : O(n) : root부터 시작해서 BFS로 한바퀴 다 돌아야 한다
  공간복잡도 : O(1) : 이진 트리이므로 queue 배열은 하나 빼고 2개 넣는 상황이 반복될 것임

  Runtime: 132 ms, faster than 7.75% of JavaScript online submissions for Search in a Binary Search Tree.
  Memory Usage: 45.5 MB, less than 8.63% of JavaScript online submissions for Search in a Binary Search Tree.

 */

var searchBST = function (root, val) {
  let queue = [root];

  while (queue.length) {
    let currentNode = queue.shift();

    if (currentNode === null) {
      continue;
    }

    if (currentNode && currentNode.val === val) {
      return currentNode;
    }

    if (currentNode.val > val) {
      queue.push(currentNode.left);
    } else {
      queue.push(currentNode.right);
    }
  }

  return null;
};

// ======================================================================================

/* 내가 작성한 코드 (1)

  시간복잡도 : O(n) : root부터 시작해서 BFS로 한바퀴 다 돌아야 한다
  공간복잡도 : O(1) : 이진 트리이므로 queue 배열은 하나 빼고 2개 넣는 상황이 반복될 것임

  Runtime: 132 ms, faster than 7.75% of JavaScript online submissions for Search in a Binary Search Tree.
  Memory Usage: 45.5 MB, less than 8.63% of JavaScript online submissions for Search in a Binary Search Tree.

 */

var searchBST = function (root, val) {
  let queue = [root];

  while (queue.length) {
    let currentNode = queue.shift();

    if (currentNode === null) {
      continue;
    }

    if (currentNode && currentNode.val === val) {
      return currentNode;
    }

    queue.push(currentNode.left);
    queue.push(currentNode.right);
  }

  return null;
};

// ======================================================================================

// 다른 사람의 코드 : Recursion with helper function
var searchBST = function (root, val) {
  let res = null;
  const helper = (node) => {
    if (!node) return;
    if (node.val === val) {
      res = node;
      return;
    }
    if (val < node.val) helper(node.left);
    if (val > node.val) helper(node.right);
  };

  helper(root);
  return res;
};

// ======================================================================================

// 다른 사람의 코드 : Pure Recursion
var searchBST = function (root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  if (val > root.val) return searchBST(root.right, val);
};

//

// 다른 사람의 코드 : Iterative
// no need to use stack since "val"  or "null" will be eventually found in the end
// and we do not need to traverse what we skipped
var searchBST = function (root, val) {
  while (root !== null && root.val !== val) {
    root = val < root.val ? root.left : root.right;
  }
  return root;
};
