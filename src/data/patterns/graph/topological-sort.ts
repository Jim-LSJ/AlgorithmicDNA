import { AlgorithmPattern } from "../../../types";

export const topologicalSort: AlgorithmPattern = {
  id: "topological-sort",
  name: "Topological Sort",
  category: "Graph",
  description: "Linear ordering of vertices such that for every directed edge (u, v), vertex u comes before v.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(V + E)",
    space: "O(V + E)",
  },
  coreTemplate: `def kahn_algorithm(n, adj):
    [[core|in_degree = [0] * n|Track incoming edges for each node.|追蹤每個節點的入度。]]
    for u in adj:
        for v in adj[u]: in_degree[v] += 1
        
    [[core|queue = deque([i for i in range(n) if in_degree[i] == 0])|Start with nodes that have no dependencies.|從沒有依賴項的節點開始。]]
    res = []
    while queue:
        u = queue.popleft()
        res.append(u)
        for v in adj[u]:
            [[mod|in_degree[v] -= 1|Remove the dependency.|移除依賴。]]
            if in_degree[v] == 0: queue.append(v)
    return res if len(res) == n else []`,
  coreTemplateCpp: `vector<int> kahnAlgorithm(int n, unordered_map<int, vector<int>>& adj) {
    [[core|vector<int> in_degree(n, 0);|Track incoming edges for each node.|追蹤每個節點的入度。]]
    for (auto& entry : adj)
        for (int v : entry.second) in_degree[v]++;
        
    [[core|queue<int> q; for(int i=0; i<n; ++i) if(in_degree[i] == 0) q.push(i);|Start with nodes that have no dependencies.|從沒有依賴項的節點開始。]]
    vector<int> res;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        res.push_back(u);
        for (int v : adj[u]) {
            [[mod|if (--in_degree[v] == 0) q.push(v);|Remove dependency and check if next.|移除依賴並檢查是否為下一個。]]
        }
    }
    return res.size() == n ? res : vector<int>();
}`,
  variations: [
    {
      id: "course-schedule",
      title: "Course Schedule",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      description: "Determine if all courses can be finished given prerequisites (cycle detection).",
      coreLogic: `return len(topo_order) == numCourses`,
      coreLogicCpp: `return topo_order.size() == numCourses;`,
      adaptationLogic: ``,
      explanation: "A directed graph is acyclic if and only if a topological sort exists covering all vertices.",
      fullCode: `def can_finish(n, prerequisites):
    adj = collections.defaultdict(list)
    indegree = [0] * n
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
        
    queue = deque([i for i in range(n) if indegree[i] == 0])
    count = 0
    while queue:
        count += 1
        for neighbor in adj[queue.popleft()]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0: queue.append(neighbor)
            
    [[mod|return count == n|If we can visit all nodes, no cycle exists.|若能訪問所有節點，則不存在環。]]`,
      fullCodeCpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);
    
    int count = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        count++;
        for (int v : adj[u]) {
            [[mod|if (--inDegree[v] == 0) q.push(v);|Standard Kahn's reduction.|標準 Kahn's 演算法的入度縮減。]]
        }
    }
    return count == numCourses;
}`
    },
    {
      id: "alien-dictionary",
      title: "Alien Dictionary",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
      description: "Given a list of words from an alien language, derive the character order.",
      coreLogic: `for char1, char2 in zip(w1, w2):
    if char1 != char2: adj[char1].add(char2); break`,
      coreLogicCpp: `for (int j = 0; j < min(w1.size(), w2.size()); ++j) {
    if (w1[j] != w2[j]) { adj[w1[j]].insert(w2[j]); break; }
}`,
      adaptationLogic: `return "".join(topo_order)`,
      explanation: "Build a directed graph from lexicographical comparisons of adjacent words, then perform topological sort.",
      fullCode: `def alien_order(words):
    adj = {c: set() for w in words for c in w}
    indegree = {c: 0 for w in words for c in w}
    for w1, w2 in zip(words, words[1:]):
        for char1, char2 in zip(w1, w2):
            if char1 != char2:
                if char2 not in adj[char1]:
                    adj[char1].add(char2)
                    indegree[char2] += 1
                break
        else:
            if len(w2) < len(w1): return ""
            
    queue = deque([c for c in indegree if indegree[c] == 0])
    res = []
    while queue:
        c = queue.popleft(); res.append(c)
        for next_c in adj[c]:
            indegree[next_c] -= 1
            if indegree[next_c] == 0: queue.append(next_c)
            
    return "".join(res) if len(res) == len(indegree) else ""`,
      fullCodeCpp: `string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> inDegree;
    for (string& w : words) for (char c : w) inDegree[c] = 0;
    
    for (int i = 0; i < words.size() - 1; ++i) {
        string w1 = words[i], w2 = words[i+1];
        int len = min(w1.size(), w2.size());
        bool found = false;
        for (int j = 0; j < len; ++j) {
            if (w1[j] != w2[j]) {
                if (!adj[w1[j]].count(w2[j])) {
                    adj[w1[j]].insert(w2[j]); inDegree[w2[j]]++;
                }
                found = true; break;
            }
        }
        if (!found && w1.size() > w2.size()) return "";
    }
    
    queue<char> q;
    for (auto& entry : inDegree) if (entry.second == 0) q.push(entry.first);
    
    string res = "";
    while (!q.empty()) {
        char c = q.front(); q.pop();
        res += c;
        for (char next : adj[c]) {
            [[mod|if (--inDegree[next] == 0) q.push(next);|Topologically process alien characters.|按拓撲順序處理外星字元。]]
        }
    }
    return res.size() == inDegree.size() ? res : "";
}`
    },
    {
      id: "sequence-reconstruction",
      title: "Sequence Reconstruction",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sequence-reconstruction/",
      description: "Determine if a unique topological sort exists to reconstruct the original sequence.",
      coreLogic: `if len(queue) > 1: return False`,
      coreLogicCpp: `if (q.size() > 1) return false;`,
      adaptationLogic: ``,
      explanation: "A topological sort is unique if and only if at each step of Kahn's algorithm, there is exactly one node with an in-degree of zero.",
      fullCode: `def sequence_reconstruction(org, seqs):
    adj = collections.defaultdict(set)
    indegree = collections.defaultdict(int)
    nodes = set()
    for s in seqs:
        for x in s: nodes.add(x)
        for i in range(len(s) - 1):
            if s[i+1] not in adj[s[i]]:
                adj[s[i]].add(s[i+1])
                indegree[s[i+1]] += 1
    
    if nodes != set(org): return False
    queue = deque([i for i in org if indegree[i] == 0])
    res = []
    while queue:
        [[mod|if len(queue) > 1: return False|More than one zero-indegree node means the order is not unique.|超過一個入度為零的節點意味著排序不唯一。]]
        u = queue.popleft()
        res.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0: queue.append(v)
            
    return res == org`,
      fullCodeCpp: `bool sequenceReconstruction(vector<int>& org, vector<vector<int>>& seqs) {
    int n = org.size();
    vector<unordered_set<int>> adj(n + 1);
    vector<int> inDegree(n + 1, 0);
    bool has_nodes = false;
    for (auto& s : seqs) {
        if (!s.empty()) has_nodes = true;
        for (int i = 0; i < (int)s.size() - 1; ++i) {
            if (s[i] < 1 || s[i] > n || s[i+1] < 1 || s[i+1] > n) return false;
            if (!adj[s[i]].count(s[i+1])) {
                adj[s[i]].insert(s[i+1]); inDegree[s[i+1]]++;
            }
        }
    }
    if (!has_nodes && !org.empty()) return false;
    
    queue<int> q;
    for (int i = 1; i <= n; ++i) if (inDegree[i] == 0) q.push(i);
    
    int index = 0;
    while (!q.empty()) {
        [[mod|if (q.size() > 1) return false;|If multiple candidates, path is not unique.|若有多個候選者，路徑則不唯一。]]
        int u = q.front(); q.pop();
        if (index >= n || org[index++] != u) return false;
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    return index == n;
}`
    }
  ]
};
