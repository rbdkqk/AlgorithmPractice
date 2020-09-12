/* 프린터 (2020.09.13) 
  
  '스택/큐' 파트, 난이도 2단계  -  60분 내외 소요 

  1. 문제 설명
    
    일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 
    그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 
    이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 
    이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

      1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
      2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
      3. 그렇지 않으면 J를 인쇄합니다.

    예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면, C D A B 순으로 인쇄하게 됩니다.

    내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 
    위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

    현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와
    내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 
    내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.


  2. 제한사항

    현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
    인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
    location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며, 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.


  3. 입출력 예
    
    priorities : [2, 1, 3, 2]	
    location	: 2
    return : 1

    priorities : [1, 1, 9, 1, 1, 1]
    location	: 0
    return : 5


  4. 복잡도
    (1) 시간복잡도 : O(n)
      - priorities 배열을 uniqueKeyAndValueArray 배열로 변환하는 과정에서, priorities 배열을 순회할 것임.
      - while 반복문은 길어봐야 uniqueKeyAndValueArray 배열을 한바퀴정도 돌 것임 
      - (우선순위가 아니면 뒤로 빼고, 우선순위면 빼버리니까, uniqueKeyAndValueArray 배열 자체는 계속 줄어든다.)
      - getMaxOfArray 함수에서 Math.max를 사용하는데, 이것도 아마 O(n)일 것 같다.

    (2) 공간복잡도 : O(n) 
      - 답을 내기 위해, 주어져 있는 priorities 배열을 uniqueKeyAndValueArray 배열로 변환했음
      - uniqueKeyAndValueArray 배열은 2차원 배열이므로, priorities 배열과 길이가 같지만 각 요소는 길이가 2인 innerArray임.
      - 그러면 priorities 배열에 비해 공간을 2배 차지하지 않을까? 2n이면 상수 빼고 n일 것임.
      - queue 처리는 uniqueKeyAndValueArray 배열을 가지고 빼고 넣고를 반복하니까, 같은 위치에 쌓일 것임.

*/

function solution(priorities, location) {
  var answer = 0;

  // 나중에 값을 정확히 찾기 위해,
  let uniqueKeyAndValueArray = [];
  let uniqueKey = 0;

  // 2차원 배열 형태로, 고유 값을 집어넣도록 배열을 변경함.
  for (let i = 0; i < priorities.length; i++) {
    let innerArray = [];
    innerArray.push(uniqueKey, priorities[i]);
    uniqueKeyAndValueArray.push(innerArray);
    uniqueKey++;
  }

  let saveKeyAndValue = uniqueKeyAndValueArray[location];

  while (uniqueKeyAndValueArray.length > 0) {
    // 처음 값이 최우선순위라면,
    if (uniqueKeyAndValueArray[0][1] === getMaxOfArray(priorities)) {
      let result = uniqueKeyAndValueArray.shift(); // 인쇄함.
      priorities.shift();
      answer++;
      if (
        result[0] === saveKeyAndValue[0] &&
        result[1] === saveKeyAndValue[1]
      ) {
        // 인쇄하고 보니 답이면, 리턴하고 끝냄
        return answer;
      }
    } else {
      // 우선순위가 아니면, 앞에서 뽑아서 뒤에 넣음
      uniqueKeyAndValueArray.push(uniqueKeyAndValueArray.shift());
      priorities.push(priorities.shift());
    }
  }

  // return answer;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

/* 기록해 둘 사항 - 남들은 다 훨씬 단순하게 풀음. 제일 위에꺼 하나만 기록해 둠.

  function solution(priorities, location) {
    var list = priorities.map((t, i) => ({
      my: i === location,
      val: t,
    }));
    var count = 0;
    while (true) {
      var cur = list.splice(0, 1)[0];
      if (list.some((t) => t.val > cur.val)) {
        list.push(cur);
      } else {
        count++;
        if (cur.my) return count;
      }
    }
  }

*/
