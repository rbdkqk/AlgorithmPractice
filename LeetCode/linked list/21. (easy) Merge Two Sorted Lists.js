/*  0210 : 21. (easy) Merge Two Sorted Lists //  tag : Linked List, Recursion

  Merge two sorted linked lists and return it as a sorted list. 
  
  The list should be made by splicing together the nodes of the first two lists.


  Constraints:
    The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both l1 and l2 are sorted in non-decreasing order.


  Example 1: 
    Input: l1 = [1,2,4], l2 = [1,3,4]
    Output: [1,1,2,3,4,4]
  
  Example 2:
    Input: l1 = [], l2 = []
    Output: []
    
  Example 3:
    Input: l1 = [], l2 = [0]
    Output: [0]

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

/*  내가 작성한 코드

  시간복잡도 : O(2n => n) : 두 연결 리스트를 모두 돌아야 할 수 있음
  공간복잡도 : O(2n => n) : 두 연결 리스트의 모든 노드 전부 재귀 처리에 의한 콜스택이 쌓일 수 있음

  Runtime: 88 ms, faster than 83.30% of JavaScript online submissions for Merge Two Sorted Lists.
  Memory Usage: 40.5 MB, less than 48.32% of JavaScript online submissions for Merge Two Sorted Lists.

*/
var mergeTwoLists = function (l1, l2) {
  let currentNode_1 = l1;
  let currentNode_2 = l2;

  let answer;

  if (currentNode_1 === null) {
    return currentNode_2;
  }

  if (currentNode_2 === null) {
    return currentNode_1;
  }

  if (currentNode_1.val <= currentNode_2.val) {
    answer = currentNode_1;
    currentNode_1 = currentNode_1.next;
  } else {
    answer = currentNode_2;
    currentNode_2 = currentNode_2.next;
  }

  answer.next = mergeTwoLists(currentNode_1, currentNode_2);

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Simple javascript solution
var mergeTwoLists = function (l1, l2) {
  var mergedHead = { val: -1, next: null },
    crt = mergedHead;
  while (l1 && l2) {
    if (l1.val > l2.val) {
      crt.next = l2;
      l2 = l2.next;
    } else {
      crt.next = l1;
      l1 = l1.next;
    }
    crt = crt.next;
  }
  crt.next = l1 || l2;

  return mergedHead.next;
};

/*
  While loop round 1:
    In the if statement we say "crt.next = l2" which is the same as saying “mergedHead.next = l2” since “crt = mergedHead”.
    But “crt” still equals “mergedHead” even though “mergedHead” itself now includes “mergedHead.next”.
    After the if statement we say “crt = crt.next”. Now “crt” does not equal “mergedHead” anymore. Instead it now equals “mergedHead.next”.

  While loop round 2:
    In the if statement "crt.next = l2" in other words “mergedHead.next.next = l2” since “crt = mergedHead.next”.
    Again, note that “crt” itself still equals “mergedHead.next” even though “mergedHead” itself now includes “mergedHead.next.next”. “mergedHead” obviously is not equal to “mergedHead.next.next” but it includes it.
    And again after the if statement we say “crt = crt.next”. Now “crt” does not equal “mergedHead.next” anymore but instead “mergedHead.next.next”.
*/

// ======================================================================================

// 다른 사람의 코드 : 10-line javascript recursion
var mergeTwoLists = function (l1, l2) {
  if (!l1 || !l2) return l1 ? l1 : l2;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
