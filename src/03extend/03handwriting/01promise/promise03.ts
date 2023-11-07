namespace Promse {
  // #region snippet
  type PromseState = "pendding" | "fulfilled" | "rejected";

  function runMicroTask(callback: VoidFunction) {
    // 判断node环境
    if (process && process.nextTick) {
      process.nextTick(callback);
    } else if (queueMicrotask) {
      // 浏览器环境, 也可以通过 MutationObserver 来模拟实现
      queueMicrotask(callback);
    } else {
      // 兜底方案
      setTimeout(callback, 0);
    }
  }

  class MyPromise {
    /** 状态 */
    _state: PromseState;
    /** 数据 */
    _value: any;

    constructor(executor) {
      this._state = "pendding";
      this._value = undefined;
      try {
        executor(this._resolve.bind(this), this._resolve.bind(this));
      } catch (error) {
        this._reject(error);
      }
    }

    /**
     * 更改任务状态
     * @param {PromseState} newState 新状态
     * @param {any} value 相关数据
     */
    _changeState(newState: PromseState, value: any) {
      if (this._state !== "pendding") {
        // 目前状态已更新
        return;
      }
      this._state = newState;
      this._value = value;
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成的相关数据
     */
    _resolve(data: any) {
      this._changeState("fulfilled", data);
    }

    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败时的相关数据
     */
    _reject(reason: any) {
      this._changeState("rejected", reason);
    }
  }

  new MyPromise((resolve, reject) => {
    resolve(1);
    resolve(2);
    reject(3);
    throw new Error("123");
  });
  // #endregion snippet
}
