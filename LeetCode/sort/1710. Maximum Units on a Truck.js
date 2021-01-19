/*  0119 : 1710. Maximum Units on a Truck (easy)  //  tag : sort, greedy

  You are assigned to put some amount of boxes onto one truck. 
  You are given a 2D array `boxTypes`, where `boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]`:

  `numberOfBoxesi` is the number of boxes of type `i`.
  `numberOfUnitsPerBoxi` is the number of units in each box of the type `i`.
  You are also given an integer `truckSize`, which is the maximum number of boxes that can be put on the truck. 
  You can choose any boxes to put on the truck as long as the number of boxes does not exceed `truckSize`.

  Return the `maximum total number` of `units` that can be put on the truck.


  Constraints:
    1 <= boxTypes.length <= 1000
    1 <= numberOfBoxesi, numberOfUnitsPerBoxi <= 1000
    1 <= truckSize <= 10^6


  Example 1:
    Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
    Output: 8

    Explanation:  There are:
      - 1 box of the first type that contains 3 units.
      - 2 boxes of the second type that contain 2 units each.
      - 3 boxes of the third type that contain 1 unit each.
        You can take all the boxes of the first and second types, and one box of the third type.
        The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.

  Example 2:
    Input: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
    Output: 91

*/

/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */

/*  내가 제출한 답

  시간복잡도 : O(2nlogn) => O(nlogn)
    sort()에서 nlogn, for 반목문에서 n 
    (반복문 안에 for가 한번 더 나오는데, 이건 이중배열 안의 하나의 요소에서 돌리고 break가 걸리므로, for를 이중으로 돌진 않는다)

  공간복잡도 : O(1)
    currentLoad / answer 값은 숫자값이 변경될 뿐이므로, boxTypes 배열이 길어지더라도 공간복잡도는 차이가 없다
    sort()는 기본 boxTypes 배열을 변경하므로 차이가 생기지 않음

  Runtime: 84 ms, faster than 97.66% of JavaScript online submissions for Maximum Units on a Truck.
  Memory Usage: 40.5 MB, less than 97.42% of JavaScript online submissions for Maximum Units on a Truck.

*/

var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1]);

  debugger;
  let currentLoad = 0;
  let answer = 0;

  for (let i = 0; i < boxTypes.length; i++) {
    if (boxTypes[i][0] + currentLoad <= truckSize) {
      // 이번꺼는 다 넣을 수 있다면,
      currentLoad += boxTypes[i][0];
      answer += boxTypes[i][0] * boxTypes[i][1];
    } else {
      // 이번꺼는 다는 못 넣고 그 중 일부는 넣을 수 있다면,
      for (let j = 1; j <= boxTypes[i][0]; j++) {
        if (1 + currentLoad <= truckSize) {
          currentLoad++;
          answer += boxTypes[i][1];
        } else {
          break;
        }
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 답
// 나는 currentLoad 값을 0부터 누적시켜 나갔는데, 이 방법은 거꾸로 truckSize에서 빼 오고 있다
// '남은 공간'을 찾는 방식

var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1]);
  let max = 0;
  for (const [numberOfBoxes, numberOfUnistsPerBox] of boxTypes) {
    if (numberOfBoxes >= truckSize) {
      // '남은 공간'에다가 numberOfUnistsPerBox를 곱해서 마무리함
      max += truckSize * numberOfUnistsPerBox;
      return max;
    } else {
      max += numberOfBoxes * numberOfUnistsPerBox;
      truckSize -= numberOfBoxes;
      // 나는 currentLoad 값을 0부터 누적시켜 나갔는데, 이 방법은 거꾸로 truckSize에서 빼 오고 있다
      // '남은 공간'을 찾는 방식
    }
  }
  return max;
};

// ======================================================================================

// 다른 사람의 방식
// while 반복문 활용

var maximumUnits = function (boxTypes, truckSize) {
  let noOfUnits = 0;
  let loadedBoxes = 0;
  let i = 0;

  boxTypes.sort((a, b) => b[1] - a[1]);

  while (loadedBoxes < truckSize && boxTypes[i]) {
    let currentBoxs = boxTypes[i][0];

    if (currentBoxs + loadedBoxes > truckSize) {
      currentBoxs = truckSize - loadedBoxes;
    }

    loadedBoxes += currentBoxs;
    noOfUnits += currentBoxs * boxTypes[i][1];

    if (loadedBoxes === truckSize) return noOfUnits;

    i++;
  }

  return noOfUnits;
};
