/*  0227 Mock Interview : 662. (medium) Maximum Width of Binary Tree  //  tag : Tree

  Given a binary tree, write a function to get the maximum width of the given tree. 
    The maximum width of a tree is the maximum width among all levels.

  The width of one level is defined 
    as the length between the end-nodes (the leftmost and rightmost non-null nodes) in the level, 
      where the null nodes between the end-nodes are `also counted` into the length calculation.

  It is guaranteed that the answer will in the range of 32-bit signed integer.


  Constraints:
    The given binary tree will have between 1 and 3000 nodes.


  Example 1:
    Input: 
           1
         /   \
        3     2
       / \     \  
      5   3     9 
    Output: 4
    Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).

  Example 2:
    Input: 
          1
         /  
        3    
       / \       
      5   3     
    Output: 2
    Explanation: The maximum width existing in the third level with the length 2 (5,3).

    Example 3:
      Input:
          1
         / \
        3   2 
       /        
      5      
      Output: 2
      Explanation: The maximum width existing in the second level with the length 2 (3,2).

  Example 4:
    Input: 
          1
         / \
        3   2
       /     \  
      5       9 
     /         \
    6           7
    Output: 8
    Explanation: The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 실패함
// 내가 잡은 컨셉 : BFS로 각 층의 요소들을 모은 배열을 만들고, 이 배열의 앞뒤에 null이 있다면 제거해서 남은 길이를 구하여, 갱신하고 리턴
var widthOfBinaryTree = function (root) {
  let queue = [root];

  let count = 1;

  while (queue.length) {
    let length = queue.length;

    let newCount = checkLength(queue);

    count = Math.max(count, newCount);

    if (newCount === 0) {
      break;
    }

    for (let i = 0; i < length; i++) {
      let currentNode = queue.shift();

      if (!currentNode) {
        queue.push(null, null);
      } else {
        !currentNode.left ? queue.push(null) : queue.push(currentNode.left);
        !currentNode.right ? queue.push(null) : queue.push(currentNode.right);
      }
    }
  }

  return count;
};

function checkLength(array) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    if (array[start] === null) start++;
    if (array[end] === null) end--;

    if (array[start] !== null && array[end] !== null) {
      return end - start + 1;
    }
  }

  return 0;
}

// ======================================================================================

// 다른 사람의 코드 : javascript simple BFS beats 97%  level order traversal with explanation
// 위 제목에 들어가 있는 코드가 테스트케이스를 통과하지 못해서, 그 글의 댓글 코드를 붙여뒀음 (컨셉은 비슷해 보인다)

/* brief explanation:
    Do a level-order traversal (which is an off-the-shelf bfs but dequeuing on a sub-loop all nodes enqueued in previous level)
    when enqueuing nodes, extend node properties into an object that also includes a computed position
    compute a new position, just like you would do on a min / max heap :
    left child: parent pos * 2 + 1
    right child: parent pos * 2 + 2
    when de-queuing nodes, keep track of min and max position for that level
    after de-queuing all nodes for that level, compute width based on diff of max and min + 1 (so it is inclusive)
    update global max

    => min / max 두 개만 지속적으로 갱신하며 유지하는 컨셉인 것 같다
    => queue라면 shift로 빼고 push로 더해야 맞지 않나 싶음 (방향이 다를 뿐이니까 큰 차이는 없을 듯)
    => 인덱스를 층별로 처리하는 부분을 배워놓을 필요가 있겠다 : index를 0부터 시작해서, `index: 2 * normalizedIndex / index: 2 * normalizedIndex + 1` 방법으로 넣어준다
        (꼭 배열을 선언해서 정리한 뒤 그 앞뒤의 Null을 다 빼고 어쩌고 할 필요가 없음 - 뒤에서 앞을 빼고 1을 더하면 답은 나오니깐)
*/
var widthOfBinaryTree = function (root) {
  const queue = [{ node: root, index: 0 }];
  let maxWidth = 0;

  while (queue.length > 0) {
    const size = queue.length;

    let minIndex = Number.MAX_SAFE_INTEGER;
    let maxIndex = Number.MIN_SAFE_INTEGER;

    // 현재 층의 가장 앞에 있는 값의 index를 저장해 두고, 아래에서 normalizedIndex를 만드는데에 사용한다
    let levelStartIndex = queue[0].index;

    for (let i = 0; i < size; i++) {
      const { node, index } = queue.shift();

      minIndex = Math.min(minIndex, index);
      maxIndex = Math.max(maxIndex, index);

      const normalizedIndex = index - levelStartIndex;
      // index는 층별로 다음과 같이 구성된다
      // 모든 칸이 다 차 있는 경우 : 0 // 0 1 // 0 1 2 3 // 0 1 2 3 4 5 6 7 // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
      // 일부 칸이 비어있다면 그 칸은 빈 채로 남게 됨 : 0 1 2 3 자리에 첫번째와 마지막번째가 없다면, 1 2만 남고 답은 2
      // 이런 방식으로 층마다 새롭게 0으로 시작해서 각 node별로 저장될 것임
      // 따라서 값이 있어도 없어도 각 층의 각 자리에는 위 숫자가 정확히 맞도록 index가 채워질 것이고, 그때마다 최소/최대값을 갱신함

      if (node.left) {
        queue.push({ node: node.left, index: 2 * normalizedIndex });
      }

      if (node.right) {
        queue.push({ node: node.right, index: 2 * normalizedIndex + 1 });
      }
    }

    maxWidth = Math.max(maxWidth, maxIndex - minIndex + 1);
  }

  return maxWidth;
};
