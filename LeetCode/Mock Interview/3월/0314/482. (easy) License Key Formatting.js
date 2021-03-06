/*  0314 Mock Interview : 482. (easy) License Key Formatting  // tag : ???

  You are given a license key represented as a string `S` 
    which consists only alphanumeric character and dashes. 
    
  The string is separated into N+1 groups by N dashes.

  Given a number `K`, we would want to reformat the strings such that each group contains exactly K characters, 
    except for the first group which could be shorter than K, 
    but still must contain at least one character. 
    
  Furthermore, there must be a dash inserted between two groups and all lowercase letters should be converted to uppercase.

  Given a non-empty string `S` and a number `K`, 
    format the string according to the rules described above.


  Notes:
    The length of string S will not exceed 12,000, and K is a positive integer.
    String S consists only of alphanumerical characters (a-z and/or A-Z and/or 0-9) and dashes(-).
    String S is non-empty.


  Example 1:
    Input: S = "5F3Z-2e-9-w", K = 4
    Output: "5F3Z-2E9W"
    Explanation: 
      The string S has been split into two parts, each part has 4 characters.
      Note that the two extra dashes are not needed and can be removed.
    
  Example 2:
    Input: S = "2-5g-3-J", K = 2
    Output: "2-5G-3J"
    Explanation: 
      The string S has been split into three parts, 
      each part has 2 characters except the first part as it could be shorter as mentioned above.

*/

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */

// 실패 : 테스트케이스를 하나하나 만나면서 그에 맞게 코드를 수정하다 보니 결국 답은 아니면서도 길이만 길어진 코드가 됐음
var licenseKeyFormatting = function (S, K) {
  let spittedS = S.split('-');

  let shift = spittedS.shift();

  let shiftString = '';

  for (let s = 0; s < shift.length; s++) {
    if (isNaN(Number(shift[s]))) {
      shiftString += shift[s].toUpperCase();
    } else {
      shiftString += shift[s];
    }
  }

  let answerArray = [shiftString];

  let elseSpittedS = spittedS.join('');

  if (answerArray[0].length > K) {
    let split = answerArray[0].split('');
    answerArray[0] = split.slice(0, K).join('');
    elseSpittedS = split.slice(K).join('') + elseSpittedS;
  }

  for (let i = 0; i < elseSpittedS.length; i = i + K) {
    let eachString = '';

    for (let j = i; j < i + K; j++) {
      if (elseSpittedS[j] === undefined) {
        break;
      } else if (isNaN(Number(elseSpittedS[j]))) {
        eachString += elseSpittedS[j].toUpperCase();
      } else {
        eachString += elseSpittedS[j];
      }
    }

    answerArray.push(eachString);
  }

  let join = answerArray.join('-');

  if (answerArray[answerArray.length - 1].length !== K) {
    let newJoin = answerArray.join('');
    let remain = newJoin.length % K;

    let answer = [newJoin.split('').slice(0, remain).join('')];

    let elseRemain = newJoin.split('').slice(remain);

    for (let l = 0; l < elseRemain.length; l = l + K) {
      answer.push(elseRemain.slice(l, l + K).join(''));
    }

    if (answer[0] === '') {
      answer.shift();
    }

    return answer.join('-');
  }

  return join;
};

// ======================================================================================

// 다른 사람의 코드 : Easy-to-Understand JS Solution
// 왜 뒤집으면서 하는지 잘 모르겠다
var licenseKeyFormatting = function (S, K) {
  const str = S.split('-').join('').split('').reverse().join('');

  const formatted = [];

  for (let i = 0; i < str.length; i += K) {
    formatted.push(str.substr(i, K).split('').reverse().join(''));
  }

  return formatted.reverse().join('-').toUpperCase();
};

// ======================================================================================

// 다른 사람의 코드 : JS Solution using Stack
// && 부분을 잘 모르겠다 - if 조건문 정도로 해석하면 되는건가?
var licenseKeyFormatting = function (S, K) {
  let stack = [];
  let result = '',
    n = K;

  for (let i = 0; i < S.length; i++) {
    S[i] != '-' && stack.push(S[i]);
  }

  while (stack.length) {
    if (n > 0) {
      result = stack.pop() + result;
      n--;
    } else {
      result = '-' + result;
      n = K;
    }
  }

  return result.toUpperCase();
};

// ======================================================================================

// 다른 사람의 코드 : O(n) JS without splitting or converting to array.
var licenseKeyFormatting = function (S, K) {
  let i = S.length - 1,
    str = '',
    count = 0;

  while (i >= 0) {
    if (S[i] !== '-') {
      count++;

      str =
        count - 1 > 0 && (count - 1) % K == 0
          ? `${S[i]}-` + str
          : (str = S[i] + str);
    }
    i--;
  }
  return str.toUpperCase();
};
