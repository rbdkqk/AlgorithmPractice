/*  0225 : 1313. (easy) Decompress Run-Length Encoded List  //  tag : Array

  We are given a list `nums` of integers representing a list compressed with run-length encoding.

  Consider each adjacent pair of elements `[freq, val] = [nums[2*i], nums[2*i+1]]` (with `i >= 0`).  
    For each such pair, there are `freq` elements with value `val` concatenated in a sublist. 
    Concatenate all the sublists from left to right to generate the decompressed list.

  Return the decompressed list.


  Constraints:
    2 <= nums.length <= 100
    nums.length % 2 == 0
    1 <= nums[i] <= 100


  Example 1:
    Input: nums = [1,2,3,4]
    Output: [2,4,4,4]
    Explanation: 
      The first pair [1,2] means we have freq = 1 and val = 2 so we generate the array [2].
      The second pair [3,4] means we have freq = 3 and val = 4 so we generate [4,4,4].
      At the end the concatenation [2] + [4,4,4] is [2,4,4,4].

  Example 2:
    Input: nums = [1,1,2,3]
    Output: [1,3,3]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/*  내가 작성한 코드 (5분 내외 소요)
  
  시간복잡도 : O(n) : nums 배열을 1회 순회, 매번 순회마다 freq 값에 따라 연산이 길어진다
  공간복잡도 : O(n) : n이 커질수록, answer 배열 역시 길어진다

  Runtime: 100 ms, faster than 60.76% of JavaScript online submissions for Decompress Run-Length Encoded List.
  Memory Usage: 42.7 MB, less than 24.66% of JavaScript online submissions for Decompress Run-Length Encoded List.

*/
var decompressRLElist = function (nums) {
  let answer = [];

  for (let i = 0; i < nums.length / 2; i = i + 2) {
    let freq = nums[i];
    let val = nums[i + 1];

    for (let j = 0; j < freq; j++) {
      answer.push(val);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript one-liner
// `i % 2` 라는 조건으로 각 짝수번째에만 acc 배열에 연산이 진행되도록 했음 / Array.fill() 메소드를 활용해서 val 값을 채움
// 이렇게 전개구문과 Array.fill() 메소드를 활용하는 방법이나, 내 코드의 for 안에서 돌리는 for 반복문이나 시간복잡도는 비슷할 듯
var decompressRLElist = function (nums) {
  return nums.reduce(
    (acc, cur, i, arr) =>
      i % 2 ? [...acc, ...Array(arr[i - 1]).fill(cur)] : acc,
    []
  );
};

// ======================================================================================

// 다른 사람의 코드 : [JS] Simple JavaScript solution
// 이 코드 역시 전개구문과 Array.fill() 메소드를 활용함
// 이렇게 전개구문과 Array.fill() 메소드를 활용하는 방법이나, 내 코드의 for 안에서 돌리는 for 반복문이나 시간복잡도는 비슷할 듯
var decompressRLElist = function (nums) {
  const result = [];

  for (let i = 1; i < nums.length; i += 2) {
    result.push(...new Array(nums[i - 1]).fill(nums[i]));
  }

  return result;
};
