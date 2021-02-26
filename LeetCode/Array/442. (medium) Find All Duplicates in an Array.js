/*  0226 : 442. (medium) Find All Duplicates in an array  //  tag : Array

  Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), 
    some elements appear twice and others appear once.

  Find all the elements that appear twice in this array.

  Could you do it without extra space and in O(n) runtime?


  Example 1:
    Input: [4,3,2,7,8,2,3,1]
    Output: [2,3]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 시간내에 풀지 못함
var findDuplicates = function (nums) {
  let numberIndex = 0;
  let check;

  for (let i = 0; i < nums.length; i++) {
    // if (중복된 값이라면) {
    //   nums[numberIndex] = nums[i];
    //   numberIndex++;
    // } else {
    //   continue;
    // }
  }

  return nums.slice(0, numberIndex);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean 5-Liner O(1) Space
// 이 방법은 공간복잡도 O(n) 조건은 신경쓰지 않은 코드임
var findDuplicates = function (nums) {
  const result = [];
  nums.unshift(0);

  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]);
    if (nums[idx] < 0) result.push(idx);
    nums[idx] *= -1;
  }

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : JS linear time O(n), constant space O(1)
// 이런 기법으로 배열을 정렬하는 방법을 숙지해야 하겠음
var findDuplicates = function (nums) {
  // sorting the array by swapping
  let i = 0;

  while (i < nums.length) {
    if (nums[i] == i + 1 || nums[i] == nums[nums[i] - 1]) {
      i++;
    } else {
      let swapIndex = nums[i] - 1;
      [nums[i], nums[swapIndex]] = [nums[swapIndex], nums[i]];
    }
  }

  let count = 0;
  i = 0;

  // when we find an index that is not equal to array[value] we swap it with start of array and increment to count
  while (i < nums.length) {
    if (i + 1 !== nums[i]) {
      [nums[count], nums[i]] = [nums[i], nums[count]];
      count++;
    }
    i++;
  }
  return nums.slice(0, count);
};
