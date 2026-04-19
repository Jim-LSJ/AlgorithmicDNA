import { AlgorithmPattern } from "../../../types";

export const bfsPattern: AlgorithmPattern = {
  id: "bfs",
  name: "Breadth First Search (BFS)",
  category: "Graph",
  description: "Explore the graph level-by-level using a queue, typically for shortest path in unweighted graphs.",
  imageUrl: "/patterns/bfs.png",
  complexity: {
    time: "O(V + E)",
    space: "O(V)",
  },
  coreTemplate: `def bfs(adj, start):
    [[core|queue = deque([start])|Standard queue for level-order exploration.|用於層次遍歷的標準隊列。]]
    visited = {start}
    while queue:
        [[core|for _ in range(len(queue)):|Process current level completely.|完整處理當前層。]]
            u = queue.popleft()
            for v in adj[u]:
                if v not in visited:
                    [[mod|visited.add(v); queue.append(v)|Mark visited and add to next level.|標記為已訪問並加入下一層。]]`,
  variations: [
    {
      id: "word-ladder",
      title: "Word Ladder",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
      description: "Find the length of shortest transformation sequence from beginWord to endWord.",
      coreLogic: `for i in range(L):
    pattern = word[:i] + "*" + word[i+1:]
    for next_word in adj[pattern]: ...`,
      adaptationLogic: ``,
      explanation: "Treat each word as a node and transformations as edges. BFS finds the shortest path between the two words.",
      fullCode: `def ladder_length(beginWord, endWord, wordList):
    wordList = set(wordList)
    if endWord not in wordList: return 0
    adj = collections.defaultdict(list)
    for word in [beginWord] + list(wordList):
        for i in range(len(word)):
            pattern = word[:i] + "*" + word[i+1:]
            adj[pattern].append(word)
            
    [[core|queue = deque([(beginWord, 1)])|Queue stores (word, current_step).|隊列儲存 (單字, 當前步數)。]]
    visited = {beginWord}
    while queue:
        word, dist = queue.popleft()
        if word == endWord: return dist
        for i in range(len(word)):
            pattern = word[:i] + "*" + word[i+1:]
            for neighbor in adj[pattern]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, dist + 1))
    return 0`
    },
    {
      id: "shortest-bridge",
      title: "Shortest Bridge (Multi-Source BFS)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/shortest-bridge/",
      description: "Find the minimum number of zeros to flip to connect two islands of ones.",
      coreLogic: `queue = find_first_island_with_dfs()
while queue: expand_level_by_level()`,
      adaptationLogic: ``,
      explanation: "Find the first island using DFS and put all its coordinates into a queue. Use multi-source BFS to expand until another island is hit.",
      fullCode: `def shortest_bridge(grid):
    [[core|# 1. DFS to find and collect one island|1. 使用 DFS 找到並收集第一個島嶼。]]
    queue = deque()
    # ... (DFS code to fill queue with all nodes of first island)
    
    [[mod|# 2. Multi-source BFS to reach the second island|2. 使用多源 BFS 到達第二個島嶼。]]
    steps = 0
    while queue:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for nr, nc in neighbors(r, c):
                if grid[nr][nc] == 1: return steps
                if grid[nr][nc] == 0:
                    grid[nr][nc] = -1 # Mark visited
                    queue.append((nr, nc))
        steps += 1`
    },
    {
      id: "walls-and-gates",
      title: "Walls and Gates",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/walls-and-gates/",
      description: "Fill each empty room with the distance to its nearest gate.",
      coreLogic: `queue = all_gates
while queue: dist[next] = dist[curr] + 1`,
      adaptationLogic: ``,
      explanation: "Classic multi-source BFS where all gates are added to the queue initially, propagating distances outwards.",
      fullCode: `def walls_and_gates(rooms):
    [[core|queue = deque([(r, c) for each room if room == GATE])|Multi-source: start from all gates.|多源：從所有門開始。]]
    while queue:
        r, c = queue.popleft()
        for nr, nc in neighbors(r, c):
            if rooms[nr][nc] == EMPTY:
                [[mod|rooms[nr][nc] = rooms[r][c] + 1|Update distance in-place.|就地更新距離。]]
                queue.append((nr, nc))`
    }
  ]
};
