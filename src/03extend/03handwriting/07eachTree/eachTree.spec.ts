import {
  forDeepEachTree1,
  forDeepEachTree2,
  getDeepNodeList1,
  getDeepNodeList2
} from "./deepTree";
import {
  forScopeEachTree1,
  forScopeEachTree2,
  getScopeNodeList1,
  getScopeNodeList2
} from "./scopeTree";

const tree = {
  id: "1",
  children: [
    {
      id: "2",
      children: [
        { id: "5", children: [{ id: "7", children: [] }] },
        { id: "6", children: [] }
      ]
    },
    { id: "3", children: [] },
    { id: "4", children: [] }
  ]
};

describe("深度优先", () => {
  it("获取节点及子节点 by while", () => {
    const nodeList = getDeepNodeList1(tree);
    expect(nodeList).toMatchObject([
      { id: "1" },
      { id: "2" },
      { id: "5" },
      { id: "7" },
      { id: "6" },
      { id: "3" },
      { id: "4" }
    ]);
  });

  it("遍历节点及子节点 by while", () => {
    const ids: string[] = [];
    const indexArr: number[] = [];
    const parentIds: Array<string | undefined> = [];
    forDeepEachTree1((node, index, parent) => {
      ids.push(node.id);
      indexArr.push(index);
      parentIds.push(parent?.id);
    }, tree);
    expect(ids).toEqual(["1", "2", "5", "7", "6", "3", "4"]);
    expect(indexArr).toEqual([0, 0, 0, 0, 1, 1, 2]);
    expect(parentIds).toEqual([undefined, "1", "2", "5", "2", "1", "1"]);
  });

  it("获取节点及子节点 by callback", () => {
    const nodeList = getDeepNodeList2(tree);
    expect(nodeList).toMatchObject([
      { id: "1" },
      { id: "2" },
      { id: "5" },
      { id: "7" },
      { id: "6" },
      { id: "3" },
      { id: "4" }
    ]);
  });

  it("遍历节点及子节点 by callback", () => {
    const ids: string[] = [];
    const indexArr: number[] = [];
    const parentIds: Array<string | undefined> = [];
    forDeepEachTree2(
      (node, index, parent) => {
        ids.push(node.id);
        indexArr.push(index);
        parentIds.push(parent?.id);
      },
      tree,
      0
    );
    expect(ids).toEqual(["1", "2", "5", "7", "6", "3", "4"]);
    expect(indexArr).toEqual([0, 0, 0, 0, 1, 1, 2]);
    expect(parentIds).toEqual([undefined, "1", "2", "5", "2", "1", "1"]);
  });
});

describe("广度优先", () => {
  it("获取节点及子节点 by while", () => {
    const nodeList = getScopeNodeList1(tree);
    expect(nodeList).toMatchObject([
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" }
    ]);
  });

  it("遍历节点及子节点 by while", () => {
    const ids: string[] = [];
    const indexArr: number[] = [];
    const parentIds: Array<string | undefined> = [];
    forScopeEachTree1((node, index, parent) => {
      ids.push(node.id);
      indexArr.push(index);
      parentIds.push(parent?.id);
    }, tree);
    expect(ids).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(indexArr).toEqual([0, 0, 1, 2, 0, 1, 0]);
    expect(parentIds).toEqual([undefined, "1", "1", "1", "2", "2", "5"]);
  });

  it.skip("获取节点及子节点 by callback", () => {
    const nodeList = getScopeNodeList2(tree);
    expect(nodeList).toMatchObject([
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" }
    ]);
  });

  it("遍历节点及子节点 by callback", () => {
    const ids: string[] = [];
    const indexArr: number[] = [];
    const parentIds: Array<string | undefined> = [];
    forScopeEachTree2(
      (node, index, parent) => {
        ids.push(node.id);
        indexArr.push(index);
        parentIds.push(parent?.id);
      },
      [tree]
    );
    expect(ids).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(indexArr).toEqual([0, 0, 1, 2, 0, 1, 0]);
    expect(parentIds).toEqual([undefined, "1", "1", "1", "2", "2", "5"]);
  });
});
