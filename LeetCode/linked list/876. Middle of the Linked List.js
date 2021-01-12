/*  0112 : 876. Middle of the Linked List (easy)

  Given a non-empty, singly linked list with head node `head`, 
    return a middle node of linked list.
  If there are two middle nodes, return the second middle node. 


  Constraints:
    The number of nodes in the given list will be between 1 and 100.


  Example 1:
    Input: [1,2,3,4,5]
    Output: Node 3 from this list (Serialization: [3,4,5])
      The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
      Note that we returned a ListNode object ans, such that:
      ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.

  Example 2:
    Input: [1,2,3,4,5,6]
    Output: Node 4 from this list (Serialization: [4,5,6])
      Since the list has two middle nodes with values 3 and 4, we return the second one.

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

/* 내가 제출한 답

  시간복잡도 : O(2n) -> O(n) : linked list를 두바퀴 돌게 작성됨 => 실제로는 1.5바퀴만 돌고 끝남
  공간 복잡도 : O(1) : 생성된 index 관련 변수들은 그 자리에서 숫자가 계속 바뀔 뿐임

  Runtime: 80 ms, faster than 40.20% of JavaScript online submissions for Middle of the Linked List.
  Memory Usage: 38.8 MB, less than 12.58% of JavaScript online submissions for Middle of the Linked List.

*/

var middleNode = function (head) {
  let length = 0;
  let currentNode = head;

  while (currentNode) {
    length++;
    currentNode = currentNode.next;
  }

  let middleIndex = parseInt(length / 2) + 1;

  let newCurrentNode = head;
  let newCurrentNodeIndex = 1;

  while (newCurrentNode) {
    if (newCurrentNodeIndex === middleIndex) {
      return newCurrentNode;
    }
    newCurrentNodeIndex++;
    newCurrentNode = newCurrentNode.next;
  }
};

// ======================================================================================

// 다른 사람의 코드 : 내 코드와 조금 유사해 보임
// Time Complexity: O(N + N) = O(N)
// Space Complexity: O(1)

var middleNode = function (head) {
  let hi = head,
    cnt = 1;
  while (hi.next) {
    hi = hi.next;
    cnt++;
  }
  cnt = parseInt(cnt / 2);
  while (cnt--) {
    head = head.next;
  }
  return head;
};

// ======================================================================================

/* 다른 사람의 코드 : 동시에 2개 루프를 돌리는 방식
  하나는 1칸씩 가고 하나는 2칸씩 가면, '2칸씩 가는 것이 null이 될 때, 1칸씩 가는 것은 중간에 있을 것임'

  Time Complexity: O(N)
  Space Complexity: O(1)

  lo = 1 * iteration
  hi = 2 * iteration

*/

var middleNode = function (head) {
  let lo = head,
    hi = head;
  while (hi && hi.next) {
    lo = lo.next;
    hi = hi.next.next;
  }
  return lo;
};
