/*  0315 Mock Interview : 653. (easy) Two Sum IV - Input is a BST  // tag : Tree

  Given the `root` of a Binary Search Tree and a target number `k`, 
    return true if there exist two elements in the BST such that their sum is equal to the given target.


  Constraints:
    The number of nodes in the tree is in the range [1, 10^4].
    -10^4 <= Node.val <= 10^4
    root is guaranteed to be a valid binary search tree.
    -10^5 <= k <= 10^5


  Example 1:
    Input: root = [5,3,6,2,4,null,7], k = 9
    Output: true

  Example 2:
    Input: root = [5,3,6,2,4,null,7], k = 28
    Output: false

  Example 3:
    Input: root = [2,1,3], k = 4
    Output: true

  Example 4:
    Input: root = [2,1,3], k = 1
    Output: false

  Example 5:
    Input: root = [2,1,3], k = 3
    Output: true

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
 * @param {number} k
 * @return {boolean}
 */

// 생각한 풀이방법 :
// 더해서 k가 되는 2개의 node가 존재하는지를 묻는 것 같은데, 그 2개의 node가 각각 어떤 위치에 있어도 상관없길 요구하는 것 같다
// 모든 node를 다 한번씩 돌면서 1개의 배열에 나열하고 n^2으로 돌아야 할 것 같음

// 성공 - 20분 소요 (n^2 시간복잡도라 아쉽다 - 다른 사람의 코드에서는 `Set` 객체를 활용해서 시간복잡도를 대폭 줄였음)
// Runtime: 112 ms
// Memory Usage: 48.2 MB
var findTarget = function (root, k) {
  let allNumber = [root.val];

  let queue = [root];

  while (queue.length) {
    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();
      allNumber.push(currentNode.val);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  for (let j = 0; j < allNumber.length; j++) {
    for (let l = 0; l < allNumber.length; l++) {
      if (j === l) {
        continue;
      } else if (allNumber[j] + allNumber[l] === k) {
        return true;
      }
    }
  }

  return false;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript DFS with a Set
// 나는 배열을 중복으로 돌려서 n^2이었지만, Set을 활용해서 훨씬 간편하게 처리할 수 있는 문제였다
var findTarget = function (root, k) {
  if (!root) {
    return false;
  }

  const set = new Set();
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    // k - node.val : node.val 2개를 합쳐서 k가 된다는 뜻
    if (set.has(k - node.val)) {
      return true;
    }

    set.add(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return false;
};

// ======================================================================================

// 다른 사람의 코드 : Simple JavaScript solution(faster than 90.88%)
// 위와 동일하게 DFS로 처리함. 다만 이 코드는 재귀를 선택했다
var findTarget = function (root, k) {
  const map = new Set();

  function dfs(node) {
    if (!node) return false;
    if (map.has(k - node.val)) {
      return true;
    }
    map.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
};
