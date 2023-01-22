const STATUS = {
  PENDING: "pending",
  REJECT: "reject",
  SUCCESS: "success",
};

class PromiseTest {
  constructor(cb) {
    this.cb = cb;
    this.status = STATUS.PENDING;
    this.value = null;
    this.resloveCallbackArr = [];
    this.rejectCallbackArr = [];
    this.init();
  }

  of(cb) {
    return new PromiseTest(cb);
  }

  init() {
    try {
      this.cb(this.reslove.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  reslove(args) {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.SUCCESS;
      this.value = args;
      try {
        this.resloveCallbackArr.forEach((cb) => cb(this.value));
        this.resloveCallbackArr = [];
      } catch (error) {
        this.reject(error);
      }
    }
  }

  reject(args) {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.REJECT;
      this.value = args;
      this.rejectCallbackArr.forEach((cb) => cb(this.value));
      this.rejectCallbackArr = [];
    }
  }

  handlePromiseRes(returnPromise, resData, reslove, reject) {
    if (returnPromise === resData) {
      throw new Error("返回与执行结果是不能同一个promise");
    }
    if (resData instanceof PromiseTest) {
      try {
        resData.then((data) => {
          this.handlePromiseRes(returnPromise, data, reslove, reject);
        });
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        if (resData && typeof resData === "object") {
          if (resData.then) {
            try {
              const resThen = resData.then;
              if (typeof resThen === "function") {
                let called = false;
                try {
                  resThen.call(
                    returnPromise,
                    (res) => {
                      if (called) return;
                      called = true;
                      this.handlePromiseRes(
                        returnPromise,
                        res,
                        reslove,
                        reject
                      );
                    },
                    (err) => {
                      if (called) return;
                      called = true;
                      reject(err);
                    }
                  );
                } catch (error) {
                  if (called) return;
                  reject(error);
                }
              } else {
                reslove(resThen);
              }
            } catch (error) {
              reject(error);
            }
          } else {
            reslove(resData);
          }
        } else {
          reslove(resData);
        }
      } catch (error) {
        reject(error);
      }
    }
  }

  then(resolveCb, rejectCb) {
    console.log("then", this.status, resolveCb);
    const resolveCallback =
      typeof resolveCb === "function" ? resolveCb : (data) => data;
    const rejectCallback =
      typeof rejectCb === "function"
        ? rejectCb
        : (data) => {
            throw data;
          };
    const promseReslt = this.of((reslove, reject) => {
      const rejCb = () => {
        console.log("then--reject ---- 执行cb")
        queueMicrotask(() => {
          try {
            const data = rejectCallback(this.value);
            this.handlePromiseRes(promseReslt, data, reslove, reject);
          } catch (error) {
            console.log(this.rejectCallbackArr);
            reject(error);
          }
        });
      };
      const resCb = () => {
        console.log("then--resolve ---- 执行cb")
        queueMicrotask(() => {
          try {
            const data = resolveCallback(this.value);
            this.handlePromiseRes(promseReslt, data, reslove, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      if (this.status === STATUS.PENDING) {
        this.rejectCallbackArr.push(rejCb);
        this.resloveCallbackArr.push(resCb);
      } else if (this.status === STATUS.REJECT) {
        rejCb();
      } else if (this.status === STATUS.SUCCESS) {
        resCb();
      }
      console.log("then---returun")
    });
    return promseReslt;
  }

  catch(cb) {
    console.log("catch内部")
    return this.then(undefined, cb);
  }
}

// export default PromiseTest
