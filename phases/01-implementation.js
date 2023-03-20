class KeyValuePair {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = Array(this.capacity).fill(null); // initialize data array with null
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // if collisions often, resize
    if (this.count > this.capacity * 0.7) {
      if (this.count > 4) {
        this.resize();
      }
    }

    const location = this.hashMod(key);

    if (this.data[location] === null) {
      this.data[location] = new KeyValuePair(key, value);
    } else {
      let currentPair = this.data[location];
      let exists = false;

      // check if any have the same key as new insert
      while (currentPair) {
        if (currentPair.key === key) {
          currentPair.value = value;
          this.count--;
          exists = true;
          currentPair = null;
        } else {
          currentPair = currentPair.next;
        }
      }

      // key value pair is new, insert to front of link list
      if (!exists) {
        currentPair = this.data[location];
        this.data[location] = new KeyValuePair(key, value, currentPair);
      }
    }

    this.count++;
  }


  read(key) {
    const location = this.hashMod(key);

    let currentPair = this.data[location];
    while (currentPair) {
      if (currentPair.key === key) {
        return currentPair.value;
      } else {
        currentPair = currentPair.next;
      }
    }

    // const result = this.getKeyValuePair(key);
    // return result.value;
  }

  // getKeyValuePair(key) {
  //   const location = this.hashMod(key);

  //   let currentPair = this.data[location];
  //   while (currentPair) {
  //     if (currentPair.key === key) {
  //       console.log(currentPair);
  //       return currentPair;
  //     } else {
  //       currentPair = currentPair.next;
  //     }
  //   }
  // }


  resize() {
    const oldCapacity = this.capacity;
    this.capacity *= 2;

    // keep old data
    const oldData = [];
    for (let i = 0; i < oldCapacity; i++) {
      let current = this.data[i];
      while (current) {
        oldData.push(current);
        current = current.next;
      }
    }

    this.data = new Array(this.capacity).fill(null);
    // move old data to new
    for (let i = 0; i < oldData.length; i++) {
      const key = oldData[i].key;
      const value = oldData[i].value;
      this.insert(key, value);
      this.count--; // undo this.insert count increase
    }
  }


  delete(key) {
    const location = this.hashMod(key);

    let currentPair = this.data[location];
    if (!currentPair) {
      return "Key not found";
    }

    if (currentPair.key === key) {
      this.data[location] = currentPair.next;
      this.count--;
      return;
    }

    while (currentPair.next) {
      if (currentPair.next.key === key) {
        currentPair.next = currentPair.next.next;
        this.count--;
        return;
      }

      currentPair = currentPair.next;
    }

    return "Key not found";
  }
}

// const hashTable = new HashTable(2);
// hashTable.insert("key1", "value1")
// hashTable.insert("key2", "value2")
// hashTable.insert("key3", "value3")
// hashTable.insert("key5", "value5")
// hashTable.insert("key9", "value9")
// hashTable.insert("key10", "value10")

// // console.log(hashTable.data);

// hashTable.delete("key2")
// hashTable.delete("key9")
// // hashTable.delete("key10")
// // console.log(hashTable.read("key10"));

module.exports = HashTable;
