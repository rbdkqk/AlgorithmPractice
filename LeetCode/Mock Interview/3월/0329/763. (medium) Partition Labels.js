/*  0329 Mock Interview : 763. (medium) Partition Labels  // tag : Two Pointers, Greedy

  A string S of lowercase English letters is given. 

  We want to partition this string into as many parts as possible 
    so that each letter appears in at most one part, 
    and return a list of integers representing the size of these parts.


  Notes:
    S will have length in range [1, 500].
    S will consist of lowercase English letters ('a' to 'z') only.


  Example 1:
    Input: S = "ababcbacadefegdehijhklij"
    Output: [9,7,8]
    Explanation:
      The partition is "ababcbaca", "defegde", "hijhklij".
      This is a partition so that each letter appears in at most one part.
      A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

*/

/**
 * @param {string} S
 * @return {number[]}
 */

// 실패 : 문제 자체를 해석하지 못해서, 구글에 있는 한글 풀이의 설명 부분을 참고했음 - 문제의 요구조건은 풀이 글의 설명을 보고 나서야 겨우 알아들었는데, 실제 구현에는 실패함
// 참고 링크 : https://kogle.tistory.com/248
// 주어진 문자열을 최대한 많이 자르는데 각 잘라진 문자열은 그 안에만 사용되는 문자로만 존재해야 한다. - "A에 들어 있는 문자는 B에나 다른 잘라진 조각에는 들어 있으면 안된다."

// (아래 코드는 문제를 잘못 이해해서 작성한 코드)
var partitionLabels = function (S) {
  let answer = [];

  let index = 0;

  while (index < S.length) {
    let currentChar = S[index];
    let lastIndex = S.lastIndexOf(currentChar);
    index = lastIndex + 1;
    answer.push(index);
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution with Greedy
/* String.prototype.charCodeAt() : 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환합니다.
  유니코드는 모든 시스템에서 일관되게 문자를 표현하기 위한 산업표준이다.
  charCodeAt은 주어진 index에 해당하는 유니코드 값을 리턴하는데 이 값은 unicode가 지원되는 모든 시스템에서 동일한 문자를 가르킨다.
  charAt 는 index에 해당하는 문자를 리턴하고, chartCodeAt은 유니코드 값을 리턴하는 차이가 있다.
*/
var partitionLabels = function (S) {
  const last = new Array(26).fill(-1);
  const partitions = [];
  let anchor = 0;
  let end = 0;

  for (let i = 0; i < S.length; i++) {
    last[S.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
    // 'a'.charCodeAt(0)  // 97
    // 'z'.charCodeAt(0)  // 122
    // 'z'.charCodeAt(0) - 'a'.charCodeAt(0)  // 25
    // 'a'.charCodeAt(0) - 'a'.charCodeAt(0)  // 0
    // "유니코드를 사용해서, 각 알파벳을 last 배열의 index에 적절히 배치하기 위한 방법"
  }

  /*
    example
      a b c c a d d b e f f e
    
          a b c d e  f  
    last=[4,7,3,6,11,10]
    
    i=0  -> end=max(0,4)=4     anchor=0
    i=1  -> end=max(4,7)=7     anchor=0
    i=2  -> end=max(7,3)=7     anchor=0
    i=3  -> end=max(7,3)=7     anchor=0
    i=4  -> end=max(7,3)=7     anchor=0
    i=5  -> end=max(7,6)=7     anchor=0
    i=6  -> end=max(7,6)=7     anchor=0
    i=7  -> end=max(7,7)=7     anchor=8   partitions.push(7 - 0 + 1)
    i=8  -> end=max(7,11)=11   anchor=8
    i=9  -> end=max(11,10)=11  anchor=8
    i=10 -> end=max(11,10)=11  anchor=8
    i=11 -> end=max(11,11)=11  anchor=12  partitions.push(11 - 8 + 1)
    
    partitions = [8, 4]
  */
  for (let i = 0; i < S.length; i++) {
    end = Math.max(end, last[S.charCodeAt(i) - 'a'.charCodeAt(0)]);
    if (i === end) {
      partitions.push(i - anchor + 1);
      anchor = i + 1;
    }
  }

  return partitions;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution
var partitionLabels = function (S) {
  if (!S) return '';

  const lastIndicies = {};

  for (let i = 0; i < S.length; i++) {
    lastIndicies[S[i]] = i;
  }

  let lastIndex = lastIndicies[S[0]];
  let startIndex = 0;
  const partitionLengths = [];

  for (let i = 0; i < S.length; i++) {
    if (i === lastIndex) {
      partitionLengths.push(i - startIndex + 1);
      startIndex = i + 1;
      lastIndex = lastIndicies[S[i + 1]];
    } else {
      lastIndex = Math.max(lastIndex, lastIndicies[S[i]]);
    }
  }

  return partitionLengths;
};

// ======================================================================================

// Javascript - Easy to Understand

//  012345  <- Indexes
// 'abacdc' <- Sample input
var partitionLabels = function (S) {
  if (!S || S.length < 0) return [];

  // R
  const lastIndexMap = {}; // {a:2, b:1, c:5, d:4} <- Sample `lastIndexMap`
  for (let i = 0; i < S.length; i++) {
    const ch = S[i];
    lastIndexMap[ch] = i;
  }

  const result = [];

  // Setup for handling the first partition
  let startIndex = 0; // Keeps track of the begining of the current partition
  let startChar = S[startIndex];
  let stopIndex = lastIndexMap[startChar]; // Keeps track of the end of the current partition

  // For each start of a new partition..
  while (startIndex < S.length) {
    // Keep expanding the `stopIndex` for each character between
    // `startIndex` and the expanding `stopIndex`
    for (let i = startIndex; i < stopIndex; i++) {
      const currentChar = S[i];
      const currentCharLastIndex = lastIndexMap[currentChar];
      stopIndex = Math.max(stopIndex, currentCharLastIndex);
    }

    // Once we've fully expanded the current partition, save it to the result
    result.push(stopIndex - startIndex + 1);

    // And set up the next partion
    startIndex = stopIndex + 1;
    startChar = S[startIndex];
    stopIndex = lastIndexMap[startChar];
  }

  return result;
};
