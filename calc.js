function calcMean(nums) {
  return nums.reduce((acc, current) => acc += current) / nums.length;
}

function calcMedian(nums) {
  let midIdx = nums.length / 2;
  nums.sort((a, b) => a - b);
  if (nums.length % 2 == 0) {
    return (nums[Math.floor(midIdx) - 1] + nums[Math.floor(midIdx)]) / 2;
  } else {
    return nums[Math.floor(midIdx)];
  }
}

function calcMode(nums) {
  let mode = [];

  nums.sort((a, b) => a - b);

  // get map of number of frequencies and convert to array
  let frequency = Array.from(nums.reduce((acc, curr) => {
    if (acc.has(curr))
      acc.set(curr, acc.get(curr) + 1);
    else
      acc.set(curr, 1);
    return acc;
  }, new Map()), ([name, value]) => ([name, value]));

  frequency.sort((a, b) => b[1] - a[1]);

  for (let idx = 0; idx < frequency.length; idx++) {
    if (idx == 0)
      mode.push(frequency[idx][0]);
    else if (idx > 0) {
      if (frequency[idx][1] < frequency[idx - 1][1])
        break;
      if (frequency[idx][1] == frequency[idx - 1][1])
        mode.push(frequency[idx][0]);
    }
  }

  if (frequency.length == 1) {
    //throw new Error('mode undefined, each num is the same');
    return 'mode undefined, every num cannot be the same';
  } else if (frequency.length == mode.length) {
    //throw new Error('mode undefined, each unique num has same frequency');
    return 'mode undefined, each unique num cannot have same frequency';
  } else {
    return mode;
  }
}

module.exports = {
  calcMean: calcMean,
  calcMedian: calcMedian,
  calcMode: calcMode,
}