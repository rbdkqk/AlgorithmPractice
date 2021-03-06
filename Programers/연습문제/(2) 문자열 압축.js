/* 문자열 압축 (2020.11.25) 
  
  '2020 KAKAO BLIND RECRUITMENT' 파트, 난이도 2단계  -  1시간 반 봤는데 못해서, 질문글로 올라온 다른사람 코드 제출함


  1. 문제 설명
    
    데이터 처리 전문가가 되고 싶은 어피치는 문자열을 압축하는 방법에 대해 공부를 하고 있습니다. 
    최근에 대량의 데이터 처리를 위한 간단한 비손실 압축 방법에 대해 공부를 하고 있는데, 
    문자열에서 같은 값이 연속해서 나타나는 것을 그 문자의 개수와 반복되는 값으로 표현하여 더 짧은 문자열로 줄여서 표현하는 알고리즘을 공부하고 있습니다.

    간단한 예로 aabbaccc의 경우 2a2ba3c(문자가 반복되지 않아 한번만 나타난 경우 1은 생략함)와 같이 표현할 수 있는데, 
    이러한 방식은 반복되는 문자가 적은 경우 압축률이 낮다는 단점이 있습니다.
    예를 들면, abcabcdede와 같은 문자열은 전혀 압축되지 않습니다. 
    
    어피치는 이러한 단점을 해결하기 위해 문자열을 1개 이상의 단위로 잘라서 압축하여 더 짧은 문자열로 표현할 수 있는지 방법을 찾아보려고 합니다.

    예를 들어, ababcdcdababcdcd의 경우 문자를 1개 단위로 자르면 전혀 압축되지 않지만, 
    2개 단위로 잘라서 압축한다면 2ab2cd2ab2cd로 표현할 수 있습니다. 
    
    다른 방법으로 8개 단위로 잘라서 압축한다면 2ababcdcd로 표현할 수 있으며, 이때가 가장 짧게 압축하여 표현할 수 있는 방법입니다.

    다른 예로, abcabcdede와 같은 경우, 문자를 2개 단위로 잘라서 압축하면 abcabc2de가 되지만, 
    3개 단위로 자른다면 2abcdede가 되어 3개 단위가 가장 짧은 압축 방법이 됩니다. 
    이때 3개 단위로 자르고 마지막에 남는 문자열은 그대로 붙여주면 됩니다.

    압축할 문자열 s가 매개변수로 주어질 때, 위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.


  2. 제한사항

    s의 길이는 1 이상 1,000 이하입니다.
    s는 알파벳 소문자로만 이루어져 있습니다.


  3. 입출력 예
    
    s : "aabbaccc"
    result : 7
    
    s : "ababcdcdababcdcd"
    result : 9

    s : "abcabcdede"
    result : 8

    s : "abcabcabcabcdededededede"
    result : 14

    s : "xababcdcdababcdcd"
    result : 17


  4. 복잡도
    (1) 시간복잡도 : O(n) - 
    (2) 공간복잡도 : O(1) - 

*/

function solution(s) {
  // 1시간 고민했는데 답을 찾지 못함
  // var answer = 0;
  // return answer;
  let min = cutStr(1, s).length;

  for (let i = 1; i < s.length - 1; i++) {
    let b = cutStr(i + 1, s).length;
    if (min > b) {
      min = b;
    }
  }

  return min;
}

function cutStr(num, s) {
  let temp = "";
  let zipTime = 1;
  let originS = s;

  // str.substr(시작 인덱스, 추출 갯수) :
  // substr은 시작 인덱스번호, 몇개를 추출할것인지를 입력받는 반면에

  // str.substring(시작 인덱스번호, 끝 인덱스번호) :
  // substring은 시작 인덱스 번호, 끝 인덱스번호를 입력받는다

  for (let i = 0; i < originS.length; i += num) {
    s = originS.substring(i, originS.length);
    let a = s.substr(0, num);
    let b = s.substr(num, num);

    if (a === b) {
      zipTime++;
    } else {
      if (zipTime !== 1) {
        temp += zipTime + "";
      }

      temp += a;
      zipTime = 1;
    }
  }

  return temp;
}
