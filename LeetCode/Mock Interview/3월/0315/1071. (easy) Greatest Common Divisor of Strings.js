/*  0315 Mock Interview : 1071. (easy) Greatest Common Divisor of Strings  // tag : String

  For two strings `s` and `t`, we say "t divides s" if and only if `s = t + ... + t`  (t concatenated with itself 1 or more times)

  Given two strings `str1` and `str2`, 
    return the largest string `x` such that `x` divides both `str1` and `str2`.


  Constraints:
    1 <= str1.length <= 1000
    1 <= str2.length <= 1000
    str1 and str2 consist of English uppercase letters.


  Example 1:
    Input: str1 = "ABCABC", str2 = "ABC"
    Output: "ABC"

  Example 2:
    Input: str1 = "ABABAB", str2 = "ABAB"
    Output: "AB"

  Example 3:
    Input: str1 = "LEET", str2 = "CODE"
    Output: ""

  Example 4:
    Input: str1 = "ABCDEF", str2 = "ABC"
    Output: ""

*/

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

// 성공 - 40분 소요 (repeatedSubstringPattern 함수를 다른사람 코드를 가져온 점과, 반복문 안에서 split join을 계속 시도하는 점이 아쉽다)
// Runtime: 92 ms
// Memory Usage: 42.7 MB
var gcdOfStrings = function (str1, str2) {
  if (str1.length < str2.length) {
    [str1, str2] = [str2, str1];
  }

  if (!repeatedSubstringPattern(str1)) {
    return '';
  }

  if (str1.split(str2).join('') === '') {
    return str2;
  }

  let answer = '';

  for (let i = 1; i <= str2.length / 2; i++) {
    let currentSubString = str2.slice(0, i);
    if (str2.split(currentSubString).join('') === '') {
      if (str1.split(currentSubString).join('') === '') {
        if (answer.length < currentSubString.length) {
          answer = currentSubString;
        }
      }
    }
  }

  return answer;
};

// 참고 : 0309-1 Mock Interview : 459. (easy) Repeated Substring Pattern
// 다른 사람의 코드 : Javascript single line solution
// 두번 반복하고 앞뒤로 하나씩 제거한 뒤 기존 문자열을 포함하는지를 체크하는 방법인 듯
// 이건 내가 낼 수 없는 아이디어라고 생각함
var repeatedSubstringPattern = function (s) {
  return s.repeat(2).slice(1, -1).includes(s);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution; 3 lines, 95% Runtime, 100% Memory Usage
const gcdOfStrings = (str1, str2) => {
  // 이 부분으로 두 문자열이 검토할 가치가 있는지를 바로 걸러낼 수 있다...
  if (str1 + str2 !== str2 + str1) {
    return '';
  }

  // 검토할 가치가 있다면, 아래 코드 실행
  // 최대공약수만큼으로 양 문자열의 길이를 둘 다 정확히 나눌 수 있으므로, 최대공약수를 쓰는 이유는 이해됐다
  // 다만, 아래가 최대공약수를 찾는 함수인데, 함수 자체가 잘 이해되지 않음
  const gcd = (a, b) => (0 === b ? a : gcd(b, a % b));

  return str1.substring(0, gcd(str1.length, str2.length));
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
// 내 코드보다 훨씬 간편하며, 컨셉은 일부 겹치는 점이 있는 것 같다
var gcdOfStrings = function (str1, str2) {
  const [smallerString, largerString] = [str1, str2].sort(
    (a, b) => a.length - b.length
  );

  for (let i = smallerString.length; i > 0; i--) {
    // 더 짧은 문자열을, 전체부터 시작하여 뒤에서 하나씩 빼면서 만든 testString으로,
    const testString = smallerString.slice(0, i);

    // ! 처리를 하는 이유 : split join 결과 길이가 0보다 크다면, 이는 뭔가 남았다는 뜻이므로, 잘못된 testString임. 그래서 강제로 false로 변경
    // split join 결과 길이가 0이라면, 이는 아무것도 남지 않았다는 뜻이므로, 제대로 된 testString임. 그래서 강제로 true로 변경
    // 아래 if 조건문 안에서 편하게 쓰기 위해 일부러 ! 처리를 해 준 것 같다
    const correctSmaller = !smallerString.split(testString).join('').length;
    const correctLarger = !largerString.split(testString).join('').length;

    if (correctSmaller && correctLarger) {
      return testString;
    }
  }

  return '';
};
