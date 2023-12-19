// #region snippet1
/**
 * 深度遍历
 * 获取节点及子节点 by while
 * @param node 遍历的节点树
 * @returns 得到的节点list
 */
export function getDeepNodeList1<T extends ITreeNode<T>>(node: T) {
  const nodeList: T[] = [];
  const stack: T[] = [node];
  while (stack.length) {
    const item = stack.pop()!;
    nodeList.push(item);
    for (let i = item.children.length - 1; i > -1; i--) {
      stack.push(item.children[i]);
    }
  }
  return nodeList;
}

/**
 * 深度遍历
 * 遍历节点及子节点 by while
 * @param callback 遍历时执行的回调
 * @param node 遍历的节点树
 */
export function forDeepEachTree1<T extends ITreeNode<T>>(
  callback: IForEachNode<T>,
  node: T
) {
  const stack: IWarpperNode<T>[] = [{ current: node, index: 0 }];
  while (stack.length) {
    const item = stack.pop()!;
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
// #endregion snippet1

// #region snippet2
/**
 * 深度遍历
 * 获取节点及子节点 by callback
 * @param node 遍历的节点树
 */
export function getDeepNodeList2<T extends ITreeNode<T>>(node: T): T[] {
  return node.children.reduce(
    (total, current) => {
      return total.concat(getDeepNodeList2(current));
    },
    [node]
  );
}

/**
 * 深度遍历
 * 遍历节点及子节点 by callback
 * @param callback 遍历时执行的回调
 * @param node 遍历的节点树
 * @param index 当前index
 * @param parentNode 父节点
 */
export function forDeepEachTree2<T extends ITreeNode<T>>(
  callback: IForEachNode<T>,
  node: T,
  index: number,
  parentNode?: T
) {
  callback(node, index, parentNode);
  node.children.forEach((item, idx) => {
    forDeepEachTree2(callback, item, idx, node);
  });
}
// #endregion snippet2
