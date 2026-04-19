import { AlgorithmPattern } from "../../../types";

export const treeDP: AlgorithmPattern = {
  id: "dp-on-tree",
  name: "DP on Tree",
  category: "Dynamic Programming",
  description: "Dynamic programming applied to tree structures, typically involving calculating states based on children's results.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(n)",
    space: "O(n) for recursion stack and DP storage",
  },
  coreTemplate: `def solve(node, parent):
    [[core|dp = [0, node.val]|Initialize state for (not include, include) current node.|初始化（不包含、包含）當前節點的狀態。]]
    for child in adj[node]:
        if child == parent: continue
        res = solve(child, node)
        [[mod|dp[0] += max(res[0], res[1])|If not including current, children can be anything.|若不包含當前節點，子節點可以是任何狀態。]]
        [[mod|dp[1] += res[0]|If including current, children must not be included.|若包含當前節點，子節點不得包含。]]
    return dp`,
  coreTemplateCpp: `pair<int, int> solve(TreeNode* node) {
    [[core|if (!node) return {0, 0};|Base case: null node.|基底情況：空節點。]]
    auto left = solve(node->left);
    auto right = solve(node->right);
    [[mod|int not_include = max(left.first, left.second) + max(right.first, right.second);|Max profit without current node.|不包含當前節點的最大利潤。]]
    [[mod|int include = node->val + left.first + right.first;|Max profit with current node.|包含當前節點的最大利潤。]]
    return {not_include, include};
}`,
  variations: [
    {
      id: "house-robber-iii",
      title: "House Robber III",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/house-robber-iii/",
      description: "Find the maximum amount of money you can rob from houses arranged in a binary tree without robbing two directly-linked houses.",
      coreLogic: `left = dfs(node.left); right = dfs(node.right)
rob = node.val + left[1] + right[1]
not_rob = max(left) + max(right)
return [rob, not_rob]`,
      coreLogicCpp: `auto left = dfs(node->left);
auto right = dfs(node->right);
int rob = node->val + left[1] + right[1];
int not_rob = max(left[0], left[1]) + max(right[0], right[1]);`,
      adaptationLogic: `Post-order traversal`,
      explanation: "Each node returns two values: the max profit if the node is robbed, and the max profit if it is *not* robbed.",
      fullCode: `def rob(root):
    def dfs(node):
        if not node: return [0, 0]
        [[core|l = dfs(node.left); r = dfs(node.right)|Get results from children.|獲取子節點的結果。]]
        
        [[mod|rob_curr = node.val + l[1] + r[1]|Rob current -> cannot rob children.|搶劫當前節點 -> 不能搶劫子節點。]]
        [[mod|not_rob_curr = max(l) + max(r)|Not rob current -> can rob children or not.|不搶當前節點 -> 可以搶或不搶子節點。]]
        
        return [rob_curr, not_rob_curr]
    return max(dfs(root))`,
      fullCodeCpp: `vector<int> dfs(TreeNode* root) {
    if (!root) return {0, 0};
    [[core|vector<int> left = dfs(root->left); vector<int> right = dfs(root->right);|Post-order DFS traversal.|後序 DFS 遍歷。]]
    [[mod|int rob = root->val + left[1] + right[1];|Rob current node.|搶劫當前節點。]]
    [[mod|int not_rob = max(left[0], left[1]) + max(right[0], right[1]);|Do not rob current node.|不搶劫當前節點。]]
    return {rob, not_rob};
}
int rob(TreeNode* root) {
    vector<int> res = dfs(root);
    return max(res[0], res[1]);
}`
    },
    {
      id: "binary-tree-cameras",
      title: "Binary Tree Cameras",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-cameras/",
      description: "Find the minimum number of cameras needed to monitor all nodes in a binary tree.",
      coreLogic: `if l == 0 or r == 0: res += 1; return 1 # Has camera
if l == 1 or r == 1: return 2 # Covered
return 0 # Not covered`,
      coreLogicCpp: `if (l == 0 || r == 0) { res++; return 1; }
if (l == 1 || r == 1) return 2;
return 0;`,
      adaptationLogic: `Greedy + Post-order DFS`,
      explanation: "Use three states: 0 (not covered), 1 (has camera), 2 (covered by child). Greedily place a camera at the parent if any child is not covered.",
      fullCode: `def min_camera_cover(root):
    self.res = 0
    def dfs(node):
        if not node: return 2
        l, r = dfs(node.left), dfs(node.right)
        [[mod|if l == 0 or r == 0:|Either child is not covered, must place camera here.|任一子節點未被覆蓋，必須在此處放置攝影機。]]
            self.res += 1
            return 1
        [[mod|if l == 1 or r == 1: return 2|Covered by a child's camera.|被子節點的攝影機覆蓋。]]
        return 0 # Not covered
        
    if dfs(root) == 0: self.res += 1
    return self.res`,
      fullCodeCpp: `int res = 0;
int dfs(TreeNode* node) {
    if (!node) return 2;
    int l = dfs(node->left), r = dfs(node->right);
    [[mod|if (l == 0 || r == 0) { res++; return 1; }|If any child needs coverage, add camera.|若任何子節點需要覆蓋，則增加攝影機。]]
    [[mod|return (l == 1 || r == 1) ? 2 : 0;|Report coverage status to parent.|向父節點回報覆蓋狀態。]]
}
int minCameraCover(TreeNode* root) {
    if (dfs(root) == 0) res++;
    return res;
}`
    },
    {
      id: "all-nodes-distance-k-in-binary-tree",
      title: "All Nodes Distance K in Binary Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
      description: "Find all nodes at distance K from a given target node.",
      coreLogic: `build_adj_with_parents(root)
bfs(target, k)`,
      coreLogicCpp: `buildMap(root, nullptr);
queue<TreeNode*> q; q.push(target);
while (k--) { ... BFS ... }`,
      adaptationLogic: `Graph conversion`,
      explanation: "First, convert the tree into a general graph by adding 'parent' pointers, then perform a standard BFS from the target node.",
      fullCode: `def distance_k(root, target, k):
    [[core|# Step 1: Annotate parents to treat tree as graph|步驟 1：註解父節點將樹視為圖。]]
    def add_parent(node, p=None):
        if node:
            node.parent = p
            add_parent(node.left, node)
            add_parent(node.right, node)
    add_parent(root)
    
    [[mod|# Step 2: BFS from target|步驟 2：從目標點開始 BFS。]]
    queue = deque([target])
    visited = {target}
    for _ in range(k):
        for _ in range(len(queue)):
            u = queue.popleft()
            for v in [u.left, u.right, u.parent]:
                if v and v not in visited:
                    visited.add(v); queue.append(v)
    return [n.val for n in queue]`,
      fullCodeCpp: `unordered_map<TreeNode*, TreeNode*> parent;
void buildParent(TreeNode* node, TreeNode* p) {
    if (!node) return;
    parent[node] = p;
    buildParent(node->left, node);
    buildParent(node->right, node);
}
vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
    [[core|buildParent(root, nullptr);|Step 1: Map each node to its parent.|步驟 1：將每個節點映射到其父節點。]]
    queue<TreeNode*> q; q.push(target);
    unordered_set<TreeNode*> visited = {target};
    int dist = 0;
    while (!q.empty() && dist < k) {
        [[mod|int size = q.size(); while(size--) {|Standard BFS layer processing.|標準 BFS 分層處理。]]
            TreeNode* u = q.front(); q.pop();
            for (TreeNode* v : {u->left, u->right, parent[u]}) {
                if (v && !visited.count(v)) { visited.insert(v); q.push(v); }
            }
        }
        dist++;
    }
    vector<int> res;
    while (!q.empty()) { res.push_back(q.front()->val); q.pop(); }
    return res;
}`
    }
  ]
};
