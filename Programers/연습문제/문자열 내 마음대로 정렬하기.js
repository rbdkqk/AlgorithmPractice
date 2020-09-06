/* 문자열 내 마음대로 정렬하기 (2020.09.07) 
  
  '연습문제' 파트, 난이도 1단계  -  15분

  1. 문제 설명
    
    문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 
    각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 
    
    예를 들어 strings가 [sun, bed, car]이고 n이 1이면,
    각 단어의 인덱스 1의 문자 u, e, a로 strings를 정렬합니다.


  2. 제한사항

    strings는 길이 1 이상, 50이하인 배열입니다.
    strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
    strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
    모든 strings의 원소의 길이는 n보다 큽니다.
    인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.


  3. 입출력 예
    
    string : [sun, bed, car]
    n : 1
    return : [car, bed, sun]
    
    string : [abce, abcd, cdx]	
    n : 2
    return : [abcd, abce, cdx]
    

  4. 복잡도 계산

    - 시간복잡도 : O(nlogn) -  (참고링크 : https://falsy.me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-3-%EC%A0%95%EB%A0%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-1/)
          v8엔진에서(크롬) 자바스크립트의 .sort() 메소드는 퀵 정렬로 구현되어 있음. 
          최악의 경우 시간 복잡도는 O(n2)가 되는데, 그럴 확률이 정말 낮으므로, 예외적으로 O(nlogn)으로 이야기 한다고 한다.

    - 공간복잡도 : O(n)  -
          주어지는 strings 배열의 크기만큼, 이를 정렬한 뒤 그와 동일한 answer 배열에 넣어 return하는 중
          문제에서 answer를 빈 배열로 주고 이걸 리턴하도록 정해놓고 시작해서 그런 것인데,
          사실 strings.sort()를 곧바로 리턴하면 answer 배열 자리를 쓰지 않아도 될 듯

*/

function solution(strings, n) {
  var answer = [];

  answer = strings.sort(function (a, b) {
    if (a[n] < b[n]) {
      return -1;
    }
    if (a[n] > b[n]) {
      return 1;
    }
    if (a[n] === b[n]) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
  });

  return answer;
}
