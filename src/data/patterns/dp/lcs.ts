import { AlgorithmPattern } from "../../../types";

export const lcsPattern: AlgorithmPattern = {
  id: "lcs",
  name: "Longest Common Subsequence (LCS)",
  category: "Dynamic Programming",
  description: "Find the length of the longest subsequence present in two strings.",
  imageUrl: "/patterns/dp.png",
  complexity: {
    time: "O(m * n)",
    space: "O(m * n) or O(min(m, n)) with optimization",
  },
  coreTemplate: `def lcs(text1, text2):
    m, n = len(text1), len(text2)
    [[core|dp = [[0] * (n + 1) for _ in range(m + 1)]|DP table stores LCS of prefixes.|DP 表儲存前綴的 LCS。]]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                [[mod|dp[i][j] = dp[i-1][j-1] + 1|Found a match, increment LCS.|發現匹配，增加 LCS。]]
            else:
                [[mod|dp[i][j] = max(dp[i-1][j], dp[i][j-1])|No match, carry over the max from previous subproblems.|未匹配，延續先前子問題的最大值。]]
    return dp[m][n]`,
  variations: [
    {
      id: "edit-distance",
      title: "Edit Distance",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
      description: "Find the minimum number of operations required to convert one string to another.",
      coreLogic: `if s1[i-1] == s2[j-1]: 
    dp[i][j] = dp[i-1][j-1]
else: 
    dp[i][j] = 1 + min(insert, delete, replace)`,
      adaptationLogic: ``,
      explanation: "Extension of LCS where we also consider specific costs for each mismatch (insert, delete, replace).",
      fullCode: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                [[mod|dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])|Min of Insert, Delete, or Replace.|插入、刪除或替換的最小值。]]
    return dp[m][n]`
    },
    {
      id: "shortest-common-supersequence",
      title: "Shortest Common Supersequence",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/shortest-common-supersequence/",
      description: "Find the shortest string that contains both strings as subsequences.",
      coreLogic: `if str1[i-1] == str2[j-1]:
    res.append(str1[i-1])
    i -= 1; j -= 1
elif dp[i-1][j] > dp[i][j-1]:
    res.append(str1[i-1]); i -= 1`,
      adaptationLogic: ``,
      explanation: "Find the LCS, then combine the strings while only including the shared LCS characters once.",
      fullCode: `def shortest_common_supersequence(str1, str2):
    m, n = len(str1), len(str2)
    # 1. Fill DP Table (LCS)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            
    # 2. Backtrack to build the supersequence
    res = []; i, j = m, n
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            res.append(str1[i-1]); i -= 1; j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            res.append(str1[i-1]); i -= 1
        else:
            res.append(str2[j-1]); j -= 1
            
    [[mod|return str1[:i] + str2[:j] + "".join(res[::-1])|Attach leftovers.|附加剩餘部分。]]`
    },
    {
      id: "delete-operation-for-two-strings",
      title: "Delete Operation for Two Strings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/delete-operation-for-two-strings/",
      description: "Find the minimum number of steps to make two strings identical.",
      coreLogic: `l = lcs(s1, s2)
return (len(s1) - l) + (len(s2) - l)`,
      adaptationLogic: ``,
      explanation: "The minimum deletions required is the total length of both strings minus twice the LCS length.",
      fullCode: `def min_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    [[mod|lcs_len = dp[m][n]|Calculate matching part.|計算匹配的部分。]]
    return (m - lcs_len) + (n - lcs_len)`
    }
  ]
};
