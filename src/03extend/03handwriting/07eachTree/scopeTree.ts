// #region snippet1
/**
 * 广度优先
 * 获取节点及子节点 by while
 * @param node 当前节点
 */
export function getScopeNodeList1(node: ITreeNode) {
  const nodeList: ITreeNode[] = [];
  const queue: ITreeNode[] = [node];
  while (queue.length) {
    const item = queue.shift() as ITreeNode;
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
export function forScopeEachTree1(callback: IForEachNode, node: ITreeNode) {
  const nodeList: IWarpperNode[] = [];
  const stack: IWarpperNode[] = [{ current: node, index: 0 }];
  while (stack.length) {
    const item = stack.shift();
    if (item) {
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
}
// #endregion snippet1

// #region snippet2
/**
 * 广度优先
 * 获取节点及子节点 by callback
 * @param node 当前节点
 */
export function getScopeNodeList2(node: ITreeNode): ITreeNode[] {
  const nodeList: ITreeNode[] = [];
  const queue: ITreeNode[] = [node];

  while (queue.length) {
    const item = queue.shift() as ITreeNode;
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
 * @param node 当前节点
 * @param index 当前节点索引
 * @param parentNode 父节点
 */
export function forScopeEachTree2(
  callback: IForEachNode,
  node: ITreeNode,
  index: number,
  parentNode?: ITreeNode
) {
  callback(node, index, parentNode);
  if (node.children) {
    node.children.forEach((item, idx) => {
      forScopeEachTree2(callback, item, idx, node);
    });
  }
}
// #endregion snippet2
