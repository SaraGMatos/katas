//! VALIDATE SUBSEQUENCE

//? My solution

function isValidSubsequence(array, sequence) {
  let index = 0;
  let checkArray = [];
  const allEqual = (arr) => arr.every((val) => val === arr[0]);

  for (let i = 0; i < sequence.length; i++) {
    const currentNumber = sequence[i];

    for (let j = 0; j < array.length; j++) {
      const arrayNumber = array[j];
      if (i === 0 && currentNumber === arrayNumber) {
        index = j;
        checkArray.push(arrayNumber);
        continue;
      } else if (i !== 0 && currentNumber === arrayNumber && j > index) {
        index = j;
        checkArray.push(arrayNumber);
        continue;
      }
    }
  }

  return (
    checkArray.length === sequence.length ||
    (sequence.length > 1 && allEqual(sequence))
  );
}

//? Solution 1
//? O(n) time | 0(1) space
// Using while loop
function isValidSubsequence_2(array, sequence) {
  let arrayIndex = 0;
  let seqIndex = 0;

  // We are breaking out of the while loop whenever we've fully traversed any of the arrays.
  while (arrayIndex < array.length && seqIndex < sequence.length) {
    // If we have traversed through the entire sequence array by the end of the while loop, then we've found a valid subsequence.
    if (array[arrayIndex] === sequence[seqIndex]) {
      seqIndex += 1;
    }
    arrayIndex += 1;
  }

  // If we have traversed through the entire sequence array (i.e. found our subsequence), our seqIndex variable should be the same as the sequence.length.
  return seqIndex === sequence.length;
}

//? Solution 2
//? O(n) time | 0(1) space
// Using for loop
function isValidSubsequence_3(array, sequence) {
  let seqIndex = 0;

  for (const value in array) {
    // If the below values are equal, that means that we have traversed through the sequence array and found our subsequence
    if (seqIndex === sequence.length) {
      break;
    }

    if (sequence[seqIndex] === value) {
      seqIndex += 1;
    }
  }

  return seqIndex === sequence.length;
}

//! SORTED SQUARE ARRAY

//? My solution

function sortedSquaredArray(array) {
  const squaredArray = array.map((num) => num * num);
  const sortedArray = squaredArray.sort((a, b) => a - b);

  return sortedArray;
}

//! TOURNAMENT WINNER

//? My solution

function tournamentWinner(competitions, results) {
  const table = {};

  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    if (result === 0) {
      if (table.hasOwnProperty(competitions[i][1])) {
        table[competitions[i][1]] += 3;
      } else {
        table[competitions[i][1]] = 3;
      }
    }
    if (result === 1) {
      if (table.hasOwnProperty(competitions[i][0])) {
        table[competitions[i][0]] += 3;
      } else {
        table[competitions[i][0]] = 3;
      }
    }
  }

  const winner = Object.keys(table).reduce((a, b) =>
    table[a] > table[b] ? a : b
  );

  return winner;
}

//! NON CONSTRUCTIBLE CHANGE

//? My solution

/* 
  Create a variable to store the amount of change that you can currently create
  up to. Sort all of your coins, and loop through them in ascending order. 
  
  At every iteration, compare the current coin to the amount of change that you can
  currently create up to. Here are the two scenarios that you'll encounter:

    - The coin value is greater than the amount of change that you can currently create plus 1.
    - The coin value is smaller than or equal to the amount of change that you can currently create plus 1.
  
  In the first scenario, you simply return the current amount of change that you
  can create plus 1, because you can't create that amount of change. In the
  second scenario, you add the value of the coin to the amount of change that
  you can currently create up to, and you continue iterating through the coins.

  The reason for this is that, if you're in the second scenario, you can create
  all of the values of change that you can currently create plus the value of
  the coin that you just considered. If you're given coins [1, 2], then you can make
  [1, 2, 3] cents. So if you add a coin of value 4, then you can make 4 + 1 cents, 4 + 2 cents, and 4 + 3 cents. 
  Thus, you can make up to 7 cents.
*/

//? If coin > change + 1, it means we cannot make change + 1 change, and we return change + 1
//? If coin <= change + 1, it means we can make change + 1 change

function nonConstructibleChange(coins) {
  const sortedCoins = coins.sort((a, b) => a - b);
  let currentChange = 0;

  for (const coin of sortedCoins) {
    if (coin > currentChange + 1) {
      return currentChange + 1;
    } else if (coin <= currentChange + 1) {
      currentChange += coin;
    }
  }
  return currentChange + 1;
}

//! TRANSPOSE MATRIX

//? My solution

function transposeMatrix(matrix) {
  const newMatrix = [];

  for (let i = 0; i < matrix.length; i++) {
    const nestedArray = matrix[i];

    if (i === 0) {
      for (const nestedArrayValue of nestedArray) {
        newMatrix.push([nestedArrayValue]);
      }
    } else {
      for (let j = 0; j < nestedArray.length; j++) {
        const nestedArrayValue = nestedArray[j];
        newMatrix[j].push(nestedArrayValue);
      }
    }
  }

  return newMatrix;
}

//? Solution 2

function transposeMatrix2(matrix) {
  const newMatrix = [];

  for (const column in matrix[0]) {
    newRow = [];
    for (const row in matrix) {
      newRow.push(matrix[row][column]);
    }
    newMatrix.push(newRow);
  }

  return newMatrix;
}

//! FIND CLOSES VALUE IN BST

//? Solution 1 (recursive)

function findClosestValueInBst(tree, target) {
  return findClosestValueInBstHelper(tree, target, Number.MAX_VALUE);
}

function findClosestValueInBstHelper(tree, target, closest) {
  // Base case
  if (tree === null) {
    return closest;
  }

  // If the absolute value of the target - closest is greater than the absolute value of target - current tree value,
  // that means that the second operation resolves in a smaller number and therefore will take us closer to the target
  if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
    closest = tree.value;
  }
  // If the target is smaller than the current tree value, that means that we want to go to the left branch
  // (which will be a smaller number than the current tree value)
  if (target < tree.value) {
    return findClosestValueInBstHelper(tree.left, target, closest);

    // If the target is bigger than the current tree value, that means that we want to go to the right branch
    // (which will be a bigger number than the current tree value)
  } else if (target > tree.value) {
    return findClosestValueInBstHelper(tree.right, target, closest);

    // This else cover the case where the current tree value is equal to the target.
  } else {
    return closest;
  }
}

//? Solution 2 (iterative)

function findClosestValueInBst2(tree, target) {
  return findClosestValueInBstHelper2(tree, target, Number.MAX_VALUE);
}

function findClosestValueInBstHelper2(tree, target, closest) {
  let currentNode = tree;

  while (currentNode !== null) {
    if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
      closest = currentNode.value;
    }

    if (target < currentNode.value) {
      currentNode = currentNode.left;
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      break;
    }
  }
  return closest;
}

//! BRANCH SUMS

//? Solution 1 (recursive)

function branchSums(root) {
  let sums = [];
  calculateBranchSums(root, 0, sums);
  return sums;
}

function calculateBranchSums(node, runningSum, sums) {
  // Covers case for when any single node is null
  if (node === null) {
    return;
  }

  let newRunningSum = runningSum + node.value;

  if (node.left === null && node.right === null) {
    sums.push(newRunningSum);
    return;
  }

  calculateBranchSums(node.left, newRunningSum, sums);
  calculateBranchSums(node.right, newRunningSum, sums);
}

//! NODE DEPTHS

//? Solution 1 (iterative)

function nodeDepths(root) {
  let sumOfDepths = 0;
  // Below we initialise the first node, which is the top one
  let stack = [{ node: root, depth: 0 }];

  while (stack.length > 0) {
    // We can store the value of a popped element in a variable
    let nodeInfo = stack.pop();
    // We destructure the properties of the popped object to access them easily
    const { node, depth } = nodeInfo;

    // If the node is null, just skip it
    if (node === null) {
      continue;
    }

    // Sum the depth of the current node
    sumOfDepths += depth;

    // Add the left and right nodes to the stack, adding depth + 1 to the depth to ensure it is keeping up with levels
    // This will also ensure that the stack is kept > 0 until it's finished the tree
    stack.push({ node: node.left, depth: depth + 1 });
    stack.push({ node: node.right, depth: depth + 1 });
  }

  return sumOfDepths;
}

//? Solution 2 (recursive)

function nodeDepths2(root, depth = 0) {
  // Handle base case; if root is null, don't add 1.
  if (root === null) {
    return 0;
  }

  return (
    depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
  );
}

//! EVALUATE EXPRESSION TREE

//? Solution 1 (recursive)

function traverse(node) {
  if (node.left === null && node.right === null) {
    return node.value;
  }
  const firstOperand = traverse(node.left);
  const secondOperand = traverse(node.right);

  switch (node.value) {
    case -1:
      return firstOperand + secondOperand;
    case -2:
      return firstOperand - secondOperand;
    case -3:
      // If the result is negative, we need to round up (closer to 0)
      // If the result is positive, we need to round down (closer to 0)
      return firstOperand / secondOperand < 0
        ? Math.ceil(firstOperand / secondOperand)
        : Math.floor(firstOperand / secondOperand);
    case -4:
      return firstOperand * secondOperand;
  }
}

function evaluateExpressionTree(tree) {
  const result = traverse(tree);
  return result;
}

//? Solution 2 (recursive)

function evaluateExpressionTree2(tree) {
  if (tree.value >= 0) {
    return tree.value;
  }

  let leftValue = evaluateExpressionTree2(tree.left);
  let rightValue = evaluateExpressionTree2(tree.right);

  if (tree.value === -1) {
    return leftValue + rightValue;
  }

  if (tree.value === -2) {
    return leftValue - rightValue;
  }

  if (tree.value === -3) {
    // If the result is negative, we need to round up (closer to 0)
    // If the result is positive, we need to round down (closer to 0)
    return leftValue / rightValue < 0
      ? Math.ceil(leftValue / rightValue)
      : Math.floor(leftValue / rightValue);
  }

  return leftValue * rightValue;
}

//! DEPTH-FIRST SEARCH
