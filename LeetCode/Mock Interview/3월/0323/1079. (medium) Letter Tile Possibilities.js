/*  0323 Mock Interview : 1079. (medium) Letter Tile Possibilities  // tag : Backtracking

  You have n `tiles`, where each tile has one letter tiles[i] printed on it.

  Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.


  Constraints:
    1 <= tiles.length <= 7
    tiles consists of uppercase English letters.


  Example 1:
    Input: tiles = "AAB"
    Output: 8
    Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

  Example 2:
    Input: tiles = "AAABBC"
    Output: 188

  Example 3:
    Input: tiles = "V"
    Output: 1

*/

/**
 * @param {string} tiles
 * @return {number}
 */

// 성공 : 40분 소요 - 내 코드는 굉장히 비효율적이다 // 다른 사람들의 코드는 봐도 잘 모르겠음... (순열/조합과 백트래킹에 대해 공부 필요)
// (조합/순열을 구하는 알고리즘에 익숙해질 필요가 있다 : https://jun-choi-4928.medium.com/javascript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-21df4b536349)
// Runtime: 300 ms
// Memory Usage: 59.1 MB
var numTilePossibilities = function (tiles) {
  let answer = 0;

  let splittedTiles = tiles.split('');

  for (let i = 1; i <= splittedTiles.length; i++) {
    let permutationsArray = getAllPermutations(splittedTiles, i);
    let set = new Set(permutationsArray.map((each) => each.join('')));
    answer += set.size;
  }

  return answer;
};

function getAllPermutations(array, count) {
  let result = [];

  if (count === 1) {
    return array.map((char) => [char]);
  } else {
    array.forEach((fixed, index, originArray) => {
      let restArray = [
        ...originArray.slice(0, index),
        ...originArray.slice(index + 1),
      ];

      let permutation = getAllPermutations(restArray, count - 1);

      let attached = [];

      for (let each of permutation) {
        attached.push([fixed, ...each]);
      }

      result.push(...attached);
    });
  }

  return result;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution
/*
  Here we require the count of all possible permutations of a combination. 
  So the idea is to use map to store the count of each letter in the string.
  Then iterate over the key value pairs and for each key in the map if it's value is greater than zero we increment the sum decrement the value. 
  Then we recursively find the combinations of the remaining string and add it to to our sum. 
  After that branch of recursion completes we restore the value (or count) of that key.
*/
var numTilePossibilities = function (tiles) {
  let map = new Map();

  for (let i = 0; i < tiles.length; i++) {
    map.set(tiles[i], (map.get(tiles[i]) || 0) + 1);
  }

  return helper(map);
};

function helper(map) {
  let sum = 0;

  for (let [key, value] of map.entries()) {
    if (value === 0) {
      continue;
    }

    sum++;
    map.set(key, map.get(key) - 1);
    sum += helper(map, sum);
    map.set(key, map.get(key) + 1);
  }

  return sum;
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript Backtracking o(n^2)
var numTilePossibilities = function (tiles) {
  let result = [];
  let current = [];
  let helper = (len, selectedIndex) => {
    if (current.length === len) {
      let cur2str = [...current].join('');
      if (!result.includes(cur2str)) result.push(cur2str);
      return;
    }
    for (let j = 0; j < tiles.length; j++) {
      if (!selectedIndex.includes(j)) {
        current.push(tiles[j]); //A
        helper(len, [...selectedIndex, j]); //[1]
        current.pop();
      }
    }
  };
  for (let len = 1; len <= tiles.length; len++) {
    helper(len, []);
  }
  return result.length;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean Solution With NO HASH-TABLE
var numTilePossibilities = function (tiles) {
  let res = 0;

  function permute(str, opt) {
    res++;

    for (let i = 0; i < opt.length; i++) {
      if (opt[i] === opt[i - 1]) {
        continue;
      }

      permute(str + opt[i], opt.slice(0, i) + opt.slice(i + 1));
    }
  }

  permute('', [...tiles].sort().join(''));

  return res - 1;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
var numTilePossibilities = function (tiles) {
  if (tiles.length === 0) {
    return 0;
  }

  let count = 0;
  const set = new Set();

  // break down tiles and count possible combinations
  for (let i = 0; i < tiles.length; i++) {
    // skip if the tile is visited before for duplicated tiles
    if (set.has(tiles[i])) {
      continue;
    }
    // count all the sub combinations
    count += numTilePossibilities(tiles.slice(0, i) + tiles.slice(i + 1)) + 1;
    set.add(tiles[i]);
  }

  return count;
};
