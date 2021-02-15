/*  0215 : 1491. (easy) Average Salary Excluding the Minimum and Maximum Salary  // tag : Array, Sort

  Given an array of unique integers `salary` where `salary[i]` is the salary of the employee `i`.

  Return the average salary of employees excluding the minimum and maximum salary.


  Constraints:
    3 <= salary.length <= 100
    10^3 <= salary[i] <= 10^6
    salary[i] is unique.
    Answers within 10^-5 of the actual value will be accepted as correct.


  Example 1:
    Input: salary = [4000,3000,1000,2000]
    Output: 2500.00000
    Explanation: 
      Minimum salary and maximum salary are 1000 and 4000 respectively.
      Average salary excluding minimum and maximum salary is (2000+3000)/2= 2500
  
  Example 2:
    Input: salary = [1000,2000,3000]
    Output: 2000.00000
    Explanation: 
      Minimum salary and maximum salary are 1000 and 3000 respectively.
      Average salary excluding minimum and maximum salary is (2000)/1= 2000

  Example 3:
    Input: salary = [6000,5000,4000,3000,2000,1000]
    Output: 3500.00000
  
  Example 4:
    Input: salary = [8000,9000,2000,3000,6000,1000]
    Output: 4750.00000

*/

/**
 * @param {number[]} salary
 * @return {number}
 */

/*  내가 작성한 코드 : 

  시간복잡도 : O(2nlogn => nlogn) : sort에서 nlogn, for 반복문에서 n
  공간복잡도 : O(1) : answer 변수에 값을 더해서 누적시킬 뿐임

  Runtime: 80 ms, faster than 46.81% of JavaScript online submissions for Average Salary Excluding the Minimum and Maximum Salary.
  Memory Usage: 38.5 MB, less than 57.92% of JavaScript online submissions for Average Salary Excluding the Minimum and Maximum Salary.

*/
var average = function (salary) {
  salary.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 1; i < salary.length - 1; i++) {
    answer += salary[i];
  }

  return answer / (salary.length - 2);
};

// ======================================================================================

// 다른 사람의 코드 : Javascript
// 이렇게 하면 sort를 안해도 되니까 for 반복문 1회로 가능 (O(n))
var average = function (salary) {
  if (salary.length < 3) return 0;

  let min = salary[0],
    max = salary[0],
    sum = 0;

  for (let ele of salary) {
    if (ele > max) max = ele;
    if (ele < min) min = ele;
    sum += ele;
  }
  return (sum - max - min) / (salary.length - 2);
};
