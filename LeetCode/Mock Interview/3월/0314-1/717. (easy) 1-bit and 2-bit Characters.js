/*  0314-1 Mock Interview : 717. (easy) 1-bit and 2-bit Characters  // tag : Array

  We have two special characters. 
    The first character can be represented by one bit 0. 
    The second character can be represented by two bits (10 or 11).

  Now given a string represented by several bits.
    Return whether the last character must be a one-bit character or not. 
    The given string will always end with a zero.


  Notes:
    1 <= len(bits) <= 1000.
    bits[i] is always 0 or 1.


  Example 1:
    Input: bits = [1, 0, 0]
    Output: True
    Explanation: 
      The only way to decode it is two-bit character and one-bit character. 
      So the last character is one-bit character.
    
  Example 2:
    Input: bits = [1, 1, 1, 0]
    Output: False
    Explanation: 
      The only way to decode it is two-bit character and two-bit character. 
      So the last character is NOT one-bit character.

*/

/**
 * @param {number[]} bits
 * @return {boolean}
 */

// 성공 : 25분 소요 (반복문의 내용이 필요 이상으로 복잡하다)
// Runtime: 80 ms
// Memory Usage: 39.8 MB
var isOneBitCharacter = function (bits) {
  let lengthLeft = bits.length;

  for (let i = 0; i < bits.length; i++) {
    if (lengthLeft === 1) {
      return true;
    } else if (lengthLeft === 2) {
      if (bits[bits.length - 2] === 0 && bits[bits.length - 1] === 0) {
        return true;
      } else {
        return false;
      }
    }

    if (bits[i] === 1) {
      i++;
      lengthLeft -= 2;
    } else {
      lengthLeft -= 1;
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript simple one-pass
var isOneBitCharacter = function (bits) {
  let i = 0;

  while (i < bits.length - 1) {
    if (bits[i] === 1) i++;
    i++;
  }

  return bits[i] === 0;
};

// ======================================================================================

// 다른 사람의 코드 : [Javascript] O(N) TIME | O(1) SPACE, STRAIGHTFORWARD + EXPLANATION
// The idea is to move onto the next number
// if you've hit a zero, and skip an additional number
// if you've hit a 1 since they'd be a "two bit" number.
// Within the for loop, you know if you ever successfully land on the last digit which is always going to be a zero, it'll be a "one bit" character,
// otherwise if you skip it, it does NOT exist.
var isOneBitCharacter = function (bits) {
  for (let i = 0; i < bits.length; i++) {
    if (i === bits.length - 1) return true;
    if (bits[i] === 0) continue;
    i++;
  }

  return false;
};
