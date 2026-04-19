import { AlgorithmPattern } from "../../../types";

export const digitDP: AlgorithmPattern = {
  id: "digit-dp",
  name: "Digit DP",
  category: "Dynamic Programming",
  description: "Count numbers that satisfy certain properties in a given range [L, R], usually based on digit-by-digit construction.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(digits * states)",
    space: "O(digits * states)",
  },
  coreTemplate: `def count(n_str):
    @lru_cache(None)
    def dfs(idx, is_less, is_started, state):
        [[core|if idx == len(n_str): return 1 if is_started else 0|Base case: all digits placed.|基底情況：所有位數已放置。]]
        res = 0
        [[mod|limit = int(n_str[idx]) if not is_less else 9|Determine upper bound for current digit.|確定當前位數的上限。]]
        for d in range(limit + 1):
            res += dfs(idx + 1, is_less or (d < limit), is_started or (d > 0), next_state)
    return dfs(0, False, False, initial_state)`,
  variations: [
    {
      id: "numbers-with-unique-digits",
      title: "Numbers With Repeated Digits",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/numbers-with-repeated-digits/",
      description: "Find the number of positive integers less than or equal to N that have at least one repeated digit.",
      coreLogic: `res += dfs(idx + 1, ..., mask | (1 << d))
if mask & (1 << d): # duplicate found`,
      adaptationLogic: `Complement counting: N - unique_digits(N)`,
      explanation: "Calculate the count of numbers with *no* repeated digits using a bitmask to track used digits, then subtract from total N.",
      fullCode: `def num_dup_digits_at_most_n(n):
    s = str(n)
    @lru_cache(None)
    def dfs(idx, is_less, is_started, mask):
        if idx == len(s): return 1 if is_started else 0
        res = 0
        limit = int(s[idx]) if not is_less else 9
        for d in range(limit + 1):
            if is_started or d > 0:
                [[mod|if not (mask & (1 << d)):|Only pick digits not already in the mask.|僅選擇尚未在 mask 中的位數。]]
                    res += dfs(idx + 1, is_less or d < limit, True, mask | (1 << d))
            else:
                res += dfs(idx + 1, is_less or d < limit, False, 0)
        return res
    return n - dfs(0, False, False, 0)`
    },
    {
      id: "count-of-integers",
      title: "Count of Integers",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/count-of-integers/",
      description: "Count integers in [num1, num2] such that the sum of digits is between min_sum and max_sum.",
      coreLogic: `res += dfs(idx + 1, ..., curr_sum + d)`,
      adaptationLogic: `dfs(n2) - dfs(n1 - 1)`,
      explanation: "Standard digit DP counting where the 'state' is the current running sum of digits.",
      fullCode: `def count_integers(num1, num2, min_sum, max_sum):
    def solve(n_str):
        @lru_cache(None)
        def dfs(idx, is_less, curr_sum):
            if curr_sum > max_sum: return 0
            if idx == len(n_str): return 1 if curr_sum >= min_sum else 0
            
            res = 0
            limit = int(n_str[idx]) if not is_less else 9
            for d in range(limit + 1):
                [[mod|res += dfs(idx + 1, is_less or d < limit, curr_sum + d)|Pass current sum as state.|將當前總和作為狀態傳遞。]]
            return res
        return dfs(0, False, 0)
        
    [[core|ans = solve(num2) - solve(str(int(num1)-1))|Range query using prefix subtraction.|使用前綴相減進行範圍查詢。]]
    return ans % (10**9 + 7)`
    },
    {
      id: "number-of-digit-one",
      title: "Number of Digit One",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/number-of-digit-one/",
      description: "Count the total number of digit '1' appearing in all non-negative integers less than or equal to N.",
      coreLogic: `res += dfs(...) + (d == 1) * count_ways`,
      adaptationLogic: `State includes count of 1s found`,
      explanation: "Add one to the result whenever a '1' is placed at current index, multiplied by the number of ways to complete the remaining digits.",
      fullCode: `def count_digit_one(n):
    s = str(n)
    @lru_cache(None)
    def dfs(idx, is_less, ones_count):
        if idx == len(s): return ones_count
        res = 0
        limit = int(s[idx]) if not is_less else 9
        for d in range(limit + 1):
            [[mod|res += dfs(idx + 1, is_less or d < limit, ones_count + (1 if d == 1 else 0))|Count how many ones are formed.|計算形成了多少個 1。]]
        return res
    return dfs(0, False, 0)`
    }
  ]
};
