/*  0104 : 1470. Shuffle the Array (easy)

  Given an array `nums`, consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].
  Return the array in the form [x1,y1,x2,y2,...,xn,yn].


  Constraints:
    1 <= n <= 500
    nums.length == 2n
    1 <= nums[i] <= 10^3


  Example 1:
    Input: nums = [2,5,1,3,4,7], n = 3
    Output: [2,3,5,4,1,7] 
    Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].

  Example 2:
    Input: nums = [1,2,3,4,4,3,2,1], n = 4
    Output: [1,4,2,3,3,2,4,1]

  Example 3:
    Input: nums = [1,1,2,2], n = 2
    Output: [1,2,1,2]

*/

/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */

/*  내 코드 (5분 내외 걸림) 

  시간복잡도 : O(n/2) : nums 배열을 n까지 돌리는데, n은 nums.length/2 이므로...
  공간복잡도 : O(n) : answer 배열은 nums 배열과 길이가 같음.

  Runtime: 76 ms, faster than 98.71% of JavaScript online submissions for Shuffle the Array.
  Memory Usage: 40.9 MB, less than 12.70% of JavaScript online submissions for Shuffle the Array.

*/
var shuffle = function (nums, n) {
  let answer = [];

  for (let i = 0; i < n; i++) {
    answer.push(nums[i]);
    answer.push(nums[i + n]);
  }

  return answer;
};

// ======================================================================

// 다른 사람의 해결법 : O(n) Time O(1) Space
// 잘 이해되지 않음
// https://leetcode.com/problems/shuffle-the-array/discuss/675956/In-Place-O(n)-Time-O(1)-Space-With-Explanation-and-Analysis

var shuffle = function (nums, n) {
  let i = n - 1;
  for (let j = nums.length - 1; j >= n; j--) {
    nums[j] <<= 10;
    nums[j] |= nums[i];
    i--;
  }

  i = 0;
  for (let j = n; j < nums.length; j++) {
    const num1 = nums[j] & 1023;
    const num2 = nums[j] >> 10;
    nums[i] = num1;
    nums[i + 1] = num2;
    i += 2;
  }

  return nums;
};
