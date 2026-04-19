import { AlgorithmPattern } from "../../../types";

export const lisPattern: AlgorithmPattern = {
  id: "lis",
  name: "Longest Increasing Subsequence (LIS)",
  category: "Dynamic Programming",
  description: "Find the length of the longest subsequence such that all elements are in increasing order.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n log n) with patience sorting or O(n^2) with standard DP",
    space: "O(n)",
  },
  coreTemplate: `def length_of_lis(nums):
    [[core|tails = []|tails[i] stores the smallest tail of all increasing subsequences of length i+1.|tails[i] 儲存所有長度為 i+1 的遞增子序列中最小的尾部數。]]
    for x in nums:
        [[mod|i, j = 0, len(tails)|Binary search for insertion point.|二分搜尋插入位置。]]
        while i < j:
            mid = (i + j) // 2
            if tails[mid] < x: i = mid + 1
            else: j = mid
        if i == len(tails): tails.append(x)
        else: tails[i] = x
    return len(tails)`,
  variations: [
    {
      id: "russian-doll-envelopes",
      title: "Russian Doll Envelopes",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/russian-doll-envelopes/",
      description: "Find the maximum number of envelopes you can Russian doll (put one inside another).",
      coreLogic: `envelopes.sort(key=lambda x: (x[0], -x[1]))
return length_of_lis([h for w, h in envelopes])`,
      adaptationLogic: ``,
      explanation: "Sort by width ascending. For same width, sort height descending so that two envelopes with the same width cannot contain each other. Then find LIS of heights.",
      fullCode: `def max_envelopes(envelopes):
    [[core|envelopes.sort(key=lambda x: (x[0], -x[1]))|Special sort to handle same width correctly.|特殊排序以正確處理相同寬度的情況。]]
    heights = [h for w, h in envelopes]
    
    [[mod|# Applying LIS on heights|Apply the standard patience sorting LIS algorithm.|對高度應用標準的 LIS 演算法。]]
    tails = []
    for h in heights:
        i, j = 0, len(tails)
        while i < j:
            mid = (i + j) // 2
            if tails[mid] < h: i = mid + 1
            else: j = mid
        if i == len(tails): tails.append(h)
        else: tails[i] = h
    return len(tails)`
    },
    {
      id: "max-envelopes",
      title: "Number of Longest Increasing Subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
      description: "Find the number of longest increasing subsequences.",
      coreLogic: `if lengths[j] + 1 > lengths[i]:
    lengths[i] = lengths[j] + 1; counts[i] = counts[j]
elif lengths[j] + 1 == lengths[i]:
    counts[i] += counts[j]`,
      adaptationLogic: ``,
      explanation: "Maintain two DP arrays: 'lengths' for the length of LIS ending at i, and 'counts' for the number of such subsequences.",
      fullCode: `def find_number_of_lis(nums):
    n = len(nums)
    [[core|lengths = [1] * n; counts = [1] * n|Initialize DP arrays.|初始化 DP 陣列。]]
    for i in range(n):
        for j in range(i):
            if nums[i] > nums[j]:
                [[mod|if lengths[j] + 1 > lengths[i]:|Found a longer subsequence.|找到更長的子序列。]]
                    lengths[i] = lengths[j] + 1
                    counts[i] = counts[j]
                elif lengths[j] + 1 == lengths[i]:
                    [[mod|counts[i] += counts[j]|Found another subsequence of same max length.|找到另一個相同最大長度的子序列。]]
                    counts[i] += counts[j]
    
    max_len = max(lengths)
    return sum(c for l, c in zip(lengths, counts) if l == max_len)`
    },
    {
      id: "increasing-triplet",
      title: "Increasing Triplet Subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/increasing-triplet-subsequence/",
      description: "Return true if there exists a triple of indices such that i < j < k and nums[i] < nums[j] < nums[k].",
      coreLogic: `if n <= first: first = n
elif n <= second: second = n
else: return True`,
      adaptationLogic: ``,
      explanation: "This is essentially LIS with a fixed length of 3. We only need two variables to track the two smallest tails so far.",
      fullCode: `def increasing_triplet(nums):
    [[core|first = second = float('inf')|Keep track of the two smallest elements found.|追蹤目前找到的兩個最小元素。]]
    for n in nums:
        if n <= first:
            first = n
        elif n <= second:
            [[mod|second = n|Wait for any element larger than 'second'.|等待任何大於 'second' 的元素。]]
        else:
            return True
    return False`
    }
  ]
};
