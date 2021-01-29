/*  237. (easy) Delete Node in a Linked List //  tag : Linked List

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
    Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.

  Example 2:
    Input: head = [4,5,1,9], node = 1
    Output: [4,5,9]
    Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.

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

// 못 풀었음 :
// prev.next = node.next; 이런 식으로 연결해 줘야 할 텐데,
// 이전 노드에 접근할 수 없고(singly니까), head에도 접근할 수 없고(문제 조건), 전체가 몇개인지도 모르는 상황인데(주어지지 않음),
// 방법 자체가 전혀 안 떠오름

// 결국 solution 켜서 방법 봤음
// `Instead, we have to replace the value of the node we want to delete
//  with the value in the node after it, and then delete the node after it.`
var deleteNode = function (node) {
  // 한칸씩 다 당겨올 생각을 하고 while 반복문으로 썼었는데,
  // 그럴 필요가 없었고, node.next.val을 가져와서 덮어쓴 뒤, node와 node.next.next를 연결해서,
  // node.next의 연결을 끊어버리면 되는 거였다...
  node.val = node.next.val;
  node.next = node.next.next;
};
