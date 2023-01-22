function reduce_handle_writting(cb, initData) {
  console.log(this);
  const data = this;
  let res = initData;
  let index = 0;
  while (data.length !== 0) {
    console.log(data);
    const currentData = data.shift();
    res = cb(res, currentData, index, data);
    index++;
  }
  return res;
}
Array.prototype.reduce_handle_writting = reduce_handle_writting;

const func1 = (arr, res, index = 0) => {
  if (arr.length === 0) {
    return;
  }
  let cb = arr.shift();
  cb.then((e) => {
    console.log(res, index);
    res.push(e);
    return func1(arr, res, index++);
  });
};

const getPromiseListRes = (arr) => {
  // let data = [];
  // func1(arr, data)
  // console.log(data)
  // return data
  return arr.reduce((pre, cur, index) => {
    return cur.then((data) => {
      console.log("index---", pre, index);
      if (pre instanceof Promise) {
        return pre.then((res) => {
          console.log("res", res);
          const d = data + "" + res[res.length - 1];
          res.push(d);
          return res;
        });
      } else {
        pre.push(data);
        return pre;
      }
    });
  }, []);
};
const promiseList = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  }),
];
// console.log(getPromiseListRes(promiseList));
