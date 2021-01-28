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
  let res = [...A[0]];
  for (let i = 1; i < A.length; i++) {
    res = res.filter((c) => {
      const l = A[i].length;
      A[i] = A[i].replace(c, '');
      return l > A[i].length;
    });
  }
  return res;
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
