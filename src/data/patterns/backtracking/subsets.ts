import { AlgorithmPattern } from "../../../types";

export const subsets: AlgorithmPattern = {
  id: "subsets",
  name: "Subsets (Power Set)",
  category: "Backtracking",
  description: "Generate all possible subset combinations of a given set.",
  imageUrl: "/patterns/backtracking.png",
  complexity: {
    time: "O(n * 2^n)",
    space: "O(n * 2^n)",
  },
  coreTemplate: `def subsets(nums):
    res = []
    def backtrack(idx, path):
        [[core|res.append(path[:])|Every path is a valid subset.|每一條路徑都是一個有效子集。]]
        for i in range(idx, len(nums)):
            [[mod|backtrack(i + 1, path + [nums[i]])|Move to the next available index.|移動到下一個可用的索引。]]
    backtrack(0, [])
    return res`,
  coreTemplateCpp: `void backtrack(vector<int>& nums, int idx, vector<int>& curr, vector<vector<int>>& res) {
    [[core|res.push_back(curr);|Every node in the recursion tree is a subset.|遞迴樹中的每個節點都是一個子集。]]
    for (int i = idx; i < nums.size(); ++i) {
        [[mod|curr.push_back(nums[i]);|Include element.|包含元素。]]
        backtrack(nums, i + 1, curr, res);
        [[mod|curr.pop_back();|Backtrack.|回溯。]]
    }
}`,
  variations: [
    {
      id: "subsets-ii",
      title: "Subsets II (Duplicates)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
      description: "Generate all possible subsets when duplicates exist in the input.",
      coreLogic: `nums.sort()
if i > idx and nums[i] == nums[i-1]: continue`,
      coreLogicCpp: `sort(nums.begin(), nums.end());
if (i > idx && nums[i] == nums[i - 1]) continue;`,
      adaptationLogic: ``,
      explanation: "Sort the input and skip identical elements at the same recursion depth to avoid duplicate subsets.",
      fullCode: `def subsets_with_dup(nums):
    [[core|nums.sort()|Sorting is essential for duplicate removal.|排序對於去除重複項至關重要。]]
    res = []
    def backtrack(idx, path):
        res.append(path[:])
        for i in range(idx, len(nums)):
            [[mod|if i > idx and nums[i] == nums[i-1]: continue|Skip duplicate branches.|跳過重複的分支。]]
            backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return res`,
      fullCodeCpp: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int)> backtrack = [&](int idx) {
        res.push_back(curr);
        for (int i = idx; i < nums.size(); i++) {
            [[mod|if (i > idx && nums[i] == nums[i-1]) continue;|Pruning at same depth.|在同一深度進行剪枝。]]
            curr.push_back(nums[i]);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return res;
}`
    },
    {
      id: "combinations",
      title: "Combinations (Subset of size K)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/combinations/",
      description: "Find all possible combinations of K numbers from 1 to N.",
      coreLogic: `if len(path) == k:
    res.append(path[:]); return`,
      coreLogicCpp: `if (curr.size() == k) { res.push_back(curr); return; }`,
      adaptationLogic: ``,
      explanation: "Similar to power set, but only record paths that reach the target length K.",
      fullCode: `def combine(n, k):
    res = []
    def backtrack(start, curr):
        [[core|if len(curr) == k:|Base case: target size reached.|基底情況：達到目標大小。]]
            res.append(curr[:]); return
        
        for i in range(start, n + 1):
            curr.append(i)
            backtrack(i + 1, curr)
            [[mod|curr.pop()|Backtrack.|回溯。]]
    backtrack(1, [])
    return res`,
      fullCodeCpp: `vector<vector<int>> combine(int n, int k) {
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int)> backtrack = [&](int start) {
        [[core|if (curr.size() == k) { res.push_back(curr); return; }|Collect result at target size.|在目標大小時收集結果。]]
        for (int i = start; i <= n; i++) {
            curr.push_back(i);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(1);
    return res;
}`
    },
    {
      id: "combination-sum",
      title: "Combination Sum (Infinite use)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
      description: "Find all unique combinations where the numbers sum to target (unlimited use of elements).",
      coreLogic: `if target == 0: res.append(path[:])
for i in range(idx, len(candidates)):
    if target >= candidates[i]:
        backtrack(i, target - candidates[i], path + [candidates[i]])`,
      coreLogicCpp: `if (target == 0) { res.push_back(curr); return; }
for (int i = idx; i < candidates.size(); i++) {
    if (target >= candidates[i]) {
        curr.push_back(candidates[i]);
        backtrack(i, target - candidates[i]);
        curr.pop_back();
    }
}`,
      adaptationLogic: `backtrack(i, ...) instead of i + 1`,
      explanation: "Allow elements to be reused by passing the current index 'i' instead of 'i + 1' to the next recursive call.",
      fullCode: `def combination_sum(candidates, target):
    res = []
    def backtrack(idx, remain, path):
        if remain == 0:
            res.append(path[:]); return
        for i in range(idx, len(candidates)):
            if candidates[i] <= remain:
                [[mod|backtrack(i, remain - candidates[i], path + [candidates[i]])|Reuse current index 'i'.|重複使用當前索引 'i'。]]
    backtrack(0, target, [])
    return res`,
      fullCodeCpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int, int)> backtrack = [&](int idx, int remain) {
        if (remain == 0) { res.push_back(curr); return; }
        for (int i = idx; i < candidates.size(); i++) {
            if (candidates[i] <= remain) {
                curr.push_back(candidates[i]);
                [[mod|backtrack(i, remain - candidates[i]);|Same index 'i' to allow reuse.|使用相同索引 'i' 以允許重複使用。]]
                curr.pop_back();
            }
        }
    };
    backtrack(0, target);
    return res;
}`
    }
  ]
};
