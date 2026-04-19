import { AlgorithmPattern } from "../../../types";

export const differenceArray: AlgorithmPattern = {
  id: "difference-array",
  name: "Difference Array",
  category: "Prefix Sum & Difference Array",
  description: "Efficiently apply multiple range updates and then query the final array values.",
  imageUrl: "/patterns/prefix-sum.png",
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
  coreTemplateCpp: `void updateRange(vector<int>& diff, int i, int j, int val) {
    [[core|diff[i] += val;|Start index update.|起始索引更新。]]
    [[core|if (j + 1 < diff.size()) diff[j + 1] -= val;|End index update.|結束索引更新。]]
}

vector<int> getFinal(vector<int>& diff) {
    [[mod|for (int i = 1; i < diff.size(); i++) diff[i] += diff[i - 1];|Compute prefix sum to restore array.|計算前綴和以還原陣列。]]
    return diff;
}`,
  variations: [
    {
      id: "corporate-flight-bookings",
      title: "Corporate Flight Bookings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/corporate-flight-bookings/",
      description: "Answer the total number of seats reserved for each flight given range bookings.",
      coreLogic: `res[first-1] += seats
if last < n: res[last] -= seats
return accumulate(res)`,
      coreLogicCpp: `diff[first - 1] += seats;
if (last < n) diff[last] -= seats;`,
      adaptationLogic: `1-indexed to 0-indexed conversion`,
      explanation: "Classic application of difference array. Apply multiple range updates, then restore the final seat counts using prefix sum.",
      fullCode: `def corpFlightBookings(bookings, n):
    diff = [0] * n
    for start, end, seats in bookings:
        [[mod|diff[start - 1] += seats|1-indexed to 0-indexed adjustment.|1-序轉 0-序調整。]]
        if end < n: diff[end] -= seats
    
    [[mod|for i in range(1, n): diff[i] += diff[i - 1]|Prefix sum restoration.|前綴和還原。]]
    return diff`,
      fullCodeCpp: `vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
    vector<int> diff(n, 0);
    for (auto& b : bookings) {
        [[mod|diff[b[0] - 1] += b[2];|Mark range start.|標記範圍起始。]]
        if (b[1] < n) diff[b[1]] -= b[2];
    }
    for (int i = 1; i < n; i++) diff[i] += diff[i - 1];
    return diff;
}`
    },
    {
      id: "car-pooling",
      title: "Car Pooling",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/car-pooling/",
      description: "Determine if it's possible to pick up and drop off all passengers given car capacity.",
      coreLogic: `diff[from] += num; diff[to] -= num
for d in diff: curr += d; if curr > cap: return False`,
      coreLogicCpp: `stops[trip[1]] += trip[0];
stops[trip[2]] -= trip[0];
for (int s : stops) { curr += s; if (curr > cap) return false; }`,
      adaptationLogic: `Fixed range (0-1000) difference array`,
      explanation: "Track the net change in passengers at each stop using a difference array. If the cumulative sum at any point exceeds capacity, return False.",
      fullCode: `def car_pooling(trips, capacity):
    stops = [0] * 1001
    for num, start, end in trips:
        [[core|stops[start] += num; stops[end] -= num|Apply net change at boundaries.|在邊界應用淨變化。]]
    
    curr = 0
    for s in stops:
        [[mod|curr += s; if curr > capacity: return False|Check if capacity is exceeded.|檢查是否超過載客量。]]
    return True`,
      fullCodeCpp: `bool carPooling(vector<vector<int>>& trips, int capacity) {
    vector<int> stops(1001, 0);
    for (auto& t : trips) {
        [[core|stops[t[1]] += t[0]; stops[t[2]] -= t[0];|Mark enter/exit changes.|標記進出變化。]]
    }
    int curr = 0;
    for (int s : stops) {
        [[mod|curr += s; if (curr > capacity) return false;|Verify capacity at each stop.|驗證每一站的載客量。]]
    }
    return true;
}`
    }
  ]
};
