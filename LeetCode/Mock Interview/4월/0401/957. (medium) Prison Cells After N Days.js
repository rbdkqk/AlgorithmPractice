/*  0401 Mock Interview : 957. (medium) Prison Cells After N Days  // tag : Hash Table

  There are 8 prison cells in a row and each cell is either occupied or vacant.

  Each day, whether the cell is occupied or vacant changes according to the following rules:
    - If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied.
    - Otherwise, it becomes vacant.

  Note that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.

  You are given an integer array `cells` where `cells[i] == 1` if the ith cell is occupied and `cells[i] == 0` if the ith cell is vacant, 
    and you are given an integer `n`.

  Return the state of the prison after n days (i.e., n such changes described above).


  Constraints:
    cells.length == 8
    cells[i] is either 0 or 1.
    1 <= n <= 10^9


  Example 1:
    Input: cells = [0,1,0,1,1,0,0,1], n = 7
    Output: [0,0,1,1,0,0,0,0]
    Explanation: The following table summarizes the state of the prison on each day:
      Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
      Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
      Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
      Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
      Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
      Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
      Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
      Day 7: [0, 0, 1, 1, 0, 0, 0, 0]

  Example 2:
    Input: cells = [1,0,0,1,0,0,1,0], n = 1000000000
    Output: [0,0,1,1,1,1,1,0]

*/

/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */

// 0401 Mock Interview

// 성공 : 40분 소요 (helper 함수를 정확히 짜지 못해서 시간이 꽤 걸림 - 1~7까지의 각 결과깂이 8~14까지는 뒤집혀서 나오고, 이 14개가 반복된다는 점을 이용해서 Time Limit Exceeded 에러를 피함)
// Runtime: 88 ms
// Memory Usage: 39.9 MB
var prisonAfterNDays = function (cells, n) {
  let map = new Map();

  for (let i = 1; i <= 7; i++) {
    cells = getNextPrisonState(cells);
    map.set(i, cells);

    if (n === i) {
      return map.get(n);
    }
  }

  for (let j = 8; j <= 14; j++) {
    map.set(
      j,
      map
        .get(j - 7)
        .slice()
        .reverse()
    );

    if (n === j) {
      return map.get(n);
    }
  }

  map.set(0, map.get(14));

  let index = n % 14;

  return map.get(index);
};

function getNextPrisonState(prison) {
  let answer = [];

  for (let i = 0; i < prison.length; i++) {
    if (i === 0 || i === prison.length - 1) {
      answer.push(0);
    } else if (
      (prison[i - 1] === 0 && prison[i + 1] === 0) ||
      (prison[i - 1] === 1 && prison[i + 1] === 1)
    ) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }

  return answer;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution w/ Explanation
/*  The idea :
  Convert array to string for easier look up
  A nextDay function returns the next arrangement
  Keep a hashtable of history arrangements, if a new arrangement is seen in the history, that means we have found a cycle
  Use % to calculate how many extra moves do we still need after the cycle point
*/
var prisonAfterNDays = function (cells, N) {
  let prison = [...cells].join('');
  let history = [];

  while (N--) {
    prison = nextDay(prison);
    let lookUp = history.indexOf(prison); // cycle found, get the cycle position

    if (lookUp != -1) {
      let mod = N % (history.length - lookUp); // check how many extra moves after the cycle
      return history[lookUp + mod].split('');
    }

    history.push(prison);
  }

  return prison.split('');
};

let nextDay = function (cellsString) {
  let newPrison = '';

  for (let i = 0; i < cellsString.length; i++) {
    if (cellsString[i - 1] == cellsString[i + 1]) {
      newPrison += '1';
    } else {
      newPrison += '0';
    }
  }

  return newPrison;
};

// ======================================================================================

// 다른 사람의 코드 : The shortest javascript solution
// `~~ 연산자` : Math.floor() 와 동등하게 쓰이는 연산자. ('숫자의 소수점 뒤 자리들을 버린다')
var prisonAfterNDays = function (cells, N) {
  N = N % 14 || 14;

  while (N--) {
    const prev = [...cells];
    for (let i = 0; i < 8; i++) {
      cells[i] = ~~(prev[i - 1] === prev[i + 1]);
    }
  }

  return cells;
};

// ======================================================================================

// 다른 사람의 코드 : Simple Javascript solution
var prisonAfterNDays = function (cells, N) {
  let copy = cells.slice();
  let maxIter = 2 * cells.length - 2;
  N = N % maxIter === 0 ? maxIter : N % maxIter;
  while (N-- > 0) {
    for (let i = 0; i < cells.length; i++) {
      copy[i] = cells[i - 1] === cells[i + 1] ? 1 : 0;
    }
    cells = copy.slice();
  }
  return cells;
};
