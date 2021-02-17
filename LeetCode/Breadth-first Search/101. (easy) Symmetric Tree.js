/*  0217 : 101. (easy) Symmetric Tree  //  tag : Tree, Depth-first Search, Breadth-first Search

  Given a binary tree, 
    check whether it is a mirror of itself (ie, symmetric around its center).


  For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

            1 
          /     \
        2         2
      / \       /   \
    3     4    4      3    

  But the following [1,2,2,null,3,null,3] is not:

          1
        /   \
      2       2
        \       \
          3        3


  Follow up: Solve it both recursively and iteratively.

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

/*  내가 작성한 코드 : 반복문 방식

  시간복잡도 : O(n) : BFS 방식으로 전체 배열의 각 요소를 모두 탐색함
  공간복잡도 : O(n) : root 트리가 길어질수록 queue 배열 및 eachLevel 배열 역시 더 많은 공간을 사용하게 될 것

  Runtime: 80 ms, faster than 97.10% of JavaScript online submissions for Symmetric Tree.
  Memory Usage: 40.4 MB, less than 68.49% of JavaScript online submissions for Symmetric Tree.

*/
var isSymmetric = function (root) {
  let queue = [root];

  if (root === null) {
    return true;
  }

  while (queue.length) {
    let eachLevel = [];
    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      let left = currentNode.left;
      let right = currentNode.right;

      if (!left) {
        eachLevel.push(false);
      } else {
        eachLevel.push(left.val);
        queue.push(left);
      }

      if (!right) {
        eachLevel.push(false);
      } else {
        eachLevel.push(right.val);
        queue.push(right);
      }
    }

    if (eachLevel.length % 2 !== 0) {
      return false;
    }

    let before = eachLevel.slice(0, eachLevel.length / 2);
    let after = eachLevel.slice(eachLevel.length / 2).reverse();

    for (let j = 0; j < before.length; j++) {
      if (before[j] !== after[j]) {
        return false;
      }
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : [Javascript] 95% speed, 100% memory - w/ comments
var isSymmetric = function (root) {
  if (root == null) return true;

  return symmetryChecker(root.left, root.right);
};

function symmetryChecker(left, right) {
  if (left == null && right == null) return true; // If both sub trees are empty
  if (left == null || right == null) return false; // If only one of the sub trees are empty
  if (left.val !== right.val) return false; // If the values dont match up

  // Check both subtrees but travelled in a mirrored/symmetric fashion
  // (one goes left, other goes right)  and make sure they're both symmetric
  return (
    symmetryChecker(left.left, right.right) &&
    symmetryChecker(left.right, right.left)
  );
}

// ======================================================================================

// 다른 사람의 코드 : Javascript - queue in 10 lines
var isSymmetric = function (root) {
  const q = [root, root];
  while (q.length) {
    const [l, r] = [q.shift(), q.shift()];
    if (!l && !r) continue;
    if (!!l !== !!r || l.val !== r.val) return false;
    q.push(l.left, r.right, l.right, r.left);
  }

  return true;
};
