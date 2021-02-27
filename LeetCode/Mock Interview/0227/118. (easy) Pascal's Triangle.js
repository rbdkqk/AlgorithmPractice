/*  0227 Mock Interview : 118. (easy) Pascal's Triangle  //  tag : Array

  Given an integer `numRows`, return the first numRows of 'Pascal's triangle'.

  In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


  Constraints:
    1 <= prices.length <= 10^5
    0 <= prices[i] <= 10^4


  Example 1:
    Input: numRows = 5
    Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

  Example 2:
    Input: numRows = 1
    Output: [[1]]

*/

/**
 * @param {number} numRows
 * @return {number[][]}
 */

// 15분 정도 소요됨

/*  내가 작성한 코드
  
  시간복잡도 : O(n^2) : i번째 innerArray를 만들면서, i가 커질수록 innerArray의 길이 역시 길어지고 반복문 처리 역시 길어지게 됨
  공간복잡도 : O(n^2) : n이 커질수록, answer 배열의 길이 및 그 요소인 innerArray 배열의 길이 역시 지속적으로 길어진다

  Runtime: 72 ms, faster than 90.65% of JavaScript online submissions for Pascal's Triangle.
  Memory Usage: 38.4 MB, less than 63.50% of JavaScript online submissions for Pascal's Triangle.

*/
var generate = function (numRows) {
  let answer = [];

  for (let i = 0; i < numRows; i++) {
    let innerArray = new Array(i + 1);

    innerArray[0] = 1;
    innerArray[innerArray.length - 1] = 1;

    if (i > 1) {
      for (let j = 1; j < innerArray.length - 1; j++) {
        innerArray[j] = answer[i - 1][j - 1] + answer[i - 1][j];
      }
    }

    answer.push(innerArray);
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript: intuitive simple solution 99.49% faster(40ms) 100% space, easy to understand
// 컨셉은 비슷해 보이는데, 이 코드가 더 깔끔해 보임
var generate = function (numRows) {
  var pascal = [];
  for (var i = 0; i < numRows; i++) {
    pascal[i] = [];
    pascal[i][0] = 1;
    for (var j = 1; j < i; j++) {
      pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
    }
    pascal[i][i] = 1;
  }
  return pascal;
};
