/* 두 개 뽑아서 더하기 (2020.09.15) 
  
  '월간 코드 챌린지 시즌1' 파트, 난이도 1단계  -  3분 내외 소요 

  1. 문제 설명
    
    정수 배열 numbers가 주어집니다. 
    numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.


  2. 제한사항

    numbers의 길이는 2 이상 100 이하입니다.
    numbers의 모든 수는 0 이상 100 이하입니다.


  3. 입출력 예
    
    numbers	: [2,1,3,4,1]	
    result : [2,3,4,5,6,7]
    
    numbers	: [5,0,2,7]
    result : [2,5,7,9,12]
    

  4. 복잡도 계산
    - 시간복잡도 : O(n^2)  - 
        numbers 배열을 2번 돌리므로 n의 제곱임
        sort 메소드도 활용했지만 n의 제곱은 아니므로 계산에서는 제외
        매번 includes 메소드를 활용하므로, 시간복잡도에서 매우 불리할 것임. (n의 시간복잡도이겠지만...)
        set을 활용해서 중복을 없앨 생각을 했으나, 아직 잘 모르니까 쓰지 않음.

    - 공간복잡도 : O(n)  - 
        주어진 answer 변수의 빈 배열만 활용하므로, 주어지는 numbers 배열의 원소 개수에서 크게 벗어나지 않을 것임.

*/

function solution(numbers) {
  var answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) {
        continue;
      }
      let sum = numbers[i] + numbers[j];
      if (!answer.includes(sum)) {
        answer.push(sum);
      }
    }
  }

  return answer.sort((a, b) => a - b);
}

/* 기록해 둘 사항 - 다른 사람들의 풀이 방법

  set을 활용하고 있음 : 중복되는 값을 없애기 위한 처리가 아닐까?

  반복문을 두 번 돌리는건 어쩔 수 없는 듯?

*/
