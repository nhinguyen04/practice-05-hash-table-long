const HashTable = require("./01-implementation");

function anagrams(str1, str2) {
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  if (set1.size != set2.size) {
    return false;
  }

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  let set1 = new Set(arr1)
  let set2 = new Set(arr2)
  let result = [];

  for(const item of set1) {
    if(set2.has(item)) {
      result.push(item);
    }
  }

  return result;
}

function duplicate(arr) {
  // assuming only one duplicate
  let setLength = 0;
  let set = new Set();
  // const duplicates = [];

  for (const item of arr) {
    set.add(item);

    if (set.size === setLength) {
      // duplicates.push(item);
      return item;
    } else {
      setLength++;
    }
  }

  // return duplicates;
}


function twoSum(nums, target) {
  let set = new Set();
  for (const ele of nums) {
    if (set.has(target - ele)) {
      return true;
    } else {
      set.add(ele);
    }
  }

  return false;
}


function wordPattern(pattern, strings) {
  const hashTable = new HashTable();

  if (pattern.length != strings.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    // if doesn't exist in hash, add
    const patValue = pattern[i];
    const strValue = hashTable.read(strings[i]);
    if (strings[i] === "Elderberry") {
      console.log(patValue + "---" + strValue);
    }
    if (strValue === undefined) {
      hashTable.insert(strings[i], patValue);
    } else {
      // exist, if value not same, return false
      if (patValue != strValue) {
        return false;
      }
    }
  }

  return true;
}

// let target = 1000000;

//     let patternArr = [];
//     let strings = [];

//     for (let i = 0 ; i < target ; i++) {
//       patternArr.push("ABCD");
//       strings.push('Apple');
//       strings.push('Berry');
//       strings.push('Cantaloupe');
//       strings.push('Date');
//     }


// console.log(wordPattern(patternArr.join(""), strings));
// strings[target - 1] = 'Elderberry';
// console.log(wordPattern(patternArr.join(""), strings));
// // const hashTable = new HashTable();
// // console.log(hashTable.read("a"));


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
