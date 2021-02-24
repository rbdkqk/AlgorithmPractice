/*  0108 : 1342. Number of Steps to Reduce a Number to Zero (easy)  //  tag : Bit Manipulation

  Given a non-negative integer `num`, return the number of steps to reduce it to zero. 
  If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.


  Constraints:
    0 <= num <= 10^6


  Example 1:

    Input: num = 14
    Output: 6
    Explanation: 
      Step 1) 14 is even; divide by 2 and obtain 7. 
      Step 2) 7 is odd; subtract 1 and obtain 6.
      Step 3) 6 is even; divide by 2 and obtain 3. 
      Step 4) 3 is odd; subtract 1 and obtain 2. 
      Step 5) 2 is even; divide by 2 and obtain 1. 
      Step 6) 1 is odd; subtract 1 and obtain 0.

  Example 2:

    Input: num = 8
    Output: 4
    Explanation: 
      Step 1) 8 is even; divide by 2 and obtain 4. 
      Step 2) 4 is even; divide by 2 and obtain 2. 
      Step 3) 2 is even; divide by 2 and obtain 1. 
      Step 4) 1 is odd; subtract 1 and obtain 0.

  Example 3:

    Input: num = 123
    Output: 12

*/

/**
 * @param {number} num
 * @return {number}
 */

/*  내가 제출한 답

  시간복잡도 : O(logn) : 2씩 나눠서 줄여 나가고 있으므로 (1씩 빼는 연산 역시 포함되어 있긴 함)
  공간복잡도 : O(1) : answer 변수와 newNum 변수에 값을 누적시키고 있다

  Runtime: 132 ms, faster than 5.52% of JavaScript online submissions for Number of Steps to Reduce a Number to Zero.
  Memory Usage: 38.9 MB, less than 18.07% of JavaScript online submissions for Number of Steps to Reduce a Number to Zero.

*/

var numberOfSteps = function (num) {
  let answer = 0;
  let newNum = num;
  while (newNum > 0) {
    if (newNum % 2 === 1) {
      newNum--;
    } else {
      newNum /= 2;
    }
    answer++;
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 방법 : 재귀 사용
// 댓글 : `and more simple solution` 이라면서 나와 유사한 방식으로 처리한 코드 있음
// 댓글 : 아래 답보다 더 정리된 코드라면서 아래 코드를 남김
/*
    return num % 2
      ? numberOfSteps(--num, ++count)
      : numberOfSteps(num / 2, ++count);
*/

var numberOfSteps = function (num, count = 0) {
  if (num === 0) return count;
  return num % 2 === 0
    ? numberOfSteps(num / 2, count + 1)
    : numberOfSteps(num - 1, count + 1);
};
