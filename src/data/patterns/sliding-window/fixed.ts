import { AlgorithmPattern } from "../../../types";

export const fixedSlidingWindow: AlgorithmPattern = {
  id: "fixed-sliding-window",
  name: "Fixed-Size Sliding Window",
  category: "Sliding Window",
  description: "Maintain a window of constant size K as it slides across the collection to optimize range queries.",
  imageUrl: "/patterns/sliding-window.png",
  complexity: {
    time: "O(n)",
    space: "O(1) extra space",
  },
  coreTemplate: `def fixed_window(nums, k):
    [[core|curr_sum = sum(nums[:k])|Initialize the first window.|初始化第一個視窗。]]
    res = curr_sum
    for i in range(k, len(nums)):
        [[mod|curr_sum += nums[i] - nums[i - k]|Add next element and remove the leftmost.|加入下一個元素並移除最左側元素。]]
        res = max(res, curr_sum)
    return res`,
  coreTemplateCpp: `int fixedWindow(vector<int>& nums, int k) {
    [[core|int curr_sum = 0;|Current window sum.|當前視窗和。]]
    for (int i = 0; i < k; ++i) curr_sum += nums[i];
    int res = curr_sum;
    for (int i = k; i < nums.size(); ++i) {
        [[mod|curr_sum += nums[i] - nums[i - k];|Slide window.|滑動視窗。]]
        res = max(res, curr_sum);
    }
    return res;
}`,
  variations: [
    {
      id: "max-vowels",
      title: "Maximum Number of Vowels in a Substring",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
      description: "Find the maximum number of vowel letters in any substring of length K.",
      coreLogic: `count += is_vowel(s[i]) - is_vowel(s[i-k])`,
      coreLogicCpp: `count += isVowel(s[i]) - isVowel(s[i-k]);`,
      adaptationLogic: ``,
      explanation: "Maintain a count of vowels within the fixed window by checking incoming and outgoing characters.",
      fullCode: `def max_vowels(s, k):
    vowels = set('aeiou')
    [[core|curr = sum(1 for i in range(k) if s[i] in vowels)|Count in first K.|計算前 K 個的母音數。]]
    res = curr
    for i in range(k, len(s)):
        [[mod|curr += (s[i] in vowels) - (s[i-k] in vowels)|Slide window: add right, subtract left.|滑動視窗：右進左出。]]
        res = max(res, curr)
    return res`,
      fullCodeCpp: `int maxVowels(string s, int k) {
    auto isVowel = [](char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; };
    int curr = 0;
    for (int i = 0; i < k; ++i) if (isVowel(s[i])) curr++;
    int res = curr;
    for (int i = k; i < s.length(); ++i) {
        [[mod|curr += isVowel(s[i]) - isVowel(s[i-k]);|Update vowel count.|更新母音數量。]]
        res = max(res, curr);
    }
    return res;
}`
    },
    {
      id: "find-all-anagrams",
      title: "Find All Anagrams in a String",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
      description: "Find all start indices of p's anagrams in s.",
      coreLogic: `s_count[s[i]] += 1; s_count[s[i-n]] -= 1
if s_count == p_count: res.append(i-n+1)`,
      coreLogicCpp: `s_count[s[i]-'a']++; s_count[s[i-np]-'a']--;
if (s_count == p_count) res.push_back(i-np+1);`,
      adaptationLogic: `n = len(p)`,
      explanation: "Use frequency maps to track characters in the sliding window of size len(p).",
      fullCode: `def find_anagrams(s, p):
    ns, np = len(s), len(p)
    if ns < np: return []
    p_count = Counter(p); s_count = Counter(s[:np])
    res = []
    if p_count == s_count: res.append(0)
    
    for i in range(np, ns):
        [[mod|s_count[s[i]] += 1|Add right character.|加入右側字元。]]
        [[mod|s_count[s[i-np]] -= 1|Remove left character.|移除左側字元。]]
        if s_count[s[i-np]] == 0: del s_count[s[i-np]]
        if s_count == p_count: res.append(i - np + 1)
    return res`,
      fullCodeCpp: `vector<int> findAnagrams(string s, string p) {
    int ns = s.length(), np = p.length();
    if (ns < np) return {};
    vector<int> p_count(26, 0), s_count(26, 0), res;
    for (int i = 0; i < np; i++) {
        p_count[p[i] - 'a']++;
        s_count[s[i] - 'a']++;
    }
    if (p_count == s_count) res.push_back(0);
    for (int i = np; i < ns; i++) {
        [[mod|s_count[s[i] - 'a']++;|Add incoming character.|加入進入的字元。]]
        [[mod|s_count[s[i - np] - 'a']--;|Remove outgoing character.|移除出去的字元。]]
        if (p_count == s_count) res.push_back(i - np + 1);
    }
    return res;
}`
    },
    {
      id: "defuse-bomb",
      title: "Defuse the Bomb",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/defuse-the-bomb/",
      description: "Replace each number with the sum of the next K numbers (circularly).",
      coreLogic: `w_sum = sum(code[1:k+1])
for i in range(n):
    res[i] = w_sum
    w_sum += code[(i+1+k)%n] - code[(i+1)%n]`,
      coreLogicCpp: `for (int i = 0; i < n; i++) {
    res[i] = w_sum;
    w_sum += code[(i+1+k)%n] - code[(i+1)%n];
}`,
      adaptationLogic: `k > 0 case`,
      explanation: "Maintain a sliding window sum across a circular array boundaries using modulo.",
      fullCode: `def decrypt(code, k):
    n = len(code)
    res = [0] * n
    if k == 0: return res
    [[core|l, r = (1, k) if k > 0 else (n + k, n - 1)|Set initial range boundaries based on sign of K.|根據 K 的正負號設置初始範圍邊界。]]
    w_sum = sum(code[i % n] for i in range(l, r + 1))
    for i in range(n):
        res[i] = w_sum
        [[mod|w_sum -= code[l % n]|Advance window sum.|步進視窗和。]]
        l += 1; r += 1
        [[mod|w_sum += code[r % n]|Advance window sum.|步進視窗和。]]
    return res`,
      fullCodeCpp: `vector<int> decrypt(vector<int>& code, int k) {
    int n = code.size();
    vector<int> res(n, 0);
    if (k == 0) return res;
    int l = k > 0 ? 1 : n + k, r = k > 0 ? k : n - 1;
    [[core|int sum = 0;|Initial window sum.|初始視窗和。]]
    for (int i = l; i <= r; i++) sum += code[i % n];
    for (int i = 0; i < n; i++) {
        res[i] = sum;
        [[mod|sum -= code[l++ % n];|Shrink left.|縮小左側。]]
        [[mod|sum += code[++r % n];|Expand right.|擴大右側。]]
    }
    return res;
}`
    }
  ]
};
