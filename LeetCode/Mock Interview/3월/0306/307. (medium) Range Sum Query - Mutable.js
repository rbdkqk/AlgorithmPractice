/*  0306 Mock Interview : 307. (medium) Range Sum Query - Mutable  //  tag : Binary Indexed Tree, Segment Tree

  Given an array `nums` and two types of queries 
    where you should update the value of an index in the array, 
    and retrieve the sum of a range in the array.

  Implement the `NumArray` class:
    - NumArray(int[] nums) Initializes the object with the integer array nums.
    - void update(int index, int val) Updates the value of nums[index] to be val.
    - int sumRange(int left, int right) Returns the sum of the subarray nums[left, right] (i.e., nums[left] + nums[left + 1], ..., nums[right]).


  Constraints:
    1 <= nums.length <= 3 * 10^4
    -100 <= nums[i] <= 100
    0 <= index < nums.length
    -100 <= val <= 100
    0 <= left <= right < nums.length
    At most 3 * 10^4 calls will be made to update and sumRange.


  Example 1:
    Input
      ["NumArray", "sumRange", "update", "sumRange"]
      [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
    
    Output
      [null, 9, null, 8]

    Explanation
      NumArray numArray = new NumArray([1, 3, 5]);
      numArray.sumRange(0, 2); // return 9 = sum([1,3,5])
      numArray.update(1, 2);   // nums = [1,2,5]
      numArray.sumRange(0, 2); // return 8 = sum([1,2,5])

*/

/**
 * @param {number[]} nums
 */

// 실패 : 테스트케이스는 모두 통과했지만, 결과는 Time Limit Exceeded
// sumRange를 O(1)로 작성해야 하는 것 같다

// 관련 태그로 걸려 있는 'Binary Indexed Tree, Segment Tree' 두 개념 자체를 처음 봤음.
// 전혀 이해가 되지 않아서 제출하지 않음

var NumArray = function (nums) {
  this.array = nums;
  let sumMemory = {};
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  this.array[index] = val;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let sum = 0;

  let array = this.array;

  for (let i = left; i <= right; i++) {
    sum += array[i];
  }

  return sum;
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */

// ======================================================================================

// 다른 사람의 코드 : JS Segment Tree solution: Time: O(log(n)) & S: O(n)
// Segment Tree(구간 트리) : https://yeoulcoding.tistory.com/126
class NumArray {
  constructor(nums) {
    this.nums = nums;
    this.sTree = [];
    this.constructTree(this.sTree, 0, nums.length - 1, 0);
    // console.log({nums}, this.sTree);
  }

  constructTree(tree, start, end, cur) {
    if (start === end) {
      tree[cur] = this.nums[start];
      return this.nums[start];
    }
    let mid = Math.floor((start + end) / 2);
    tree[cur] =
      this.constructTree(tree, start, mid, 2 * cur + 1) +
      this.constructTree(tree, mid + 1, end, 2 * cur + 2);
    return tree[cur];
  }

  getTreeSum(start, end, qs, qe, cur) {
    if (qs <= start && qe >= end) {
      return this.sTree[cur];
    }
    if (start > qe || end < qs) {
      return 0;
    }
    let mid = Math.floor((start + end) / 2);
    return (
      this.getTreeSum(start, mid, qs, qe, 2 * cur + 1) +
      this.getTreeSum(mid + 1, end, qs, qe, 2 * cur + 2)
    );
  }

  updateTreeSum(start, end, idx, diff, cur) {
    if (idx < start || idx > end) {
      return;
    }
    this.sTree[cur] += diff;
    if (start !== end) {
      let mid = Math.floor((start + end) / 2);
      this.updateTreeSum(start, mid, idx, diff, 2 * cur + 1);
      this.updateTreeSum(mid + 1, end, idx, diff, 2 * cur + 2);
    }
  }

  update(idx, val) {
    let diff = val - this.nums[idx];
    this.nums[idx] = val;
    this.updateTreeSum(0, this.nums.length - 1, idx, diff, 0);
  }

  sumRange(left, right) {
    return this.getTreeSum(0, this.nums.length - 1, left, right, 0);
  }
}
