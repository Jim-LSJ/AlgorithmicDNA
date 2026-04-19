import { AlgorithmPattern } from "../../../types";

export const slidingWindowMax: AlgorithmPattern = {
  id: "sliding-window-max",
  name: "Sliding Window Maximum",
  category: "Monotonic Stack & Queue",
  description: "Find the maximum element in each sliding window using a monotonic deque.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n)",
    space: "O(k) where k is the window size",
  },
  coreTemplate: `def max_sliding_window(nums, k):
    [[core|dq = deque()|Double-ended queue stores indices and remains monotonic (decreasing).|雙端隊列儲存索引並維持單調（遞減）。]]
    res = []
    for i in range(len(nums)):
        [[core|if dq and dq[0] < i - k + 1: dq.popleft()|Remove indices that are out of the current window.|移除超出當前窗口範圍的索引。]]
        [[core|while dq and nums[dq[-1]] < nums[i]: dq.pop()|Maintain decreasing order in the deque.|維持隊列中的遞減順序。]]
        dq.append(i)
        if i >= k - 1:
            [[mod|res.append(nums[dq[0]])|The front of the deque is always the maximum.|隊列頭部始終是最大值。]]
    return res`,
  variations: []
};
