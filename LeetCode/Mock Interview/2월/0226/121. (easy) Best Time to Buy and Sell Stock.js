/*  0226 Mock Interview : 121. (easy) Best Time to Buy and Sell Stock  //  tag : Array, Dynamic Programming

  You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

  You want to maximize your profit by choosing a single day to buy one stock 
    and choosing a different day in the future to sell that stock.

  Return the maximum profit you can achieve from this transaction. 
    If you cannot achieve any profit, return `0`.


  Constraints:
    1 <= prices.length <= 10^5
    0 <= prices[i] <= 10^4


  Example 1:
    Input: prices = [7,1,5,3,6,4]
    Output: 5
    Explanation: 
      Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
      Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

  Example 2:
    Input: prices = [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transactions are done and the max profit = 0.

*/

/**
 * @param {number[]} prices
 * @return {number}
 */

// 풀지 못했음 (아래는 내가 제출했던 실패 코드)
var maxProfit = function (prices) {
  let low = prices[0];
  let max = prices[0];

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] < prices[i + 1]) {
      if (low > prices[i]) {
        low = prices[i];
      }
      if (max < prices[i]) {
        max = prices[i + 1];
      }
    }
  }

  if (!low && !max) {
    return 0;
  }

  return max - low;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution, if anyone is interested
// 최저값과 최고값을 찾아서 두 값을 빼려고 하지 말고, '최저값'과 '차액'을 찾을 생각을 해야 한다
// 그래야 최저값이 더 낮게 갱신되더라도 차액은 남게 됨
// [2, 4, 0]의 경우처럼, 일단 2와 4의 차액인 2를 저장해 두면, 최저값이 0으로 갱신되더라도 앞서 저장한 차액은 변경되지 않음
// solution이 제시하는 방법인 것으로 보이며, O(n) / o(1) 이라고 한다
var maxProfit = function (prices) {
  var min = Number.MAX_SAFE_INTEGER;
  var max = 0;

  for (var i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }

  return max;
};

// 위 답의 댓글 :
// Nice solution! But it can be optimized further.
// Not in time complexity but in the number of execution that reduces the run time.
// We only need to calculate either max or min not both in every loop.
// 위 방법과 같은 컨셉인데, 'min이 바뀌었을 때에만 profit을 새로 연산하면 된다'는 개선점을 지적한 듯
var maxProfit = function (prices) {
  let profit = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; ++i) {
    if (min > prices[i]) {
      min = prices[i];
    } else if (prices[i] - min > profit) {
      profit = prices[i] - min;
    }
  }

  return profit;
};
