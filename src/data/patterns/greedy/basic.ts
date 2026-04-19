import { AlgorithmPattern } from "../../../types";

export const greedyPattern: AlgorithmPattern = {
  id: "greedy",
  name: "Greedy Algorithms",
  category: "Greedy",
  description: "Make the locally optimal choice at each step with the hope of finding a global optimum.",
  imageUrl: "/patterns/greedy.png",
  complexity: {
    time: "O(n log n) usually due to sorting",
    space: "O(1) to O(n)",
  },
  coreTemplate: `def greedy_example(items):
    [[core|items.sort(key=lambda x: x.profit / x.weight, reverse=True)|Sort items by a greedy criteria (e.g., efficiency).|按貪婪準則（如效率）對項目進行排序。]]
    res = 0
    for item in items:
        [[mod|if can_fit(item):|Take the item if it satisfies local constraints.|若滿足局部約束則選取該項目。]]
            res += item.value
            update_limit(item)
    return res`,
  coreTemplateCpp: `int greedyExample(vector<Item>& items) {
    [[core|sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.profit/a.weight > (double)b.profit/b.weight;
    });|Sort by greedy criterion.|按貪婪準則排序。]]
    int res = 0;
    for (auto& item : items) {
        [[mod|if (canFit(item)) {|Local optimal choice.|局部最優選擇。]]
            res += item.value;
            updateLimit(item);
        }
    }
    return res;
}`,
  variations: [
    {
      id: "gas-station",
      title: "Gas Station",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      description: "Find the starting gas station index that allows you to travel around the circuit once.",
      coreLogic: `total += gas - cost; curr += gas - cost
if curr < 0: start = i + 1; curr = 0`,
      coreLogicCpp: `total += g - c; curr += g - c;
if (curr < 0) { start = i + 1; curr = 0; }`,
      adaptationLogic: ``,
      explanation: "Greedy observation: If you can't reach station B from A, then NO station between A and B can reach B. The answer must be after B.",
      fullCode: `def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost): return -1
    [[core|total_gas = curr_gas = start = 0|Initialize tracking variables.|初始化追踪變數。]]
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        curr_gas += diff
        [[mod|if curr_gas < 0:|Cannot reach next station, reset start point.|無法到達下一站，重置起始點。]]
            start = i + 1
            curr_gas = 0
    return start`,
      fullCodeCpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        curr += diff;
        [[mod|if (curr < 0)|Greedy skip: start must be after i.|貪婪跳過：起始點必在 i 之後。]] {
            start = i + 1;
            curr = 0;
        }
    }
    return (total < 0) ? -1 : start;
}`
    },
    {
      id: "jump-game-ii",
      title: "Jump Game II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
      description: "Find the minimum number of jumps to reach the last index.",
      coreLogic: `max_reach = max(max_reach, i + nums[i])
if i == end: count += 1; end = max_reach`,
      coreLogicCpp: `maxReach = max(maxReach, i + nums[i]);
if (i == stepEnd) { jumps++; stepEnd = maxReach; }`,
      adaptationLogic: `Implicit BFS approach`,
      explanation: "Maintain the furthest reach possible from all indices in the current jump range. Increment jumps whenever we reach the 'end' of the current jump range.",
      fullCode: `def jump(nums):
    n = len(nums); jumps = 0
    end = 0; furthest = 0
    for i in range(n - 1):
        [[mod|furthest = max(furthest, i + nums[i])|Update maximum reach seen so far.|更新目前所見的最大可達範圍。]]
        if i == end:
            [[mod|jumps += 1; end = furthest|Must make another jump.|必須再跳一次。]]
    return jumps`,
      fullCodeCpp: `int jump(vector<int>& nums) {
    int n = nums.size(), jumps = 0, end = 0, furthest = 0;
    for (int i = 0; i < n - 1; i++) {
        [[mod|furthest = max(furthest, i + nums[i]);|Track maximum reachable index.|追踪最大可達索引。]]
        if (i == end) {
            jumps++;
            end = furthest;
        }
    }
    return jumps;
}`
    },
    {
      id: "task-scheduler",
      title: "Task Scheduler",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
      description: "Find the least number of units of times to finish all tasks with a cooldown period N.",
      coreLogic: `max_freq = max(counts.values())
num_max_freq = list(counts.values()).count(max_freq)
return max(len(tasks), (max_freq - 1) * (n + 1) + num_max_freq)`,
      coreLogicCpp: `int max_f = 0, num_max_f = 0;
for (auto& p : counts) max_f = max(max_f, p.second);
for (auto& p : counts) if (p.second == max_f) num_max_f++;
return max((int)tasks.size(), (max_f - 1) * (n + 1) + num_max_f);`,
      adaptationLogic: `Math formula vs Heap simulation`,
      explanation: "The bottleneck is the most frequent task. Calculate the idle slots forced by this task, then fill them with other tasks.",
      fullCode: `def least_interval(tasks, n):
    counts = collections.Counter(tasks)
    [[core|max_f = max(counts.values())|Find highest task frequency.|找出最高的任務頻率。]]
    [[core|num_max_f = collections.Counter(counts.values())[max_f]|Count tasks with that highest frequency.|計算具有該最高頻率的任務數量。]]
    
    [[mod|slots = (max_f - 1) * (n + 1) + num_max_f|Theoretical minimum time.|理論上的最小時間。]]
    return max(len(tasks), slots)`,
      fullCodeCpp: `int leastInterval(vector<char>& tasks, int n) {
    unordered_map<char, int> counts;
    for (char t : tasks) counts[t]++;
    int max_f = 0;
    for (auto& p : counts) max_f = max(max_f, p.second);
    int num_max_f = 0;
    for (auto& p : counts) if (p.second == max_f) num_max_f++;
    
    [[mod|int result = (max_f - 1) * (n + 1) + num_max_f;|Minimum intervals needed.|所需最小間隔。]]
    return max((int)tasks.size(), result);
}`
    }
  ]
};
