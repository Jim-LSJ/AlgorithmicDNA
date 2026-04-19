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
  coreTemplateCpp: `void quickSort(vector<int>& nums, int low, int high) {
    if (low < high) {
        [[core|int p = partition(nums, low, high);|Standard Hoare or Lomuto partition.|標準的 Hoare 或 Lomuto 劃分方案。]]
        quickSort(nums, low, p - 1);
        quickSort(nums, p + 1, high);
    }
}

int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        [[mod|if (nums[j] < pivot) swap(nums[i++], nums[j]);|Move smaller elements to left.|將較小元素移至左側。]]
    }
    swap(nums[i], nums[high]);
    return i;
}`,
  variations: [
    {
      id: "sort-colors",
      title: "Sort Colors",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
      description: "Sort an array with three colors in linear time and constant space.",
      coreLogic: `low, mid, high = 0, 0, len(nums) - 1
while mid <= high:
    if nums[mid] == 0: swap(low, mid); low++; mid++
    elif nums[mid] == 1: mid++
    else: swap(mid, high); high--`,
      coreLogicCpp: `int low = 0, mid = 0, high = nums.size() - 1;
while (mid <= high) {
    if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
    else if (nums[mid] == 1) mid++;
    else swap(nums[mid], nums[high--]);
}`,
      adaptationLogic: `Two pointers + pivot analysis`,
      explanation: "Classic Dutch National Flag problem. Use three pointers to partition the array into elements less than, equal to, and greater than the pivot (middle color).",
      fullCode: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        [[mod|if nums[mid] == 0:|Found smallest color.|發現最小顏色（0）。]]
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            [[mod|nums[mid], nums[high] = nums[high], nums[mid]|Found largest color, move to end.|發現最大顏色（2），移至末尾。]]
            high -= 1`,
      fullCodeCpp: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        [[mod|if (nums[mid] == 0)|Swap 0 to the front.|將 0 交換到前面。]]
            swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1)
            mid++;
        else
            [[mod|swap(nums[mid], nums[high--]);|Swap 2 to the back.|將 2 交換到後面。]]
    }
}`
    },
    {
      id: "kth-largest",
      title: "Kth Largest Element",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      description: "Find the kth largest element in an unsorted array.",
      coreLogic: `pivot = partition(nums, l, r)
if pivot == target: return nums[pivot]
elif pivot < target: l = pivot + 1
else: r = pivot - 1`,
      coreLogicCpp: `int p = partition(nums, l, r);
if (p == target) return nums[p];
if (p < target) l = p + 1;
else r = p - 1;`,
      adaptationLogic: `Partial Quick Sort (Quick Select)`,
      explanation: "Instead of sorting both halves, only recurse into the half that contains the kth position. Average time complexity is O(n).",
      fullCode: `def find_kth_largest(nums, k):
    target = len(nums) - k
    def select(l, r):
        p = partition(nums, l, r)
        [[mod|if p == target: return nums[p]|Found the target index.|找到目標索引。]]
        elif p < target: return select(p + 1, r)
        else: return select(l, p - 1)
    return select(0, len(nums) - 1)`,
      fullCodeCpp: `int findKthLargest(vector<int>& nums, int k) {
    int target = nums.size() - k;
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int p = partition(nums, l, r);
        [[mod|if (p == target) return nums[p];|Found target index.|找到目標索引。]]
        if (p < target) l = p + 1;
        else r = p - 1;
    }
    return -1;
}`
    }
  ]
};
