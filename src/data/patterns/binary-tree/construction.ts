import { AlgorithmPattern } from "../../../types";

export const treeConstruction: AlgorithmPattern = {
  id: "tree-construction",
  name: "Binary Tree Construction",
  category: "Binary Tree",
  description: "Construct a binary tree from various traversal sequences (Inorder, Preorder, Postorder).",
  imageUrl: "/patterns/sorting.png",
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
  variations: []
};
