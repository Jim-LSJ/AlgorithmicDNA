import { AlgorithmPattern } from "../../../types";

export const treeTraversal: AlgorithmPattern = {
  id: "tree-traversal",
  name: "Binary Tree Traversal (DFS)",
  category: "Binary Tree",
  description: "Recursively visit nodes in a binary tree in pre-order, in-order, or post-order.",
  imageUrl: "/patterns/binary-tree.png",
  complexity: {
    time: "O(n)",
    space: "O(h) where h is tree height",
  },
  coreTemplate: `def traverse(root):
    if not root: return
    [[core|# Pre-order (Visit root)|在此處訪問根節點（前序）。]]
    traverse(root.left)
    [[core|# In-order (Visit root)|在此處訪問根節點（中序）。]]
    traverse(root.right)
    [[core|# Post-order (Visit root)|在此處訪問根節點（後序）。]]`,
  coreTemplateCpp: `void traverse(TreeNode* root) {
    if (!root) return;
    [[core|// Pre-order (Visit root)|在此處訪問根節點（前序）。]]
    traverse(root->left);
    [[core|// In-order (Visit root)|在此處訪問根節點（中序）。]]
    traverse(root->right);
    [[core|// Post-order (Visit root)|在此處訪問根節點（後序）。]]
}`,
  variations: [
    {
      id: "validate-bst",
      title: "Validate Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
      description: "Determine if a binary tree is a valid Binary Search Tree (BST).",
      coreLogic: `def dfs(node, low, high):
    if not node: return True
    if not (low < node.val < high): return False
    return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)`,
      coreLogicCpp: `bool dfs(TreeNode* node, long long low, long long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return dfs(node->left, low, node->val) && dfs(node->right, node->val, high);
}`,
      adaptationLogic: `dfs(root, -inf, inf)`,
      explanation: "Use DFS to pass down the valid range for each node. Left child must be in (low, current.val) and right child in (current.val, high).",
      fullCode: `def is_valid_bst(root):
    [[core|def dfs(node, low, high):|Recursively pass constraints.|遞迴傳遞約束條件。]]
        if not node: return True
        if not (low < node.val < high): return False
        [[mod|return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)|Update boundaries for children.|更新子節點的邊界。]]
    return dfs(root, float('-inf'), float('inf'))`,
      fullCodeCpp: `bool isValidBST(TreeNode* root) {
    [[core|return dfs(root, LLONG_MIN, LLONG_MAX);|Use long long to handle edge values of INT_MIN/MAX.|使用 long long 來處理 INT_MIN/MAX 的邊界值。]]
}
bool dfs(TreeNode* node, long long low, long long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    [[mod|return dfs(node->left, low, node->val) && dfs(node->right, node->val, high);|Update boundaries based on current node value.|根據當前節點值更新邊界。]]
}`
    },
    {
      id: "lowest-common-ancestor",
      title: "Lowest Common Ancestor of a Binary Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
      description: "Find the lowest common ancestor (LCA) of two given nodes.",
      coreLogic: `left = dfs(root.left)
right = dfs(root.right)
if left and right: return root
return left or right`,
      coreLogicCpp: `TreeNode* left = lowestCommonAncestor(root->left, p, q);
TreeNode* right = lowestCommonAncestor(root->right, p, q);
if (left && right) return root;
return left ? left : right;`,
      adaptationLogic: `if root in [p, q]: return root`,
      explanation: "Recursively search for P and Q. If both children return non-null, the current node is the LCA.",
      fullCode: `def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q: return root
    [[mod|left = lowest_common_ancestor(root.left, p, q)|Search P or Q in left subtree.|在左子樹中搜尋 P 或 Q。]]
    [[mod|right = lowest_common_ancestor(root.right, p, q)|Search P or Q in right subtree.|在右子樹中搜尋 P 或 Q。]]
    
    if left and right:
        [[mod|return root|If both return, LCA is current root.|如果兩者皆有返回，LCA 即為當前根節點。]]
    return left or right`,
      fullCodeCpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    [[mod|TreeNode* left = lowestCommonAncestor(root->left, p, q);|Look for p/q in left child.|在左子節點中尋找 p/q。]]
    [[mod|TreeNode* right = lowestCommonAncestor(root->right, p, q);|Look for p/q in right child.|在右子節點中尋找 p/q。]]
    
    if (left && right) return root;
    return left ? left : right;
}`
    },
    {
      id: "maximum-depth",
      title: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      description: "Find the maximum number of nodes along the longest path from the root node down to the farthest leaf node.",
      coreLogic: `return 1 + max(dfs(node.left), dfs(node.right))`,
      coreLogicCpp: `return 1 + max(maxDepth(root->left), maxDepth(root->right));`,
      adaptationLogic: ``,
      explanation: "Post-order traversal approach where each node returns the height of its subtree.",
      fullCode: `def max_depth(root):
    if not root: return 0
    [[mod|return 1 + max(max_depth(root.left), max_depth(root.right))|Height is 1 + max height of children.|高度為 1 加上子樹的最大高度。]]`,
      fullCodeCpp: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    [[mod|return 1 + max(maxDepth(root->left), maxDepth(root->right));|Recursive height calculation.|遞迴計算高度。]]
}`
    }
  ]
};
