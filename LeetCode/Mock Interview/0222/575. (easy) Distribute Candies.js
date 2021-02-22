/*  0222 Mock Interview : 575. (easy) Distribute Candies  //  tag : Hash Table

  Alice has `n` candies, where the `i`th candy is of type `candyType[i]`. 
    Alice noticed that she started to gain weight, so she visited a doctor.

  The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). 
    Alice likes her candies very much, 
    and she wants to eat the maximum number of different types of candies while still following the doctor's advice.

  Given the integer array `candyType` of length `n`, 
    return the 'maximum number of different types of candies' she can eat if she only eats `n / 2` of them.


  Constraints:
    n == candyType.length
    2 <= n <= 10^4
    n is even.
    -10^5 <= candyType[i] <= 10^5


  Example 1:
    Input: candyType = [1,1,2,2,3,3]
    Output: 3
    Explanation: 
      Alice can only eat 6 / 2 = 3 candies. 
      Since there are only 3 types, she can eat one of each type.

  Example 2:
    Input: candyType = [1,1,2,3]
    Output: 2
    Explanation: 
      Alice can only eat 4 / 2 = 2 candies. 
      Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.

  Example 3:
    Input: candyType = [6,6,6,6]
    Output: 1
    Explanation: 
      Alice can only eat 4 / 2 = 2 candies. 
      Even though she can eat 2 candies, she only has 1 type.

*/

/**
 * @param {number[]} candyType
 * @return {number}
 */

/*  내가 작성한 코드 (10분 소요)

  시간복잡도 : O(n) : new Set() 처리에서 candyType 배열을 1회 순회
  공간복잡도 : O(n) : new Set() 처리로 만들어진 setSize Set객체는 candyType의 요소가 다양해질수록 그 크기가 커짐

  Runtime: 132 ms, faster than 87.87% of JavaScript online submissions for Distribute Candies.
  Memory Usage: 52.4 MB, less than 65.69% of JavaScript online submissions for Distribute Candies.

*/
var distributeCandies = function (candyType) {
  let half = candyType.length / 2;

  let setSize = new Set(candyType).size;

  return Math.min(half, setSize);
};

// ======================================================================================

// 다른 사람의 코드 : 1-line JavaScript O(n) solution using Set
// 본문 코드는 내 코드와 비슷해서, ES6 문법을 반영한 댓글의 코드를 기록함
const distributeCandies = (candies) =>
  Math.min(new Set(candies).size, candies.length / 2);
