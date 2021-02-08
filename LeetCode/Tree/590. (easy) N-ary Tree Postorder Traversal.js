/*  0208 : 590. (easy) N-ary Tree Postorder Traversal //  tag : Tree

  Given an n-ary tree, return the `postorder` traversal of its nodes' values.

  Nary-Tree input serialization is represented in their level order traversal, 
    each group of children is separated by the null value (See examples).

  Follow up: Recursive solution is trivial, could you do it iteratively?


  Constraints:
    The height of the n-ary tree is less than or equal to 1000
    The total number of nodes is between [0, 10^4]


  Example 1: 
    Input: root = [1,null,3,2,4,null,5,6]
    Output: [5,6,3,2,4,1]

  Example 2:
    Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]

*/

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */

/*  내가 작성한 코드 

  시간복잡도 : O(n) : root부터 시작해서 모든 node를 전부 탐색해야 한다 (DFS 방식으로)
  공간복잡도 : O(n) : 모든 node의 개수만큼 각 재귀 호출이 계속되므로 콜스택 역시 그만큼 차지하게 될 것임

  Runtime: 96 ms, faster than 79.06% of JavaScript online submissions for N-ary Tree Postorder Traversal.
  Memory Usage: 42.6 MB, less than 38.64% of JavaScript online submissions for N-ary Tree Postorder Traversal.

*/
var postorder = function (root) {
  let answer = [];

  function recursion(node) {
    if (!node) {
      return;
    }

    for (let child of node.children) {
      recursion(child);
    }

    answer.push(node.val);
  }

  recursion(root);

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Iterative & Recursive

// Iteravtive Post-order Traverse
// Time Complexity: O(N)
// Space Complexity: O(N)
var postorder = function (root) {
  const res = [],
    stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    if (!curr) continue;
    res.push(curr.val);
    stack.push(...curr.children);
  }
  return res.reverse();
};

// Recursive Post-order Traverse
// Time Complexity: O(N)
// Space Complexity: O(log N) in average case.  / O(N) in worst case, that there is an unbalanced tree.
var postorder = function (root) {
  const res = [];
  traverse(root);
  return res;

  function traverse(node) {
    if (!node) return;
    for (child of node.children) {
      traverse(child);
    }
    res.push(node.val);
  }
};
