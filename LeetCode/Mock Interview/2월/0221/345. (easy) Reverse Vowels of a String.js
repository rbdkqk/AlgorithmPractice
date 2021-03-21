/*  0221 Mock Interview : 345. (easy) Reverse Vowels of a String  //  tag : Two Pointers, String

  Write a function that takes a string as input 
    and reverse only the vowels of a string.


  Constraints:
    The vowels does not include the letter "y".


  Example 1:
    Input: "hello"
    Output: "holle"

  Example 2:
    Input: "leetcode"
    Output: "leotcede"

*/

/**
 * @param {string} s
 * @return {string}
 */

/*  내가 작성한 코드

  시간복잡도 : O(4n => n) : split에서 n, for 반복문 2회에서 2n, join에서 n
  공간복잡도 : O(2n => n) : stringVowels 배열과 stringArray 배열은 s 문자열에 따라 크기가 달라짐

  Runtime: 104 ms, faster than 63.16% of JavaScript online submissions for Reverse Vowels of a String.
  Memory Usage: 44.6 MB, less than 65.23% of JavaScript online submissions for Reverse Vowels of a String.

*/
var reverseVowels = function (s) {
  let vowels = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
    A: true,
    E: true,
    I: true,
    O: true,
    U: true,
  };

  let stringVowels = [];

  let stringArray = s.split('');

  for (let i = 0; i < stringArray.length; i++) {
    if (vowels[stringArray[i]]) {
      stringVowels.push(stringArray[i]);
      stringArray[i] = false;
    }
  }

  for (let i = 0; i < stringArray.length; i++) {
    if (!stringArray[i]) {
      stringArray[i] = stringVowels.pop();
    }
  }

  return stringArray.join('');
};

// ======================================================================================

// 다른 사람의 코드 : 2-line JavaScript O(n) solution using stack and regex
// (정규표현식 코드는 생략했음)
// The standard solution for comparison:
var reverseVowels = function (s) {
  const VOWELS = { a: 1, e: 1, i: 1, o: 1, u: 1, A: 1, E: 1, I: 1, O: 1, U: 1 };
  const arr = s.split('');
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    if (VOWELS[arr[i]] && VOWELS[arr[j]]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    } else if (VOWELS[arr[i]]) {
      j--;
    } else {
      i++;
    }
  }
  return arr.join('');
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution with a stack
// 첫번째 for반복문에서, indexOf를 해 줄 때 시간복잡도에서 불리할 것 같다 : vowels 배열을 객체로 선언해 주는 편이 유리해 보임
// 그 외에는 내 코드와 비슷한 것 같음
var reverseVowels = function (s) {
  let vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'];
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (vowels.indexOf(s[i]) !== -1) {
      stack.push(s[i]);
    }
  }
  let ans = [];
  for (let i = 0; i < s.length; i++) {
    if (vowels.indexOf(s[i]) !== -1) {
      ans.push(stack.pop());
    } else {
      ans.push(s[i]);
    }
  }
  return ans.join('');
};

// ======================================================================================

// 다른 사람의 코드 : Creative JavaScript Solution
// let vowels = new Set('aeiouAEIOU'); => new Set() 문법을 이렇게 활용할 수 있는지 몰랐음
var reverseVowels = function (s) {
  let letters = s.split('');
  let vowels = new Set('aeiouAEIOU');

  let vowels2rev = [];
  let vIdx = [];

  for (let i = 0; i < letters.length; i++) {
    if (vowels.has(letters[i])) {
      vowels2rev.push(letters[i]);
      vIdx.push(i);
    }
  }

  vowels2rev.reverse();

  for (let i = 0; i < vIdx.length; i++) {
    letters[vIdx[i]] = vowels2rev[i];
  }

  return letters.join('');
};
