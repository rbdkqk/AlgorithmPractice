/*  0104 : 1108. Defanging an IP Address (easy)

  Given a valid (IPv4) IP address, return a defanged version of that IP address.
  A defanged IP address replaces every period "." with "[.]".


  Constraints:
    The given address is a valid IPv4 address.


  Example 1:
    Input: address = "1.1.1.1"
    Output: "1[.]1[.]1[.]1"

  Example 2:
    Input: address = "255.100.50.0"
    Output: "255[.]100[.]50[.]0"

*/

/**
 * @param {string} address
 * @return {string}
 */

/*  첫번째 제출한 코드 : 성공은 함
  (다른 사람의 코드 중 따봉이 두번째로 많은 코드와 동일함 - O(n) time, O(n) space 라고 했음)

  시간복잡도 : O(n) : address 문자열을 끝까지 돌려야 함
  공간복잡도 : O(n) : answer 문자열은 address 문자열보다 길이가 길어지지만( '.' => '[.]' ), IPv4 address니까 '.'이 몇 개 없을거라서 큰 차이는 아닐 것임

  Runtime: 76 ms, faster than 73.22% of JavaScript online submissions for Defanging an IP Address.
  Memory Usage: 38.7 MB, less than 15.25% of JavaScript online submissions for Defanging an IP Address.

*/

var defangIPaddr = function (address) {
  let answer = '';

  for (let i = 0; i < address.length; i++) {
    if (address[i] === '.') {
      answer = answer + '[.]';
    } else {
      answer = answer + address[i];
    }
  }

  return answer;
};

// ======================================================================================================

/*  두번째 제출한 코드 : 성공은 함
  (다른 사람의 코드 중 따봉 가장 많은 코드와 동일함)
  (댓글 : for(x of y) loop to iterate over the string.)

  시간복잡도 : O(n) : split 처리를 위해 address를 한바퀴 돌아야 할 것이고, split으로 생긴 4개짜리 배열을 join을 위해 한바퀴 돌려야 함
  공간복잡도 : O(n) : 리턴하는 문자열은 address 문자열보다 길이가 길어지지만( '.' => '[.]' ), IPv4 address니까 '.'이 몇 개 없을거라서 큰 차이는 아닐 것임
                    - 다만, split 처리를 해서 새로운 배열을 생성하고 이 배열은 4개 정도의 index를 가질 것임

  Runtime: 64 ms, faster than 99.17% of JavaScript online submissions for Defanging an IP Address.
  Memory Usage: 38.7 MB, less than 15.25% of JavaScript online submissions for Defanging an IP Address.

*/

var defangIPaddr = function (address) {
  return address.split('.').join('[.]');
};

// ======================================================================================================

// 다른 사람의 해결법 : 정규표현식 사용

var defangIPaddr = function (address) {
  return address.replace(/\./g, '[.]');
};
