/*  0316 Mock Interview : 292. (easy) Nim Game  // tag : Brainteaser

  You are playing the following Nim Game with your friend:
    Initially, there is a heap of stones on the table.
    You and your friend will alternate taking turns, and you go first.
    On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
    The one who removes the last stone is the winner.

    Given `n`, the number of stones in the heap, 
      return true if you can win the game assuming both you and your friend play optimally, 
      otherwise return false.


  Constraints:
    1 <= n <= 2^31 - 1


  Example 1:
    Input: n = 4
    Output: false
    Explanation: These are the possible outcomes:
      1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
      2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
      3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
        In all outcomes, your friend wins.

*/

/**
 * @param {number} n
 * @return {boolean}
 */

// 참고한 전략 : https://namu.wiki/w/%EB%B0%B0%EC%8A%A4%ED%82%A8%EB%9D%BC%EB%B9%88%EC%8A%A4(%EA%B2%8C%EC%9E%84)#toc
// 참고한 전략 : https://librewiki.net/wiki/%ED%95%84%EC%8A%B9_%EC%A0%84%EB%9E%B5_%EA%B2%8C%EC%9E%84

// 성공 : 20분 소요 (`Nim Game`의 필승전략을 생각해 내는 것이 이 문제의 핵심인데, 이것을 스스로 하지 못해 아쉬움)
// Runtime: 1308 ms
// Memory Usage: 38.5 MB
var canWinNim = function (n) {
  if (n <= 3) {
    return true;
  } else {
    while (n > 3) {
      n = n - 4;
    }
  }

  return n > 0;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 1-liner with expaination
// Time Complexity: O(1) / Space Complexity: O(1)
// 내 코드도 4씩 빼서 마지막에 남는 값을 체크했으므로, 4로 나눠서 그 나머지를 체크해도 마찬가지라는 점을 ㄴ각하지 못했다
var canWinNim = (n) => {
  return n % 4 !== 0;
};
