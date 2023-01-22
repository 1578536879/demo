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
