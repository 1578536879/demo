/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 * 注意点：没有跨天，即使是00：12也是表示当天；打卡时间可能是乱序的
 */
var alertNames = function (keyName, keyTime) {
  const map = keyTime.reduce((pre, cur, index) => {
    const name = keyName[index];
    const data = pre.get(name) || [];
    const arr = cur.split(":");
    const minutes = 60 * parseInt(arr[0]) + parseInt(arr[1]);
    data.push(minutes);
    data.sort((a, b) => a - b);
    pre.set(name, data);
    return pre;
  }, new Map());
  let res = [];
  for (const name of map.keys()) {
    const times = map.get(name);
    for (let i = 0; i < times.length - 2; i++) {
      const cur = times[i],
        next = times[i + 2];
      if (next - cur <= 60) {
        res.push(name);
        break;
      }
    }
  }
  return res.sort();
};

/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
  folder = folder.sort();
  const res = [],
    abandoneList = [];
  for (const item of folder) {
    let index = res.findIndex((ele) => item.startsWith(ele + "/"));
    if (index === -1) {
      index = abandoneList.findIndex((ele) => item.startsWith(ele + "/"));
      if (index === -1) {
        res.push(item);
      } else {
        abandoneList.push(item);
      }
    } else {
      abandoneList.push(item);
    }
  }
  return res;
};

const split = (s) => {
  const ret = [];
  let cur = "";
  for (let i = 0; i < s.length; ++i) {
    const ch = s[i];
    if (ch === "/") {
      ret.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  ret.push(cur);
  return ret;
};

class Trie {
  constructor() {
    this.ref = -1;
    this.children = new Map();
  }
}

var removeSubfolders = function (folder) {
  const root = new Trie();
  for (let i = 0; i < folder.length; ++i) {
    const path = split(folder[i]);
    let cur = root;
    for (const name of path) {
      if (!cur.children.has(name)) {
        cur.children.set(name, new Trie());
      }
      cur = cur.children.get(name);
    }
    cur.ref = i;
  }

  const ans = [];

  const dfs = (folder, ans, cur) => {
    if (cur.ref !== -1) {
      ans.push(folder[cur.ref]);
      return;
    }
    for (const child of cur.children.values()) {
      dfs(folder, ans, child);
    }
  };

  dfs(folder, ans, root);
  return ans;
};
/**
 * 构造 AuthenticationManager 并设置 timeToLive 参数。
 * @param {number} timeToLive
 */
var AuthenticationManager = function (timeToLive) {
  this.timeToLive = timeToLive;
  this.map = new Map();
};

/**
 * generate(string tokenId, int currentTime) 给定 tokenId ，在当前时间 currentTime 生成一个新的验证码。
 * @param {string} tokenId
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function (tokenId, currentTime) {
  this.map.set(tokenId, currentTime + this.timeToLive);
};

/**
 * 将给定 tokenId 且 未过期 的验证码在 currentTime 时刻更新。如果给定 tokenId 对应的验证码不存在或已过期，请你忽略该操作，不会有任何更新操作发生。
 * @param {string} tokenId
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function (tokenId, currentTime) {
  const data = this.map.get(tokenId);
  if (data && data > currentTime) {
    this.map.set(tokenId, currentTime + this.timeToLive);
  }
};

/**
 * 请返回在给定 currentTime 时刻，未过期 的验证码数目。
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function (currentTime) {
  return Array.from(this.map.keys()).reduce((pre, cur) => {
    if (this.map.get(cur) > currentTime) {
      pre++;
    }
    return pre;
  }, 0);
};

/**
 * @param {number[]} coins
 * @return {number}
 */
var getMaximumConsecutive = function (coins) {
  // 如果是从1开始计算，那么初始值为0即可
  let res = 1;
  coins.sort((a, b) => a - b);
  for (const item of coins) {
    if (item > res) {
      break;
    }
    res += item;
  }
  return res;
};

/**
 * 1247
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumSwap = function (s1, s2) {
  let obj = {
    xy: 0,
    yx: 0,
  };
  Array.from(s1).forEach((element, index) => {
    if (element !== s2[index]) {
      obj[element + s2[index]]++;
    }
  });
  if ((obj.xy + obj.yx) % 2 !== 0) return -1;
  return parseInt(obj.xy / 2) + parseInt(obj.yx / 2) + (obj.xy % 2) * 2;
};

/**
 * 05.02
 * @param {number} num
 * @return {string}
 */
var printBin = function (num) {
  const old = [];
  let res = "0.";
  while (num !== 1) {
    num = num * 2;
    if (old.includes(num)) {
      console.log(old, num);
      return "ERROR";
    }
    old.push(num);
    const ten = parseInt(num);
    res += ten;
    if (num === 1) {
      break;
    }
    num = (num - ten).toFixed((num + "").length - 2);
  }
  return res;
};
/**
 * 2379
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  let currentEndIndex = k;
  let minLen = Array.from(blocks)
    .slice(0, currentEndIndex)
    .filter((ele) => ele === "W").length;
  let preLen = minLen;
  for (; currentEndIndex < blocks.length; currentEndIndex++) {
    let len = preLen;
    const currentStartIndex = currentEndIndex- k;
    const startItem = blocks[currentStartIndex],
      endItem = blocks[currentEndIndex];
    if (startItem !== endItem) {
      if (startItem === "W") {
        len--;
      } else {
        len++;
      }
    }
    if(len === 0){
      minLen = 0;
      break;
    }
    preLen = len;
    minLen = minLen > len ? len : minLen;
  }
  return minLen;
};


/**
 * 1172
 * @param {number} capacity
 */
var DinnerPlates = function(capacity) {
  this.maxNum = capacity;
  this.stack = [];
};

/** 
 * 1172
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function(val) {
  const index = this.stack.findIndex(ele=>ele.split(",").length < this.maxNum);
  if(index === -1){
    this.stack.push(`${val}`);
    return
  }
  let item = this.stack[index];
  item = `${item},${val}`;
  this.stack[index] = item;
};

/**
 * 1172
 * @return {number}
 */
DinnerPlates.prototype.pop = function() {
  if(this.stack.length === 0) return -1
  const index = this.stack.length - 1;
  const item = this.stack[index];
  const arr = item.split(",");
  if(arr.length === 1){
    this.stack.pop()
    return arr[0];
  }
  const data = arr.pop()
  this.stack[index] = arr.join(",");
  return data;
};

/** 
 * 1172  未通过
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function(index) {
  if(this.stack.length === 0) return -1;
  const item = this.stack[index];
  if(!item) return -1;
  const arr = item.split(",");
  if(arr.length === 1){
    this.stack.splice(index, 1)
    return arr[0];
  }
  const data = arr.pop()
  this.stack[index] = arr.join(",");
  return data;
};
//  var D = new DinnerPlates(2)
//  console.log(D.push(1));
//  console.log(D.push(2));
//  console.log(D.push(3));
//  console.log(D.push(4));
//  console.log(D.push(5));
//  console.log(D.popAtStack(0))
//  console.log(D.push(20))
//  console.log(D.push(21))
//  console.log(D.popAtStack(0))
//  console.log(D.popAtStack(2))
//  console.log(D.pop())
//  console.log(D.pop())
//  console.log(D.pop())
//  console.log(D.pop())
//  console.log(D.pop())
//  ["DinnerPlates","push","push","push","popAtStack","pop","pop"]
//  [[1],[1],[2],[3],[1],[],[]]
//  [null,null,null,null,2,3,1]
 
//  var D = new DinnerPlates(1)
//  console.log(D.push(1));
//  console.log(D.push(2));
//  console.log(D.push(3));
//  console.log(D.popAtStack(1));
//  console.log(D.pop());
//  console.log(D.pop());

//  [null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]
/**
 * Your DinnerPlates object will be instantiated and called as such:
 * var obj = new DinnerPlates(capacity)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAtStack(index)
 */

/**
 * 2441. 与对应负数同时存在的最大正整数
 * @param {number[]} nums
 * @return {number}
 */
var findMaxK = function(nums) {
  nums = nums.sort((a, b) => b - a);
  for (const item of nums) {
    if(item < 0) return -1;
    const data = item * -1;
    if(nums.includes(data)){
      return item;
    }
  }
  return -1;
};

/**
 * 307. 区域和检索 - 数组可修改
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.nums = nums;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
  this.nums[index] = val;
};

/** 
 * 307. 区域和检索 - 数组可修改
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
  let res = 0
  for(let i = left; i <= right; i++){
    res += (this.nums[i] || 0)
  }
  return res
};
// ["NumArray", "sumRange", "update", "sumRange"]
// [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
var obj = new NumArray([1, 3, 5])
obj.sumRange(0, 2)
obj.update(1, 2)
obj.sumRange(0, 2)
/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */