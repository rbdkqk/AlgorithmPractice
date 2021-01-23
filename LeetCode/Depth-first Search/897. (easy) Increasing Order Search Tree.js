/*  897. Increasing Order Search Tree  //  tag : tree, Depth-first Search, Recursion

  Given the `root` of a binary search tree, 
    rearrange the tree in in-order so that 
      - the leftmost node in the tree is now the root of the tree, and 
      - every node has no left child and only one right child.


  Constraints:
    The number of nodes in the given tree will be in the range [1, 100].
    0 <= Node.val <= 1000


  Example 1: (그림 생략)

    Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
    Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]


  Example 2:

                1                 1 
              /    \        =>      \
            5       7                 5
                                        \ 
                                          7

    Input: root = [5,1,7]
    Output: [1,null,5,null,7]

*/

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

/*  내가 제출한 답

  시간복잡도 : O(3nlogn => nlogn) : 
    - 일단 tree를 처음에 돌면서 배열을 만드니까, n
    - 만들어진 배열을 sort()하니까, nlogn
    - 정렬된 배열을 한바퀴 돌며 트리를 만드니까, n

  공간복잡도 : O(2n -> n) : 최초 주어지는 트리가 길면 길수록, array 배열과 리턴될 트리도 길어진다.

  Runtime: 72 ms, faster than 94.03% of JavaScript online submissions for Increasing Order Search Tree.
  Memory Usage: 39.5 MB, less than 14.09% of JavaScript online submissions for Increasing Order Search Tree.

*/

var increasingBST = function (root) {
  // root를 돌면서 하나의 배열로 만들어놓고, 그 배열을 sort해서, 재귀 돌리면서 node.right로 쌓아가면 답은 나올 것임.
  // 이 과정 중 첫번째의 배열만들기에서 DFS를 사용할 수는 있긴 한데,
  // 그렇게 하면 시간복잡도가 최하 O(nlogn)일 것임 (n + nlogn + n : 3nlogn => nlogn)
  // 일단 이걸 해서 답을 내고 그 다음에 생각하자

  let array = [];

  function treeDFS(node) {
    if (node === null) {
      return;
    }
    array.push(node.val);

    treeDFS(node.left);
    treeDFS(node.right);
  }

  treeDFS(root);

  array.sort((a, b) => a - b);

  let newTree = new TreeNode(array[0], undefined, undefined);

  function makeNewTree(index, node) {
    if (index === array.length) {
      return;
    }
    node.right = new TreeNode(array[index], undefined, undefined);
    makeNewTree(index + 1, node.right);
  }

  makeNewTree(1, newTree);

  return newTree;
};

// 다른 사람의 답을 보고 나서 든 생각 : 각 노드의 크기를 비교해야 한다고 생각했었는데,
// 보니까 현재 node 기준으로 그 왼쪽은 node보다 작고 오른쪽은 node보다 크다
// 그러면 left가 null인 경우는 처리할 필요 없고, left가 존재하는 경우에만 연결을 새로 넣어주면 되는 것이 아닐까?

// ======================================================================================

// 다른 사람의 답

var increasingBST = function (root) {
  if (!root) {
    return root;
  }

  const leftRoot = increasingBST(root.left);
  root.left = null;
  root.right = increasingBST(root.right);

  if (!leftRoot) {
    return root;
  }

  let lastLeftNode = leftRoot;
  while (lastLeftNode.right) {
    lastLeftNode = lastLeftNode.right;
  }

  lastLeftNode.right = root;
  return leftRoot;
};

// ======================================================================================

// 다른 사람의 답

// Recursive:
var increasingBST = function (root) {
  let newRoot = null,
    newTree = null;

  const helper = (node) => {
    if (!node) return;
    // left
    helper(node.left);

    // read/visit
    // while reading/visiting the node update newRoot/newTree
    if (!newRoot) {
      newRoot = newTree = node;
    } else {
      newTree.right = node;
      newTree = newTree.right;
      // set left to null to avoid duplication & to create skewed tree
      node.left = null;
    }

    // right
    helper(node.right);
  };

  helper(root);
  return newRoot;
};

// Iterative:
var increasingBST = function (root) {
  if (!root) return null;
  let stack = [],
    newRoot = null,
    newTree = null;

  while (root) {
    // left
    while (root) {
      stack.push(root);
      root = root.left;
    }
    while (stack.length > 0) {
      // read/visit
      let node = stack.pop();
      if (!newRoot) {
        newRoot = newTree = node;
      } else {
        newTree.right = node;
        newTree = newTree.right;
      }
      node.left = null;
      // right
      if (node.right) {
        root = node.right;
        break;
      }
    }
  }
  return newRoot;
};
