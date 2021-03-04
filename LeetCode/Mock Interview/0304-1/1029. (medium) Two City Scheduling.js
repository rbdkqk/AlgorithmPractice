/*  0304-1 Mock Interview : 1029. (medium) Two City Scheduling  //  tag : Greedy

  A company is planning to interview `2n` people. 
  
  Given the array costs where `costs[i] = [aCosti, bCosti]`, 
    the cost of flying the `ith` person to city `a` is `aCosti`, 
    and the cost of flying the `ith` person to city `b` is `bCosti`.

  Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.


  Constraints:
    2 * n == costs.length
    2 <= costs.length <= 100
    costs.length is even.
    1 <= aCosti, bCosti <= 1000


  Example 1:
    Input: costs = [[10,20],[30,200],[400,50],[30,20]]
    Output: 110
    Explanation: 
      The first person goes to city A for a cost of 10.
      The second person goes to city A for a cost of 30.
      The third person goes to city B for a cost of 50.
      The fourth person goes to city B for a cost of 20.
        The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.
    
  Example 2:
    Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
    Output: 1859
  
  Example 3:
    Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
    Output: 3086

*/

/**
 * @param {number[][]} costs
 * @return {number}
 */

// 실패 - 문제 자체를 제대로 이해하지 못함
var twoCitySchedCost = function (costs) {
  let answer = 0;

  // 두 값의 절대값을 뺀 차이가 큰 순서로 정렬하고,
  costs.sort((a, b) => {
    let aValue = Math.abs(a[0] - a[1]);
    let bValue = Math.abs(b[0] - b[1]);
    return aValue - bValue;
  });

  let aCity = 0;
  let bCity = 0;

  let index = 0;

  while (aCity < costs.length / 2 || bCity < costs.length / 2) {
    if (costs[index][0] < costs[index][1]) {
      answer += costs[index][0];
      aCity++;
    } else {
      answer += costs[index][1];
      bCity++;
    }
    index++;
  }

  for (let i = costs.length / 2 - 1; i < costs.length; i++) {
    answer += Math.max(costs[i][0], costs[i][1]);
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript, O(nlogn) time
var twoCitySchedCost = function (costs) {
  // 아래 정렬방식을 취한 이유가 이해되지 않음
  costs = costs.sort((a, b) => b[0] - b[1] - (a[0] - a[1]));

  var minCost = 0,
    i;

  for (i = 0; i < costs.length / 2; i++) {
    minCost += costs[i][1];
  }

  for (i = costs.length / 2; i < costs.length; i++) {
    minCost += costs[i][0];
  }

  return minCost;
};

// ======================================================================================

// 다른 사람의 코드 : Easy Javascript  Solution
// 1. Sort based off difference between a and b for each person. (Guarantees biggest savings.)
// 2. Pick min between cities until you hit cap of counts.length/2
// 3. Pick other city until end of loop.
// (If you don't want to make changes to the original array, make a copy before the sort.)
var twoCitySchedCost = function (costs) {
  let total = 0;
  let a_count = 0;
  let b_count = 0;
  let n = costs.length / 2;

  // sort based off difference of city a and city b
  costs.sort((a, b) => {
    const a_diff = a[0] > a[1] ? a[0] - a[1] : a[1] - a[0];
    const b_diff = b[0] > b[1] ? b[0] - b[1] : b[1] - b[0];
    return b_diff - a_diff;
  });

  for (let i = 0; i < costs.length; i++) {
    if (a_count == n) {
      total += costs[i][1];
    } else if (b_count == n) {
      total += costs[i][0];
    } else {
      const a = costs[i][0];
      const b = costs[i][1];
      if (a < b) {
        total += a;
        a_count++;
      } else {
        total += b;
        b_count++;
      }
    }
  }
  return total;
};
