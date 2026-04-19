import { AlgorithmPattern } from "../../../types";

export const nonFixedSlidingWindow: AlgorithmPattern = {
  id: "non-fixed-sliding-window",
  name: "Non-fixed Size Sliding Window",
  category: "Sliding Window",
  description: "Window size varies dynamically based on specific conditions.",
  imageUrl: "/patterns/sliding-window.png",
  complexity: {
    time: "O(n)",
    space: "O(k) where k is the character set or window size",
  },
  coreTemplate: `def sliding_window(nums):
    [[core|left = 0|Left boundary of the window.|窗口左邊界。]]
    [[core|for right in range(len(nums)):|Expand window with the right boundary.|右邊界向右擴張。]]
        # Expand: Add nums[right] to window logic
        
        [[core|while window_is_invalid():|Shrink window from left until condition is met again.|收縮左邊界直到條件再次滿足。]]
            # Shrink: Remove nums[left] from window logic
            [[mod|left += 1|Move left boundary.|移動左邊界。]]
            
        # Update: Calculate result based on valid window
    return result`,
  coreTemplateCpp: `void slidingWindow(vector<int>& nums) {
    [[core|int left = 0;|Window left boundary.|視窗左邊界。]]
    for (int right = 0; right < nums.size(); right++) {
        // Expand window logic
        [[core|while (isInvalid()) {|Shrink until valid.|縮小直到恢復有效性。]]
            // Shrink from left logic
            [[mod|left++;|Advance left.|前進左側。]]
        }
        // Process results
    }
}`,
  variations: [
    {
      id: "longest-substring-non-repeating",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      description: "Length of the longest substring without repeating characters.",
      coreLogic: `lookup = {}
left = 0
for right, char in enumerate(s):
    if char in lookup:
        left = max(left, lookup[char] + 1)`,
      coreLogicCpp: `if (lookup.count(s[right])) {
    left = max(left, lookup[s[right]] + 1);
}`,
      adaptationLogic: `    lookup[char] = right
    res = max(res, right - left + 1)`,
      explanation: "Dynamic window size. When a duplicate is found, the window's left boundary 'jumps' to skip the first occurrence.",
      fullCode: `def length_of_longest_substring(s):
    lookup = {}
    [[core|left = 0|Start of current window.|當前窗口的起始位置。]]
    res = 0
    
    for right in range(len(s)):
        if s[right] in lookup:
            [[mod|left = max(left, lookup[s[right]] + 1)|If duplicate found, jump the left pointer forward.|若發現重複字元，將左指標向前跳轉。]]
            
        lookup[s[right]] = right
        [[mod|res = max(res, right - left + 1)|Update longest length.|更新最長長度。]]
        
    return res`,
      fullCodeCpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lookup;
    int left = 0, res = 0;
    for (int right = 0; right < s.length(); right++) {
        [[mod|if (lookup.count(s[right])) {|Found duplicate; jump left.|發現重複；左側跳轉。]]
            left = max(left, lookup[s[right]] + 1);
        }
        lookup[s[right]] = right;
        res = max(res, right - left + 1);
    }
    return res;
}`
    }
  ]
};
