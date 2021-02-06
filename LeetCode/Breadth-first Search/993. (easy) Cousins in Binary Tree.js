/*  0206 : 993. (easy) Cousins in Binary Tree  //  tag : Tree, Breadth-first Search

  In a binary tree, the root node is at depth `0`, and children of each depth `k` node are at depth `k+1`.

  Two nodes of a binary tree are `cousins` 
    if they have the same depth, but have different parents.

  We are given the root of a binary tree with unique values, 
    and the values `x` and `y` of two different nodes in the tree.

  Return `true`  
    if and only if the nodes corresponding to the values `x` and `y` are cousins.


  Constraints:
    The number of nodes in the tree will be between 2 and 100.
    Each node has a unique integer value from 1 to 100.


  Example 1: 
    Input: root = [1,2,3,4], x = 4, y = 3
    Output: false

  Example 2:
    Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
    Output: true

  Example 3:
    Input: root = [1,2,3,null,4], x = 2, y = 3
    Output: false

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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

/*  내가 작성한 코드 : 코드가 너무 길고, 중복되는 부분이 있음

  시간복잡도 : O(n) : root부터 시작해서 트리를 한바퀴 모두 돌아야 함
  공간복잡도 : O(n) : root부터 시작해서 트리를 한바퀴 모두 돌아야 함 

  Runtime: 92 ms, faster than 36.90% of JavaScript online submissions for Cousins in Binary Tree.
  Memory Usage: 40.4 MB, less than 37.17% of JavaScript online submissions for Cousins in Binary Tree.

*/
var isCousins = function (root, x, y) {
  let currentDepth = 0;

  let queue = [root];

  let xDepth = undefined;
  let xParent = undefined;
  let yDepth = undefined;
  let yParent = undefined;

  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      let currentNode = queue.shift();

      if (currentNode.left) {
        queue.push(currentNode.left);
        if (currentNode.left.val === x) {
          xDepth = currentDepth;
          xParent = currentNode.val;
        } else if (currentNode.left.val === y) {
          yDepth = currentDepth;
          yParent = currentNode.val;
        }
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
        if (currentNode.right.val === x) {
          xDepth = currentDepth;
          xParent = currentNode.val;
        } else if (currentNode.right.val === y) {
          yDepth = currentDepth;
          yParent = currentNode.val;
        }
      }
    }

    currentDepth++;

    if (xDepth && yDepth && xParent && yParent) {
      break;
    }
  }

  if (xDepth === yDepth && xParent !== yParent) {
    return true;
  } else {
    return false;
  }
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript iterative BFS solution
var isCousins = function (root, x, y) {
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    let foundX = false;
    let foundY = false;
    // iterate through one level
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      // check if children are x and y
      if (node.left && node.right) {
        if (
          (node.left.val === x && node.right.val === y) ||
          (node.left.val === y && node.right.val === x)
        )
          return false;
      }
      // find x and y at the same level
      if (node.val === x) foundX = true;
      if (node.val === y) foundY = true;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    if (foundX && foundY) return true;
  }
  return false;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Simple Solution 48ms
var isCousins = function (root, x, y) {
  function getDepthAndParent(node, n, depth = 0, parent) {
    if (!node) return null;
    if (node.val === n) {
      return { depth, parent };
    }
    let left = getDepthAndParent(node.left, n, depth + 1, node);
    let right = getDepthAndParent(node.right, n, depth + 1, node);
    return left || right;
  }

  let { depth: xDepth, parent: xParent } = getDepthAndParent(root, x);
  let { depth: yDepth, parent: yParent } = getDepthAndParent(root, y);

  return xDepth === yDepth && xParent !== yParent;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript simple bfs
var isCousins = function (root, x, y) {
  const queue = [];
  queue.push(root);

  while (queue.length) {
    // check if two target nodes exist together in the same depth level
    if (
      queue.filter((node) => x === node.val).length &&
      queue.filter((node) => y === node.val).length
    ) {
      return true;
    }
    const L = queue.length;
    for (let i = 0; i < L; i++) {
      const node = queue.shift();
      // check if the two target values share the same parent
      if (node.left && node.right) {
        if (
          (node.left.val === x && node.right.val === y) ||
          (node.right.val === x && node.left.val === y)
        ) {
          return false;
        }
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return false;
};
