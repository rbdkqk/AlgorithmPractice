/* 가장 큰 수 (2020.09.17) 
  
  '정렬' 파트, 난이도 2단계  -  90분 내외 소요 (실패함)

  1. 문제 설명
    
    0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.
    예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.
    0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.


  2. 제한사항

    numbers의 길이는 1 이상 100,000 이하입니다.
    numbers의 원소는 0 이상 1,000 이하입니다.
    정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.


  3. 입출력 예
    
    numbers	: [6, 10, 2]
    return : "6210"
    
    numbers	: [3, 30, 34, 5, 9]
    return : "9534330"


  4. 복잡도 계산
    - 시간복잡도 : O(n)  of  O(n^2)
        Math.max  /  for 반복문  /  while 반복문 등이 순차로 사용되고 있음.
        while 안에서 indexOf 메소드가 돌아가는 점을 감안하면 O(n^2)일 수도 있을 듯.

    - 공간복잡도 : O(n)  
        numbersToString 배열을 선언하고 numbers 배열과 동일한 길이로 값을 추가 저장하고 있음
        numbers 배열의 요소들을 문자열화해서 answer 값에 누적시키고 있으므로, answer 문자열의 길이 역시 최소한 numbers 배열의 길이, 자리수가 많다면 그 이상으로 길어질 것임.
*/

/* 첫번째 시도 : 30분 걸렸고, 실패함 (틀린 결과값이 마지막에 있음)

function solution(numbers) {
    var answer = '';
    
    let numbersToString = [];
    
    for (let i = 0; i < numbers.length; i++) {
        numbersToString.push(Number(String(numbers[i])[0]));
    }

    while (numbersToString.length > 0) {
        let index = numbersToString.indexOf(Math.max(...numbersToString));
        numbersToString.splice(index, 1);
        answer = answer + String(numbers.splice(index, 1));
    }
    
    return answer;
    
    // 	expected '9533034' deepEqual '9534330'
}

*/

/* 다른 사람이 준 힌트를 참고함 : https://minnnne.tistory.com/73

    앞자리도 중요하지만 끝자리가 어떤 값인지에 따라 큰 값이 달라진다.
    따라서 해당 수를 반복시켜 자릿수를 맞춰주도록 한다.
    
    => 이거 보고 참고했는데 여전히 다 풀어내지 못함 / 테스트케이스만 잔뜩 추가했다.
      어떤 부분이 문제가 되는지는 대충 알겠는데, 해결법을 전혀 모르겠음

*/

// 여기까지 50분이 더 소요되었으나, 일부 테스트케이스가 안맞는다.
// function solution(numbers) {
//   var answer = "";

//   if (Math.max(...numbers) === 0) {
//     return "0";
//   }

//   let numbersToString = [];

//   for (let i = 0; i < numbers.length; i++) {
//     numbersToString.push(String(numbers[i]));
//   }

//   let longestNumberIndex = 0;

//   for (let j = 0; j < numbersToString.length; j++) {
//     if (longestNumberIndex < numbersToString[j].length) {
//       longestNumberIndex = numbersToString[j].length;
//     }
//   }

//   for (let k = 0; k < numbersToString.length; k++) {
//     if (numbersToString[k].length < longestNumberIndex) {
//       numbersToString[k] = numbersToString[k]
//         .repeat(longestNumberIndex)
//         .slice(0, longestNumberIndex);
//     }
//   }

//   while (numbersToString.length > 0) {
//     let index = numbersToString.indexOf(String(Math.max(...numbersToString)));
//     numbersToString.splice(index, 1);
//     answer = answer + String(numbers.splice(index, 1));
//   }

//   return answer;
// }

/* 기록해 둘 사항 - 다 풀지 못한 문제임

  힌트를 얻고 더 풀어보았으나 답을 내지 못함

  테스트케이스도 잔뜩 추가했는데, 대충 어떤 느낌의 문제인지는 알겠지만 방법이 떠오르지는 않음...

*/

// ===============================================================================

// 12. 30. 재시도 : 60분 내외 걸림
// 위 힌트 참고해서 풀었음

function solution(numbers) {
  let answer = numbers
    .sort((a, b) => {
      if (String(a).length === String(b).length) {
        return b - a;
      } else {
        let stringifyA = String(a);
        let stringifyB = String(b);
        for (let i = 0; i < 4; i++) {
          if (stringifyA.length < 4) {
            stringifyA = stringifyA + stringifyA[i];
          }
          if (stringifyB.length < 4) {
            stringifyB = stringifyB + stringifyB[i];
          }
        }
        return Number(stringifyB) - Number(stringifyA);
      }
    })
    .join('');

  if (Number(answer) === 0) {
    return '0';
  }

  return answer;
}

// ===============================================================================

/* 다른 사람의 풀이

  function solution(numbers) {
    var answer = numbers
      .map((v) => v + '')
      .sort((a, b) => (b + a) * 1 - (a + b) * 1)
      .join('');

    return answer[0] === '0' ? '0' : answer;
  }

// ===============================================================================

  function solution(numbers) {
    let answer = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join('');
    return answer[0] === '0' ? '0' : answer;
  }

// ===============================================================================

const compFunc = (a, b) => {
  const stra = a.toString();
  const strb = b.toString();
  if (parseInt(stra + strb) > parseInt(strb + stra)) {
    return -1;
  } else {
    return +1;
  }
};

function solution(numbers) {
  if (
    numbers.reduce((a, c) => {
      return a + c;
    }, 0) === 0
  ) {
    return '0';
  }
  return numbers.sort(compFunc).join('');
}

*/
