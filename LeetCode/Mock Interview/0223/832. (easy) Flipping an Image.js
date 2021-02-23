/*  0223 Mock Interview : 832. (easy) Flipping an Image  //  tag : Array

  Given a binary `matrix A`, we want to flip the image horizontally, 
    then invert it, and return the resulting image.

  To `flip an image horizontally` means that each row of the image is reversed.  
    For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

  To `invert an image` means that each 0 is replaced by 1, and each 1 is replaced by 0. 
    For example, inverting [0, 1, 1] results in [1, 0, 0].


  Constraints:
    1 <= A.length = A[0].length <= 20
    0 <= A[i][j] <= 1


  Example 1:
    Input: [[1,1,0],[1,0,1],[0,0,0]]
    Output: [[1,0,0],[0,1,0],[1,1,1]]
    Explanation: 
      First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
      Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]

  Example 2:
    Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
    Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
    Explanation: 
      First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
      Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]

*/

/**
 * @param {number[][]} A
 * @return {number[][]}
 */

/*  성공 : 10분 정도 소요됨 (내가 너무 어렵게 접근한 것 같다)

  시간복잡도 : O(n) : A 배열을 1회 순회하면서, index에 해당하는 각 값에 직접 접근하여 이를 교환하고 있음
  공간복잡도 : O(n) : A 배열이 길어질수록 innerArray 역시 커진다? (또는, 별도 배열을 선언하지 않았으니 O(1)인가?)

  Runtime: 84 ms, faster than 80.77% of JavaScript online submissions for Flipping an Image.
  Memory Usage: 40.5 MB, less than 52.01% of JavaScript online submissions for Flipping an Image.

*/
var flipAndInvertImage = function (A) {
  for (let innerArray of A) {
    let start = 0;
    let end = innerArray.length - 1;
    for (let i = 0; i < innerArray.length / 2; i++) {
      let startValue = innerArray[start];
      let endValue = innerArray[end];

      startValue === 0 ? (startValue = 1) : (startValue = 0);
      endValue === 0 ? (endValue = 1) : (endValue = 0);

      [innerArray[start], innerArray[end]] = [endValue, startValue];

      start++;
      end--;
    }
  }

  return A;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript, Beats 93%, 1 line
// `b ^ 1` 부분이 잘 이해되지 않음 - `0^1 : 1` / `1^1 : 0` 이런 결과가 나오는데?
// 결론 : `^` 기호는 제곱이라는 뜻이 아니고, 비트연산자 중 하나임
// 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
var flipAndInvertImage = function (A) {
  return A.map((a) => {
    return a.reverse().map((b) => b ^ 1);
  });
};

// ======================================================================================

// 다른 사람의 코드 : Simple Javascript Solution
// `1 - x` 방식이 더 쉽게 이해됐음
var flipAndInvertImage = function (A) {
  for (let row in A) {
    A[row] = A[row].reverse();
    A[row] = A[row].map((x) => 1 - x);
  }
  return A;
};
