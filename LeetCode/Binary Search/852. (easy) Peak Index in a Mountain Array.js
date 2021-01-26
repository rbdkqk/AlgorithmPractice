/*  852. (easy) Peak Index in a Mountain Array  //  tag : Binaray Search

  Let's call an array `arr` a mountain if the following properties hold:

    arr.length >= 3
    There exists some i with 0 < i < arr.length - 1 such that:
      arr[0] < arr[1] < ... arr[i-1] < arr[i]
      arr[i] > arr[i+1] > ... > arr[arr.length - 1]
  
  Given an integer array `arr` that is guaranteed to be a mountain, 
    return any `i` such that `arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.


  Constraints:
    3 <= arr.length <= 10^4
    0 <= arr[i] <= 10^6
    `arr` is guaranteed to be a mountain array.


  Example 1:
    Input: arr = [0,1,0]
    Output: 1

  Example 2:
    Input: arr = [0,2,1,0]
    Output: 1

  Example 3:
    Input: arr = [0,10,5,2]
    Output: 1

  Example 4:
    Input: arr = [3,4,5,1]
    Output: 2

  Example 5:
    Input: arr = [24,69,100,99,79,78,67,36,26,19]
    Output: 2

  
  Follow up: Finding the O(n) is straightforward, could you find an O(log(n)) solution?

*/

/**
 * @param {number[]} arr
 * @return {number}
 */

/* 내가 작성한 코드

  middleIndex 하나만 가지고 처리해 보려고 했으나 실패함

  아래 다른 사람의 코드를 참고해서, start/end 두 값을 추가로 주는 방법으로 제출함

*/
var peakIndexInMountainArray = function (arr) {
  let start = 0;
  let end = arr.length - 1;

  while (true) {
    let middleIndex = parseInt(start + end / 2);

    if (
      arr[middleIndex - 1] < arr[middleIndex] &&
      arr[middleIndex] > arr[middleIndex + 1]
    ) {
      return middleIndex;
    } else if (arr[middleIndex - 1] > arr[middleIndex]) {
      end = middleIndex;
    } else if (arr[middleIndex] < arr[middleIndex + 1]) {
      start = middleIndex;
    }
  }
};

// 다른 사람의 코드

function peakIndexInMountainArray(A) {
  // lo and hi pointers for binary search
  let lo = 0;
  let hi = A.length - 1;
  // go until pointers meet
  while (lo < hi) {
    // get mid
    const mid = Math.floor((hi + lo) / 2);
    // check if this is peak
    if (A[mid] > A[mid - 1] && A[mid] > A[mid + 1]) {
      return mid;
    } else if (A[mid] > A[mid - 1]) {
      // search right half
      lo = mid;
    } else {
      // search left half
      hi = mid;
    }
  }
  // default
  return 0;
}

// ======================================================================================

// 다른 사람의 코드 : `비트연산자 OR`

const peakIndexInMountainArray = (A, low = 0, high = A.length - 1) => {
  if (!A.length) return -1;

  const mid = ((low + high) / 2) | 0;

  if (A[mid] > A[mid - 1] && A[mid] > A[mid + 1]) return mid;

  if (A[mid] < A[mid - 1]) return peakIndexInMountainArray(A, low, mid);

  if (A[mid] < A[mid + 1]) return peakIndexInMountainArray(A, mid, high);
};
