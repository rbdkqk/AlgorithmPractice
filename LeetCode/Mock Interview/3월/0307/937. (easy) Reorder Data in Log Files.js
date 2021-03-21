/*  0307 Mock Interview : 937. (easy) Reorder Data in Log Files  //  tag : String

  You are given an array of `logs`. 
    Each log is a space-delimited string of words, where the first word is the identifier.

  There are two types of logs:
    Letter-logs: All words (except the identifier) consist of lowercase English letters.
    Digit-logs: All words (except the identifier) consist of digits.

  Reorder these logs so that:
    The letter-logs come before all digit-logs.
    The letter-logs are sorted lexicographically by their contents. 
      If their contents are the same, then sort them lexicographically by their identifiers.
    The digit-logs maintain their relative ordering.

  Return the final order of the logs.


  Constraints:
    1 <= logs.length <= 100
    3 <= logs[i].length <= 100
    All the tokens of logs[i] are separated by a single space.
    logs[i] is guaranteed to have an identifier and at least one word after the identifier.


  Example 1:
    Input: logs = ["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]
    Output: ["let1 art can"," let3 art zero", "let2 own kit dig", "dig1 8 1 5 1", "dig2 3 6"]
    Explanation:
      The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
      The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".

  Example 2:
    Input: logs = ["a1 9 2 3 1", "g1 act car", "zo4 4 7", "ab1 off key dog", "a8 act zoo"]
    Output: ["g1 act car", "a8 act zoo", "ab1 off key dog", "a1 9 2 3 1", "zo4 4 7"]

*/

/**
 * @param {string[]} logs
 * @return {string[]}
 */

// 30분 소요
// Runtime: 92 ms
// Memory Usage: 43.8 MB
var reorderLogFiles = function (logs) {
  let stringArray = [];
  let numberArray = [];

  let answer = [];

  for (let i = 0; i < logs.length; i++) {
    let splittedArray = logs[i].split(' ');
    if (isNaN(Number(splittedArray[1]))) {
      stringArray.push(splittedArray);
    } else {
      numberArray.push(splittedArray);
    }
  }

  stringArray.sort((a, b) => {
    let aJoin = a.slice(1).join(' ');
    let bJoin = b.slice(1).join(' ');

    if (aJoin !== bJoin) {
      return aJoin.localeCompare(bJoin);
    } else {
      return a[0].localeCompare(b[0]);
    }
  });

  for (let j = 0; j < stringArray.length; j++) {
    answer.push(stringArray[j].join(' '));
  }

  for (let k = 0; k < numberArray.length; k++) {
    answer.push(numberArray[k].join(' '));
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript solution
// 정규표현식이 활용되어서, 내가 당장 이해하기엔 어렵다
const reorderLogFiles = (logs) => {
  const body = (s) => s.slice(s.indexOf(' ') + 1); // get the body after identifier
  const isNum = (c) => /\d/.test(c);

  // if body same then compare identifier
  const compare = (a, b) => {
    const n = body(a).localeCompare(body(b));
    if (n !== 0) return n;
    return a.localeCompare(b);
  };

  const digitLogs = [];
  const letterLogs = [];
  for (const log of logs) {
    if (isNum(body(log))) digitLogs.push(log);
    else letterLogs.push(log);
  }
  return [...letterLogs.sort(compare), ...digitLogs];
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Split and Merge
// 설명 : Split the LOGS into letters and digits log.
// Followed with sorting the letters log and finally merging them to provide the result
// isFinite() : 주어진 값이 유한수인지 판별합니다. 필요한 경우 매개변수를 먼저 숫자로 변환합니다.

// 내가 작성한 코드와 컨셉은 비슷한 듯 (각 종류별로 나누고, 정렬한 뒤 합치기)
// 다만, 코드를 작성하는 방법 면에서 더 깔끔하다 (마지막에 합칠 때 난 반복문을 2개 작성했으나, 여기서는 spread operator로 처리함)
// 추가로 알게 된 사항 : localeCompare을 쓰지 않고도 문자열을 정렬할 수 있다  //  위의 isFinite() 전역 함수는 처음 봤다
var reorderLogFiles = function (logs) {
  const digits = [],
    letters = [];

  for (const log of logs) {
    if (isFinite(log.split(' ')[1])) digits.push(log);
    // digit log
    else letters.push(log); // letter log
  }

  // Sorting the letters log based on condition of lexio order without and with key (example: 'let1')
  letters.sort((a, b) => {
    let l1 = a.split(' ').slice(1).join(' '),
      l2 = b.split(' ').slice(1).join(' ');

    if (l1 === l2) return a > b ? 1 : -1;
    return l1 > l2 ? 1 : -1;
  });

  return [...letters, ...digits];
};

// ======================================================================================

// 다른 사람의 코드 : Easy to read JavaScript solution
var reorderLogFiles = function (logs) {
  return [
    ...logs.filter(isLetterLog).sort(sortByLetters),
    ...logs.filter(isDigit),
  ];
};

function isLetterLog(log) {
  const [_, letter] = log.split(' ');
  return isNaN(Number(letter));
}

function sortByLetters(log1, log2) {
  const [id1, ...letters1] = log1.split(' ');
  const [id2, ...letters2] = log2.split(' ');
  const diff = letters1.join(' ').localeCompare(letters2.join(' '));
  return diff === 0 ? id1.localeCompare(id2) : diff;
}

function isDigit(log) {
  return !isLetterLog(log);
}
