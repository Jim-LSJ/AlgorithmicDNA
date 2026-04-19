import { AlgorithmPattern } from "../../../types";

export const quickSort: AlgorithmPattern = {
  id: "quick-sort",
  name: "Quick Sort",
  category: "Sorting & Searching",
  description: "Divide and conquer sorting algorithm using a pivot to partition the data.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n log n) average, O(n^2) worst case",
    space: "O(log n)",
  },
  coreTemplate: `def quick_sort(nums, low, high):
    if low < high:
        [[core|p = partition(nums, low, high)|Partition the array and get pivot index.|對陣列進行劃分並取得基準點索引。]]
        [[mod|quick_sort(nums, low, p - 1)|Sort the left part.|排序左半部。]]
        [[mod|quick_sort(nums, p + 1, high)|Sort the right part.|排序右半部。]]

def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] < pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i`,
  variations: []
};
