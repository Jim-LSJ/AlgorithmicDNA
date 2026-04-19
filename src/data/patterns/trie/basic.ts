import { AlgorithmPattern } from "../../../types";

export const triePattern: AlgorithmPattern = {
  id: "trie",
  name: "Trie (Prefix Tree)",
  category: "Trie",
  description: "A tree-like data structure used to store a dynamic set of strings, where keys are usually strings.",
  imageUrl: "/patterns/trie.png",
  complexity: {
    time: "O(L) per operation where L is string length",
    space: "O(ALPHABET_SIZE * L * N)",
  },
  coreTemplate: `class TrieNode:
    def __init__(self):
        [[core|self.children = {}|Each node stores children in a map or array.|每個節點在映射或陣列中儲存子節點。]]
        [[core|self.is_end = False|Flag to mark the end of a word.|標記單字結尾的旗標。]]

class Trie:
    def insert(self, word):
        node = self.root
        for char in word:
            [[mod|if char not in node.children: node.children[char] = TrieNode()|Create new node if path doesn't exist.|如果路徑不存在則創建新節點。]]
            node = node.children[char]
        node.is_end = True`,
  coreTemplateCpp: `struct TrieNode {
    [[core|TrieNode* children[26] = {nullptr};|Fixed size array for English alphabet.|針對英文字母表的固定大小陣列。]]
    bool isEnd = false;
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int i = c - 'a';
            [[mod|if (!node->children[i]) node->children[i] = new TrieNode();|Allocate new child if missing.|如果缺失，則分配新的子節點。]]
            node = node->children[i];
        }
        node->isEnd = true;
    }
};`,
  variations: [
    {
      id: "word-dictionary-search",
      title: "Design Add and Search Words Data Structure",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      description: "Support adding words and searching with a '.' wildcard character.",
      coreLogic: `if char == '.':
    for child in node.children:
        if dfs(index + 1, child): return True
else:
    if char not in node.children: return False
    return dfs(index + 1, node.children[char])`,
      coreLogicCpp: `if (word[idx] == '.') {
    for (int i = 0; i < 26; i++) {
        if (node->children[i] && dfs(word, idx + 1, node->children[i])) return true;
    }
} else {
    int i = word[idx] - 'a';
    return node->children[i] && dfs(word, idx + 1, node->children[i]);
}`,
      adaptationLogic: `dfs(0, self.root)`,
      explanation: "Add a wildcard search capability to Trie using DFS to explore all possible children when '.' is encountered.",
      fullCode: `class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def search(self, word):
        def dfs(idx, node):
            if idx == len(word): return node.is_end
            char = word[idx]
            [[mod|if char == '.':|Wildcard logic: try all possible branches.|通配符邏輯：嘗試所有可能的分支。]]
                for child in node.children.values():
                    if dfs(idx + 1, child): return True
                return False
            else:
                if char not in node.children: return False
                return dfs(idx + 1, node.children[char])
        return dfs(0, self.root)`,
      fullCodeCpp: `class WordDictionary {
    TrieNode* root = new TrieNode();
    bool dfs(const string& word, int idx, TrieNode* node) {
        if (idx == word.size()) return node->isEnd;
        if (word[idx] == '.') {
            [[mod|for (auto child : node->children)|Recursive check for wildcard.|針對通配符進行遞迴檢查。]]
                if (child && dfs(word, idx + 1, child)) return true;
            return false;
        }
        int i = word[idx] - 'a';
        return node->children[i] && dfs(word, idx + 1, node->children[i]);
    }
public:
    bool search(string word) { return dfs(word, 0, root); }
};`
    },
    {
      id: "word-search-ii",
      title: "Word Search II (Matrix + Trie)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
      description: "Find all words from a dictionary that exist in a 2D grid.",
      coreLogic: `dfs(r, c, trie.root, path)
if node.is_end: res.add(path); node.is_end = False`,
      coreLogicCpp: `if (node->isEnd) { res.push_back(node->word); node->isEnd = false; }
if (board[r][c] == '#' || !node->children[board[r][c]-'a']) return;`,
      adaptationLogic: ``,
      explanation: "Optimized multi-word search by pruning the matrix backtracking DFS using a Trie of target words.",
      fullCode: `def find_words(board, words):
    trie = build_trie(words)
    res = set()
    def dfs(r, c, node, path):
        [[core|if node.is_end: res.add(path); node.is_end = False|Found a word; mark False to avoid duplicates.|找到單字；標記為 False 以避免重複。]]
        if not (0 <= r < R and 0 <= c < C) or board[r][c] not in node.children: return
        
        char = board[r][c]
        board[r][c] = "#" # Mark visited
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r+dr, c+dc, node.children[char], path + char)
        board[r][c] = char # Unmark
        
    for r in range(R):
        for c in range(C):
            dfs(r, c, trie.root, "")
    return list(res)`,
      fullCodeCpp: `void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& res) {
    char ch = board[r][c];
    if (ch == '#' || !node->children[ch - 'a']) return;
    node = node->children[ch - 'a'];
    if (node->isEnd) {
        [[core|res.push_back(node->word);|Store word and mark end as false for uniqueness.|存儲單字並將結尾標記為 false 以確保唯一性。]]
        node->isEnd = false;
    }
    board[r][c] = '#';
    if (r > 0) dfs(board, r - 1, c, node, res);
    if (c > 0) dfs(board, r, c - 1, node, res);
    if (r < R - 1) dfs(board, r + 1, c, node, res);
    if (c < C - 1) dfs(board, r, c + 1, node, res);
    board[r][c] = ch; // [[mod|Backtrack|回溯]]
}`
    },
    {
      id: "map-sum-pairs",
      title: "Map Sum Pairs (Prefix Sum on Trie)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/map-sum-pairs/",
      description: "Return the sum of all keys that have a given prefix.",
      coreLogic: `def insert(key, val):
    delta = val - self.map.get(key, 0)
    for char in key: node.score += delta`,
      coreLogicCpp: `int delta = val - counts[key];
for (char c : key) node->score += delta;`,
      adaptationLogic: ``,
      explanation: "Each node in the Trie stores the sum of 'values' of all words passing through it, allowing O(PrefixLength) subtotal queries.",
      fullCode: `class MapSum:
    def __init__(self):
        self.root = {'score': 0, 'children': {}}
        self.map = {}

    def insert(self, key, val):
        delta = val - self.map.get(key, 0)
        self.map[key] = val
        node = self.root
        for c in key:
            if c not in node['children']: node['children'][c] = {'score': 0, 'children': {}}
            node = node['children'][c]
            [[mod|node['score'] += delta|Update the aggregate score for this prefix.|更新此前綴的聚合分數。]]

    def sum(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node['children']: return 0
            node = node['children'][c]
        [[mod|return node['score']|Return precomputed total.|返回預先計算好的總數。]]`,
      fullCodeCpp: `class MapSum {
    struct Node {
        int score = 0;
        Node* next[128] = {nullptr}; // Handle wider character range
    } *root = new Node();
    unordered_map<string, int> m;
public:
    void insert(string key, int val) {
        int delta = val - m[key];
        m[key] = val;
        Node* node = root;
        for (char c : key) {
            [[mod|if (!node->next[c]) node->next[c] = new Node();|Allocate node if needed.|需要時分配節點。]]
            node = node->next[c];
            node->score += delta;
        }
    }
    int sum(string prefix) {
        Node* node = root;
        for (char c : prefix) {
            if (!(node = node->next[c])) return 0;
        }
        return node->score;
    }
};`
    }
  ]
};
