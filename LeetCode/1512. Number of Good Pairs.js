/*  0105 : 1512. Number of Good Pairs (easy)

  Given an array of integers `nums`.
  A pair `(i,j)` is called `good` if `nums[i] == nums[j] and i < j`.
  Return the number of `good` pairs.


  Constraints:
    1 <= nums.length <= 100
    1 <= nums[i] <= 100


  Example 1:
    Input: nums = [1,2,3,1,1,3]
    Output: 4
    Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.

  Example 2:
    Input: nums = [1,1,1,1]
    Output: 6
    Explanation: Each pair in the array are good.

  Example 3:
    Input: nums = [1,2,3]
    Output: 0

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*  처음 제출한 답 

  시간복잡도 : O(n^2) : nums 배열을 이중으로 순회함
  공간복잡도 : O(1) : answer라는 1개의 변수에 숫자를 0부터 올려나갈 뿐임

  Runtime: 80 ms, faster than 54.12% of JavaScript online submissions for Number of Good Pairs.
  Memory Usage: 38.5 MB, less than 50.12% of JavaScript online submissions for Number of Good Pairs.

*/
var numIdenticalPairs = function (nums) {
  let answer = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === nums[j] && i < j) {
        answer++;
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 방법 : O(n) : 'map'을 활용한 방법 (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)
// https://leetcode.com/problems/number-of-good-pairs/discuss/742796/2-lines-in-JavaScript-using-counter-for-O(n)-brute-O(n2)
// 알아보기 쉽게 내가 조금 수정했음

/* Map 객체는 키-값 쌍을 저장하며 각 쌍의 삽입 순서도 기억하는 콜렉션입니다. 아무 값(객체와 원시 값)이라도 키와 값으로 사용할 수 있습니다.

  Map.prototype.get(key)
    주어진 키(Key)에 해당되는 값(value)을 반환하고, 만약 없으면 undefined를 반환한다.

  Map.prototype.set(key, value)
    Map 객체에 주어진 키(Key)에 값(Value)를 집어넣고, Map 객체를 반환한다.

  Map.prototype.values()
    Map 객체 안의 모든 '값(Value)'들을 집어넣은 순서대로 가지고 있는 Iterator 객체(ex) MapIterator {3, 1, 2})를 반환한다.  

*/

function numIdenticalPairs(nums) {
  // 1st line, count how many times each number appears.
  const map = nums.reduce(
    (acc, cur, i) => acc.set(cur, (acc.get(cur) || 0) + 1),
    new Map()
  );
  // 2nd line, use the n(n-1)/2 to get how many combinations are possible.
  return [...map.values()].reduce((num, n) => num + (n * (n - 1)) / 2, 0);
}

/* 해설

  1st line, count how many times each number appears.
  2nd line, use the n(n-1)/2 to get how many combinations are possible.

  This is the intuition for the formula, if you have only one number is zero, if you have a pair is two and so on.

  1: 0
  2: 1
  3: 2 + 1 = 3
  4: 3 + 2 + 1 = 6
  5: 4 + 3 + 2 + 1 = 10

  So of the formula to getting all natural number added up is: n(n-1)/2.

*/
