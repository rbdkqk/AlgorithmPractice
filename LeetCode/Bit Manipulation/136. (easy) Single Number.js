/*  230201 : 136. (easy) Single Number  // tag : Array, Bit Manipulation
  Given a non-empty array of integers nums, every element appears twice except for one.
  Find that single one.

  You must implement a solution with a linear runtime complexity and use only constant extra space.
*/

/*  Constraints:
  1 <= nums.length <= 3 * 104
  -3 * 104 <= nums[i] <= 3 * 104
  Each element in the array appears twice except for one element which appears only once.
*/

/* Example
  Example 1:
    Input: nums = [2,2,1]
    Output: 1

  Example 2:
    Input: nums = [4,1,2,1,2]
    Output: 4

  Example 3:
    Input: nums = [1]
    Output: 1
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

// 성공
// Runtime : 97 ms (Beats 46.15%) - Memory : 51.6 MB (Beats 5.5%)
var singleNumber = function (nums) {
  const map = new Map();
  let answer;

  nums.forEach((n) => map.set(n, !map.get(n) ? 1 : 2));

  map.forEach((n, key) => {
    if (n === 1) {
      answer = key;
    }
  });

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Very Easy || 0 ms ||100%|| Fully Explained (Java, C++, Python, JS, C, Python3)
/*  Concept of XOR:
  XOR of zero and some bit returns that bit i.e. x^0 = x...
  XOR of two same bits returns 0 i.e. x^x = 0...
  And, x^y^x = (x^x)^y = 0^y = y...
  XOR all bits together to find the unique number.
*/
var singleNumber = function (nums) {
  // Initialize the unique number...
  let uniqNum = 0;
  // TRaverse all elements through the loop...
  for (let idx = 0; idx < nums.length; idx++) {
    // Concept of XOR...
    uniqNum = uniqNum ^ nums[idx];
  }
  return uniqNum; // Return the unique number...
};

// ======================================================================================

// 다른 사람의 코드 : One Line Solution
var singleNumber = function (arr) {
  // SOLUTION II
  let res = 0;
  for (i = 0; i < arr.length; i++) {
    res ^= arr[i];
  }
  return res;
};

var singleNumber = function (arr) {
  // SOLUTION III
  return arr.reduce((prev, curr) => prev ^ curr);
};
