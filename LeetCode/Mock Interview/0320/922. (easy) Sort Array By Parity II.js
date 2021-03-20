/*  0320 Mock Interview : 922. (easy) Sort Array By Parity II  // tag : Array, Sort

  Given an array of integers `nums`, half of the integers in `nums` are odd, and the other half are even.

  Sort the array so that whenever `nums[i]` is odd, `i` is odd, and whenever `nums[i]` is even, `i` is even.

  Return any answer array that satisfies this condition.


  Note:
    2 <= nums.length <= 2 * 10^4
    nums.length is even.
    Half of the integers in nums are even.
    0 <= nums[i] <= 1000


  Example 1:
    Input: nums = [4,2,5,7]
    Output: [4,5,2,7]
    Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.

  Example 2:
    Input: nums = [2,3]
    Output: [2,3]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 성공 : 8분 소요 (앞서 풀었던 문제임(0204) : 이전에 비해 반복문을 덜 돌리는 방식으로 작성할 수 있었음 (시간복잡도 차이는 별로 없다))
// Runtime: 112 ms
// Memory Usage: 45.2 MB
var sortArrayByParityII = function (nums) {
  let answer = new Array(nums.length);

  let even = 0;
  let odd = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      answer[even] = nums[i];
      even += 2;
    } else {
      answer[odd] = nums[i];
      odd += 2;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : [javascript] O(n)
// 내가 택한 방법과 동일한 것 같다
var sortArrayByParityII = function (A) {
  let result = new Array(A.length);

  for (let i = 0, even = 0, odd = 1; i < A.length; i++) {
    if (A[i] % 2 === 0) {
      result[even] = A[i];
      even += 2;
    } else {
      result[odd] = A[i];
      odd += 2;
    }
  }
  return result;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] One loop solution
// 내가 택한 방법과 동일한 것 같다
const sortArrayByParityII = (arr) => {
  let res = [];
  let evenIndex = 0;
  let oddIndex = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      res[evenIndex] = arr[i];
      evenIndex = evenIndex + 2;
    } else {
      res[oddIndex] = arr[i];
      oddIndex = oddIndex + 2;
    }
  }

  return res;
};

// ======================================================================================

// 전에 작성해서 통과했던 내 코드 : (0204)
// (이번에도 처음 생각한건 이 방식이었는데, 반복문을 덜 돌리려고 생각해서 이번에는 이 코드와는 다르게 작성함)
var sortArrayByParityII = function (A) {
  let oddArray = [];
  let evenArray = [];

  A.forEach((el) => {
    if (el % 2 !== 0) {
      oddArray.push(el);
    } else {
      evenArray.push(el);
    }
  });

  let answer = [];

  for (let i = 0; i < A.length / 2; i++) {
    answer.push(evenArray[i]);
    answer.push(oddArray[i]);
  }

  return answer;
};
