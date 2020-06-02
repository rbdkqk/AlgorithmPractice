/* Problems - Two Sum

    Given an array of integers, return indices of the two numbers such that they add up to a specific target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    Example:
        Given nums = [2, 7, 11, 15], target = 9,

        Because nums[0] + nums[1] = 2 + 7 = 9,
        return [0, 1].

*/




/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    /* first sudo - failed
        * 두 개의 숫자를 랜덤하게 뽑고,
        * 그 합계를 target 과 비교해서 같으면, 
        * 그 숫자 둘로 구성된 배열을 반환한다.
    */   
    
    /* second sudo
        * 배열을 랜덤하게 섞고, (.sort / Math.random()-0.5)
        * 섞인 배열의 1번과 2번을 합쳐서
        * target 과 비교해서, 같으면,
        * 그 숫자 둘로 구성된 배열을 반환한다. (slice)
    */
    
    let arr = [];
      for (let i = 0; i < nums.length; i++) {
        arr.push(nums[i]);
      }
     
            // 깊은 복사의 문제가 있는 듯? :  let arr = nums; 코드로 작성하면 arr 뿐만 아니라 nums 배열도 계속 영향을 받아 셔플된다.

    
      function sss (array, target) {

        let shuffledArray = array.sort(function () {
                                        return Math.random() - 0.5;
                                      })

        if (shuffledArray[0] + shuffledArray[1] === target) {
            let answer = [];
            // return shuffledArray.slice(0, 2);
            answer.push(nums.indexOf(shuffledArray[0]));
            answer.push(nums.indexOf(shuffledArray[1]));

            return answer.sort(function (a, b) {
                                return a - b;
                               });
        }
        else {
            return sss(array, target);
        }   
      }
      return sss(arr, target);
   
  
    
};