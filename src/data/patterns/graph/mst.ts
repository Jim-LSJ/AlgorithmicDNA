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
  variations: [
    {
      id: "min-cost-to-connect-all-points",
      title: "Min Cost to Connect All Points",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      description: "Find the minimum cost to connect all points based on Manhattan distance.",
      coreLogic: `edges = build_complete_graph()
return kruskal(n, edges)`,
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
    return res`
    },
    {
      id: "optimize-water-distribution",
      title: "Optimize Water Distribution in a Village",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
      description: "Minimize cost to supply water to all houses, either by building wells or laying pipes.",
      coreLogic: `add virtual_node with edges to all houses (well costs)
find MST of expanded graph`,
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
    return res`
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
    return res`
    }
  ]
};
