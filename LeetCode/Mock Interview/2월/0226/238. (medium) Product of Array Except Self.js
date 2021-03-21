/*  0226 Mock Interview : 238. (medium) Product of Array Except Self  //  tag : Array

  Given an array `nums` of `n` integers where n > 1,  
    return an array `output` such that `output[i]` is equal to the product of all the elements of nums except `nums[i]`.


  Constraint: 
    It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.


  Note: 
    Please solve it without division and in O(n).


  Follow up:
    Could you solve it with constant space complexity? 
    (The output array does not count as extra space for the purpose of space complexity analysis.)


  Example 1:
    Input:  [1,2,3,4]
    Output: [24,12,8,6]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 풀지 못했음 (아래는 내가 제출했던 실패 코드)
var productExceptSelf = function (nums) {
  let answer = [];

  let multi = nums.reduce((acc, cur) => {
    return acc * cur;
  });

  for (let i = 0; i < nums.length; i++) {
    if (multi === 0) {
      answer[i] = 0;
    } else {
      answer[i] = multi / nums[i];
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution, if anyone is interested
// 'O(n) / O(1) (`output` 제외) / 나눗셈 안쓰기' 조건을 만족하는, 이 문제의 'solution'이 설명하는 방법인 듯
function productExceptSelf(nums) {
  var output = [];
  var leftMult = 1;
  var rightMult = 1;

  for (var i = nums.length - 1; i >= 0; i--) {
    output[i] = rightMult; // nums[i] 우측의 값들을 누적한 값(rightMult)을 output 배열에 정리
    rightMult *= nums[i]; // 곱연산 rightMult 값을 다음 값과 곱해서 갱신한다
  }

  for (var j = 0; j < nums.length; j++) {
    output[j] *= leftMult; // output 배열의 각 값과, nums[j] 좌측의 값들을 누적한 값(leftMult)을 곱하여 최종 배열 완성
    leftMult *= nums[j]; // 곱연산 leftMult 값을 다음 값과 곱해서 갱신한다
  }

  return output;
}
