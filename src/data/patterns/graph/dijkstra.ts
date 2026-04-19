import { AlgorithmPattern } from "../../../types";

export const dijkstra: AlgorithmPattern = {
  id: "dijkstra",
  name: "Dijkstra (Shortest Path)",
  category: "Graph",
  description: "Find the shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(E log V)",
    space: "O(V + E)",
  },
  coreTemplate: `def dijkstra(n, adj, start):
    [[core|pq = [(0, start)]|Priority queue stores (distance, node).|優先隊列儲存 (距離, 節點)。]]
    dist = {i: float('inf') for i in range(n)}
    dist[start] = 0
    while pq:
        d, u = heapq.heappop(pq)
        [[core|if d > dist[u]: continue|Skip if a shorter path was already found.|若已找到更短路徑，則跳過。]]
        for v, w in adj[u]:
            [[mod|if dist[u] + w < dist[v]:|Relaxation step.|鬆弛步進。]]
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
  coreTemplateCpp: `vector<int> dijkstra(int n, unordered_map<int, vector<pair<int, int>>>& adj, int start) {
    [[core|priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;|Min-priority queue stores (distance, node).|最小優先隊列儲存 (距離, 節點)。]]
    pq.push({0, start});
    vector<int> dist(n, INT_MAX);
    dist[start] = 0;
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        [[core|if (d > dist[u]) continue;|Skip if a shorter path was already found.|若已找到更短路徑，則跳過。]]
        for (auto [v, w] : adj[u]) {
            [[mod|if (dist[u] + w < dist[v]) {|Relaxation step.|鬆弛步進。]]
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
  variations: [
    {
      id: "cheapest-flights-within-k-stops",
      title: "Cheapest Flights Within K Stops",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      description: "Find the cheapest price from src to dst with at most K stops.",
      coreLogic: `if price < dist[node] or stops < stops_limit[node]:
    dist[node] = price; stops_limit[node] = stops
    heappush(pq, (price, node, stops + 1))`,
      coreLogicCpp: `if (price < dist[node] || stops < stops_limit[node]) {
    dist[node] = price; stops_limit[node] = stops;
    pq.push({price, node, stops + 1});
}`,
      adaptationLogic: `pq = [(0, src, 0)]`,
      explanation: "Modified Dijkstra that also tracks the number of stops to prune paths that exceed the limit.",
      fullCode: `def find_cheapest_price(n, flights, src, dst, k):
    adj = collections.defaultdict(list)
    for u, v, w in flights: adj[u].append((v, w))
    
    [[core|pq = [(0, src, 0)]|Price, Current Node, Stops.|價格, 當前節點, 停靠次數。]]
    dist = {} # Stores (node, stops) -> price
    
    while pq:
        price, u, stops = heapq.heappop(pq)
        if u == dst: return price
        if stops <= k:
            for v, w in adj[u]:
                [[mod|if (v, stops) not in dist or price + w < dist[(v, stops)]:|Only push if cheaper at this stop level.|若在此停靠次數下價格更便宜則加入。]]
                    dist[(v, stops)] = price + w
                    heapq.heappush(pq, (price + w, v, stops + 1))
    return -1`,
      fullCodeCpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<vector<pair<int, int>>> adj(n);
    for (auto& f : flights) adj[f[0]].push_back({f[1], f[2]});
    
    [[core|priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;|Price, Node, Stops.|價格, 節點, 停靠次數。]]
    pq.push({0, src, 0});
    vector<int> stops_limit(n, INT_MAX);
    
    while (!pq.empty()) {
        auto curr = pq.top(); pq.pop();
        int price = curr[0], u = curr[1], stops = curr[2];
        
        if (u == dst) return price;
        if (stops > k) continue;
        if (stops_limit[u] <= stops) continue;
        stops_limit[u] = stops;
        
        for (auto& [v, w] : adj[u]) {
            [[mod|pq.push({price + w, v, stops + 1});|Standard expansion within stop limit.|在停靠次數限制內的標準擴張。]]
        }
    }
    return -1;
}`
    },
    {
      id: "network-delay-time",
      title: "Network Delay Time",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      description: "Return the minimum time it takes for all nodes to receive a signal from a source node.",
      coreLogic: `dijkstra(n, times, k)
max_dist = max(dist.values())`,
      coreLogicCpp: `auto dist = dijkstra(n, adj, k);
int max_d = *max_element(dist.begin(), dist.end());`,
      adaptationLogic: `if max_dist == inf: return -1`,
      explanation: "Standard Dijkstra Application; the time for all nodes to receive the signal is the distance to the furthest node.",
      fullCode: `def network_delay_time(times, n, k):
    adj = collections.defaultdict(list)
    for u, v, w in times: adj[u].append((v, w))
    
    pq = [(0, k)]; dist = {}
    while pq:
        d, u = heapq.heappop(pq)
        if u not in dist:
            dist[u] = d
            for v, w in adj[u]:
                heapq.heappush(pq, (d + w, v))
                
    [[mod|return max(dist.values()) if len(dist) == n else -1|Result is the max of all shortest distances.|結果即為所有最短距離的最大值。]]`,
      fullCodeCpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int, int>>> adj(n + 1);
    for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
    
    vector<int> dist(n + 1, INT_MAX);
    dist[k] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, k});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                [[mod|dist[v] = dist[u] + w; pq.push({dist[v], v});|Typical relaxation.|典型的鬆弛。]]
            }
        }
    }
    
    int max_d = 0;
    for (int i = 1; i <= n; ++i) {
        if (dist[i] == INT_MAX) return -1;
        max_d = max(max_d, dist[i]);
    }
    return max_d;
}`
    },
    {
      id: "path-with-maximum-probability",
      title: "Path with Maximum Probability",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/path-with-maximum-probability/",
      description: "Find the path with the maximal probability of success from start to end.",
      coreLogic: `if prob[u] * p > prob[v]:
    prob[v] = prob[u] * p
    heappush(pq, (-prob[v], v))`,
      coreLogicCpp: `if (prob[u] * p > prob[v]) {
    prob[v] = prob[u] * p;
    pq.push({prob[v], v});
}`,
      adaptationLogic: `Max-heap simulation with negative weights`,
      explanation: "Dijkstra adapted for multiplying probabilities instead of adding weights. Uses a max-priority queue (or min-heap with negative values).",
      fullCode: `def max_probability(n, edges, succProb, start, end):
    adj = collections.defaultdict(list)
    for i, (u, v) in enumerate(edges):
        adj[u].append((v, succProb[i])); adj[v].append((u, succProb[i]))
        
    [[core|pq = [(-1.0, start)]|Priority Queue (Max Probability).|優先隊列（最大機率）。]]
    prob = [0.0] * n; prob[start] = 1.0
    
    while pq:
        curr_p, u = heapq.heappop(pq)
        curr_p = -curr_p
        if u == end: return curr_p
        for v, p in adj[u]:
            [[mod|if prob[u] * p > prob[v]:|Relaxation for multiplication.|乘法路徑的鬆弛。]]
                prob[v] = prob[u] * p
                heapq.heappush(pq, (-prob[v], v))
    return 0`,
      fullCodeCpp: `double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start, int end) {
    vector<vector<pair<int, double>>> adj(n);
    for (int i = 0; i < edges.size(); ++i) {
        adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
        adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
    }
    
    [[core|priority_queue<pair<double, int>> pq; pq.push({1.0, start});|Max-priority queue stores (probability, node).|最大優先隊列儲存 (機率, 節點)。]]
    vector<double> prob(n, 0.0);
    prob[start] = 1.0;
    
    while (!pq.empty()) {
        auto [p, u] = pq.top(); pq.pop();
        if (u == end) return p;
        if (p < prob[u]) continue;
        
        for (auto& [v, path_p] : adj[u]) {
            [[mod|if (prob[u] * path_p > prob[v]) {|Relaxation step for probabilities.|機率的鬆弛步進。]]
                prob[v] = prob[u] * path_p;
                pq.push({prob[v], v});
            }
        }
    }
    return 0.0;
}`
    }
  ]
};
