/*  0208 : 589. (easy) N-ary Tree Preorder Traversal //  tag : Tree

  Given an n-ary tree, return the `preorder` traversal of its nodes' values.

  Nary-Tree input serialization is represented in their level order traversal, 
    each group of children is separated by the null value (See examples).

  Follow up: Recursive solution is trivial, could you do it iteratively?


  Constraints:
    The height of the n-ary tree is less than or equal to 1000
    The total number of nodes is between [0, 10^4]


  Example 1: 
    Input: root = [1,null,3,2,4,null,5,6]
    Output: [1,3,5,6,2,4]
  
  Example 2:
    Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

*/

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */

/*  내가 작성한 코드 : 재귀 방식

  시간복잡도 : O(n) : root부터 시작해서 모든 node를 전부 탐색해야 한다 (DFS 방식으로)
  공간복잡도 : O(n) : 모든 node의 개수만큼 각 재귀 호출이 계속되므로 콜스택 역시 그만큼 차지하게 될 것임

  Runtime: 100 ms, faster than 56.74% of JavaScript online submissions for N-ary Tree Preorder Traversal.
  Memory Usage: 42.7 MB, less than 27.74% of JavaScript online submissions for N-ary Tree Preorder Traversal.

*/
var preorder = function (root) {
  let answer = [];

  function recursion(node) {
    if (!node) {
      return;
    }

    answer.push(node.val);

    for (let child of node.children) {
      recursion(child);
    }
  }

  recursion(root);

  return answer;
};

/*  내가 작성한 코드 : 반복문 방식

  시간복잡도 : O(n) : root부터 시작해서 모든 node를 전부 탐색해야 한다 (DFS 방식으로)
  공간복잡도 : O(n) : 모든 node의 개수만큼 각 재귀 호출이 계속되므로 콜스택 역시 그만큼 차지하게 될 것임

  Runtime: 104 ms, faster than 37.15% of JavaScript online submissions for N-ary Tree Preorder Traversal.
  Memory Usage: 42.4 MB, less than 51.91% of JavaScript online submissions for N-ary Tree Preorder Traversal.

*/
var preorder = function (root) {
  let answer = [];
  let stack = [root];

  while (stack.length) {
    let currentNode = stack.pop();

    if (!currentNode) {
      continue;
    }

    answer.push(currentNode.val);

    for (let i = currentNode.children.length - 1; i >= 0; i--) {
      stack.push(currentNode.children[i]);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : two solutions JavaScript

// solution 1:
var preorder = function (root) {
  const result = [];
  function traverse(tree) {
    if (!tree) {
      return result;
    }
    result.push(tree.val);
    for (let i = 0; i < tree.children.length; i++) {
      traverse(tree.children[i]);
    }
    return result;
  }
  return traverse(root);
};

// solution 2:
var preorder = function (root) {
  const stack = [];
  const result = [];
  if (!root) {
    return result;
  }
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return result;
};

// ======================================================================================

// 다른 사람의 코드 : Fast iterative javascript solution (faster than 99% of all solutions)
var preorder = function (root) {
  if (!root) return [];

  const stack = [root];
  const result = [];

  while (stack.length) {
    const next = stack.pop();

    result.push(next.val);

    if (next.children.length) {
      while (next.children.length) {
        stack.push(next.children.pop());
      }
    }
  }

  return result;
};
