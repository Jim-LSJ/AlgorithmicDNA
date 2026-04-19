import { AlgorithmPattern } from "../../../types";

export const bellmanFord: AlgorithmPattern = {
  id: "bellman-ford",
  name: "Bellman-Ford",
  category: "Graph",
  description: "Find shortest paths from a single source to all vertices in a graph that may contain negative edge weights.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(V * E)",
    space: "O(V)",
  },
  coreTemplate: `def bellman_ford(n, edges, start):
    [[core|dist = [float('inf')] * n; dist[start] = 0|Initialize distances.|初始化距離。]]
    for _ in range(n - 1):
        [[mod|for u, v, w in edges:|Relax all edges V-1 times.|鬆弛所有邊 V-1 次。]]
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    [[core|# Check for negative cycles|檢查是否存在負環。]]
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return "Negative Cycle Detected"
    return dist`,
  variations: [
    {
      id: "cheapest-flights-within-k-stops",
      title: "Cheapest Flights Within K Stops (BF Version)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      description: "Find the cheapest price with at most K stops using Bellman-Ford inspiration.",
      coreLogic: `for _ in range(k + 1):
    new_dist = list(dist)
    for u, v, w in flights:
        new_dist[v] = min(new_dist[v], dist[u] + w)
    dist = new_dist`,
      adaptationLogic: `Restrict relaxation to K+1 iterations`,
      explanation: "Running the inner relaxation loop of Bellman-Ford exactly K+1 times ensures all paths found use at most K edges.",
      fullCode: `def find_cheapest_price(n, flights, src, dst, k):
    [[core|dist = [float('inf')] * n; dist[src] = 0|Initial distances.|初始距離。]]
    for _ in range(k + 1):
        [[mod|tmp = list(dist)|Use a copy to strictly limit to K steps per iteration.|使用副本以精確限制每次迭代為 K 步。]]
        for u, v, w in flights:
            if dist[u] != float('inf'):
                tmp[v] = min(tmp[v], dist[u] + w)
        dist = tmp
    return dist[dst] if dist[dst] != float('inf') else -1`
    },
    {
      id: "network-delay-time-bf",
      title: "Network Delay Time (Bellman-Ford)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      description: "Find the time signal takes to reach all nodes in a graph that could have negative edges (though LeetCode version is positive).",
      coreLogic: `dist = bellman_ford(n, times, k)
return max(dist) if max(dist) < inf else -1`,
      adaptationLogic: ``,
      explanation: "Standard Bellman-Ford can be used if weights represent delays that could be negative (e.g., scheduled gains), assuming no negative cycles.",
      fullCode: `def network_delay_time(times, n, k):
    [[core|dist = [float('inf')] * (n + 1)|Initialize distances for 1-indexed nodes.|為 1-索引節點初始化距離。]]
    dist[k] = 0
    for _ in range(n):
        for u, v, w in times:
            [[mod|if dist[u] + w < dist[v]: dist[v] = dist[u] + w|Relax edges.|鬆弛邊。]]
            
    res = max(dist[1:])
    return res if res < float('inf') else -1`
    },
    {
      id: "spfa-optimization",
      title: "Shortest Path Faster Algorithm (SPFA)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      description: "An optimized version of Bellman-Ford that uses a queue to track nodes whose distances have been updated.",
      coreLogic: `while queue:
    u = queue.pop()
    for v, w in adj[u]:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
            if v not in in_queue: queue.append(v)`,
      adaptationLogic: `Queue-based relaxation`,
      explanation: "SPFA is generally faster than Bellman-Ford but has the same worst-case complexity. It's excellent for sparse graphs with some negative edges.",
      fullCode: `def spfa(n, adj, start):
    dist = [float('inf')] * n; dist[start] = 0
    [[core|queue = deque([start]); in_queue = {start}|Queue for nodes to be processed.|待處理節點的隊列。]]
    while queue:
        u = queue.popleft(); in_queue.remove(u)
        for v, w in adj[u]:
            [[mod|if dist[u] + w < dist[v]:|Distance improved, update neighbor.|距離改善，更新鄰居。]]
                dist[v] = dist[u] + w
                if v not in in_queue:
                    queue.append(v); in_queue.add(v)
    return dist`
    }
  ]
};
