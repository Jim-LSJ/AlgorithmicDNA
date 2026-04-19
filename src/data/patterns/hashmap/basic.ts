import { AlgorithmPattern } from "../../../types";

export const hashmapBasic: AlgorithmPattern = {
  id: "hashmap-basic",
  name: "HashMap Basics",
  category: "HashMap",
  description: "Use associative arrays to store key-value pairs for O(1) average time complexity lookups.",
  imageUrl: "/patterns/hashmap.png",
  complexity: {
    time: "O(1) average, O(n) worst case",
    space: "O(n)",
  },
  coreTemplate: `def hashmap_usage(nums):
    [[core|mapping = {}|Maps values to indices or frequencies.|將數值映射至索引或頻率。]]
    for i, x in enumerate(nums):
        [[mod|if x in mapping: return [mapping[x], i]|Fast lookup for complement or history.|快速查閱補數或歷史記錄。]]
        mapping[x] = i`,
  variations: [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      description: "Find indices of two numbers that add up to a specific target.",
      coreLogic: `complement = target - num
if complement in seen: return [seen[complement], i]`,
      adaptationLogic: ``,
      explanation: "Classic application of HashMap to store seen values and their indices to achieve linear time complexity.",
      fullCode: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        [[mod|diff = target - n|Calculate target complement.|計算目標補數。]]
        if diff in seen: return [seen[diff], i]
        seen[n] = i`
    },
    {
      id: "group-anagrams",
      title: "Group Anagrams",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
      description: "Group strings that are anagrams of each other.",
      coreLogic: `key = tuple(sorted(s))
groups[key].append(s)`,
      adaptationLogic: `Sorted string or char-count as key`,
      explanation: "Use a sorted version of each string or a character frequency count as the hashmap key to group variations of the same characters.",
      fullCode: `def group_anagrams(strs):
    ans = collections.defaultdict(list)
    for s in strs:
        [[core|count = [0] * 26|Char count used as a stable key.|用字元計數作為穩定鍵值。]]
        for c in s: count[ord(c) - ord('a')] += 1
        ans[tuple(count)].append(s)
    return ans.values()`
    },
    {
      id: "isomorphic-strings",
      title: "Isomorphic Strings",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/isomorphic-strings/",
      description: "Determine if two strings are isomorphic (character mapping is consistent).",
      coreLogic: `if s[i] in mapS and mapS[s[i]] != t[i]: return False
if t[i] in mapT and mapT[t[i]] != s[i]: return False`,
      adaptationLogic: `Double mapping for bijection`,
      explanation: "Maintain two hashmaps to ensure a one-to-one mapping (bijection) between characters of both strings.",
      fullCode: `def is_isomorphic(s, t):
    mapST, mapTS = {}, {}
    for c1, c2 in zip(s, t):
        [[mod|if (c1 in mapST and mapST[c1] != c2) or (c2 in mapTS and mapTS[c2] != c1):|Check for inconsistent mapping.|檢查不一致的映射。]]
            return False
        mapST[c1] = c2; mapTS[c2] = c1
    return True`
    }
  ]
};
