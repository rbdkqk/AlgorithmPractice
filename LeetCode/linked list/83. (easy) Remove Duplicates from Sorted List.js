/*  0210 : 83. (easy) Remove Duplicates from Sorted List //  tag : Linked List

  Given the `head` of a sorted linked list, 
    delete all duplicates such that each element appears only once. 
    
  Return the linked list sorted as well.


  Constraints:
    The number of nodes in the list is in the range [0, 300].
    -100 <= Node.val <= 100
    The list is guaranteed to be sorted in ascending order.


  Example 1: 
    Input: head = [1,1,2]
    Output: [1,2]
  
  Example 2:
    Input: head = [1,1,2,3,3]
    Output: [1,2,3]

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

/*  내가 작성한 코드

  시간복잡도 : O(n) : 연결 리스트를 모두 돌아야 할 수 있음
  공간복잡도 : O(1) : currentNode 1개의 변수만 활용할 뿐임

  Runtime: 96 ms, faster than 40.96% of JavaScript online submissions for Remove Duplicates from Sorted List.
  Memory Usage: 40.7 MB, less than 19.50% of JavaScript online submissions for Remove Duplicates from Sorted List.

*/
var deleteDuplicates = function (head) {
  let currentNode = head;

  while (currentNode && currentNode.next) {
    if (currentNode.val === currentNode.next.val) {
      currentNode.next = currentNode.next.next;
      // 이런 처리가 진행된 뒤에는,
      // currentNode를 currentNode.next로 옮기지 않고,
      // currentNode.next.next와 다시 비교해야 한다
    } else {
      currentNode = currentNode.next;
      // 이 때에는 currentNode.next로 옮겨서, 다음 node와 비교해야 한다
    }
  }

  return head;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Solution
var deleteDuplicates = function (head) {
  var current = head;

  while (current) {
    if (current.next !== null && current.val == current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};
