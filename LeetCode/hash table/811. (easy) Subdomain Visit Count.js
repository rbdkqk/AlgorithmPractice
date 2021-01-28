/*  811. Subdomain Visit Count //  tag : Hash Table

  A website domain like "discuss.leetcode.com" consists of various subdomains. 
    At the top level, we have "com", at the next level, we have "leetcode.com", and at the lowest level, "discuss.leetcode.com". 
    
  When we visit a domain like "discuss.leetcode.com", 
    we will also visit the parent domains "leetcode.com" and "com" implicitly.

  Now, call a "count-paired domain" to be a count (representing the number of visits this domain received), 
    followed by a space, followed by the address. 
    
  An example of a count-paired domain might be "9001 discuss.leetcode.com".

  We are given a list `cpdomains` of count-paired domains. 
  
  We would like a list of count-paired domains, (in the same format as the input, and in any order), 
    that explicitly counts the number of visits to each subdomain.


  Constraints:
    The length of cpdomains will not exceed 100. 
    The length of each domain name will not exceed 100.
    Each address will have either 1 or 2 "." characters.
    The input count in any count-paired domain will not exceed 10000.
    The answer output can be returned in any order.


  Example 1:
    Input: 
      ["9001 discuss.leetcode.com"]
    Output: 
      ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
    Explanation: 
      We only have one website domain: "discuss.leetcode.com". As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.


  Example 2:
    Input: 
      ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
    Output: 
      ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
    Explanation: 
      We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times. For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.

*/

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */

/* 내가 작성한 코드

  시간복잡도 : O(n) : cpdomains 배열을 1회 순회하며, 그 개별 요소를 반복문 안에서 split/slice/join 한다.
  공간복잡도 : O(n) : cpdomains 배열이 길어지면 obj 객체, answer 배열, 그 외의 반복문 안의 배열들과 문자열들이 길어진다.

  Runtime: 88 ms, faster than 98.38% of JavaScript online submissions for Subdomain Visit Count.
  Memory Usage: 43.7 MB, less than 60.51% of JavaScript online submissions for Subdomain Visit Count.

*/
var subdomainVisits = function (cpdomains) {
  let obj = {};
  let answer = [];

  for (let i = 0; i < cpdomains.length; i++) {
    let numberAndDomain = cpdomains[i].split(' ');
    let visittedNumber = Number(numberAndDomain[0]);
    let splittedDomain = numberAndDomain[1].split('.');
    let first = numberAndDomain[1];
    let second = splittedDomain.slice(1).join('.');
    let third = splittedDomain.slice(2).join('.');

    if (obj[first] && first) {
      obj[first] += visittedNumber;
    } else {
      obj[first] = visittedNumber;
    }

    if (obj[second] && second) {
      obj[second] += visittedNumber;
    } else {
      obj[second] = visittedNumber;
    }

    if (obj[third]) {
      obj[third] += visittedNumber;
    } else if (third) {
      obj[third] = visittedNumber;
    }
  }

  for (let each in obj) {
    answer.push(`${String(obj[each])} ${each}`);
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript - Simple and fast solution
// 발상은 비슷한 것 같은데, 코드가 훨씬 깔끔하다
var subdomainVisits = function (cpdomains) {
  let visitCounts = {};
  for (let i = 0; i < cpdomains.length; i++) {
    // Split visits and domains by the space
    const [visits, domains] = cpdomains[i].split(' ');

    // Create array of subdomains in domain
    let subdomains = domains.split('.');

    while (subdomains.length) {
      // Join all items in subdomains array
      let subdomain = subdomains.join('.');

      // If subdomain already exists in object, add to existing count
      visitCounts[subdomain] = visitCounts.hasOwnProperty(subdomain)
        ? Number(visitCounts[subdomain]) + Number(visits)
        : visits;

      // Remove first subdomain from array
      subdomains.shift();
    }
  }

  return Object.keys(visitCounts).map((key) => `${visitCounts[key]} ${key}`);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution using string replace
// 로직은 일부 비슷해 보이는데, 이 코드는 정규표현식을 활용함
var subdomainVisits = function (cpdomains) {
  const map = {};
  cpdomains.forEach((d) => {
    let [count, domain] = d.split(' ');
    while (domain) {
      map[domain] = (map[domain] || 0) + parseInt(count);
      domain = domain.replace(/^[a-z]+\.?/, '');
    }
  });
  return Object.entries(map).map((entry) => `${entry[1]} ${entry[0]}`);
};
