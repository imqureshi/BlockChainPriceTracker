"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentageIncrease = exports.checkIncreaseFromPercentage = void 0;
const checkIncreaseFromPercentage = (previousValue, currentValue, threshold) => {
    if (!previousValue || !currentValue) {
        throw new Error('Error calculating price due to invalid data');
    }
    const percentageIncrease = calculatePercentageIncrease(previousValue, currentValue);
    return percentageIncrease > threshold ? true : false;
};
exports.checkIncreaseFromPercentage = checkIncreaseFromPercentage;
const calculatePercentageIncrease = (previousValue, currentValue) => ((currentValue - previousValue) / currentValue) * 100;
exports.calculatePercentageIncrease = calculatePercentageIncrease;
//# sourceMappingURL=index.js.map