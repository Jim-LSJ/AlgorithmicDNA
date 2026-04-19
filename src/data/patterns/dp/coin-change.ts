import { AlgorithmPattern } from "../../../types";

export const coinChange: AlgorithmPattern = {
  id: "coin-change",
  name: "Coin Change (Unbounded Knapsack)",
  category: "Dynamic Programming",
  description: "Find the minimum number of coins or the total number of ways to make up a target amount using an infinite supply of each coin.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n * amount)",
    space: "O(amount)",
  },
  coreTemplate: `def coin_change(coins, amount):
    [[core|dp = [float('inf')] * (amount + 1)|dp[i] stores min coins needed for amount i.|dp[i] 儲存金額 i 所需的最少硬幣數。]]
    dp[0] = 0
    for coin in coins:
        [[mod|for x in range(coin, amount + 1):|Unbounded: iterate forwards to allow reusing the same coin.|無限制：從前往後遍歷，允許重複使用同一硬幣。]]
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
  variations: [
    {
      id: "coin-change-ii",
      title: "Coin Change II (Total Ways)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
      description: "Find the total number of ways to make up the target amount.",
      coreLogic: `dp[x] += dp[x - coin]`,
      adaptationLogic: `dp = [1] + [0] * amount`,
      explanation: "Similar to min coins, but sum the number of ways from the subproblem where the current coin was used.",
      fullCode: `def change(amount, coins):
    [[core|dp = [1] + [0] * amount|One way to make 0 (no coins).|有一種方法湊出 0 (不選硬幣)。]]
    for coin in coins:
        [[mod|for x in range(coin, amount + 1):|Update total ways for each amount.|為每個金額更新總方法數。]]
            dp[x] += dp[x - coin]
    return dp[amount]`
    },
    {
      id: "perfect-squares",
      title: "Perfect Squares",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/perfect-squares/",
      description: "Find the least number of perfect square numbers that sum to N.",
      coreLogic: `squares = [i*i for i in range(1, int(n**0.5)+1)]
dp[x] = min(dp[x], dp[x - square] + 1)`,
      adaptationLogic: `Coins are perfect squares`,
      explanation: "Treat perfect squares up to N as the available 'coins' in an unbounded knapsack problem.",
      fullCode: `def num_squares(n):
    [[core|squares = [i*i for i in range(1, int(n**0.5) + 1)]|The available 'coins'.|可用的「硬幣」。]]
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    for s in squares:
        for i in range(s, n + 1):
            [[mod|dp[i] = min(dp[i], dp[i - s] + 1)|Update min count.|更新最小數量。]]
    return dp[n]`
    },
    {
      id: "integer-break",
      title: "Integer Break",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/integer-break/",
      description: "Break an integer N into the sum of at least two positive integers and maximize the product.",
      coreLogic: `for j in range(1, i):
    dp[i] = max(dp[i], j * (i-j), j * dp[i-j])`,
      adaptationLogic: `Build up from 1 to N`,
      explanation: "For each integer i, check all possible breaks into (j, i-j) or (j, dp[i-j]).",
      fullCode: `def integer_break(n):
    [[core|dp = [0] * (n + 1)|dp[i] stores max product for number i.|dp[i] 儲存數字 i 的最大乘積。]]
    dp[1] = 1
    for i in range(2, n + 1):
        for j in range(1, i):
            [[mod|dp[i] = max(dp[i], j * (i - j), j * dp[i - j])|Choose the best way to break current i.|選擇拆分當前 i 的最佳方式。]]
    return dp[n]`
    }
  ]
};
