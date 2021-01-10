/*  0107 : 1365. How Many Numbers Are Smaller Than the Current Number (easy)

  Given the array `nums`, for each `nums[i]` find out how many numbers in the array are smaller than it. 
  That is, for each `nums[i]` you have to count the number of valid j's such that `j` != `i` and `nums[j]` < `nums[i]`.

  Return the answer in an array.


  Constraints:
    2 <= nums.length <= 500
    0 <= nums[i] <= 100


  Example 1:

    Input: nums = [8,1,2,2,3]
    Output: [4,0,1,1,3]

    Explanation: 
      For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
      For nums[1]=1 does not exist any smaller number than it.
      For nums[2]=2 there exist one smaller number than it (1). 
      For nums[3]=2 there exist one smaller number than it (1). 
      For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

  Example 2:

    Input: nums = [6,5,4,8]
    Output: [2,1,0,3]

  Example 3:

    Input: nums = [7,7,7,7]
    Output: [0,0,0,0]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*  내가 제출한 답

  시간복잡도 : O(n^2) : nums[i] > nums[j] 조건으로 탐색하므로, nums 배열을 이중으로 순회함
  공간복잡도 : O(n) : answer 배열의 길이는 nums 배열의 길이와 동일함

  Runtime: 100 ms, faster than 48.07% of JavaScript online submissions for How Many Numbers Are Smaller Than the Current Number.
  Memory Usage: 40.5 MB, less than 41.04% of JavaScript online submissions for How Many Numbers Are Smaller Than the Current Number.

*/

var smallerNumbersThanCurrent = function (nums) {
  let answer = [];

  for (let i = 0; i < nums.length; i++) {
    let isSmallerExists = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        isSmallerExists++;
      }
    }
    answer.push(isSmallerExists);
  }

  return answer;
};

// ======================================================================================

/*  다른 사람의 답 1

  var smallerNumbersThanCurrent = function(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    return nums.map(num => sorted.indexOf(num));
  };

  // 댓글 : So sad, too bad that .indexOf inside .map makes it O(N^2)
  // 댓글 : It will work for all the cases other than duplicates! You will need to use lastIndexOf rather than indexOf!
  // 댓글 : does this work for nums = [7, 7, 7] ?

  내 생각 : 위 함수에서 lastIndexOf로 바꿔서 해봤는데 답이 제대로 나오지 않았음
    [8, 1, 2, 2, 3]로 시작하면, 첫 줄에서 sorted = [1, 2, 2, 3, 8] 이고,
    두번째 줄에서 [8, 1, 2, 2, 3] 배열의 각 요소가 [1, 2, 2, 3, 8] 배열에서 어디에 있는지를 indexOf로 찾게 된다
    2의 경우 2회 나오는데, indexOf는 일치하는 가장 앞 요소의 index를 반환하니까, 
    2를 두번 탐색해도 둘다 [1, 2, 2, 3, 8] 배열의 첫번째 2를 잡아주게 됨
    
    첫번째 댓글의 지적은 그럴듯함. indexOf 메소드 때문에 배열을 이중으로 순회할 것임
    두번째 댓글은 이해되지 않음. lastIndexOf를 쓰면 답이 안나온다.
    세번째 댓글은 실험결과 이 코드로도 정상 동작함

*/

// ======================================================================================

/* 다른 사람의 답 2

  function smallerNumbersThanCurrent(nums) {
    const sorted = Array.from(nums).sort((n1, n2) => n2 - n1);
    const map = new Map(sorted.map((num, index) => [num, nums.length - index - 1]));
    return nums.map(num => map.get(num));
  }

  Complexity:
    Time O(NlogN)
    Space O(N)

  Example:
    nums [8,1,2,2,3]

    Sort nums by descending order
      sorted [8,3,2,2,1]
    Create map with counts
      map: {8:4,3:3,2:1,1:0}
    Return an array with counts stored in map
      result: [4,0,1,1,3]


  위 방법에 비해서, map.get을 활용하므로, 각 값에 접근하는 것이 indexOf보다 유리하다

  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map
    Map 객체 : 키-값 쌍을 저장하며 각 쌍의 삽입 순서도 기억하는 콜렉션입니다. 아무 값(객체와 원시 값)이라도 키와 값으로 사용할 수 있습니다.
    Map.prototype.get(key) : 주어진 키(Key)에 해당되는 값(value)을 반환하고, 만약 없으면 undefined를 반환한다.

*/
