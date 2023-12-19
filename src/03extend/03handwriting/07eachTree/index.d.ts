// 树的节点item
interface ITreeNode<T> {
  id?: any;
  children: T[];
  [key: string]: any;
}

// 包装节点
interface IWarpperNode<T> {
  current: T;
  index: number;
  parent?: T;
}

// 遍历节点
type IForEachNode<T> = (node: T, index: number, parentNode?: T) => void;
