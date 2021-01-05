/*  0105 : 1678. Goal Parser Interpretation (easy)

  You own a Goal Parser that can interpret a string `command`. 
  The `command` consists of an alphabet of "G", "()" and/or "(al)" in some order. 
  The Goal Parser will interpret "G" as the string "G", "()" as the string "o", and "(al)" as the string "al". 
  The interpreted strings are then concatenated in the original order.
  Given the string command, return the Goal Parser's interpretation of command.


  Constraints:
    1 <= command.length <= 100
    command consists of "G", "()", and/or "(al)" in some order.


  Example 1:
    Input: command = "G()(al)"
    Output: "Goal"
    Explanation: The Goal Parser interprets the command as follows:
    G -> G
    () -> o
    (al) -> al
    The final concatenated result is "Goal".

  Example 2:
    Input: command = "G()()()()(al)"
    Output: "Gooooal"

  Example 3:
    Input: command = "(al)G(al)()()G"
    Output: "alGalooG"

*/

/**
 * @param {string} command
 * @return {string}
 */

/*  제출한 답 : ')'일 때 그 앞의 값을 판단하는 방식을 택했는데, 반대로 '('일 때 그 뒤의 값을 판단해도 비슷할 듯

  시간복잡도 : O(n) : command 문자열을 1회 순회함
  공간복잡도 : O(n) : answer라는 1개의 변수에 문자를 계속 붙여나감. command보다는 짧겠지만, command가 길어질수록 answer도 어느정도는 길어진다.

  Runtime: 76 ms, faster than 82.51% of JavaScript online submissions for Goal Parser Interpretation.
  Memory Usage: 39 MB, less than 10.71% of JavaScript online submissions for Goal Parser Interpretation.

*/
var interpret = function (command) {
  let answer = '';

  for (let i = 0; i < command.length; i++) {
    if (command[i] === 'G') {
      answer = answer + 'G';
    }
    if (command[i] === ')') {
      if (command[i - 1] === '(') {
        answer = answer + 'o';
      } else {
        answer = answer + 'al';
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 답 : 코드가 훨씬 단순함
// 처음 split에서 command를 1회 순회하고, join하면서 split의 결과물인 배열을 1회 순회하고,
// join의 결과물인 문자열을 split하면서 1회 순회하고, 다시 split의 결과물인 배열을 join하면서 1회 순회
// 문자열과 배열을 넘나들며 4회 순회하는데, 주어진 문자열을 1회 순회하는 내 코드보다 효율적인지는 의문임.
var interpret = function (command) {
  return command.split('()').join('o').split('(al)').join('al');
};

// ======================================================================================

// 다른 사람의 답 : 정규표현식
var interpret = function (command) {
  return command.replace(/\(al\)/g, 'al').replace(/\(\)/g, 'o');
};
