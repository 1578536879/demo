function dfs(tree, preKey = "") {
  if (typeof tree !== "object") {
    return {
      key: preKey,
      value: tree,
    };
  }
  const keys = Reflect.ownKeys(tree);
  let res = [];

  for (const key of keys) {
    let val = dfs(tree[key], preKey + "." + key);
    if (Array.isArray(val)) {
      res = res.concat(val);
    } else {
      res.push(val);
    }
  }
  return res;
}

function ObjectKeyToStr(obj) {
  const keys = Reflect.ownKeys(obj);
  let res = {};
  for (const key of keys) {
    const data = dfs(obj[key], key);
    if (Array.isArray(data)) {
      data.forEach((ele) => {
        res[ele.key] = ele.value;
      });
    } else {
      res[data.key] = data.value;
    }
  }
  console.log(res);
  return res;
}

function getKeys(tree) {
  return Reflect.ownKeys(tree);
}

function bfs(tree) {
  let stack = [];
  let res = {};
  let item = tree;
  while (item) {
    getKeys(item).forEach((ele) => {
      const currdata = item[ele];
      if (ele !== "_key") {
        if (Object.prototype.toString.call(currdata) === "[object Object]") {
          stack.unshift({
            ...currdata,
            _key: item._key ? item._key + "." + ele : ele,
          });
        } else {
          const key = item._key ? item._key + "." + ele : ele;
          delete currdata._key;
          res[key] = currdata;
        }
      }
    });
    item = stack.shift();
  }
  console.log(res);
  return res;
}
