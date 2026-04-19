import { AlgorithmPattern } from "../../../types";

export const bitmaskDP: AlgorithmPattern = {
  id: "bitmask-dp",
  name: "Bitmask DP",
  category: "Dynamic Programming",
  description: "Use bit manipulation to represent sets of elements in a DP state, typically for NP-hard problems with small constraints.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(2^n * n^2)",
    space: "O(2^n * n)",
  },
  coreTemplate: `def solve(n):
    [[core|dp = [[-1] * n for _ in range(1 << n)]|dp[mask][i] stores the state covering elements in mask, ending at i.|dp[mask][i] 儲存涵蓋 mask 中元素且以 i 結尾的狀態。]]
    def dfs(mask, last):
        if mask == (1 << n) - 1: return base_case
        if dp[mask][last] != -1: return dp[mask][last]
        [[mod|for next_bit in range(n):|Try adding each unvisited element to the set.|嘗試將每個未訪問的元素加入集合。]]
            if not (mask & (1 << next_bit)):
                # update dp using dfs(mask | (1 << next_bit), next_bit)
    return dfs(1, 0)`,
  variations: [
    {
      id: "can-i-win",
      title: "Can I Win",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/can-i-win/",
      description: "Determine if the first player can reach the target sum given a set of integers.",
      coreLogic: `if state in memo: return memo[state]
for i in range(1, max_int + 1):
    if not (mask & (1 << i)):
        if current + i >= target or not dfs(mask | (1 << i), current + i):
            memo[state] = True; return True`,
      adaptationLogic: `memoization with bitmask`,
      explanation: "The set of used integers is represented by a bitmask. The current player wins if they can pick a number that reaches the target or leave the other player in a losing state.",
      fullCode: `def can_i_win(max_int, total):
    if (1 + max_int) * max_int // 2 < total: return False
    memo = {}
    def dfs(mask, curr):
        if mask in memo: return memo[mask]
        for i in range(1, max_int + 1):
            if not (mask & (1 << i)):
                [[mod|if curr + i >= total or not dfs(mask | (1 << i), curr + i):|Standard win-loss game theory with memoization.|標準的勝負賽局理論與記憶化。]]
                    memo[mask] = True; return True
        memo[mask] = False; return False
    return dfs(0, 0)`
    },
    {
      id: "matchsticks-to-square",
      title: "Matchsticks to Square",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/matchsticks-to-square/",
      description: "Determine if all matchsticks can be partitioned into four equal sides.",
      coreLogic: `if mask == (1 << n) - 1: return True
if dp[mask] != -1: return dp[mask]
for i in range(n):
    if not (mask & (1 << i)) and current + match[i] <= side:
        if dfs(mask | (1 << i), (current + match[i]) % side): ...`,
      adaptationLogic: `mask-based partitioning`,
      explanation: "Bitmask DP is more efficient than standard backtracking here as it prevents redundant exploration of the same set of used matchsticks.",
      fullCode: `def makesquare(matchsticks):
    total = sum(matchsticks)
    if total % 4: return False
    side = total // 4
    n = len(matchsticks); dp = [-1] * (1 << n)
    def dfs(mask, curr):
        if mask == (1 << n) - 1: return True
        if dp[mask] != -1: return dp[mask]
        for i in range(n):
            if not (mask & (1 << i)) and curr + matchsticks[i] <= side:
                [[mod|if dfs(mask | (1 << i), (curr + matchsticks[i]) % side):|Mod side: if side is full, reset current to 0 for next side.|對邊長取模：若一邊已滿，重置為 0 以開始下一邊。]]
                    dp[mask] = 1; return True
        dp[mask] = 0; return False
    return dfs(0, 0)`
    },
    {
      id: "shortest-path-visiting-all-nodes",
      title: "Shortest Path Visiting All Nodes",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
      description: "Find the shortest path that visits all nodes in a graph.",
      coreLogic: `queue = [(node, 1 << node, 0)]
while queue:
    node, mask, dist = queue.popleft()
    if mask == (1 << n) - 1: return dist`,
      adaptationLogic: `BFS + Bitmask State`,
      explanation: "Combined BFS and Bitmask state. Each state is (current_node, visited_mask). BFS naturally finds the shortest distance.",
      fullCode: `def shortest_path_length(graph):
    n = len(graph); target = (1 << n) - 1
    [[core|queue = deque([(i, 1 << i, 0) for i in range(n)])|Start from each node as a multi-source.|從每個節點開始作為多個源頭。]]
    visited = {(i, 1 << i) for i in range(n)}
    while queue:
        u, mask, d = queue.popleft()
        if mask == target: return d
        for v in graph[u]:
            new_mask = mask | (1 << v)
            [[mod|if (v, new_mask) not in visited:|Check if this state (node, set) was visited.|檢查此狀態（節點，集合）是否曾被訪問過。]]
                visited.add((v, new_mask))
                queue.append((v, new_mask, d + 1))`
    }
  ]
};
