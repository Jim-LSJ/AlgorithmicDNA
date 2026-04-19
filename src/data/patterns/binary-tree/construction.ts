import { AlgorithmPattern } from "../../../types";

export const treeConstruction: AlgorithmPattern = {
  id: "tree-construction",
  name: "Binary Tree Construction",
  category: "Binary Tree",
  description: "Construct a binary tree from various traversal sequences (Inorder, Preorder, Postorder).",
  imageUrl: "/patterns/binary-tree.png",
  complexity: {
    time: "O(n)",
    space: "O(n)",
  },
  coreTemplate: `def build_tree(preorder, inorder):
    [[core|in_map = {val: i for i, val in enumerate(inorder)}|Use a hash map to quickly find the root index in inorder sequence.|使用哈希表快速在中序序列中找到根節點索引。]]
    def solve(pre_low, pre_high, in_low, in_high):
        if pre_low > pre_high: return None
        [[core|root_val = preorder[pre_low]|First element in preorder is always the current root.|前序序列的第一個元素始終是當前根節點。]]
        root = TreeNode(root_val)
        idx = in_map[root_val]
        left_size = idx - in_low
        [[mod|root.left = solve(pre_low + 1, pre_low + left_size, in_low, idx - 1)|Recursively build the left subtree.|遞迴構建左子樹。]]
        [[mod|root.right = solve(pre_low + left_size + 1, pre_high, idx + 1, in_high)|Recursively build the right subtree.|遞迴構建右子樹。]]
        return root
    return solve(0, len(preorder)-1, 0, len(inorder)-1)`,
  coreTemplateCpp: `unordered_map<int, int> inMap;
TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    [[core|for (int i = 0; i < inorder.size(); ++i) inMap[inorder[i]] = i;|Index inorder values for O(1) lookup.|為中序值建立索引以實現 O(1) 尋找。]]
    return solve(preorder, 0, preorder.size() - 1, 0, inorder.size() - 1);
}
TreeNode* solve(vector<int>& pre, int preL, int preR, int inL, int inR) {
    if (preL > preR) return nullptr;
    TreeNode* root = new TreeNode(pre[preL]);
    int idx = inMap[pre[preL]];
    int leftSize = idx - inL;
    [[mod|root->left = solve(pre, preL + 1, preL + leftSize, inL, idx - 1);|Build left sub-tree recursively.|遞迴構建左子樹。]]
    [[mod|root->right = solve(pre, preL + leftSize + 1, preR, idx + 1, inR);|Build right sub-tree recursively.|遞迴構建右子樹。]]
    return root;
}`,
  variations: [
    {
      id: "tree-from-inorder-postorder",
      title: "Construct Binary Tree from Inorder and Postorder Traversal",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
      description: "Given inorder and postorder traversal of a tree, construct the binary tree.",
      coreLogic: `root_val = postorder[post_high]
left_size = idx - in_low
root.left = solve(post_low, post_low + left_size - 1, ...)
root.right = solve(post_low + left_size, post_high - 1, ...)`,
      coreLogicCpp: `int rootVal = postorder[postR];
int leftSize = idx - inL;
root->left = solve(inL, idx - 1, postL, postL + leftSize - 1);
root->right = solve(idx + 1, inR, postL + leftSize, postR - 1);`,
      adaptationLogic: `root is at the end of postorder`,
      explanation: "Post-order is (Left, Right, Root). Similar to Pre-order (Root, Left, Right), use the root position to divide the inorder sequence into subtrees.",
      fullCode: `def build_tree(inorder, postorder):
    in_map = {val: i for i, val in enumerate(inorder)}
    def solve(in_low, in_high, post_low, post_high):
        if in_low > in_high: return None
        [[core|root_val = postorder[post_high]|Root is the last element.|根節點是最後一個元素。]]
        root = TreeNode(root_val)
        idx = in_map[root_val]
        left_size = idx - in_low
        root.left = solve(in_low, idx - 1, post_low, post_low + left_size - 1)
        root.right = solve(idx + 1, in_high, post_low + left_size, post_high - 1)
        return root
    return solve(0, len(inorder)-1, 0, len(postorder)-1)`,
      fullCodeCpp: `TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
    unordered_map<int, int> m;
    for(int i=0; i<inorder.size(); ++i) m[inorder[i]] = i;
    function<TreeNode*(int,int,int,int)> solve = [&](int inL, int inR, int poL, int poR) {
        if(inL > inR) return nullptr;
        [[core|int val = postorder[poR];|Root value from end of postorder.|來自後序結尾的根節點值。]]
        TreeNode* root = new TreeNode(val);
        int idx = m[val];
        int leftSize = idx - inL;
        root->left = solve(inL, idx - 1, poL, poL + leftSize - 1);
        root->right = solve(idx + 1, inR, poL + leftSize, poR - 1);
        return root;
    };
    return solve(0, inorder.size()-1, 0, postorder.size()-1);
}`
    }
  ]
};
