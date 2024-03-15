// function measurePerformance(data) {
//   const startTimeStringify = performance.now();
//   const jsonString = JSON.stringify(data);
//   const endTimeStringify = performance.now();

function _completeDeepClone(target, map) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) {
    return new constructor(target);
  }
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, true);
  const result = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = _completeDeepClone(target[key], map);
    }
  }
  return result;
}

//   console.log(
//     `JSON.stringify took ${endTimeStringify - startTimeStringify} milliseconds.`
//   );

//   const startTimeParse = performance.now();
//   const parsedData = JSON.parse(jsonString);
//   const endTimeParse = performance.now();

//   console.log(`JSON.parse took ${endTimeParse - startTimeParse} milliseconds.`);
// }

function createComplexDeepObject(depth, arraySize) {
  let currentLevel = {
    arrayField: new Array(arraySize).fill(null).map((_, index) => ({
      index: index,
      bool: index % 2 === 0,
      string: `Item ${index}`,
      nestedArray: [index, `Item ${index}`, index % 2 === 0],
    })),
  };

  for (let i = 1; i < depth; i++) {
    currentLevel = {
      nestedObject: currentLevel,
      stringField: `Level ${i}`,
      numberField: i,
      booleanField: i % 2 === 0,
      nullField: null,
      arrayField: new Array(3).fill(i).map((item) => `Level ${item}`),
      nestedArray: [
        currentLevel,
        {
          innerString: `Inner Level ${i}`,
          innerNumber: i * 2,
          innerArray: new Array(2).fill(`Inner Level ${i}`),
          innerBool: i % 2 === 0,
        },
      ],
    };
  }

  return currentLevel;
}

const complexTestData = createComplexDeepObject(100, 2000);

// Now you can use the measurePerformance function to test the performance.
// measurePerformance(complexTestData); // Uncomment this line to run the performance test

// measurePerformance(complexTestData);
const startTimeDeepClone = performance.now();
const newObj = _completeDeepClone(complexTestData, new Map());
const endTimeDeepClone = performance.now();
console.log(
  `deepClone took ${endTimeDeepClone - startTimeDeepClone} milliseconds.`
);
