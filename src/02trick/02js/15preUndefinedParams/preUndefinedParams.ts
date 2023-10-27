namespace PreUndefinedParams {
  // #region answer
  type JSTypeMap = {
    string: string;
    boolean: boolean;
    number: number;
    function: Function;
    object: object;
    symbol: symbol;
    undefined: undefined;
    bigint: bigint;
  };
  type JSTypeName = keyof JSTypeMap;
  type ArgsType<T extends JSTypeName[]> = {
    [I in keyof T]: JSTypeMap[T[I]];
  };
  declare function addImpl<T extends JSTypeName[]>(
    ...args: [...T, (...args: ArgsType<T>) => void]
  ): void;
  // #endregion answer
  // #region question
  addImpl("string", "boolean", "number", (a, b, c) => {});
  // #endregion question
}
