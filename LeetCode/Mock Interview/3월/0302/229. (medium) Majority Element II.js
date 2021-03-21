/*  0302 Mock Interview : 229. (medium) Majority Element II  //  tag : Array

  Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.


  Follow-up: 
    Could you solve the problem in linear time and in O(1) space?


  Constraints:
    1 <= nums.length <= 5 * 10^4
    -10^9 <= nums[i] <= 10^9


  Example 1:
    Input: nums = [3,2,3]
    Output: [3]
    
  Example 2:
    Input: nums = [1]
    Output: [1]
  
  Example 3:
    Input: nums = [1,2]
    Output: [1,2]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 10분 정도 소요 - 시간복잡도 O(n) 조건은 맞췄는데, 공간복잡도 O(1) 조건은 만족하지 못했음
// Runtime: 76 ms, faster than 97.10% of JavaScript online submissions for Majority Element II.
// Memory Usage: 40.7 MB, less than 59.06% of JavaScript online submissions for Majority Element II.
var majorityElement = function (nums) {
  let freq = parseInt(nums.length / 3);

  // 일단 공간복잡도 조건을 생각하지 않고 그냥 풀었음
  let obj = nums.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  let answer = [];

  for (let key in obj) {
    if (obj[key] > freq) {
      answer.push(Number(key));
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Boyer-Moore solution
// 댓글 : Array.prototype을 만지지 말고 별도의 순수 함수를 선언할 것을 권장했음
var majorityElement = function (nums) {
  const n = nums.length;
  if (n < 1) return [];
  if (n < 2) return nums;

  let count1 = 0,
    count2 = 0,
    candidate1 = 0,
    candidate2 = 1;

  for (let i = 0; i < n; i++) {
    if (nums[i] == candidate1) count1++;
    else if (nums[i] == candidate2) count2++;
    else if (count1 == 0) {
      candidate1 = nums[i];
      count1 = 1;
    } else if (count2 == 0) {
      candidate2 = nums[i];
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  let x = [];
  if (nums.count(candidate1) > n / 3) x.push(candidate1);
  if (nums.count(candidate2) > n / 3) x.push(candidate2);

  return x;
};

Array.prototype.count = function (num) {
  let count = 0;
  for (let i = 0; i < this.length; i++) if (this[i] == num) count++;

  return count;
};

// ======================================================================================

// 다른 사람의 코드 : O(n) time | O(1) space | JS solution with explanation
// 설명을 봐도 사실 컨셉을 잘 이해하지 못하겠음

// The idea to find two majority candidates iterating through the nums.
// We have only one or two majority elements because they can appear more than n/3 times.
// After that, we should count how many times each candidate appears in the nums.
// If it more than n/3 times, we will push a candidate into result array and return it.

var majorityElement = function (nums) {
  // base case
  if (nums.length === 1) return [nums[0]];

  // create vars
  let candidate1 = null,
    candidate2 = null;
  let counter1 = 0,
    counter2 = 0;

  // iterate through nums, find 2 candidates
  for (let i = 0; i < nums.length; i++) {
    if (candidate1 === nums[i]) {
      counter1++;
    } else if (candidate2 === nums[i]) {
      counter2++;
    } else if (counter1 === 0) {
      candidate1 = nums[i];
      counter1++;
    } else if (counter2 === 0) {
      candidate2 = nums[i];
      counter2++;
    } else {
      // if we already have 2 candidates and counters !== 0, decrease counters
      // if one counter will === 0, we will assign a new candidate in the next iteration
      counter1--;
      counter2--;
    }
  }

  // count how many times each candidate appears in the nums
  let appear1 = 0,
    appear2 = 0;
  let res = []; // create arr for only 1 or 2 numbers - our candidates

  nums.forEach((num) => {
    if (num === candidate1) appear1++;
    if (num === candidate2) appear2++;
  });

  // check appear1, appear2 if they apear more than n/3 times, push a candidate into resullt array
  if (appear1 > nums.length / 3) res.push(candidate1);
  if (appear2 > nums.length / 3) res.push(candidate2);

  return res;
};
