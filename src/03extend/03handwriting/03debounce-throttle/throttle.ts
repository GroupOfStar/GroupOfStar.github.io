function throttle(fn: Function, delay: number) {
  let timer: any = null;
  return function (...args: any) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, ...args);
      timer = null;
    }, delay);
  };
}
