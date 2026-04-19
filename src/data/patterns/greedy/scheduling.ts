import { AlgorithmPattern } from "../../../types";

export const greedyScheduling: AlgorithmPattern = {
  id: "greedy-scheduling",
  name: "Greedy Scheduling",
  category: "Greedy",
  description: "Optimizing task or event schedules using greedy strategies.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n log n)",
    space: "O(n) or O(1)",
  },
  coreTemplate: `def schedule_tasks(tasks):
    [[core|tasks.sort(key=lambda x: x[1])|Sort by end time to maximize non-overlapping tasks.|按結束時間排序以最大化非重疊任務。]]
    [[core|curr_end = 0|End time of the last scheduled task.|最後一個已排定任務的結束時間。]]
    count = 0
    for s, e in tasks:
        if s >= curr_end:
            count += 1
            curr_end = e
    return count`,
  variations: [
    {
      id: "gas-station",
      title: "Gas Station",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      description: "Find the starting gas station index if you can travel around the circuit.",
      coreLogic: `total_surplus, curr_surplus, start = 0, 0, 0
for i in range(n):
    total_surplus += gas[i] - cost[i]
    curr_surplus += gas[i] - cost[i]
    if curr_surplus < 0:
        start = i + 1
        curr_surplus = 0`,
      adaptationLogic: `return start if total_surplus >= 0 else -1`,
      explanation: "Greedily attempts to find a starting point. If the current surplus becomes negative, the start point must be after the current station.",
      fullCode: `def can_complete_circuit(gas, cost):
    [[core|if sum(gas) < sum(cost): return -1|If total gas is less than total cost, impossible.|若總油量小於總成本，則不可能完成。]]
    
    total = 0
    start = 0
    for i in range(len(gas)):
        total += gas[i] - cost[i]
        [[mod|if total < 0:|If oil runs out, the starting point must be further ahead.|若油量耗盡，起點必須在更後面。]]
            total = 0
            start = i + 1
            
    return start`
    }
  ]
};
