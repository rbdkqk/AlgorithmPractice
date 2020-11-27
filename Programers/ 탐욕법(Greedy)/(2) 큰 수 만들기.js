/* 큰 수 만들기 (2020.11.26) 
  
  ' 탐욕법(Greedy)' 파트, 난이도 2단계  -  1시간 보고 실패함 - 다른 분들 글 참고함(스택 활용하는 방법)
    - https://taesung1993.tistory.com/46
    - https://velog.io/@kimtaeeeny/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%ED%81%B0-%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0-javascript


  1. 문제 설명
    
    어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

    예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 
    이 중 가장 큰 숫자는 94 입니다.

    문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. 
    number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.


  2. 제한사항

    number는 1자리 이상, 1,000,000자리 이하인 숫자입니다.
    k는 1 이상 number의 자릿수 미만인 자연수입니다.


  3. 입출력 예
    
    number : "1924"
    k : 2
    return : "94"
    
    number : "1231234"
    k : 3
    return : "3234"

    number : "4177252841"
    k : 4
    return : "775841"


  4. 복잡도 계산
    - 시간복잡도 : O(n^2) - number.length까지 for 반복문 * while 반복문이 거의 number.length 만큼 실행될 가능성도 있지 않나?
        가령, "100002" / 4 라고 하면, 답은 "12"일 것임
        1부터 0 0 0 0 까지는 그냥 push (number.length까지 for 반복문이므로 여기서 이미 O(n)에 해당할 듯)
        마지막의 2에 관하여, while 반복문 안의 조건은, 0, 0, 0, 0 4번 다 만족해서, 4번 다 while문 안에 들어가서 stack.pop();할 것임. 
        그러면 약간의 차이는 있겠지만 사실상 'for 반복문 * while 반복문'이니까 O(n^2)일 수 있다고 생각함.

    - 공간복잡도 : O(n) - stack 배열은 최대 number.length까지 길어질 수 있다.
*/

function solution(number, k) {
  let stack = [];
  for (let i = 0; i < number.length; i++) {
    let now = number[i];

    while (k > 0 && stack[stack.length - 1] < now) {
      stack.pop();
      k--;
    }
    stack.push(now);
  }

  // k가 남은채로 반복문이 끝날수도 있음(k--; 부분이 항상 실행되는 것은 아니니까)
  // 예시 : "10000" / 2  => "100"
  // 위의 예시에서, 1이 일단 push되고, 그 뒤는 다 0이므로 stack의 마지막 값(1)보다 작다
  // 그래서 k가 줄어들지 않은 채로 끝까지 가게 됨
  // 이 경우 stack은 [ 1,0,0,0,0 ] 이므로, 뒤에서부터 k개만큼 제외한다
  stack.splice(stack.length - k, k);
  // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
  let answer = stack.join("");

  return answer;
}

// ============================================================================

/*  1차 시도 : 실패 (문제를 잘못 이해함)

  큰 순서대로 재배열해서 풀려고 했는데 실패한다
  지금 있는 순서를 유지해야 하는 듯
  1개씩 지워나가면서, '그 때의 가장 큰 수'와 '하나 줄인 k를 재귀 연산'에 넣고 다시 돌린다

*/

// ============================================================================

/*  2차 시도 : 실패 (1,11,12만 통과되고 나머지 실패 / 7,8,9,10은 시간도 초과됨)

  function solution(number, k) {
    var answer = "";

    let duplicatedNumber = number;
    let duplicatedK = k;
    
    while (duplicatedK > 0) {
      let duplicatedNumberArray = duplicatedNumber.split("");
      let array = [];
        
      if (duplicatedNumberArray[0] === '9') {
          answer = answer + duplicatedNumber[0];
          duplicatedNumber = duplicatedNumber.slice(1);
          k--;
          continue;
      }

      for (let i = 0; i < duplicatedNumberArray.length; i++) {
        array.push(
          Number(
            duplicatedNumberArray
              .slice(0, i)
              .concat(duplicatedNumberArray.slice(i + 1))
              .join("")
          )
        );
      }

      duplicatedNumber = String(Math.max.apply(null, array));
      duplicatedK--;
      if (duplicatedK === 0) {
        answer = answer + String(duplicatedNumber);
      }
    }

    return answer;
  }

*/
