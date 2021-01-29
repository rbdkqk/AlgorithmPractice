/*  206. (easy) Reverse Linked List //  tag : Linked List

  Reverse a singly linked list.


  Constraints:
    A linked list can be reversed either iteratively or recursively. Could you implement both?


  Example 1:
    Input: 1->2->3->4->5->NULL
    Output: 5->4->3->2->1->NULL


*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*  내가 작성한 코드 (반복문 방식)

  시간복잡도 : O(n) : head부터 시작해서 전체 LinkedList를 한바퀴 다 돌아야 함
  공간복잡도 : O(n) : currentNode라는 1개의 변수만을 차지하지만, 이 변수에 최종 들어갈 node는 그 next값이 계속 길어지고 그만큼 메모리도 차지하는 LinkedList임.

  Runtime: 80 ms, faster than 86.44% of JavaScript online submissions for Reverse Linked List.
  Memory Usage: 40.1 MB, less than 92.20% of JavaScript online submissions for Reverse Linked List.

*/
var reverseList = function (head) {
  if (head === null) {
    return null;
  }

  let currentNode = new ListNode(head.val);

  while (head.next) {
    currentNode = new ListNode(head.next.val, currentNode);
    head = head.next;
  }

  return currentNode;
};
1 < -2 < -3 < -4 < -5;
// ======================================================================================

// 내가 작성한 코드 : 재귀 방식 (실패함)
var reverseList = function (head, next = null) {
  if (head === null) {
    return null;
  }

  let currentNode = new ListNode(head.val, next);

  head = head.next;
  next = currentNode;

  reverseList(head, next);

  return currentNode;
};

// =====================================================================================

// 다른 사람의 코드 : 반복문
var reverseList = function (head) {
  let [prev, current] = [null, head];
  while (current) {
    [current.next, prev, current] = [prev, current, current.next];
  }
  return prev;
};

// =====================================================================================

// 다른 사람의 코드 : 재귀
var reverseList = function (head, previous = null) {
  if (head === null) {
    return previous;
  }

  let next = head.next;
  head.next = previous;

  return reverseList(next, head);
};
