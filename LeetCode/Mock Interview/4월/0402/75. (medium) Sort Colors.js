/*  0402 Mock Interview : 75. (medium) Sort Colors  // tag : Array, Two Pointers, Sort

  Given an array nums with n objects colored red, white, or blue, 
    sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

  We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.


  Constraints:
    n == nums.length
    1 <= n <= 300
    nums[i] is 0, 1, or 2.


  Follow up:
    Could you solve this problem without using the library's sort function?
    Could you come up with a one-pass algorithm using only O(1) constant space?


  Example 1:
    Input: nums = [2,0,2,1,1,0]
    Output: [0,0,1,1,2,2]

  Example 2:
    Input: nums = [2,0,1]
    Output: [0,1,2]

  Example 3:
    Input: nums = [0]
    Output: [0]

  Example 4:
    Input: nums = [1]
    Output: [1]

*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 실패 : 접근법을 전혀 찾지 못했음 - sort() 메소드를 사용하지 말라는 점과 O(1) 공간복잡도를 요구하는 점 역시 어려웠다
var sortColors = function (nums) {};

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript one-pass solution
// Example
// 0 0 | 1 | 2 1 | 2
//   l       i     r
function sortColors(nums) {
  function swap(i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let l = 0;
  let r = nums.length - 1;
  let i = 0;

  while (i <= r) {
    const n = nums[i];
    if (n === 0) {
      swap(i, l);
      l++;
      i++;
    } else if (n === 2) {
      swap(i, r);
      r--;
    } else {
      i++;
    }
  }
}

// ======================================================================================

// 다른 사람의 코드 : One-pass, memory<98%, with comments and explanation
/*  
  Because you have only 3 values, 0, 1, 2, you can do it in one pass with 3 pointers.
  You know that if you encounter a 0, you can move it to the left group, and if a 2, to the right group.
  Two of the pointers are the edges of those 2 groups, while your third pointer is to the element that you will iterate and check values of.
  So, checking one element at a time, swap it with the left edge if it's a zero, and right side if it's a 2. If it's a 1, leave it and go next (it will be moved/swapped later if necessary).
*/
var sortColors = function (nums) {
  let left = 0;
  let curr = 0;
  let right = nums.length - 1;
  while (curr <= right)
    if (nums[curr] == 0)
      [nums[curr++], nums[left++]] = [nums[left], nums[curr]];
    //swap values, you are always putting the 0 to the left edge, can increment new current since we have already looked at it before (curr>=left so we have already evaluated it)
    else if (nums[curr] == 2)
      [nums[curr], nums[right--]] = [nums[right], nums[curr]];
    //swap, so right side always has 2's, do not increment current yet because don't know what value it was.
    else curr++; // current was a 1, so you don't move it to either side, go next
};
