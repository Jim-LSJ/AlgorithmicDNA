import { AlgorithmPattern } from "../../../types";

export const segmentTree: AlgorithmPattern = {
  id: "segment-tree",
  name: "Segment Tree",
  category: "Segment Tree",
  description: "A flexible tree data structure for range queries and range updates in logarithmic time.",
  imageUrl: "/patterns/segment-tree.png",
  complexity: {
    time: "O(log n) for query and update",
    space: "O(n)",
  },
  coreTemplate: `class SegmentTree:
    def __init__(self, nums):
        [[core|self.n = len(nums)|Store array size.|儲存陣列大小。]]
        [[core|self.tree = [0] * (2 * self.n)|Zero-indexed tree where parent of i is i//2.|使用 2*N 大小的陣列儲存樹。]]
        for i in range(self.n): self.tree[self.n + i] = nums[i]
        for i in range(self.n - 1, 0, -1):
            [[mod|self.tree[i] = self.tree[2*i] + self.tree[2*i+1]|Build: sum of children.|構建：子節點之和。]]
            
    def update(self, i, val):
        i += self.n
        self.tree[i] = val
        while i > 1:
            i //= 2
            [[mod|self.tree[i] = self.tree[2*i] + self.tree[2*i+1]|Re-calculate parent sums.|重新計算父節點之和。]]`,
  variations: [
    {
      id: "range-sum-query-mutable",
      title: "Range Sum Query - Mutable",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/range-sum-query-mutable/",
      description: "Perform range sum queries and point updates on an array.",
      coreLogic: `def sumRange(l, r):
    l += n; r += n
    while l <= r:
        if l % 2 == 1: res += tree[l]; l += 1
        if r % 2 == 0: res += tree[r]; r -= 1
        l //= 2; r //= 2`,
      adaptationLogic: `Iterative Segment Tree`,
      explanation: "Iterative implementation of segment tree for point updates and range sum queries. Efficiently handles large arrays with frequent updates.",
      fullCode: `class NumArray:
    def __init__(self, nums):
        n = len(nums); self.n = n
        self.tree = [0] * (2 * n)
        for i in range(n): self.tree[n + i] = nums[i]
        for i in range(n - 1, 0, -1): self.tree[i] = self.tree[2*i] + self.tree[2*i+1]

    def update(self, index, val):
        idx = index + self.n
        self.tree[idx] = val
        while idx > 1:
            idx //= 2
            self.tree[idx] = self.tree[2*idx] + self.tree[2*idx+1]

    def sum_range(self, left, right):
        l, r = left + self.n, right + self.n
        res = 0
        while l <= r:
            [[mod|if l % 2 == 1: res += self.tree[l]; l += 1|Add left boundary if it is a right child.|若左邊界是右子節點，則加上該值。]]
            [[mod|if r % 2 == 0: res += self.tree[r]; r -= 1|Add right boundary if it is a left child.|若右邊界是左子節點，則加上該值。]]
            l //= 2; r //= 2
        return res`
    },
    {
      id: "count-of-smaller-numbers-after-self",
      title: "Count of Smaller Numbers After Self (ST Version)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      description: "Find for each element, how many smaller elements are to its right.",
      coreLogic: `for x in reversed(nums):
    res.append(st.query(0, x - 1))
    st.update(x, 1)`,
      adaptationLogic: `Compressed coordinates for array indices`,
      explanation: "Use a Segment Tree as a frequency table of numbers seen so far from the right. A range sum query from 0 to x-1 gives the count of smaller elements.",
      fullCode: `def count_smaller(nums):
    rank = {val: i for i, val in enumerate(sorted(set(nums)))}
    st = SegmentTree([0] * len(rank))
    res = []
    for x in reversed(nums):
        idx = rank[x]
        [[mod|res.append(st.sum_range(0, idx - 1))|Query sum of frequencies for smaller values.|查詢較小值的頻率總和。]]
        st.update(idx, st.tree[st.n + idx] + 1)
    return res[::-1]`
    },
    {
      id: "falling-squares",
      title: "Falling Squares (ST with Lazy concept)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/falling-squares/",
      description: "Find the maximum height of squares that are dropping onto a 1D line.",
      coreLogic: `h = query_max(left, right) + side
update_range(left, right, h)`,
      adaptationLogic: `Max Segment Tree`,
      explanation: "Maintain the maximum height over segments. Each landing square updates the maximum height of its landing range.",
      fullCode: `class MaxST:
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (2 * size)
    
    def update(self, l, r, val):
        # Range update logic (Lazy propagation usually better here)
        pass 
        
    def query(self, l, r):
        l += self.n; r += self.n
        res = 0
        while l <= r:
            if l % 2 == 1: res = max(res, self.tree[l]); l += 1
            if r % 2 == 0: res = max(res, self.tree[r]); r -= 1
            l //= 2; r //= 2
        return res`
    }
  ]
};
