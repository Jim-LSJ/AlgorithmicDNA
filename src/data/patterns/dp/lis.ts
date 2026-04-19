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
  coreTemplateCpp: `int lengthOfLIS(vector<int>& nums) {
    [[core|vector<int> tails;|tails stores the smallest ending element of all increasing subsequences.|tails 儲存所有遞增子序列中最小的結尾元素。]]
    for (int x : nums) {
        [[mod|auto it = lower_bound(tails.begin(), tails.end(), x);|Efficiently find insertion point using binary search.|使用二分搜尋高效尋找插入點。]]
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
  variations: [
    {
      id: "russian-doll-envelopes",
      title: "Russian Doll Envelopes",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/russian-doll-envelopes/",
      description: "Find the maximum number of envelopes you can Russian doll (put one inside another).",
      coreLogic: `envelopes.sort(key=lambda x: (x[0], -x[1]))
return length_of_lis([h for w, h in envelopes])`,
      coreLogicCpp: `sort(envelopes.begin(), envelopes.end(), [](auto& a, auto& b){
    return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
});
return lengthOfLIS(heights);`,
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
    return len(tails)`,
      fullCodeCpp: `int maxEnvelopes(vector<vector<int>>& envelopes) {
    [[core|sort(envelopes.begin(), envelopes.end(), [](auto& a, auto& b){
        return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
    });|Special sort: width asc, height desc.|特殊排序：寬度升序，高度降序。]]
    vector<int> tails;
    for (auto& env : envelopes) {
        [[mod|auto it = lower_bound(tails.begin(), tails.end(), env[1]);|LIS on heights.|對高度執行 LIS。]]
        if (it == tails.end()) tails.push_back(env[1]);
        else *it = env[1];
    }
    return tails.size();
}`
    },
    {
      id: "number-of-lis",
      title: "Number of Longest Increasing Subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
      description: "Find the number of longest increasing subsequences.",
      coreLogic: `if lengths[j] + 1 > lengths[i]:
    lengths[i] = lengths[j] + 1; counts[i] = counts[j]
elif lengths[j] + 1 == lengths[i]:
    counts[i] += counts[j]`,
      coreLogicCpp: `if (lengths[j] + 1 > lengths[i]) {
    lengths[i] = lengths[j] + 1; counts[i] = counts[j];
} else if (lengths[j] + 1 == lengths[i]) {
    counts[i] += counts[j];
}`,
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
    return sum(c for l, c in zip(lengths, counts) if l == max_len)`,
      fullCodeCpp: `int findNumberOfLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    [[core|vector<int> lengths(n, 1), counts(n, 1);|Track lengths and ways to reach each node.|追蹤每個節點的長度與方法數。]]
    int max_len = 1;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                [[mod|if (lengths[j] + 1 > lengths[i]) { lengths[i] = lengths[j] + 1; counts[i] = counts[j]; }|Longer path found.|找到更長的路徑。]]
                else if (lengths[j] + 1 == lengths[i]) {
                    [[mod|counts[i] += counts[j];|Alternative path of same max length found.|找到相同最大長度的替代路徑。]]
                }
            }
        }
        max_len = max(max_len, lengths[i]);
    }
    int res = 0;
    for (int i = 0; i < n; ++i) if (lengths[i] == max_len) res += counts[i];
    return res;
}`
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
      coreLogicCpp: `if (n <= first) first = n;
else if (n <= second) second = n;
else return true;`,
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
    return False`,
      fullCodeCpp: `bool increasingTriplet(vector<int>& nums) {
    [[core|int first = INT_MAX, second = INT_MAX;|Two variables to track smallest and second smallest.|用兩個變數追蹤最小與次小。]]
    for (int n : nums) {
        if (n <= first) first = n;
        else if (n <= second) [[mod|second = n;|Keep updating smallest available second.|持續更新最小的可用次小值。]]
        else return true;
    }
    return false;
}`
    }
  ]
};
