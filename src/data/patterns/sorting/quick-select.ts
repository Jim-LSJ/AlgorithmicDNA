import { AlgorithmPattern } from "../../../types";

export const quickSelect: AlgorithmPattern = {
  id: "quick-select",
  name: "Quick Select",
  category: "Sorting",
  description: "Selection algorithm to find the kth smallest/largest element in an unordered list in O(n) average time.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n) average, O(n^2) worst case",
    space: "O(1) extra space",
  },
  coreTemplate: `def partition(nums, l, r):
    [[core|pivot = nums[r]|Choose a pivot (last element).|選擇基準值（最後一個元素）。]]
    i = l
    for j in range(l, r):
        if nums[j] <= pivot:
            [[mod|nums[i], nums[j] = nums[j], nums[i]|Swap smaller elements to the front.|將較小的元素交換到前面。]]
            i += 1
    nums[i], nums[r] = nums[r], nums[i]
    return i

def quick_select(nums, l, r, k):
    if l == r: return nums[l]
    [[core|pivot_idx = partition(nums, l, r)|Partition the array.|進行分區。]]
    if k == pivot_idx: return nums[k]
    [[mod|elif k < pivot_idx: return quick_select(nums, l, pivot_idx - 1, k)|Search left half.|搜尋左半部。]]
    else: return quick_select(nums, pivot_idx + 1, r, k)`,
  coreTemplateCpp: `int partition(vector<int>& nums, int l, int r) {
    int pivot = nums[r], i = l;
    for (int j = l; j < r; j++) {
        [[mod|if (nums[j] <= pivot) swap(nums[i++], nums[j]);|Partition logic.|分區邏輯。]]
    }
    swap(nums[i], nums[r]);
    return i;
}

int quickSelect(vector<int>& nums, int l, int r, int k) {
    if (l == r) return nums[l];
    int p = partition(nums, l, r);
    if (k == p) return nums[k];
    [[mod|return (k < p) ? quickSelect(nums, l, p - 1, k) : quickSelect(nums, p + 1, r, k);|Recurse.|遞迴。]]
}`,
  variations: [
    {
      id: "kth-largest-quickselect",
      title: "Kth Largest Element (QuickSelect)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      description: "Find the Kth largest element using quickselect instead of a heap.",
      coreLogic: `target_idx = len(nums) - k
return quick_select(0, n - 1, target_idx)`,
      coreLogicCpp: `int target = nums.size() - k;
quick_select(nums, 0, nums.size() - 1, target);`,
      adaptationLogic: `Iterative implementation for safety`,
      explanation: "QuickSelect is often faster than a heap for finding the Kth element as it doesn't maintain the whole heap structure.",
      fullCode: `def find_kth_largest(nums, k):
    target = len(nums) - k
    left, right = 0, len(nums) - 1
    while left <= right:
        [[core|idx = partition(nums, left, right)|Find the pivot index.|尋找基準值索引。]]
        if idx == target: return nums[idx]
        elif idx < target: left = idx + 1
        else: right = idx - 1`,
      fullCodeCpp: `int findKthLargest(vector<int>& nums, int k) {
    int target = nums.size() - k, l = 0, r = nums.size() - 1;
    while (l <= r) {
        [[core|int p = partition(nums, l, r);|Partition to find Kth element.|透過分區尋找第 K 個元素。]]
        if (p == target) return nums[p];
        if (p < target) l = p + 1;
        else r = p - 1;
    }
    return -1;
}`
    },
    {
      id: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
      description: "Find the K points that are closest to the origin (0,0).",
      coreLogic: `dist = lambda p: p[0]**2 + p[1]**2
quick_select_by_dist(points, k)`,
      coreLogicCpp: `auto dist = [](const vector<int>& p) { return p[0]*p[0] + p[1]*p[1]; };
nth_element(points.begin(), points.begin() + k, points.end(), ...);`,
      adaptationLogic: `Custom partitioning for distances`,
      explanation: "Calculate the Euclidean distance squared for each point and use QuickSelect to find the K points with the smallest distances.",
      fullCode: `def k_closest(points, k):
    def get_dist(p): return p[0]**2 + p[1]**2
    
    def partition(l, r):
        pivot_dist = get_dist(points[r])
        i = l
        for j in range(l, r):
            if get_dist(points[j]) <= pivot_dist:
                points[i], points[j] = points[j], points[i]
                i += 1
        points[i], points[r] = points[r], points[i]
        return i
        
    [[core|# Call quickselect to rearrange first K points|呼叫 QuickSelect 以重排前 K 個點。]]
    # ... (Standard QuickSelect implementation)`,
      fullCodeCpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    auto dist = [](const vector<int>& p) { return p[0]*p[0] + p[1]*p[1]; };
    [[core|nth_element(points.begin(), points.begin() + k, points.end(), [&](const vector<int>& a, const vector<int>& b) {
        return dist(a) < dist(b);
    });|STL nth_element uses quickselect internally.|STL 的 nth_element 在內部使用 quickselect。]]
    points.resize(k);
    return points;
}`
    },
    {
      id: "wiggle-sort-ii",
      title: "Wiggle Sort II",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/wiggle-sort-ii/",
      description: "Reorder array such that nums[0] < nums[1] > nums[2] < nums[3]...",
      coreLogic: `median = quick_select(nums, n//2)
virtual_indexing_swap(nums)`,
      coreLogicCpp: `nth_element(nums.begin(), nums.begin() + n/2, nums.end());
int mid = nums[n/2];
// 3-way partition with index mapping`,
      adaptationLogic: `Index mapping (1, 3, 5, 0, 2, 4)`,
      explanation: "Find the median using QuickSelect, then use a virtual index mapping to place elements > median in odd positions and elements < median in even positions.",
      fullCode: `def wiggle_sort(nums):
    n = len(nums)
    [[core|mid = quick_select(nums, 0, n - 1, n // 2)|Find the median element.|找到中位數元素。]]
    
    [[mod|map_idx = lambda i: (1 + 2*i) % (n | 1)|Virtual index mapping for wiggle.|用於擺動排序的虛擬索引映射。]]
    # 3-way partition using mapped indices
    i, j, k = 0, 0, n - 1
    while j <= k:
        if nums[map_idx(j)] > mid:
            nums[map_idx(i)], nums[map_idx(j)] = nums[map_idx(j)], nums[map_idx(i)]
            i += 1; j += 1
        elif nums[map_idx(j)] < mid:
            nums[map_idx(j)], nums[map_idx(k)] = nums[map_idx(k)], nums[map_idx(j)]
            k -= 1
        else: j += 1`,
      fullCodeCpp: `void wiggleSort(vector<int>& nums) {
    int n = nums.size();
    auto midit = nums.begin() + n / 2;
    [[core|nth_element(nums.begin(), midit, nums.end());|QuickSelect to find median.|使用 QuickSelect 尋找中位數。]]
    int mid = *midit;

    #define A(i) nums[(1 + 2 * (i)) % (n | 1)]
    [[mod|int i = 0, j = 0, k = n - 1;|3-way partition with virtual indexing.|使用虛擬索引進行三向分區。]]
    while (j <= k) {
        if (A(j) > mid) swap(A(i++), A(j++));
        else if (A(j) < mid) swap(A(j), A(k--));
        else j++;
    }
}`
    }
  ]
};
