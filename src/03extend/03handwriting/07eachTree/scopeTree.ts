// #region snippet1
/**
 * 广度优先
 * 获取节点及子节点 by while
 * @param node 当前节点
 */
export function getScopeNodeList1<T extends ITreeNode<T>>(node: T) {
  const nodeList: T[] = [];
  const queue: T[] = [node];
  while (queue.length) {
    const item = queue.shift() as T;
    nodeList.push(item);
    for (let i = 0; i < item.children.length; i++) {
      queue.push(item.children[i]);
    }
  }
  return nodeList;
}

/**
 * 广度优先
 * 遍历节点及子节点 by while
 * @param callback 遍历时执行的回调
 * @param node 当前节点
 */
export function forScopeEachTree1<T extends ITreeNode<T>>(
  callback: IForEachNode<T>,
  node: T
) {
  const nodeList: IWarpperNode<T>[] = [];
  const stack: IWarpperNode<T>[] = [{ current: node, index: 0 }];
  while (stack.length) {
    const item = stack.shift()!;
    nodeList.push(item);
    callback(item.current, item.index, item.parent);
    for (let i = 0; i < item.current.children.length; i++) {
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
 * 广度优先
 * 获取节点及子节点 by callback TODO!!!
 * @param node 当前节点
 */
export function getScopeNodeList2<T extends ITreeNode<T>>(node: T): T[] {
  const nodeList: T[] = [];
  const queue: T[] = [node];

  while (queue.length) {
    const item = queue.shift()!;
    nodeList.push(item);
    for (let i = 0; i < item.children.length; i++) {
      queue.push(item.children[i]);
    }
  }
  return nodeList;
}

/**
 * 广度优先
 * 遍历节点及子节点 by callback
 * @param callback 遍历时执行的回调
 * @param nodeTree 当前节点的数组
 * @param parentNode 父节点
 */
export function forScopeEachTree2<T extends ITreeNode<T>>(
  callback: IForEachNode<T>,
  nodeTree: T[],
  parentNode?: T
) {
  const nodeList: T[] = [];
  nodeTree.forEach((item, index) => {
    callback(item, index, parentNode);
    nodeList.push(item);
  });
  nodeList.forEach(item => {
    forScopeEachTree2(callback, item.children, item);
  });
}
// #endregion snippet2
