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
  coreTemplateCpp: `int coinChange(vector<int>& coins, int amount) {
    [[core|vector<int> dp(amount + 1, 1e9); dp[0] = 0;|Use a large value like 1e9 for infinity.|使用如 1e9 的大數值表示無窮大。]]
    for (int coin : coins) {
        [[mod|for (int i = coin; i <= amount; ++i) {|Foundational unbounded iteration.|基礎的無限制迭代。]]
            dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
  variations: [
    {
      id: "coin-change-ii",
      title: "Coin Change II (Total Ways)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
      description: "Find the total number of ways to make up the target amount.",
      coreLogic: `dp[x] += dp[x - coin]`,
      coreLogicCpp: `for (int coin : coins)
    for (int i = coin; i <= amount; ++i)
        dp[i] += dp[i - coin];`,
      adaptationLogic: `dp = [1] + [0] * amount`,
      explanation: "Similar to min coins, but sum the number of ways from the subproblem where the current coin was used.",
      fullCode: `def change(amount, coins):
    [[core|dp = [1] + [0] * amount|One way to make 0 (no coins).|有一種方法湊出 0 (不選硬幣)。]]
    for coin in coins:
        [[mod|for x in range(coin, amount + 1):|Update total ways for each amount.|為每個金額更新總方法數。]]
            dp[x] += dp[x - coin]
    return dp[amount]`,
      fullCodeCpp: `int change(int amount, vector<int>& coins) {
    [[core|vector<int> dp(amount + 1, 0); dp[0] = 1;|Base case: one way to make zero.|基底情況：有一種方法湊出零。]]
    for (int coin : coins) {
        [[mod|for (int i = coin; i <= amount; ++i)|Accumulate number of ways.|累積方法數。]]
            dp[i] += dp[i - coin];
    }
    return dp[amount];
}`
    },
    {
      id: "perfect-squares",
      title: "Perfect Squares",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/perfect-squares/",
      description: "Find the least number of perfect square numbers that sum to N.",
      coreLogic: `squares = [i*i for i in range(1, int(n**0.5)+1)]
dp[x] = min(dp[x], dp[x - square] + 1)`,
      coreLogicCpp: `for (int s : squares)
    for (int i = s; i <= n; ++i)
        dp[i] = min(dp[i], dp[i - s] + 1);`,
      adaptationLogic: `Coins are perfect squares`,
      explanation: "Treat perfect squares up to N as the available 'coins' in an unbounded knapsack problem.",
      fullCode: `def num_squares(n):
    [[core|squares = [i*i for i in range(1, int(n**0.5) + 1)]|The available 'coins'.|可用的「硬幣」。]]
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    for s in squares:
        for i in range(s, n + 1):
            [[mod|dp[i] = min(dp[i], dp[i - s] + 1)|Update min count.|更新最小數量。]]
    return dp[n]`,
      fullCodeCpp: `int numSquares(int n) {
    [[core|vector<int> dp(n + 1, n + 1); dp[0] = 0;|Initialize DP table.|初始化 DP 表。]]
    for (int i = 1; i * i <= n; ++i) {
        int s = i * i;
        for (int j = s; j <= n; ++j) {
            [[mod|dp[j] = min(dp[j], dp[j - s] + 1);|Standard unbounded relaxation.|標準無限制鬆弛。]]
        }
    }
    return dp[n];
}`
    },
    {
      id: "integer-break",
      title: "Integer Break",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/integer-break/",
      description: "Break an integer N into the sum of at least two positive integers and maximize the product.",
      coreLogic: `for j in range(1, i):
    dp[i] = max(dp[i], j * (i-j), j * dp[i-j])`,
      coreLogicCpp: `for (int j = 1; j < i; ++j)
    dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});`,
      adaptationLogic: `Build up from 1 to N`,
      explanation: "For each integer i, check all possible breaks into (j, i-j) or (j, dp[i-j]).",
      fullCode: `def integer_break(n):
    [[core|dp = [0] * (n + 1)|dp[i] stores max product for number i.|dp[i] 儲存數字 i 的最大乘積。]]
    dp[1] = 1
    for i in range(2, n + 1):
        for j in range(1, i):
            [[mod|dp[i] = max(dp[i], j * (i - j), j * dp[i - j])|Choose the best way to break current i.|選擇拆分當前 i 的最佳方式。]]
    return dp[n]`,
      fullCodeCpp: `int integerBreak(int n) {
    [[core|vector<int> dp(n + 1, 0); dp[1] = 1;|DP table for max products.|用於最大乘積的 DP 表。]]
    for (int i = 2; i <= n; ++i) {
        for (int j = 1; j < i; ++j) {
            [[mod|dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});|Max between not breaking or breaking further.|選擇不進一步拆分或進步拆分之間的最大值。]]
        }
    }
    return dp[n];
}`
    }
  ]
};
