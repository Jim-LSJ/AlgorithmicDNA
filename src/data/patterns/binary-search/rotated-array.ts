import { AlgorithmPattern } from "../../../types";

export const rotatedArrayBS: AlgorithmPattern = {
  id: "rotated-array-bs",
  name: "Binary Search on Rotated Array",
  category: "Binary Search",
  description: "Efficiently search for values or find the minimum element in an array that has been rotated.",
  imageUrl: "/patterns/binary-search.png",
  complexity: {
    time: "O(log n)",
    space: "O(1)",
  },
  coreTemplate: `def find_min(nums):
    [[core|left, right = 0, len(nums) - 1|Standard search boundaries.|標準搜尋邊界。]]
    while left < right:
        mid = left + (right - left) // 2
        [[mod|if nums[mid] > nums[right]: left = mid + 1|Middle is in the larger left part, min must be to the right.|中間值在較大的左半部，最小值必在右側。]]
        else:
            [[mod|right = mid|Middle is in the smaller right part, mid could be min.|中間值在較小的右半部，中間點可能是最小值。]]
    return nums[left]`,
  coreTemplateCpp: `int findMin(vector<int>& nums) {
    [[core|int left = 0, right = nums.size() - 1;|Define search range.|定義搜尋範圍。]]
    while (left < right) {
        int mid = left + (right - left) / 2;
        [[mod|if (nums[mid] > nums[right]) left = mid + 1;|Min must be in the right half.|最小值必在右半部。]]
        else right = mid;
    }
    return nums[left];
}`,
  variations: [
    {
      id: "search-in-rotated-array",
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      description: "Find a target value in a rotated sorted array.",
      coreLogic: `if nums[left] <= nums[mid]:
    if nums[left] <= target < nums[mid]: right = mid - 1
    else: left = mid + 1
else:
    if nums[mid] < target <= nums[right]: left = mid + 1
    else: right = mid - 1`,
      coreLogicCpp: `if (nums[l] <= nums[mid]) {
    if (nums[l] <= target && target < nums[mid]) r = mid - 1;
    else l = mid + 1;
} else {
    if (nums[mid] < target && target <= nums[r]) l = mid + 1;
    else r = mid - 1;
}`,
      adaptationLogic: ``,
      explanation: "Determine which half is continuously sorted and check if the target falls within that sorted range.",
      fullCode: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        
        [[core|if nums[l] <= nums[mid]:|Left half is sorted.|左半部是排序好的。]]
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        else:
            [[mod|if nums[mid] < target <= nums[r]:|Right half is sorted.|右半部是排序好的。]]
                l = mid + 1
            else: r = mid - 1
    return -1`,
      fullCodeCpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        [[core|if (nums[l] <= nums[mid]) {|Check if left part is sorted.|檢查左半部是否已排序。]]
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            [[mod|if (nums[mid] < target && target <= nums[r])|Check if right part is sorted.|檢查右半部是否已排序。]]
                l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
    },
    {
      id: "find-min-ii",
      title: "Find Minimum in Rotated Sorted Array II (Duplicates)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
      description: "Find the minimum element when duplicates are present in the array.",
      coreLogic: `if nums[mid] < nums[right]: right = mid
elif nums[mid] > nums[right]: left = mid + 1
else: right -= 1`,
      coreLogicCpp: `if (nums[mid] < nums[right]) right = mid;
else if (nums[mid] > nums[right]) left = mid + 1;
else right--;`,
      adaptationLogic: ``,
      explanation: "When nums[mid] equals nums[right], we can't be sure which side to pick, so we safely decrement the right pointer.",
      fullCode: `def find_min(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        [[mod|if nums[mid] == nums[r]:|Ambiguous case due to duplicates.|由於重複值導致的模糊情況。]]
            r -= 1
        elif nums[mid] < nums[r]: r = mid
        else: l = mid + 1
    return nums[l]`,
      fullCodeCpp: `int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int mid = l + (r - l) / 2;
        [[mod|if (nums[mid] == nums[r]) r--;|Safely shrink right boundary.|安全地縮小右邊界。]]
        else if (nums[mid] < nums[r]) r = mid;
        else l = mid + 1;
    }
    return nums[l];
}`
    },
    {
      id: "search-in-rotated-array-ii",
      title: "Search in Rotated Sorted Array II (Duplicates)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      description: "Search for a target value when the array contains duplicates.",
      coreLogic: `if nums[l] == nums[mid] == nums[r]:
    l += 1; r -= 1; continue`,
      coreLogicCpp: `if (nums[l] == nums[mid] && nums[mid] == nums[r]) { l++; r--; continue; }`,
      adaptationLogic: ``,
      explanation: "Handle duplicates by shrinking the search space until the search range boundary elements are distinct or the target is found.",
      fullCode: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        while l < r and nums[l] == nums[l+1]: l += 1
        while l < r and nums[r] == nums[r-1]: r -= 1
        mid = (l + r) // 2
        if nums[mid] == target: return True
        
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        else:
            if nums[mid] < target <= nums[r]: l = mid + 1
            else: r = mid - 1
    return False`,
      fullCodeCpp: `bool search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        [[mod|if (nums[l] == nums[mid] && nums[mid] == nums[r]) { l++; r--; continue; }|Ambiguous duplicates case.|模糊的重複值情況。]]
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return true;
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return false;
}`
    }
  ]
};
