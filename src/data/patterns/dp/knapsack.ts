import { AlgorithmPattern } from "../../../types";

export const knapsackPattern: AlgorithmPattern = {
  id: "knapsack",
  name: "Knapsack (背包問題)",
  category: "Dynamic Programming",
  description: "The classic family of knapsack problems: 0/1, Complete, and Multiple Knapsack.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n * W)",
    space: "O(W) with optimization",
  },
  coreTemplate: `def knapsack_01(weights, values, W):
    [[core|dp = [0] * (W + 1)|dp[j] is the maximum value for capacity j.|dp[j] 是容量為 j 時的最大價值。]]
    for i in range(len(weights)):
        [[core|for j in range(W, weights[i] - 1, -1):|Iterate backwards to ensure each item is picked at most once.|逆序遍歷以確保每個物品最多只被選取一次。]]
            [[mod|dp[j] = max(dp[j], dp[j - weights[i]] + values[i])|Update current capacity value.|更新當前容量的價值。]]
    return dp[W]`,
  variations: [
    {
      id: "complete-knapsack",
      title: "Complete Knapsack (完全背包)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change/",
      description: "Each item can be picked an infinite number of times.",
      coreLogic: `for i in range(len(weights)):
    for j in range(weights[i], W + 1):
        dp[j] = max(dp[j], dp[j - weights[i]] + values[i])`,
      adaptationLogic: `return dp[W]`,
      explanation: "Iterate forward through the capacity array to allow picking the same item multiple times.",
      fullCode: `def coin_change(coins, amount):
    [[core|dp = [float('inf')] * (amount + 1)|DP array initialized with infinity for min finding.|初始化 DP 陣列為無限大，以便進行最小值查找。]]
    dp[0] = 0
    for coin in coins:
        [[mod|for x in range(coin, amount + 1):|Forward iteration allowed multiple picks of the same coin.|正向遍歷允許重複選取同一種硬幣。]]
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`
    }
  ]
};
