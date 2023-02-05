function call_handle_writing(fn) {
  const ctx = fn || window;
  ctx.cb = this;
  const args = [...arguments].slice(1);
  const res = ctx.cb(...args);
  delete ctx.cb;
  return res;
}

Function.prototype.call_handle_writing = call_handle_writing;

function apply_handle_writing(fn, params) {
  if (Array.isArray(params)) {
    return this.call_handle_writing(fn, ...params);
  }
  return this.call_handle_writing(fn);
}
Function.prototype.apply_handle_writing = apply_handle_writing;

function bind_handle_writing(fn) {
  const that = this;
  const args = [...arguments].slice(1);
  function cb() {
    const params = [...args, ...arguments];
    fn = this instanceof cb ? this : fn;
    return that.call(fn, ...params);
  }
  // 用一个中间函数，在原型链上加一层，防止属性覆盖
  const buf = function () {};
  buf.prototype = this.prototype;
  cb.prototype = Object.create(this.prototype);
  console.log("fn---  ")
  console.dir(cb)
  return cb;
}
Function.prototype.bind_handle_writing = bind_handle_writing;

let Animal = function (name) {
  this.name = name;
  console.log("in-----", this, name);
};

Animal.prototype.hello = function () {
  console.log("Hello, ", this.name);
};

console.log("2222", Animal.prototype, new Animal());
console.log(Animal.prototype.constructor === Animal);

let buly = {
  name: "buly",
  buly: true,
};

let Cat = Animal.bind_handle_writing(buly);
// let Dog = Animal.mybind(buly);

let tom = new Cat("tom");
console.log(tom.prototype);
console.log(tom.__proto__);
console.log("111", tom, buly); // {} {name: "tom"}
// expected output: {name: "tom"} {name: "buly"}