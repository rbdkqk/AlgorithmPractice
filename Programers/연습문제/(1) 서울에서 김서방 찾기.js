/* 서울에서 김서방 찾기 (2020.09.08) 
  
  '연습문제' 파트, 난이도 1단계  -  5분 내외 소요 

  1. 문제 설명
    
    String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 
    김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요. 
    seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.


  2. 제한사항

    seoul은 길이 1 이상, 1000 이하인 배열입니다.
    seoul의 원소는 길이 1 이상, 20 이하인 문자열입니다.
    Kim은 반드시 seoul 안에 포함되어 있습니다.


  3. 입출력 예
    
    seoul	: [Jane, Kim]		
    return : "김서방은 1에 있다"
    

  4. 복잡도 계산
    - 시간복잡도 : O(n)  - array.indexOf()를 사용하든, for 반복문을 돌리든, 어차피 O(n)일 것임.
    - 공간복잡도 : O(1)  - 별다른 공간을 더 차지하지는 않음. / answer는 주어진 값이기에 지우지 않고 활용함 / kimIndex는 사실 필요없는 변수

*/

function solution(seoul) {
  var answer = "";
  let kimIndex = seoul.indexOf("Kim");
  answer = `김서방은 ${kimIndex}에 있다`;
  return answer;
}

/* 기록해 둘 사항 

  indexOf 메소드를 쓰는 방법인데, for문을 돌리는 방법 역시 O(n)의 시간복잡도를 가질 것임

  이진탐색을 생각해 봤으나, 배열 안의 각 값이 모두 문자열이므로, 
  이진탐색을 어떻게 접근해야 하는지가 의문임

  결국은 for를 돌려야 하는 것이 아닐까?

*/
