/* 모의고사 (2020.09.05)

  '완전탐색' 파트, 난이도 1단계  -  40분 내외 소요 

  1. 문제 설명
    
    수포자는 수학을 포기한 사람의 준말입니다. 
    수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 
    
    수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.
      - 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
      - 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
      - 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

    1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 
      가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.


  2. 제한사항

    시험은 최대 10,000 문제로 구성되어있습니다.
    문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
    가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.


  3. 입출력 예
    
    answers	: [1,2,3,4,5]
    return : [1]
    
    answers	: [1,3,2,4,2]	
    return : [1,2,3]


  4. 복잡도 계산
    - 시간복잡도 : O(n)
        주어진 answers 배열을 slice 및 splice로 잘라가는 과정, 
        자른 뒤에 각 수포자마다의 나열되는 답안 배열과 비교하는 과정,
        Math.max 비교하는 과정 등을 고려할 때, O(n) 라고 생각함

        다만, 최종적으로 answer.sort 부분에서, 이 문제는 수포자가 3명이니 간단하게 끝났지만,
        수포자가 여러명이라면 이 부분에서 복잡도가 증가할 수 있을 듯.


    - 공간복잡도 : O(n)  
        각각의 수포자 함수마다, 비교를 위해 기존에 주어진 answers 배열을 splice 하여 arrayForCompare 배열에 넣어주고 있음
        비교를 위해 arrayForCompare 빈 배열을 선언해 주고, 그 안에 answers 배열을 쪼개서 push해서 arrayForCompare 배열을 구성하므로,
        O(n)에 해당할 듯.

*/

function solution(answers) {
  var answer = [];

  let obj = {};

  obj["1"] = supoja_1(answers.slice());
  obj["2"] = supoja_2(answers.slice());
  obj["3"] = supoja_3(answers.slice());

  let winner = Math.max(obj["1"], obj["2"], obj["3"]);

  for (let key in obj) {
    if (obj[key] === winner) {
      answer.push(Number(key));
    }
  }

  return answer.sort((a, b) => a - b);
}

// 수포자_1 을 위한 함수
function supoja_1(arr) {
  let result = 0;

  let answerOfSupoja_1 = [1, 2, 3, 4, 5];
  let arrayForCompare = [];

  while (arr.length > 0) {
    arrayForCompare.push(arr.splice(0, 5));
  }

  for (let i = 0; i < arrayForCompare.length; i++) {
    for (let j = 0; j < arrayForCompare[i].length; j++) {
      if (arrayForCompare[i][j] === answerOfSupoja_1[j]) {
        result++;
      }
    }
  }

  return result;
}

// 수포자_2 를 위한 함수
function supoja_2(arr) {
  let result = 0;

  let answerOfSupoja_2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let arrayForCompare = [];

  while (arr.length > 0) {
    arrayForCompare.push(arr.splice(0, 8));
  }

  for (let i = 0; i < arrayForCompare.length; i++) {
    for (let j = 0; j < arrayForCompare[i].length; j++) {
      if (arrayForCompare[i][j] === answerOfSupoja_2[j]) {
        result++;
      }
    }
  }

  return result;
}

// 수포자_3 을 위한 함수
function supoja_3(arr) {
  let result = 0;

  let answerOfSupoja_3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let arrayForCompare = [];

  while (arr.length > 0) {
    arrayForCompare.push(arr.splice(0, 10));
  }

  for (let i = 0; i < arrayForCompare.length; i++) {
    for (let j = 0; j < arrayForCompare[i].length; j++) {
      if (arrayForCompare[i][j] === answerOfSupoja_3[j]) {
        result++;
      }
    }
  }

  return result;
}

/* 기록해 둘 사항

  훨씬 간단하게 짠 사람들이 널렸음

  function solution(answers) {
    var answer = [];
    var a1 = [1, 2, 3, 4, 5];
    var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
    var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
    var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
    var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
    var max = Math.max(a1c,a2c,a3c);

    if (a1c === max) {answer.push(1)};
    if (a2c === max) {answer.push(2)};
    if (a3c === max) {answer.push(3)};


    return answer;
  }


  나도 수포자별로 구성이 거의 비슷하니까 이걸 하나로 합칠 수도 있을 것 같음

  발상 자체가 다르네 캬

*/
