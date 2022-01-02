/*  220102 : 14. Longest Common Prefix  //  tag : String(?)

  Write a function to find the longest common prefix string amongst an array of strings.
  If there is no common prefix, return an empty string "".

  Example 1:
    Input: strs = ["flower","flow","flight"]
    Output: "fl"
  
  Example 2:
    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.
  
  Constraints:
    1 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] consists of only lower-case English letters.

*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs === undefined || strs.length === 0) {
    return '';
  }

  return strs.reduce((prev, next) => {
    let i = 0;

    while (prev[i] && next[i] && prev[i] === next[i]) {
      i++;
    }

    return prev.slice(0, i);
  });
};
