import { AlgorithmPattern } from "../../../types";

export const stringSearch: AlgorithmPattern = {
  id: "kmp-search",
  name: "KMP String Search",
  category: "Math & Strings",
  description: "Efficiently find occurrences of a pattern within a text string using precomputed prefix information.",
  imageUrl: "/patterns/math.png",
  complexity: {
    time: "O(n + m)",
    space: "O(m)",
  },
  coreTemplate: `def kmp(text, pattern):
    [[core|lps = build_lps(pattern)|Build Longest Prefix Suffix (LPS) array.|建立最長前後綴（LPS）陣列。]]
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1; j += 1
            if j == len(pattern): return i - j # Found!
        elif j > 0:
            [[mod|j = lps[j-1]|Jump to the previous longest prefix.|跳轉至前一個最長前綴。]]
        else:
            i += 1
    return -1`,
  coreTemplateCpp: `int kmp(string text, string pattern) {
    if (pattern.empty()) return 0;
    [[core|vector<int> lps = buildLPS(pattern);|Precompute LPS array.|預處理 LPS 數組。]]
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == pattern.size()) return i - j;
        } else if (j > 0) {
            [[mod|j = lps[j - 1];|Use precomputed jumps.|使用預處理的跳轉。]]
        } else {
            i++;
        }
    }
    return -1;
}`,
  variations: [
    {
      id: "strstr",
      title: "Implement strStr()",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/implement-strstr/",
      description: "Return the index of the first occurrence of needle in haystack.",
      coreLogic: `return kmp(haystack, needle)`,
      coreLogicCpp: `return kmp(haystack, needle);`,
      adaptationLogic: `Direct application of KMP`,
      explanation: "Classic string matching problem. Standard KMP provides O(N+M) time complexity, which is optimal.",
      fullCode: `def str_str(haystack, needle):
    if not needle: return 0
    [[mod|return kmp(haystack, needle)|Standard KMP search.|標準 KMP 搜尋。]]`,
      fullCodeCpp: `int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    [[mod|return kmp(haystack, needle);|Direct KMP usage.|直接使用 KMP。]]
}`
    },
    {
      id: "repeated-substring-pattern",
      title: "Repeated Substring Pattern",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/repeated-substring-pattern/",
      description: "Check if a string can be constructed by taking a substring of it and appending multiple copies of the substring together.",
      coreLogic: `lps = build_lps(s)
n = len(s)
return lps[-1] > 0 and n % (n - lps[-1]) == 0`,
      coreLogicCpp: `int n = s.size();
vector<int> lps = buildLPS(s);
return lps[n-1] > 0 && n % (n - lps[n-1]) == 0;`,
      adaptationLogic: `Mathematical property of LPS`,
      explanation: "The LPS array tells us the length of the longest proper prefix that is also a suffix. If the remaining length (n - lps[n-1]) divides n evenly, the string is periodic.",
      fullCode: `def repeated_substring_pattern(s):
    n = len(s)
    [[core|lps = build_lps(s)|Check periodicity using LPS.|使用 LPS 檢查週期性。]]
    [[mod|if lps[-1] > 0 and n % (n - lps[-1]) == 0: return True|If total length is divisible by the non-redundant part.|若總長度可被非重複部分整除。]]
    return False`,
      fullCodeCpp: `bool repeatedSubstringPattern(string s) {
    int n = s.size();
    [[core|vector<int> lps = buildLPS(s);|LPS array for periodicity.|用於週期性的 LPS 數組。]]
    [[mod|if (lps[n - 1] > 0 && n % (n - lps[n - 1]) == 0) return true;|Math shortcut.|數學捷徑。]]
    return false;
}`
    }
  ]
};
