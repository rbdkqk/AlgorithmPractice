/*  0219 : 965. (easy) Univalued Binary Tree  //  tag : Tree

  A binary tree is 'univalued' if every node in the tree has the same value.

  Return `true` if and only if the given tree is univalued.


  Note:
    The number of nodes in the given tree will be in the range [1, 100].
    Each node's value will be an integer in the range [0, 99].


  Example 1:
    Input: [1,1,1,1,1,null,1]
    Output: true

  Example 2:
    Input: [2,2,2,5,2]
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
 * @return {boolean}
 */

/*  내가 작성한 코드 : BFS 방식으로 값을 탐색해서, root.val(originValue) 값과 다른 값이 나온다면 false / 끝까지 탐색했는데 그런게 없었다면 true

  시간복잡도 : O(n) : 모든 node를 탐색해 나가며, originValue와 currentNode.val을 비교함
  공간복잡도 : O(n) : queue 배열은 트리 깊이에 따라 길어질 수 있음

  Runtime: 80 ms, faster than 69.07% of JavaScript online submissions for Univalued Binary Tree.
  Memory Usage: 39 MB, less than 55.26% of JavaScript online submissions for Univalued Binary Tree.

*/
var isUnivalTree = function (root) {
  let originValue = root.val;

  let queue = [root];

  while (queue.length) {
    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);

      if (originValue === currentNode.val) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : Simple JavaScript recursive solution
// DFS 방식인 것 같은데 이게 코드가 더 짧고 좋아보임 / 기저조건에 `return true;`를 주의하자
var isUnivalTree = function (root, value = root.val) {
  if (!root) {
    return true;
  }

  if (root.val !== value) {
    return false;
  }

  return isUnivalTree(root.left, value) && isUnivalTree(root.right, value);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript / TypeScript Solution
// 위 방법과 유사하게 DFS를 활용함. 다만 여기서는 별도의 함수를 선언했다 / (타입스크립트 방식은 기록하지 않았음)
var isUnivalTree = function (root) {
  if (!root) return true;

  const traverse = (node) => {
    if (!node) return true;
    if (root.val !== node.val) return false;
    return traverse(node.left) && traverse(node.right);
  };

  return traverse(root);
};
