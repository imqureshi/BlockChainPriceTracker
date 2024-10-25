const checkIncreaseFromPercentage = (
  previousValue: number,
  currentValue: number,
  threshold: number,
) => {
  if (!previousValue || !currentValue) {
    throw new Error('Error calculating price due to invalid data');
  }
  const percentageIncrease = calculatePercentageIncrease(
    previousValue,
    currentValue,
  );
  return percentageIncrease > threshold ? true : false;
};

const calculatePercentageIncrease = (previousValue, currentValue) =>
  ((currentValue - previousValue) / currentValue) * 100;

export { checkIncreaseFromPercentage, calculatePercentageIncrease };
