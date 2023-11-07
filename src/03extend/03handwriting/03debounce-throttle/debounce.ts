function debounce(fn: Function, delay: number = 500) {
  let timer: any = null;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, ...args);
      timer = null;
    }, delay);
  };
}
