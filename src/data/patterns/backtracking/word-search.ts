import { AlgorithmPattern } from "../../../types";

export const wordSearch: AlgorithmPattern = {
  id: "word-search",
  name: "Word Search (Matrix Backtracking)",
  category: "Backtracking",
  description: "Searching for a specific string pattern within a 2D grid/matrix.",
  imageUrl: "/patterns/backtracking.png",
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
  coreTemplateCpp: `bool backtrack(vector<vector<char>>& board, string& word, int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] != word[idx]) return false;
    
    [[core|char temp = board[r][c]; board[r][c] = '#';|Mark cell.|標記格位。]]
    int dr[] = {0, 0, 1, -1}, dc[] = {1, -1, 0, 0};
    for (int i = 0; i < 4; i++) {
        if (backtrack(board, word, r + dr[i], c + dc[i], idx + 1)) return true;
    }
    [[core|board[r][c] = temp;|Unmark cell.|取消標記。]]
    return false;
}`,
  variations: []
};
