import { AlgorithmPattern } from "../../../types";

export const dfsPattern: AlgorithmPattern = {
  id: "dfs",
  name: "Depth First Search (DFS)",
  category: "Graph",
  description: "Explore the graph by going as deep as possible along each branch before backtracking.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(V + E)",
    space: "O(V) for the recursion stack and visited set",
  },
  coreTemplate: `def dfs(u, visited, adj):
    [[core|visited.add(u)|Mark current node as visited.|將當前節點標記為已訪問。]]
    for v in adj[u]:
        if v not in visited:
            [[mod|dfs(v, visited, adj)|Recursively visit children.|遞迴訪問子節點。]]`,
  coreTemplateCpp: `void dfs(int u, unordered_set<int>& visited, unordered_map<int, vector<int>>& adj) {
    [[core|visited.insert(u);|Mark current node as visited.|將當前節點標記為已訪問。]]
    for (int v : adj[u]) {
        if (visited.find(v) == visited.end()) {
            [[mod|dfs(v, visited, adj);|Recursively visit children.|遞迴訪問子節點。]]
        }
    }
}`,
  variations: [
    {
      id: "clone-graph",
      title: "Clone Graph",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
      description: "Create a deep copy of a connected undirected graph.",
      coreLogic: `if node in mapping: return mapping[node]
clone = Node(node.val)
mapping[node] = clone
for neighbor in node.neighbors:
    clone.neighbors.append(dfs(neighbor))`,
      coreLogicCpp: `if (mapping.count(node)) return mapping[node];
Node* clone = new Node(node->val);
mapping[node] = clone;
for (Node* neighbor : node->neighbors)
    clone->neighbors.push_back(dfs(neighbor));`,
      adaptationLogic: `HashMap mapping original to clone`,
      explanation: "Use DFS to traverse the graph while using a hashmap to keep track of already cloned nodes to handle cycles correctly.",
      fullCode: `def clone_graph(node):
    if not node: return None
    [[core|mapping = {}|Maps original node to its copy.|映射原始節點至其複製品。]]
    def dfs(curr):
        if curr in mapping: return mapping[curr]
        
        [[mod|clone = Node(curr.val)|Create copy and register in map immediately.|創建副本並立即在映射表中註冊。]]
        mapping[curr] = clone
        for n in curr.neighbors:
            clone.neighbors.append(dfs(n))
        return clone
    return dfs(node)`,
      fullCodeCpp: `unordered_map<Node*, Node*> mapping;
Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    if (mapping.count(node)) return mapping[node];
    
    [[mod|Node* clone = new Node(node->val);|Create copy and register in map immediately.|創建副本並立即在映射表中註冊。]]
    mapping[node] = clone;
    for (Node* neighbor : node->neighbors) {
        clone->neighbors.push_back(cloneGraph(neighbor));
    }
    return clone;
}`
    },
    {
      id: "all-paths-from-source-to-target",
      title: "All Paths From Source to Target",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/all-paths-from-source-to-target/",
      description: "Find all possible paths from node 0 to node n-1 in a DAG.",
      coreLogic: `path.append(node)
if node == target: res.append(list(path))
else:
    for neighbor in adj[node]: dfs(neighbor, path)
path.pop()`,
      coreLogicCpp: `path.push_back(node);
if (node == target) res.push_back(path);
else for (int v : adj[node]) dfs(v, path);
path.pop_back();`,
      adaptationLogic: `Backtracking inside DFS`,
      explanation: "A variation of DFS that explores all paths (backtracking) rather than just visiting each node once.",
      fullCode: `def all_paths_source_target(graph):
    target = len(graph) - 1; res = []
    def dfs(curr, path):
        path.append(curr)
        [[mod|if curr == target:|If destination reached, record the path.|若到達目的地，記錄路徑。]]
            res.append(list(path))
        else:
            for neighbor in graph[curr]:
                dfs(neighbor, path)
        [[mod|path.pop()|Backtrack: remove for next possible path.|回溯：移除以嘗試下一條可能路徑。]]
    dfs(0, [])
    return res`,
      fullCodeCpp: `vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
    vector<vector<int>> res;
    vector<int> path;
    int target = graph.size() - 1;
    
    function<void(int)> dfs = [&](int u) {
        path.push_back(u);
        [[mod|if (u == target) res.push_back(path);|If destination reached, record the path.|若到達目的地，記錄路徑。]]
        else {
            for (int v : graph[u]) dfs(v);
        }
        [[mod|path.pop_back();|Backtrack: remove for next possible path.|回溯：移除以嘗試下一條可能路徑。]]
    };
    
    dfs(0);
    return res;
}`
    },
    {
      id: "is-graph-bipartite",
      title: "Is Graph Bipartite?",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
      description: "Determine if the graph is bipartite (nodes can be divided into two independent sets).",
      coreLogic: `if neighbor in colors:
    if colors[neighbor] == colors[curr]: return False
else:
    colors[neighbor] = 1 - colors[curr]
    if not dfs(neighbor): return False`,
      coreLogicCpp: `if (colors[v] != -1) {
    if (colors[v] == colors[u]) return false;
} else {
    colors[v] = 1 - colors[u];
    if (!dfs(v)) return false;
}`,
      adaptationLogic: `2-color marking`,
      explanation: "Use DFS to assign colors (0 or 1) to nodes. If a neighbor already has the same color as the current node, the graph is not bipartite.",
      fullCode: `def is_bipartite(graph):
    colors = {}
    def dfs(u, c):
        colors[u] = c
        for v in graph[u]:
            [[mod|if v in colors:|If already colored, must be different from current.|若已染色，顏色必須與當前不同。]]
                if colors[v] == c: return False
            else:
                [[mod|if not dfs(v, 1 - c): return False|Color neighbor with the opposite color.|用相反顏色為鄰居染色。]]
        return True
        
    for i in range(len(graph)):
        if i not in colors:
            if not dfs(i, 0): return False
    return True`,
      fullCodeCpp: `bool isBipartite(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> colors(n, -1);
    
    function<bool(int, int)> dfs = [&](int u, int c) {
        colors[u] = c;
        for (int v : graph[u]) {
            [[mod|if (colors[v] != -1) {|If already colored, must be different from current.|若已染色，顏色必須與當前不同。]]
                if (colors[v] == c) return false;
            } else {
                [[mod|if (!dfs(v, 1 - c)) return false;|Color neighbor with the opposite color.|用相反顏色為鄰居染色。]]
            }
        }
        return true;
    };
    
    for (int i = 0; i < n; ++i) {
        if (colors[i] == -1 && !dfs(i, 0)) return false;
    }
    return true;
}`
    }
  ]
};
