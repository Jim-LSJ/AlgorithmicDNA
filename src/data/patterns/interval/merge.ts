import { AlgorithmPattern } from "../../../types";

export const mergeIntervals: AlgorithmPattern = {
  id: "merge-intervals",
  name: "Merge Intervals",
  category: "Interval",
  description: "Merge overlapping intervals into a set of disjoint intervals.",
  imageUrl: "/patterns/interval.png",
  complexity: {
    time: "O(n log n) due to sorting",
    space: "O(n) for the output array",
  },
  coreTemplate: `def merge(intervals):
    [[core|intervals.sort(key=lambda x: x[0])|Sort intervals by start time.|按起始時間將區間排序。]]
    res = []
    for interval in intervals:
        [[mod|if not res or res[-1][1] < interval[0]:|If no overlap, add as a new interval.|若無重疊，則作為新區間加入。]]
            res.append(interval)
        else:
            [[mod|res[-1][1] = max(res[-1][1], interval[1])|If overlap, extend the previous interval.|若重疊，則擴展前一個區間。]]
    return res`,
  variations: [
    {
      id: "insert-interval",
      title: "Insert Interval",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
      description: "Insert a new interval into a sorted list of non-overlapping intervals and merge if necessary.",
      coreLogic: `while i < n and intervals[i][1] < newInterval[0]:
    res.append(intervals[i]); i += 1
while i < n and intervals[i][0] <= newInterval[1]:
    newInterval = [min(...), max(...)]`,
      adaptationLogic: `res = []`,
      explanation: "Process intervals in three phases: before overlap, during overlap (merge), and after overlap.",
      fullCode: `def insert(intervals, newInterval):
    res = []
    i = 0
    n = len(intervals)
    
    [[core|while i < n and intervals[i][1] < newInterval[0]:|Add all intervals that end before the new interval starts.|將所有在「新區間」開始前就結束的區間加入。]]
        res.append(intervals[i])
        i += 1
        
    [[mod|while i < n and intervals[i][0] <= newInterval[1]:|Merge overlapping intervals.|合併重疊區間。]]
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    res.append(newInterval)
    
    while i < n:
        res.append(intervals[i])
        i += 1
    return res`
    },
    {
      id: "meeting-rooms",
      title: "Meeting Rooms (Overlap Detection)",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/",
      description: "Determine if a person can attend all meetings (no overlaps).",
      coreLogic: `intervals.sort()
for i in range(1, len(intervals)):
    if intervals[i][0] < intervals[i-1][1]: return False`,
      adaptationLogic: `return True`,
      explanation: "Simply check if any interval starts before the previous one ends.",
      fullCode: `def can_attend_meetings(intervals):
    [[core|intervals.sort()|Sorting is essential for interval problems.|排序對區間問題至關重要。]]
    for i in range(1, len(intervals)):
        [[mod|if intervals[i][0] < intervals[i-1][1]:|If next starts before current ends, overlap exists.|若下一個在當前結束前開始，則存在重疊。]]
            return False
    return True`
    },
    {
      id: "employee-free-time",
      title: "Employee Free Time",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/employee-free-time/",
      description: "Find the free time common to all employees given their working schedules.",
      coreLogic: `merged = merge_all_intervals(schedules)
for i in range(1, len(merged)):
    res.append(Interval(merged[i-1].end, merged[i].start))`,
      adaptationLogic: ``,
      explanation: "Merge all individual schedules first, then the gaps between merged intervals are the free time.",
      fullCode: `def employee_free_time(schedule):
    [[core|all_intervals = sorted([i for s in schedule for i in s], key=lambda x: x.start)|Flat all intervals and sort.|打平所有區間並排序。]]
    
    res = []
    merged = [all_intervals[0]]
    for curr in all_intervals[1:]:
        if curr.start <= merged[-1].end:
            merged[-1].end = max(merged[-1].end, curr.end)
        else:
            [[mod|res.append(Interval(merged[-1].end, curr.start))|Gaps between disjoint work segments are free periods.|不相連工作段之間的間隔即為空閒時段。]]
            merged.append(curr)
    return res`
    }
  ]
};
