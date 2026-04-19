import { AlgorithmPattern } from "../../../types";

export const nextGreaterElement: AlgorithmPattern = {
  id: "next-greater-element",
  name: "Next Greater Element",
  category: "Monotonic Stack & Queue",
  description: "Use a monotonic stack to find the next element larger (or smaller) than the current one in O(n).",
  imageUrl: "/patterns/monotonic-stack.png",
  complexity: {
    time: "O(n)",
    space: "O(n)",
  },
  coreTemplate: `def next_greater(nums):
    [[core|stack = []|Monotonic stack stores indices of elements for which we haven't found the next greater yet.|單調棧儲存尚未找到下一個更大元素的索引。]]
    res = [-1] * len(nums)
    for i in range(len(nums)):
        [[core|while stack and nums[stack[-1]] < nums[i]:|Current element is larger than elements at indices in stack.|當前元素大於棧頂索引對應的元素。]]
            idx = stack.pop()
            [[mod|res[idx] = nums[i]|Found the next greater element for idx.|找到 idx 的下一個更大元素。]]
        stack.append(i)
    return res`,
  coreTemplateCpp: `vector<int> nextGreaterElement(vector<int>& nums) {
    [[core|stack<int> s;|Stack to maintain elements.|用於維護元素的棧。]]
    vector<int> res(nums.size(), -1);
    for (int i = 0; i < nums.size(); ++i) {
        [[mod|while (!s.empty() && nums[s.top()] < nums[i]) {|Current > stack top.|當前值 > 棧頂值。]]
            res[s.top()] = nums[i];
            s.pop();
        }
        s.push(i);
    }
    return res;
}`,
  variations: [
    {
      id: "daily-temperatures",
      title: "Daily Temperatures",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
      description: "Find the number of days until a warmer temperature occurs.",
      coreLogic: `while stack and temperatures[i] > temperatures[stack[-1]]:
    idx = stack.pop()
    res[idx] = i - idx`,
      coreLogicCpp: `while (!s.empty() && temperatures[i] > temperatures[s.top()]) {
    int idx = s.top(); s.pop();
    res[idx] = i - idx;
}`,
      adaptationLogic: ``,
      explanation: "Exactly the same as Next Greater Element, but store the *difference in indices* instead of the value itself.",
      fullCode: `def daily_temperatures(temperatures):
    n = len(temperatures)
    res = [0] * n
    stack = []
    for i in range(n):
        [[mod|while stack and temperatures[i] > temperatures[stack[-1]]:|Current temperature is warmer than the one at the top of the stack.|當前溫度比棧頂的溫度更溫暖。]]
            prev_idx = stack.pop()
            res[prev_idx] = i - prev_idx
        stack.append(i)
    return res`,
      fullCodeCpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> res(n, 0);
    stack<int> s;
    for (int i = 0; i < n; i++) {
        [[mod|while (!s.empty() && temperatures[i] > temperatures[s.top()]) {|Wait for warmer temperature.|等待更溫暖的溫度。]]
            int prevIdx = s.top(); s.pop();
            res[prevIdx] = i - prevIdx;
        }
        s.push(i);
    }
    return res;
}`
    },
    {
      id: "next-greater-element-ii",
      title: "Next Greater Element II (Circular)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/next-greater-element-ii/",
      description: "Find the next greater element in a circular array.",
      coreLogic: `for i in range(n * 2):
    curr = nums[i % n]
    while stack and nums[stack[-1]] < curr:
        res[stack.pop()] = curr`,
      coreLogicCpp: `for (int i = 0; i < n * 2; i++) {
    while (!s.empty() && nums[s.top()] < nums[i % n])
        res[s.top()] = nums[i % n], s.pop();
}`,
      adaptationLogic: `range(n * 2)`,
      explanation: "Simulate a circular array by iterating through the array twice and using modulo for indexing.",
      fullCode: `def next_greater_circular(nums):
    n = len(nums)
    res = [-1] * n
    stack = []
    [[core|for i in range(n * 2):|Loop twice to simulate circularity.|循環兩遍以模擬環狀。]]
        curr = nums[i % n]
        while stack and nums[stack[-1]] < curr:
            res[stack.pop()] = curr
        if i < n: stack.append(i)
    return res`,
      fullCodeCpp: `vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> s;
    [[core|for (int i = 0; i < n * 2; i++) {|Virtual duplication for cycle.|循環兩次模擬環迴。]]
        while (!s.empty() && nums[s.top()] < nums[i % n]) {
            res[s.top()] = nums[i % n];
            s.pop();
        }
        if (i < n) s.push(i);
    }
    return res;
}`
    },
    {
      id: "largest-rectangle-histogram",
      title: "Largest Rectangle in Histogram",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      description: "Find the area of the largest rectangle in a histogram.",
      coreLogic: `while stack and heights[i] < heights[stack[-1]]:
    h = heights[stack.pop()]
    w = i - stack[-1] - 1
    area = max(area, h * w)`,
      coreLogicCpp: `while (s.top() != -1 && heights[i] < heights[s.top()]) {
    int h = heights[s.top()]; s.pop();
    int w = i - s.top() - 1;
    res = max(res, h * w);
}`,
      adaptationLogic: `add sentinel 0`,
      explanation: "Use a monotonic increasing stack to find the left and right boundaries where each height can be the minimum, forming a rectangle.",
      fullCode: `def largest_rectangle_area(heights):
    [[core|heights.append(0)|Add a sentinel to ensure all elements are popped.|加入哨兵以確保所有元素都被彈出。]]
    stack = [-1]
    res = 0
    for i in range(len(heights)):
        [[mod|while heights[i] < heights[stack[-1]]:|Found a right boundary for the rectangle at stack top.|找到了棧頂高度對應矩形的右邊界。]]
            h = heights[stack.pop()]
            w = i - stack[-1] - 1
            res = max(res, h * w)
        stack.append(i)
    return res`,
      fullCodeCpp: `int largestRectangleArea(vector<int>& heights) {
    [[core|heights.push_back(0);|Add sentinel to force stack flush.|加入哨兵以強制排空棧。]]
    stack<int> s; s.push(-1);
    int res = 0;
    for (int i = 0; i < heights.size(); i++) {
        [[mod|while (s.top() != -1 && heights[i] < heights[s.top()])|Calculate area when height decreases.|當高度遞減時計算面積。]] {
            int h = heights[s.top()]; s.pop();
            int w = (i - s.top() - 1);
            res = max(res, h * w);
        }
        s.push(i);
    }
    return res;
}`
    }
  ]
};
