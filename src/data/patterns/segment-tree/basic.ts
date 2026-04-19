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
  coreTemplateCpp: `class SegmentTree {
    int n;
    vector<int> tree;
public:
    SegmentTree(vector<int>& nums) {
        n = nums.size();
        [[core|tree.assign(2 * n, 0);|Construct tree array of size 2*N.|構建大小為 2*N 的樹陣列。]]
        for (int i = 0; i < n; i++) tree[n + i] = nums[i];
        for (int i = n - 1; i > 0; i--) [[mod|tree[i] = tree[2*i] + tree[2*i+1];|Internal nodes are sum of children.|內部節點為子節點之和。]]
    }
    void update(int i, int val) {
        for (tree[i += n] = val; i > 1; i >>= 1)
            [[mod|tree[i >> 1] = tree[i] + tree[i ^ 1];|Update ancestors up to root.|向根部更新祖先節點。]]
    }
};`,
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
      coreLogicCpp: `int query(int l, int r) {
    int res = 0;
    for (l += n, r += n; l <= r; l >>= 1, r >>= 1) {
        if (l % 2 == 1) res += tree[l++];
        if (r % 2 == 0) res += tree[r--];
    }
    return res;
}`,
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
        return res`,
      fullCodeCpp: `class NumArray {
    int n;
    vector<int> tree;
public:
    NumArray(vector<int>& nums) {
        n = nums.size();
        tree.resize(2 * n);
        for (int i = 0; i < n; i++) tree[n + i] = nums[i];
        for (int i = n - 1; i > 0; i--) tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
    void update(int index, int val) {
        for (tree[index += n] = val; index > 1; index >>= 1)
            tree[index >> 1] = tree[index] + tree[index ^ 1];
    }
    int sumRange(int left, int right) {
        int res = 0;
        [[mod|for (left += n, right += n; left <= right; left >>= 1, right >>= 1)|Iterate boundaries upwards.|向上迭代邊界。]] {
            if (left & 1) res += tree[left++];
            if (!(right & 1)) res += tree[right--];
        }
        return res;
    }
};`
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
      coreLogicCpp: `for (int i = nums.size() - 1; i >= 0; i--) {
    res[i] = st.query(0, rank[nums[i]] - 1);
    st.update(rank[nums[i]], st.get(rank[nums[i]]) + 1);
}`,
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
    return res[::-1]`,
      fullCodeCpp: `vector<int> countSmaller(vector<int>& nums) {
    auto sorted = nums; sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    [[core|unordered_map<int, int> rank;|Coordinate compression.|離散化/座標壓縮。]]
    for (int i = 0; i < sorted.size(); i++) rank[sorted[i]] = i;
    
    SegmentTree st(sorted.size());
    vector<int> res(nums.size());
    for (int i = nums.size() - 1; i >= 0; i--) {
        [[mod|res[i] = st.query(0, rank[nums[i]] - 1);|Get count of smaller values seen.|取得已見過的較小值計數。]]
        st.update(rank[nums[i]], st.val(rank[nums[i]]) + 1);
    }
    return res;
}`
    },
    {
      id: "falling-squares",
      title: "Falling Squares (ST with Lazy concept)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/falling-squares/",
      description: "Find the maximum height of squares that are dropping onto a 1D line.",
      coreLogic: `h = query_max(left, right) + side
update_range(left, right, h)`,
      coreLogicCpp: `int h = query(l, r) + side;
update(l, r, h);`,
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
        return res`,
      fullCodeCpp: `class MaxST {
    int n;
    vector<int> tree;
public:
    MaxST(int size) : n(size), tree(2 * size, 0) {}
    void update(int l, int r, int h) {
        [[mod|for (l += n, r += n; l <= r; l >>= 1, r >>= 1)|Updating range max (note: iterative ST range update is subtle).|更新範圍最大值（註：迭代 ST 的範圍更新較為精細）。]] {
            if (l & 1) tree[l] = max(tree[l], h), l++;
            if (!(r & 1)) tree[r] = max(tree[r], h), r--;
        }
    }
    int query(int l, int r) {
        int res = 0;
        for (l += n, r += n; l <= r; l >>= 1, r >>= 1) {
            if (l & 1) res = max(res, tree[l++]);
            if (!(r & 1)) res = max(res, tree[r--]);
        }
        return res;
    }
};`
    }
  ]
};
