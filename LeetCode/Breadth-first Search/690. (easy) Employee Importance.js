/*  690. (easy) Employee Importance //  tag : Hash, Depth-first Search, Recursion

  You are given a data structure of employee information, 
      which includes the `employee's unique id`, their `importance value` and their direct `subordinates' id`.

  For example, 
    employee `1` is the leader of employee `2`, 
    and employee `2` is the leader of employee `3`. 
  
  They have importance value `15`, `10` and `5`, respectively. 
  
  Then employee `1` has a data structure like [1, 15, [2]], 
    and employee `2` has [2, 10, [3]], 
    and employee `3` has [3, 5, []]. 
    
  Note that although employee `3` is also a subordinate of employee `1`, the relationship is not direct.

  Now given the employee information of a company, and an employee id, 
    you need to return the total importance value of this employee and all their subordinates.


  Constraints:
    One employee has at most one `direct` leader and may have several subordinates.
    The maximum number of employees won't exceed 2000.


  Example 1: 

    Input: [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
    Output: 11
      Explanation:
        Employee `1` has `importance value 5`, 
          and he has two direct subordinates: employee `2` and employee `3`. 
          They both have `importance value 3`. 
        So the total importance value of employee `1 is 5 + 3 + 3 = 11.

*/

/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */

/* 내가 제출한 답

  시간복잡도 : 굉장히 안 좋음
    - 최초의 findSubordinate 함수
    - while 반복문
    - shift()
    - 반복문 안의 for 반복문과 그 안에서 findSubordinate

  공간복잡도 :  O(n) : total은 숫자의 누적일 뿐이지만, queue는 길이가 많이 길어질 수 있다

  Runtime: 96 ms, faster than 42.25% of JavaScript online submissions for Employee Importance.
  Memory Usage: 42.2 MB, less than 60.56% of JavaScript online submissions for Employee Importance.

*/

var GetImportance = function (employees, id) {
  let total = 0;

  let queue = [];

  // 중간(중간관리자?)부터 시작할 수도 있으므로, 일단 한바퀴 돌려서 최초 시작점을 찾아냄
  queue.push(findSubordinate(employees, id));

  while (queue.length > 0) {
    let currentEmployee = queue.shift();

    for (let i = 0; i < currentEmployee.subordinates.length; i++) {
      queue.push(findSubordinate(employees, currentEmployee.subordinates[i]));
    }

    total += currentEmployee.importance;
  }

  return total;
};

function findSubordinate(allEmployees, employeeId) {
  for (let eachEmployee of allEmployees) {
    if (eachEmployee.id === employeeId) {
      return eachEmployee;
    }
  }
}

// ======================================================================================

// 다른 사람의 코드 : javascript with hash map BFS

var GetImportance = function (employees, id) {
  // id를 key로 하는 Map을 작성 : [{}, {}, ...] 이런 기존 형태보다 접근이 훨씬 쉽다...
  // 여기서 시간복잡도를 O(n)으로 정리하고, 그 뒤 각 값에 접근할 때에는 곧바로 접근 가능해짐
  let employeeMap = new Map();
  for (employee of employees) {
    employeeMap.set(employee.id, {
      importance: employee.importance,
      sub: employee.subordinates,
    });
  }

  let totalImportance = 0;

  // 그 후 queue를 활용해서 처리하는 방식은 유사한 듯
  // 각 직원정보 객체 전체를 넣지 않고, id만 넣어서 처리한다
  let queue = [id];

  while (queue.length > 0) {
    let currentEmployee = employeeMap.get(queue.shift());
    totalImportance += currentEmployee.importance;
    queue.push(...currentEmployee.sub);
  }

  return totalImportance;
};
