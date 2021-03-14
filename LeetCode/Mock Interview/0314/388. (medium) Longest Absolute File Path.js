/*  0314 Mock Interview : 388. (medium) Longest Absolute File Path  // tag : ???

  Suppose we have a file system that stores both files and directories. 
  
  An example of one system is represented in the following picture:

  Here, we have dir as the only directory in the root. dir contains two subdirectories, subdir1 and subdir2. 
    subdir1 contains a file file1.ext and subdirectory subsubdir1. 
    subdir2 contains a subdirectory subsubdir2, which contains a file file2.ext.

  In text form, it looks like this (with ⟶ representing the tab character):
    dir
    ⟶ subdir1
    ⟶ ⟶ file1.ext
    ⟶ ⟶ subsubdir1
    ⟶ subdir2
    ⟶ ⟶ subsubdir2
    ⟶ ⟶ ⟶ file2.ext

  If we were to write this representation in code, it will look like this: 
    "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext". 
    
  Note that the '\n' and '\t' are the new-line and tab characters.

  Every file and directory has a unique absolute path in the file system, 
    which is the order of directories that must be opened to reach the file/directory itself, all concatenated by '/'s. 
    
  Using the above example, the absolute path to file2.ext is "dir/subdir2/subsubdir2/file2.ext". 
  
  Each directory name consists of letters, digits, and/or spaces. 
  
  Each file name is of the form name.extension, where name and extension consist of letters, digits, and/or spaces.

  Given a string input representing the file system in the explained format, 
    return the length of the longest absolute path to a file in the abstracted file system. 
    If there is no file in the system, return 0.


  Constraints:
    1 <= input.length <= 104
    input may contain lowercase or uppercase English letters, a new line character '\n', a tab character '\t', a dot '.', a space ' ', and digits.


  Example 1:
    Input: input = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
    Output: 20
    Explanation: We have only one file, and the absolute path is "dir/subdir2/file.ext" of length 20.

  Example 2:
    Input: input = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"
    Output: 32
    Explanation: We have two files:
    "dir/subdir1/file1.ext" of length 21
    "dir/subdir2/subsubdir2/file2.ext" of length 32.
    We return 32 since it is the longest absolute path to a file.

  Example 3:
    Input: input = "a"
    Output: 0
    Explanation: We do not have any files, just a single directory named "a".

  Example 4:
    Input: input = "file1.txt\nfile2.txt\nlongfile.txt"
    Output: 12
    Explanation: There are 3 files at the root directory.
    Since the absolute path for anything at the root directory is just the name itself, the answer is "longfile.txt" with length 12.

*/

/**
 * @param {string} input
 * @return {number}
 */

// 실패 : 시도도 해 보지 못함 - 깊이우선탐색? 재귀? 뭐 이런 방식을 택해야 하는 것 같다 - 다른 사람의 코드를 보니 그렇지는 않은 듯
var lengthLongestPath = function (input) {};

// ======================================================================================

// 다른 사람의 코드 : Short JavaScript Solution: O(n) | O(n)
// `local` has the length of the strings. Which is based on the current path length + the past one.
// We only compare it to `max` when there's a file extension.
function lengthLongestPath(input) {
  let max = 0;
  let local = [];

  for (let line of input.split('\n')) {
    const depth = [...line].lastIndexOf('\t') + 1;

    local[depth] = (local[depth - 1] || 0) + line.length - depth;

    if (line.indexOf('.') > -1) {
      max = Math.max(max, local[depth] + depth);
    }
  }

  return max;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution
// I think this quesiton has one of worst, if not the worst, test sets across leetcode.
// The idea :
// The only things we care about are the depth/level of the current dir, and the length for current dir/file,
// we can store these information as an array
// The depth can be calculated by counting '\t' in the currendir/file
var lengthLongestPath = function (input) {
  let dir = input.split('\n');
  let max = 0;
  let length = [];
  let depth = 0;

  for (let i = 0; i < dir.length; i++) {
    depth = dir[i].lastIndexOf('\t') + 1;

    if (dir[i].includes('.')) {
      let fileLength = dir[i].length - depth;
      max = Math.max((length[depth - 1] + 1 || 0) + fileLength, max);
    } else {
      length[depth] = dir[i].length - depth + (length[depth - 1] + 1 || 0);
    }
  }

  return max;
};
