function getRandom(min, max) {
  if (typeof min !== "number" || typeof max !== "number" || min >= max) {
    throw new Error("Invalid range: min should be less than max.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeeded(seed, min, max) {
  if (typeof min !== "number" || typeof max !== "number" || min >= max) {
    throw new Error("Invalid range: min should be less than max.");
  }
  let random = mulberry32(seed);
  return Math.floor(random() * (max - min + 1)) + min;
}

function getUniqueNumbers(count, min, max) {
  if (typeof min !== "number" || typeof max !== "number" || min >= max) {
    throw new Error("Invalid range: min should be less than max.");
  }
  if (count > max - min + 1) throw new Error("Count must not exceed the range");
  let numbers = new Set();
  while (numbers.size < count) {
    numbers.add(getRandom(min, max));
  }
  return Array.from(numbers);
}

function getWeightedDynamic(
  min,
  max,
  weightDistribution,
  weightIntensity = 50,
) {
  if (typeof min !== "number" || typeof max !== "number" || min >= max) {
    throw new Error("Invalid range: min should be less than max.");
  }
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Normalize weight intensity (scale between 0 and 1)
  const intensityFactor = (weightIntensity - 1) / 99; // 1 = uniform, 100 = extreme bias

  let weightCenter;
  if (
    typeof weightDistribution === "number" &&
    weightDistribution >= 1 &&
    weightDistribution <= 100
  ) {
    // Convert range (1-100) to actual number in [min, max]
    weightCenter = min + ((weightDistribution - 1) / 99) * (max - min);
  }

  let options = numbers.map((num) => {
    let weight;
    if (typeof weightDistribution === "number") {
      // Custom weighted point distribution
      weight = Math.pow(
        1 / (Math.abs(num - weightCenter) + 1),
        intensityFactor,
      );
    } else {
      switch (weightDistribution) {
        case "min":
          weight = Math.pow(max - num + 1, intensityFactor);
          break;
        case "max":
          weight = Math.pow(num - min + 1, intensityFactor);
          break;
        case "middle":
          weight = Math.pow(
            1 / (Math.abs(num - (min + max) / 2) + 1),
            intensityFactor,
          );
          break;
        case "middle-inverse":
          weight = Math.pow(
            Math.abs(num - (min + max) / 2) + 1,
            intensityFactor,
          );
          break;
        case "linear":
          weight = Math.pow((num - min) / (max - min), intensityFactor);
          break;
        case "linear-inverse":
          weight = Math.pow(1 - (num - min) / (max - min), intensityFactor);
          break;
        default:
          throw new Error("Invalid weight distribution!");
      }
    }
    return { num, weight };
  });

  // Compute total weight
  const totalWeight = options.reduce((sum, { weight }) => sum + weight, 0);
  let randVal = Math.random() * totalWeight;

  // Pick a weighted random number
  for (let { num, weight } of options) {
    if (randVal < weight) return num;
    randVal -= weight;
  }
}

function getWeighted(min, max, weightedNumbers = [], weight = 1) {
  if (typeof min !== "number" || typeof max !== "number" || min >= max) {
    throw new Error("Invalid range: min should be less than max.");
  }

  if (!Array.isArray(weightedNumbers)) {
    throw new Error("weightedNumbers must be an array.");
  }

  if (typeof weight !== "number") {
    throw new Error("Weight must be a number between 1 and 100.");
  }

  let range = max - min + 1;
  let numbers = Array.from({ length: range }, (_, i) => min + i);
  let weights = numbers.map(() => 1); // Default: equal weights

  // Apply extra weight to specified numbers
  if (typeof weightedNumbers[0] !== "object") {
    weightedNumbers.forEach((num) => {
      let index = numbers.indexOf(num.number);
      if (index !== -1) {
        weights[index] = Math.pow(2, (num.weight - 1) / 20); // Scales from ~1 to very large
      }
    });
  } else {
    weightedNumbers.forEach((num) => {
      let index = numbers.indexOf(num);
      if (index !== -1) {
        weights[index] = Math.pow(2, (weight - 1) / 20); // Scales from ~1 to very large
      }
    });
  }
  let totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < numbers.length; i++) {
    if (random < weights[i]) return numbers[i];
    random -= weights[i];
  }

  return numbers[numbers.length - 1]; // Fallback
}

module.exports = {
  getRandom,
  getSeeded,
  getUniqueNumbers,
  getWeighted,
  getWeightedDynamic,
};
