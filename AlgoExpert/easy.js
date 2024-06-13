//! Validate Subsequence

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
      } else if (i !== 0 && currentNumber === arrayNumber && j > index) {
        index = j;
        checkArray.push(arrayNumber);
      }
    }
  }

  return (
    checkArray.length === sequence.length ||
    (sequence.length > 1 && allEqual(sequence))
  );
}
