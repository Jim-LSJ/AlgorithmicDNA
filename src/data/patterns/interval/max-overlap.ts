import { AlgorithmPattern } from "../../../types";

export const maxOverlapIntervals: AlgorithmPattern = {
  id: "max-overlap",
  name: "Meeting Rooms II (Max Overlap)",
  category: "Interval",
  description: "Find the maximum number of overlapping intervals at any point in time.",
  imageUrl: "/patterns/interval.png",
  complexity: {
    time: "O(n log n)",
    space: "O(n)",
  },
  coreTemplate: `def min_meeting_rooms(intervals):
    [[core|starts = sorted([i[0] for i in intervals])|Extract and sort all start times.|提取並排序所有開始時間。]]
    [[core|ends = sorted([i[1] for i in intervals])|Extract and sort all end times.|提取並排序所有結束時間。]]
    res = count = 0
    s_ptr = e_ptr = 0
    while s_ptr < len(intervals):
        [[mod|if starts[s_ptr] < ends[e_ptr]:|A new meeting starts before another ends.|新會議在舊會議結束前開始。]]
            count += 1; s_ptr += 1
        else:
            [[mod|count -= 1; e_ptr += 1|A meeting ends.|一個會議結束。]]
        res = max(res, count)
    return res`,
  variations: [
    {
      id: "car-pooling",
      title: "Car Pooling",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/car-pooling/",
      description: "Determine if it is possible to pick up and drop off all passengers for all given trips.",
      coreLogic: `events.append((start, passengers))
events.append((end, -passengers))
events.sort()
for time, change in events:
    curr += change; if curr > capacity: return False`,
      adaptationLogic: ``,
      explanation: "Process trip starts and ends as positive and negative passenger changes at specific timeline points.",
      fullCode: `def car_pooling(trips, capacity):
    [[core|events = []|Treat each trip as two events (pickup and dropoff).|將每趟行程視為兩個事件（接客與送客）。]]
    for num, start, end in trips:
        events.append((start, num))
        events.append((end, -num))
    
    [[mod|events.sort()|Sort by time. If time is same, dropoff should come first.|按時間排序。若時間相同，送客優先。]]
    curr_passengers = 0
    for time, change in events:
        curr_passengers += change
        if curr_passengers > capacity:
            return False
    return True`
    },
    {
      id: "corporate-flight-bookings",
      title: "Corporate Flight Bookings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/corporate-flight-bookings/",
      description: "Calculate total seats booked for each flight given range bookings.",
      coreLogic: `diff[first-1] += seats
if last < n: diff[last] -= seats`,
      adaptationLogic: `accumulate(diff)`,
      explanation: "Use a difference array (derivative) to handle range updates efficiently, then prefix sum to get totals.",
      fullCode: `def corp_flight_bookings(bookings, n):
    [[core|res = [0] * n|Initialize difference array.|初始化差分陣列。]]
    for first, last, seats in bookings:
        [[mod|res[first - 1] += seats|Mark start of increase.|標記增加的開始。]]
        if last < n:
            [[mod|res[last] -= seats|Mark end of increase.|標記增加的結束。]]
            
    for i in range(1, n):
        res[i] += res[i - 1]
    return res`
    },
    {
      id: "my-calendar-iii",
      title: "My Calendar III",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/my-calendar-iii/",
      description: "Find the maximum k-booking at any point.",
      coreLogic: `self.timeline[start] += 1
self.timeline[end] -= 1
for change in sorted_timeline:
    ongoing += change; res = max(res, ongoing)`,
      adaptationLogic: `SortedDict logic`,
      explanation: "Dynamically maintain a timeline of events and compute the maximum overlapping count on each update.",
      fullCode: `class MyCalendarThree:
    def __init__(self):
        self.diff = collections.defaultdict(int)

    def book(self, start, end):
        [[core|self.diff[start] += 1; self.diff[end] -= 1|Dynamic range markers.|動態範圍標記。]]
        
        res = ongoing = 0
        [[mod|for x in sorted(self.diff):|Scan the timeline to find peak overlap.|掃描時間轴尋找高峰重疊。]]
            ongoing += self.diff[x]
            res = max(res, ongoing)
        return res`
    }
  ]
};
