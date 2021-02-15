/*  0216 : 733. (easy) Flood Fill  // tag : Depth-first Search

  An `image` is represented by a 2-D array of integers, 
    each integer representing the pixel value of the image (from 0 to 65535).

  Given a coordinate (`sr`, `sc`) representing the starting pixel (row and column) of the flood fill, 
    and a pixel value `newColor`, "flood fill" the image.

  To perform a "flood fill", consider the starting pixel, 
    plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, 
    plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. 
    Replace the color of all of the aforementioned pixels with the `newColor`.

  At the end, return the modified image.


  Constraints:
    The length of image and image[0] will be in the range [1, 50].
    The given starting pixel will satisfy 0 <= sr < image.length and 0 <= sc < image[0].length.
    The value of each color in image[i][j] and newColor will be an integer in [0, 65535].


  Example 1:
    Input: 
      image = [
        [1,1,1],
        [1,1,0],
        [1,0,1]
      ]
      sr = 1, sc = 1, newColor = 2

    Output: [
      [2,2,2],
      [2,2,0],
      [2,0,1]
    ]

    Explanation: 
      From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
        by a path of the same color as the starting pixel are colored with the new color.
      Note the bottom corner is not colored 2, because it is not 4-directionally connected
        to the starting pixel.

*/

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */

/*  내가 작성한 코드 : 

  시간복잡도 : O(n) : DFS 방식으로 전체 배열의 각 요소를 모두 탐색함
  공간복잡도 : O(n) : image 배열이 길어질수록 recursion 재귀함수 역시 여러번 호출되므로 콜스택 역시 그만큼 더 쌓이게 됨

  Runtime: 92 ms, faster than 83.33% of JavaScript online submissions for Flood Fill.
  Memory Usage: 41.1 MB, less than 54.86% of JavaScript online submissions for Flood Fill.

*/
// 해당 지점을 이미 방문했는지를 판단하기 위해 new Map()을 활용했는데,
// 다른 사람의 코드를 보니, new Map()을 선언할 필요 없이 newColor와 비교해서 같으면 return시키면 되는 것이었다
var floodFill = function (image, sr, sc, newColor) {
  let originValue = image[sr][sc];

  let visitList = new Map();

  function recursion(row, col) {
    if (
      row < 0 ||
      col < 0 ||
      row > image.length - 1 ||
      col > image[0].length - 1
    ) {
      return;
    }

    if (image[row][col] !== originValue) {
      return;
    }

    let checkPoint = `${row}/${col}`;

    if (visitList.get(checkPoint) === true) {
      return;
    } else {
      visitList.set(checkPoint, true);
    }

    image[row][col] = newColor;

    recursion(row - 1, col);
    recursion(row + 1, col);
    recursion(row, col - 1);
    recursion(row, col + 1);
  }

  recursion(sr, sc);

  return image;
};

// ======================================================================================

// 다른 사람의 코드 : Concise DFS Javascript
// new Map()을 사용할 필요가 없다는 점을 제외하면, 발상은 비슷한 것 같음
const floodFill = (image, sr, sc, newColor, firstColor = image[sr][sc]) => {
  // handle if the coordinate is out of bounds
  // or if it is already the new color
  // or if it's not from the original color we're trying to change
  if (
    sr < 0 ||
    sc < 0 ||
    sr >= image.length ||
    sc >= image[sr].length ||
    image[sr][sc] !== firstColor ||
    image[sr][sc] === newColor
  ) {
    return image; // return image as-is
  }

  image[sr][sc] = newColor;

  floodFill(image, sr + 1, sc, newColor, firstColor);
  floodFill(image, sr - 1, sc, newColor, firstColor);
  floodFill(image, sr, sc + 1, newColor, firstColor);
  floodFill(image, sr, sc - 1, newColor, firstColor);

  // return modified image
  return image;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 2 Intuitive Solutions Using DFS and BFS
// Solutions 1 - DFS
var floodFill = function (image, sr, sc, newColor) {
  const currColor = image[sr][sc];
  if (newColor === currColor) return image;

  function callDFS(img, row, col) {
    if (
      row >= img.length ||
      row < 0 ||
      col >= img[0].length ||
      col < 0 ||
      img[row][col] !== currColor
    )
      return;
    img[row][col] = newColor;
    callDFS(img, row - 1, col); //up
    callDFS(img, row + 1, col); //down
    callDFS(img, row, col + 1); //right
    callDFS(img, row, col - 1); //left
    return img;
  }
  return callDFS(image, sr, sc);
};

// Solutions 2 - BFS
var floodFill = function (image, sr, sc, newColor) {
  const currColor = image[sr][sc];
  if (currColor === newColor) return image;
  const queue = [[sr, sc]];

  while (queue.length) {
    const [row, col] = queue.shift();
    if (image[row][col] === currColor) {
      image[row][col] = newColor;
      if (row - 1 >= 0) queue.push([row - 1, col]); //up
      if (row + 1 < image.length) queue.push([row + 1, col]); //down
      if (col + 1 < image[0].length) queue.push([row, col + 1]); //right
      if (col - 1 >= 0) queue.push([row, col - 1]); //left
    }
  }
  return image;
};
