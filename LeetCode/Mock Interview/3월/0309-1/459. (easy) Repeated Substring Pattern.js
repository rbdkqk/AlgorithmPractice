/*  0309-1 Mock Interview : 459. (easy) Repeated Substring Pattern  //  tag : String

  Given a string `s`, 
    check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.


  Constraints:
    1 <= s.length <= 10^4
    s consists of lowercase English letters.

    
  Example 1:
    Input: s = "abab"
    Output: true
    Explanation: It is the substring "ab" twice.
    
  Example 2:
    Input: s = "aba"
    Output: false
    
  Example 3:
    Input: s = "abcabcabcabc"
    Output: true
    Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

*/

/**
 * @param {string} s
 * @return {boolean}
 */

// 성공 : 45분 소요
// 답은 찾았지만, 효율성 면에서 의문임 - while 반복문 안에서 주어진 s 문자열을 subString 길이만큼 띄우며 다시 반복문을 돌리기 때문에, O(n^2)이라고 생각함

// Runtime: 112 ms
// Memory Usage: 46.1 MB
var repeatedSubstringPattern = function (s) {
  let subString = '';

  let frontString = '';
  let backString = '';

  let front = 0;
  let back = s.length - 1;

  while (front < back) {
    frontString = frontString + s[front];
    backString = s[back] + backString;

    if (frontString === backString) {
      subString = frontString;
      if (checkSubString(s, subString)) {
        return true;
      }
    }

    front++;
    back--;
  }

  return false;
};

function checkSubString(originString, subString) {
  if (originString.length % subString.length !== 0) {
    return false;
  } else {
    for (let i = 0; i < originString.length; i += subString.length) {
      if (subString !== originString.substring(i, i + subString.length)) {
        return false;
      }
    }
  }

  return true;
}

// ======================================================================================

// 다른 사람의 코드 : Javascript single line solution
// 두번 반복하고 앞뒤로 하나씩 제거한 뒤 기존 문자열을 포함하는지를 체크하는 방법인 듯
// 이건 내가 낼 수 없는 아이디어라고 생각함
var repeatedSubstringPattern = function (s) {
  return s.repeat(2).slice(1, -1).includes(s);
};

// ======================================================================================

// 다른 사람의 코드 : Two JS Solutions
// 일정한 패턴을 일정한 만큼 반복한 뒤 주어진 s 문자열과 비교하는 방식인데, 한눈에 이해되지 않았고 내가 생각해 내지 못했을 것 같다.

var repeatedSubstringPattern = function (s) {
  let i = 1,
    len = s.length;

  while (i <= Math.floor(len / 2)) {
    if (s.slice(0, i).repeat(len / i) == s) {
      return true;
    }

    i++;
  }

  return false;
};

var repeatedSubstringPattern = function (s) {
  let pattern = '';

  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    pattern += s[i];

    if (pattern.repeat(s.length / pattern.length) === s) {
      return true;
    }
  }

  return false;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript easy to read
// 이건 어느정도 이해가 됨 - 앞에서부터 하나씩 덧붙여가며 cur 문자열을 만들고, 그걸 multiple만큼 반복하여 비교
// i가 1이라면 cur 길이는 1이고, s.length / 1은 s.length 이므로, 1글자를 전체 길이만큼 반복
// i가 2라면 cur 길이는 2이고, s.length / 2는 s.length의 절반이므로, 2 * 절반은 전체 길이
// 이렇게 반복해서, 매번 시도에서 각각 반복한 결과는 s 문자열과 비교할만한 대상이 된다
var repeatedSubstringPattern = function (s) {
  let median = Math.floor(s.length / 2);
  let cur;
  let multiple;

  for (let i = 1; i <= median; i++) {
    cur = s.slice(0, i);
    multiple = Math.floor(s.length / cur.length);

    if (cur.repeat(multiple) === s) {
      return true;
    }
  }

  return false;
};
