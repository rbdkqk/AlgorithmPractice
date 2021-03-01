/*  0301 Mock Interview : 344. (easy) Reverse String  //  tag : Two Pointers, String

  Write a function that reverses a string. 
    The input string is given as an array of characters `char[]`.

  Do not allocate extra space for another array, 
    you must do this by modifying the input array in-place with O(1) extra memory.

  You may assume all the characters consist of printable ascii characters.


  Example 1:
    Input: ["h","e","l","l","o"]
    Output: ["o","l","l","e","h"]
    
  Example 2:
    Input: ["H","a","n","n","a","h"]
    Output: ["h","a","n","n","a","H"]

*/

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

// 5분 내외 소요
// Runtime: 152 ms
// Memory Usage: 46.3 MB
var reverseString = function (s) {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    [s[start], s[end]] = [s[end], s[start]];
    start++;
    end--;
  }
};

// ======================================================================================

// 다른 사람의 코드 : JS 2 pointer technique 2-liner

// 2 pointer technique with iteration - O(n) / O(1)
var reverseString = (s) => {
  for (let [a, b] = [0, s.length - 1]; a < b; a++, b--) {
    [s[a], s[b]] = [s[b], s[a]];
  }
};

// 2 pointer technique with recursion - O(n) / O(n)
var reverseString = (s) => {
  reverse(0, s.length - 1);

  function reverse(i, j) {
    if (i >= j) return;
    [s[i], s[j]] = [s[j], s[i]];
    reverse(i + 1, j - 1);
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript 2-liner with explanation.  faster 97% less then 88% mem
var reverseString = function (s) {
  for (let i = 0; i < s.length / 2; i++)
    [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
};
