/* 기능개발 (2020.10.18) 
  
  '스택/큐' 파트, 난이도 2단계  -  60분 정도 소요 


  1. 문제 설명
    
    프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
    또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.
    먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.


  2. 제한사항

    작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
    작업 진도는 100 미만의 자연수입니다.
    작업 속도는 100 이하의 자연수입니다.
    배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.


  3. 입출력 예
    
    progresses	                speeds	              return
    [93, 30, 55]	              [1, 30, 5]	          [2, 1]
    [95, 90, 99, 99, 80, 99]   	[1, 1, 1, 1, 1, 1]	  [1, 3, 2]
  

  4. 복잡도
    (1) 시간복잡도 : O(n^2)
      - 매번의 작업 실행시마다 progresses 배열에 그 작업 진척도를 누적하기 위해 이 배열을 한바퀴씩 계속 돌리는 작업을 해 줘야 한다.
      - 가령 진척도가 모두 1이고 작업속도도 1이라면, 나머지 99를 채우기 위해 아래 반복문을 99번 돌릴 것이고, 
      - 작업이 총 99개 있다면, 한 번 작업할때마다 반복문도 한 번 더 돌아가야 한다. 비효율적임
      
    (2) 공간복잡도 : O(n)
      - 하루에 하나씩 배포해야 하는 경우, answer 배열은 매개변수의 두 배열과 길이가 같을 것임.
      - 다른 변수들은 숫자를 누적하여 올리기만 해 주니까 큰 차이는 아니다

*/
function solution(progresses, speeds) {
  var answer = [];

  let index = 0;
  let count = 0;

  while (progresses.length > 0) {
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }
    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      count++;
    }
    if (count > 0) {
      answer[index] = count;
      index++;
      count = 0;
    }
  }
  return answer;
}

/* 기록해 둘 사항 

  다른 사람들은 남은 작업일수를 계산한 뒤 `Math.ceil()` 메소드를 활용하는 방법이 많았음
    - (MDN) Math.ceil() 함수는 주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자를 integer 로 반환합니다.
    - 복잡도 면에서 이 함수가 유리해 보인다 (내 함수는 하나하나 다 계산하기 때문)

  function solution(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    let maxDay = days[0];

    for(let i = 0, j = 0; i< days.length; i++){
        if(days[i] <= maxDay) {
            answer[j] += 1;
        } else {
            maxDay = days[i];
            answer[++j] = 1;    // ++j 이거는 무슨 뜻인지 모르겠다    // https://stackoverflow.com/questions/34250975/increment-operator-inside-array/34251125
        }
    }

    return answer;
  }


*/
