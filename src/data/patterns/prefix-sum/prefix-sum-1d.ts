import { AlgorithmPattern } from "../../../types";

export const prefixSum1D: AlgorithmPattern = {
  id: "prefix-sum-1d",
  name: "1D Prefix Sum",
  category: "Prefix Sum & Difference Array",
  description: "Precompute sums to answer range sum queries in O(1).",
  imageUrl: "/patterns/prefix-sum.png",
  complexity: {
    time: "O(n) precompute, O(1) query",
    space: "O(n)",
  },
  coreTemplate: `def prefix_sum(nums):
    [[core|P = [0] * (len(nums) + 1)|Create prefix sum array with an extra 0 for easier range calculation.|建立前綴和陣列，多一位 0 方便範圍計算。]]
    for i in range(len(nums)):
        [[mod|P[i+1] = P[i] + nums[i]|P[i] stores the sum of nums[0...i-1].|P[i] 儲存 nums[0...i-1] 的和。]]
    return P

def query(P, i, j):
    [[mod|return P[j+1] - P[i]|Sum of nums[i...j] is P[j+1] - P[i].|nums[i...j] 的和即為 P[j+1] - P[i]。]]`,
  coreTemplateCpp: `vector<int> buildPrefixSum(vector<int>& nums) {
    [[core|vector<int> P(nums.size() + 1, 0);|Prefix sum array with extra zero.|多出一位 0 的前綴和陣列。]]
    for (int i = 0; i < nums.size(); ++i) {
        [[mod|P[i+1] = P[i] + nums[i];|Cumulative addition.|累加計算。]]
    }
    return P;
}

int query(vector<int>& P, int i, int j) {
    [[mod|return P[j + 1] - P[i];|Range sum calculation.|區間和計算。]]
}`,
  variations: [
    {
      id: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
      description: "Find the total number of continuous subarrays whose sum equals K.",
      coreLogic: `curr_sum += num
if curr_sum - k in counts: res += counts[curr_sum - k]
counts[curr_sum] += 1`,
      coreLogicCpp: `count[currSum]++;
if (count.count(currSum - k)) res += count[currSum - k];`,
      adaptationLogic: `counts = {0: 1}`,
      explanation: "Maintain a frequency hashmap of prefix sums. If curr_sum - k has been seen before, it means a subarray with sum K ends at the current index.",
      fullCode: `def subarray_sum(nums, k):
    [[core|counts = {0: 1}|Hashmap to store frequency of prefix sums.|儲存前綴和出現頻率的映射表。]]
    curr_sum = 0
    res = 0
    for n in nums:
        curr_sum += n
        [[mod|if curr_sum - k in counts:|Check if required complement exists in history.|檢查歷史記錄中是否存在所需補數。]]
            res += counts[curr_sum - k]
        counts[curr_sum] = counts.get(curr_sum, 0) + 1
    return res`,
      fullCodeCpp: `int subarraySum(vector<int>& nums, int k) {
    [[core|unordered_map<int, int> counts;|Prefix sum frequency map.|前綴和頻率映射。]]
    counts[0] = 1;
    int currSum = 0, res = 0;
    for (int n : nums) {
        currSum += n;
        [[mod|if (counts.count(currSum - k)) res += counts[currSum - k];|Check for target complement.|檢查目標補數。]]
        counts[currSum]++;
    }
    return res;
}`
    },
    {
      id: "contiguous-array",
      title: "Contiguous Array (Binary Subarray)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/contiguous-array/",
      description: "Find the maximum length of a contiguous subarray with an equal number of 0 and 1.",
      coreLogic: `curr += 1 if num == 1 else -1
if curr in first_seen: res = max(res, i - first_seen[curr])
else: first_seen[curr] = i`,
      coreLogicCpp: `curr += (n == 1 ? 1 : -1);
if (firstSeen.count(curr)) res = max(res, i - firstSeen[curr]);
else firstSeen[curr] = i;`,
      adaptationLogic: `first_seen = {0: -1}`,
      explanation: "Treat 0 as -1 and 1 as +1. Equal count means the sum of a subarray is 0, which implies prefix sums must be equal.",
      fullCode: `def find_max_length(nums):
    [[core|first_seen = {0: -1}|Store the first index where a prefix sum occurs.|儲存前綴和第一次出現的索引。]]
    curr = 0; res = 0
    for i, n in enumerate(nums):
        [[mod|curr += 1 if n == 1 else -1|Equal count maps to sum zero problem.|數量相等對應於總和為零的問題。]]
        if curr in first_seen:
            res = max(res, i - first_seen[curr])
        else:
            first_seen[curr] = i
    return res`,
      fullCodeCpp: `int findMaxLength(vector<int>& nums) {
    [[core|unordered_map<int, int> firstSeen = {{0, -1}};|Helper map for sum zero detection.|偵測總和為零的映射表。]]
    int curr = 0, res = 0;
    for (int i = 0; i < nums.size(); ++i) {
        [[mod|curr += (nums[i] == 1 ? 1 : -1);|Map {0,1} to {-1,1}.|將 {0,1} 映射為 {-1,1}。]]
        if (firstSeen.count(curr)) res = max(res, i - firstSeen[curr]);
        else firstSeen[curr] = i;
    }
    return res;
}`
    },
    {
      id: "subarray-sums-divisible-by-k",
      title: "Subarray Sums Divisible by K",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
      description: "Find the number of non-empty subarrays that have a sum divisible by K.",
      coreLogic: `curr = (curr + num) % k
res += counts[curr]
counts[curr] += 1`,
      coreLogicCpp: `curr = (curr + n % k + k) % k;
res += counts[curr];
counts[curr]++;`,
      adaptationLogic: `counts = {0: 1}`,
      explanation: "Use the property that if (P[j] - P[i]) % K == 0, then P[i] % K == P[j] % K. Track the frequencies of prefix sum remainders.",
      fullCode: `def subarrays_div_by_k(nums, k):
    res = 0; curr = 0
    [[core|counts = {0: 1}|Store frequency of remainders.|儲存餘數出現的頻率。]]
    for n in nums:
        [[mod|curr = (curr + n) % k|Remainder of current prefix sum.|當前前綴和的餘數。]]
        res += counts.get(curr, 0)
        counts[curr] = counts.get(curr, 0) + 1
    return res`,
      fullCodeCpp: `int subarraysDivByK(vector<int>& nums, int k) {
    [[core|vector<int> counts(k, 0); counts[0] = 1;|Array to store remainder frequencies.|儲存餘數頻率的陣列。]]
    int curr = 0, res = 0;
    for (int n : nums) {
        [[mod|curr = (curr + n % k + k) % k;|Correct modulo for negative numbers.|處理負數的正確取模運算。]]
        res += counts[curr];
        counts[curr]++;
    }
    return res;
}`
    }
  ]
};
