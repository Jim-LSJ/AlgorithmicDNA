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
  variations: [
    {
      id: "course-schedule",
      title: "Course Schedule",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      description: "Determine if all courses can be finished given prerequisites (cycle detection).",
      coreLogic: `return len(topo_order) == numCourses`,
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
            
    [[mod|return count == n|If we can visit all nodes, no cycle exists.|若能訪問所有節點，則不存在環。]]`
    },
    {
      id: "alien-dictionary",
      title: "Alien Dictionary",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
      description: "Given a list of words from an alien language, derive the character order.",
      coreLogic: `for char1, char2 in zip(w1, w2):
    if char1 != char2: adj[char1].add(char2); break`,
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
            
    return "".join(res) if len(res) == len(indegree) else ""`
    },
    {
      id: "sequence-reconstruction",
      title: "Sequence Reconstruction",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sequence-reconstruction/",
      description: "Determine if a unique topological sort exists to reconstruct the original sequence.",
      coreLogic: `if len(queue) > 1: return False`,
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
            
    return res == org`
    }
  ]
};
