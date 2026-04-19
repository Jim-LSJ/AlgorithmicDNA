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
  coreTemplateCpp: `vector<long long> bellmanFord(int n, vector<vector<int>>& edges, int start) {
    [[core|vector<long long> dist(n, LLONG_MAX); dist[start] = 0;|Initialize distances with infinity.|使用無窮大初始化距離。]]
    for (int i = 0; i < n - 1; ++i) {
        [[mod|for (auto& edge : edges) {|Relax all edges V-1 times.|鬆弛所有邊 V-1 次。]]
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    [[core|// Check for negative cycles|檢查是否存在負環。]]
    for (auto& edge : edges) {
        if (dist[edge[0]] != LLONG_MAX && dist[edge[0]] + edge[2] < dist[edge[1]]) {
            return {}; // Negative Cycle Detected
        }
    }
    return dist;
}`,
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
      coreLogicCpp: `for (int i = 0; i < k + 1; ++i) {
    auto tmp = dist;
    for (auto& f : flights) tmp[f[1]] = min(tmp[f[1]], dist[f[0]] + f[2]);
    dist = tmp;
}`,
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
    return dist[dst] if dist[dst] != float('inf') else -1`,
      fullCodeCpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    [[core|vector<int> dist(n, 1e9); dist[src] = 0;|Use 1e9 as practical infinity.|使用 1e9 作為實際無窮大。]]
    for (int i = 0; i <= k; ++i) {
        [[mod|vector<int> tmp = dist;|Use snapshot of previous iteration.|使用前一次迭代的快照。]]
        for (auto& f : flights) {
            if (dist[f[0]] != 1e9) {
                tmp[f[1]] = min(tmp[f[1]], dist[f[0]] + f[2]);
            }
        }
        dist = tmp;
    }
    return dist[dst] == 1e9 ? -1 : dist[dst];
}`
    },
    {
      id: "network-delay-time-bf",
      title: "Network Delay Time (Bellman-Ford)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      description: "Find the time signal takes to reach all nodes in a graph that could have negative edges (though LeetCode version is positive).",
      coreLogic: `dist = bellman_ford(n, times, k)
return max(dist) if max(dist) < inf else -1`,
      coreLogicCpp: `auto dist = bellmanFord(n, times, k);
int res = *max_element(dist.begin() + 1, dist.end());`,
      adaptationLogic: ``,
      explanation: "Standard Bellman-Ford can be used if weights represent delays that could be negative (e.g., scheduled gains), assuming no negative cycles.",
      fullCode: `def network_delay_time(times, n, k):
    [[core|dist = [float('inf')] * (n + 1)|Initialize distances for 1-indexed nodes.|為 1-索引節點初始化距離。]]
    dist[k] = 0
    for _ in range(n):
        for u, v, w in times:
            [[mod|if dist[u] + w < dist[v]: dist[v] = dist[u] + w|Relax edges.|鬆弛邊。]]
            
    res = max(dist[1:])
    return res if res < float('inf') else -1`,
      fullCodeCpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    [[core|vector<int> dist(n + 1, 1e9); dist[k] = 0;|Initialize for graph nodes.|為圖節點進行初始化。]]
    for (int i = 1; i <= n; ++i) {
        [[mod|for (auto& t : times) {|Iteratively relax all edges.|迭代地鬆弛所有邊。]]
            if (dist[t[0]] != 1e9 && dist[t[0]] + t[2] < dist[t[1]]) {
                dist[t[1]] = dist[t[0]] + t[2];
            }
        }
    }
    int max_d = *max_element(dist.begin() + 1, dist.end());
    return max_d == 1e9 ? -1 : max_d;
}`
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
      coreLogicCpp: `while (!q.empty()) {
    int u = q.front(); q.pop();
    for (auto& [v, w] : adj[u])
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            if (!in_queue[v]) q.push(v);
        }
}`,
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
    return dist`,
      fullCodeCpp: `vector<int> spfa(int n, vector<vector<pair<int, int>>>& adj, int start) {
    vector<int> dist(n, 1e9); dist[start] = 0;
    [[core|queue<int> q; q.push(start); vector<bool> in_queue(n, false); in_queue[start] = true;|Queue stores nodes to relax.|隊列儲存待鬆弛的節點。]]
    while (!q.empty()) {
        int u = q.front(); q.pop(); in_queue[u] = false;
        for (auto& [v, w] : adj[u]) {
            [[mod|if (dist[u] + w < dist[v]) {|Neighbor improved.|鄰居被改善。]]
                dist[v] = dist[u] + w;
                if (!in_queue[v]) { q.push(v); in_queue[v] = true; }
            }
        }
    }
    return dist;
}`
    }
  ]
};
