import { AlgorithmPattern } from "../../../types";

export const differenceArray: AlgorithmPattern = {
  id: "difference-array",
  name: "Difference Array",
  category: "Prefix Sum & Difference Array",
  description: "Efficiently apply multiple range updates and then query the final array values.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(1) per update, O(n) to build final array",
    space: "O(n)",
  },
  coreTemplate: `def update_range(diff, i, j, val):
    [[core|diff[i] += val|Mark the start of the change.|標記變化的開始。]]
    [[core|if j + 1 < len(diff): diff[j+1] -= val|Mark the end of the change.|標記變化的結束。]]

def get_final(diff):
    [[mod|res = list(accumulate(diff))|The final array is the prefix sum of the difference array.|最終陣列即為差分陣列的前綴和。]]
    return res`,
  variations: []
};
