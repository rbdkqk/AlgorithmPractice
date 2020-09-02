/* 소수 찾기 (2020.09.02)
  
  '연습문제' 파트, 난이도 1단계  -  50분 ("에라토스테네스의 체" 구현하는 방법을 생각해내지 못함) 

  1. 문제 설명
    
    1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.
    소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다. (1은 소수가 아닙니다.)


  2. 제한사항

    n은 2이상 1000000이하의 자연수입니다.


  3. 입출력 예
    
    n	: 10	
    result : 4

    n	: 5	
    result : 3
    

  4. 복잡도 계산

    - 시간복잡도 : O(nlogn) -  (참고링크 : https://falsy.me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-3-%EC%A0%95%EB%A0%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-1/)
          v8엔진에서(크롬) 자바스크립트의 .sort() 메소드는 퀵 정렬로 구현되어 있음. 
          최악의 경우 시간 복잡도는 O(n2)가 되는데, 그럴 확률이 정말 낮으므로, 예외적으로 O(nlogn)으로 이야기 한다고 한다.

    - 공간복잡도 : O(n)  - 
          splittedString 라는 배열을 만들어서 s 문자열을 분할한 뒤 정렬하므로, n만큼의 공간을 차지할 것으로 생각함.
          그러나, sort() 메소드나 reverse(), reduce() 메소드 역시 공간복잡도의 계산에 넣어야 할 것인데, 이 부분은 잘 모르겠음.

*/

/*  "에라토스테네스의 체"

    "소수를 구하고자 하는 범위 2~n이 있을 때, 
    2~n의 제곱근에 해당하는 범위 안의 소수의 배수들을 계속 제외하면, 결국 소수만 남는다"

*/

let solution = (n) => {
  // n+1칸의 배열 arr 선언 -> 전체를 true로 채우고 -> 0~1번째는 false로 '바꿔서' 채워준다 (앞에서 더하는게 아님).
  // 'fill()' 공부할 것 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  let arr = Array(n + 1)
    .fill(true)
    .fill(false, 0, 2);

  // 제곱근까지만 탐색하면 되므로, i*i<=n 조건으로 진행
  for (let i = 2; i * i <= n; i++) {
    // 위의 arr 배열에서 i 번째 값이 true이면,
    if (arr[i]) {
      // i 의 배수번째 값들은 false로 바꿔준다.
      // i = 2 이면, => 4 부터 시작해서, i(2)씩 더해서, => 6, 8, 10, 12, ...
      // i = 3 이면, => 9 부터 시작해서, i(3)씩 더해서, => 12, 15, 18, 21, ...
      // i = 4 이면, 4*4인 16을 위의 2에서 false로 만들었으므로, if 조건을 만족하지 못함.
      // i = 5 이면, => 25 부터 시작해서, i(5)씩 더해서, => 30, 35, 40, ...
      // i = 6 이면, 6*6인 36을 위의 2에서 false로 만들었으므로, if 조건을 만족하지 못함.
      // i = 7 이면, => 49 부터 시작해서, i(7)씩 더해서, => 56, 63, 70, ...
      for (let j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }

  return arr.filter((e) => e).length;
};

// ===================================================================

/* start 부터 end 까지의 소수 목록을 받는 함수

  var primeSieve = function (start, end) {
    // create a current to start our iteration which is 2
    var current = 2;
    // create a range for our prime numbers
    var primes = range(end);
    // check while I current is less than our end
    while (current < end) {
      // loop through until the end and increment by the current every time
      for (var i = current + current; i <= end; i += current) {
        // make the current = to null
        primes[i] = null;
      }
      do {
        // add to our current
        current++;
        // check if the current is null then add to current again, if the current is not null continue
      } while (!primes[current] && current <= end);
    }
    // return all the numbers that aren't null and greater then start
    var results = [];
    for (var j = 2; j < primes.length; j++) {
      if (primes[j] !== null && primes[j] >= start) {
        results.push(primes[j]);
      }
    }
    return results;
  };

  var range = function (end) {
    var result = [];
    for (var i = 0; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  
*/

// ===================================================================

/*  기능은 작동하는데, 효율성 면에서 실패함.

  function solution(n) {
    var answer = 0;
    
    for (let i = 2; i <= n; i++) {
        if (primeTester(i)) {
            answer++;
        }
    }
    
    return answer;
  }

  function primeTester (n) {
    
    let pow = Math.floor(Math.pow(n, 0.5))
    
    for (let i = 2; i < pow + 1; i++) {
        if (n % i === 0) {
            return false;
        } 
    }
    
    return true;
  }

*/

/*  아래는 앞서 제출했던 코드

  var primeTester = function (n) {
    if (typeof n !== "number" || n < 1 || n % 1 !== 0) {
      // n isn't a number or n is less than 1 or n is not an integer
      return false;
    }
    // TODO: return true if n is prime, false otherwise
    if (n === 1) {
      return false;
    }

    if (n === 2 || n === 3 || n === 5 || n === 7) {
      return true;
    }

    // 위키백과 : 2와 5를 제외하면, 모든 소수의 일의 자리 수는 1, 3, 7, 9이다.
    let firstDigit = n % 10;

    if (
      firstDigit === 2 ||
      firstDigit === 4 ||
      firstDigit === 5 ||
      firstDigit === 6 ||
      firstDigit === 8
    ) {
      return false;
    }

    // n의 제곱근이 정수라면, 제곱근이 n의 약수이므로, 탈락
    if (Number.isInteger(Math.pow(n, 0.5))) {
      return false;
    }

    // let rootN = Math.floor(Math.pow(n, 0.5));

    // 참고 : https://im-developer.tistory.com/23
    // 1부터 n까지의 모든 수를 가지고, n을 나눠서, 나머지가 0인 경우 이 수를 push 한다.
    // 이렇게 해서 push된 숫자가, 1과 자기 자신 뿐이라면, 그 수는 소수이다.
    // 난 약수를 push하지 않고, 약수가 발견되면 바로 false를 리턴하도록 구성함

    // 위키백과 : 어떤 자연수 n이 소수임을 판정하기 위해선, 루트 n까지의 수 중 1을 제외하고 그 자연수의 약수가 있는지 확인하면 된다.
    // 이게 맞는지 실험해 보겠음

    let powedNum = Math.floor(Math.pow(n, 0.5));
    // 70368760954879 라는 큰 숫자도 위 처리를 거치면 8388608 로 줄어든다.
    // 진짜로 여기까지만 판단하면 된다면, 그 뒤를 처리하지 않아도 되므로 연산하는 양이 크게 줄어들 듯
    // 15485867 을 가지고 실험해 봤는데,
    // powedNum 처리하니 i 값이 3935까지 가고 true가 출력되었음  // powedNum 처리 없이는 15485865번 연산하고 true 출력
    // 따라서 정상 작동하는 것 같다.

    for (i = 2; i < powedNum; i++) {
      // 1부터 시작할 필요가 없음. 2부터 비교하면 됨. // 자기 자신도 넣을 필요 없음
      if (n % i === 0) {
        // 나머지가 0인 것들, 즉 약수들만을 체크해서, (여기에서 걸린다면 나누어 떨어지는 수, 즉 약수가 있다는 말이 된다.)
        return false;
      }
    }
    return true;
  };


  위에서 만든 primeTester 함수(소수인지 아닌지를 판단하는 함수를 별도로 구성함)를 사용하여 전체를 훑는 방식이다.
  그러나, 이 방식은 효율성 면에서 불리함.

  var primeSieve = function (start, end) {
    let result = [];

    for (let i = start; i <= end; i++) {
      if (primeTester(i)) {
        result.push(i);
      }
    }

    return result;
  };

  
  "Sieve of Eratosthenes(에라토스테네스의 체)" 라는 방식을 활용한 코드를 요구하므로, 이를 반영하여 작성
  배수를 처리하는 방법이 감이 오지 않아서, 구글검색으로 해결함...

  '에라토스테네스의 체' 개념 : 
  "소수를 구하고자 하는 범위 2~n이 있을 때, 
    2~n의 제곱근에 해당하는 범위 안의 소수의 배수들을 계속 제외하면, 결국 소수만 남는다"


*/
