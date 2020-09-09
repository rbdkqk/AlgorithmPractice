/* 다리를 지나는 트럭 (2020.09.10) 
  
  '스택/큐' 파트, 난이도 2단계  -  60분 정도 소요 


  1. 문제 설명
    
    트럭 여러 대가 강을 가로지르는 일 차선 다리를 정해진 순으로 건너려 합니다. 
    모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 
    트럭은 1초에 1만큼 움직이며, 다리 길이는 bridge_length이고 다리는 무게 weight까지 견딥니다.
    ※ 트럭이 다리에 완전히 오르지 않은 경우, 이 트럭의 무게는 고려하지 않습니다.

    예를 들어, 길이가 2이고 10kg 무게를 견디는 다리가 있습니다. 
    무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.
      => 따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.


    경과 시간	    다리를 지난 트럭	    다리를 건너는 트럭	       대기 트럭

      0	          []	                []	                [7,4,5,6]
      1~2	        []	                [7]	                [4,5,6]
      3	          [7]     	          [4]	                [5,6]
      4	          [7]	                [4,5]	              [6]
      5	          [7,4]	              [5]	                [6]
      6~7	        [7,4,5]	            [6]	                []
      8	          [7,4,5,6]	          []      	          []


    solution 함수의 매개변수로 다리 길이 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭별 무게 truck_weights가 주어집니다. 
    이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.


  2. 제한사항

    bridge_length는 1 이상 10,000 이하입니다.
    weight는 1 이상 10,000 이하입니다.
    truck_weights의 길이는 1 이상 10,000 이하입니다.
    모든 트럭의 무게는 1 이상 weight 이하입니다.


  3. 입출력 예
    
    bridge_length	: 2
    weight : 10
    truck_weights : [7,4,5,6]
    return : 8
    
    bridge_length	: 100
    weight : 100
    truck_weights : [10]
    return : 101

    bridge_length	: 100
    weight : 100
    truck_weights : [10,10,10,10,10,10,10,10,10,10]
    return : 110

  
  4. 복잡도
    (1) 시간복잡도 : O(n) (??)
      - 최선의 경우는, '주어진 트럭이 모두 올라가도 무게가 견딜 수 있어서, 모든 트럭이 큰 차이 없이 다 통과될 경우'임 (이러면 bridge_length에서 트럭 수만큼 좀 더 늘어날 뿐임)
      - 최악의 경우는, '최대무게와 각 트럭의 무게가 같아서, 하나의 트럭이 모두 다 지나간 뒤에야 그 다음 트럭이 비로소 올라갈 수 있는 경우'임
      - 위와 같은 경우가 매 트럭마다 반복된다면, bridge_length 만큼의 처리를 각각의 트럭마다 모두 해 줘야 한다.
      - 가령, 위 예시 중, "bridge_length 100 / 무게 한도 10 / truck_weights : [10,10,10,10,10,10,10,10,10,10]" 인 경우,
      - truck_weights 배열의 각 트럭마다, bridge_length의 100칸을 모두 이동한 뒤에야, 그 다음 트럭이 들어올 수 있음
      - 그러면 위 코드의 while 반복문이, 트럭 한대마다 bridge_length만큼 돌아야 한다. (위 예시에서는 10 x 100)
      - 문제는, 이런 경우의 복잡도를 O(n)으로 보는 것이 맞는지를 잘 모르겠음.

    (2) 공간복잡도 : O(n)
      - 처리를 위해 여러개의 배열을 선언하고 계속 shift push 처리하지만, 
      - 각 배열의 최대 길이는 최초 주어진 트럭의 수(truck_weights 배열) 이내일 것임
      - crossingTrucksCount 객체의 각 요소의 최대 개수 및 그 값 역시, 매개변수로 주어진 값 안에서만 존재할 것임.

*/

function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  let trucksNumber = truck_weights.length;
  let crossingTrucks = []; // 현재 건너고 있는 트럭들 (순서대로 push됨)
  let crossingTrucksCount = {}; // 현재 건너고 있는 트럭들이 몇 칸 갔는지
  let crossedTrucks = []; // 다 건넌 트럭들 (순서대로 push됨)
  let TruckCount = 1; // 각 트럭을 구별하기 위해서, 번호를 붙여주기 위한 변수 (트럭 무게가 같은 경우, crossingTrucksCount 객체 안에서 구분이 안 되어서 값이 누적되어 버린다.)

  while (crossedTrucks.length < trucksNumber) {
    for (let truck in crossingTrucksCount) {
      crossingTrucksCount[truck]++;
      if (crossingTrucksCount[truck] > bridge_length) {
        crossedTrucks.push(crossingTrucks.shift());
        delete crossingTrucksCount[truck];
      }
    }

    let currentWeight = crossingTrucks.reduce((a, b) => a + b, 0);
    if (currentWeight <= weight && currentWeight + truck_weights[0] <= weight) {
      let startingTruck = truck_weights.shift();
      crossingTrucks.push(startingTruck);
      crossingTrucksCount[`${TruckCount} : ` + startingTruck] = 1;
      TruckCount++;
    }

    answer++;
  }

  return answer;
}

//  (테스트를 돌려보기 위해, 테스트케이스를 복사해 두었음)
//  solution(2, 10, [7,4,5,6])
//  solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
//  solution(100, 100, [10,10,10,10,10,10,10,10,10,10])

/* 기록해 둘 사항 

  건너기 전의 트럭 배열(truck_weights), 건너는 중의 트럭 배열(crossingTrucks), 다 건넌 트럭들의 배열(crossedTrucks)

  위와 같이 각 배열에서 값을 shift, push 하여 처리했음

  앞의 두 배열은 Queue, 마지막의 다 건넌 배열은 stack에 가까운 형태인 것 같다.

  다만, 실제로 그러한지는 의문임. 그냥 shift push를 사용했을 뿐이니까.

*/
