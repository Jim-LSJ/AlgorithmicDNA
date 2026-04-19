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
  variations: [
    {
      id: "gas-station",
      title: "Gas Station",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      description: "Find the starting gas station index that allows you to travel around the circuit once.",
      coreLogic: `total += gas - cost; curr += gas - cost
if curr < 0: start = i + 1; curr = 0`,
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
    return start`
    },
    {
      id: "jump-game-ii",
      title: "Jump Game II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
      description: "Find the minimum number of jumps to reach the last index.",
      coreLogic: `max_reach = max(max_reach, i + nums[i])
if i == end: count += 1; end = max_reach`,
      adaptationLogic: `Implicit BFS approach`,
      explanation: "Maintain the furthest reach possible from all indices in the current jump range. Increment jumps whenever we reach the 'end' of the current jump range.",
      fullCode: `def jump(nums):
    n = len(nums); jumps = 0
    end = 0; furthest = 0
    for i in range(n - 1):
        [[mod|furthest = max(furthest, i + nums[i])|Update maximum reach seen so far.|更新目前所見的最大可達範圍。]]
        if i == end:
            [[mod|jumps += 1; end = furthest|Must make another jump.|必須再跳一次。]]
    return jumps`
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
      adaptationLogic: `Math formula vs Heap simulation`,
      explanation: "The bottleneck is the most frequent task. Calculate the idle slots forced by this task, then fill them with other tasks.",
      fullCode: `def least_interval(tasks, n):
    counts = collections.Counter(tasks)
    [[core|max_f = max(counts.values())|Find highest task frequency.|找出最高的任務頻率。]]
    [[core|num_max_f = collections.Counter(counts.values())[max_f]|Count tasks with that highest frequency.|計算具有該最高頻率的任務數量。]]
    
    [[mod|slots = (max_f - 1) * (n + 1) + num_max_f|Theoretical minimum time.|理論上的最小時間。]]
    return max(len(tasks), slots)`
    }
  ]
};
