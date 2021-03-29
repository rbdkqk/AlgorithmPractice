/*  0329 Mock Interview : 836. (easy) Rectangle Overlap  // tag : Math

  An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], 
    where (x1, y1) is the coordinate of its bottom-left corner, 
    and (x2, y2) is the coordinate of its top-right corner. 

  Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

  Two rectangles overlap if the area of their intersection is positive. 
    To be clear, two rectangles that only touch at the corner or edges do not overlap.

  Given two axis-aligned rectangles rec1 and rec2, 
    return true if they overlap, otherwise return false.


  Constraints:
    rect1.length == 4
    rect2.length == 4
    -10^9 <= rec1[i], rec2[i] <= 10^9
    rec1[0] <= rec1[2] and rec1[1] <= rec1[3]
    rec2[0] <= rec2[2] and rec2[1] <= rec2[3]


  Example 1:
    Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
    Output: true

  Example 2:
    Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
    Output: false

  Example 3:
    Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
    Output: false

*/

/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */

// 실패 : 접근법을 찾지 못함
var isRectangleOverlap = function (rec1, rec2) {
  if (helper(rec1, rec2)) {
    return true;
  }

  if (helper(rec2, rec1)) {
    return true;
  }

  return false;
};

function helper(r1, r2) {
  if (r1[0] < r2[0] && r2[0] < r1[2] && r1[1] < r2[1] && r2[1] < r1[3]) {
    return true;
  } else if (r1[0] < r2[2] && r2[2] < r1[2] && r1[1] < r2[3] && r2[3] < r1[3]) {
    return true;
  } else {
    return false;
  }
}

// ======================================================================================

// 다른 사람의 코드 : Javascript solution - Rectangle Overlap
var isRectangleOverlap = function (rec1, rec2) {
  //checking when there is no overlaping
  if (
    rec1[2] <= rec2[0] || //rec1 is to the left of rec2
    rec1[0] >= rec2[2] || //rec1 is to the right of rec2
    rec1[3] <= rec2[1] || //rec1 is lower then rec2
    rec1[1] >= rec2[3] || //rec1 is above rec2
    //checking if rec1 or rec2 are lines and not a rectangle
    rec1[0] == rec1[2] ||
    rec1[1] == rec1[3] ||
    rec2[0] == rec2[2] ||
    rec2[1] == rec2[3]
  ) {
    return false;
  } else {
    return true;
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript
var isRectangleOverlap = function (rec1, rec2) {
  if (!rec1 || !rec2 || rec1.length == 0 || rec2.length == 0) return false;
  if (
    rec1[2] > rec2[0] &&
    rec1[3] > rec2[1] &&
    rec1[0] < rec2[2] &&
    rec1[1] < rec2[3]
  )
    return true;
  return false;
};

// ======================================================================================

// 다른 사람의 코드 : JS Solution
// Spelling it out (wordy) a little bit so you can try and understand what is going on:)
var isRectangleOverlap = function (rec1, rec2) {
  let [x1, y1, x2, y2] = rec1;
  let [a1, b1, a2, b2] = rec2;

  if (a1 >= x2 || a2 <= x1) return false; // make sure that there is some overlap on the x-axis
  if (b1 >= y2 || b2 <= y1) return false; // make sure that there is some overlap on the y-xais

  // by this point there is overlap on both the x-axis and the y-axis.
  return true;
};
