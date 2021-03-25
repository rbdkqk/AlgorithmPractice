/*  0325 Mock Interview : 977. (easy) Squares of a Sorted Array  // tag : Array, Two Pointers

  Given an integer array `nums` sorted in non-decreasing order, 
    return an array of the squares of each number sorted in non-decreasing order.


  Constraints:
    1 <= nums.length <= 10^4
    -10^4 <= nums[i] <= 10^4
    nums is sorted in non-decreasing order. 


  Example 1:
    Input: nums = [-4,-1,0,3,10]
    Output: [0,1,9,16,100]
    Explanation: 
      After squaring, the array becomes [16,1,0,9,100].
      After sorting, it becomes [0,1,9,16,100].

  Example 2:
    Input: nums = [-7,-3,2,3,11]
    Output: [4,9,9,49,121]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 성공 : 5분 소요 (이미 정렬이 되었는데, 음수 때문에 새롭게 sort()처리를 거쳐야 했음. 이걸 적절히 정렬하는 더 좋은 방법이 없을까?)
// Runtime: 120 ms
// Memory Usage: 45.3 MB
var sortedSquares = function (nums) {
  return nums
    .map((number) => {
      return Math.pow(number, 2);
    })
    .sort((a, b) => a - b);
};

// ======================================================================================

// 다른 사람의 코드 : Javascript two pointers solution
// Since we know that the source array is sorted,
// it is obvious that the largest numbers (by absolute value) are at the edges of the array,
// gradually decreasing towards the middle. So two pointers technique is ideal here.
var sortedSquares = function (A) {
  let result = [];
  let l = 0;
  let r = A.length - 1;
  let p = r;

  while (l <= r) {
    if (A[l] ** 2 > A[r] ** 2) {
      result[p--] = A[l++] ** 2;
    } else {
      result[p--] = A[r--] ** 2;
    }
  }

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : JS - Faster than 99% - Simple Solution
var sortedSquares = function (A) {
  const result = [];
  let head = 0;
  let tail = A.length - 1;

  while (head <= tail) {
    if (A[head] ** 2 > A[tail] ** 2) {
      result.push(A[head++] ** 2);
    } else {
      result.push(A[tail--] ** 2);
    }
  }

  return result.reverse();
};

// ======================================================================================

// 다른 사람의 코드 : Javascript | Two Pointers | O(n)
var sortedSquares = function (A) {
  if (A.length < 2)
    // Early exit if the array only has less than two element.
    return [Math.pow(A[0], 2)];

  const newArray = [];
  let i = 0;
  let j = A.length - 1;

  while (i <= j) {
    const left = Math.pow(A[i], 2); // Square the number to obtain positive value. e.g. -2**2 = 4
    const right = Math.pow(A[j], 2); // Square the number to obtain positive value. e.g. 4**2 = 16

    if (left >= right) {
      // If left is bigger or equal than the right add that as the first position of the array
      newArray.unshift(left);
      i++;
    } else {
      // If the right is bigger than the left add that as the first position of the array
      newArray.unshift(right);
      j--;
    }
  } // It will traverse the array only once, since if you combine i and j the two pointers will meet in a middle point,

  return newArray;

  /**
   * Use two pointers to compare each end since we know that they are the highest numbers when squared.
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   **/
};
