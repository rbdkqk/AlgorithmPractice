/*  0319 Mock Interview : 1025. (easy) Divisor Game  // tag : Math, Dynamic Programming

  Alice and Bob take turns playing a game, with Alice starting first.

  Initially, there is a number N on the chalkboard.  
  
  On each player's turn, that player makes a move consisting of:
    - Choosing any x with 0 < x < N and N % x == 0.
    - Replacing the number N on the chalkboard with N - x.

  Also, if a player cannot make a move, they lose the game.

  Return True if and only if Alice wins the game, assuming both players play optimally.


  Note:
    1 <= N <= 1000


  Example 1:
    Input: 2
    Output: true
    Explanation: Alice chooses 1, and Bob has no more moves.

  Example 2:
    Input: 3
    Output: false
    Explanation: Alice chooses 1, Bob chooses 1, and Alice has no more moves.

*/

/**
 * @param {number} N
 * @return {boolean}
 */

// 접근법을 찾지 못해서, 아래 링크 참고함 (정답을 스스로 생각하지 못해 아쉽다.)
// 참고 : https://programmersought.com/article/42801991236/

// If N is odd, is because all factors odd odd, therefore once the operation result N x N must be an even number,
// so if a get an odd number, then when the turn b, b certainly get an even number,
// the b - 1 as long as the time, gave a an odd number, then this will have to get an even number of sub b,
// b will finally get to the minimum even number 2, a lose.

// So if Alice get N is an odd beginning of the game, then she will lose, that is false.
// If N is even get, she only by -1, so to get odd bob, finally losing bob, the result is true.

// 내가 이해한 내용 : 항상 홀수를 넘겨주면 이긴다 (즉, 내가 처음에 짝수여야 한다)
// 이기는 케이스 : 100 => 75 => 72 => 63 => 56 => 49 => 42 => 35 => 28 => 21 => 14 => 7 (Bob이 마지막에 7을 받게 되고, 7은 소수이므로 더이상 진행 불가)
// 지는 케이스 : 39 => 26 => 13 (Alice가 마지막에 13을 받게 되고, 13은 소수이므로 더이상 진행 불가)
// 지는 케이스 : 99 => 66 => 33 => 22 => 11 (Alice가 마지막에 11을 받게 되고, 11은 소수이므로 더이상 진행 불가)
var divisorGame = function (N) {
  return N % 2 === 0;
};

// ======================================================================================

// 다른 사람의 코드 : JS simple explanation
/*  위 방법과 같은 코드인데, 설명이 붙어서 첨부함
  First of all, we could assume that there are two base cases: N=3 and N=2;
    If Alice gets 2, she wins; else she loses. The problem is how to get to N=2 to win.

  We know that if a number is odd, it only has common divisors that are also odd. e.g. 21=3x7, 27=3x9, and we know that for odd numbers, adding two odd numbers or substracting an odd number from another one, we'd always end up with an even number.

  In this case (an odd number is given), no matter what we do, we'd always give the opponent an even number. So that we'd eventually lose, because our opponent could choose to subtract an odd number from that even number to give us the odd number again. Endless bad loop.

  Therefore if we get an odd number to start with, no matter what we choose, we'd always end up with base case N=3.

  So to get our opponent (in this case Bob) to have an odd number, we have to have an even number to start with so that we could choose x=1 to force the opponent into dealing with an odd number.

  e.g.
    if N equals 16, Alice could choose x=1 and force Bob into dealing with 16-1=15.
    The logic behind is dynamic programming, this problem got lucky that we don't have other cases to consider.
*/
var divisorGame = function (N) {
  return N % 2 === 0;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Dynamic programming with comments
var divisorGame = function (N) {
  let winArray = new Array(N + 1).fill(false);
  /** This array represents whether a person will win or not with this current value
   */

  for (let i = 1; i <= N; i++) {
    for (let x = 1; x <= i / 2; x++) {
      if (i % x === 0 && winArray[i - x] === false) {
        /** Here we check if the current x is the divisor or not
         * also if current turn is of Alice and [i - x] would be the
         * the turn of Bob and that has to be false for Alice to win
         */
        winArray[i] = true;
        break;
      }
    }
  }
  return winArray[N];
};
