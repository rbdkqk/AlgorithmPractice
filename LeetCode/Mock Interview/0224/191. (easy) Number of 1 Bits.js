/*  0224 Mock Interview : 191. (easy) Number of 1 Bits  //  tag : Tree, Depth-first Search

  Write a function that takes an unsigned integer 
    and returns the number of '1' bits it has (also known as the Hamming weight).

  Note that in some languages such as Java, there is no unsigned integer type. 
    In this case, the input will be given as a signed integer type. 
    It should not affect your implementation, as the integer's internal binary representation is the same, 
      whether it is signed or unsigned.

  In Java, the compiler represents the signed integers using 2's complement notation. 
    Therefore, in Example 3, the input represents the signed integer. -3.


  Constraints:
    The input must be a binary string of length 32


  Example 1:
    Input: n = 00000000000000000000000000001011
    Output: 3
    Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.

  Example 2:
    Input: n = 00000000000000000000000010000000
    Output: 1
    Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.

  Example 3:
    Input: n = 11111111111111111111111111111101
    Output: 31
    Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.

*/

/**
 * @param {number} n - a positive integer
 * @return {number}
 */

/*  내가 작성한 코드 : 
  (문제를 정확히 이해하지 못한 상태에서 풀었음)
  (내 생각 : '1이 몇개인지 구하라는 문제인가?' / '문자열로 바꾸고 반복문 돌리면 답은 나오겠지만 느리지 않을까?')
  ('Hamming weight'가 뭘까?)
  (참고 : https://stackoverflow.com/questions/24506555/how-to-find-the-number-of-1s-in-a-binary-representation-of-a-number)

  시간복잡도 : O(n) : toString의 결과물을 split하는 과정에서, 이 문자열을 순회해야 함
  공간복잡도 : O(n) : n이 커질수록 split한 배열도 길어진다(?)

  Runtime: 100 ms
  Memory Usage: 40.1 MB

*/
var hammingWeight = function (n) {
  return n.toString(2).split('1').length - 1;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
// 비트 연산자를 활용한 방법이라 이해는 잘 되지 않았음
var hammingWeight = function (n) {
  let sum = 0;

  while (n != 0) {
    sum += n & 1;
    n = n >>> 1;
  }

  return sum;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
// 이 방법은 내가 제출한 코드와 형태가 비슷하나, 정규표현식이 들어가서 이해하기 어려움
var hammingWeight = function (n) {
  // remove 0s from base2 representation of the number
  return n.toString(2).replace(/0/g, '').length;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Dropping the Least Significant Bit (LSB)
// 이 방법도 비트 연산자라 잘 모르겠음
// 비트 연산자 '&' : 비교하는 비트가 모두 1이면 1 반환(AND)
const hammingWeight = (n) => {
  let count = 0;

  while (n !== 0) {
    count++;
    n = n & (n - 1);
  }

  return count;
};
