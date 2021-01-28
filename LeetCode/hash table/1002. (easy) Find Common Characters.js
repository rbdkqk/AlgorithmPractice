/*  1002. (easy) Find Common Characters //  tag : Array, Hash Table

  Given an array `A` of strings made only from lowercase letters, 
    return a list of all characters that show up in all strings within the list (including duplicates).  
    
  For example, if a character occurs 3 times in all strings but not 4 times, 
    you need to include that character three times in the final answer.

  You may return the answer in any order.


  Constraints:
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

// 내 코드 : 실패함
var commonChars = function (A) {
  // 객체 값이 A.length의 배수여야 각 요소에 다 존재하는 글자이다
  // 배수인 경우에는 최종 답에는 A.length로 나눠서 한번씩 반영한다
  let obj = {};
  let temp = {};
  let length = A.length;

  let answer = [];

  for (let k = 0; k < A[0].length; k++) {
    let eachLetter = A[0][k];

    if (obj.hasOwnProperty(eachLetter)) {
      obj[eachLetter] += 1;
      temp[eachLetter] += 1;
    } else {
      obj[eachLetter] = 1;
      temp[eachLetter] = 1;
    }
  }

  for (let i = 1; i < A.length; i++) {
    // obj 객체를 복사한 새로운 객체에서 값을 더해주고,
    // 이 두 객체를 비교해서 값이 달라지지 않은 key는, 앞에는 있었으나 이번에는 없었던 것이므로, 그 이후엔 고려할 필요 없음
    // 이 처리 후에는 새 객체를 기존 객체에 넣어준다

    for (let j = 0; j < A[i].length; j++) {
      let eachLetter = A[i][j];
      if (temp.hasOwnProperty(eachLetter)) {
        temp[eachLetter] += 1;
      } // else가 없는 이유 : 위에서 안걸리면 앞에 없었던 값을 새롭게 발견한 것이므로, 고려할 필요 없는 값임
    }

    for (let each in temp) {
      if (temp[each] === obj[each]) {
        delete obj[each];
      } else {
        obj[each] = temp[each];
      }
    }
  }

  for (let key in obj) {
    while (obj[key] > length - 1) {
      answer.push(key);
      obj[key] -= length;
    }
  }

  return answer;
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
  let answer = A[0].split('');
  for (let i = 1; i < A.length; i++) {
    answer = findCommon(answer, A[i].split(''));
  }
  return answer;
};

// filter를 통과한 배열을 반환한다
var findCommon = function (originStringArray, nextStringArray) {
  return originStringArray.filter((eachLetter) => {
    let eachLetterIndex = nextStringArray.indexOf(eachLetter);
    if (eachLetterIndex !== -1) {
      // 뒤의 문자열에도 eachLetter가 존재하면,
      nextStringArray.splice(eachLetterIndex, 1); // nextStringArray에서 eachLetter를 제외하고,
      return true; // eachLetter는 살아남는다
    }
    return false; // 그렇지 않으면, eachLetter는 제외된다
  });
};

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript Solution
// time O(n^2) space O(n)
var commonChars = function (A) {
  const result = [];
  const firstWordArr = [...A[0]];

  for (const letter of firstWordArr) {
    if (A.every((word) => word.includes(letter))) {
      result.push(letter);
      A = A.map((word) => word.replace(letter, ''));
    }
  }

  return result;
};
