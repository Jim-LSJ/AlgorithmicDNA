import { AlgorithmPattern } from "../../../types";

export const lcaPattern: AlgorithmPattern = {
  id: "lca",
  name: "Lowest Common Ancestor (LCA)",
  category: "Binary Tree",
  description: "Find the lowest common ancestor of two given nodes in a binary tree.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n)",
    space: "O(h) for recursion stack",
  },
  coreTemplate: `def lca(root, p, q):
    [[core|if not root or root == p or root == q: return root|If we hit p, q, or None, return current node.|若命中 p、q 或 None，則返回當前節點。]]
    [[core|left = lca(root.left, p, q)|Search in left subtree.|在左子樹中搜尋。]]
    [[core|right = lca(root.right, p, q)|Search in right subtree.|在右子樹中搜尋。]]
    [[mod|if left and right: return root|If both subtrees return something, current node is the LCA.|若兩原子樹都有返回，當前節點即為 LCA。]]
    return left if left else right`,
  variations: [
    {
      id: "lca-deepest-leaves",
      title: "LCA of Deepest Leaves",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/",
      description: "Find the LCA of all the deepest leaves in the tree.",
      coreLogic: `def dfs(u):
    if not u: return 0, None
    l_h, l_lca = dfs(u.left)
    r_h, r_lca = dfs(u.right)
    if l_h == r_h: return l_h + 1, u
    if l_h > r_h: return l_h + 1, l_lca
    return r_h + 1, r_lca`,
      adaptationLogic: `return dfs(root)[1]`,
      explanation: "Returns both the height and the LCA of deepest leaves for each subtree. If heights match, the current node is the new LCA.",
      fullCode: `def lca_deepest_leaves(root):
    [[core|def dfs(u):|Returns [depth, LCA_of_deepest_leaves].|返回 [深度, 最深葉節點的 LCA]。]]
        if not u: return 0, None
        l_d, l_node = dfs(u.left)
        r_d, r_node = dfs(u.right)
        
        [[mod|if l_d == r_d: return l_d + 1, u|If depths are equal, u is the joint ancestor of deepest leaves from both sides.|若深度相等，u 即為兩側最深葉節點的共同祖先。]]
        [[mod|elif l_d > r_d: return l_d + 1, l_node|Left is deeper, take LCA from left.|左側更深，取左側的 LCA。]]
        else: return r_d + 1, r_node # Right is deeper
        
    return dfs(root)[1]`
    }
  ]
};
