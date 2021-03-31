/*  0331 Mock Interview : 1237. (medium) Find Positive Integer Solution for a Given Equation  // tag : Math, Binary Search

  Given a callable function f(x, y) with a hidden formula and a value z, reverse engineer the formula and return all positive integer pairs x and y where f(x,y) == z. You may return the pairs in any order.

  While the exact formula is hidden, the function is monotonically increasing, i.e.:
    f(x, y) < f(x + 1, y)
    f(x, y) < f(x, y + 1)

  The function interface is defined like this:
    interface CustomFunction {
    public:
      // Returns some positive integer f(x, y) for two positive integers x and y based on a formula.
      int f(int x, int y);
    };

  We will judge your solution as follows:
    The judge has a list of 9 hidden implementations of CustomFunction, along with a way to generate an answer key of all valid pairs for a specific z.
    The judge will receive two inputs: a function_id (to determine which implementation to test your code with), and the target z.
    The judge will call your findSolution and compare your results with the answer key.
    If your results match the answer key, your solution will be Accepted.


  Constraints:
    1 <= function_id <= 9
    1 <= z <= 100
    It is guaranteed that the solutions of f(x, y) == z will be in the range 1 <= x, y <= 1000.
    It is also guaranteed that f(x, y) will fit in 32 bit signed integer if 1 <= x, y <= 1000.


  Example 1:
    Input: function_id = 1, z = 5
    Output: [[1,4],[2,3],[3,2],[4,1]]
    Explanation: 
      The hidden formula for function_id = 1 is f(x, y) = x + y.
      The following positive integer values of x and y make f(x, y) equal to 5:
      x=1, y=4 -> f(1, 4) = 1 + 4 = 5.
      x=2, y=3 -> f(2, 3) = 2 + 3 = 5.
      x=3, y=2 -> f(3, 2) = 3 + 2 = 5.
      x=4, y=1 -> f(4, 1) = 4 + 1 = 5.

  Example 2:
    Input: function_id = 2, z = 5
    Output: [[1,5],[5,1]]
    Explanation: 
      The hidden formula for function_id = 2 is f(x, y) = x * y.
      The following positive integer values of x and y make f(x, y) equal to 5:
      x=1, y=5 -> f(1, 5) = 1 * 5 = 5.
      x=5, y=1 -> f(5, 1) = 5 * 1 = 5.

*/

/**
 * // This is the CustomFunction's API interface.
 * // You should not implement it, or speculate about its implementation
 * function CustomFunction() {
 *     @param {integer, integer} x, y
 *     @return {integer}
 *     this.f = function(x, y) {
 *         ...
 *     };
 * };
 */

/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */

// 실패 : 문제 자체를 전혀 이해하지 못함 - hidden formula라는데 어떻게 값을 비교하라는 얘기인지 모르겠다
var findSolution = function (customfunction, z) {};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 3 solutions

/*  SOLUTION 1
  It's a brute force solution. We traversal all possible x and y and then get the result.
  But pay attention, the custom function is constantly increasing. So we can break the inner loop when we find an answer.
*/
const findSolution = (f, z) => {
  const ret = [];
  for (let x = 1; x <= 1000; ++x) {
    for (let y = 1; y <= 1000; ++y) {
      if (f.f(x, y) === z) {
        ret.push([x, y]);
        break;
      }
    }
  }
  return ret;
};

/*  SOLUTION 2
  Since it's constantly increasing, so actually it's the same as finding a number in an ordered array.
  So we can use binary search to make it faster. And there are some little optimizations in the code.
*/
const findSolution = (f, z) => {
  const ret = [];
  let max = 1000;
  for (let x = 1; x <= 1000; ++x) {
    if (max === 1) break;
    for (let left = 1, right = max; left < right; ) {
      const mid = Math.floor((right + left) / 2);
      const val = f.f(x, mid);
      if (val === z) {
        ret.push([x, mid]);
        max = mid;
        break;
      }
      val < z ? (left = mid + 1) : ((right = mid), (max = mid));
    }
  }
  return ret;
};

/*  SOLUTION 3
  For both x and y, the custom function is constantly increasing. So we can use the strategy similar to two pointer loop to traversal the possible number.
  It's a more linear way.
*/
const findSolution = (f, z) => {
  const ret = [];
  for (let x = 1, y = 1000; x <= 1000 && y >= 1; ) {
    const val = f.f(x, y);
    val === z && ret.push([x, y]);
    val < z ? ++x : --y;
  }
  return ret;
};

// ======================================================================================

// 다른 사람의 코드 : [javascript] easy solution o(n^2) scaled to o(nlogn) w/ comments

// o(n^2) solution, fastest with given constraints (variables are only within [1,1000]
var findSolution = function (customfunction, z) {
  // list of solutions
  const sol = [];

  // pointer for first variable of function
  let i = 1;
  // the function arguments can only be in range 1 <= i,j <= 1000
  while (i < 1001) {
    // pointer for second variable
    let j = 1;
    // last calculated output (z)
    let last = Number.MIN_SAFE_INTEGER;
    // go until 1000, or until we met z (it will just keep increasing, so stop here)
    while (j < 1001 && last < z) {
      // calculate new 'z'
      last = customfunction.f(i, j);
      // check if matches target
      if (last === z) sol.push([i, j]);
      j++;
    }
    i++;
  }

  return sol;
};

// o(nlogn) binary search solution (would be wayyyy faster with bigger constraints)
var findSolution = function (customfunction, z) {
  // list of solutions
  const sol = [];

  // pointer for first variable of function
  let i = 1;
  // the function arguments can only be in range 1 <= i,j <= 1000
  while (i < 1001) {
    // pointer for second variable
    let j = 1;
    // left and right pointers for binary search
    let lo = 1,
      hi = 1000;

    // go until pointers meet
    while (lo < hi) {
      // get mid point
      const mid = (lo + hi) >> 1;
      // calculate function
      const cur = customfunction.f(i, mid);
      // check if function of mid point is less than z
      if (cur < z) {
        // we need to search right half
        lo = mid + 1;
      } else if (cur > z) {
        // we need to search left half
        hi = mid;
      } else {
        // we found a solution for z
        sol.push([i, mid]);
        break;
      }
    }
    i++;
  }

  return sol;
};

// ======================================================================================

// 다른 사람의 코드 : JS - Simple, Easy 95% faster O(n^2)
var findSolution = function (customfunction, z) {
  var func = customfunction.f,
    result = [];
  for (var i = 1; i <= z; ++i) {
    for (var j = 1; j <= z; ++j) {
      if (func(i, j) === z) {
        result.push([i, j]);
      }
    }
  }
  return result;
};
