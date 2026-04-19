import { AlgorithmPattern } from "../../../types";

export const maxNonOverlappingIntervals: AlgorithmPattern = {
  id: "max-non-overlapping",
  name: "Max Non-overlapping Intervals",
  category: "Interval",
  description: "Find the maximum number of intervals that do not overlap. Equivalent to removing the minimum number of intervals.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n log n)",
    space: "O(1) extra space",
  },
  coreTemplate: `def erase_overlap_intervals(intervals):
    [[core|intervals.sort(key=lambda x: x[1])|Greedy strategy: always pick the interval that ends first.|貪婪策略：始終選擇最早結束的區間。]]
    [[core|count = 0|Keep track of non-overlapping intervals.|記錄非重疊區間的數量。]]
    [[core|last_end = float('-inf')|End time of the last picked interval.|最後一個所選區間的結束時間。]]
    for start, end in intervals:
        [[core|if start >= last_end:|If the current interval starts after the last one ends, it's valid.|如果當前區間在最後一個區間結束後開始，則為有效。]]
            [[mod|count += 1|Increment count.|增加計數。]]
            [[mod|last_end = end|Update last end time.|更新最後一個結束時間。]]
    return count`,
  variations: [
    {
      id: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
      description: "Find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
      coreLogic: `intervals.sort(key=lambda x: x[1])
count = 0
last_end = -float('inf')
for s, e in intervals:
    if s >= last_end:
        count += 1
        last_end = e`,
      adaptationLogic: `return len(intervals) - count`,
      explanation: "Total intervals minus the maximum possible non-overlapping intervals equals the minimum number of intervals to remove.",
      fullCode: `def erase_overlap_intervals(intervals):
    if not intervals: return 0
    [[core|intervals.sort(key=lambda x: x[1])|Sort by end time to maximize non-overlapping count.|按結束時間排序以最大化非重疊數量。]]
    
    [[core|count = 0|Count of intervals that we KEEP.|我們保留的區間數量。]]
    [[core|last_end = float('-inf')|Anchor end time.|錨點結束時間。]]
    
    for s, e in intervals:
        if s >= last_end:
            count += 1
            last_end = e
            
    [[mod|return len(intervals) - count|Total count minus the ones we kept equals the ones to remove.|總數減去保留的數量等於需要移除的數量。]]`
    }
  ]
};
