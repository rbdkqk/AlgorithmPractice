/*  0213 : 119. (medium) Binary Tree Right Side View.js   //  tag : Tree, Depth-first Search, Breadth-first Search, Recursion, Queue

  Given a binary tree, imagine yourself standing on the `right` side of it, 
    return the values of the nodes you can see ordered from top to bottom.


  Constraints:
    1 <= k <= 1000
    0 <= value <= 1000
    At most 3000 calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.


  Example 1:
    Input: [1,2,3,null,5,null,4]
    Output: [1, 3, 4]
    Explanation:
              1               <---
            /   \
          2       3           <---        imagine yourself standing on the `right` side of it, 
            \       \
              5       4       <---

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
 * @return {number[]}
 */

/*  내가 작성한 코드

  시간복잡도 : O(n) : root부터 시작해서 BFS 방식으로 트리 전부를 탐색해야 함
  공간복잡도 : O(logn) : (?) 각 level의 가장 우측 node만을 모아놓은 answer 배열을 가져야 하므로, 트리가 길어져도 answer 배열이 그와 동일하게 커지지는 않고 깊이(level)만큼만 커짐

  Runtime: 84 ms, faster than 75.95% of JavaScript online submissions for Binary Tree Right Side View.
  Memory Usage: 40.1 MB, less than 84.26% of JavaScript online submissions for Binary Tree Right Side View.

*/
var rightSideView = function (root) {
  let answer = [];
  let queue = [root];

  if (!root) return answer;

  while (queue.length) {
    answer.push(queue[queue.length - 1].val);

    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript 52ms DFS
// `res[h] = node.val;` 부분이 여러번 반복되므로, res[h] 위치에는 계속 다른 값이 들어가며 교체되는 방식
var rightSideView = function (root) {
  if (!root) return [];
  let res = [];
  pre(root, 0);
  return res;

  function pre(node, h) {
    if (!node) return;
    res[h] = node.val;
    pre(node.left, h + 1);
    pre(node.right, h + 1);
  }
};
