import { AlgorithmPattern } from "../../../types";

export const lowerUpperBound: AlgorithmPattern = {
  id: "lower-upper-bound",
  name: "Lower and Upper Bound",
  category: "Binary Search",
  description: "Find the first or last occurrence of a target value, or the insertion point in a sorted array.",
  imageUrl: "/patterns/binary-search.png",
  complexity: {
    time: "O(log n)",
    space: "O(1)",
  },
  coreTemplate: `def lower_bound(nums, target):
    [[core|left, right = 0, len(nums)|Right boundary is len(nums) for insertion point.|右邊界設為 len(nums) 以便包含插入點。]]
    while left < right:
        mid = left + (right - left) // 2
        [[mod|if nums[mid] >= target: right = mid|Narrow search to the left including mid.|縮小搜尋範圍至左側（包含中間點）。]]
        else:
            left = mid + 1
    return left # First index >= target`,
  variations: [
    {
      id: "search-range",
      title: "Find First and Last Position of Element",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      description: "Find the starting and ending index of a given target value in a sorted array.",
      coreLogic: `first = lower_bound(nums, target)
if first == len(nums) or nums[first] != target: return [-1, -1]
last = lower_bound(nums, target + 1) - 1`,
      adaptationLogic: ``,
      explanation: "Use lower bound twice: once for the target, and once for (target + 1) to find the boundary of the range.",
      fullCode: `def search_range(nums, target):
    def get_bound(is_lower):
        l, r = 0, len(nums)
        while l < r:
            mid = (l + r) // 2
            [[mod|if nums[mid] > target or (is_lower and nums[mid] == target):|Logic toggle for first vs last.|切換邏輯以尋找起始或結束位置。]]
                r = mid
            else:
                l = mid + 1
        return l
        
    start = get_bound(True)
    if start == len(nums) or nums[start] != target: return [-1, -1]
    end = get_bound(False) - 1
    return [start, end]`
    },
    {
      id: "search-insert-position",
      title: "Search Insert Position",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
      description: "Return the index where the target would be if it were inserted in order.",
      coreLogic: `return lower_bound(nums, target)`,
      adaptationLogic: ``,
      explanation: "Standard lower bound returns the exact insertion point to maintain sorted order.",
      fullCode: `def search_insert(nums, target):
    [[core|l, r = 0, len(nums)|Initial range covers all possible insertion points.|範圍涵蓋所有可能的插入點。]]
    while l < r:
        mid = (l + r) // 2
        [[mod|if nums[mid] < target: l = mid + 1|Must be strictly less to find insertion point.|必須嚴格小於以找到正確插入點。]]
        else: r = mid
    return l`
    },
    {
      id: "h-index-ii",
      title: "H-Index II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/h-index-ii/",
      description: "Find the H-index in a sorted citations array.",
      coreLogic: `if citations[mid] >= n - mid:
    right = mid
else:
    left = mid + 1`,
      adaptationLogic: `return n - left`,
      explanation: "Binary search for the first paper where citations[mid] >= remaining_papers.",
      fullCode: `def h_index(citations):
    n = len(citations)
    [[core|l, r = 0, n - 1|Standard search boundaries.|標準搜尋邊界。]]
    while l <= r:
        mid = l + (r - l) // 2
        [[mod|if citations[mid] >= n - mid:|Threshold condition for H-index.|H-index 的閾值條件。]]
            r = mid - 1
        else:
            l = mid + 1
    return n - l`
    }
  ]
};
