/*  0119 : 1370. Increasing Decreasing String (easy)  //  tag : sort, string

  Given a string `s`. You should re-order the string using the following algorithm:

    Pick the smallest character from `s` and append it to the result.
    Pick the smallest character from `s` which is greater than the last appended character to the result and append it.
    Repeat step 2 until you cannot pick more characters.
    Pick the largest character from `s` and append it to the result.
    Pick the largest character from `s` which is smaller than the last appended character to the result and append it.
    Repeat step 5 until you cannot pick more characters.
    Repeat the steps from 1 to 6 until you pick all characters from `s`.

  In each step, If the smallest or the largest character appears more than once 
    you can choose any occurrence and append it to the result.

  Return the result string after sorting `s` with this algorithm.


  Constraints:
    1 <= `s`.length <= 500
    `s` contains only lower-case English letters.


  Example 1:
    Input: `s` = "aaaabbbbcccc"
    Output: "abccbaabccba"
    Explanation: 
      After steps 1, 2 and 3 of the first iteration, result = "abc"
      After steps 4, 5 and 6 of the first iteration, result = "abccba"
      First iteration is done. Now s = "aabbcc" and we go back to step 1
      After steps 1, 2 and 3 of the second iteration, result = "abccbaabc"
      After steps 4, 5 and 6 of the second iteration, result = "abccbaabccba"

  Example 2:
    Input: s = "rat"
    Output: "art"
    Explanation: The word "rat" becomes "art" after re-ordering it with the mentioned algorithm.

  Example 3:
    Input: s = "leetcode"
    Output: "cdelotee"

  Example 4:
    Input: s = "ggggggg"
    Output: "ggggggg"

  Example 5:
    Input: s = "spo"
    Output: "ops"

*/

/**
 * @param {string} s
 * @return {string}
 */

/*  내가 제출한 답

  시간복잡도 : 매우 안좋음
    - splittedS : split에서 n, sort에서 nlogn
    - map : n
    - reversedSplittedS : slice에서 n, reverse에서 n
    - reversedMap : n

    - while : n : 주어진 문자열의 개수만큼 각 map 간의 값을 넣었으므로, 문자열 길이만큼만 연산하면 더 돌진 않는다
      (안에 forEach가 있긴 한데, forEach 연산에서 map의 key에 대응하는 값이 사라지면 key 자체를 없애므로, 다음번에는 그 자리의 연산이 없음)
      (가령 , aaabbbccc라면, 첫 while에서 abc 3번 연산하고, 두번째 while에서 cba 3번, 세번째 while에서 abc 3번 하고 끝남)

  공간복잡도 : 매우 안좋음
    - map, reversedMap, answer 이 3가지는 s 문자열의 길이와 동일한 공간을 차지할 것
    - splittedS, reversedSplittedS 이 둘은 s 문자열의 길이만큼 차지하지는 않을 것 같지만, 차지하기는 한다

  Runtime: 120 ms, faster than 41.61% of JavaScript online submissions for Increasing Decreasing String.
  Memory Usage: 44.6 MB, less than 44.97% of JavaScript online submissions for Increasing Decreasing String.

*/

var sortString = function (s) {
  let splittedS = s.split('').sort(compareString);
  let map = new Map();
  for (let i = 0; i < splittedS.length; i++) {
    let currentValue = map.get(splittedS[i]);
    if (currentValue === undefined) {
      map.set(splittedS[i], 1);
    } else {
      map.set(splittedS[i], currentValue + 1);
    }
  }

  let reversedSplittedS = splittedS.slice().reverse();
  let reversedMap = new Map();
  for (let i = 0; i < reversedSplittedS.length; i++) {
    let currentValue = reversedMap.get(reversedSplittedS[i]);
    if (currentValue === undefined) {
      reversedMap.set(reversedSplittedS[i], 1);
    } else {
      reversedMap.set(reversedSplittedS[i], currentValue + 1);
    }
  }

  let answer = '';

  let incOrDec = 1;

  while (map.size) {
    if (incOrDec === 1) {
      map.forEach((value, key, map) => {
        answer = answer + key;
        map.set(key, value - 1);
        reversedMap.set(key, value - 1);
        if (map.get(key) < 1) {
          map.delete(key);
          reversedMap.delete(key);
        }
      });
      incOrDec = -1;
    } else if (incOrDec === -1) {
      reversedMap.forEach((value, key, reversedMap) => {
        answer = answer + key;
        reversedMap.set(key, value - 1);
        map.set(key, value - 1);
        if (reversedMap.get(key) < 1) {
          reversedMap.delete(key);
          map.delete(key);
        }
      });
      incOrDec = 1;
    }
  }

  return answer;
};

function compareString(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

// ======================================================================================

// 다른 사람의 답

var sortString = function (s) {
  // Array.from()
  // 유사 배열 객체(array-like object)나반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체를 만듭니다.
  let arr = Array.from(s);
  let ret = '';

  arr.sort();

  while (arr.length) {
    /*  Array.filter()
      주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
      syntax : arr.filter(callback(element[, index[, array]])[, thisArg])
      callback : 각 요소를 시험할 함수. true를 반환하면 요소를 유지하고, false를 반환하면 버립니다. 
      'callback이 true로 강제하는 값을 반환하는 모든 값이 있는 새로운 배열을 생성합니다.'
    */
    arr = arr.filter((x, i) => {
      if (i === 0 || x !== ret[ret.length - 1]) {
        ret += x;
        return false;
      }
      return true;
    });

    arr.reverse();
  }

  return ret;
};

// ======================================================================================

// 다른 사람의 답

var sortString = function (s) {
  let chars = s.split('').sort();
  let res = [];
  let map = {};
  let inserted = true;

  for (let i = 0; i < chars.length; i++) {
    if (!map[chars[i]]) map[chars[i]] = 0;
    map[chars[i]]++;
  }

  chars = chars.filter((x, i, arr) => arr[i - 1] != x);

  while (inserted) {
    inserted = false;
    for (let i = 0; i < chars.length; i++) {
      if (map[chars[i]]) {
        res.push(chars[i]);
        map[chars[i]]--;
        inserted = true;
      }
    }
    chars.reverse();
  }

  return res.join('');
};
