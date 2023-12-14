// #region snippet1
/**
 * 获取节点及子节点 by while
 */
export function getDeepNodeList1(node: ITreeNode) {
  const nodeList: ITreeNode[] = [];
  const stack: ITreeNode[] = [node];
  while (stack.length) {
    const item = stack.pop() as ITreeNode;
    nodeList.push(item);
    for (let i = item.children.length - 1; i > -1; i--) {
      stack.push(item.children[i]);
    }
  }
  return nodeList;
}

/**
 * 遍历节点及子节点 by while
 */
export function forDeepEachTree1(callback: IForEachNode, node: ITreeNode) {
  const stack: IWarpperNode[] = [{ current: node, index: 0 }];
  while (stack.length) {
    const item = stack.pop();
    if (item) {
      callback(item.current, item.index, item.parent);
      for (let i = item.current.children.length - 1; i > -1; i--) {
        stack.push({
          current: item.current.children[i],
          index: i,
          parent: item.current
        });
      }
    }
  }
}
// #endregion snippet1

// #region snippet2
/**
 * 获取节点及子节点 by callback
 * @param callback 遍历时执行的回调
 */
export function getDeepNodeList2(node: ITreeNode): ITreeNode[] {
  return node.children.reduce(
    (total, current) => {
      return total.concat(getDeepNodeList2(current));
    },
    [node]
  );
}

/**
 * 遍历节点及子节点 by callback
 * @param callback 遍历时执行的回调
 */
export function forDeepEachTree2(
  callback: IForEachNode,
  node: ITreeNode,
  index: number,
  parentNode?: ITreeNode
) {
  callback(node, index, parentNode);
  if (node.children) {
    node.children.forEach((item, idx) => {
      forDeepEachTree2(callback, item, idx, node);
    });
  }
}
// #endregion snippet2
