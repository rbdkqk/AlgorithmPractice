/*  617. (easy) Merge Two Binary Trees  //  tag : Tree

  Given two binary trees and imagine that when you put one of them to cover the other, 
    some nodes of the two trees are overlapped while the others are not.

  You need to merge them into a new binary tree. The merge rule is that 
    if two nodes overlap, then sum node values up as the new value of the merged node. 
    Otherwise, the NOT null node will be used as the node of new tree.


  Constraints:
    The merging process must start from the root nodes of both trees.


  Example 1:
    Input:
          Tree 1                     Tree 2                  
              1                         2                             
            / \                       / \                            
            3   2                     1   3                        
          /                           \   \                      
          5                             4   7           
        
    Output: 
      Merged tree:
            3
            / \
          4   5
          / \   \ 
        5   4   7  

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
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */

// 실패한 내 코드
var mergeTrees = function (t1, t2) {
  if (t1 === null && t2 === null) {
    return;
  }

  mergeTrees(t1.left, t2.left);
  mergeTrees(t1.right, t2.right);

  if (t1 === null && t2 !== null) {
    return t2;
  } else if (t1 !== null && t2 === null) {
    return t1;
  } else {
    t1.val += t2.val;
    return t1;
  }
};

// ======================================================================================

// 다른 사람의 코드
var mergeTrees = function (t1, t2) {
  if (t1 && t2) {
    const newNode = new TreeNode(t1.val + t2.val);
    newNode.left = mergeTrees(t1.left, t2.left);
    newNode.right = mergeTrees(t1.right, t2.right);
    return newNode;
  }
  return t1 || t2;
};

// ======================================================================================

// 다른 사람의 코드
var mergeTrees = function (t1, t2) {
  if (!t1 && !t2) return null;
  const root = new TreeNode(((t1 || 0).val || 0) + ((t2 || 0).val || 0));
  root.left = mergeTrees(t1 && t1.left, t2 && t2.left);
  root.right = mergeTrees(t1 && t1.right, t2 && t2.right);
  return root;
};

// ======================================================================================

// 다른 사람의 코드
var mergeTrees = function (t1, t2) {
  // goal is to merge t2 to t1

  // if one of the node missing, return the other
  if (t1 === null) {
    return t2;
  }
  if (t2 === null) {
    return t1;
  }
  // if both nodes exist, sum the values
  t1.val += t2.val;

  // do the same thing for left and right branch
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);

  // return the merged t1
  return t1;
};
