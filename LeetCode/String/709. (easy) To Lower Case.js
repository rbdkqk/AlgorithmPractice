/*  0404 : 709. (easy) To Lower Case  //  tag : String

  Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.


  Constraints:
    1 <= s.length <= 10^5
    s[i] is a printable ascii character.


  Follow up:
    Do not allocate extra space for another array. 
    You must do this by modifying the input array in-place with O(1) extra memory.


  Example 1:
    Input: "Hello"
    Output: "hello"

  Example 2:
    Input: "here"
    Output: "here"

  Example 3:
    Input: "LOVELY"
    Output: "lovely"

*/

/**
 * @param {string} str
 * @return {string}
 */

// 성공 : `toLowerCase()` 메소드를 활용해서 답은 냈는데, 사실은 `toLowerCase()` 메소드를 활용하지 말고 직접 구현하라는 뜻이 아닐까 함
// Runtime: 84 ms, faster than 10.53% of JavaScript online submissions for To Lower Case.
// Memory Usage: 38.3 MB, less than 65.56% of JavaScript online submissions for To Lower Case.
var toLowerCase = function (str) {
  return str.toLowerCase();
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
/*  `charCodeAt()`
  charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환합니다.
  매개변수 index : 0 이상이고 문자열의 길이보다 작은 정수. 숫자가 아니라면 0을 기본값으로 사용함. 
*/
var toLowerCase = function (str) {
  let lowerCase = '';

  for (let letter of str) {
    const index = letter.charCodeAt(0);
    if (index >= 65 && index <= 90) {
      letter = String.fromCharCode(index + 32);
    }

    lowerCase += letter;
  }

  return lowerCase;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution
var toLowerCase = function (str) {
  let res = '';

  for (let i = 0; i < str.length; i++) {
    let ascii = str.charCodeAt(i);

    // The ascii value from 65 to 90 represent the uppercase alphabet A to Z.
    // While, the ascii value from 97 to 122 represent the lowercase alphabet a to z.
    // By adding 32 to the ascii value, we are converting it to lowercase.
    if (ascii >= 65 && ascii <= 90) res += String.fromCharCode(ascii + 32);
    else res += str.charAt(i);
  }

  return res;
};
