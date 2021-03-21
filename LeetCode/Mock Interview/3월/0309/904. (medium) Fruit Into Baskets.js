/*  0309 Mock Interview : 904. (medium) Fruit Into Baskets  //  tag : Two Pointers

  In a row of trees, the `i-th` tree produces fruit with type `tree[i]`.

  You start at any tree of your choice, then repeatedly perform the following steps:
    Add one piece of fruit from this tree to your baskets.  If you cannot, stop.
    Move to the next tree to the right of the current tree.  If there is no tree to the right, stop.
    Note that you do not have any choice after the initial choice of starting tree: you must perform step 1, then step 2, then back to step 1, then step 2, and so on until you stop.

  You have two baskets, and each basket can carry any quantity of fruit, but you want each basket to only carry one type of fruit each.

  What is the total amount of fruit you can collect with this procedure?


  Notes:
    1 <= tree.length <= 40000
    0 <= tree[i] < tree.length

    
  Example 1:
    Input: [1,2,1]
    Output: 3
    Explanation: We can collect [1,2,1].

  Example 2:
    Input: [0,1,2,2]
    Output: 3
    Explanation: We can collect [1,2,2].
      If we started at the first tree, we would only collect [0, 1].
  
  Example 3:
    Input: [1,2,3,2,2]
    Output: 4
    Explanation: We can collect [2,3,2,2].
      If we started at the first tree, we would only collect [1, 2].
    
  Example 4:
    Input: [3,3,3,1,2,1,1,2,3,3,4]
    Output: 5
    Explanation: We can collect [1,2,1,1,2].
      If we started at the first tree or the eighth tree, we would only collect 4 fruits.

*/

/**
 * @param {number[]} tree
 * @return {number}
 */

// 첫 시도 : 실패 - 논리는 맞는 것 같지만, O(n^2)이라서 Time Limit Exceeded에 걸린 것 같다
// 걸린 테스트케이스 : [0,0,0,0,0,0,0,0,0,0,0, ... ,0,0,0,0,0,0,0,0,0,0]
var totalFruit = function (tree) {
  let answer = 0;

  for (let i = 0; i < tree.length; i++) {
    let map = new Map();

    for (let j = i; j < tree.length; j++) {
      if (map.size === 2) {
        let keys = Array.from(map.keys());
        if (tree[j] === keys[0] || tree[j] === keys[1]) {
          map.set(tree[j], map.get(tree[j]) + 1);
        } else {
          break;
        }
      } else {
        if (map.has(tree[j])) {
          map.set(tree[j], map.get(tree[j]) + 1);
        } else {
          map.set(tree[j], 1);
        }
      }
    }

    let newAmount = Array.from(map.values()).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    answer = Math.max(answer, newAmount);
  }

  return answer;
};

// 두번째 시도 : 실패 - 61 / 90 Testcases Passed
// [1,0,1,4,1,4,1,2,3] 이런 케이스를 잡아내지 못함 : 1,4,1,4,1 을 처리해야 하는데, 4를 만났을 때 1과 4를 저장하지 않고 0과 4를 저장함
var totalFruit = function (tree) {
  let answer = 0;

  if (tree.length === 1) {
    return 1;
  }

  let basket1 = [tree[0]];
  let basket2 = [];

  for (let i = 1; i < tree.length; i++) {
    let currentFruit = tree[i];

    if (currentFruit === basket1[0]) {
      basket1.push(currentFruit);
    } else if (currentFruit === basket2[0] || basket2.length === 0) {
      basket2.push(currentFruit);
    } else if (currentFruit !== basket1[0] && currentFruit !== basket2[0]) {
      answer = Math.max(answer, basket1.length + basket2.length);
      basket1 = basket2.slice();
      basket2 = [currentFruit];
    }

    if (i === tree.length - 1) {
      answer = Math.max(answer, basket1.length + basket2.length);
      basket1 = basket2.slice();
      basket2 = [currentFruit];
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Fast JavaScript Solution
// Actual Problem Statement: Return the length of the longest contiguous subarray with no more than two distinct characters

// 아래 두번째 코드를 보니 이 코드도 Sliding-Window 방식인 듯

// 예제 : [1,0,1,4,1,4,1,2,3] / 5
const totalFruit = (tree) => {
  let map = new Map(),
    max = -1;

  for (let start = 0, end = 0; end < tree.length; end++) {
    let currElement = tree[end];

    map.set(currElement, map.get(currElement) + 1 || 1);

    // 처음 while로 들어오는 시점 : 4를 만났을 때 (start : 0, end : 3, map.size : 3)
    // 1,0,1 3개 숫자를 start가 건너오되 1에서 멈춰야 한다.

    // (3) start가 2까지 올라왔고 tree[start]는 1이므로 map에서는 {1: 1} 상황이어서 여기서 1을 빼면 0이 남지만,
    // 아래 2번째 연산결과 map에서 0이 사라졌으므로, map에는 1과 4가 남음. 2개라서 while로 들어가지 않고 무사통과
    while (map.size > 2) {
      let char = tree[start];
      let charCount = map.get(char);

      // (2) 아래에서 한번 처리된 뒤, start : 1이 되면 {1: 1, 0: 1} 상황임
      // 이번에 대상이 되는 array[start]는 앞에서는 1이었지만 이번에는 0
      // 0에 대응하는 값은 1이니까, map.delete 안으로 들어가게 되고 map에서 0은 삭제됨
      if (charCount - 1 === 0) {
        map.delete(char);
      } else {
        // (1) {1: 2, 0: 1} 상황에서, start가 0일 때 첫번째 연산은 여기로 들어온다
        // ('1: 2'이므로 2-1은 0이 아니어서 map.delete 당하지 않음)
        map.set(char, charCount - 1);
      }

      start++;
    }

    // 원소를 하나하나 세고 있을 것이 아니라,
    // 해당하는 index를 Two Pointer로 잡아서 `end + 1 - start`로 세어 넣어준다...
    if (map.size >= 1) max = Math.max(max, end + 1 - start);
  }

  return max;
};

// ======================================================================================

// 다른 사람의 코드 : Sliding Window Javascript
// 위 코드와 비슷한 컨셉인 듯
var totalFruit = function (tree) {
  let left = 0;
  let currentLargest = -Infinity;
  let obj = {};

  for (let i = 0; i < tree.length; i++) {
    obj[tree[i]] = (obj[tree[i]] || 0) + 1;

    //keep update the obj until more than 2 elements in the continuous subarr
    while (Object.keys(obj).length > 2) {
      obj[tree[left]]--;

      if (obj[tree[left]] === 0) {
        delete obj[tree[left]];
      }

      left++;
    }

    currentLargest = Math.max(currentLargest, i - left + 1);
  }

  return currentLargest;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution : O(n)
var totalFruit = (tree) => {
  let result = 0;
  let currentTotal = 0;
  let countLastFruit = 0;
  let firstFruit = 0;
  let lastFruit = 0;

  for (let fruit of tree) {
    currentTotal =
      fruit === firstFruit || fruit === lastFruit
        ? currentTotal + 1
        : countLastFruit + 1;
    countLastFruit = fruit === lastFruit ? countLastFruit + 1 : 1;
    if (lastFruit !== fruit) {
      firstFruit = lastFruit;
      lastFruit = fruit;
    }
    result = Math.max(result, currentTotal);
  }
  return result;
};
