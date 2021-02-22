/*  0222 Mock Interview : 509. (easy) Fibonacci Number  //  tag : Array

  The Fibonacci numbers, 
    commonly denoted F(n) form a sequence, called the Fibonacci sequence, 
    such that each number is the sum of the two preceding ones, starting from 0 and 1. 
    
    That is,
      F(0) = 0, F(1) = 1
      F(n) = F(n - 1) + F(n - 2), for n > 1.
  
  Given `n`, calculate `F(n)`.


  Constraints:
    0 <= n <= 30


  Example 1:
    Input: n = 2
    Output: 1
    Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

  Example 2:
    Input: n = 3
    Output: 2
    Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

  Example 3:
    Input: n = 4
    Output: 3
    Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.  

*/

/**
 * @param {number} n
 * @return {number}
 */

/*  내가 작성한 코드 : 복잡도에 관하여 공부 필요

  Time complexity : O(2^N). 
    This is the slowest way to solve the Fibonacci Sequence because it takes exponential time. 
    The amount of operations needed, for each level of recursion, grows exponentially as the depth approaches N.
  Space complexity : O(N). 
    We need space proportionate to N to account for the max size of the stack, in memory. 
    This stack keeps track of the function calls to fib(N). This has the potential to be bad in cases that there isn't enough physical memory to handle the increasingly growing stack, leading to a StackOverflowError. The Java docs have a good explanation of this, describing it as an error that occurs because an application recurses too deeply.

  Runtime: 100 ms, faster than 28.78% of JavaScript online submissions for Fibonacci Number.
  Memory Usage: 38.4 MB, less than 61.15% of JavaScript online submissions for Fibonacci Number.

*/
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fib(n - 1) + fib(n - 2);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript DP O(n) solution
// 시간복잡도가 O(n)이므로, 재귀 방식에 비해 훨씬 유리하다 (공간복잡도도 동일함)
// 왜 이게 배열 문제인지 몰랐는데 이렇게 하는 방법을 처음 알게 됐음 / 그러나, 이게 왜 동적 프로그래밍인지 모르겠음

// solution에서 제시하는 바와 같이 배열을 외부에 생성하고 별도의 함수를 선언해서 이 외부 배열에 접근하면,
// 같은 값으로 다시 실행할 때 매번 새롭게 배열을 만들지 않고도 저장된 값을 즉시 불러올 수 있을 것임(이 때에는 O(1))
var fib = function (N) {
  let memo = new Array(N + 1);
  memo[0] = 0;
  memo[1] = 1;
  for (let i = 2; i <= N; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[N];
};
