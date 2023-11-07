namespace Promse {
  // #region snippet
  class MyPromise {
    /** 状态 */
    _state: "pendding" | "fulfilled" | "rejected";
    /** 数据 */
    _value: any;

    constructor(executor) {
      this._state = "pendding";
      this._value = undefined;
      executor(this._resolve.bind(this), this._resolve.bind(this));
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成的相关数据
     */
    _resolve(data: any) {
      // 改变状态和数据
      this._state = "fulfilled";
      this._value = data;
    }

    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败时的相关数据
     */
    _reject(reason: any) {
      this._state = "rejected";
      this._value = reason;
    }
  }

  new MyPromise((resolve, reject) => {
    resolve(123);
  });
  // #endregion snippet
}
