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
