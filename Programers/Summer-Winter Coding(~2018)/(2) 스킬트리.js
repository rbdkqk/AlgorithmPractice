/* 스킬트리 (2020.09.15) 
  
  'Summer-Winter Coding(~2018)' 파트, 난이도 2단계  -  50분 내외 소요 

  1. 문제 설명
    
    선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

    예를 들어 선행 스킬 순서가 스파크 → 라이트닝 볼트 → 썬더일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

    위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 스파크 → 힐링 → 라이트닝 볼트 → 썬더와 같은 스킬트리는 가능하지만, 썬더 → 스파크나 라이트닝 볼트 → 스파크 → 힐링 → 썬더와 같은 스킬트리는 불가능합니다.

    선행 스킬 순서 skill과 유저들이 만든 스킬트리1를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.


  2. 제한사항

    스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
    스킬 순서와 스킬트리는 문자열로 표기합니다.
    예를 들어, C → B → D 라면 CBD로 표기합니다
    선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
    skill_trees는 길이 1 이상 20 이하인 배열입니다.
    skill_trees의 원소는 스킬을 나타내는 문자열입니다.
    skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.


  3. 입출력 예
    
    skill : "CBD"
    skill_trees	: ["BACDE", "CBADF", "AECB", "BDA"]
    return : 2

    skill : "CBD"
    skill_trees	: ["BACDE", "CBADF", "AECB", "BDA", "AQWER"]
    return : 3 (마지막의 것은 선행스킬과 일치하는 것이 하나도 없으므로, 찍을 수 있는 스킬트리임)


  4. 복잡도 계산
    - 시간복잡도 : O(n^2)  - skill_trees 배열을 1회 돌리고, skill과 비교하므로, 반복문이 2개가 겹쳐서 진행된다.
    - 공간복잡도 : O(n)  - filteredSkillTree 배열에, skill_trees 안의 값 개수만큼, 필터링을 거친 값을 새롭게 누적시킴.

    */
function solution(skill, skill_trees) {
  var answer = 0;

  let skills = skill.split("");

  let filteredSkillTree = [];

  for (let m = 0; m < skill_trees.length; m++) {
    filteredSkillTree.push("");
  }
  debugger;
  for (let i = 0; i < skill_trees.length; i++) {
    for (let j = 0; j < skill_trees[i].length; j++) {
      if (skills.indexOf(skill_trees[i][j]) !== -1) {
        filteredSkillTree[i] = filteredSkillTree[i] + skill_trees[i][j];
      }
    }
  }
  console.log(filteredSkillTree);
  for (let k = 0; k < filteredSkillTree.length; k++) {
    if (filteredSkillTree[k] === "") {
      answer++;
      continue;
    }
    if (
      skill.indexOf(filteredSkillTree[k]) !== -1 &&
      skill[0] === filteredSkillTree[k][0]
    ) {
      answer++;
    }
  }

  return answer;
}

/* 기록해 둘 사항 

  (1) 주어진 스킬트리 중, 선행스킬과 '전혀 연관없는' 스킬트리는 통과되어야 하는 것을 간과했었음

  (2) 주어진 스킬트리 중, 선행스킬과 1개만 연관있다면 통과되어야 하는데, 이 부분이 아직 구현되지 않음.

*/
