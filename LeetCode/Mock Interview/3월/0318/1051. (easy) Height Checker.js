/*  0318 Mock Interview : 1051. (easy) Height Checker  // tag : Array

  Students are asked to stand in non-decreasing order of heights for an annual photo.

  Return the minimum number of students that must move in order for all students to be standing in non-decreasing order of height.

  Notice that when a group of students is selected they can reorder in any possible way between themselves 
    and the non selected students remain on their seats.


  Constraints:
    1 <= heights.length <= 100
    1 <= heights[i] <= 100


  Example 1:
    Input: heights = [1,1,4,2,1,3]
    Output: 3
    Explanation: 
      Current array : [1,1,4,2,1,3]
      Target array  : [1,1,1,2,3,4]
      On index 2 (0-based) we have 4 vs 1 so we have to move this student.
      On index 4 (0-based) we have 1 vs 3 so we have to move this student.
      On index 5 (0-based) we have 3 vs 4 so we have to move this student.

  Example 2:
    Input: heights = [5,1,2,3,4]
    Output: 5

  Example 3:
    Input: heights = [1,2,3,4,5]
    Output: 0

*/

/**
 * @param {number[]} heights
 * @return {number}
 */

// 성공 : 15분 소요 (문제 자체가 좀 이상하다. 정렬을 위해 두 요소를 바꾼 횟수를 기록하라는게 아니고, 정렬할 목표와 현재 상태의 차이를 체크하라는 듯?)
// Runtime: 76 ms
// Memory Usage: 38.5 MB
var heightChecker = function (heights) {
  let sorted = heights.slice().sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== sorted[i]) {
      answer++;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : javascript solution
// reduce의 첫번째 인자는 callback 함수
// 이 callback 함수의 각 인자는 다음과 같음 : accumulator, currentValue, currentIndex, array
// 아래에서는 currentValue는 사용하지 않고 currentIndex만 사용하기 위해 '_'로 정의만 해 준 것 같다
const heightChecker = (heights) => {
  const sorted = [...heights].sort((a, b) => a - b);

  return heights.reduce(
    (total, _, index) => (sorted[index] !== heights[index] ? total + 1 : total),
    0
  );
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 2 solutions - sort and non-sort

// The first solution, we can sort the array and check the diff with the origin array.
const heightChecker = (heights) => {
  const origin = [...heights];

  heights.sort((a, b) => a - b);

  let ret = 0;

  for (let i = 0; i < origin.length; ++i) {
    origin[i] !== heights[i] && ++ret;
  }

  return ret;
};

// Second solution which need no sort, is that we traversal the heights to counting and then traversal the counting array to check the diff.
const heightChecker = (heights) => {
  const count = new Int8Array(101);

  for (let i = 0; i < heights.length; ++i) {
    ++count[heights[i]];
  }

  let ret = (idx = 0);

  for (let i = 0; i < 101; ++i) {
    while (count[i]--) {
      heights[idx++] !== i && ++ret;
    }
  }

  return ret;
};
