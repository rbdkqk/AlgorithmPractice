/*  0317 Mock Interview : 445. (medium) Add Two Numbers II  // tag : Linked List

  You are given two non-empty linked lists representing two non-negative integers. 
    The most significant digit comes first and each of their nodes contain a single digit. 
    Add the two numbers and return it as a linked list.

  You may assume the two numbers do not contain any leading zero, except the number 0 itself.


  Follow up:
    What if you cannot modify the input lists? In other words, reversing the lists is not allowed.


  Example 1:
    Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 8 -> 0 -> 7

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// 성공 : 30분 소요 (Follow up을 따르지 않고 진행되어 아쉽다)
// Runtime: 132 ms
// Memory Usage: 46.2 MB
var addTwoNumbers = function (l1, l2) {
  let List1 = [];
  let List2 = [];

  while (l1) {
    List1.push(l1.val);
    l1 = l1.next;
  }

  while (l2) {
    List2.push(l2.val);
    l2 = l2.next;
  }

  List1 = List1.reverse();
  List2 = List2.reverse();

  while (List1.length < List2.length) {
    List1.push(0);
  }

  while (List1.length > List2.length) {
    List2.push(0);
  }

  for (let i = 0; i < List1.length; i++) {
    List1[i] += List2[i];
    if (List1[i] >= 10) {
      List1[i] -= 10;
      List1[i + 1] += 1;
    }
  }

  List1.reverse();

  if (isNaN(List1[0])) {
    List1[0] = 1;
  }

  let answer = new ListNode(List1[0]);
  let current = answer;

  for (let j = 1; j < List1.length; j++) {
    current.next = new ListNode(List1[j]);
    current = current.next;
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript - O(n) solution using stack.
// 나처럼 여러번 뒤집어가며 처리하지 않고, 매번 새로운 List인 head를 만들고 -> 이번에 처리하는 node를 head의 next로 넣어주고 -> head를 l3와 갱신하는 방법
var addTwoNumbers = function (l1, l2) {
  let stack1 = [];
  let stack2 = [];

  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }

  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }

  let l3 = new ListNode(0);

  while (stack1.length || stack2.length) {
    let sum = 0;
    if (stack1.length) sum += stack1.pop();
    if (stack2.length) sum += stack2.pop();
    sum += l3.val;
    l3.val = sum % 10;
    let head = new ListNode(Math.floor(sum / 10));
    head.next = l3;
    l3 = head;
  }

  return l3.val === 0 ? l3.next : l3;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Recursion + Backtracking Solution - No Stack & Simple
// The idea
//   - There are two ways of passing variables. To pass down, we use parameters. To pass up/back, we use return values. And this problem is the perfect example of the later where we need to pass the carry number up/back.
//   - Define a recursion function getCarry which recursively sets the local sum and returns the carry during backtracking stage.
//   - Beware of numbers of different length, we can incorporate an offset to solve the problem.
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let l1Len = getLen(l1);
  let l2Len = getLen(l2);

  let offset = Math.abs(l1Len - l2Len);

  if (l2Len > l1Len) {
    [l1, l2] = [l2, l1];
  } // l1 will always be the longer one

  let dummyHead = new ListNode(0);

  dummyHead.val = getCarry(l1, l2, dummyHead, offset);

  // 더한 결과 맨 앞에 새로운 node가 생겼을 수 있으므로, 리턴할 node를 이런식으로 결정한다
  return dummyHead.val == 1 ? dummyHead : dummyHead.next;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @param {ListNode} node
 * @param {Number} offset
 */
// l1, l2 둘 다 null이 아니어야 더할 수 있으므로, 재귀를 통해 찾아나간다
function getCarry(l1, l2, node, offset) {
  if (l1 == null || l2 == null) return 0;

  node.next = new ListNode(0);

  let sum = 0;

  if (offset > 0) {
    sum = l1.val + getCarry(l1.next, l2, node.next, offset - 1);
  } else {
    sum = l1.val + l2.val + getCarry(l1.next, l2.next, node.next, offset - 1);
  }

  node.next.val = sum % 10;

  return parseInt(sum / 10); // return the carry
}

/**
 * @param {ListNode} root
 */
function getLen(root) {
  let len = 0;

  while (root) {
    len++;
    root = root.next;
  }

  return len;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean Code O(1) Space
// 댓글에서는 재귀호출 때문에 O(1) Space가 아니라고 함
var addTwoNumbers = function (l1, l2) {
  const len1 = findLen(l1),
    len2 = findLen(l2);

  const diff = Math.abs(len1 - len2);

  if (len2 > len1) {
    [l2, l1] = [l1, l2];
  } // l1 will always be the longest

  const result = new ListNode();

  result.val = run(l1, l2, result, diff);

  return result.val ? result : result.next;

  // --------------------------------------

  function findLen(node) {
    if (!node.next) {
      return 0;
    }

    return findLen(node.next) + 1;
  }

  function run(n1, n2, res, diff) {
    if (!n1) {
      return 0;
    }

    res.next = new ListNode();

    let sum = 0;

    if (diff > 0) sum += n1.val + run(n1.next, n2, res.next, diff - 1);
    else sum += n1.val + n2.val + run(n1.next, n2.next, res.next, diff - 1);
    res.next.val = sum % 10;
    return sum > 9;
  }
};
