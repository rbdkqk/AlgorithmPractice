/* 소수 찾기 (2020.11.25) 
  
  '완전탐색' 파트, 난이도 2단계  -  1시간 봤는데 못해서, 다른사람 코드 참고해서 제출함 
                                (numbers로 만들 수 있는 모든 수를 나열하는 부분이 어려웠음)


  1. 문제 설명
    
    한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 
    흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

    각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 
    종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.


  2. 제한사항

    numbers는 길이 1 이상 7 이하인 문자열입니다.
    numbers는 0~9까지 숫자만으로 이루어져 있습니다.
    013은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.


  3. 입출력 예
    
    numbers : "17"
    return : 3
    
    numbers : "011"
    return : 2    


  4. 복잡도
    (1) 시간복잡도 : O(n) - 
    (2) 공간복잡도 : O(1) - 

*/

/* 계획
    1. primeNumberTester 함수를 구성하고,
    2. numbers로 만들 수 있는 모든 수를 나열한 뒤, (이게 핵심인데, 이걸 못 했음) : https://velog.io/@benomadwill/dailyalgo27 참고함
    3. 이 나열된 수들을 primeNumberTester에 넣고 돌려서 마무리한다?
*/

function solution(numbers) {
  var answer = 0;
  let box = [];
  let splittedNumbers = numbers.split("");

  function recurNum(array, start) {
    if (start.length > 0) {
      if (box.includes(Number(start)) === false) {
        box.push(Number(start));
      }
    }
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        let temp = array.slice(0); // 일단 array 전체를 복사하고,
        temp.splice(i, 1); // i번째부터 1개만 잘라내고, (splice의 return값은 잘라낸 결과물을 담은 배열)
        // temp는 잘리고 남은 배열임.
        recurNum(temp, start + array[i]); // 이게 핵심
      }
    }
  }

  recurNum(splittedNumbers, "");

  let arr = [];

  // 거를 수들을 거르고 2, 5는 챙기기 위한 처리
  for (let j = 0; j < box.length; j++) {
    if (box[j] === 2 || box[j] === 5) {
      arr.push(box[j]);
    } else if (
      box[j] % 10 !== 0 ||
      box[j] % 10 !== 2 ||
      box[j] % 10 !== 4 ||
      box[j] % 10 !== 5 ||
      box[j] % 10 !== 6 ||
      box[j] % 10 !== 8
    ) {
      arr.push(box[j]);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (primeNumberTester(arr[i])) {
      answer++;
    }
  }

  return answer;
}

function primeNumberTester(number) {
  if (typeof number !== "number" || number <= 1 || number % 1 !== 0) {
    return false;
  }

  let powedNum = Math.sqrt(number);

  for (let i = 2; i <= powedNum; i++) {
    // 1부터 시작할 필요가 없음. 2부터 비교하면 됨. // 자기 자신도 넣을 필요 없음
    if (number % i === 0) {
      // 나머지가 0인 것들, 즉 약수들만을 체크해서, (여기에서 걸린다면 나누어 떨어지는 수, 즉 약수가 있다는 말이 된다.)
      return false;
    }
  }
  return true;
}
