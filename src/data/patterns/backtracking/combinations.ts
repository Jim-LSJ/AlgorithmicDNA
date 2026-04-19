import { AlgorithmPattern } from "../../../types";

export const combinations: AlgorithmPattern = {
  id: "combinations",
  name: "Combinations",
  category: "Backtracking",
  description: "Select k elements from a set of n elements regardless of order.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(k * C(n, k))",
    space: "O(k)",
  },
  coreTemplate: `def combine(n, k):
    res = []
    def backtrack(start, curr):
        [[core|if len(curr) == k:|Found a combination of size k.|找到一個大小為 k 的組合。]]
            res.append(curr[:])
            return
        [[core|for i in range(start, n + 1):|Only pick elements from current 'start' to avoid duplicate sets.|僅從 'start' 開始挑選以避免重複集合。]]
            curr.append(i)
            [[mod|backtrack(i + 1, curr)|Move to the next element.|移至下一個元素。]]
            [[mod|curr.pop()|Backtrack.|回溯。]]
    backtrack(1, [])
    return res`,
  variations: []
};
