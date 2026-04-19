import { AlgorithmPattern } from "../../../types";

export const stringSearch: AlgorithmPattern = {
  id: "kmp-search",
  name: "KMP String Search",
  category: "Math & Strings",
  description: "Efficiently find occurrences of a pattern within a text string using precomputed prefix information.",
  imageUrl: "/patterns/sorting.png",
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
  variations: []
};
