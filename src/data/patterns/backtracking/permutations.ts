import { AlgorithmPattern } from "../../../types";

export const permutations: AlgorithmPattern = {
  id: "permutations",
  name: "Permutations",
  category: "Backtracking",
  description: "Generate all possible permutations of a set of elements.",
  imageUrl: "/patterns/backtracking.png",
  complexity: {
    time: "O(n * n!)",
    space: "O(n!) for results or O(n) for recursion stack",
  },
  coreTemplate: `def permute(nums):
    [[core|res = []|List to store all valid permutations.|儲存所有有效排列的列表。]]
    def backtrack(curr):
        [[core|if len(curr) == len(nums):|Base case: a complete permutation is found.|基底情況：找到一個完整的排列。]]
            res.append(curr[:])
            return
        for x in nums:
            [[core|if x not in curr:|Only add elements not already in the current permutation.|僅加入尚未在當前排列中的元素。]]
                curr.append(x)
                [[mod|backtrack(curr)|Recursively explore further.|遞迴探索後續可能性。]]
                [[mod|curr.pop()|Backtrack: remove element for other possibilities.|回溯：移除元素以嘗試其他可能性。]]
    backtrack([])
    return res`,
  variations: [
    {
      id: "permutations-ii",
      title: "Permutations II (Duplicates)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/permutations-ii/",
      description: "Generate all unique permutations when duplicates exist in the input.",
      coreLogic: `nums.sort()
if used[i] or (i > 0 and nums[i] == nums[i-1] and not used[i-1]): continue`,
      adaptationLogic: `used = [False] * len(nums)`,
      explanation: "Sort the input and skip identical consecutive elements unless the previous identical element is currently being used in the current recursive path.",
      fullCode: `def permute_unique(nums):
    [[core|nums.sort()|Sorting is necessary to detect duplicates.|排序對於偵測重複項是必要的。]]
    res = []; used = [False] * len(nums)
    def backtrack(curr):
        if len(curr) == len(nums):
            res.append(curr[:]); return
        for i in range(len(nums)):
            [[mod|if used[i] or (i > 0 and nums[i] == nums[i-1] and not used[i-1]):|The duplicate skipping logic.|跳過重複項的邏輯。]]
                continue
            used[i] = True; curr.append(nums[i])
            backtrack(curr)
            used[i] = False; curr.pop()
    backtrack([])
    return res`
    },
    {
      id: "letter-combinations",
      title: "Letter Combinations of a Phone Number",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      description: "Return all possible letter combinations that the digits could represent.",
      coreLogic: `for letter in mapping[digits[index]]:
    backtrack(index + 1, path + letter)`,
      adaptationLogic: ``,
      explanation: "Mapping-based backtracking where each digit index defines the choice space for the next recursive level.",
      fullCode: `def letter_combinations(digits):
    if not digits: return []
    mapping = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
    res = []
    def backtrack(idx, path):
        if idx == len(digits):
            res.append(path); return
        [[mod|for char in mapping[digits[idx]]:|Iterate through possible characters for the current digit.|遍歷當前數字的所有可能字元。]]
            backtrack(idx + 1, path + char)
    backtrack(0, "")
    return res`
    },
    {
      id: "next-permutation",
      title: "Next Permutation (Greedy/Backtracking concept)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
      description: "Rearrange numbers into the lexicographically next greater permutation.",
      coreLogic: `find idx where nums[i] < nums[i+1]
find target to swap with idx
reverse the suffix`,
      adaptationLogic: ``,
      explanation: "A clever in-place algorithm that finds the pivot of the lexicographical order and rearranges the smallest suffix to increment the value minimally.",
      fullCode: `def next_permutation(nums):
    n = len(nums)
    [[core|i = n - 2|Step 1: find the first decreasing element from the right.|步驟 1：從右側找到第一個遞減的元素。]]
    while i >= 0 and nums[i] >= nums[i+1]: i -= 1
    
    if i >= 0:
        [[mod|j = n - 1|Step 2: find the smallest element > nums[i] to swap.|步驟 2：找到最小且大於 nums[i] 的元素進行交換。]]
        while nums[j] <= nums[i]: j -= 1
        nums[i], nums[j] = nums[j], nums[i]
        
    [[mod|l, r = i + 1, n - 1|Step 3: reverse the suffix to get the smallest order.|步驟 3：反轉後綴以獲得最小排序。]]
    while l < r:
        nums[l], nums[r] = nums[r], nums[l]
        l += 1; r -= 1`
    }
  ]
};
