import { AlgorithmPattern } from "../../../types";

export const divideConquerBasic: AlgorithmPattern = {
  id: "divide-conquer-basic",
  name: "Divide and Conquer",
  category: "Divide and Conquer",
  description: "Break a problem into smaller subproblems of the same type, solve them recursively, and combine the results.",
  imageUrl: "/patterns/divide-conquer.png",
  complexity: {
    time: "O(n log n) for many cases like merge sort",
    space: "O(n) for merging or O(log n) for recursion stack",
  },
  coreTemplate: `def solve(problem):
    if is_base_case(problem): return base_solution
    
    [[core|subproblems = split(problem)|Divide the problem into smaller parts.|將問題拆分為更小的部分。]]
    solutions = [solve(sub) for sub in subproblems]
    
    [[mod|return combine(solutions)|Merge results from subproblems into a final answer.|將子問題的結果合併為最終解答。]]`,
  variations: [
    {
      id: "merge-sort",
      title: "Merge Sort",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sort-an-array/",
      description: "Sort an array by recursively splitting it in half, sorting the halves, and merging back.",
      coreLogic: `res = []
while l < len(left) and r < len(right):
    if left[l] < right[r]: res.append(left[l]); l += 1
    else: res.append(right[r]); r += 1`,
      adaptationLogic: `Recursive split`,
      explanation: "Classic divide and conquer sort. Merging two sorted arrays takes linear time; the total height of the recursion tree is log N.",
      fullCode: `def sort_array(nums):
    if len(nums) <= 1: return nums
    mid = len(nums) // 2
    [[mod|left = sort_array(nums[:mid])|Recursively sort left half.|遞迴排序左半部。]]
    [[mod|right = sort_array(nums[mid:])|Recursively sort right half.|遞迴排序右半部。]]
    
    # Merge function
    res = []; l = r = 0
    while l < len(left) and r < len(right):
        if left[l] < right[r]: res.append(left[l]); l += 1
        else: res.append(right[r]); r += 1
    return res + left[l:] + right[r:]`
    },
    {
      id: "majority-element",
      title: "Majority Element (D&C Version)",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/majority-element/",
      description: "Find the element that appears more than n/2 times.",
      coreLogic: `left = solve(lo, mid)
right = solve(mid+1, hi)
if left == right: return left
return left if count(left) > count(right) else right`,
      adaptationLogic: ``,
      explanation: "If an element is the majority in the whole array, it must be the majority in at least one of its two halves.",
      fullCode: `def majority_element(nums):
    def solve(lo, hi):
        if lo == hi: return nums[lo]
        mid = (hi - lo) // 2 + lo
        [[mod|left = solve(lo, mid)|Find majority in left half.|找到左半部的多數元素。]]
        [[mod|right = solve(mid + 1, hi)|Find majority in right half.|找到右半部的多數元素。]]
        
        if left == right: return left
        
        [[mod|l_count = sum(1 for i in range(lo, hi + 1) if nums[i] == left)|Count to decide winner.|計數以決定勝者。]]
        r_count = sum(1 for i in range(lo, hi + 1) if nums[i] == right)
        return left if l_count > r_count else right
    return solve(0, len(nums) - 1)`
    },
    {
      id: "different-ways-to-add-parentheses",
      title: "Different Ways to Add Parentheses",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/different-ways-to-add-parentheses/",
      description: "Return all possible results from computing all different ways to group numbers and operators.",
      coreLogic: `for i, char in enumerate(input):
    if char in "+-*":
        left = solve(input[:i])
        right = solve(input[i+1:])
        for l in left:
            for r in right: res.append(calc(l, char, r))`,
      adaptationLogic: `DFS/Backtracking style D&C`,
      explanation: "For every operator, split the expression into two sub-expressions. Combine all results from the left and right sub-expressions using that operator.",
      fullCode: `def diff_ways_to_compute(expression):
    if expression.isdigit(): return [int(expression)]
    res = []
    for i, char in enumerate(expression):
        if char in "-+*":
            [[mod|left = diff_ways_to_compute(expression[:i])|Divide at operator.|在運算子處分割。]]
            [[mod|right = diff_ways_to_compute(expression[i+1:])|Divide at operator.|在運算子處分割。]]
            for l in left:
                for r in right:
                    if char == '+': res.append(l + r)
                    elif char == '-': res.append(l - r)
                    else: res.append(l * r)
    return res`
    }
  ]
};
