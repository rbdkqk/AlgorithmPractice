/*  0312 Mock Interview : 1185. (easy) Day of the Week  // tag : Array

  Given a date, return the corresponding day of the week for that date.

  The input is given as three integers representing the day, month and year respectively.

  Return the answer as one of the following values {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}.


  Constraints:
    The given dates are valid dates between the years 1971 and 2100.


  Example 1:
    Input: day = 31, month = 8, year = 2019
    Output: "Saturday"
    
  Example 2:
    Input: day = 18, month = 7, year = 1999
    Output: "Sunday"
    
  Example 3:
    Input: day = 15, month = 8, year = 1993
    Output: "Sunday"

*/

/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */

// 성공 - 5분 소요
// Runtime: 76 ms
// Memory Usage: 39 MB
var dayOfTheWeek = function (day, month, year) {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[new Date(year, month - 1, day).getDay()];
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 3 solutions - using Date and not

const LIST = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// First solution is pretty easy since we can use the Date constructor to get the day of week.
const dayOfTheWeek = (day, month, year) =>
  LIST[new Date(`${year}-${month}-${day}`).getDay()];

// Second solution which I think should be the formal one for this issue is to calculate the number of days for the specific date.
const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const dayOfTheWeek = (day, month, year) => {
  let sum =
    (year - 1) * 365 +
    day +
    Math.floor((month > 2 ? year : year - 1) / 4) -
    Math.floor(year / 100) +
    Math.floor(year / 400);

  for (let i = 0; i < month; ++i) {
    sum += MONTH_DAYS[i];
  }

  return LIST[sum % 7];
};

// Third solution is based on Zeller's congruence.
// For more information, here's the wiki(https://en.wikipedia.org/wiki/Zeller%27s_congruence).
const dayOfTheWeek = (d, m, y) => {
  if (m < 3) {
    --y;
    m += 12;
  }

  const c = Math.floor(y / 100);

  y %= 100;

  const w =
    (y +
      Math.floor(y / 4) +
      Math.floor(c / 4) -
      2 * c +
      Math.floor((26 * (m + 1)) / 10) +
      d -
      1) %
    7;

  return LIST[(w + 7) % 7];
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript [cheating] solution using Intl API
const i18n = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
const dayOfTheWeek = (day, month, year) =>
  i18n.format(new Date(year, month - 1, day));

// ======================================================================================

// 다른 사람의 코드 : 1 line javascript solution 60ms
var dayOfTheWeek = function (day, month, year) {
  return new Date(year, month - 1, day).toLocaleString('en', {
    weekday: 'long',
  });
};
