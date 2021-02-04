/*  0204 : 1502. (easy) Can Make Arithmetic Progression From Sequence  // tag : Array, Sort

  Given an array of numbers `arr`. 
  
  A sequence of numbers is called an arithmetic progression 
    if the difference between any two consecutive elements is the same.

  Return `true` if the array can be rearranged to form an arithmetic progression, 
    otherwise, return `false`.


  Constraints:
    2 <= arr.length <= 1000
    -10^6 <= arr[i] <= 10^6


  Example 1:
    Input: arr = [3,5,1]
    Output: true
    Explanation: 
      We can reorder the elements as [1,3,5] or [5,3,1] with differences 2 and -2 respectively, 
      between each consecutive elements.

  Example 2:
    Input: arr = [1,2,4]
    Output: false
    Explanation: 
      There is no way to reorder the elements to obtain an arithmetic progression.

*/

/**
 * @param {number[]} arr
 * @return {boolean}
 */

/*  내가 제출한 코드

  시간복잡도 : O(2nlogn) => O(nlogn) : sort에서 nlogn, for 반복문에서 n
  공간복잡도 : O(n) : arr 배열이 길어지면 sortArray 배열도 같이 길어짐

  Runtime: 76 ms, faster than 92.05% of JavaScript online submissions for Can Make Arithmetic Progression From Sequence.
  Memory Usage: 38.8 MB, less than 67.05% of JavaScript online submissions for Can Make Arithmetic Progression From Sequence.

*/
var canMakeArithmeticProgression = function (arr) {
  let sortedArray = arr.sort((a, b) => a - b);

  let interval = sortedArray[1] - sortedArray[0];

  for (let i = 1; i < sortedArray.length - 1; i++) {
    if (sortedArray[i + 1] - sortedArray[i] !== interval) {
      return false;
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : Seems the test cases are not enough? -- [JavaScript] 3 solutions - O(n) time & O(1) space
// 다른 사람들 답은 나랑 비슷하길래, 가장 달랐던 이 코드만 남김

/*
  SOLUTION 3
    It's an update for solution 2. We use an in-place strategy to optimize space complexity.

  The in-place strategy is:
    We could check if the value of current index is the same as the sorting result since we know the min and diff already.
    If it's not the same, we make it the same and use the value of the current index to get the next correct index.
    Loop this, until the condition in step 1 is passed.

  There are 3 situations to stop and return false:
    The diff is not an integer.
    The nextIdx is not an integer.
    We end at a bigger index after loop.

  O(n) time and O(1) space.
*/

const canMakeArithmeticProgression = (arr) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (const val of arr) {
    val < min && (min = val);
    val > max && (max = val);
  }
  const diff = (max - min) / (arr.length - 1);
  if (diff >> 0 !== diff) return false;
  for (let i = 0; i < arr.length; ++i) {
    let cur = i;
    while (arr[cur] !== min + cur * diff) {
      const nextIdx = (arr[cur] - min) / diff;
      if (nextIdx >> 0 !== nextIdx) return false;
      arr[cur] = min + cur * diff;
      cur = nextIdx;
    }
    if (cur > i) return false;
  }
  return true;
};
