function LazyMan(name) {
  this.name = name;
  this.cb = [];

  function init() {
    setTimeout(() => {
      this.cb.unshift(function () {
        console.log("Hi,", name);
        next();
      });
      next();
    });
  }

  this.eat = (food) => {
    console.log("eat");
    setTimeout(() => {
      this.cb.push(function () {
        console.log("吃了--", food);
        next();
      });
    });
    return this;
  };

  this.sleep = (time) => {
    console.log("sleep");
    this.cb.push(function () {
      setTimeout(() => {
        console.log("睡了--", time);
        next();
      }, time * 1000);
    });
    return this;
  };

  this.sleepFirst = (time) => {
    console.log("sleepfirset");
    this.cb.unshift(function () {
      setTimeout(() => {
        console.log("首次睡了--", time);
        next();
      }, time * 1000);
    });
    return this;
  };

  function next() {
    console.log("next");
    const cb = this.cb.shift();
    cb && cb();
  }

  init();

  return this;
}

Number.prototype.add = function(num){
  return this +num
};
Number.prototype.minute = function(num){
  return this - num
};
console.log((5).add(10).minute(7))