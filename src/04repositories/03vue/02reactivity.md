

# reactivity响应式

## ref

### 使用方式

```js
const a = ref(18);

let b;
effect(() => {
  b = a.value + 1;
  console.log("b :", b);
});

a.value = 20;
```

输出

```bash
b : 19
b : 21
```

### 实现思路

```js
let currentEffect;
class ReactiveEffect {
  constructor(value) {
    this._value = value;
    this._effect = new Set();
  }
  get value() {
    // trackEffects
    this.trackEffects();
    return this._value;
  }
  set value(newVal) {
    this._value = newVal;
    this.triggerEffects();
  }

  // 1. 收集依赖
  trackEffects() {
    if (currentEffect && !this._effect.has(currentEffect)) {
      this._effect.add(currentEffect);
    }
  }

  // 2. 触发依赖
  triggerEffects() {
    this._effect.forEach(effect => {
      effect();
    });
  }
}

export function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

export function ref(raw) {
  return new ReactiveEffect(raw);
}
```

## reactive

### 使用方式

```js
const user = reactive({ age: 18 });

let double;
effect(() => {
  double = user.age;
  console.log("double :>> ", double);
});

user.age = 19;
```
输出

```bash
double :>>  18
double :>>  19
```

### 实现思路

```js

const targetMap = new WeakMap();

function getEffect(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let effect = depsMap.get(key);
  if (!effect) {
    effect = new ReactiveEffect();
    depsMap.set(key, effect);
  }

  return effect;
}

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const effect = getEffect(target, key);
      // 依赖收集
      effect.trackEffects();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      const effect = getEffect(target, key);
      // 依赖触发
      effect.triggerEffects();
      return result;
    }
  });
}
```