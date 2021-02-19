/*  0219 : 1022. (easy) Sum of Root To Leaf Binary Numbers  //  tag : Tree

  You are given the `root` of a binary tree where each node has a value 0 or 1.  
    Each root-to-leaf path represents a binary number starting with the most significant bit.  
    For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.

  For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.

  Return the sum of these numbers. 
    The answer is guaranteed to fit in a 32-bits integer.


  Constraints:
    The number of nodes in the tree is in the range [1, 1000].
    Node.val is 0 or 1.


  Example 1:
    Input: root = [1,0,1,0,1,0,1]
    Output: 22
    Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

  Example 2:
    Input: root = [0]
    Output: 0

  Example 3:
    Input: root = [1]
    Output: 1

  Example 4:
    Input: root = [1,1]
    Output: 3

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
 * @return {number}
 */

/*  내가 작성한 코드 : DFS 방식으로 값을 탐색해서, leaf까지 갔다면 10진수로 변환하여 누적

  시간복잡도 : O(n) : 각 노드마다 재귀함수가 호출되어, parseInt 등의 연산이 1회씩 진행될 것 (node의 수만큼 연산된다)
  공간복잡도 : O(n) : 각 노드마다 재귀함수가 호출되어, dfs 재귀함수의 콜스택 역시 그만큼 쌓일 것임

  Runtime: 84 ms, faster than 81.73% of JavaScript online submissions for Sum of Root To Leaf Binary Numbers.
  Memory Usage: 40.9 MB, less than 18.78% of JavaScript online submissions for Sum of Root To Leaf Binary Numbers.

*/
// 내 생각 : parseInt를 활용한 2진수->10진수 등의 변환 방법을 잘 알아야 하겠다 (첫번째 인자를 문자열 형태로 넣어줘야 함)
var sumRootToLeaf = function (root) {
  let answer = 0;

  function dfs(node, value) {
    if (!node.left && !node.right) {
      answer += Number(parseInt(value, 2));
      return;
    }

    if (node.left) dfs(node.left, value + String(node.left.val));
    if (node.right) dfs(node.right, value + String(node.right.val));
  }

  dfs(root, String(root.val));

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
var sumRootToLeaf = function (root) {
  const binaries = [];
  const traverse = (node, str) => {
    if (node === null) {
      return;
    }
    // compose the binary string for the next node
    const binary = `${str}${node.val}`;
    // when visiting a leaf, add binary string to the array
    if (node.left === null && node.right === null) {
      binaries.push(binary);
    }

    traverse(node.left, binary);
    traverse(node.right, binary);
  };

  traverse(root, '');

  return binaries.reduce((sum, binary) => {
    sum += parseInt(binary, 2);
    return sum;
  }, 0);
};

// ======================================================================================

// 다른 사람의 코드 : Javascript 99.5% time 100% space
// 내 생각 : 이진수를 처리하는 방법이 이해가 잘 되지 않음
var sumRootToLeaf = function (root) {
  let sum = [];
  sumRoot(root, sum, 0);
  return sum.reduce((acc, curr) => acc + curr, 0);
};

function sumRoot(root, sum, curr) {
  curr = curr * 2 + root.val;
  if (!root.left && !root.right) sum.push(curr);

  if (root.left) sumRoot(root.left, sum, curr);
  if (root.right) sumRoot(root.right, sum, curr);
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript 1 Liner
const sumRootToLeaf = ({ val, left, right }, acc = '') =>
  !left && !right
    ? parseInt(acc + val, 2)
    : (left ? sumRootToLeaf(left, acc + val) : 0) +
      (right ? sumRootToLeaf(right, acc + val) : 0);

// stack-based solution
var sumRootToLeaf = function (root) {
  let answer = 0;
  const stack = [[root, '']];
  while (0 < stack.length) {
    let [{ val, left, right }, acc] = stack.pop();
    acc += val;
    if (left) stack.push([left, acc]);
    if (right) stack.push([right, acc]);
    if (!left && !right) answer += parseInt(acc, 2);
  }
  return answer;
};
