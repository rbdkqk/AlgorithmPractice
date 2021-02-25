/*  0225 Mock Interview : 1266. (easy) Minimum Time Visiting All Points  //  tag : Array, Geometry

  On a 2D plane, there are `n` points with integer coordinates `points[i] = [xi, yi]`. 
  
  Return the `minimum time` in seconds to visit all the points in the order given by `points`.

  You can move according to these rules:
    In 1 second, you can either:
      move vertically by one unit,
      move horizontally by one unit, or
      move diagonally sqrt(2) units (in other words, move one unit vertically then one unit horizontally in 1 second).
    You have to visit the points in the same order as they appear in the array.
    You are allowed to pass through points that appear later in the order, but these do not count as visits.


  Constraints:
    points.length == n
    1 <= n <= 100
    points[i].length == 2
    -1000 <= points[i][0], points[i][1] <= 1000


  Example 1:
    Input: points = [[1,1],[3,4],[-1,0]]
    Output: 7
    Explanation: 
      One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
      Time from [1,1] to [3,4] = 3 seconds 
      Time from [3,4] to [-1,0] = 4 seconds
      Total time = 7 seconds

  Example 2:
    Input: points = [[3,2],[-2,2]]
    Output: 5

*/

/**
 * @param {number[][]} points
 * @return {number}
 */

/*  내가 작성한 코드 (실패) : 멍청하게 진짜 좌표를 하나하나 다 계산하고 있었음
  
  시간복잡도 : O(2n => n) : indices 배열을 1회 순회, answer.join('')에서 answer 배열을 1회 순회
  공간복잡도 : O(n) : n이 커질수록, answer 배열 및 join() 처리한 문자열 역시 길어진다

  Runtime: 92 ms
  Memory Usage: 40.3 MB

*/
var minTimeToVisitAllPoints = function (points) {
  let count = 0;

  for (let i = 0; i < points.length - 1; i++) {
    move(points[i], points[i + 1]);
  }

  return count;

  function move(point1, point2) {
    if (point1[0] !== point2[0] && point1[1] !== point2[1]) {
      // 두 값이 다 다르면 : 대각선 이동
      // 먼저 x 좌표를 기준으로 함
      while (point1[0] !== point2[0]) {
        if (point1[0] < point2[0]) {
          point1[0] = point1[0] + 1;
          // 대각선 이동이므로 y 값도 변경
          if (point1[1] < point2[1]) {
            point1[1] = point1[1] + 1;
          } else {
            point1[1] = point1[1] - 1;
          }
        } else {
          point1[0] = point1[0] - 1;
          // 대각선 이동이므로 y 값도 변경
          if (point1[1] < point2[1]) {
            point1[1] = point1[1] + 1;
          } else {
            point1[1] = point1[1] - 1;
          }
        }

        count++;
      }

      // x 값이 같아졌으니, 남은 y값을 조정
      while (point1[1] !== point2[1]) {
        if (point1[1] < point2[1]) {
          point1[1] = point1[1] + 1;
        } else {
          point1[1] = point1[1] - 1;
        }
        count++;
      }
    } else {
      // 둘 중 하나라도 이미 같으면,
      if (point1[0] === point2[0]) {
        // x값이 이미 같다면,
        while (point1[1] !== point2[1]) {
          if (point1[1] < point2[1]) {
            point1[1] = point1[1] + 1;
          } else {
            point1[1] = point1[1] - 1;
          }
          count++;
        }
      } else if (point1[1] === point2[1]) {
        // y 값이 이미 같다면,
        while (point1[0] !== point2[0]) {
          if (point1[0] < point2[0]) {
            point1[0] = point1[0] + 1;
          } else {
            point1[0] = point1[0] - 1;
          }
          count++;
        }
      }
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Simple Solution:1266
// Math.abs() : 주어진 숫자의 절대값 반환
// 놓친 부분 : 상하좌우나 대각선이나 어차피 1칸의 이동이므로, '상하 또는 좌우 중 큰 값을 찾으면, 그것이 대각선을 포함한 최단거리'
let minTimeToVisitAllPoints = function (points) {
  let i = 0;
  let result = 0;

  while (i < points.length - 1) {
    let x = Math.abs(points[i][0] - points[i + 1][0]);
    let y = Math.abs(points[i][1] - points[i + 1][1]);
    result = result + Math.max(x, y);
    i++;
  }

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean 5-Liner Solution
// 위 코드와 같은 방법인데, 구조분해할당을 활용하여 이 코드가 더 보기 좋다
var minTimeToVisitAllPoints = function (points) {
  let totalTime = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    totalTime += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  }

  return totalTime;
};
