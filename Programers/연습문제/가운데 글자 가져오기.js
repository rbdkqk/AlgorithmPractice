/* 가운데 글자 가져오기 (2020.08.28) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 이내 소요 

  1. 문제 설명
    
    단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.


  2. 제한사항

    s는 길이가 1 이상, 100이하인 스트링입니다.


  3. 입출력 예
    
    s	: 'abcde'	
    return : 'c'
    
    s : 'qwer'
    return : 'we'

*/

function solution(s) {
  var answer = "";

  if (s.length % 2 === 0) {
    answer = answer + s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    answer = s[Math.floor(s.length / 2)];
  }

  return answer;
}

/* 기록해 둘 사항

  String.prototype.substr() 메소드를 활용한 답안이 몇 있었음.
  그러나, MDN에서는 이 메소드를 사용하지 말 것을 권장하는 것으로 보임.

*/
