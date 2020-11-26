/* 이상한 문자 만들기 (2020.09.09) 
  
  '연습문제' 파트, 난이도 1단계  -  10분 내외 소요 

  1. 문제 설명
    
    문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 
    각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 
    각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

  2. 제한사항

    문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
    첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.


  3. 입출력 예
    
    s	: "try hello world"
    return : "TrY HeLlO WoRlD"
    

  4. 복잡도 계산
    - 시간복잡도 : O(n)  -
        for 반복문이 2번 사용됐지만, 실제로는 s 문자열을 1회 돌릴 뿐임
        다만 그 전에 split 처리를 해 주느라 한바퀴 돌고, 마지막에 slice 처리에서 한 번 더 돌 것임.

    - 공간복잡도 : O(1)  - 주어진 answer 변수에 한글자씩 계속 누적시키고 있으므로, 큰 차이는 없을 듯.
*/

function solution(s) {
  var answer = "";

  let splittedString = s.split(" ");

  for (let i = 0; i < splittedString.length; i++) {
    for (let j = 0; j < splittedString[i].length; j++) {
      if (j % 2 !== 0) {
        answer = answer + splittedString[i][j].toLowerCase();
      } else {
        answer = answer + splittedString[i][j].toUpperCase();
      }
    }
    answer = answer + " ";
  }

  answer = answer.slice(0, answer.length - 1);

  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  (1) 정규표현식을 사용한 방법

    function toWeirdCase(s){
      return s.toUpperCase().replace(/(\w)(\w)/g, function(a){return a[0].toUpperCase()+a[1].toLowerCase();})
    }


  (2) split() => map() 을 활용한 방법

    function toWeirdCase(s) {
      return s.split(' ').map((a) => {
        return a.split('').map((b, i) => {
          return (i % 2 === 0) ? b.toUpperCase() : b.toLowerCase();
        }).join('');
      }).join(' ');
    }


  (3) parseInt() 메소드를 활용하는 방식

    function toWeirdCase(s){
      var result = "";

      for(var word of s.split(" ")) {
        for(var i in word) {
          result += word[i][parseInt(i) % 2 == 0 ? "toUpperCase" : "toLowerCase"]();
        }
        result += " ";
      };

      return result.slice(0, -1);
    }

*/
