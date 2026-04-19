import { AlgorithmPattern } from "../../../types";

export const knapsack01: AlgorithmPattern = {
  id: "knapsack-01",
  name: "0/1 Knapsack",
  category: "Dynamic Programming",
  description: "Classic optimization problem where items must be chosen or not to maximize value within a weight limit.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n * W) where n is items and W is weight",
    space: "O(W) with space optimization",
  },
  coreTemplate: `def knapsack(weights, values, W):
    [[core|dp = [0] * (W + 1)|dp[w] stores the maximum value for weight limit w.|dp[w] 儲存重量限制為 w 時的最大價值。]]
    for i in range(len(weights)):
        [[mod|for w in range(W, weights[i] - 1, -1):|Iterate backwards to avoid using the same item twice.|從後往前遍歷以避免重複使用同一個物品。]]
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]`,
  coreTemplateCpp: `int knapsack(vector<int>& weights, vector<int>& values, int W) {
    [[core|vector<int> dp(W + 1, 0);|dp[w] stores the maximum value for weight limit w.|dp[w] 儲存重量限制為 w 時的最大價值。]]
    for (int i = 0; i < weights.size(); ++i) {
        [[mod|for (int w = W; w >= weights[i]; --w) {|Iterate backwards to avoid using the same item twice.|從後往前遍歷以避免重複使用同一個物品。]]
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}`,
  variations: [
    {
      id: "partition-equal-subset-sum",
      title: "Partition Equal Subset Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
      description: "Determine if an array can be partitioned into two subsets with equal sums.",
      coreLogic: `target = total // 2
for n in nums:
    for i in range(target, n-1, -1):
        dp[i] = dp[i] or dp[i-n]`,
      coreLogicCpp: `int target = total / 2;
for (int n : nums)
    for (int i = target; i >= n; --i)
        dp[i] = dp[i] || dp[i - n];`,
      adaptationLogic: `dp = [True] + [False] * target`,
      explanation: "A variation of 0/1 Knapsack where the capacity is half the total sum, and we check if exactly filling that capacity is possible.",
      fullCode: `def can_partition(nums):
    total = sum(nums)
    if total % 2: return False
    [[core|target = total // 2|We need to find a subset that sums to exactly half.|我們需要找到一個總和恰好為總數一半的子集。]]
    dp = [True] + [False] * target
    for n in nums:
        [[mod|for i in range(target, n - 1, -1):|Check possible sums using current number.|使用當前數字檢查可能的總和。]]
            dp[i] = dp[i] or dp[i - n]
    return dp[target]`,
      fullCodeCpp: `bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2) return false;
    int target = total / 2;
    [[core|vector<bool> dp(target + 1, false); dp[0] = true;|DP table to track achievable sums.|用於追蹤可達成總和的 DP 表。]]
    for (int n : nums) {
        [[mod|for (int i = target; i >= n; --i)|Check if 'i' can be formed with 'n'.|檢查『i』是否能由『n』組成。]]
            dp[i] = dp[i] || dp[i - n];
    }
    return dp[target];
}`
    },
    {
      id: "target-sum",
      title: "Target Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/target-sum/",
      description: "Find the number of ways to assign signs (+/-) to make the array sum equal to target.",
      coreLogic: `P = (target + total) // 2
dp[i] += dp[i - n]`,
      coreLogicCpp: `int P = (target + total) / 2;
for (int n : nums)
    for (int i = P; i >= n; --i)
        dp[i] += dp[i - n];`,
      adaptationLogic: `Subset Sum conversion`,
      explanation: "Mathematical reduction to a subset sum problem: find a subset P such that sum(P) = (target + total) / 2.",
      fullCode: `def find_target_sum_ways(nums, target):
    total = sum(nums)
    if (target + total) % 2 or abs(target) > total: return 0
    [[core|P = (target + total) // 2|Problem reduces to: find subset that sums to P.|問題簡化為：尋找總和為 P 的子集。]]
    dp = [1] + [0] * P
    for n in nums:
        for i in range(P, n - 1, -1):
            [[mod|dp[i] += dp[i - n]|Count ways to reach sum i.|計算達到總和 i 的方法數。]]
    return dp[P]`,
      fullCodeCpp: `int findTargetSumWays(vector<int>& nums, int target) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if ((target + total) % 2 || abs(target) > total) return 0;
    int P = (target + total) / 2;
    [[core|vector<int> dp(P + 1, 0); dp[0] = 1;|Ways to reach sum 0 is 1.|達成總和 0 的方法數為 1。]]
    for (int n : nums) {
        for (int i = P; i >= n; --i) {
            [[mod|dp[i] += dp[i - n];|Accumulate ways from previous states.|從前一個狀態累積方法數。]]
        }
    }
    return dp[P];
}`
    },
    {
      id: "ones-and-zeroes",
      title: "Ones and Zeroes (2D Knapsack)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/ones-and-zeroes/",
      description: "Find the maximum size of a subset that has at most m zeros and n ones.",
      coreLogic: `for i in range(m, zeros-1, -1):
    for j in range(n, ones-1, -1):
        dp[i][j] = max(dp[i][j], 1 + dp[i-zeros][j-ones])`,
      coreLogicCpp: `for (int i = m; i >= zeros; --i)
    for (int j = n; j >= ones; --j)
        dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones]);`,
      adaptationLogic: `2D DP table`,
      explanation: "A knapsack problem with two independent constraints (zeros count and ones count).",
      fullCode: `def find_max_form(strs, m, n):
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for s in strs:
        zeros, ones = s.count('0'), s.count('1')
        [[mod|for i in range(m, zeros - 1, -1):|Iterate through two dimension constraints.|遍歷二維約束條件。]]
            for j in range(n, ones - 1, -1):
                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones])
    return dp[m][n]`,
      fullCodeCpp: `int findMaxForm(vector<string>& strs, int m, int n) {
    [[core|vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));|2D DP for two constraints.|針對兩個約束條件的二維 DP。]]
    for (const string& s : strs) {
        int zeros = count(s.begin(), s.end(), '0');
        int ones = s.size() - zeros;
        [[mod|for (int i = m; i >= zeros; --i)|Iterate backwards through both dimensions.|在兩個維度上均從後往前遍歷。]]
            for (int j = n; j >= ones; --j)
                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones]);
    }
    return dp[m][n];
}`
    }
  ]
};
