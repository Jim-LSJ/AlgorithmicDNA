import { AlgorithmPattern } from "../../../types";

export const greedyScheduling: AlgorithmPattern = {
  id: "greedy-scheduling",
  name: "Greedy Scheduling",
  category: "Greedy",
  description: "Optimizing task or event schedules using greedy strategies.",
  imageUrl: "/patterns/greedy.png",
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
  coreTemplateCpp: `int scheduleTasks(vector<pair<int, int>>& tasks) {
    [[core|sort(tasks.begin(), tasks.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });|Sort tasks by end time.|按結束時間排序任務。]]
    int count = 0, currEnd = 0;
    for (auto& task : tasks) {
        if (task.first >= currEnd) {
            count++;
            currEnd = task.second;
        }
    }
    return count;
}`,
  variations: [
    {
      id: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
      description: "Find the minimum number of meeting rooms required.",
      coreLogic: `starts.sort(); ends.sort()
if starts[s] >= ends[e]: e += 1
else: rooms += 1`,
      coreLogicCpp: `sort(starts.begin(), starts.end());
sort(ends.begin(), ends.end());
if (starts[s] >= ends[e]) e++;
else rooms++;`,
      adaptationLogic: `Two pointers tracking start and end times`,
      explanation: "Sort start and end times separately. When a meeting starts before the earliest finished one ends, we need a new room. Otherwise, we can reuse a room.",
      fullCode: `def min_meeting_rooms(intervals):
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    [[core|rooms = s = e = 0|Initialize room count and pointers.|初始化會議室計數與指標。]]
    while s < len(intervals):
        [[mod|if starts[s] >= ends[e]:|A room becomes free.|會議室空出。]]
            e += 1
        else:
            [[mod|rooms += 1|Need a new room.|需要新會議室。]]
        s += 1
    return rooms`,
      fullCodeCpp: `int minMeetingRooms(vector<vector<int>>& intervals) {
    vector<int> starts, ends;
    for (auto& i : intervals) { starts.push_back(i[0]); ends.push_back(i[1]); }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    
    int rooms = 0, e = 0;
    for (int s = 0; s < starts.size(); s++) {
        [[mod|if (starts[s] >= ends[e]) e++;|Reuse room.|重複使用會議室。]]
        else rooms++;
    }
    return rooms;
}`
    },
    {
      id: "two-city-scheduling",
      title: "Two City Scheduling",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/two-city-scheduling/",
      description: "Minimize the cost of flying 2N people to two cities, with N people in each city.",
      coreLogic: `costs.sort(key=lambda x: x[0] - x[1])
sum(first_half_A) + sum(second_half_B)`,
      coreLogicCpp: `sort(costs.begin(), costs.end(), [](auto& a, auto& b) {
    return (a[0] - a[1]) < (b[0] - b[1]);
});`,
      adaptationLogic: `Sorting by relative cost (difference)`,
      explanation: "Sort people by the price difference between City A and City B. Send the first half (with lowest difference favoring A) to City A and the rest to City B.",
      fullCode: `def two_city_sched_cost(costs):
    [[core|costs.sort(key=lambda x: x[0] - x[1])|Sort by the benefit of choosing City A over City B.|按選擇 A 城相對於 B 城的效益排序。]]
    total = 0
    n = len(costs) // 2
    for i in range(n):
        [[mod|total += costs[i][0] + costs[i + n][1]|Send first half to A, second half to B.|前半部去 A 城，後半部去 B 城。]]
    return total`,
      fullCodeCpp: `int twoCitySchedCost(vector<vector<int>>& costs) {
    [[core|sort(costs.begin(), costs.end(), [](auto& a, auto& b) {
        return (a[0] - a[1]) < (b[0] - b[1]);
    });|Sort by relative cost difference.|按相對成本差異排序。]]
    int total = 0, n = costs.size() / 2;
    for (int i = 0; i < n; i++) {
        total += costs[i][0] + costs[i + n][1];
    }
    return total;
}`
    }
  ]
};
