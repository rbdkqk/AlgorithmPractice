/*  0106 : 771. Jewels and Stones (easy)

  You're given strings `jewels` representing the types of stones that are jewels, and `stones` representing the stones you have. 
  Each character in `stones` is a type of stone you have. 
  You want to know how many of the stones you have are also jewels.
  Letters are case sensitive, so "a" is considered a different type of stone from "A".


  Constraints:
    1 <= jewels.length, stones.length <= 50
    jewels and stones consist of only English letters.
    All the characters of jewels are unique.


  Example 1:
    Input: jewels = "aA", stones = "aAAbbbb"
    Output: 3

  Example 2:
    Input: jewels = "z", stones = "ZZ"
    Output: 0

*/

/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */

/* 내가 제출한 답 1

  시간복잡도 : O(n^2) : jewels 배열과 stones 배열을 한번에 이중으로 순회함
  공간복잡도 : O(1) : answer라는 1개의 변수에 숫자를 0부터 올려나갈 뿐임

  Runtime: 76 ms, faster than 93.58% of JavaScript online submissions for Jewels and Stones.
  Memory Usage: 38.8 MB, less than 82.03% of JavaScript online submissions for Jewels and Stones.

*/
var numJewelsInStones = function (jewels, stones) {
  let answer = 0;

  for (let i = 0; i < jewels.length; i++) {
    for (let j = 0; j < stones.length; j++) {
      if (jewels[i] === stones[j]) {
        answer++;
      }
    }
  }

  return answer;
};

// ======================================================================================

/* 다른 사람의 코드 (변수 명칭을 내가 이해하기 쉽게 변경했음) : 시간/공간 복잡도가 모두 O(n)이라고 한다(의문점 있음)

  Set을 활용한 방법(중복 제거)
    - `Set` 객체는 자료형에 관계 없이 원시 값과 객체 참조 모두 유일한 값을 저장할 수 있습니다.
    - syntax : new Set([iterable]);
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
    - Set.prototype.has(value) : Set 객체 내 주어진 값을 갖는 요소가 있는지를 주장하는(asserting, 나타내는) boolean을 반환합니다.

*/

const numJewelsInStones = (jewels, stones) => {
  const jewelsSet = new Set(jewels);
  return (
    stones
      .split('')
      // .reduce((answer, eachStone) => answer + jewelsSet.has(eachStone), 0);
      .reduce((answer, eachStone) => {
        if (jewelsSet.has(eachStone)) {
          answer++;
        }
      }, 0)
  );
};

/*  위 방법의 의문점 1

  `answer + jewelsSet.has(eachStone)` 부분에서,
  answer는 숫자이고 jewelsSet.has(eachStone) 부분은 boolean이니까,
  결론은 잘 나오겠지만 사실 정확한 연산은 아닐 것 같음.
  아래와 같이 해야 정확하지 않을까?

  .reduce((answer, eachStone) => {
    if (jewelsSet.has(eachStone)) {
      answer++;
    }
  }, 0)

*/

/*  위 방법의 의문점 2

  Set으로 jewels의 중복을 제거했는데, 
  그 다음에는 stones를 돌면서 stones의 각 요소마다 jewelsSet에 존재하는지를 비교한다
  그러면 결국 stones와 jewelsSet의 O(n^2)이 아닌가? 
    - has를 위해서는 jewelsSet를 한바퀴 다 돌아야 할 테니...
    - has로 jewelsSet의 각 요소에 접근하는 방식이(한바퀴 도는게 아니라) index처럼 즉시 접근 가능하다면, O(n)이 맞을 듯
    - 객체에서 키/값에 접근할 때 hash로 구성되어 있다던데 이것도 그런가?
    - `All the characters of jewels are unique.`라는 조건이 있는데, 중복 제거보다는 즉시 접근 가능하도록 하기 위해서 Set을 사용한 듯?

*/

// ======================================================================================

/* 내가 제출한 답 2 : 이렇게 하면 공간복잡도는 손해가 있겠지만 시간복잡도는 위 두 방법보다 유리하지 않나?

  시간복잡도 : O(2n) => O(n) : jewels 배열과 stones 배열을 각각 따로 1회씩 순회함
  공간복잡도 : O(n) : answer라는 1개의 변수에 숫자를 0부터 올려나갈 뿐 + stones의 요소가 다양해질수록 stonesObj라는 객체 역시 커진다

  Runtime: 72 ms, faster than 98.31% of JavaScript online submissions for Jewels and Stones.
  Memory Usage: 39.5 MB, less than 45.16% of JavaScript online submissions for Jewels and Stones.

*/
var numJewelsInStones = function (jewels, stones) {
  let answer = 0;
  let stonesObj = {};
  debugger;
  for (let i = 0; i < stones.length; i++) {
    if (stonesObj[stones[i]] === undefined) {
      stonesObj[stones[i]] = 1;
    } else if (stonesObj[stones[i]] > 0) {
      stonesObj[stones[i]]++;
    }
  }

  for (let j = 0; j < jewels.length; j++) {
    if (stonesObj[jewels[j]] > 0) {
      answer = answer + stonesObj[jewels[j]];
    }
  }

  return answer;
};
