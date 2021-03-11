/*  0311 Mock Interview : 1155. (medium) Number of Dice Rolls With Target Sum  //  tag : Dynamic Programming
  (앞서 만나서 못 풀었던 문제 - 0220)

  You have `d` dice, and each die has `f` faces numbered 1, 2, ..., f.

  Return the number of possible ways (out of `f^d` total ways) 'modulo 10^9 + 7' to roll the dice 
    so the sum of the face up numbers equals `target`.


  Constraints:
    1 <= d, f <= 30
    1 <= target <= 1000


  Example 1:
    Input: d = 1, f = 6, target = 3
    Output: 1
    Explanation: 
      You throw one die with 6 faces.  There is only one way to get a sum of 3.
    
  Example 2:
    Input: d = 2, f = 6, target = 7
    Output: 6
    Explanation: 
      You throw two dice, each with 6 faces.  There are 6 ways to get a sum of 7:
      1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
    
  Example 3:
    Input: d = 2, f = 5, target = 10
    Output: 1
    Explanation: 
      You throw two dice, each with 5 faces.  There is only one way to get a sum of 10: 5+5.
  
  Example 4:
    Input: d = 1, f = 2, target = 3
    Output: 0
    Explanation: 
      You throw one die with 2 faces.  There is no way to get a sum of 3.
    
  Example 5:
    Input: d = 30, f = 30, target = 500
    Output: 222616187
    Explanation: 
      The answer must be returned modulo 10^9 + 7.

*/

/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */

// 실패 - 전에 만나서 못 풀었던 문제인데, 해결법이 머릿속에 남아있지 않음. 복습이 부족하다.
var numRollsToTarget = function (d, f, target) {};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution - Top Down with Memoization and Bottom Up Approach (DP)

// Top Down Approach with Memoization
var numRollsToTarget = function (d, f, target) {
  const MOD = 1e9 + 7;
  const memo = new Map();

  return findWays(d, 0);

  function findWays(k, sum) {
    const key = `${k}#${sum}`;

    // base case
    if (k == 0) return sum == target ? 1 : 0;
    if (sum > target) return 0;
    if (memo.has(key)) return memo.get(key);

    let count = 0;

    for (let face = 1; face <= Math.min(f, target); face++) {
      count = (count + findWays(k - 1, sum + face)) % MOD;
    }

    memo.set(key, count);
    return count;
  }
};

// Bottom Up Approach (DP) Using 2 Arrays
var numRollsToTarget = function (d, f, target) {
  const MOD = 1e9 + 7;
  let prevDP = new Array(target + 1).fill(0); // [1]

  for (let face = 1; face <= Math.min(f, target); face++) {
    prevDP[face] = 1; // [2]
  }

  for (let dice = 2; dice <= d; dice++) {
    // [3]
    const newDP = new Array(target + 1).fill(0);

    for (let face = 1; face <= f; face++) {
      // [4]

      for (let num = 1; num <= target; num++) {
        // [5]
        const rem = num - face; // [6]

        if (rem > 0) {
          // [7]
          newDP[num] = (newDP[num] + prevDP[rem]) % MOD;
        }
      }
    }
    prevDP = newDP;
  }

  return prevDP[target];
};

/*

[1] If there are no dices, then there is no way to reach any of the values.

[2] In the case we have 1 dice, there is 1 way to reach each of the dice's face values. 
	However, there is no way to reach anything greater than those values.

[3] The dice rolls

[4] The dice's face values we will get from a roll

[5] The number we are currently targeting

[6] The remaining value we get will be less than our target value, so we can look at our prevDP to see how many ways there are to get there.

[7] The reason why its diff > 0 is because if the difference is 0, then the # of ways to get there is 0 since the dice starts at value 1. 
	If you put d >= 0 you still get the right answer since you are just adding 0. We can also just forgo the conditional check if 
	we set "num = face".
	
*/

// Bottom Up Approach (DP) Using Only A Single Array
var numRollsToTarget = function (d, f, target) {
  const MOD = 1e9 + 7;
  const dp = new Array(target + 1).fill(0);

  for (let face = 1; face <= Math.min(f, target); face++) {
    dp[face] = 1;
  }

  for (let dice = 2; dice <= d; dice++) {
    for (let num = target; num > 0; num--) {
      dp[num] = 0;

      for (let face = 1; face <= Math.min(f, num); face++) {
        const diff = num - face;
        dp[num] = (dp[num] + dp[diff]) % MOD;
      }
    }
  }

  return dp[target];
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Simple DP Memoization
var numRollsToTarget = function (d, f, target) {
  let memo = [...Array(d + 1)].map(() => Array(target + 1).fill(0));

  function run(dice, left) {
    if (left < dice || left > dice * f) return 0;
    if (dice === 1) return left <= f;
    if (memo[dice][left]) return memo[dice][left];

    let total = 0;

    for (let i = 1; i <= f; i++) {
      total += run(dice - 1, left - i);
      total %= 10 ** 9 + 7;
    }
    memo[dice][left] = total;
    return total;
  }
  return run(d, target);
};
