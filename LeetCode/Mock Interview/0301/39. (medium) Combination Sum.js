/*  0301 Mock Interview : 39. (medium) Combination Sum  //  tag : Array, Backtracking

  Given an array of 'distinct' integers `candidates` and a target integer `target`, 
    return a list of all unique combinations of candidates where the chosen numbers sum to target. 
    You may return the combinations in any order.

  The same number may be chosen from candidates an unlimited number of times. 
    Two combinations are unique if the frequency of at least one of the chosen numbers is different.

  It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.


  Constraints:
    1 <= candidates.length <= 30
    1 <= candidates[i] <= 200
    All elements of candidates are distinct.
    1 <= target <= 500


  Example 1:
    Input: candidates = [2,3,6,7], target = 7
    Output: [[2,2,3],[7]]   
    Explanation:
      2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
      7 is a candidate, and 7 = 7.
      These are the only two combinations.

  Example 2:
    Input: candidates = [2,3,5], target = 8
    Output: [[2,2,2,2],[2,3,3],[3,5]]
  
  Example 3:
    Input: candidates = [2], target = 1
    Output: []
  
  Example 4:
    Input: candidates = [1], target = 1
    Output: [[1]]
  
  Example 5:
    Input: candidates = [1], target = 2
    Output: [[1,1]]

*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

// 시간도 없고 방법도 한번에 떠오르지 않았음 - 재귀를 이용해서 풀어야 할지, 어째야할지 잘 모르겠다
// candidates의 큰 숫자부터 가져다가 target에서 빼 가면서, 0이 나오는 시점에서 이를 모아놓은 배열을 push하는 방식을 떠올렸음
// 아래와 같이 작성했으나 실패함
var combinationSum = function (candidates, target) {
  let answer = [];

  function recursion(targetNumber, innerArray) {
    for (let i = candidates.length - 1; i >= 0; i--) {
      let currentNumber = targetNumber - candidates[i];
      if (currentNumber < 0) {
        innerArray = new Array();
        continue;
      } else {
        if (currentNumber === 0) {
          innerArray.push(candidates[i]);
          answer.push(innerArray);
          innerArray = new Array();
        } else {
          innerArray.push(candidates[i]);
          recursion(currentNumber);
        }
      }
    }
  }

  recursion(target, []);

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution with backtracking
// backtracking의 기본적인 개념이나 코드작성 방법을 잘 모르니 이해도가 낮은 상태임
function combinationSum(candidates, target) {
  var buffer = [];
  var result = [];

  search(0, target);

  return result;

  function search(startIdx, target) {
    if (target === 0) {
      return result.push(buffer.slice());
    }

    if (target < 0) {
      return;
    }

    if (startIdx === candidates.length) {
      return;
    }

    // 위에서 if에 안걸렸다면, 아직 target 값이 남았다는 뜻
    buffer.push(candidates[startIdx]);

    // 그러므로, 현재 남은 target에서 현재 다루고 있는 candidates[startIdx]를 빼준 값을 다시 돌려주고,
    search(startIdx, target - candidates[startIdx]);

    // 그 결과가 (그 이후의 실행에서 언젠가) 위 if조건으로 끝났다면, 뒤에서 하나 빼고,
    buffer.pop();

    // 다음 값인 candidates[startIdx + 1]을 가지고, 아직 빼지 않은 target으로 다음 경우의 수를 판단한다
    search(startIdx + 1, target);
  }
}
