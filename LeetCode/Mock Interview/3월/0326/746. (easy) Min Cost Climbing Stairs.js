/*  0326 Mock Interview : 746. (easy) Min Cost Climbing Stairs  // tag : Array, Dynamic Programming

  On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).

  Once you pay the cost, you can either climb one or two steps. 
    You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.


  Note:
    cost will have a length in the range [2, 1000].
    Every cost[i] will be an integer in the range [0, 999].


  Example :
    Input: cost = [10, 15, 20]
    Output: 15
    Explanation: Cheapest is start on cost[1], pay that cost and go to the top.

  Example 2:
    Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    Output: 6
    Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].

*/

/**
 * @param {number[]} cost
 * @return {number}
 */

// 실패 : 0에서 시작할지 1에서 시작할지를 잘 결정헀다면 어땠을지 궁금하다 - 0과 1 두 경우를 모두 계산했을 때에는 1000개짜리 배열이 들어오면 Time Limit Exceeded
var minCostClimbingStairs = function (cost) {
  let top = cost.length;
  let sum = Number.MAX_SAFE_INTEGER;

  function recursion(currentIndex, costSum) {
    if (currentIndex >= top) {
      sum = Math.min(sum, costSum);
      return;
    }

    recursion(currentIndex + 1, costSum + cost[currentIndex]);
    recursion(currentIndex + 2, costSum + cost[currentIndex]);
  }

  if (cost[0] < cost[1]) {
    recursion(0, 0);
  } else {
    recursion(1, 0);
  }

  return sum;
};

// ======================================================================================

// 다른 사람의 코드 : [EASY TO READ] Javascript, O(n) time, O(1) space, Iterative
/*  Bottom up strategy / Iterative / Memoization
  Trick: At index [i], you only need to know the min cost when stepping on [i - 1] and [i - 2]. 
          This is a slight variation on fibonacci.
*/
var minCostClimbingStairs = function (cost) {
  if (cost.length === 1) return 0;
  if (cost.length === 2) return Math.min(cost[0], cost[1]);

  let minCostTwoBefore = cost[0];
  let minCostOneBefore = cost[1];

  for (let n = 2; n < cost.length; n++) {
    const minCostAtCurrent =
      cost[n] + Math.min(minCostOneBefore, minCostTwoBefore);

    minCostTwoBefore = minCostOneBefore;
    minCostOneBefore = minCostAtCurrent;
  }

  return Math.min(minCostOneBefore, minCostTwoBefore);
};

// ======================================================================================

// 다른 사람의 코드 : Two DP JS Solutions: different space complexities

// DP  //  Time Complexity: O(n)  //  Space Complexity: O(n)
var minCostClimbingStairs = function (cost) {
  let minCosts = new Array(cost.length + 1); // the last index is for the end of the floor
  (minCosts[0] = cost[0]), (minCosts[1] = cost[1]);
  // minCosts[i] represents the minimum cost to get to i and climb up from i
  for (let i = 2; i <= cost.length; i++) {
    minCosts[i] =
      Math.min(minCosts[i - 1], minCosts[i - 2]) +
      (i == cost.length ? 0 : cost[i]);
    // 0 instead of cost[i] because there is no more stair to climb up
    // and therefore there is no cost
  }
  return minCosts[minCosts.length - 1];
};

// Time Complexity: O(n)  //  Space Complexity: O(1)
var minCostClimbingStairs = function (cost) {
  let prevPrev = cost[0],
    prev = cost[1];
  for (let i = 2; i < cost.length; i++) {
    let current = cost[i] + Math.min(prevPrev, prev);
    // current represents the minimum cost to get to this step from the start and climb up from this step
    prevPrev = prev;
    prev = current;
    // since prev becomes current and prevPrev becomes prev, they both represent the minimum cost to get to where they are currently at from the start and climb up from there
  }
  // Now, we can reach the top of the floor from both prevPrev and prev.
  // prev is the minimum cost to reach the top floor by stepping once
  // and prevPrev is the minimum cost to reach to top floor by stepping twice.
  // We want to minimise the cost to get to the top, so we compute the min value between them
  return Math.min(prevPrev, prev);
};

// ======================================================================================

// 다른 사람의 코드 : 4 ways, step by step (from up-bottom to bottom-up)
// Add 0 to cost, so the last one of cost means the top of the floor.

// Step 1: Recursion (Time Limit Exceeded)
var minCostClimbingStairs = function (cost) {
  let helper = (cost, index) => {
    if (index < 0) return 0;
    if (index < 2) return cost[index];
    return (
      Math.min(helper(cost, index - 1), helper(cost, index - 2)) + cost[index]
    );
  };
  cost.push(0);
  return helper(cost, cost.length - 1);
};

// Step 2: Recursion + Memorization
var minCostClimbingStairs = function (cost) {
  let memo = [];
  let helper = (cost, index) => {
    if (index < 0) return 0;
    if (index < 2) return cost[index];
    if (memo[index]) return memo[index];
    memo[index] =
      Math.min(helper(cost, index - 1), helper(cost, index - 2)) + cost[index];
    return memo[index];
  };
  cost.push(0);
  return helper(cost, cost.length - 1);
};

// Step 3: DP Solution, O(n) space
var minCostClimbingStairs = function (cost) {
  cost.push(0);
  let dp = [cost[0], cost[1]];
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return dp[dp.length - 1];
};

// Step 4: DP Solution, O(1) space
var minCostClimbingStairs = function (cost) {
  let min1 = cost[0] ?? 0;
  let min2 = cost[1] ?? 0;
  cost.push(0);
  for (let i = 2; i < cost.length; i++) {
    let min = Math.min(min1, min2) + cost[i];
    min1 = min2;
    min2 = min;
  }
  return min2;
};
