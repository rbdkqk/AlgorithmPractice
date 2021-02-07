/*  0207 : 1337. (easy) The K Weakest Rows in a Matrix  //  tag : Array, Binary Search

  Given a `m * n` matrix `mat` of ones (representing soldiers) and `zeros` (representing civilians), 
    return the indexes of the `k` weakest rows in the matrix ordered from the weakest to the strongest.

  A row `i` is weaker than row `j`, if the number of soldiers in row `i` is less than the number of soldiers in row `j`, 
    or they have the same number of soldiers but `i` is less than `j`. 
    
  Soldiers are always stand in the frontier of a row, that is, always ones may appear first and then zeros.


  Constraints:
    m == mat.length
    n == mat[i].length
    2 <= n, m <= 100
    1 <= k <= m
    matrix[i][j] is either 0 or 1.


  Example 1: 
    Input: mat = 
      [[1,1,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,0,0,0],
      [1,1,1,1,1]], 
    k = 3
    Output: [2,0,3]
    Explanation: 
      The number of soldiers for each row is: 
      row 0 -> 2 
      row 1 -> 4 
      row 2 -> 1 
      row 3 -> 2 
      row 4 -> 5 
      Rows ordered from the weakest to the strongest are [2,0,3,1,4]

  Example 2:
    Input: mat = 
      [[1,0,0,0],
      [1,1,1,1],
      [1,0,0,0],
      [1,0,0,0]], 
    k = 2
    Output: [0,2]
    Explanation: 
      The number of soldiers for each row is: 
      row 0 -> 1 
      row 1 -> 4 
      row 2 -> 1 
      row 3 -> 1 
      Rows ordered from the weakest to the strongest are [0,2,3,1]

*/

/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */

/*  내가 작성한 코드  (이진탐색 방법이 아니라 배열 방법이라 좀 그렇다...)

  시간복잡도 : O(5nlogn => nlogn) : map과 reduce에서 n, for 반복문 2회에서 2n, sort()에서 nlogn, slice()에서 n
  공간복잡도 : O(3n => n) : reducedMat / index / answer 3개의 배열이 필요하며, 이는 모두 mat 배열의 길이와 유사하다

  Runtime: 80 ms, faster than 84.42% of JavaScript online submissions for The K Weakest Rows in a Matrix.
  Memory Usage: 40.8 MB, less than 18.09% of JavaScript online submissions for The K Weakest Rows in a Matrix.

*/
var kWeakestRows = function (mat, k) {
  let reducedMat = mat.map((each) => {
    return each.reduce((acc, cur) => {
      return acc + cur;
    });
  });

  let index = [];

  for (let i = 0; i < mat.length; i++) {
    index.push([i, reducedMat[i]]);
  }

  index.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    else if (a[1] > b[1]) return 1;
    else if ((a[1] = b[1])) return 0;
  });

  let answer = [];

  for (el of index) {
    answer.push(el[0]);
  }

  return answer.slice(0, k);
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 3 solutions

// SOLUTION 1 : We do counting and sorting straight forward.
const kWeakestRows = (mat, k) => {
  const m = mat.length;
  const n = mat[0].length;
  const ret = [];
  for (let i = 0; i < m; ++i) {
    let cur = 0;
    for (let j = 0; j < n; ++j, ++cur) {
      if (mat[i][j] === 0) break;
    }
    ret.push([cur, i]);
  }
  return ret
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
    .slice(0, k)
    .map((item) => item[1]);
};

// SOLUTION 2 : We use binary search to optimize solution 1.
const kWeakestRows = (mat, k) => {
  const m = mat.length;
  const n = mat[0].length;
  const rows = [];
  const ret = new Uint8Array(k);

  for (let i = 0; i < m; ++i) {
    rows.push([search(mat[i], 0, n), i]);
  }
  rows.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  for (let i = 0; i < k; ++i) {
    ret[i] = rows[i][1];
  }
  return ret;

  function search(arr, left, right) {
    if (left === right) return left;
    const mid = Math.floor((left + right) / 2);
    return arr[mid] === 0
      ? search(arr, left, mid)
      : search(arr, mid + 1, right);
  }
};

// SOLUTION 3 : We traversal the matrix by column with a set to check visited.
const kWeakestRows = (mat, k) => {
  const m = mat.length;
  const n = mat[0].length;
  const ret = new Uint8Array(k);
  const visited = new Uint8Array(m);
  let idx = 0;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (visited[j] === 0 && mat[j][i] === 0) {
        ret[idx] = j;
        visited[j] = 1;
        if (++idx === k) return ret;
      }
    }
  }
  for (let i = 0; i < m; ++i) {
    if (visited[i] === 0) {
      ret[idx] = i;
      if (++idx === k) return ret;
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Simple solution
function kWeakestRows(mat, k) {
  return mat
    .map((row, index) => [index, row.filter((n) => n === 1).length])
    .sort(([i1, c1], [i2, c2]) => c1 - c2 || i1 - i2)
    .map(([index]) => index)
    .slice(0, k);
}

// ======================================================================================

// 다른 사람의 코드 : Javascript es6 one line
var kWeakestRows = function (mat, k) {
  return (
    mat
      .map((e, i) => [i, e.reduce((acc, cur) => acc + cur, 0)])
      //turn the array into [index, sum of soilders] form
      .sort((a, b) => (a[1] == b[1] ? a[0] - b[0] : a[1] - b[1]))
      //sort the array: if the number of soilders is equal then sort with the index of the row
      .map((x) => x[0])
      //take of the row index of the sorted result
      .slice(0, k)
  );
  //slice the result according to k number
};

// ======================================================================================

// 다른 사람의 코드 : one line super easy code
function kWeakestRows(mat, k) {
  return mat
    .map((r, i) => ({
      solders: r.indexOf(0) === -1 ? Number.MAX_SAFE_INTEGER : r.indexOf(0) + 1,
      i,
    }))
    .sort((a, b) => a.solders - b.solders)
    .map((d) => d.i)
    .slice(0, k);
}

// ======================================================================================

// 다른 사람의 코드 : Javascript 92% 100% Binary Search Hashmap
var kWeakestRows = function (mat, k) {
  const res = [];
  const map = {};
  for (let i = 0; i < mat.length; i++) {
    const row = mat[i];
    map[`${i}`] = findPeak(row);
  }
  return Object.keys(map)
    .sort((a, b) => {
      if (map[a] == map[b]) {
        //if values are the same, sort on index
        return a - b;
      } else {
        return map[a] - map[b]; //sort by value
      }
    })
    .splice(0, k); //splice the array till the k
};

function findPeak(arr) {
  let l = 0;
  let r = arr.length - 1;
  let mid;
  while (l <= r) {
    mid = Math.floor((r + l) / 2);
    if (arr[mid] === 1) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return l;
}
