/*  0324 Mock Interview : 849. (medium) Maximize Distance to Closest Person  // tag : Array

  You are given an array representing a row of seats 
    where seats[i] = 1 represents a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty (0-indexed).

  There is at least one empty seat, and at least one person sitting.

  Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized. 

  Return that maximum distance to the closest person.


  Notes:
    2 <= seats.length <= 2 * 10^4
    seats[i] is 0 or 1.
    At least one seat is empty.
    At least one seat is occupied.


  Example 1:
    Input: seats = [1,0,0,0,1,0,1]
    Output: 2
    Explanation: 
      If Alex sits in the second open seat (i.e. seats[2]), then the closest person has distance 2.
      If Alex sits in any other open seat, the closest person has distance 1.
      Thus, the maximum distance to the closest person is 2.

  Example 2:
    Input: seats = [1,0,0,0]
    Output: 3
    Explanation: 
      If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.
      This is the maximum distance possible, so the answer is 3.

  Example 3:
    Input: seats = [0,1]
    Output: 1

*/

/**
 * @param {number[]} seats
 * @return {number}
 */

// 성공 : 30분 소요 (시간복잡도 면에서 O(n^2)이라고 생각함. 굉장히 불리하다)
// Runtime: 80 ms
// Memory Usage: 39.6 MB
var maxDistToClosest = function (seats) {
  let answer = 0;

  for (let i = 0; i < seats.length; i++) {
    if (seats[i] === 0) {
      let before = i - 1;
      let after = i + 1;

      while (0 <= before && seats[before] !== 1) {
        before--;
      }

      while (after <= seats.length - 1 && seats[after] !== 1) {
        after++;
      }

      if (before < 0) {
        before = Number.MIN_SAFE_INTEGER;
      }

      if (after > seats.length - 1) {
        after = Number.MAX_SAFE_INTEGER;
      }

      answer = Math.max(answer, Math.min(i - before, after - i));
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript 2 lines solution
var maxDistToClosest = function (seats) {
  const zeros = seats.join('').split('1');

  return Math.max(
    zeros.shift().length,
    zeros.pop().length,
    ...zeros.map((i) => (i.length > 0 ? Math.floor((i.length + 1) / 2) : 0))
  );
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] K+1 approach, but more intuitive (IMHO)
// My solution takes the intuition from the K+1 solution, but a bit paraphrased:

// Intiuition
// To find the answer, we need to find the maximal distance between 2 people and divide it by 2(take integer value) - the place where Alex would seat.
// We also need to consider first and last position, those potentially might be best options, and we compare it with the result from distance from 2 people.

/*  Explanation
  We start by initialising the impossible worst answer: max = 0.
  Then we need to initiate first to compare (at the end) distance to first occupied seat <-> position 0, and last
  In a loop, if first was not set before, we initiate it to first occuring occupied seat.
  We always set last to the last occupied seat.
  But before updating value of last we need to check this: if last was set before and we faced occupied seat, we recalculate best answer by substracting last from current position(i) and dividing by two(take floated value).
  After the loop we need to check potential best places (0 and seats.length -1). Here we don't divide by two, because there is no one on the sides.
  Return max.
*/
var maxDistToClosest = function (seats) {
  let first = null,
    last = null;
  let max = 0;

  for (let i = 0; i < seats.length; i++) {
    if (seats[i]) {
      if (first == null) {
        first = i;
      }

      if (last != null) {
        let dist = i - last;
        max = Math.max(max, Math.floor(dist / 2));
      }

      last = i;
    }
  }

  if (seats[0] !== 1) {
    max = Math.max(max, first);
  }

  if (seats[seats.length - 1] !== 1) {
    max = Math.max(max, seats.length - 1 - last);
  }

  return max;
};
