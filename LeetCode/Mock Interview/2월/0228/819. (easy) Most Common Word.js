/*  0228 Mock Interview : 819. (easy) Most Common Word  //  tag : String

  Given a `paragraph` and a list of `banned` words, 
    return the 'most frequent word' that is not in the list of banned words.  
    It is guaranteed there is at least one word that isn't banned, and that the answer is unique.

  Words in the list of banned words are given in lowercase, and free of punctuation.  
    Words in the paragraph are not case sensitive.  
    The answer is in lowercase.


  Notes:
    1 <= paragraph.length <= 1000.
    0 <= banned.length <= 100.
    1 <= banned[i].length <= 10.
    The answer is unique, and written in lowercase 
      (even if its occurrences in `paragraph` may have uppercase symbols, and even if it is a proper noun.)
    `paragraph` only consists of letters, spaces, or the punctuation symbols !?',;.
    There are no hyphens or hyphenated words.
    Words only consist of letters, never apostrophes or other punctuation symbols.


  Example 1:
    Input: 
      paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
      banned = ["hit"]
    Output: "ball"
    Explanation: 
      "hit" occurs 3 times, but it is a banned word.
      "ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
      Note that words in the paragraph are not case sensitive,
      that punctuation is ignored (even if adjacent to words, such as "ball,"), 
      and that "hit" isn't the answer even though it occurs more because it is banned.

*/

/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */

// 실패함 - 문자열 처리(기호 제외하기)를 하지 못해서 못풀었다
var mostCommonWord = function (paragraph, banned) {
  let punctuationless = paragraph.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()] /g, ' ');
  punctuationless = punctuationless.replace('.', ' ');
  punctuationless = punctuationless.replace('!', ' ');
  punctuationless = punctuationless.replace(',', ' ');
  punctuationless = punctuationless.replace('?', ' ');

  let bannedMap = new Map();

  for (let bannedWord of banned) {
    if (bannedMap.has(bannedWord)) {
      continue;
    } else {
      bannedMap.set(bannedWord, true);
    }
  }

  let map = new Map();

  let splittedString = punctuationless.split(' ');

  for (let word of splittedString) {
    let lowercaseWord = word.toLowerCase();
    let value = map.get(lowercaseWord);

    if (bannedMap.has(lowercaseWord) || lowercaseWord === '') continue;

    if (!map.has(lowercaseWord)) {
      map.set(lowercaseWord, 1);
    } else {
      map.set(lowercaseWord, value + 1);
    }
  }
  console.log(map);
  let keys = map.keys();

  let count = 0;
  let answer = '';

  for (let eachKey of keys) {
    let value = map.get(eachKey);
    if (value > count) {
      count = value;
      answer = eachKey;
    }
  }

  return answer;
};

// ======================================================================================

// 재시도 : 실패
var mostCommonWord = function (paragraph, banned) {
  let bannedMap = new Map();

  for (let bannedWord of banned) {
    if (bannedMap.has(bannedWord)) {
      continue;
    } else {
      bannedMap.set(bannedWord, true);
    }
  }

  let wordMap = new Map();

  let word = '';

  for (let i = 0; i < paragraph.length; i++) {
    if (isPunctuation(paragraph[i]) === true) {
      if (bannedMap.has(word)) {
        continue;
      }

      let value = wordMap.get(word);
      if (wordMap.has(word)) {
        wordMap.set(word, value + 1);
      } else {
        wordMap.set(word, 1);
      }
      word = '';
    } else {
      word += paragraph[i];
    }
  }

  // console.log(wordMap.keys());
};

function isPunctuation(char) {
  let punctuationMap = new Set(['!', '?', ',', "'", ';', '.', ' ']);

  if (punctuationMap.has(char)) {
    return true;
  } else {
    return false;
  }
}

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript solution + 댓글 코드
const mostCommonWord = (paragraph, banned) => {
  const bannedSet = new Set(banned);
  const words = paragraph.toLowerCase().split(/\W+/);
  const map = {};
  let answer = { count: 0, word: '' };

  for (const w of words) {
    if (!bannedSet.has(w)) {
      if (map[w] == null) map[w] = 0;
      map[w]++;

      if (map[w] > answer.count) {
        answer.count = map[w];
        answer.word = w;
      }
    }
  }

  return answer.word;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] beats 99% | hashmap
var mostCommonWord = function (paragraph, banned) {
  const words = paragraph.toLowerCase().split(/[ !?',;.]/);
  const map = new Map();
  const set = new Set(banned);
  words.forEach((word) => map.set(word, map.has(word) ? map.get(word) + 1 : 1));
  set.forEach((banned) => {
    if (map.has(banned)) map.delete(banned);
  });

  let res = '',
    max = Number.MIN_SAFE_INTEGER;
  for (let [word, count] of map.entries()) {
    if (word) {
      res = count > max ? word : res;
      max = count > max ? count : max;
    }
  }
  return res;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Solution without using built-in functions or Regex - Time O(n) -  Space O(n)
const checkWordInWordCount = (
  wordCount,
  bannedWords,
  currentWord,
  result,
  maxCount
) => {
  if (currentWord in wordCount) {
    wordCount[currentWord] += 1;

    if (wordCount[currentWord] > maxCount && !bannedWords.has(currentWord)) {
      result = currentWord;
      maxCount = wordCount[currentWord];
    }
  } else {
    wordCount[currentWord] = 1;

    if (wordCount[currentWord] > maxCount && !bannedWords.has(currentWord)) {
      result = currentWord;
      maxCount = wordCount[currentWord];
    }
  }

  return [currentWord, result, maxCount];
};

const mostCommonWord = (paragraph, banned) => {
  const bannedWords = new Set(banned);
  const wordCount = {};
  const pLowerCased = paragraph.toLowerCase();

  let maxCount = 0;
  let result = '';

  let i = 0;
  let currentWord = '';

  while (i < pLowerCased.length) {
    if (pLowerCased.charCodeAt(i) >= 97 && pLowerCased.charCodeAt(i) <= 122) {
      currentWord += pLowerCased[i];

      if (currentWord.length > 0 && i === pLowerCased.length - 1) {
        [currentWord, result, maxCount] = checkWordInWordCount(
          wordCount,
          bannedWords,
          currentWord,
          result,
          maxCount
        );
      }

      i += 1;
    } else {
      if (currentWord.length > 0) {
        [currentWord, result, maxCount] = checkWordInWordCount(
          wordCount,
          bannedWords,
          currentWord,
          result,
          maxCount
        );

        currentWord = '';
        i += 1;
      } else {
        i += 1;
      }
    }
  }

  return result;
};
