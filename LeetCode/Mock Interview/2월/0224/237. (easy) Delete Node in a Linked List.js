/*  0224 Mock Interview : 237. (easy) Delete Node in a Linked List  //  tag : Linked List

  Write a function to delete a node in a singly-linked list. 
    You will not be given access to the head of the list, 
    instead you will be given access to the node to be deleted directly.

  It is guaranteed that the node to be deleted is not a tail node in the list.


  Constraints:
    The number of the nodes in the given list is in the range [2, 1000].
    -1000 <= Node.val <= 1000
    The value of each node in the list is unique.
    The node to be deleted is in the list and is not a tail node


  Example 1:
    Input: head = [4,5,1,9], node = 5
    Output: [4,1,9]
    Explanation: 
      You are given the second node with value 5, 
      the linked list should become 4 -> 1 -> 9 after calling your function.

  Example 2:
    Input: head = [4,5,1,9], node = 1
    Output: [4,5,9]
    Explanation: 
      You are given the third node with value 1, 
      the linked list should become 4 -> 5 -> 9 after calling your function.

  Example 3:
    Input: head = [1,2,3,4], node = 3
    Output: [1,2,4]

  Example 4:
    Input: head = [0,1], node = 0
    Output: [1]

  Example 5:
    Input: head = [-3,5,-99], node = -3
    Output: [5,-99]

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */

/*  내가 작성한 코드 : 3분 정도 소요됨 (전에 못풀어서 solution 봤던 문제)

  시간복잡도 : O(1) : linked list를 순회하지 않고, 주어진 node와 그 다음의 node.next / node.next.next에 직접 접근함
  공간복잡도 : O(1) : 주어진 node를 직접 변경하므로 추가 공간을 소모하지 않음

  Runtime: 88 ms
  Memory Usage: 40.5 MB

*/
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

// ======================================================================================

// 다른 사람의 코드 : A JS solution..
// 내 생각 : 이 답의 댓글에서도 지적했다시피, if 조건문 안의 내용들을 체크해 줄 필요가 없다고 생각한다
var deleteNode = function (node) {
  if (node.val !== undefined && node.next !== undefined) {
    //copy the next node to this node
    node.val = node.next.val;
    node.next = node.next.next;
  }
};
