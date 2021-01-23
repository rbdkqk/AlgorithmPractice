/*  938. Range Sum of BST (easy)  //  tag : tree, Depth-first Search, Recursion

  Given the `root` node of a binary search tree, 
    return the sum of values of all nodes with a value in the range `[low, high]`.


  Constraints:
    The number of nodes in the tree is in the range [1, 2 * 10^4].
    1 <= Node.val <= 10^5
    1 <= low <= high <= 10^5
    All `Node.val` are unique.



  Example 1:

            10
          /    \
        5       15
      /   \       \
    3       7      18

    Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
    Output: 32


  Example 2:

                10
              /    \
            5       15
          /  \    /    \
        3     7  13     18
      /      /
    1       6 

    Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
    Output: 23

*/

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */

/*  내가 제출한 답

  시간복잡도 : O(n) : 주어진 트리는 각 값의 크기에 따른 우열관계를 갖지 않으므로, 모든 node를 다 탐색해야 한다
  공간복잡도 : O(1) : answer 1개 변수에 값을 누적하고 있다.

  Runtime: 224 ms, faster than 82.17% of JavaScript online submissions for Range Sum of BST.
  Memory Usage: 68.3 MB, less than 40.67% of JavaScript online submissions for Range Sum of BST.

*/

var rangeSumBST = function (root, low, high) {
  let answer = 0;

  function treeDFS(node) {
    if (node === null) {
      return;
    }
    if (low <= node.val && node.val <= high) {
      answer += node.val;
    }
    treeDFS(node.left);
    treeDFS(node.right);
  }

  treeDFS(root);

  return answer;
};

// ======================================================================================

// 다른 사람의 답
// 별도 함수를 더 선언하지 않고, 주어진 함수만으로 정리함

var rangeSumBST = function (root, L, R) {
  var sum = 0;
  if (root == null) {
    return sum;
  }

  if (root.val > L) {
    sum += rangeSumBST(root.left, L, R);
  }
  if (root.val <= R && root.val >= L) {
    sum += root.val;
  }
  if (root.val < R) {
    sum += rangeSumBST(root.right, L, R);
  }

  return sum;
};

// ======================================================================================

// 다른 사람의 답

var rangeSumBST = function (root, L, R) {
  // check if value is in the given range
  const isInBetween = (val) => val >= L && val <= R;
  // sum the value if it's in the range
  const add = (val, sum) => (isInBetween(val) ? (sum += val) : sum);
  // traverse through the nodes and sum the values in range
  const preorder = (root, sum) => {
    if (!root) return sum;
    return (
      add(root.val, sum) + preorder(root.left, sum) + preorder(root.right, sum)
    );
  };
  return preorder(root, 0);
};
