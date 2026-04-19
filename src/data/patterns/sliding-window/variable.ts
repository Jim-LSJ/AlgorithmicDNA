import { AlgorithmPattern } from "../../../types";

export const variableSlidingWindow: AlgorithmPattern = {
  id: "variable-sliding-window",
  name: "Variable-Size Sliding Window",
  category: "Sliding Window",
  description: "Expand the window until a condition is broken, then shrink it until the condition is met again.",
  imageUrl: "/patterns/sliding-window.png",
  complexity: {
    time: "O(n)",
    space: "O(k) where k is the character set size",
  },
  coreTemplate: `def sliding_window(s):
    left = 0
    [[core|for right in range(len(s)):|Expand window by moving the right pointer.|移動右指標以擴展視窗。]]
        # 1. Add s[right] to window
        [[mod|while condition_violated():|Shrink window from left until condition is valid again.|從左側縮小視窗，直到條件再次成立。]]
            # 2. Remove s[left] from window
            left += 1
        # 3. Update Result`,
  coreTemplateCpp: `void slidingWindow(string s) {
    int left = 0;
    [[core|for (int right = 0; right < s.length(); ++right) {|Iterate right pointer.|迭代右指標。]]
        // 1. Add s[right] to current window state
        [[mod|while (conditionViolated()) {|Maintain window invariant.|維持視窗不變性。]]
            // 2. Remove s[left] and left++
            left++;
        }
        // 3. Update result
    }
}`,
  variations: [
    {
      id: "longest-substring-no-repeat",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      description: "Find the length of the longest substring with all unique characters.",
      coreLogic: `while char in seen:
    seen.remove(s[left]); left += 1
seen.add(char)`,
      coreLogicCpp: `while (seen.count(s[right])) {
    seen.erase(s[left++]);
}
seen.insert(s[right]);`,
      adaptationLogic: `HashSet for unique check`,
      explanation: "Use a set to track characters in the window. Shrink from the left whenever a duplicate is found at the right.",
      fullCode: `def length_of_longest_substring(s):
    seen = set(); left = 0; res = 0
    for right, char in enumerate(s):
        [[mod|while char in seen:|Shrink until duplicate character is removed.|縮小直到移除重複字元。]]
            seen.remove(s[left]); left += 1
        seen.add(char)
        res = max(res, right - left + 1)
    return res`,
      fullCodeCpp: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, res = 0;
    for (int right = 0; right < s.length(); right++) {
        [[mod|while (seen.count(s[right]))|Found duplicate; shrink window.|發現重複；縮小視窗。]] {
            seen.erase(s[left++]);
        }
        seen.insert(s[right]);
        res = max(res, right - left + 1);
    }
    return res;
}`
    },
    {
      id: "minimum-size-subarray-sum",
      title: "Minimum Size Subarray Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      description: "Find the minimal length of a contiguous subarray of which the sum is >= target.",
      coreLogic: `while curr_sum >= target:
    res = min(res, right - left + 1)
    curr_sum -= nums[left]; left += 1`,
      coreLogicCpp: `while (currSum >= target) {
    res = min(res, right - left + 1);
    currSum -= nums[left++];
}`,
      adaptationLogic: ``,
      explanation: "Expand until sum >= target, then shrink as much as possible while maintaining the sum condition to find the minimum length.",
      fullCode: `def min_subarray_len(target, nums):
    left = curr_sum = 0
    res = float('inf')
    for right in range(len(nums)):
        curr_sum += nums[right]
        [[mod|while curr_sum >= target:|Shrink as much as possible while greedy.|貪婪地盡可能縮小。]]
            res = min(res, right - left + 1)
            curr_sum -= nums[left]
            left += 1
    return res if res != float('inf') else 0`,
      fullCodeCpp: `int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0, currSum = 0, res = INT_MAX;
    for (int right = 0; right < nums.size(); right++) {
        currSum += nums[right];
        [[mod|while (currSum >= target)|Shrink left to find minimal range.|縮小左側以尋找最小範圍。]] {
            res = min(res, right - left + 1);
            currSum -= nums[left++];
        }
    }
    return (res == INT_MAX) ? 0 : res;
}`
    },
    {
      id: "fruit-into-baskets",
      title: "Fruit Into Baskets",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/",
      description: "Find the maximum length of a subarray that contains at most 2 distinct elements.",
      coreLogic: `counts[fruit] += 1
while len(counts) > 2:
    counts[s[left]] -= 1
    if counts[s[left]] == 0: del counts[s[left]]
    left += 1`,
      coreLogicCpp: `count[fruits[right]]++;
while (count.size() > 2) {
    if (--count[fruits[left]] == 0) count.erase(fruits[left]);
    left++;
}`,
      adaptationLogic: `HashMap for 2-distinct constraint`,
      explanation: "Maintain a frequency map of elements in the window. Shrink from left if unique count exceeds 2.",
      fullCode: `def total_fruit(fruits):
    count = collections.Counter()
    left = res = 0
    for right, f in enumerate(fruits):
        count[f] += 1
        [[mod|while len(count) > 2:|Constraint: at most 2 distinct fruits.|約束：最多 2 種不同的水果。]]
            count[fruits[left]] -= 1
            if count[fruits[left]] == 0: del count[fruits[left]]
            left += 1
        res = max(res, right - left + 1)
    return res`,
      fullCodeCpp: `int totalFruit(vector<int>& fruits) {
    unordered_map<int, int> count;
    int left = 0, res = 0;
    for (int right = 0; right < fruits.size(); right++) {
        count[fruits[right]]++;
        [[mod|while (count.size() > 2)|Rule: only two keys in map.|規則：地圖中僅限兩個鍵。]] {
            if (--count[fruits[left]] == 0) count.erase(fruits[left]);
            left++;
        }
        res = max(res, right - left + 1);
    }
    return res;
}`
    }
  ]
};
