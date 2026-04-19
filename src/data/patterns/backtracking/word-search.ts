import { AlgorithmPattern } from "../../../types";

export const wordSearch: AlgorithmPattern = {
  id: "word-search",
  name: "Word Search (Matrix Backtracking)",
  category: "Backtracking",
  description: "Searching for a specific string pattern within a 2D grid/matrix.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(M * N * 3^L) where L is word length",
    space: "O(L)",
  },
  coreTemplate: `def exist(board, word):
    def backtrack(r, c, idx):
        if idx == len(word): return True
        if r < 0 or c < 0 or r >= R or c >= C or board[r][c] != word[idx]: return False
        
        [[core|temp = board[r][c]|Mark as visited.|標記為已訪問。]]
        [[core|board[r][c] = '#'|Temporarily modify board.|暫時修改網格。]]
        
        [[mod|res = any(backtrack(r+dr, c+dc, idx+1) for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)])|Explore all 4 directions.|探索 4 個方向。]]
        
        [[core|board[r][c] = temp|Restore for other paths (Unmark).|為其他路徑恢復（取消標記）。]]
        return res
    return any(backtrack(r, c, 0) for r in range(R) for c in range(C))`,
  variations: []
};
