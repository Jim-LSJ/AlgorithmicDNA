import { AlgorithmPattern } from "../../../types";

export const fenwickTree: AlgorithmPattern = {
  id: "fenwick-tree",
  name: "Fenwick Tree (BIT)",
  category: "Segment Tree & Fenwick Tree",
  description: "Binary Indexed Tree for efficient prefix sum updates and queries.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(log n) for both update and query",
    space: "O(n)",
  },
  coreTemplate: `class FenwickTree:
    def __init__(self, n):
        [[core|self.tree = [0] * (n + 1)|BIT uses 1-based indexing.|BIT 使用從 1 開始的索引。]]

    def update(self, i, delta):
        while i < len(self.tree):
            [[mod|self.tree[i] += delta|Add delta to the current node.|將增量加入當前節點。]]
            [[mod|i += i & (-i)|Jump to the next ancestor.|跳轉至下一個祖先。]]

    def query(self, i):
        s = 0
        while i > 0:
            [[mod|s += self.tree[i]|Accumulate sum.|累加和。]]
            [[mod|i -= i & (-i)|Jump to the parent of the current range.|跳轉至當前範圍的父節點。]]
        return s`,
  variations: []
};
