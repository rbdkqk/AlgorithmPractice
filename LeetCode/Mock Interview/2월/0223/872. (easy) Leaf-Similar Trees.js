/*  0223 Mock Interview : 872. (easy) Leaf-Similar Trees  //  tag : Tree, Depth-first Search

  Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

                3
            /       \
          5           1
        /   \       /   \
      6       2    9      8
            /   \
          7       4
  
  For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

  Two binary trees are considered `leaf-similar` if their leaf value sequence is the same.

  Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.


  Constraints:
    The number of nodes in each tree will be in the range [1, 200].
    Both of the given trees will have values in the range [0, 200].


  Example 1:
    Input: 
      root1 = [3,5,1,6,2,9,8,null,null,7,4]
      root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
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

// 실패함 (전에도 못 풀었던 문제임)
// 깊이우선탐색으로 들어가면서 left/right 모두가 null인 경우 양쪽의 해당 값을 비교하는 방식이 아닐까 했는데,
// 아래 내 코드는 뭔가 잘못 짠 건지 틀렸다. 너무 복잡하게 생각한 듯
var leafSimilar = function (root1, root2) {
  let leaf1;
  let leaf2;

  let stack1 = [root1];
  let stack2 = [root2];

  while (Math.max(stack1.length, stack2.length) > 0) {
    let length1 = stack1.length;
    let length2 = stack2.length;

    for (let i = 0; i < length1; i++) {
      let stack1Node = stack1.pop();
      if (stack1Node.right) {
        stack1.push(stack1Node.right);
      }
      if (stack1Node.left) {
        stack1.push(stack1Node.left);
      }
      if (!stack1Node.right && !stack1Node.left) {
        leaf1 = stack1Node.val;
      }
    }

    for (let j = 0; j < length2; j++) {
      let stack2Node = stack2.pop();
      if (stack2Node.right) {
        stack2.push(stack2Node.right);
      }
      if (stack2Node.left) {
        stack2.push(stack2Node.left);
      }
      if (!stack2Node.right && !stack2Node.left) {
        leaf2 = stack2Node.val;
      }
    }

    if (leaf1 !== undefined && leaf2 !== undefined) {
      if (leaf1 !== leaf2) {
        return false;
      } else {
        leaf1 = undefined;
        leaf2 = undefined;
      }
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Beats 97% DFS with optimization
// 한눈에 잘 이해가 되지 않는다 / mode : boolean 값임
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
