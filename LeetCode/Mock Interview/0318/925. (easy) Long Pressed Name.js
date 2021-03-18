/*  0318 Mock Interview : 925. (easy) Long Pressed Name  // tag : Two Pointers, String

  Your friend is typing his `name` into a keyboard. 
    Sometimes, when typing a character `c`, the key might get long pressed, and the character will be typed 1 or more times.

  You examine the `typed` characters of the keyboard. 
    Return True if it is possible that it was your friends name, with some characters (possibly none) being long pressed.


  Constraints:
    1 <= name.length <= 1000
    1 <= typed.length <= 1000
    name and typed contain only lowercase English letters.


  Example 1:
    Input: name = "alex", typed = "aaleex"
    Output: true
    Explanation: 'a' and 'e' in 'alex' were long pressed.

  Example 2:
    Input: name = "saeed", typed = "ssaaedd"
    Output: false
    Explanation: 'e' must have been pressed twice, but it wasn't in the typed output.

  Example 3:
    Input: name = "leelee", typed = "lleeelee"
    Output: true

  Example 4:
    Input: name = "laiden", typed = "laiden"
    Output: true
    Explanation: It's not necessary to long press any character.

*/

/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */

// 첫번째 시도 : 실패 ("alex" / "aaleexa" 에서 막혔음)
var isLongPressedName = function (name, typed) {
  if (name === typed) {
    return true;
  }

  let nameMap = new Map();

  for (let char1 of name) {
    if (nameMap.has(char1)) {
      nameMap.set(char1, nameMap.get(char1) + 1);
    } else {
      nameMap.set(char1, 1);
    }
  }

  let typedMap = new Map();

  for (let char2 of typed) {
    if (typedMap.has(char2)) {
      typedMap.set(char2, typedMap.get(char2) + 1);
    } else {
      typedMap.set(char2, 1);
    }
  }

  if (nameMap.size !== typedMap.size) {
    return false;
  } else {
    let nameKeys = Array.from(nameMap.keys());
    let typedKeys = Array.from(typedMap.keys());

    for (let i = 0; i < nameKeys.length; i++) {
      if (nameKeys[i] !== typedKeys[i]) {
        return false;
      }

      let currentKey = nameKeys[i];

      if (
        nameMap.get(currentKey) > typedMap.get(currentKey) ||
        !typedMap.get(currentKey)
      ) {
        return false;
      }
    }

    return true;
  }
};

// 두번째 시도 : 실패
var isLongPressedName = function (name, typed) {
  let nameArr = [];
  let currentName = name[0];
  let nameNum = 1;

  let nameInnerArr = [];

  for (let i = 1; i < name.length; i++) {
    if (name[i] === currentName) {
      nameNum++;
      nameInnerArr[0] = currentName;
      nameInnerArr[1] = nameNum;
    } else {
      nameArr.push(nameInnerArr.slice());
      nameInnerArr = [];
      currentName = name[i];
      nameNum = 1;
    }
  }

  let typedArr = [];
  let currentType = typed[0];
  let typedNum = 1;

  let typedInnerArr = [];

  for (let j = 1; j < typed.length; j++) {
    if (typed[j] === currentType) {
      typedNum++;
      typedInnerArr[0] = currentType;
      typedInnerArr[1] = typedNum;
    } else {
      typedArr.push(typedInnerArr.slice());
      typedInnerArr = [];
      currentType = typed[j];
      typedNum = 1;
    }
  }

  if (nameArr.length !== typedArr.length) {
    return false;
  }

  for (let k = 0; k < nameArr.length; k++) {
    if (nameArr[k][0] !== typedArr[k][0]) {
      return false;
    }

    if (nameArr[k][1] > typedArr[k][1]) {
      return false;
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : clean O(n) javascript solution with two pointers
var isLongPressedName = function (name, typed) {
  let i, j;

  for (i = 0, j = 0; i < typed.length && j <= name.length; i++) {
    if (typed[i] == name[j]) {
      j++;
    } else if (typed[i] != name[j - 1]) {
      return false;
    }
  }

  return i == typed.length && j == name.length;
};

// ======================================================================================

// 다른 사람의 코드 : Easy JS Solution: 90%, 100%
// 내가 생각했던 두번째 방법과 유사한 듯. 다만 나는 각 문자열을 배열로 변환하는 방법이 정확하지 않았다.
var isLongPressedName = function (name, typed) {
  let arr1 = groupify(name);

  let arr2 = groupify(typed);

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (i = 0; i < arr1.length; i++) {
    if (arr1[i][1] > arr2[i][1]) {
      return false;
    }
  }

  return true;
};

var groupify = function (word) {
  let str = '',
    arr = [];

  for (i = 0; i < word.length; i++) {
    str += word[i];

    if (word[i] !== word[i + 1]) {
      arr.push([str, str.length]);
      str = '';
    }
  }

  return arr;
};
