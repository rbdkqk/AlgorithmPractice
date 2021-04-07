/*  0407 : 463. (easy) Island Perimeter  //  tag : Hash Table

  You are given row x col grid representing a map 
    where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

  Grid cells are connected horizontally/vertically (not diagonally). 
    The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

  The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. 
    One cell is a square with side length 1. 
    The grid is rectangular, width and height don't exceed 100. 

  Determine the perimeter of the island.


  Constraints:
    row == grid.length
    col == grid[i].length
    1 <= row, col <= 100
    grid[i][j] is 0 or 1.


  Example 1:
    Input: grid =  [[0,1,0,0], 
                    [1,1,1,0], 
                    [0,1,0,0], 
                    [1,1,0,0]] 
    Output: 16
    Explanation: The perimeter is the 16 yellow stripes in the image above.

  Example 2:
    Input: grid = [[1]]
    Output: 4

  Example 3:
    Input: grid = [[1,0]]
    Output: 4

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

// 실패 : 좌측으로 모두 몰아서 계산하는 컨셉을 잡았기에, '전체로는 연결되어 있지만 자기들은 양쪽에 떨어진 경우([1, 0, 0, 1] 등등)'를 체크하지 못하는 문제가 있었다.
// Hash Table 문제인데, 이걸 활용한 답은 안 나와 있어 아쉬움
var islandPerimeter = function (grid) {
  let answer = 0;
  let array = [];

  for (let i = 0; i < grid.length; i++) {
    array.push(grid[i].reduce((acc, cur) => acc + cur, 0));
  }

  for (let k = 0; k < array.length; k++) {
    if (array[k] === 0) continue;
    answer += (array[k] + 1) * 2;
  }

  for (let j = 0; j < grid.length - 1; j++) {
    for (let m = 0; m < grid[j].length; m++) {
      if (grid[j][m] === 1 && grid[j + 1][m] === 1) {
        answer -= 2;
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : easy javascript solution
var islandPerimeter = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  var perimeter = 0;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      if (!grid[row][col]) continue;

      perimeter += 4;

      // abstract the number of adjacent island
      if (row > 0 && grid[row - 1][col]) perimeter--; // 맨 윗 줄은 넘어갔고, 윗 칸이 차 있다면,
      if (col > 0 && grid[row][col - 1]) perimeter--; // 맨 왼쪽 칸은 넘어갔고, 왼쪽 칸이 차 있다면,
      if (row < rows - 1 && grid[row + 1][col]) perimeter--; // 맨 아랫칸보단 윗줄이고, 아래 칸이 차 있다면,
      if (col < cols - 1 && grid[row][col + 1]) perimeter--; // 맨 오른쪽 칸보다는 좌측이고, 오른쪽 칸이 차 있다면,
    }
  }

  return perimeter;
};

// ======================================================================================

// 다른 사람의 코드 : Easy JS Solution
var islandPerimeter = function (grid) {
  let height = grid.length,
    width = grid[0].length;
  let count = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (grid[row][col] == 1) {
        count += 4;
        if (row > 0 && grid[row - 1][col] == 1) count--;
        if (row < height - 1 && grid[row + 1][col] == 1) count--;
        if (grid[row][col - 1] == 1) count--;
        if (grid[row][col + 1] == 1) count--;
      }
    }
  }
  return count;
};

/*
  For every sigle square our perimeter increases by 4 since a square has four sides. But, when two squares meet, each square loses one side.
  So, whenever we are on land, we check our top, bottom, left and right to check if there are connected lands and if there are, for each square we subtract one side.

  Time Complexity: O(row*col)
  Space Complexity: O(1)
*/

// ======================================================================================

// 다른 사람의 코드 : [Simple] DFS Based Solution
var islandPerimeter = function (grid) {
  let visited = grid.map((val) => val.map((newVal) => false));
  // console.log(visited)

  let calc = (grid, row, col) => {
    let p = 4;
    if (grid[row - 1] && grid[row - 1][col]) p--;
    if (grid[row + 1] && grid[row + 1][col]) p--;
    if (grid[row] && grid[row][col - 1]) p--;
    if (grid[row] && grid[row][col + 1]) p--;
    return p;
  };

  let dfs = (grid, row, col, count = 0) => {
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
      return 0;
    else if (grid[row][col]) {
      let loop = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ];
      let count = calc(grid, row, col);
      visited[row][col] = true;
      for (let i of loop) {
        if (
          row + i[0] >= 0 &&
          col + i[1] >= 0 &&
          row + i[0] < grid.length &&
          col + i[1] < grid[0].length &&
          !visited[row + i[0]][col + i[1]]
        ) {
          count += dfs(grid, row + i[0], col + i[1]);
        }
      }
      return count;
    } else return 0;
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) {
        return dfs(grid, row, col);
      }
    }
  }
  return count;
};
