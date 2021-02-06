/*  0206 : 107. (easy) Binary Tree Level Order Traversal II  //  tag : Tree, Breadth-first Search

  Given a binary tree, return the `bottom-up level order` traversal of its nodes' values. 
    (ie, from left to right, level by level from leaf to root).


  Example 1: 

    Given binary tree [3,9,20,null,null,15,7],

          3
        /   \
      9       20
            /    \
          15      7
  
  return its bottom-up level order traversal as:

    [
      [15,7],
      [9,20],
      [3]
    ]

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
 * @return {number[][]}
 */

/* 내가 작성한 코드

  시간복잡도 : O(2n => n) : root부터 시작해서 트리를 한바퀴 모두 돌아야 함 (reverse 처리가 들어가서, answer 배열을 한번 더 돌려야 함)
  공간복잡도 : O(n) : root부터 시작해서 트리를 한바퀴 모두 돌아야 함 

  Runtime: 108 ms, faster than 10.39% of JavaScript online submissions for Binary Tree Level Order Traversal II.
  Memory Usage: 40.1 MB, less than 72.87% of JavaScript online submissions for Binary Tree Level Order Traversal II.

*/
var levelOrderBottom = function (root) {
  if (root === null) {
    return [];
  }

  let answer = [];

  let queue = [root];

  while (queue.length) {
    let innerArray = [];

    for (let node of queue) {
      innerArray.push(node.val);
    }

    answer.push(innerArray);

    let length = queue.length;

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  return answer.reverse();
};

// ======================================================================================

// 다른 사람의 코드 : Iterative and recursive level-order traversal solutions in JavaScript

// Recursive solution
var levelOrderBottom = function (root) {
  let h = height(root); /* get the height using helper fn below */
  let results = []; /* init an array to hold final answer */
  let depth = 1; /* init depth to 1 since we are using 1-based height */
  for (depth; depth <= h; depth++) {
    /* iterate from depth to tree height */
    results.push(
      levelOrder(root, depth)
    ); /* push an array of each level's node values to results */
  }

  return results.reverse();
};

/*
  recursive level-order traversal which collects all nodes
  from each level into an array.
*/
function levelOrder(node, d, level = []) {
  if (node == null) {
    return level;
  }
  if (d === 1) {
    level.push(node.val);
  } else if (d > 1) {
    levelOrder(node.left, d - 1, level);
    levelOrder(node.right, d - 1, level);
  }
  return level;
}

/*
  computes the largest root-to-leaf path,
  using 1-based counting.
*/
function height(node) {
  if (node == null) {
    /* base case */
    return 0;
  }
  let left = height(node.left);
  let right = height(node.right);

  return Math.max(left, right) + 1;
}

// Iterative solution using a queue
var levelOrderBottom = function (root) {
  if (root == null) {
    return [];
  }
  let queue = [];
  let results = [];
  queue.push(root);
  while (queue.length > 0) {
    /* level-order traversal */
    let level = []; /* collect node.vals for current level */
    let size =
      queue.length; /* instead of using recursion, we will use a loop bounded by the queue size */
    while (size > 0) {
      let current = queue.shift(); /* remove and capture next item from queue */
      level.push([
        current.val,
      ]); /* add the current val to the current level array */

      /* if we have a left or right subtree, explore */
      if (current.left != null) {
        queue.push(current.left);
      }

      if (current.right != null) {
        queue.push(current.right);
      }

      size--; /* level complete, decrement size and proceed */
    }

    results.push(level); /* push the last level's results */
  }
  return results.reverse(); /* return results, in reverse order */
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean BFS Solution (8 lines)
var levelOrderBottom = function (root) {
  if (!root) return [];
  const result = [];
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, gen] = queue.shift();

    if (!result[gen]) result[gen] = [node.val];
    else result[gen].push(node.val);

    if (node.left) queue.push([node.left, gen + 1]);
    if (node.right) queue.push([node.right, gen + 1]);
  }
  return result.reverse();
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Concise recursive solution
// We call traverseNodes() recursively for every 'level' of nodes in the tree.
var levelOrderBottom = function (root) {
  return root !== null ? traverseNodes([root]) : [];
};

function traverseNodes(nodes) {
  if (nodes.length === 0) return [];

  let children = nodes.reduce((acc, cur) => {
    if (cur.left) acc.push(cur.left);
    if (cur.right) acc.push(cur.right);
    return acc;
  }, []);

  return [...traverseNodes(children), nodes.map(({ val }) => val)];
}
