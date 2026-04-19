import { AlgorithmPattern } from "../../../types";

export const gridBacktracking: AlgorithmPattern = {
  id: "flood-fill",
  name: "Grid Backtracking / Flood Fill",
  category: "Backtracking",
  description: "Traverse 2D grids to find paths, connected components, or solve puzzles like word searching.",
  imageUrl: "/patterns/backtracking.png",
  complexity: {
    time: "O(4^N) for pathfinding, O(R*C) for flood fill",
    space: "O(R*C) for the recursion stack",
  },
  coreTemplate: `def flood_fill(grid, r, c, target, replace):
    if not (0 <= r < R and 0 <= c < C) or grid[r][c] != target: return
    [[mod|grid[r][c] = replace|Mark current cell and recurse.|標記當前格位並遞迴。]]
    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
        flood_fill(grid, r + dr, c + dc, target, replace)`,
  variations: [
    {
      id: "word-search",
      title: "Word Search",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/word-search/",
      description: "Find if a word exists in a 2D board of characters.",
      coreLogic: `if board[r][c] != word[idx]: return False
temp, board[r][c] = board[r][c], "#"
res = any(dfs(nr, nc, idx + 1) for nr, nc in neighbors)
board[r][c] = temp`,
      adaptationLogic: `Mark/Unmark for path uniqueness`,
      explanation: "Backtracking on a grid: mark the current cell as used ('#') to ensure it's not reused in the same word, then revert it for other search paths.",
      fullCode: `def exist(board, word):
    R, C = len(board), len(board[0])
    def dfs(r, c, idx):
        if idx == len(word): return True
        if not (0 <= r < R and 0 <= c < C) or board[r][c] != word[idx]: return False
        
        [[mod|temp, board[r][c] = board[r][c], "#"|Temporarily mark as visited.|暫時標記為已訪問。]]
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            if dfs(r + dr, c + dc, idx + 1): return True
        [[mod|board[r][c] = temp|Backtrack: restore character.|回溯：恢復字元。]]
        return False
        
    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0): return True
    return False`
    },
    {
      id: "number-of-islands-dfs",
      title: "Number of Islands (DFS Version)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
      description: "Count the number of connected components of '1's in a grid.",
      coreLogic: `for r, c in grid:
    if grid[r][c] == '1':
        islands += 1
        flood_fill_zeroes(r, c)`,
      adaptationLogic: `Grid modification to mark visited`,
      explanation: "Whenever land ('1') is found, increment the count and use DFS to 'sink' the entire island by changing all connected '1's to '0's.",
      fullCode: `def num_islands(grid):
    R, C = len(grid), len(grid[0])
    def sink(r, c):
        if not (0 <= r < R and 0 <= c < C) or grid[r][c] == '0': return
        [[mod|grid[r][c] = '0'|Sink this part of the island.|淹沒這部分島嶼。]]
        sink(r+1, c); sink(r-1, c); sink(r, c+1); sink(r, c-1)
        
    count = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == '1':
                [[mod|count += 1; sink(r, c)|Found a new island, sink all its territory.|發現新島嶼，淹沒其所有領土。]]
    return count`
    },
    {
      id: "sudoku-solver",
      title: "Sudoku Solver",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
      description: "Fill the empty cells of a 9x9 Sudoku board.",
      coreLogic: `if is_valid(r, c, char):
    board[r][c] = char
    if solve(): return True
    board[r][c] = "."`,
      adaptationLogic: `Recursive search over all possible characters`,
      explanation: "Try every possible digit (1-9) in each empty cell, backtracking if the current configuration leads to no solution.",
      fullCode: `def solve_sudoku(board):
    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for d in "123456789":
                        if is_valid(r, c, d):
                            [[mod|board[r][c] = d|Try placing a digit.|嘗試放置數字。]]
                            if solve(): return True
                            board[r][c] = '.' # Backtrack
                    return False
        return True
    solve()`
    }
  ]
};
