/*  0205 : 872. (easy) Leaf-Similar Trees  //  tag : Tree, Depth-first Search

  Consider all the leaves of a binary tree, from left to right order, 
    the values of those leaves form a leaf value sequence.

  For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).
    Two binary trees are considered leaf-similar if their leaf value sequence is the same.
    Return `true` if and only if the two given trees with head nodes root1 and root2 are leaf-similar.


  Constraints:
    The number of nodes in each tree will be in the range [1, 200].
    Both of the given trees will have values in the range [0, 200].


  Example 1: (그림 생략)
    Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
    Output: true

  Example 2:

    Input: root1 = [1], root2 = [1]
    Output: true
  
  Example 3:
    Input: root1 = [1], root2 = [2]
    Output: false
  
  Example 4:
    Input: root1 = [1,2], root2 = [2,2]
    Output: true

  Example 5:
    Input: root1 = [1,2,3], root2 = [1,3,2]
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

/*  내가 작성한 코드 : 혼자 못해서 다른 사람들의 코드 및 solution 코드를 보고 작성했음

  시간복잡도 : O(3n) => O(n) : 재귀 2바퀴 + for 반복문 1바퀴
  공간복잡도 : O(4n) => O(n) : 재귀에서 자식 node 2바퀴(콜스택) + 배열 2개

  Runtime: 84 ms, faster than 60.52% of JavaScript online submissions for Leaf-Similar Trees.
  Memory Usage: 40.4 MB, less than 49.45% of JavaScript online submissions for Leaf-Similar Trees.

*/
var leafSimilar = function (root1, root2) {
  let root1Array = [];
  let root2Array = [];

  function recursion(node, leavesArray) {
    if (node !== null) {
      if (node.left === null && node.right === null) {
        leavesArray.push(node.val);
      }
      recursion(node.left, leavesArray);
      recursion(node.right, leavesArray);
    }
  }

  recursion(root1, root1Array);
  recursion(root2, root2Array);

  if (root1Array.length !== root2Array.length) {
    return false;
  }

  for (let i = 0; i < root1Array.length; i++) {
    if (root1Array[i] !== root2Array[i]) {
      return false;
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Beats 97% DFS with optimization
var leafSimilar = function (root1, root2) {
  const deque = [];
  const dfs = (node, mode) => {
    if (!node) return true;
    if (!node.left && !node.right) {
      if (!mode) {
        deque.push(node.val);
      } else {
        if (node.val !== deque.shift()) return false;
      }
    }
    return dfs(node.left, mode) && dfs(node.right, mode);
  };
  return dfs(root2, dfs(root1, false));
};

// ======================================================================================

// 다른 사람의 코드 : easy to understand javascript
var leafSimilar = function (root1, root2) {
  let lAry = [];
  let rAry = [];
  getLeaf(root1, lAry);
  getLeaf(root2, rAry);
  if (lAry.length != rAry.length) return false;
  for (let i = 0; i < lAry.length; ++i) {
    if (lAry[i] != rAry[i]) return false;
  }
  return true;
};

var getLeaf = function (root, ary) {
  if (!root) return;
  if (!root.left && !root.right) {
    ary.push(root.val);
  }
  getLeaf(root.left, ary);
  getLeaf(root.right, ary);
};
