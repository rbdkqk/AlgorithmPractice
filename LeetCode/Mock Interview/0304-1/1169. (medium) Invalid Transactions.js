/*  0304-1 Mock Interview : 1169. (medium) Invalid Transactions  //  tag : Array, String

  A transaction is possibly invalid if:
    the amount exceeds $1000, or;
    if it occurs within (and including) 60 minutes of another transaction with the same name in a different city.

  You are given an array of strings `transaction` 
    where `transactions[i]` consists of comma-separated values 
    representing the name, time (in minutes), amount, and city of the transaction.

  Return a list of transactions that are possibly invalid. 
    You may return the answer in any order.


  Constraints:
    transactions.length <= 1000
    Each transactions[i] takes the form "{name},{time},{amount},{city}"
    Each {name} and {city} consist of lowercase English letters, and have lengths between 1 and 10.
    Each {time} consist of digits, and represent an integer between 0 and 1000.
    Each {amount} consist of digits, and represent an integer between 0 and 2000.


  Example 1:
    Input: transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
    Output: ["alice,20,800,mtv","alice,50,100,beijing"]
    Explanation: 
      The first transaction is invalid because the second transaction occurs within a difference of 60 minutes, have the same name and is in a different city. 
      Similarly the second one is invalid too.

  Example 2:
    Input: transactions = ["alice,20,800,mtv","alice,50,1200,mtv"]
    Output: ["alice,50,1200,mtv"]

  Example 3:
    Input: transactions = ["alice,20,800,mtv","bob,50,1200,mtv"]
    Output: ["bob,50,1200,mtv"]

  
  참고 : transaction - (컴퓨터 분야에서,) 쪼개질 수 없는 업무처리의 단위

*/

/**
 * @param {string[]} transactions
 * @return {string[]}
 */

// 실패 - 문제 자체를 제대로 이해하지 못함
var invalidTransactions = function (transactions) {
  let answer = [];

  let obj = {};

  for (let i = 0; i < transactions.length; i++) {
    let splittedArray = transactions[i].split(',');

    transactions[i] = splittedArray;
  }

  transactions.sort((a, b) => {
    return ('' + a[0]).localeCompare(b[0]);
  });

  for (let i = 0; i < transactions.length - 1; i++) {
    // amount가 1000을 넘긴다면,
    if (Number(transactions[i][2]) > 1000) {
      answer.push(
        '' +
          transactions[i][0] +
          ',' +
          Number(transactions[i][1]) +
          ',' +
          Number(transactions[i][2]) +
          ',' +
          transactions[i][3]
      );
    }
    // name이 다르다면, 건드리지 말고 넘어가기
    if (transactions[i][0] !== transactions[i + 1][0]) {
      continue;
    } else {
      // name은 같다면,
      // city가 다르다면, time을 비교한다
      if (transactions[i][3] !== transactions[i + 1][3]) {
        // amount만 비교함
      }
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : [Javascript] Simple and Organized Solution  글의 댓글 코드
const isInvalid = (transaction, map) => {
  const [name, time, amount, city] = transaction.split(',');

  if (amount > 1000) return true;

  const prevTrans = map[name];

  for (const trans of prevTrans) {
    if (city !== trans.city && Math.abs(time - trans.time) <= 60) return true;
  }

  return false;
};

const invalidTransactions = (transactions) => {
  const invalid = [];
  const map = {};

  for (const trans of transactions) {
    const [name, time, amount, city] = trans.split(',');

    if (name in map) map[name].push({ time, city });
    else map[name] = [{ time, city }];
  }

  for (const trans of transactions) {
    if (isInvalid(trans, map)) invalid.push(trans);
  }

  return invalid;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution - O(n^2) Approach
var invalidTransactions = function (transactions) {
  const n = transactions.length;
  const added = new Array(n).fill(false);
  const res = [];

  for (let i = 0; i < n; i++) {
    const [name1, time1, amount1, city1] = transactions[i].split(',');

    if (amount1 > 1000 && !added[i]) {
      res.push(transactions[i]);
      added[i] = true;
    }

    for (let j = i + 1; j < n; j++) {
      const [name2, time2, amount2, city2] = transactions[j].split(',');

      if (name1 === name2 && Math.abs(time1 - time2) <= 60 && city1 != city2) {
        if (!added[j]) {
          res.push(transactions[j]);
          added[j] = true;
        }

        if (!added[i]) {
          res.push(transactions[i]);
          added[i] = true;
        }
      }
    }
  }

  return res;
};
