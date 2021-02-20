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

// 내가 작성한 코드 : 앞서 풀었던 때와 비슷하게 푼 것 같음
// 시간복잡도 : O(n^2) : (앞서 O(n)이라고 적었는데 잘못된 듯?) chars 문자열을 obj객체로 바꾸고, for 반복문 안의 개별 word마다 이 obj객체를 매번 순회해서 비교한다
// 공간복잡도 : O(n) : obj 객체와 wordObj 객체의 길이는 주어진 두 매개변수에 따라 그 크기가 달라진다
var countCharacters = function (words, chars) {
  answer = 0;

  if (words.length === 0) {
    return 0;
  }

  let obj = {};
  for (let i = 0; i < chars.length; i++) {
    obj[chars[i]] ? (obj[chars[i]] = obj[chars[i]] + 1) : (obj[chars[i]] = 1);
  }

  for (let word of words) {
    let plag = false;

    let wordObj = {};
    for (let i = 0; i < word.length; i++) {
      wordObj[word[i]]
        ? (wordObj[word[i]] = wordObj[word[i]] + 1)
        : (wordObj[word[i]] = 1);
    }

    for (let key of Object.keys(wordObj)) {
      if (wordObj[key] <= obj[key]) {
        plag = true;
      } else {
        plag = false;
        break;
      }
    }

    if (plag) answer += word.length;
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript (Almost) 1-Line Solution Using Reduce
// 개별 word(reduce)마다 chars(반복문)를 돌려 replace하는 방식인데, 이러면 O(n^2) 아닌가?
const countCharacters = (words, chars) =>
  words.reduce((cnt, word, idx) => {
    for (const c of [...chars]) word = word.replace(c, '');
    return cnt + (0 === word.length ? words[idx].length : 0);
  }, 0);

// ======================================================================================

// 다른 사람의 코드 : JavaScript using HashMap & Reduce (human readable)
// 이것도 마찬가지로, reducer를 매번 실행할때마다 reference Map객체를 새롭게 만들게 되고 이를 위해 dict Map객체를 순회해야 할 텐데,
// 이러면 역시 O(n^2) 아닌가?
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
// 내 방식과 컨셉은 비슷한 듯
// 역시 O(n^2)이 아닌가 생각함
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
