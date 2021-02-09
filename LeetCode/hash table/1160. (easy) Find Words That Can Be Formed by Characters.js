/*  0209 : 1160. (easy) Find Words That Can Be Formed by Characters //  tag : Array, Hash Table

  You are given an array of strings `words` and a string `chars`.

  A string is good if it can be formed by characters from `chars` (each character can only be used once).

  Return the sum of lengths of all good strings in `words`.


  Constraints:
    1 <= words.length <= 1000
    1 <= words[i].length, chars.length <= 100
    All strings contain lowercase English letters only.


  Example 1: 
    Input: words = ["cat","bt","hat","tree"], chars = "atach"
    Output: 6
    Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.

  Example 2:
    Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
    Output: 10
    Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.

*/

/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */

/*  내가 작성한 코드 : 각 문자열을 모두 map으로 바꿔서 각 값을 비교하는 방식인데, 너무 길다

  시간복잡도 : O(n) : words 배열 자체의 길이와 그 안의 각 요소의 길이가 모두 길어질수록, n 값이 증가한다 + chars 문자열을 map 처리하는 것도 고려해야 함
  공간복잡도 : O(n) : chars map 객체와 words 배열 안의 각 eachWord 문자열을 처리한 map 객체의 길이가 길어질수록, n 값이 증가한다

  Runtime: 168 ms, faster than 68.84% of JavaScript online submissions for Find Words That Can Be Formed by Characters.
  Memory Usage: 46.4 MB, less than 74.18% of JavaScript online submissions for Find Words That Can Be Formed by Characters.

*/
var countCharacters = function (words, chars) {
  let answer = 0;

  let map = new Map();
  for (let each of chars) {
    if (!map.has(each)) {
      map.set(each, 1);
    } else {
      map.set(each, map.get(each) + 1);
    }
  }

  for (let eachWord of words) {
    let eachMap = new Map();
    for (let el of eachWord) {
      if (!eachMap.has(el)) {
        eachMap.set(el, 1);
      } else {
        eachMap.set(el, eachMap.get(el) + 1);
      }
    }

    let length = eachWord.length;

    let flag = false;
    let pointer = true;

    eachMap.forEach((value, key) => {
      if (value <= map.get(key)) {
        flag = true;
      } else {
        pointer = false;
      }
    });

    if (!pointer) {
      flag = false;
    }

    if (flag === true) {
      answer += length;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript (Almost) 1-Line Solution Using Reduce
const countCharacters = (words, chars) =>
  words.reduce((cnt, word, idx) => {
    for (const c of [...chars]) word = word.replace(c, '');
    return cnt + (0 === word.length ? words[idx].length : 0);
  }, 0);

// ======================================================================================

// 다른 사람의 코드 : JavaScript using HashMap & Reduce (human readable)
var countCharacters = function (words, chars) {
  const dict = new Map();
  chars.split('').forEach((c) => {
    if (dict.has(c)) {
      dict.set(c, dict.get(c) + 1);
    } else {
      dict.set(c, 1);
    }
  });
  const reducer = (acc, curr) => {
    const reference = new Map(dict);
    for (let i = 0; i < curr.length; i++) {
      if (reference.has(curr[i]) && reference.get(curr[i]) > 0) {
        if (i === curr.length - 1) acc += curr.length;
        reference.set(curr[i], reference.get(curr[i]) - 1);
      } else {
        break;
      }
    }
    return acc;
  };
  return words.reduce(reducer, 0);
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
var countCharacters = function (words, chars) {
  let total = 0;
  for (let word of words) {
    let map = createMap(chars);
    if (isWordGood(word, map)) {
      total += word.length;
    }
  }

  return total;
};

var createMap = function (chars) {
  let map = {};
  for (let i = 0; i < chars.length; i++) {
    if (!map[chars[i]]) {
      map[chars[i]] = 0;
    }
    map[chars[i]]++;
  }

  return map;
};

var isWordGood = function (word, map) {
  for (let i = 0; i < word.length; i++) {
    if (!map[word[i]] || map[word[i]] == 0) {
      return false;
    }
    map[word[i]]--;
  }

  return true;
};
