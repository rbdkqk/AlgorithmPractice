/* 0305 Programmers : (2) 위장  //  tag : Hash
    https://programmers.co.kr/learn/courses/30/lessons/42578


  스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

  예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 
    다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

  스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 
    서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.


  제한사항 : 
    clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
    스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
    같은 이름을 가진 의상은 존재하지 않습니다.
    clothes의 모든 원소는 문자열로 이루어져 있습니다.
    모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
    스파이는 하루에 최소 한 개의 의상은 입습니다.


  Example 1:
    Input: [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]
    Output: 5

  Example 2:
    Input: [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]
    Output: 3

*/

// 20:00 시작 -> 30분 고민했으나, 아래 경우의 수 찾기에서 실패
function solution(clothes) {
  var answer = 0;

  let obj = {};

  for (let i = 0; i < clothes.length; i++) {
    if (!obj[clothes[i][1]]) {
      obj[clothes[i][1]] = [clothes[i][0]];
    } else {
      obj[clothes[i][1]].push(clothes[i][0]);
    }
  }

  // 여기까지는 했는데, 경우의 수를 찾는 부분에서 실패함
  // 방법 : {청바지: 2, 셔츠: 3, 양말: 2} 에서, '각각 숫자에 1씩 더한 값을 다 곱한 후 마지막에 1을 빼주는 방법'
  // 해설 : (한 옷의 종류수 + 1(안 입는 경우의 수))* (한 옷의 종류수 + 1(안 입는 경우의 수)) - (아무것도 안 입는 경우의 수)

  let keys = Object.keys(obj);

  answer += 1;

  for (let j = 0; j < keys.length; j++) {
    answer *= obj[keys[j]].length + 1;
  }

  return answer - 1;
}

// ======================================================================================

// 다른 사람의 코드
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((obj, t) => {
        obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
        return obj;
      }, {})
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}

// ======================================================================================

// 다른 사람의 코드

// 해설 :
// 옷 파츠별로 경우의 수에 + 1 (아예 안입는 경우의 수)를 해서 다 곱해버린 다음,
// (answer = answer * (파츠별 경우의 수 + 1)) 아무것도 안입었을 때의 경우의 수 1개를 빼기 때문에,
// 1을 더하면서 다 곱한 후 answer - 1 을 리턴하는 모양이 나오는 것 같습니다.
function solution(clothes) {
  let answer = 1;
  const obj = {};
  for (let arr of clothes) {
    obj[arr[1]] = (obj[arr[1]] || 0) + 1;
  }

  for (let key in obj) {
    answer *= obj[key] + 1;
  }

  return answer - 1;
}
