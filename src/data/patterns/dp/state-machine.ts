import { AlgorithmPattern } from "../../../types";

export const stateMachineStocks: AlgorithmPattern = {
  id: "state-machine-stocks",
  name: "DP State Machine (Stock Problems)",
  category: "Dynamic Programming",
  description: "Maintain multiple states (e.g., holding vs not holding) to solve complex sequential decision problems.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n)",
    space: "O(1) with optimization",
  },
  coreTemplate: `def max_profit(prices):
    [[core|hold = -float('inf')|hold[i] = max profit on day i given I own a stock.|hold[i] 表示第 i 天持有股票時的最大利潤。]]
    [[core|sold = 0|sold[i] = max profit on day i given I do not own a stock.|sold[i] 表示第 i 天不持有股票時的最大利潤。]]
    for p in prices:
        [[mod|hold = max(hold, sold - p)|Stay holding or buy today.|維持持有或今日買入。]]
        [[mod|sold = max(sold, hold + p)|Stay sold or sell today.|維持未持有或今日賣出。]]
    return sold`,
  variations: [
    {
      id: "best-time-to-buy-sell-stock-with-cooldown",
      title: "Best Time to Buy and Sell Stock with Cooldown",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      description: "Find max profit with a one-day cooldown period after selling.",
      coreLogic: `hold = max(hold, reset - p)
reset = max(reset, sold)
sold = hold + p`,
      adaptationLogic: `three states: hold, sold, reset`,
      explanation: "Add a third state (cooldown/reset) to ensure you cannot buy immediate after a sell operation.",
      fullCode: `def max_profit_cooldown(prices):
    [[core|hold, sold, reset = -float('inf'), -float('inf'), 0|Initialize three states for cooldown logic.|為冷卻邏輯初始化三種狀態。]]
    for p in prices:
        prev_sold = sold
        [[mod|sold = hold + p|Must have held to sell today.|今日賣出前必須先持有。]]
        [[mod|hold = max(hold, reset - p)|Can only buy if was in 'reset' state.|只能在「重置」狀態下買入。]]
        [[mod|reset = max(reset, prev_sold)|Transition to reset after selling.|賣出後轉移到重置狀態。]]
    return max(sold, reset)`
    },
    {
      id: "best-time-to-buy-sell-stock-with-transaction-fee",
      title: "Best Time to Buy and Sell Stock with Transaction Fee",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
      description: "Find max profit with a fixed fee per transaction.",
      coreLogic: `hold = max(hold, sold - p)
sold = max(sold, hold + p - fee)`,
      adaptationLogic: ``,
      explanation: "Similar to the base template but subtract the fee whenever a sell operation is executed.",
      fullCode: `def max_profit_fee(prices, fee):
    [[core|hold = -prices[0]; sold = 0|Initial balance after first day.|首日後的初始餘額。]]
    for i in range(1, len(prices)):
        [[mod|hold = max(hold, sold - prices[i])|Update hold state.|更新持有狀態。]]
        [[mod|sold = max(sold, hold + prices[i] - fee)|Account for transaction fee here.|在此處計入交易費用。]]
    return sold`
    },
    {
      id: "best-time-to-buy-sell-stock-iv",
      title: "Best Time to Buy and Sell Stock IV (K Transactions)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
      description: "Find max profit with at most K transactions.",
      coreLogic: `for j in range(1, k + 1):
    buy[j] = max(buy[j], sell[j-1] - p)
    sell[j] = max(sell[j], buy[j] + p)`,
      adaptationLogic: `Array of states for each K`,
      explanation: "Maintain K pairs of hold/sold states to track profit after exactly 1, 2, ..., K completed transactions.",
      fullCode: `def max_profit_k(k, prices):
    if not prices: return 0
    [[core|buy = [-float('inf')] * (k + 1); sell = [0] * (k + 1)|States for each transaction count.|每個交易次數的狀態。]]
    for p in prices:
        for j in range(1, k + 1):
            [[mod|buy[j] = max(buy[j], sell[j-1] - p)|Max profit after buying jth stock.|買入第 j 支股票後的最大利潤。]]
            [[mod|sell[j] = max(sell[j], buy[j] + p)|Max profit after selling jth stock.|賣出第 j 支股票後的最大利潤。]]
    return sell[k]`
    }
  ]
};
