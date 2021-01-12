/*  0112 : 1290. Convert Binary Number in a Linked List to Integer (easy)

  Given head which is a reference node to a singly-linked list. 
  The value of each node in the linked list is either 0 or 1. 
  The linked list holds the binary representation of a number.
  Return the `decimal value` of the number in the linked list.


  Constraints:
    The Linked List is not empty.
    Number of nodes will not exceed 30.
    Each node's value is either 0 or 1.


  Example 1:
    Input: head = [1,0,1]
    Output: 5
    Explanation: (101) in base 2 = (5) in base 10

  Example 2:
    Input: head = [0]
    Output: 0

  Example 3:
    Input: head = [1]
    Output: 1

  Example 4:
    Input: head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
    Output: 18880

  Example 5:
    Input: head = [0,0]
    Output: 0

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
 * @return {number}
 */

/* 내가 제출한 답 : 문제 자체를 이해하는데에 오래걸림

  시간복잡도 : O(n) : linked list를 한바퀴 돌아야 함
  공간 복잡도 : O(n) : joined 문자열은 linked list의 길이만큼 길어질 것임

  Runtime: 80 ms, faster than 53.81% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.
  Memory Usage: 38.6 MB, less than 45.57% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.

*/

var getDecimalValue = function (head) {
  let joined = '';
  let currentNode = head;

  while (currentNode) {
    joined = joined + currentNode.val;
    currentNode = currentNode.next;
  }

  return parseInt(joined, 2);
};

// parseInt() 함수 : 문자열 인자를 구문분석하여 특정 진수(수의 진법 체계에 기준이 되는 값)의 정수를 반환합니다.
// syntax : parseInt(string, radix);
// return parseInt(Number(joined), 2); 라고 하니까 되는 케이스가 있고 안되는 케이스가 있었음

// ======================================================================================

// 다른 사람의 답
// res = 0; 부터 시작하고 res = res * 2 + node.val; 이렇게 처리함
// 내꺼랑 좀 비슷해 보이지만, 위 부분은 어떤 계산인건지 잘 모르겠다
// Time O(n), Space O(1)

var getDecimalValue = function (head) {
  let res = 0;
  let node = head;
  while (node) {
    res = res * 2 + node.val;
    node = node.next;
  }
  return res;
};

// ======================================================================================

// 다른 사람의 답
// Time O(n), Space O(1)

var getDecimalValue = function (head) {
  let res = 0;
  let node = head;
  while (node) {
    res = (res << 1) | node.val;
    node = node.next;
  }
  return res;
};

// 비트 연산자 << : 지정한 수만큼 비트들을 전부 왼쪽으로 이동시킴. (left shift 연산)

// 비트 연산자 : 비트 연산자는 피연산자를 10진수, 16진수, 8진수가 아니라, 32개의 비트(0과 1) 집합으로 취급합니다.
// 예를 들어, 10진수 9의 2진수 표기법은 1001입니다.
// 이렇게, 비트 연산자는 값의 2진수 표현을 사용해 연산하지만, 결과는 표준 JavaScript 숫자 값으로 반환합니다.

// 비트 연산자도 잘 와닿지 않고, res = (res << 1) | node.val; 이것도 잘 모르겠다
// | 이걸 하나만 넣으면 무슨 뜻인지도 모르겠음
