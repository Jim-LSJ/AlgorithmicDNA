import { AlgorithmPattern } from "../../../types";

export const mstPattern: AlgorithmPattern = {
  id: "mst-kruskal",
  name: "Minimum Spanning Tree (Kruskal)",
  category: "Graph",
  description: "Find a subset of edges that connects all vertices together, without any cycles and with the minimum total edge weight.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(E log E) or O(E log V)",
    space: "O(V + E)",
  },
  coreTemplate: `def kruskal(n, edges):
    [[core|edges.sort(key=lambda x: x[2])|Sort all edges by weight.|按權重對所有邊進行排序。]]
    uf = UnionFind(n)
    mst_weight = 0
    for u, v, w in edges:
        [[mod|if uf.union(u, v):|If union successful, no cycle is formed.|若合併成功，則未形成環。]]
            mst_weight += w
    return mst_weight`,
  coreTemplateCpp: `int kruskal(int n, vector<vector<int>>& edges) {
    [[core|sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) { return a[2] < b[2]; });|Sort all edges by weight.|按權重對所有邊進行排序。]]
    UnionFind uf(n);
    int mst_weight = 0;
    for (auto& edge : edges) {
        [[mod|if (uf.unite(edge[0], edge[1])) {|If unite successful, no cycle is formed.|若合併成功，則未形成環。]]
            mst_weight += edge[2];
        }
    }
    return mst_weight;
}`,
  variations: [
    {
      id: "min-cost-to-connect-all-points",
      title: "Min Cost to Connect All Points",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      description: "Find the minimum cost to connect all points based on Manhattan distance.",
      coreLogic: `edges = build_complete_graph()
return kruskal(n, edges)`,
      coreLogicCpp: `auto edges = buildCompleteGraph();
return kruskal(n, edges);`,
      adaptationLogic: ``,
      explanation: "Generate all possible edges between N points (Manhattan distance) and find the MST using Kruskal's or Prim's algorithm.",
      fullCode: `def min_cost_connect_points(points):
    n = len(points); edges = []
    for i in range(n):
        for j in range(i + 1, n):
            dist = abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
            edges.append((i, j, dist))
            
    [[core|edges.sort(key=lambda x: x[2])|Greedily pick shortest distances.|貪婪地挑選最短距離。]]
    uf = UnionFind(n); res = edges_count = 0
    for u, v, w in edges:
        if uf.union(u, v):
            res += w; edges_count += 1
            if edges_count == n - 1: break
    return res`,
      fullCodeCpp: `int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size();
    vector<vector<int>> edges;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            int dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);
            edges.push_back({i, j, dist});
        }
    }
    [[core|sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) { return a[2] < b[2]; });|Greedily pick shortest distances.|貪婪地挑選最短距離。]]
    UnionFind uf(n);
    int res = 0, count = 0;
    for (auto& e : edges) {
        if (uf.unite(e[0], e[1])) {
            res += e[2]; if (++count == n - 1) break;
        }
    }
    return res;
}`
    },
    {
      id: "optimize-water-distribution",
      title: "Optimize Water Distribution in a Village",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
      description: "Minimize cost to supply water to all houses, either by building wells or laying pipes.",
      coreLogic: `add virtual_node with edges to all houses (well costs)
find MST of expanded graph`,
      coreLogicCpp: `addVirtualNode();
return kruskal(n + 1, pipes);`,
      adaptationLogic: `Virtual Source trick`,
      explanation: "Create a virtual 'water source' node and connect it to each house i with an edge weight equal to the cost of digging a well at house i. Then find the MST of the whole graph.",
      fullCode: `def min_cost_to_supply_water(n, wells, pipes):
    [[core|# Add virtual node 0 for wells|為水井增加虛擬節點 0。]]
    for i, cost in enumerate(wells):
        pipes.append([0, i + 1, cost])
        
    [[mod|# Standard Kruskal on the expanded graph|對擴展後的圖應用標準 Kruskal 演算法。]]
    pipes.sort(key=lambda x: x[2])
    uf = UnionFind(n + 1); res = 0
    for u, v, w in pipes:
        if uf.union(u, v): res += w
    return res`,
      fullCodeCpp: `int minCostToSupplyWater(int n, vector<int>& wells, vector<vector<int>>& pipes) {
    [[core|for (int i = 0; i < n; ++i) pipes.push_back({0, i + 1, wells[i]});|Add virtual node 0 for wells.|為水井增加虛擬節點 0。]]
    sort(pipes.begin(), pipes.end(), [](const vector<int>& a, const vector<int>& b){ return a[2] < b[2]; });
    UnionFind uf(n + 1);
    int res = 0;
    for (auto& p : pipes) {
        [[mod|if (uf.unite(p[0], p[1])) res += p[2];|Standard MST on the modified graph.|在修改後的圖上執行標準 MST。]]
    }
    return res;
}`
    },
    {
      id: "prim-algorithm",
      title: "Prim's Algorithm",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      description: "Find MST by growing a single bridge from a starting node.",
      coreLogic: `pq = [(0, 0)]
while pq:
    w, u = heappop(pq)
    if u in visited: continue
    res += w; visited.add(u)
    for v, weight in adj[u]: heappush(pq, (weight, v))`,
      coreLogicCpp: `pq.push({0, 0});
while (!pq.empty()) {
    if (visited[u]) continue;
    res += w; visited[u] = true;
    for (auto& [v, weight] : adj[u]) pq.push({weight, v});
}`,
      adaptationLogic: ``,
      explanation: "Start from a single node and always add the cheapest edge that connects a vertex in the tree to a vertex outside the tree.",
      fullCode: `def prim(n, adj):
    [[core|pq = [(0, 0)]|Start from node 0 with 0 cost.|從 0 號節點開始，成本為 0。]]
    visited = set(); res = 0
    while len(visited) < n:
        cost, u = heapq.heappop(pq)
        if u in visited: continue
        [[mod|res += cost; visited.add(u)|Add node to MST.|將節點加入 MST。]]
        for v, w in adj[u]:
            if v not in visited:
                heapq.heappush(pq, (w, v))
    return res`,
      fullCodeCpp: `int prim(int n, vector<vector<pair<int, int>>>& adj) {
    [[core|priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq; pq.push({0, 0});|Start from node 0.|從 0 號節點開始。]]
    vector<bool> visited(n, false);
    int res = 0, count = 0;
    while (!pq.empty() && count < n) {
        auto [w, u] = pq.top(); pq.pop();
        if (visited[u]) continue;
        [[mod|res += w; visited[u] = true; count++;|Incorporate node into the tree.|將節點納入樹中。]]
        for (auto& [v, weight] : adj[u]) {
            if (!visited[v]) pq.push({weight, v});
        }
    }
    return res;
}`
    }
  ]
};
