/*  0322 Mock Interview : 561. (easy) Array Partition I  // tag : Array

  Given an integer array `nums` of `2n` integers, 
    group these integers into `n` pairs (a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) for all i is maximized. 

  Return the maximized sum.


  Constraints:
    1 <= n <= 10^4
    nums.length == 2 * n
    -10^4 <= nums[i] <= 10^4


  Example 1:
    Input: nums = [1,4,3,2]
    Output: 4
    Explanation: All possible pairings (ignoring the ordering of elements) are:
      1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
      2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
      3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
        So the maximum possible sum is 4.

  Example 2:
    Input: nums = [6,2,6,5,1,2]
    Output: 9
    Explanation: 
      The optimal pairing is (2, 1), (2, 5), (6, 6). 
      min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.


*/

/**
 * @param {number[]} nums
 * @return {number}
 */

// 성공 : 10분 소요 (생각한 방법이 성공해서 좋음 // 다만 sort() 처리 때문에 O(nlogn)의 시간복잡도인데, 더 줄일 수 없을까?)
// Runtime: 140 ms
// Memory Usage: 43.5 MB
var arrayPairSum = function (nums) {
  // 생각한 방법 : 굳이 짝을 짓는 경우의 수를 다 만들려고 하지 말고,
  // 큰 숫자부터 나오도록 정렬한 뒤 앞에서부터 2개씩 묶어서 짝을 만들어 각 짝의 최소값(즉 짝수번째 값)을 더해 나가면 그게 답이다?
  nums.sort((a, b) => b - a);

  let answer = 0;

  for (let i = 1; i < nums.length; i = i + 2) {
    answer += nums[i];
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
// 내가 생각한 방법과 유사하다.
// reduce 안에 조건문을 넣고, 조건이 맞으면 누적하고 조건이 안맞으면 acc(sum)를 손대지 않고 그냥 리턴해서 변화없이 유지한다
var arrayPairSum = function (nums) {
  // sort and sum up the minimum of the pairs
  return nums
    .sort((a, b) => a - b)
    .reduce((sum, cur, i) => (i % 2 === 0 ? (sum += cur) : sum), 0);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution
// 역시 유사한 방법이며, filter 처리를 한 번 더 거쳤을 뿐
let arrayPairSum = function (nums) {
  return nums
    .sort((a, b) => a - b)
    .filter((x, index) => index % 2 === 0)
    .reduce((a, b) => a + b);
};
