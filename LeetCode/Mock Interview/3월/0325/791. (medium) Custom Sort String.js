/*  0325 Mock Interview : 791. (medium) Custom Sort String  // tag : String

  `S` and `T` are strings composed of lowercase letters. 
    In S, no letter occurs more than once.

  S was sorted in some custom order previously. 
    We want to permute the characters of T so that they match the order that S was sorted. 
    More specifically, if x occurs before y in S, then x should occur before y in the returned string.

  Return any permutation of T (as a string) that satisfies this property.


  Notes:
    S has length at most 26, and no character is repeated in S.
    T has length at most 200.
    S and T consist of lowercase letters only.


  Example :
    Input: 
      S = "cba"
      T = "abcd"
    Output: "cbad"
    Explanation: 
      "a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
      Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.

*/

/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */

// 성공 : 10분 소요 (최종 시간복잡도는 O(n)이라고 생각함. 더 효율적으로 처리할 수 있을까?)
// Runtime: 72 ms
// Memory Usage: 38.8 MB
var customSortString = function (S, T) {
  let answer = '';

  let splittedT = T.split('');

  let obj = splittedT.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  for (let i = 0; i < S.length; i++) {
    while (obj[S[i]] > 0) {
      answer += S[i];
      obj[S[i]] = obj[S[i]] - 1;
    }

    delete obj[S[i]];
  }

  for (let key in obj) {
    while (obj[key] > 0) {
      answer += key;
      obj[key] = obj[key] - 1;
    }

    delete obj[key];
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 1 liner
const customSortString = (S, T) =>
  T.split('')
    .sort((a, b) => S.indexOf(a) - S.indexOf(b))
    .join('');

// ======================================================================================

// 다른 사람의 코드 : [ javascript / typescript ] very easy to understand w/ comments
// 봐도 잘 모르겠다
function customSortString(S, T) {
  // index occurrence for all 26 lowercase chars
  const occ = new Uint8Array(26);
  // fill occurrences with indices at which chars appear
  for (let i = 0; i < S.length; i++) occ[S.charCodeAt(i) - 97] = i;
  // result string arr (to sort)
  const res = T.split('');
  // sort based on index occurrence in S (if it never was in there, itll just be a 0)
  // which doesn't matter because chars not in S can be in any order
  res.sort((a, b) => occ[a.charCodeAt(0) - 97] - occ[b.charCodeAt(0) - 97]);
  // join back res
  return res.join('');
}

// ======================================================================================

// 다른 사람의 코드 : Hashmap | Javascript solution | Faster than 98.04% (48ms)
// while 반복문 대신에 repeat를 활용했다. 그 외에는 내 코드와 컨셉이 비슷한 듯
var customSortString = function (S, T) {
  let mapT = {},
    result = '';

  for (let i = 0; i < T.length; i++) {
    mapT[T[i]] = (mapT[T[i]] || 0) + 1;
  }

  for (let i = 0; i < S.length; i++) {
    result += S[i].repeat(mapT[S[i]]);
    delete mapT[S[i]];
  }

  let keys = Object.keys(mapT);

  for (let i = 0; i < keys.length; i++) {
    result += keys[i].repeat(mapT[keys[i]]);
  }

  return result;
};
