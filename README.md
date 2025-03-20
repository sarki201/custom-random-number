# custom-random-number

A powerful and flexible random number generator package with support for weighted distributions, seeded randomness, and unique number generation. Perfect for applications requiring controlled randomness, such as games, simulations, or data sampling.

## Installation

Install the package using npm:

```sh
npm install custom-random-number
```

Then, import the functions in your JavaScript/Node.js project:

```javascript
const {
  getRandom,
  getUniqueNumbers,
  getSeeded,
  getWeighted,
  getWeightedDynamic,
} = require("custom-random-number");
```

---

## API Reference

### `getRandom(min, max)`

Generates a random number between `min` and `max` (inclusive).

#### **Example Usage:**

```javascript
console.log(getRandom(1, 100)); // Example output: 42
console.log(getRandom(10, 20)); // Example output: 17
```

### `getUniqueNumbers(count, min, max)`

Generates an array of unique random numbers between `min` and `max`.

#### **Parameters:**

- `count`: The number of unique numbers to generate.
- `min`: Minimum number (inclusive).
- `max`: Maximum number (inclusive).

#### **Example Usage:**

```javascript
console.log(getUniqueNumbers(3, 1, 10)); // Example output: [3, 7, 1]
console.log(getUniqueNumbers(5, 1, 5)); // Example output: [2, 5, 1, 4, 3]
```

### `getSeeded(seed, min, max)`

Generates a **deterministic** random number between `min` and `max` based on a given `seed`. The same `seed` will always produce the same random number.

#### **Example Usage:**

```javascript
console.log(getSeeded(1234, 1, 100)); // Example output: 56
console.log(getSeeded(1234, 1, 100)); // Always returns 56 for seed 1234
console.log(getSeeded(5678, 1, 100)); // Example output: 87
```

### `getWeighted(min, max, weightedNumbers, weight = 1)`

Generates a random number between `min` and `max` with weighted numbers in an array.

#### **Usage 1: Array of objects (each number has its own weight)**

```javascript
const numbers = [
  { number: 10, weight: 10 },
  { number: 20, weight: 30 },
  { number: 30, weight: 60 },
];
console.log(getWeighted(1, 100, numbers)); // Example output: 30 (higher weight = higher probability)
```

#### **Usage 2: Array of numbers with a global weight**

```javascript
console.log(getWeighted(1, 100, [10, 20, 30], 50)); // Example output: 20 (numbers in the array uniformly have a heigher weight)
```

#### **Note:**

The `weight` parameter is optional. `weight` is required when the `weightedNumbers` is an array of **numbers** and not an array of **objects!!!**

### `getWeightedDynamic(min, max, weightDistribution, weightIntensity = 50)`

Generates a random number between `min` and `max` with customizable weight distribution.

#### **Parameters:**

- `min`: Minimum number (inclusive).
- `max`: Maximum number (inclusive).
- `weightDistribution`: Determines how weights are applied.
  - Can be a **string** (`"min"`, `"max"`, `"middle"`, `"middle-inverse"`, `"linear"`, `"linear-inverse"`).
  - Can be a **number (1-100)** to specify a custom weighted point.
- `weightIntensity`: Strength of the weighting (1 = uniform, 100 = extreme bias). Higher values increase the effect of the weight distribution.

#### **Examples:**

##### Favor numbers near the minimum

```javascript
console.log(getWeightedDynamic(1, 100, "min")); // Example output: 5 (more likely to be close to min)
```

##### Favor numbers near the maximum

```javascript
console.log(getWeightedDynamic(1, 100, "max")); // Example output: 97 (more likely to be close to max)
```

##### Favor numbers near the middle

```javascript
console.log(getWeightedDynamic(1, 100, "middle")); // Example output: 50
```

##### Favor numbers away from the middle (inverse middle)

```javascript
console.log(getWeightedDynamic(1, 100, "middle-inverse")); // Example output: 12 or 87 (more likely to be far from the center)
```

##### Linear distribution (higher values more likely)

```javascript
console.log(getWeightedDynamic(1, 100, "linear")); // Example output: 80 (increases as value gets larger)
```

##### Linear inverse distribution (lower values more likely)

```javascript
console.log(getWeightedDynamic(1, 100, "linear-inverse")); // Example output: 10 (decreases as value gets larger)
```

##### Custom weighted point at 25% mark (closer to min)

```javascript
console.log(getWeightedDynamic(1, 100, 25)); // Example output: 20 (more numbers concentrated near 25% of range)
```

##### Custom weighted point at 75% mark (closer to max)

```javascript
console.log(getWeightedDynamic(1, 100, 75)); // Example output: 80 (more numbers concentrated near 75% of range)
```

##### Extreme bias example (weightIntensity = 100)

```javascript
console.log(getWeightedDynamic(1, 100, "max", 100)); // Almost always returns 100
```

##### Lower bias example (weightIntensity = 10)

```javascript
console.log(getWeightedDynamic(1, 100, "max", 10)); // Still favors max, but less extreme
```

---

## Why Use `custom-random-number`?

- **Flexible weight distribution**: Choose from pre-defined distributions or specify custom weight points.
- **Seeded randomness**: Ensure predictable outputs when needed.
- **Unique number generation**: Get a set of non-repeating random numbers.
- **Fully customizable**: Adjust bias intensity and weight focus points.

## License

ISC
