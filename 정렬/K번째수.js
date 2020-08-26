/* K번째수 (2020.08.27) 
  
  '정렬' 파트, 난이도 1단계  -  10분 소요 

  1. 문제 설명

    배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

    예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

    array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
    1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
    2에서 나온 배열의 3번째 숫자는 5입니다.
    배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.


  2.제한사항

    array의 길이는 1 이상 100 이하입니다.
    array의 각 원소는 1 이상 100 이하입니다.
    commands의 길이는 1 이상 50 이하입니다.
    commands의 각 원소는 길이가 3입니다.


  3. 입출력 예

    array	    [1, 5, 2, 6, 3, 7, 4]
    commands	[[2, 5, 3], [4, 4, 1], [1, 7, 3]]
    return    [5, 6, 3]


  4. 기록해 둘 사항

    - 문제의 요구조건을 정확히 파악해야 함. (배열의 index로 주어진 문제가 아니라, 현실의 순서를 감안할 것을 요구함)
    - 테스트케이스를 통과했으나, 채점해보니 2번 테스트가 실패로 뜸. 테스트케이스가 공개된게 아닌거같아서 왜 틀렸는지 모르겠음
*/

function solution(array, commands) {
  var answer = [];

  for (let i = 0; i < commands.length; i++) {
    answer.push(
      array.slice(commands[i][0] - 1, commands[i][1]).sort()[commands[i][2] - 1]
    );
  }

  return answer;
}
