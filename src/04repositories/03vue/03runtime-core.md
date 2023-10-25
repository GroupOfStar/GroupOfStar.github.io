
# setup和render

## 演进一: vue组件模拟

有了reactivity后就可以初步使用进行vue组件模拟了

```js
import { effect } from "./reactivity/index.js";

const App = {
  // template => render
  render(context) {
    effect(() => {
      // reset
      document.body.innerText = "";

      const div = document.createElement("div");
      div.innerText = context.state.count;

      // mount root
      document.body.append(div);
    });
  },
  setup() {
    const state = reactive({ count: 0 });
    return { state };
  }
};

App.render(App.setup())

```

这里有很多缺点，render中的视图每次都需要重新创建，另外render和setup的执行细节也不需要让用户知道

## 演进二: 简化使用

简化使用，让api更合理

::: code-group

```js [app.js]{6-8}
import { reactive } from "./reactivity/index.js";

export default {
  // template => render
  render(context) {
    const div = document.createElement("div");
    div.innerText = context.state.count;
    return div;
  },
  setup() {
    const state = reactive({ count: 0 });
    return { state };
  }
};
```

```js [index.js]{1-4}
import { createApp } from "./runtime-core/index.js";
import App from "./app.js";

createApp(App).mount(document.querySelector("#app"));
```

```html [index.html]{1-4}
<body>
  <div id="app"></div>
  <script src="./index.js" type="module"></script>
</body>
```
:::

这里的dom都是直接在render中创建的，一旦需求稍微复杂，这实际使用时就不方便了，所以需要引入虚拟dom（vdom，中间层，分解聚合的思想），相当于图纸或模型；同时这在后面能引入diff算法提高程序性能打下基础。


## 演进三: 虚拟dom

引入虚拟dom，完善render函数

::: code-group

```js [app.js]{2,7}
import { reactive } from "./reactivity/index.js";
import { h } from "./runtime-core/index.js";

export default {
  // template => render
  render(context) {
    return h("div", { id: "app-id", class: "app-class" }, `${context.state.count}`);
  },
  setup() {
    const state = reactive({ count: 0 });
    window.state = state;
    return { state };
  }
};
```

```js [index.js]
import { createApp } from "./runtime-core/index.js";
import App from "./app.js";

createApp(App).mount(document.querySelector("#app"));
```
:::

::: code-group

```js [runtime-core/h.js]{1-3}
export function h(tag, props, children) {
  return { tag, props, children };
}
```

```js [runtime-core/createApp.js]{1-18}
import { effect } from "./../reactivity/index.js";
import { mountElement } from "./renderer.js";

export function createApp(rootComponet) {
  return {
    mount(rootContainer) {
      const context = rootComponet.setup();
      effect(() => {
        // reset
        rootContainer.innerText = "";
        // vdom
        const subTree = rootComponet.render(context);
        // vdom => mount
        mountElement(subTree, rootContainer);
      });
    }
  };
}
```

```js [runtime-core/renderer.js]{1-19}
export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // 1. element
  const el = document.createElement(tag);
  // 2. props
  if (props) {
    for (let [key, value] of Object.entries(props)) {
      el.setAttribute(key, value);
    }
  }
  // 3. children
  if (typeof children === "string") {
    el.append(document.createTextNode(children));
  } else if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el));
  }
  // 4. 插入
  container.append(el);
}
```
:::

这种方式在当响应式数据有变化时，会导致整个document树重新create，非常消耗性能，事实上我们只需要修改变动的部分，即diff算法

## 演进四: diff算法

::: code-group

```js [app.js]{4-25,30-38,41}
import { reactive } from "./reactivity/index.js";
import { h } from "./runtime-core/index.js";

// 综合例子
// a b (c d e z) f g
// a b (d c y e) f
const prevChildren = [
  h("p", { key: "A" }, "A"),
  h("p", { key: "B" }, "B"),
  h("p", { key: "C" }, "C"),
  h("p", { key: "D" }, "D"),
  h("p", { key: "E" }, "E"),
  h("p", { key: "Z" }, "Z"),
  h("p", { key: "F" }, "F"),
  h("p", { key: "G" }, "G")
];
const nextChildren = [
  h("p", { key: "A" }, "A"),
  h("p", { key: "B" }, "B"),
  h("p", { key: "D" }, "D"),
  h("p", { key: "C" }, "C"),
  h("p", { key: "Y" }, "Y"),
  h("p", { key: "E" }, "E"),
  h("p", { key: "F" }, "F")
];

export default {
  // template => render
  render(context) {
    return h("div", { id: `app-${context.state.count}`, class: "app-class" }, [
      h("p", {}, `${context.state.count}`),
      h("p", {}, `${context.state.isChange}`),
      h(
        "div",
        { class: "content" },
        context.state.isChange === true ? nextChildren : prevChildren
      )
    ]);
  },
  setup() {
    const state = reactive({ count: 0, isChange: false });
    window.state = state;
    return { state };
  }
};
```

```js [index.js]
import { createApp } from "./runtime-core/index.js";
import App from "./app.js";

createApp(App).mount(document.querySelector("#app"));
```

```js [runtime-core/createApp.js]{2,7-9,11-23}
import { effect } from "./../reactivity/index.js";
import { mountElement, diff } from "./renderer.js";

export function createApp(rootComponet) {
  return {
    mount(rootContainer) {
      const context = rootComponet.setup();
      let isMounted = false;
      let prevSubTree;
      effect(() => {
        // vdom
        const subTree = rootComponet.render(context);
        if (!isMounted) {
          isMounted = true;
          // reset
          rootContainer.innerText = "";
          // vdom => mount
          mountElement(subTree, rootContainer);
          prevSubTree = subTree;
        } else {
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    }
  };
}
```

```js [runtime-core/renderer.js]{4,21-94}
export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // 1. element
  const el = (vnode.el = document.createElement(tag));
  // 2. props
  if (props) {
    for (let [key, value] of Object.entries(props)) {
      el.setAttribute(key, value);
    }
  }
  // 3. children
  if (typeof children === "string") {
    el.append(document.createTextNode(children));
  } else if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el));
  }
  // 4. 插入
  container.append(el);
}

/**
 *
 * @param {Vnode} n1 oldVnode 老节点
 * @param {Vnode} n2 newVnode 新节点
 */
export function diff(n1, n2) {
  const { tag: oldTag, props: oldProps, el, children: oldChildren } = n1;
  const { tag: newTag, props: newProps, children: newChildren } = n2;
  n2.el = el;
  // 1. tag
  if (oldTag !== newTag) {
    el.replaceWith(document.createElement(n2.tag));
  } else {
    // 2. props
    //  2.1 新增和修改
    if (newProps && oldProps) {
      for (const [key, newVal] of Object.entries(newProps)) {
        if (newVal !== oldProps[key]) {
          el.setAttribute(key, newVal);
        }
      }
    }
    //  2.2 删除
    if (oldProps) {
      for (const key of Object.keys(oldProps)) {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      }
    }
    // 3. children -> 暴力解法
    //  3.1 newChildren -> string (oldChildren: string, oldChildren: array)
    //  3.2 newChildren -> array (oldChildren: string, oldChildren: array)
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        el.innerText = "";
        mountElement(n2, el);
      } else if (Array.isArray(oldChildren)) {
        // new {a, b, c}
        // old {a, d, c, e}
        const oldChildrenLen = oldChildren.length;
        const newChildrenLen = newChildren.length;
        const minLen = Math.min(oldChildrenLen, newChildrenLen);

        // 处理公共的vnode
        for (let index = 0; index < minLen; index++) {
          diff(oldChildren[index], newChildren[index]);
        }

        if (newChildrenLen > minLen) {
          // 新增
          for (let index = minLen; index < newChildrenLen; index++) {
            mountElement(newChildren[index], el);
          }
        }
        if (oldChildrenLen > minLen) {
          // 删除
          for (let index = minLen; index < oldChildrenLen; index++) {
            const oldVnodeEl = oldChildren[index].el;
            oldVnodeEl.parentNode.removeChild(oldVnodeEl);
          }
        }
      }
    }
  }
}
```
:::