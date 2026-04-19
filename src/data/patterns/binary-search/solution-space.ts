import { AlgorithmPattern } from "../../../types";

export const binarySearchSolutionSpace: AlgorithmPattern = {
  id: "bs-solution-space",
  name: "Binary Search on Solution Space",
  category: "Binary Search",
  description: "Perform binary search on the range of possible answers (e.g., minimum capacity, maximum distance) rather than on the input array.",
  imageUrl: "/patterns/binary-search.png",
  complexity: {
    time: "O(n * log(max_val - min_val))",
    space: "O(1)",
  },
  coreTemplate: `def solve(target_range):
    [[core|left, right = min_possible, max_possible|Search space is the range of potential answers.|搜尋空間是潛在答案的範圍。]]
    while left < right:
        [[core|mid = (left + right) // 2|Try a potential answer.|嘗試一個潛在答案。]]
        [[mod|if can_achieve(mid):|Check if 'mid' is a feasible solution.|檢查「mid」是否為一個可行解。]]
            right = mid # If minimum needed, try smaller.
        else:
            left = mid + 1
    return left`,
  coreTemplateCpp: `int solve(int minVal, int maxVal) {
    [[core|int left = minVal, right = maxVal;|Answer space range.|答案空間範圍。]]
    while (left < right) {
        int mid = left + (right - left) / 2;
        [[mod|if (check(mid))|Monotonic check function.|單調檢查函式。]]
            right = mid;
        else
            left = mid + 1;
    }
    return left;
}`,
  variations: [
    {
      id: "koko-eating-bananas",
      title: "Koko Eating Bananas",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      description: "Find the minimum integer speed K such that Koko can eat all bananas within H hours.",
      coreLogic: `hours = sum(math.ceil(p / k) for p in piles)
return hours <= h`,
      coreLogicCpp: `long long totalHours = 0;
for (int p : piles) totalHours += (p + k - 1) / k;
return totalHours <= h;`,
      adaptationLogic: `left = 1, right = max(piles)`,
      explanation: "Binary search on speed. The time taken decreases as speed increases, creating a monotonic property required for binary search.",
      fullCode: `def min_eating_speed(piles, h):
    [[core|l, r = 1, max(piles)|Possible speeds range from 1 to the largest pile.|可能的初速度範圍從 1 到最大堆。]]
    while l < r:
        k = (l + r) // 2
        [[mod|total_hours = sum((p + k - 1) // k for p in piles)|Calculate time needed at speed K.|計算在速度 K 下所需的時間。]]
        if total_hours <= h:
            r = k
        else:
            l = k + 1
    return l`,
      fullCodeCpp: `int minEatingSpeed(vector<int>& piles, int h) {
    int l = 1, r = *max_element(piles.begin(), piles.end());
    while (l < r) {
        int mid = l + (r - l) / 2;
        [[mod|long long total = 0;|Use long long to keep track of total hours.|使用 long long 來追踪總小時數。]]
        for (int p : piles) total += (p + mid - 1) / mid;
        if (total <= h) r = mid;
        else l = mid + 1;
    }
    return l;
}`
    },
    {
      id: "capacity-to-ship-packages",
      title: "Capacity To Ship Packages Within D Days",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      description: "Find the least weight capacity of a boat that results in all packages being shipped within D days.",
      coreLogic: `days = 1; curr = 0
for w in weights:
    if curr + w > cap: days += 1; curr = w
    else: curr += w
return days <= D`,
      coreLogicCpp: `int days = 1, cur = 0;
for (int w : weights) {
    if (cur + w > mid) { days++; cur = w; }
    else cur += w;
}
return days <= D;`,
      adaptationLogic: `left = max(weights), right = sum(weights)`,
      explanation: "Binary search on boat capacity. For a given capacity, use a greedy approach to count the days needed and check if it fits within the limit.",
      fullCode: `def ship_within_days(weights, days):
    [[core|l, r = max(weights), sum(weights)|Minimum capacity must be at least the heaviest item.|最小容量必須至少為最重物品的重量。]]
    while l < r:
        mid = (l + r) // 2
        [[mod|# Check if possible with capacity 'mid'|檢查容量為 'mid' 時是否可行。]]
        curr_days = 1; curr_weight = 0
        for w in weights:
            if curr_weight + w > mid:
                curr_days += 1; curr_weight = w
            else: curr_weight += w
        
        if curr_days <= days:
            r = mid
        else:
            l = mid + 1
    return l`,
      fullCodeCpp: `int shipWithinDays(vector<int>& weights, int days) {
    int l = *max_element(weights.begin(), weights.end());
    int r = accumulate(weights.begin(), weights.end(), 0);
    while (l < r) {
        int mid = l + (r - l) / 2;
        int d = 1, cur = 0;
        [[mod|for (int w : weights)|Greedy allocation to days.|貪婪分配到各天。]] {
            if (cur + w > mid) { d++; cur = w; }
            else cur += w;
        }
        if (d <= days) r = mid;
        else l = mid + 1;
    }
    return l;
}`
    },
    {
      id: "split-array-largest-sum",
      title: "Split Array Largest Sum",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/",
      description: "Split an array into M non-empty subarrays such that the largest sum of any subarray is minimized.",
      coreLogic: `subarrays = 1; curr = 0
for n in nums:
    if curr + n > limit: subarrays += 1; curr = n
    else: curr += n
return subarrays <= m`,
      coreLogicCpp: `int cnt = 1, cur = 0;
for (int n : nums) {
    if (cur + n > mid) { cnt++; cur = n; }
    else cur += n;
}
return cnt <= m;`,
      adaptationLogic: `Same as capacity ship logic`,
      explanation: "Functionally identical to the capacity-ship problem but phrased in terms of array splitting.",
      fullCode: `def split_array(nums, k):
    [[core|l, r = max(nums), sum(nums)|Answer must be between max element and total sum.|答案必須介於最大元素與總和之間。]]
    while l < r:
        mid = (l + r) // 2
        count = 1; curr = 0
        for n in nums:
            if curr + n > mid:
                count += 1
                curr = n
            else:
                curr += n
        if count <= k:
            r = mid
        else:
            l = mid + 1
    return l`,
      fullCodeCpp: `int splitArray(vector<int>& nums, int k) {
    long l = *max_element(nums.begin(), nums.end());
    long r = accumulate(nums.begin(), nums.end(), 0L);
    while (l < r) {
        long mid = l + (r - l) / 2;
        int cnt = 1; long cur = 0;
        [[mod|for (int n : nums)|Count subarrays needed for max sum 'mid'.|計算最大和為 'mid' 時所需的子陣列數量。]] {
            if (cur + n > mid) { cnt++; cur = n; }
            else cur += n;
        }
        if (cnt <= k) r = mid;
        else l = mid + 1;
    }
    return l;
}`
    }
  ]
};
