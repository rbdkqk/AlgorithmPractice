/* 핸드폰 번호 가리기 (2020.11.27) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 내외 소요 

  1. 문제 설명
    
    프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
    전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 *으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.


  2. 제한사항

    phone_number는 길이 4 이상, 20이하인 문자열입니다.


  3. 입출력 예
    
    phone_number	: "01033334444"	
    return : "*******4444"
    
    phone_number	: "027778888"
    return : "*****8888"


  4. 복잡도 계산
    - 시간복잡도 : O(n)  - phone_number 문자열을 1회 반복문
    - 공간복잡도 : O(n)  - answer의 길이는 phone_number의 길이와 동일할 것
*/

function solution(phone_number) {
  var answer = "";
  let length = phone_number.length;
  for (let i = 0; i < phone_number.length; i++) {
    if (
      i === length - 1 ||
      i === length - 2 ||
      i === length - 3 ||
      i === length - 4
    ) {
      answer += phone_number[i];
    } else {
      answer += "*";
    }
  }
  return answer;
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  (1) 정규표현식을 활용하는 방법
    function hide_numbers(s) {
      return s.replace(/\d(?=\d{4})/g, "*");
    }

  (2) 정규표현식을 활용하는 방법
    function hide_numbers(s){
      var result = "*".repeat(s.length - 4) + s.slice(-4);
      return result;
    }

  (3) 반복문을 활용하는 방법
    function hide_numbers(s){
      var result = ""
      for(var i=0;i< s.length;i++){    
        result += i < s.length -4 ? "*" : s.charAt(i);
      }  
      return result;
    }

  (4) repeat를 활용하는 방법
    function hide_numbers(s){
      var num = s.slice(s.length-4, s.length);
      var hide = '*'.repeat(s.length-4);
      var result = hide + num;
      return result;
    }

*/
