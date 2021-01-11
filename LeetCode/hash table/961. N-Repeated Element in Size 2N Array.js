/*  0111 : 961. N-Repeated Element in Size 2N Array (easy)

  In a array `A` of size `2N`, there are `N+1` unique elements, 
    and exactly one of these elements is repeated `N` times.

  Return the element repeated `N` times.


  Constraints:
    4 <= A.length <= 10000
    0 <= A[i] < 10000
    A.length is even


  Example 1:
    Input: [1,2,3,3]
    Output: 3

  Example 2:      
    Input: [2,1,2,5,3,2]
    Output: 2

  Example 2: 
    Input: [5,1,5,2,5,3,5,4]
    Output: 5

*/

/**
 * @param {number[]} A
 * @return {number}
 */

/*  내가 제출한 답 1 : 효율이 별로임

  시간복잡도 : O(n) : A 배열을 1회 순회하면서 hash 객체를 만들게 됨
  공간복잡도 : O(n/2) -> O(n) : hash 객체는 A 배열의 원소 수만큼 그 키/값을 가질 것임

  Runtime: 172 ms, faster than 7.05% of JavaScript online submissions for N-Repeated Element in Size 2N Array.
  Memory Usage: 45 MB, less than 17.63% of JavaScript online submissions for N-Repeated Element in Size 2N Array.

*/

var repeatedNTimes = function (A) {
  let n = A.length / 2;

  let hash = {};

  for (let i = 0; i < A.length; i++) {
    if (hash[A[i]] === undefined) {
      hash[A[i]] = 1;
    } else {
      hash[A[i]]++;
    }
    if (hash[A[i]] === n) {
      return A[i];
    }
  }
};

// ======================================================================================

// 문제를 다시 보니, 배열 안에서 1개의 원소만 반복되고 나머지 원소들은 unique하다
// 다른 사람의 답 : 훨씬 빠름

// Runtime: 80 ms, faster than 89.92% of JavaScript online submissions for N-Repeated Element in Size 2N Array.
// Memory Usage: 42.1 MB, less than 48.11% of JavaScript online submissions for N-Repeated Element in Size 2N Array.

var repeatedNTimes = function (A) {
  for (let i = 0; i < A.length / 2 + 1; i++) {
    if (A.lastIndexOf(A[i]) != i) return A[i];
  }
};

/*  해석 

  2n개의 원소 중 n+1개의 unique한 원소가 존재하니까, 2n개를 모두 뒤질 필요가 없다

  n+1까지만 살피면, 답이 아닌 n개의 것들은 1번씩만 나올거고, 답인 1개는 2번 나올 것임
  즉, A 배열을 앞에서부터 돌리면서 lastIndexOf를 잡으면, 다른것들은 1회만 나오니까 자기 자신의 index를 잡게 되지만,
  원하는 답인 원소는 그 자리 뿐만 아니라 뒤에서 한번 더 존재하므로, lastIndexOf에서 자기 자신이 아닌 index를 잡게 된다.

  시간복잡도 : O(n/2 + 1) : 최악의 경우, 주어진 배열의 절반 그 다음까지만 돌리면 된다 ([1, 2, 3, 4, 5, 5, 5, 5])
  공간복잡도 : O(1) : 특정 값을 저장하는 변수 등은 선언되지 않음

*/

// ======================================================================================

/*

  이 문제가 `hash table` 주제로 묶여있긴 한데... hash를 사용한 것인지 잘 모르겠다

  `JavaScript using hash map` 이라는 제목의 답을 보면, 내가 제출한 답과 거의 동일함
  `Easy javascript solution using hash` 답 역시 마찬가지임

    => 결국 객체를 선언한 뒤, 그 객체의 각 값에 접근하는 경우를 hash라고 한 것 같다
        https://frontendmasters.com/courses/data-structures-algorithms/hash-tables/
        `A JavaScript Object is an example of a Hash Table because data is represented a key/value pairs. `

*/
