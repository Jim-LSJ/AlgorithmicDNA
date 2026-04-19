import { AlgorithmPattern } from "../../../types";

export const pathSum: AlgorithmPattern = {
  id: "path-sum",
  name: "Path Sum Problems",
  category: "Binary Tree",
  description: "Algorithms for computing sums along paths from root to leaves or between arbitrary nodes.",
  imageUrl: "/patterns/binary-tree.png",
  complexity: {
    time: "O(n)",
    space: "O(h)",
  },
  coreTemplate: `def has_path_sum(root, targetSum):
    if not root: return False
    [[mod|if not root.left and not root.right:|Base case: leaf node.|基底情況：葉子節點。]]
        return root.val == targetSum
    [[mod|return has_path_sum(root.left, targetSum - root.val) or has_path_sum(root.right, targetSum - root.val)|Subtract current value from target sum and continue.|從目標和中減去當前值並繼續。]]`,
  variations: [
    {
      id: "path-sum-ii",
      title: "Path Sum II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/path-sum-ii/",
      description: "Find all root-to-leaf paths where each path's sum equals the given target.",
      coreLogic: `if is_leaf and curr_sum == target: res.append(path[:])
dfs(left, curr_sum + left.val, path + [left.val])`,
      adaptationLogic: `backtrack pattern`,
      explanation: "Use backtracking to keep track of the current path while traversing from root to leaves.",
      fullCode: `def path_sum(root, target):
    res = []
    def dfs(node, curr_sum, path):
        if not node: return
        path.append(node.val)
        if not node.left and not node.right and curr_sum == node.val:
            [[mod|res.append(list(path))|Found a valid path.|找到有效路徑。]]
        else:
            dfs(node.left, curr_sum - node.val, path)
            dfs(node.right, curr_sum - node.val, path)
        path.pop() # Backtrack
    dfs(root, target, [])
    return res`
    },
    {
      id: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      description: "Find the maximum path sum of any non-empty path in the tree.",
      coreLogic: `left = max(dfs(node.left), 0)
right = max(dfs(node.right), 0)
self.ans = max(self.ans, node.val + left + right)
return node.val + max(left, right)`,
      adaptationLogic: ``,
      explanation: "Post-order traversal where each node calculates the maximum path sum passing *through* it (left-node-right) and returns the maximum path sum starting from it to its parent.",
      fullCode: `def max_path_sum(root):
    self.res = float('-inf')
    def dfs(node):
        if not node: return 0
        [[core|left = max(0, dfs(node.left))|Ignore paths with negative sums.|忽略總和為負的路徑。]]
        [[core|right = max(0, dfs(node.right))|Ignore paths with negative sums.|忽略總和為負的路徑。]]
        [[mod|self.res = max(self.res, node.val + left + right)|Update global maximum.|更新全局最大值。]]
        return node.val + max(left, right)
    dfs(root)
    return self.res`
    },
    {
      id: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
      description: "Find the length of the longest path between any two nodes in a tree.",
      coreLogic: `left = dfs(node.left)
right = dfs(node.right)
self.ans = max(self.ans, left + right)
return 1 + max(left, right)`,
      adaptationLogic: ``,
      explanation: "Similar to max path sum, but measure the distance (number of edges) instead of node values.",
      fullCode: `def diameter_of_binary_tree(root):
    self.res = 0
    def dfs(node):
        if not node: return 0
        l, r = dfs(node.left), dfs(node.right)
        [[mod|self.res = max(self.res, l + r)|Update max diameter found so far.|更新目前找到的最大直徑。]]
        return 1 + max(l, r)
    dfs(root)
    return self.res`
    }
  ]
};
