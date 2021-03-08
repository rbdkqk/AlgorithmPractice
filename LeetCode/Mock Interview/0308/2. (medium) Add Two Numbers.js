/*  0308 Mock Interview : 2. (medium) Add Two Numbers  //  tag : Linked List, Math, Recursion

  You are given two non-empty linked lists representing two non-negative integers. 
    The digits are stored in reverse order, and each of their nodes contains a single digit. 
  
  Add the two numbers and return the sum as a linked list.
    You may assume the two numbers do not contain any leading zero, except the number 0 itself.


  Constraints:
    The number of nodes in each linked list is in the range [1, 100].
    0 <= Node.val <= 9
    It is guaranteed that the list represents a number that does not have leading zeros.


  Example 1:
    Input: l1 = [2,4,3], l2 = [5,6,4]
    Output: [7,0,8]
    Explanation: 342 + 465 = 807.

  Example 2:
    Input: l1 = [0], l2 = [0]
    Output: [0]
    
  Example 3:
    Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    Output: [8,9,9,9,0,0,0,1]

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

// 더 효율적인 방법이 있겠지만, 일단 동작만 하도록 시도함
// 실패 - `1000000000000000000000000000001` 이런 큰 숫자가 들어오면 `1e+30` 이렇게 표기되는 것이 문제였음
var addTwoNumbers = function (l1, l2) {
  let l1String = '';
  let l2String = '';

  while (l1) {
    l1String = String(l1.val) + l1String;
    l1 = l1.next;
  }

  while (l2) {
    l2String = String(l2.val) + l2String;
    l2 = l2.next;
  }

  let sumString = String(Number(l1String) + Number(l2Number))
    .split('')
    .reverse();

  let answerNode = new ListNode(Number(sumString[0]));

  let currentNode = answerNode;

  for (let i = 1; i < sumString.length; i++) {
    let newNode = new ListNode(Number(sumString[i]));
    currentNode.next = newNode;
    currentNode = newNode;
  }

  return answerNode;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
// 나처럼 복잡하게 생각하지 않고 단순하게, 그냥 바로 새로운 ListNode에 값들을 넣어가며 처리하는 방식
// List는 반복문의 밖에서 고정되도록 선언해 두고 실제 손대는 것은 head이기 때문에, 리턴값도 List.next
// sum과 carry로, 합계가 10이 넘을 때 다음 node에 1을 더해주도록 처리함
var addTwoNumbers = function (l1, l2) {
  var List = new ListNode(0);
  var head = List;
  var sum = 0;
  var carry = 0;

  while (l1 !== null || l2 !== null || sum > 0) {
    if (l1 !== null) {
      sum = sum + l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum = sum + l2.val;
      l2 = l2.next;
    }

    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }

    head.next = new ListNode(sum);
    head = head.next;

    sum = carry;
    carry = 0;
  }

  return List.next;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Recursion!
// 잘 이해되지 않음
// 의문 : const v1 = (l1 && l1.val) || 0; 이면, v1에는 어떤 값이 들어가 있는 것인가?
var addTwoNumbers = function (list1, list2) {
  return add(list1, list2, 0);

  function add(l1, l2, carry) {
    const v1 = (l1 && l1.val) || 0;
    const v2 = (l2 && l2.val) || 0;
    const sum = v1 + v2 + carry;
    const newCarry = Math.floor(sum / 10);
    const val = sum % 10;
    return l1 || l2 || carry
      ? { val, next: add(l1 && l1.next, l2 && l2.next, newCarry) }
      : null;
  }
};
