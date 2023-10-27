namespace Question {
  declare function debounce(obj: Function): Function;

  function handler(a: number, b: number) {
    return a + b;
  }

  const dHandler = debounce(handler);

  dHandler();
}
