import { AlgorithmPattern } from "../../../types";

export const fenwickTree: AlgorithmPattern = {
  id: "fenwick-tree",
  name: "Fenwick Tree (BIT)",
  category: "Segment Tree & Fenwick Tree",
  description: "Binary Indexed Tree for efficient prefix sum updates and queries.",
  imageUrl: "/patterns/segment-tree.png",
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
  coreTemplateCpp: `class FenwickTree {
    vector<int> tree;
public:
    FenwickTree(int n) : tree(n + 1, 0) {}
    void update(int i, int delta) {
        for (; i < tree.size(); i += [[mod|i & -i|Lowest set bit.|最低設置位。]])
            tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= [[mod|i & -i|Traverse prefix nodes.|走訪前綴節點。]])
            sum += tree[i];
        return sum;
    }
};`,
  variations: []
};
