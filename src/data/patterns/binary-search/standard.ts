import { AlgorithmPattern } from "../../../types";

export const standardBinarySearch: AlgorithmPattern = {
  id: "standard-binary-search",
  name: "Standard Binary Search",
  category: "Binary Search",
  description: "Classic search on a sorted collection to find a specific target value in logarithmic time.",
  imageUrl: "/patterns/binary-search.png",
  complexity: {
    time: "O(log n)",
    space: "O(1)",
  },
  coreTemplate: `def binary_search(nums, target):
    [[core|left, right = 0, len(nums) - 1|Initialize search boundaries.|初始化搜尋邊界。]]
    while left <= right:
        [[core|mid = left + (right - left) // 2|Calculate middle index, avoiding overflow.|計算中間索引，避免溢位。]]
        if nums[mid] == target:
            return mid
        [[mod|if nums[mid] < target: left = mid + 1|Target is in the right half.|目標在右半部。]]
        else:
            [[mod|right = mid - 1|Target is in the left half.|目標在左半部。]]
    return -1`,
  variations: [
    {
      id: "search-2d-matrix",
      title: "Search a 2D Matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
      description: "Search for a value in an m x n matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row.",
      coreLogic: `row = mid // n; col = mid % n
if matrix[row][col] == target: return True`,
      adaptationLogic: `total_elements = m * n
left, right = 0, total_elements - 1`,
      explanation: "Treat the 2D matrix as a virtual 1D array using division and modulo for coordinate mapping.",
      fullCode: `def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    [[core|left, right = 0, m * n - 1|Treat the 2D matrix as a virtual 1D array.|將 2D 矩陣視為虛擬的 1D 陣列。]]
    
    while left <= right:
        mid = (left + right) // 2
        [[mod|row, col = divmod(mid, n)|Map 1D index back to 2D coordinates.|將 1D 索引映射回 2D 座標。]]
        if matrix[row][col] == target:
            return True
        if matrix[row][col] < target:
            left = mid + 1
        else:
            right = mid - 1
    return False`
    },
    {
      id: "guess-number",
      title: "Guess Number Higher or Lower",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/guess-number-higher-or-lower/",
      description: "Guess a pick number from 1 to n using an API that returns if your guess is higher, lower, or correct.",
      coreLogic: `res = guess(mid)
if res == 0: return mid`,
      adaptationLogic: `left, right = 1, n`,
      explanation: "Classic binary search applied to a continuous range of integers.",
      fullCode: `def guess_number(n):
    [[core|left, right = 1, n|Search range is from 1 to N.|搜尋範圍從 1 到 N。]]
    while left <= right:
        mid = left + (right - left) // 2
        res = guess(mid)
        [[mod|if res == 0: return mid|Found the number.|找到目標數字。]]
        if res < 0:
            right = mid - 1
        else:
            left = mid + 1`
    },
    {
      id: "first-bad-version",
      title: "First Bad Version",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/first-bad-version/",
      description: "Find the first version that is bad using an API, minimizing calls.",
      coreLogic: `if isBadVersion(mid):
    ans = mid; right = mid - 1
else: left = mid + 1`,
      adaptationLogic: `left, right = 1, n`,
      explanation: "Binary search to find the 'boundary' between two properties (good vs bad).",
      fullCode: `def first_bad_version(n):
    left, right = 1, n
    ans = n
    while left <= right:
        mid = left + (right - left) // 2
        [[mod|if isBadVersion(mid):|If current is bad, search earlier versions.|如果當前版本錯誤，搜尋更早的版本。]]
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans`
    }
  ]
};
