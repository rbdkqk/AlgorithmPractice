/*  0323-1 Mock Interview : 290. (easy )Word Pattern  // tag : Hash Table

  Given a `pattern` and a string `s`, find if `s` follows the same pattern.

  Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in `s`.


  Constraints:
    1 <= pattern.length <= 300
    pattern contains only lower-case English letters.
    1 <= s.length <= 3000
    s contains only lower-case English letters and spaces ' '.
    s does not contain any leading or trailing spaces.
    All the words in s are separated by a single space.


  Example 1:
    Input: pattern = "abba", s = "dog cat cat dog"
    Output: true

  Example 2:
    Input: pattern = "abba", s = "dog cat cat fish"
    Output: false

  Example 3:
    Input: pattern = "aaaa", s = "dog cat cat dog"
    Output: false

  Example 4:
    Input: pattern = "abba", s = "dog dog dog dog"
    Output: false

*/

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

// 성공 : 30분 소요 (억지로 맞춰 짜서 성공한 느낌이다)
// Runtime: 76 ms
// Memory Usage: 38.3 MB
var wordPattern = function (pattern, s) {
  let splittedS = s.split(' ');

  if (pattern.length !== splittedS.length) {
    return false;
  }

  let keyMap = new Map();
  let valueMap = new Map();

  for (let i = 0; i < splittedS.length; i++) {
    keyMap.set(pattern[i], splittedS[i]);
    valueMap.set(splittedS[i], pattern[i]);
  }

  for (let j = 0; j < splittedS.length; j++) {
    if (keyMap.get(pattern[j]) !== splittedS[j]) {
      return false;
    }

    if (valueMap.get(keyMap.get(pattern[j])) !== pattern[j]) {
      return false;
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript: easy to understand
// 맵 2개를 만들어 교차 비교하는 방식. 내가 쓴 코드와 유사해 보인다.
// 반복문 한번에 끝냈다는 점에서 이 코드가 더 유리함
var wordPattern = function (pattern, str) {
  const strArr = str.split(' ');

  if (pattern.length !== strArr.length) {
    return false;
  }

  const patMap = new Map();
  const strMap = new Map();

  for (let i = 0; i < pattern.length; i++) {
    if (
      (patMap.has(pattern[i]) && patMap.get(pattern[i]) !== strArr[i]) ||
      (strMap.has(strArr[i]) && strMap.get(strArr[i]) !== pattern[i])
    ) {
      return false;
    }

    patMap.set(pattern[i], strArr[i]);
    strMap.set(strArr[i], pattern[i]);
  }
  return true;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean Solution
// 1개의 map으로 처리했음. / 두 대상을 set으로도 비교했음. / 반복문 1회
var wordPattern = function (pattern, str) {
  const words = str.split(/\s+/);
  const map = new Map();

  if (words.length !== pattern.length) {
    return false;
  }

  if (new Set(words).size !== new Set(pattern).size) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    if (map.has(pattern[i]) && map.get(pattern[i]) !== words[i]) {
      return false;
    }

    map.set(pattern[i], words[i]);
  }

  return true;
};
