/*  0111 : 1207. Unique Number of Occurrences (easy)

  Given an array of integers `arr`, write a function 
    that returns `true` if and only 
      if the number of occurrences of each value in the array is unique.


  Constraints:
    1 <= arr.length <= 1000
    -1000 <= arr[i] <= 1000


  Example 1:
    Input: arr = [1,2,2,1,1,3]
    Output: true
    Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. 
      No two values have the same number of occurrences.

  Example 2:      
    Input: arr = [1,2]
    Output: false

  Example 2: 
    Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
    Output: true

*/

/**
 * @param {number[]} arr
 * @return {boolean}
 */

/*  내가 제출한 답 1 : 효율이 별로임

  시간복잡도 : O(3n) => O(n) : arr 배열을 1회 순회하면서 hash 객체를 만들게 됨 + valuesOfHash 만들때랑 new Set 과정에서 한번씩 더 순회할 듯
  공간복잡도 : O(3n) -> O(n) : hash 객체, valuesOfHash 배열, setOfHash set객체 모두, arr 배열과 같은 길이일 것임 

  Runtime: 84 ms, faster than 38.56% of JavaScript online submissions for Unique Number of Occurrences.
  Memory Usage: 40.7 MB, less than 12.85% of JavaScript online submissions for Unique Number of Occurrences.

*/

var uniqueOccurrences = function (arr) {
  let hash = {};
  debugger;
  for (let el of arr) {
    hash[el] === undefined ? (hash[el] = 1) : hash[el]++;
  }

  let valuesOfHash = Object.values(hash);
  let setOfHash = new Set(valuesOfHash);
  console.log(typeof valuesOfHash.length);
  console.log(typeof setOfHash.size);

  if (valuesOfHash.length === setOfHash.size) {
    return true;
  }
  return false;
};

// ======================================================================================

// 다른 사람의 방법 : O(n)
// map과 set을 활용한 방법임 : 내 코드보다 효율이 좋을 것

var uniqueOccurrences = function (arr) {
  // Let's make a map to keep track of how many times each number occurs in our array
  let myMap = new Map();

  //For every number in our array using the for-of loop
  for (let num of arr) {
    //If we have the key already, we know the value is a number, so increment it by one
    if (myMap.has(num)) {
      myMap.set(num, myMap.get(num) + 1);
    } else {
      //If we dont have the key in our map...
      myMap.set(num, 1);
    }
  }
  //Make a new set and add the value of each key. If at any point we already saw the value we know the occurrences are NOT unique
  let mySet = new Set();
  //Grab the key and value of each myMap entry
  for (const val of myMap.values()) {
    //If the set already has it, return false
    if (mySet.has(val)) return false;
    //Otherwise add it
    mySet.add(val);
  }
  //If we got though the code above, return true, since the occurrences are all unique
  return true;
};

// ======================================================================================

// 다른 사람의 방법 : 내 방법과 유사해 보임. 코드는 더 짧고 깔끔
// 배열에서 값의 빈도를 객체로 만드는 방법이나, 배열의 중복값 여부를 판단하는 방법을 이 코드에서 참고할 것

var uniqueOccurrences = function (arr) {
  const obj = arr.reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : (acc[cur] = 1);
    return acc;
  }, {});

  // O(n)
  const values = Object.values(obj);
  // O(?)
  const result = new Set(values);

  // Compare length of each iterable items and give result
  return result.size === values.length;
};
