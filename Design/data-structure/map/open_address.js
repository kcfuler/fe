/**
 * core:
 * 1. hash
 *  - A (0.618033)
 *  - bit operation (^ >>>)
 * 1. prob
 *
 */

const DEL = "DELETE";
class OpenAddressHashMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.table = new Array(capacity).fill(null);
  }
  /**
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    let hash = this.hashString(key);

    let i = 0;
    while (
      this.table[this.linearProbing(hash, i)] !== null &&
      i < this.capacity
    ) {
      i++;
    }
    if (i > this.capacity) {
      throw new RangeError("there is no enough space for new pair");
    }

    this.table[this.linearProbing(hash, i)] = { key, value };
  }

  get(key) {
    const hash = this.hash(key);
    let i = 0;
    while (
      this.table[this.linearProbing(hash, i)]?.key !== key &&
      i < this.capacity
    ) {
      i++;
    }
    if (i < this.capacity) {
      return this.table[this.linearProbing(hash, i)];
    }

    return null;
  }

  linearProbing(hash, i) {
    return (hash + i) % this.capacity;
  }
  delete(key) {
    const hash = this.hash(key);

    let i = 0;
    while (
      this.table[this.linearProbing(hash, i)] === null &&
      i < this.capacity
    ) {
      i++;
    }
    if (i >= this.capacity) {
      throw new Error("can not find the element");
    }

    this.table[this.linearProbing(hash, i)] = DEL;
  }

  hash(key) {
    const A = 0.618033;
    const hash = this.hashString(key);

    return Math.floor(this.capacity * ((hash * A) % 1));
  }

  /**
   * @param {string} strKey
   * @returns {number} hashed number
   */
  hashString(strKey) {
    if (typeof strKey !== "string") {
      throw new Error("current only support string");
    }

    let hash = 0;
    const A = 5381;
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 33) ^ strKey.charCodeAt(i);
    }
    return hash >>> 0;
  }
}

const m = new OpenAddressHashMap(100);
m.set("key", "value");
console.log(m.get("key"));
