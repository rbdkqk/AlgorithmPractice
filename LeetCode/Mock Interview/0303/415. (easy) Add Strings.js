/*  0303 Mock Interview : 415. (easy) Add Strings  //  tag : String

  Given two non-negative integers `num1` and `num2` represented as string, 
    return the sum of `num1` and `num2`.

  Note:
    The length of both num1 and num2 is < 5100.
    Both num1 and num2 contains only digits 0-9.
    Both num1 and num2 does not contain any leading zero.
    You must not use any built-in BigInteger library or convert the inputs to integer directly.
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

// 풀지 못했음 - 's' * 's' / 's' 등의 연산이 숫자로 형변환되는 특징을 이용하라는 문제로 생각했는데, 답이 나오지 않는 것을 보니 코드가 잘못된 듯
var addStrings = function (num1, num2) {
  if (num1 === '0' && num2 === '0') {
    return '0';
  }

  let answer = [];

  let num1Array = convertStringToArray(num1);
  let num2Array = convertStringToArray(num2);

  for (let i = 0; i < 4; i++) {
    answer.push(num1Array[i] + num2Array[i]);
  }

  let extraTen = false;

  for (let j = 3; j >= 0; j--) {
    if (j === 0 && extraTen === true) {
      answer.unshift('1');
    }

    let first = answer[j][0];
    let second = answer[j][1];

    if (first === '0' && second === '0') {
      answer[j] = 0;
    } else {
      if (first !== '0' && second !== '0') {
        let a = (first * second) / second;
        let b = (first * second) / first;

        if (extraTen === true) {
          b = b + 1;
        }

        if (a + b >= 10) {
          extraTen = true;
          answer[j] = String(a + b - 10);
        } else {
          extraTen = false;
          answer[j] = String(a + b);
        }
      } else if (first !== '0') {
        if (extraTen === true) {
          second = second + 1;
        }

        if (second >= 10) {
          extraTen = true;
          answer[j] = String(second - 10);
        } else {
          extraTen = false;
          answer[j] = second;
        }
      } else if (second !== '0') {
        if (extraTen === true) {
          first = first + 1;
        }

        if (first >= 10) {
          extraTen = true;
          answer[j] = String(first - 10);
        } else {
          extraTen = false;
          answer[j] = first;
        }
      }
    }
  }

  for (let k = 0; k < answer.length; k++) {
    if (answer[k] !== '0') {
      answer = answer.slice(k).join('');
      break;
    }
  }

  return answer;
};

function convertStringToArray(string) {
  let array = string.split('');

  while (array.length < 4) {
    array.unshift('0');
  }

  return array;
}

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
// typeof ('9' - '0') : 'number' (자바스크립트의 특징인 것 같다...)
// sum : 1의 자리부터 계산해 주고 있으므로, 새로운 계산(앞의 자리) 결과(digitsSum)는 `${digitsSum % 10}${sum}`; 이런 방식으로 누적시킴
// 같은 자리의 두 수를 더했을 때 10이 넘는 경우 다음 자리의 연산에 1을 더해줘야 하는데, 이 역할을 carry가 해주는 중 (digitsSum을 10로 나눈 몫 : 1 아니면 0임)
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  let sum = '';

  for (; i >= 0 || j >= 0 || carry > 0; i--, j--) {
    const digit1 = i < 0 ? 0 : num1[i] - '0';
    const digit2 = j < 0 ? 0 : num2[j] - '0';
    const digitsSum = digit1 + digit2 + carry;
    sum = `${digitsSum % 10}${sum}`;
    carry = Math.floor(digitsSum / 10);
  }

  return sum;
};
