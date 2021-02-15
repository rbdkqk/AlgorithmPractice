/*  0216 : 100. (easy) Same Tree  //  tag : Tree, Depth-first Search

  Given the roots of two binary trees `p` and `q`, 
    write a function to check if they are the same or not.

  Two binary trees are considered the same if they are structurally identical, 
    and the nodes have the same value.


  Constraints:
    The number of nodes in both trees is in the range [0, 100].
    -10^4 <= Node.val <= 10^4


  Example 1:
    Input: p = [1,2,3], q = [1,2,3]
    Output: true

  Example 2:
    Input: p = [1,2], q = [1,null,2]
    Output: false

  Example 3:
    Input: p = [1,2,1], q = [1,1,2]
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

/*  내가 작성한 코드 : 

  시간복잡도 : O(n) : DFS 방식으로 전체 배열의 각 요소를 모두 탐색함
  공간복잡도 : O(n) : p, q 트리가 길어질수록 재귀함수 역시 여러번 호출되므로 콜스택 역시 그만큼 더 쌓이게 됨

  Runtime: 80 ms, faster than 57.40% of JavaScript online submissions for Same Tree.
  Memory Usage: 39.2 MB, less than 5.31% of JavaScript online submissions for Same Tree.

*/
var isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true;
  }

  if (p === null || q === null || p.val !== q.val) {
    return false;
  }

  if (
    isSameTree(p.left, q.left) === false ||
    isSameTree(p.right, q.right) === false
  ) {
    return false;
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
var isSameTree = function (p, q) {
  // the same if both nodes are null
  if (!p && !q) return true;
  // not the same if either of the nodes is null or the values are different
  if ((!p && q) || (p && !q) || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript, recursion / iterative
// recursion
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

// iterative
var isSameTree = function (p, q) {
  const stack1 = [],
    stack2 = [];
  while (p || q || stack1.length || stack2.length) {
    while (p) {
      stack1.push(p);
      p = p.left;
    }
    while (q) {
      stack2.push(q);
      q = q.left;
    }
    p = stack1.pop();
    q = stack2.pop();
    if (!p && !q) {
      continue;
    }
    if (!p || !q || p.val !== q.val) {
      return false;
    }
    stack1.push(null);
    stack2.push(null);
    p = p.right;
    q = q.right;
  }
  return true;
};
