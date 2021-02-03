/*  0114 : 933. Number of Recent Calls (easy)  // tag : Queue

  You have a `RecentCounter` class 
    which counts the number of recent requests within a certain time frame.

  Implement the `RecentCounter` class:

    `RecentCounter()` Initializes the counter with zero recent requests.
    `int ping(int t)` Adds a new request at time `t`, where `t` represents some time in milliseconds,
      and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). 
    Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.

  It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.


  Constraints:
    1 <= t <= 109
    Each test case will call ping with strictly increasing values of `t`.
    At most 10^4 calls will be made to ping.


  Example 1:
    Input
      ["RecentCounter", "ping", "ping", "ping", "ping"]
      [[], [1], [100], [3001], [3002]]

    Output
      [null, 1, 2, 3, 3]

    Explanation
      RecentCounter recentCounter = new RecentCounter();
      recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
      recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
      recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
      recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

*/

/*  내가 제출한 답

  시간복잡도 : O(n^2) : 아래의 다른 사람 코드에 댓글이 달려있음(글 가장 밑에서 설명 붙임)
  공간복잡도 : O(1) : ping 메소드가 실행된다고 해서 특정 변수가 공간을 많이 차지하지는 않음 (1회당 1개씩 this.queue 배열이 커질수는 있다)

  Runtime: 200 ms, faster than 100.00% of JavaScript online submissions for Number of Recent Calls.
  Memory Usage: 48.4 MB, less than 69.74% of JavaScript online submissions for Number of Recent Calls.

*/

var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);

  while (true) {
    if (this.queue[this.queue.length - 1] - this.queue[0] > 3000) {
      this.queue.shift();
    }
    if (this.queue[this.queue.length - 1] - this.queue[0] <= 3000) {
      break;
    }
  }

  return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

// ======================================================================================

// 다른 사람의 코드 : 비슷한 컨셉인데, 코드가 더 간편한 듯
// 내 코드의 `if (this.queue[this.queue.length - 1] - this.queue[0] > 3000)` 부분을 단축할 수 있다
// this.queue[this.queue.length - 1]은 언제나 t일 것임 (push 했으니까)
// 그러면 if 조건문 안에서는 (t - this.queue[0] > 3000) 이고,
// 각 요소를 부등호 기준으로 위치를 바꾸면 (t - 3000 > this.queue[0])이 된다.
// 이를 while 반복문의 조건으로 잡으면, 내 코드도 아래 코드와 유사해짐

/*

  Similar to the rate limiter question. 
  Represent the calls at time `T` as a streaming array of integers using a queue.

    For each call, add t to the end of the queue.
    Maintain the queue so that the front is always within the time frame of t - 3000 (we trim the values that dont appear in this interval)

  Ping(1)
    stream = [ 1 ] 
  Ping(100)
    stream = [ 1, 100 ] 
  ping(3001)
    stream = [ 1, 100, 3001 ]
  ping(3002)
    stream = [ 100, 3001, 3002 ] 
  
  Return the stream's count after each call

*/
var RecentCounter = function () {
  this.stream = [];
};

RecentCounter.prototype.ping = function (t) {
  this.stream.push(t); // Everytime we recieve a ping, add the time to the stream of integers
  /*
    To exclude the times that are not included within the range of t - 3000,
    we remove the first element from the stream while it is less than the calculated range 
  */
  while (this.stream[0] < t - 3000) {
    this.stream.shift();
  }
  // When the loop ends the length of calls will be the length of the array
  return this.stream.length;
};

// 시간복잡도에 관한 댓글 :
// the time is O(N^2), since you are looping on the array while pinging, and shifting for each.
// loop is O(N), and shift complexity is O(N).

// ======================================================================================

// 다른 사람의 코드
// 이렇게 하면 shift()가 없으니까 복잡도 면에서 유리할 것임 (O(n)인가?)

var RecentCounter = function () {
  this.arr = [];
  this.start = 0;
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.arr.push(t);
  while (this.arr[this.start] < t - 3000) {
    this.start++;
  }
  return this.arr.length - this.start;
};
