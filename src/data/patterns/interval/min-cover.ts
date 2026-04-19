import { AlgorithmPattern } from "../../../types";

export const intervalCoverage: AlgorithmPattern = {
  id: "interval-coverage",
  name: "Min Intervals to Cover Range",
  category: "Interval",
  description: "Find the minimum number of intervals needed to completely cover a specific time range [T_start, T_end].",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n log n)",
    space: "O(1) extra",
  },
  coreTemplate: `def min_cover(intervals, target_start, target_end):
    [[core|intervals.sort()|Sort by start time.|按開始時間排序。]]
    res = 0
    curr_end = target_start
    while curr_end < target_end:
        [[core|max_next_end = curr_end|Find the interval starting <= curr_end that extends furthest.|尋找在 curr_end 前開始且延伸最遠的區間。]]
        for s, e in intervals:
            if s <= curr_end:
                max_next_end = max(max_next_end, e)
        if max_next_end == curr_end: return -1 # Gap found
        res += 1
        curr_end = max_next_end
    return res`,
  variations: [
    {
      id: "video-stitching",
      title: "Video Stitching",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/video-stitching/",
      description: "Minimum clips to cover the interval [0, T].",
      coreLogic: `clips.sort()
can_reach, far, count = 0, 0, 0
for s, e in clips:
    if s > can_reach:
        count += 1
        can_reach = far`,
      adaptationLogic: `    if s <= can_reach:
        far = max(far, e)
return count if far >= T else -1`,
      explanation: "Greedily picks the clip that extends the current reach as far as possible.",
      fullCode: `def video_stitching(clips, time):
    [[core|clips.sort()|Always sort by start time for range coverage problems.|針對範圍涵蓋問題，一律依開始時間排序。]]
    
    count = 0
    [[core|curr_reach = 0|How much we have covered so far.|目前已涵蓋的範圍。]]
    [[core|next_reach = 0|The furthest we can reach in the next step.|下一步能到達的最遠位置。]]
    i = 0
    
    while curr_reach < time:
        [[mod|while i < len(clips) and clips[i][0] <= curr_reach:|Explore all clips that start within our current coverage.|探索所有在目前涵蓋範圍內開始的片段。]]
            next_reach = max(next_reach, clips[i][1])
            i += 1
            
        [[new|if curr_reach == next_reach: return -1|If we can't extend further, target is unreachable.|若無法再延伸，則表示無法到達目標。]]
        
        [[mod|curr_reach = next_reach|Jump to the furthest point reached.|跳轉至已達到的最遠點。]]
        count += 1
        
    return count`
    }
  ]
};
