/*  0327 Mock Interview : 1002. (easy) Find Common Characters  // tag : Array, Hash Table

  Given an array `A` of strings made only from lowercase letters, 
    return a list of all characters that show up in all strings within the list (including duplicates).  

  For example, if a character occurs 3 times in all strings but not 4 times, 
    you need to include that character three times in the final answer.

  You may return the answer in any order.


  Note:
    1 <= A.length <= 100
    1 <= A[i].length <= 100
    A[i][j] is a lowercase letter


  Example 1:
    Input: ["bella","label","roller"]
    Output: ["e","l","l"]

  Example 2:
    Input: ["cool","lock","cook"]
    Output: ["c","o"]

*/

/**
 * @param {string[]} A
 * @return {string[]}
 */

// 성공 : 20분 소요 (코드가 너무 길고 복잡하다. 시간복잡도도 O(n^2)일 것임 - 전에는 못 풀어서 다른 사람 코드를 갖다놨던 문제)
// Runtime: 136 ms
// Memory Usage: 48.4 MB
var commonChars = function (A) {
  let startObj = {};

  for (let aChar of A[0]) {
    startObj[aChar] = (startObj[aChar] || 0) + 1;
  }

  for (let i = 1; i < A.length; i++) {
    let innerObj = {};

    for (let char of A[i]) {
      innerObj[char] = (innerObj[char] || 0) + 1;
    }

    for (let key in startObj) {
      if (innerObj[key] === undefined) {
        delete startObj[key];
      } else if (startObj[key] > innerObj[key]) {
        startObj[key] = innerObj[key];
      }
    }
  }

  let answerArray = [];

  for (let each in startObj) {
    while (startObj[each] > 0) {
      answerArray.push(each);
      startObj[each] = startObj[each] - 1;
    }
  }

  return answerArray;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript concise solution
var commonChars = function (A) {
  let answer = [...A[0]]; // ['abcde', 'fghjk']  =>  ["a", "b", "c", "d", "e"]
  for (let i = 1; i < A.length; i++) {
    answer = answer.filter((eachLetter) => {
      const originLength = A[i].length; // 변경 전의 문자열 길이
      A[i] = A[i].replace(eachLetter, ''); // 문자열이 일치한다면, ''로 바꿔준다(: 그 문자열을 삭제한다)
      return originLength > A[i].length; // true면 기존 배열에 다시 들어갈 수 있음
      // 검사 대상인 개별 글자(c)가, 뒤의 문자열 중에 포함되어 있으면, 뒤 문자열의 길이가 변경되었을 것이니,
      // 기존 길이 'l'이 새로운 길이 'A[i].length'보다 길어지고, 그러면 c 문자는 살아남는다
      // 그렇지 않은 문자는 filter를 통과하지 못하므로, 다음번의 filter에는 들어가지 못함(: 다음번에는 고려하지 않게 됨)
    });
  }
  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript, 99% Time, 100% memory, Easy to understand, iterative method
var commonChars = function (A) {
  let ans = A[0].split('');
  for (let i = 1; i < A.length; i++) {
    ans = findCommon(ans, A[i].split(''));
  }
  return ans;
};

var findCommon = function (a, b) {
  return a.filter((v) => {
    let i = b.indexOf(v);
    if (i !== -1) {
      b.splice(i, 1);
      return true;
    }
    return false;
  });
};
