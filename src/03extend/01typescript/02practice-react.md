# 最佳实践之React

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/54556434/1658220937907-00a09394-c183-4ce5-a49c-00ca0e845c5a.png#clientId=uaf49a2d9-cc42-4&from=paste&id=u645ab712&originHeight=424&originWidth=1304&originalType=url&ratio=1&rotation=0&showTitle=false&size=124605&status=done&style=none&taskId=ube9972e4-8ab2-4954-a938-11ef34b490b&title=)

如今，`React`和`TypeScript`是许多开发人员正在使用的两种很棒的技术。但是把他们结合起来使用就变得很棘手了，有时很难找到正确的答案。我这里根据我的经验总结一下两者结合使用的最佳实践，希望给大家有所帮助。

## 一、配置

我们知道，使用`TypeScript`时通过`@types/...`可以引用一些库的类型文件，恰好React的类型文件就是放在`@types`中的。

### 1.1 安装类型包

```bash
npm i -D @types/react @types/react-dom
```

```json
// package.json
{
  ...
  "dependencies": {
    "react": "17.x",
    "react-dom": "17.x",
    ...
  },
    "devDependencies": {
      "@types/node": "^17.0.23",
      "@types/react": "^17.0.0",
      "@types/react-dom": "^17.0.0",
      ...
    },
}
```

### 1.2 TS配置

在`tsconfig.json`的编译配置项`compilerOptions`中配置`jsx`项为`react`

- "preserve"：模式下对代码的编译会保留 jsx 格式，并输出一份 .jsx 后缀的文件；
- "react"：模式下对代码的编译是直接转换成 React.createElement，并输出一份 .js 后缀的文件；
- "react-native"：模式下对代码的编译会保留 jsx 格式，并输出一份 .js 后缀的文件。

| **Mode**     | **Input** | **Output**                 | **Output File Extension** |
| ------------ | --------- | -------------------------- | ------------------------- |
| preserve     | <div />   | <div />                    | .jsx                      |
| react        | <div />   | React.createElement("div") | .js                       |
| react-native | <div />   | <div />                    | .js                       |

## 二、常用类型检查

### 2.1 函数组件的声明

```tsx
import React, { FC } from 'react';

interface DemoComponentProps {
  className?: string;
  style?: React.CSSProperties;
  // 手动声明children, 其实FC中默认的有定义
  children?: React.ReactNode;
}

const DemoComponent: FC<DemoComponentProps> = props => {
  return <div>hello react</div>;
};
export default DemoComponent;
```

:::info
与之类似的还有SFC，但现在已经不再建议使用了。
:::

```tsx
import React, { PropsWithChildren } from 'react';

function DemoComponent(props: DemoComponentProps) {
  return <div>hello react</div>;
}

// 如果想带上children
function DemoComponent(props: PropsWithChildren<DemoComponentProps>) {
  return <div>hello react</div>;
}
export default DemoComponent;
```

### 2.2 泛型函数组件

泛型函数组件在列表型或容器型的组件中比较常用，直接使用FC无法满足需求：

```tsx
import React from 'react';

export interface ListProps<T> {
  list: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function List<T>(props: ListProps<T>) {
  return (
  <section>
 {
  props.list.map(props.renderItem)
 }
  </section>
  );
}

function TestList() {
  return (
    <List
      list={[1, 2, 3]}
      renderItem={i => {
        /* TypeScript推断i为number类型 */
      return (<p>{i}</p>)
      }}
    />
  );
}
```

### 2.3 子组件声明

使用`Parent.Child`形式的 JSX 可以让节点父子关系更加直观，它类似于一种命名空间的机制，可以避免命名冲突，`ant design`中就大量使用了这类形式。相比`ParentChild`这种驼峰命名方式，`Parent.Child`更为优雅些

```tsx
import React, { PropsWithChildren } from 'react';

export interface LayoutProps {}
export interface LayoutHeaderProps {} // 采用ParentChildProps形式命名
export interface LayoutFooterProps {}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return <div className="layout">{props.children}</div>;
}

// 作为父组件的属性
Layout.Header = (props: PropsWithChildren<LayoutHeaderProps>) => {
  return <div className="header">{props.children}</div>;
};

Layout.Footer = (props: PropsWithChildren<LayoutFooterProps>) => {
  return <div className="footer">{props.children}</div>;
};

function TestLayout () {
  return (<Layout>
    <Layout.Header>header</Layout.Header>
    <Layout.Footer>footer</Layout.Footer>
  </Layout>)
}
```

## 三、HTML元素属性和事件类型

### 3.1 属性

可以通过`JSX.IntrinsicElements`集合确保你能够设置一个元素的所有HTML属性

```tsx
import React, { PropsWithChildren } from 'react';

type ButtonProps = JSX.IntrinsicElements['button'];

function Button({ children, ...allProps }: PropsWithChildren<ButtonProps>) {
  return <button {...allProps}>{children}</button>;
}

export default function Attr() {
  return (
    <Button type="button" style={{ color: 'red' }}>
      Attr button
    </Button>
  );
}
```

### 3.2 事件

@types/react 内置了以下事件处理器的类型：

```typescript
type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }['bivarianceHack'];
type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
// 剪贴板事件对象
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
// 合成事件
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
// 拖拽事件对象
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
// 焦点事件
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
// form的submit事件, 对应form.addEventListener('submit', function (e){})
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
// Change 事件对象
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
// 键盘事件对象
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
// 鼠标事件对象
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
// 触摸事件对象
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
// 指针事件 - 是一类可以为定点设备所触发的DOM事件
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
// 简单的用户界面事件, 记录事件产生的时刻和类型
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
// 滚轮事件对象
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
// 动画事件对象
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
// 过渡事件对象
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
```

更多见： [react事件类型](https://blog.csdn.net/qq_42297012/article/details/116990746)

```tsx
import React from 'react';

export default function Handle() {
  /** 确定 */
  const onOK: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log('onOK event :>> ', event);
    console.log('event.currentTarget :>> ', event.currentTarget.innerText);
  };
  
  /** 取消 */
  // React.SyntheticEvent<HTMLLinkElement>
  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('onCancel event :>> ', event);
  };
  
  return (
    <div>
      <button onClick={onOK}>确 定</button>
      <button onClick={onCancel}>取消 </button>
    </div>
  );
}
```

## 四、部分Hooks的类型使用

### 4.1 Forwarding Refs

`React.forwardRef`在16.3新增，可以用于转发`ref`，适用于HOC和函数组件。其暴露方法可以使用ComponentName|Methods的命名规则

```tsx
import React, { useState, useImperativeHandle, FC, useRef, useCallback } from 'react';

export interface MyModalMethods {
  show(): void;
}

interface MyModalProps {
  title?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const MyModal = React.forwardRef<MyModalMethods, MyModalProps>((props, ref) => {
  const [visible, setVisible] = useState();

  // 初始化ref暴露的方法
  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  return <Modal visible={visible}>...</Modal>;
});

export default MyModal;
```

```tsx
const Test: FC<{}> = props => {
  // 引用
  const modal = useRef<MyModalMethods | null>(null);
  const confirm = useCallback(() => {
    if (modal.current) {
      modal.current.show();
    }
  }, []);

  const handleOk = useCallback(() => {}, []);

  return (
    <div>
      <button onClick={confirm}>show</button>
      <MyModal ref={modal} onOk={handleOk} />
    </div>
  );
};
```

### 4.2 Context

`Context`提供了一种跨组件间状态共享机制。通常我们使用`I|Name|Context`的命名规范声明`Context`的类型

```tsx
import React, { useContext, useState } from 'react';
import Toolbar from './Toolbar';

interface ITheme {
  foreground: string;
  background: string;
}

const themes: { light: ITheme; dark: ITheme } = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

// 使用 I|Name|Context 规范声明
interface IThemeContext {
  theme: ITheme;
  onThemeChange: React.MouseEventHandler;
}

const ThemeContext = React.createContext<IThemeContext>({
  theme: themes.dark,
  onThemeChange: () => {},
});

/**
 * 暴露hooks, 以use{Name}命名
 */
export function useTheme() {
  return useContext(ThemeContext);
}

export default function Context() {
  const [theme, setTheme] = useState(themes.dark);

  const onThemeChange = () => {
    setTheme((preState) => (preState === themes.dark ? themes.light : themes.dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

```tsx
import { useTheme } from './index';

function ThemedButton() {
  const context = useTheme();
  return (
    <button
      onClick={context.onThemeChange}
      style={{ background: context.theme.background, color: context.theme.foreground }}
    >
      Toggle Theme
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
```

## 五、React的高级语法及类型使用

### 5.1 高阶组件的类型检查

老实说不建议使用HOC，高阶组件笨重且难以理解，容易造成嵌套地狱(wrapper)，对`Typescript`类型化也不友好。不过还是举个栗子：

```tsx
import React, { FC } from 'react';

interface IThemeProps {
  primary: string;
  secondary: string;
}

/**
* 给指定组件注入'主题'
*/
export function withTheme<P>(Component: React.ComponentType<P & IThemeProps>) {
  /**
  * WithTheme 自己暴露的Props
  */
  interface OwnProps {}
  
  /**
  * 高阶组件的props, 忽略ThemeProps, 外部不需要传递这些属性
  */
  type WithThemeProps = P & OwnProps;
  
  /**
  * 高阶组件
  */
  const WithTheme = (props: WithThemeProps) => {
    // 假设theme从context中获取
    const fakeTheme: IThemeProps = {
      primary: 'red',
      secondary: 'blue',
    };
    return <Component {...fakeTheme} {...props} />;
  };
  
  WithTheme.displayName = `withTheme${Component.displayName}`;
  
  return WithTheme;
}

// Test
const Foo: FC<{ a: string } & IThemeProps> = (props) => (
  <>
    <h3 style={{ color: props.primary }}>{props.a}</h3>
    <button style={{ color: props.secondary }}>提 交</button>
  </>
);
const FooWithTheme = withTheme(Foo);

export default function HocComponent() {
  return <FooWithTheme a="标题" />;
}
```

或者

```tsx
import { FC } from 'react';

/**
 * 抽取出通用的高阶组件类型
 */
type HOC<InjectedProps, OwnProps = {}> = <P>(
  Component: React.ComponentType<P & InjectedProps>,
) => React.ComponentType<P & OwnProps>;

/**
 * 声明注入的Props
 */
export interface IThemeProps {
  primary: string;
  secondary: string;
}

export const withTheme: HOC<IThemeProps> = (Component) => (props) => {
  // 假设theme从context中获取
  const fakeTheme: IThemeProps = {
    primary: 'red',
    secondary: 'blue',
  };
  return <Component {...fakeTheme} {...props} />;
};

// Test
const Foo: FC<{ a: string } & IThemeProps> = (props) => (
  <>
    <h3 style={{ color: props.primary }}>{props.a}</h3>
    <button style={{ color: props.secondary }}>提 交</button>
  </>
);
const FooWithTheme = withTheme(Foo);

export default function HocComponent() {
  return <FooWithTheme a="标题" />;
}
```

### 5.2 *Render Props

`React`的 props(包括children)并没有限定类型，它可以是一个函数。于是就有了`render props`, 这是和高阶组件一样常见的模式：

```tsx
import React from 'react';

interface ITheme {
  primary: string;
  secondary: string;
}

export interface ThemeConsumerProps {
  children: (theme: ITheme) => JSX.Element;
}

export const ThemeConsumer = (props: ThemeConsumerProps) => {
  const fakeTheme: ITheme = { primary: 'red', secondary: 'blue' };
  return props.children(fakeTheme);
};

// Test
export default function RenderProps() {
  return (
    <ThemeConsumer>
      {({ primary }) => {
        return <div style={{ color: primary }}>RenderProps</div>;
      }}
    </ThemeConsumer>
  );
}
```

### 5.3 原生元素props定义和扩展

有些场景我们希望原生元素扩展一下一些props，所有原生元素props都继承了`React.HTMLAttributes`，某些特殊元素也会扩展了自己的属性，例如`InputHTMLAttributes`。具体可以参考`React.createElement`方法的实现

```tsx
import React, { FC } from 'react';

function fixClass<
  T extends Element = HTMLDivElement,
  Attribute extends React.HTMLAttributes<T> = React.HTMLAttributes<T>,
>(cls: string, type: keyof React.ReactHTML = 'div') {
  const FixedClassName: FC<Attribute> = (props) => {
    return React.createElement(type, { ...props, className: `${cls} ${props.className || ''}` });
  };

  return FixedClassName;
}

/**
 * Test
 */
const Container = fixClass('card');
const Header = fixClass('card__header', 'header');
const Body = fixClass('card__body', 'main');
const Footer = fixClass('card__body', 'footer');

const Dom = () => {
  return (
    <Container>
      <Header>header</Header>
      <Body>header</Body>
      <Footer>footer</Footer>
    </Container>
  );
};

export default Dom;
```

## 六、参考文献

1. [TypeScript + React: Component patterns](https://fettblog.eu/typescript-react-component-patterns/)
2. [JSX · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/handbook/jsx.html)
3. [react事件类型](https://blog.csdn.net/qq_42297012/article/details/116990746)

## 七、代码仓库地址

[https://code.alibaba-inc.com/banma-playground/vite-react-ts-good-code](https://code.alibaba-inc.com/banma-playground/vite-react-ts-good-code)

注： 后面还会考虑写一份Vue3的，敬请期待。
