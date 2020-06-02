/* 
  <문제 설명>
    수많은 마라톤 선수들이 마라톤에 참여하였습니다. 
    단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

    마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 
    완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

  <제한사항>
    마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
    completion의 길이는 participant의 길이보다 1 작습니다.
    참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
    참가자 중에는 동명이인이 있을 수 있습니다. 
*/



/* 시도 (1) : 작은 테스트케이스는 통과하지만, 채점에서 실패함.

function solution(participant, completion) {
  var answer = '';    
  
  for (let i = 0; i < completion.length; i++) {
      for (let j = 0; j < participant.length; j++) {
          if (completion[i] === participant[j]) {
              participant.splice(j, 1);
          }
      }
  }
  
  answer = participant[0];
  
  return answer;

} 

*/


/* 시도 (2) : 통과됨 */

function solution(participant, completion) {
  var answer = '';    
    
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if(participant[i] !== completion[i]) {
        answer = participant[i];
        break;
    }
  }    
    
  return answer;
}


/* 추가 공부할만한 내용들 정리

  arr.length 식은 매번 루프때마다 메소드를 실행시키니 length 선언한 값을 변수로 뺀 후 그 변수를 사용하면 성능이 조금 더 향상합니다

  단순 반복문은 끝날 때 까지 계속 반복시키니 비효율적인겁니다. 
  값 찾으면 그 이후값들은 반복문이 계속 돌아갈 필요가 없으니까요. 
  sort 써서 할 거면 Array.find() 등이 바람직하죠.

  for in 코드는 성능을 하락 시키는 주요 코드인데 이런 코드가 상당히 많군요. 
  실제 테스트에서 성능 역시 채점 기준으로 보는데 캐쉬 방식보다 30%가량 성능이 늦게 측정되네요.

  for ... in은 성능을 하락시킨다는 의미보다는 객체 내의 프로퍼티 속성 중 enumerable: true인 모든 프로퍼티를 순회하여 검색하는 용도이기 때문에 적합하지 않습니다. 
  최근의 그린 브라우저는 배열에 대해 for ... in을 사용해도 오류가 나지 않지만, Old IE의 경우에는 배열 인덱스 외에 검출되는 프로퍼티가 있기 때문에 undefined 와 같은 오류가 발생합니다. 
  따라서, 배열에 대해서는 for ... in 구문 보다는 for를 사용하거나 ES6의 forEach 함수를 사용하는 것을 권장합니다.


  (다른 사람의 답 - 한 줄로 끝냄)
    var solution=(_,$)=>_.find(_=>!$[_]--,$.map(_=>$[_]=($[_]|0)+1))
      해석 : var solution=(participant,completion)=>participant.find(name=>!completion[name]--,completion.map(name=>completion[name]=(completion[name]|0)+1))
      해석 : 완주자 배열을 {이름:완주자배열에 등장하는 횟수}로 맵핑하고, 그 맵에 참가자 이름 하나씩 넣어서 찾아볼때마다 횟수 떨어뜨려서 횟수 0나오는 놈 찾아뱉는 함수같네요


  
  (다른 사람의 답 - 이해가 잘 안 됨 : 'dic[t] === 0이면 , 0은 falsy하니까 else로 가는거네요' )  
    function solution(participant, completion) {
      var dic = completion.reduce((obj, t)=> (obj[t]= obj[t] ? obj[t]+1 : 1 , obj) ,{});
      return participant.find(t=> {
        if(dic[t])
          dic[t] = dic[t]-1;
        else 
          return true;
      });
    }

*/