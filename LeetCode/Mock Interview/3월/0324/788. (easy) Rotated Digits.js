/*  0324 Mock Interview : 788. (easy) Rotated Digits  // tag : String

  X is a good number if after rotating each digit individually by 180 degrees, we get a valid number that is different from X.  
    Each digit must be rotated - we cannot choose to leave it alone.

  A number is valid if each digit remains a digit after rotation. 
    0, 1, and 8 rotate to themselves; 
    2 and 5 rotate to each other (on this case they are rotated in a different direction, in other words 2 or 5 gets mirrored); 
    6 and 9 rotate to each other, and the rest of the numbers do not rotate to any other number and become invalid.

  Now given a positive number N, how many numbers X from 1 to N are good?


  Notes:
    N  will be in range [1, 10000].


  Example 1:
    Input: 10
    Output: 4
    Explanation: 
      There are four good numbers in the range [1, 10] : 2, 5, 6, 9.
      Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.

*/

/**
 * @param {number} N
 * @return {number}
 */

// 실패 : 문제 자체를 이해하기 어려웠다. 설명이 부실하다고 느꼈음.
// 문제 자체에 대한 의문점 : 1, 0과 마찬가지로 3도 뒤집었을 때 그 모양이 그대로 유지되니까 같은 조건 아닌가?  // 10을 넣으면 2,5,6,8,9를 걸러내는데, 원하는 것은 2,5,6,9임. 8은 왜 안되는건가?  //  1과 N은 포함이 되는 것인가 안 되는 것인가?
// 막힌 부분 : 어떤 숫자는 짝으로 등장할 때에만 뒤집을 수 있는 것 같다. 이걸 어떻게 판단할 것인가?
var rotatedDigits = function (N) {
  let set = new Set([2, 5, 6, 9]);

  let answer = 0;

  for (let i = 2; i < N; i++) {
    let stringI = String(i);
    let splittedNumber = [];
    let flag = true;

    for (let each of stringI) {
      splittedNumber.push(Number(each));
    }

    for (let j = 0; j < splittedNumber.length; j++) {
      if (!set.has(splittedNumber[j])) {
        flag = false;
        break;
      }
    }

    if (flag) {
      answer++;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript straight-forward solution
var rotatedDigits = function (N) {
  let counter = 0;
  for (let i = 1; i <= N; i++) {
    if (isValid(i)) counter++;
  }
  return counter;
};

const isValid = (n) => {
  let valid = false;
  while (n) {
    const a = n % 10;
    if (a === 3 || a === 4 || a === 7) return false;
    if (a === 2 || a === 5 || a === 6 || a === 9) valid = true;
    n = Math.trunc(n / 10);
  }
  return valid;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution - Brute Force Solution
var rotatedDigits = function (N) {
  let count = 0;

  for (let i = 1; i <= N; i++) {
    if (isValidDiffNum(i)) count++;
  }

  return count;

  function isValidDiffNum(num) {
    let isValid = true;
    let isDiff = false;

    while (num > 0) {
      const lastDig = num % 10;

      if (lastDig === 3 || lastDig === 4 || lastDig === 7) {
        isValid = false;
        break;
      } else if (
        lastDig === 2 ||
        lastDig === 5 ||
        lastDig === 6 ||
        lastDig === 9
      ) {
        isDiff = true;
      }

      num = Math.floor(num / 10);
    }

    return isValid && isDiff;
  }
};

// ======================================================================================

// 다른 사람의 코드 : javascript dp faster than 100
var rotatedDigits = function (N) {
  // dp[0][i]= num contain i elements has at least 1 from 2569
  // dp[1][i]= num contain i elements has none from 2569
  let count = 0,
    dp = [[0], [0]],
    curElementCount = 0;
  // e.g. 13
  // narr = [1,3]
  let narr = getNArr();
  let set2569 = new Set([2, 5, 6, 9]),
    setNums = new Set([0, 1, 8, 2, 5, 6, 9]);

  while (true) {
    curElementCount++;
    dp[0][curElementCount] = getHas(curElementCount);
    let curMax = Math.pow(10, curElementCount);
    if (curMax <= N) {
      count += dp[0][curElementCount];
      dp[1][curElementCount] = getNo(curElementCount);
      continue;
    }
    // dp[0]=[0,4,36]
    // dp[1]=[0,3]
    countToN(curElementCount, 1, false); // param start=1 means 0xx not allowed
    return count;
  }

  function countToN(els, start = 0, has2569 = false) {
    if (els == 0) return;
    let first = narr[narr.length - els];
    for (let i = start; i < first; i++) {
      if (!setNums.has(i)) continue;
      let has = has2569 || set2569.has(i);
      if (els == 1) {
        count += has ? 1 : 0;
        continue;
      }
      for (let j = 1; j < els; j++) {
        count += dp[0][j] + (has ? dp[1][j] : 0);
      }
    }
    if (!setNums.has(first)) return;
    if (els == 1) {
      if (has2569 || set2569.has(first)) {
        count += 1;
      }
      return;
    }
    countToN(els - 1, 0, has2569 || set2569.has(first));
  }

  function getNArr() {
    let arr = [],
      t = N;
    while (t) {
      let m = t % 10;
      arr.unshift(m);
      t = (t - m) / 10;
    }
    return arr;
  }

  function getHas(els) {
    if (els == 1) return 4;
    let rtn = 0;
    for (let i = 1; i < els; i++) {
      rtn += 6 * dp[0][i]; // [1,8,2,5,6,9]+0{i}+{already has 2569}
      rtn += 4 * dp[1][i]; // [2,5,6,9]+0{i}+{no 2569}
    }
    return rtn;
  }
  function getNo(els) {
    if (els == 1) return 3;
    let rtn = 0;
    for (let i = 1; i < els; i++) {
      rtn += 2 * dp[1][i]; // [1,8]+0{i}+{no 2569}
    }
    return rtn;
  }
};
