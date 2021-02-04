/*  0203 : 621. (medium) Task Scheduler  //  tag : Queue

  Given a characters array `tasks`, 
    representing the tasks a CPU needs to do, where each letter represents a different task. 
    
  Tasks could be done in any order. 
  Each task is done in one unit of time. 
  
  For each unit of time, the CPU could complete either one task or just be idle.

  However, there is a non-negative integer `n` 
    that represents the cooldown period between two same tasks (the same letter in the array), 
    that is that there must be at least `n` units of time between any two same tasks.

  Return the least number of units of times that the CPU will take to finish all the given tasks.


  Constraints:
    1 <= task.length <= 10^4
    tasks[i] is upper-case English letter.
    The integer n is in the range [0, 100].1, 1000].


  Example 1:
    Input: tasks = ["A","A","A","B","B","B"], n = 2
    Output: 8
    Explanation: 
      A -> B -> idle -> A -> B -> idle -> A -> B
      There is at least 2 units of time between any two same tasks.

  Example 2:
    Input: tasks = ["A","A","A","B","B","B"], n = 0
    Output: 6
    Explanation: On this case any permutation of size 6 would work since n = 0.
      ["A","A","A","B","B","B"]
      ["A","B","A","B","A","B"]
      ["B","B","B","A","A","A"]
      ...
      And so on.

  Example 3:
    Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
    Output: 16
    Explanation: 
      One possible solution is
      A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

*/

// 실패함 : 다른 사람의 코드를 붙여놓음

/*

  Concepts: The result value can be calculated by determining the task(s) that occur(s) most often. First let's consider the case where there is just 1 task that occurs most often, in this case, 'B'

  Case 1: [A, B, B, C] n=2
    The shortest solution would be `[B, A, C, B]`
    Notice how the solution isn't something like [A, B, C, _, B]. We've spaced out the most occuring task (B) as wide as possible in the array, by having it be at the beginning and end.

  Case 2: [A, B, B, C, C] n = 2
    Consider this, where there are multiple tasks that occur most often (B and C). The solution is essentially the same as Case 1, but with both of our max occuring tasks (B, C) spread out as much as possible, at the beginning and end, with the A in the middle.
    Shortest solution: `[B, C, A, B, C]`

  Case 3: [A, B, C, C, C] n=2
    If we consider the case where the number of occurrences for the max tasks is 3, we can see that a pattern shows itself.
    Shortest solution: `[C, A, _, C, B, _, C]`
    C will always have 2 spaces between it, and we try to fill it in with the other tasks. From this, we can see that the solution is a multiple of the max number of occurences - 1.

  What if `n = 3`?

  Case 4: [A, B, B, C] n = 3
    For the first example [A, B, B, C], we'll do the same as before by spreading out the most occurring task, but in order to satisfy the n=3 spacing, we will have to put 1 space somewhere in between (it doesn't matter where).
    Solution => [B, A, C, _, B]

  We can start to see a pattern here, and thus, we can create a formula to determine the answer!

  in short, the formula is...
    `resultCount = (maxOccurrences - 1) * (n + 1) + (numMaxTasks);`

  Let's break this down...

  `maxOccurences - 1`
    As seen in case 3, we know that we need to multiply times maxOccurences. We must subtract 1 because we dont need to have any empty spaces or filling after the last occurence, at the end.

  `(n + 1)`
    We need to multiply times n+1 because there will always be n spaces in between, which when multiplying, would not be including the actual task if we were to not add 1.

  `+maxNumTasks`
    This is to consider the case where there is more than 1 task that needs to be appended at the end, such as in Case 2.

  Edge cases
    It's possible that there is more than enough "filler" tasks to complete.
    Consider [A, B, C, C, D, E, F, G] where n = 2;

    Using our formula, our answer would be 4. Clearly this isn't correct because there are more than 4 tasks in the starting array!
    Thus, we can just return the length of the initial array.

*/

/**
 * @param {array[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  // the map will be our tracking mechanism
  let map = new Map();

  // the max occurrences
  let maxVal = 0;

  // the number of tasks that has the max occurrences
  let maxValCount = 0;

  for (let k of tasks) {
    let tVal = map.has(k) ? map.get(k) + 1 : 1;
    map.set(k, tVal);
    // set our maxVal and number of maxVal tasks only if we have a new max
    if (tVal > maxVal) {
      maxVal = tVal;
      maxValCount = 1;
      // otherwise, increment number of maxVal tasks
    } else if (tVal === maxVal) {
      maxValCount++;
    }
  }
  // our formula, handle the edge case
  return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount);
};
