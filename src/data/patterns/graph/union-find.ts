import { AlgorithmPattern } from "../../../types";

export const unionFind: AlgorithmPattern = {
  id: "union-find",
  name: "Union Find / Disjoint Set",
  category: "Graph",
  description: "Maintain a set of disjoint sets and support union and find operations efficiently.",
  imageUrl: "/patterns/graph.png",
  complexity: {
    time: "O(alpha(n)) - Inverse Ackermann function",
    space: "O(n)",
  },
  coreTemplate: `class UnionFind:
    def __init__(self, n):
        [[core|self.parent = list(range(n))|Initially, every element is its own parent.|起初，每個元素都是自己的父節點。]]
        [[core|self.rank = [1] * n|Rank is used for balancing the trees during union.|使用 Rank 在合併時維持樹的平衡。]]
        
    def find(self, i):
        if self.parent[i] == i: return i
        [[mod|self.parent[i] = self.find(self.parent[i])|Path compression: flatten the structure for efficiency.|路徑壓縮：將結構扁平化以提高效率。]]
        return self.parent[i]
        
    def union(self, i, j):
        root_i, root_j = self.find(i), self.find(j)
        if root_i != root_j:
            [[core|if self.rank[root_i] > self.rank[root_j]:|Union by Rank: attach the smaller tree under the larger one.|按邊秩合併：將較小的樹接到較大的樹下。]]
                self.parent[root_j] = root_i
            else:
                self.parent[root_i] = root_j
                if self.rank[root_i] == self.rank[root_j]: self.rank[root_j] += 1
            return True
        return False`,
  variations: [
    {
      id: "redundant-connection",
      title: "Redundant Connection",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
      description: "Find an edge that can be removed so that the resulting graph is a tree with no cycles.",
      coreLogic: `for u, v in edges:
    if not uf.union(u, v): return [u, v]`,
      adaptationLogic: `uf = UnionFind(n + 1)`,
      explanation: "Use Union Find to detect the first edge that connects two nodes already in the same component, which forms a cycle.",
      fullCode: `def find_redundant_connection(edges):
    n = len(edges)
    uf = UnionFind(n + 1)
    for u, v in edges:
        [[mod|if not uf.union(u, v):|If union fails, nodes are already connected -> this edge is redundant.|若合併失敗，表示兩點已連通，此邊即為多餘邊（環）。]]
            return [u, v]
    return []`
    },
    {
      id: "number-of-islands",
      title: "Number of Islands (UF Version)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
      description: "Count the number of connected components of '1's in a grid.",
      coreLogic: `if grid[r][c] == '1':
    count += 1
    for nr, nc in neighbors:
        if uf.union(idx1, idx2): count -= 1`,
      adaptationLogic: `index = r * cols + c`,
      explanation: "Treat each '1' as a component and merge with neighboring '1's, decrementing the total count on each successful merge.",
      fullCode: `def num_islands(grid):
    if not grid: return 0
    R, C = len(grid), len(grid[0])
    uf = UnionFind(R * C)
    count = sum(row.count('1') for row in grid)
    
    for r in range(R):
        for c in range(C):
            if grid[r][c] == '1':
                for dr, dc in [(0,1),(1,0)]:
                    nr, nc = r+dr, c+dc
                    if nr < R and nc < C and grid[nr][nc] == '1':
                        [[mod|if uf.union(r*C + c, nr*C + nc):|Merge adjacent island cells and reduce island count.|合併相鄰陸地細胞並減少島嶼總數。]]
                            count -= 1
    return count`
    },
    {
      id: "smallest-string-swaps",
      title: "Smallest String With Swaps",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/smallest-string-with-swaps/",
      description: "Sort characters within connected components of indices that can be swapped.",
      coreLogic: `for u, v in pairs: uf.union(u, v)
groups[uf.find(i)].append(s[i])
sort_each_group()`,
      adaptationLogic: ``,
      explanation: "Indices that can be swapped form connected components. Characters at these indices can be rearranged to any permutation; we choose the sorted one.",
      fullCode: `def smallest_string_with_swaps(s, pairs):
    n = len(s)
    uf = UnionFind(n)
    for u, v in pairs: uf.union(u, v)
    
    [[core|groups = collections.defaultdict(list)|Group characters by their root component.|按連通分量的根節點分組字元。]]
    for i, char in enumerate(s):
        groups[uf.find(i)].append(char)
        
    for res_chars in groups.values(): res_chars.sort(reverse=True)
    
    res = []
    for i in range(n):
        [[mod|res.append(groups[uf.find(i)].pop())|Pick the smallest available character for this component.|為此分量挑選當前最小的可用字元。]]
    return "".join(res)`
    }
  ]
};
