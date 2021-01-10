/*  0106 : 1603. Design Parking System (easy)

  Design a parking system for a parking lot. 
  The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

  Implement the ParkingSystem class:
    `ParkingSystem(int big, int medium, int small)` Initializes object of the `ParkingSystem` class. 
    The number of slots for each parking space are given as part of the constructor.
    `bool addCar(int carType)` Checks whether there is a parking space of `carType` for the car that wants to get into the parking lot. 
    `carType` can be of three kinds: big, medium, or small, which are represented by 1, 2, and 3 respectively. 
    
    A car can only park in a parking space of its `carType`. 
    If there is no space available, return false, else park the car in that size space and return `true`.


  Constraints:
    0 <= big, medium, small <= 1000
    carType is 1, 2, or 3
    At most 1000 calls will be made to addCar


  Example 1:

    Input
      ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
      [[1, 1, 0], [1], [2], [3], [1]]

    Output
      [null, true, true, false, false]

    Explanation
      ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
      parkingSystem.addCar(1); // return true because there is 1 available slot for a big car
      parkingSystem.addCar(2); // return true because there is 1 available slot for a medium car
      parkingSystem.addCar(3); // return false because there is no available slot for a small car
      parkingSystem.addCar(1); // return false because there is no available slot for a big car. It is already occupied.

*/

/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */

/* 내가 제출한 답

  시간복잡도 : O(1) : this.parkingLots[carTypeIndex] 방식으로 index에 직접 접근하므로, this.parkingLots 배열을 순회하지 않음
  공간복잡도 : O(1) : addCar 메소드에서 carTypeIndex 1개의 변수를 새로 선언하지만, 단순히 상수일 뿐임

  Runtime: 148 ms, faster than 77.57% of JavaScript online submissions for Design Parking System.
  Memory Usage: 46.9 MB, less than 18.82% of JavaScript online submissions for Design Parking System.

*/

var ParkingSystem = function (big, medium, small) {
  this.parkingLots = [big, medium, small];
};

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
  let carTypeIndex = carType - 1;
  if (this.parkingLots[carTypeIndex] > 0) {
    this.parkingLots[carTypeIndex] = this.parkingLots[carTypeIndex] - 1;
    return true;
  } else {
    return false;
  }
};

// ======================================================================================

/*  다른 사람의 답 : boolean만 리턴하면 되기 때문에 간단하게 작성 가능하다

  return this.count[carType - 1]-- > 0;
  위 부분에 관해서, this.count[carType - 1]이 1이었다면, -- 처리를 하면 0이 될 것인데, 이러면 0보다 커야 true가 나오도록 작성된 것이 아닌가?
  -- 처리를 한 뒤 0이어도 일단 이번에는 주차한거니까 true가 나와야 함

  => 해결 : 증감 연산자(전위/후위) / http://www.tcpschool.com/javascript/js_operator_incAndDec
    -- 라는 연산자가 this.count[carType - 1]의 뒤에 붙었으므로, 후위에 해당함
    이 경우 this.count[carType - 1] 값과 0과 비교하는 `this.count[carType - 1] > 0`이 먼저 진행되므로 return 값은 여기에 걸리고, 이런 비교연산 후에 비로소 -- 처리가 진행된다
      - 참고 : --this.count[carType - 1] > 0 이었다면, this.count[carType - 1]에서 -- 처리가 먼저 진행된 뒤에, 그 후 0과 비교하는 > 처리가 연산됨
*/

var ParkingSystem = function (big, medium, small) {
  this.count = [big, medium, small];
};

ParkingSystem.prototype.addCar = function (carType) {
  return this.count[carType - 1]-- > 0;
};
