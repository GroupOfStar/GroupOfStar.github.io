// 树的节点item
interface ITreeNode {
  id: string;
  children: ITreeNode[];
}

// 包装节点
interface IWarpperNode {
  current: ITreeNode;
  index: number;
  parent?: ITreeNode;
}

// 遍历节点
type IForEachNode = (
  node: ITreeNode,
  index: number,
  parentNode?: ITreeNode
) => void;
