/*  0309 Mock Interview : 929. (easy) Unique Email Addresses  //  tag : String

  Every valid email consists of a local name and a domain name, separated by the '@' sign. 
    Besides lowercase letters, the email may contain one or more '.' or '+'.
    For example, in "alice@leetcode.com", "alice" is the local name, and "leetcode.com" is the domain name.
  
  If you add periods '.' between some characters in the local name part of an email address, 
    mail sent there will be forwarded to the same address without dots in the local name. 
    Note that this rule does not apply to domain names.
    For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address.
  
  If you add a plus '+' in the local name, everything after the first plus sign will be ignored. 
    This allows certain emails to be filtered. 
    Note that this rule does not apply to domain names.
    For example, "m.y+name@email.com" will be forwarded to "my@email.com".
  
  It is possible to use both of these rules at the same time.

  Given an array of strings emails where we send one email to each email[i], 
    return the number of different addresses that actually receive mails.


  Constraints:
    1 <= emails.length <= 100
    1 <= emails[i].length <= 100
    email[i] consist of lowercase English letters, '+', '.' and '@'.
    Each emails[i] contains exactly one '@' character.
    All local and domain names are non-empty.
    Local names do not start with a '+' character.

    
  Example 1:
    Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
    Output: 2
    Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.

  Example 2:
    Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
    Output: 3
    
*/

/**
 * @param {string[]} emails
 * @return {number}
 */

// 성공 : 15분 소요
// Runtime: 96 ms
// Memory Usage: 43.8 MB
var numUniqueEmails = function (emails) {
  let map = new Map();

  for (let i = 0; i < emails.length; i++) {
    let splitted = emails[i].split('@');
    let processedLocalName = '';

    for (let j = 0; j < splitted[0].length; j++) {
      let currentChar = splitted[0][j];
      if (currentChar === '+') {
        break;
      } else if (currentChar === '.') {
        continue;
      } else {
        processedLocalName += currentChar;
      }
    }

    splitted[0] = processedLocalName;

    let processedEmail = splitted.join('@');

    if (!map.has(processedEmail)) {
      map.set(processedEmail, true);
    }
  }

  return map.size;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 4 lines 2 solutions

// 1. Add all of filtered email addresses in to the Set => Return a size of the Set.
// set을 활용해서 중복을 삭제하며 빠르게 정리 / 'new Set 안에 배열을 넣어줘서, set 객체를 쉽게 만들 수 있다'
// '+' 기호로 나눈 배열의 첫번째 값(뒤는 안쓰니까)을, split('.').join('')으로 '.' 기호를 제거하는 방식
// 배열에서는 중복값이 있더라도, set에 넣어주며 그 안에서 중복을 제거하게 됨
var numUniqueEmails = (emails) =>
  new Set(
    emails.map((a) => {
      const [local, domain] = a.split('@');
      return `${local.split('+')[0].split('.').join('')}@${domain}`;
    })
  ).size;

// 2. Using regex
// 짧긴 한데, 정규표현식을 사용하는 방법이라 이해되지 않음
var numUniqueEmails = (emails) =>
  new Set(
    emails.map((a) => {
      const [local, domain] = a.split('@');
      return `${local.replace(/\+.*/, '').replace(/\./g, '')}@${domain}`;
    })
  ).size;

// ======================================================================================

// 다른 사람의 코드 : Clean javascript 4 lines solution without Regex
// 짧긴 한데, 정규표현식을 사용하는 방법이라 이해되지 않음
var numUniqueEmails = function (emails) {
  return new Set(
    emails.map((email) => {
      const [local, domain] = email.split('@');
      return local.split('+').shift().split('.').join('') + '@' + domain;
    })
  ).size;
};
