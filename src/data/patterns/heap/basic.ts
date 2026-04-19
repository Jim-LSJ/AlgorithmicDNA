import { AlgorithmPattern } from "../../../types";

export const minHeapPattern: AlgorithmPattern = {
  id: "heap",
  name: "Heap (Priority Queue)",
  category: "Heap",
  description: "A specialized tree-based data structure that satisfies the heap property, supporting O(log n) insertion and extraction of min/max.",
  imageUrl: "/patterns/heap.png",
  complexity: {
    time: "O(log n) insertion/extract, O(n) build",
    space: "O(n)",
  },
  coreTemplate: `import heapq
def heap_demo(nums):
    [[core|heapq.heapify(nums)|Transform list into a min-heap in-place.|就地將列表轉換為最小堆積。]]
    [[mod|min_val = heapq.heappop(nums)|Extract the smallest element.|取出最小元素。]]
    [[mod|heapq.heappush(nums, x)|Insert a new element.|插入新元素。]]`,
  variations: [
    {
      id: "kth-largest-element",
      title: "Kth Largest Element in an Array",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      description: "Find the Kth largest element without sorting the whole array.",
      coreLogic: `for n in nums:
    heappush(pq, n)
    if len(pq) > k: heappop(pq)
return pq[0]`,
      adaptationLogic: `Min-heap of size K`,
      explanation: "Keep a min-heap of size K. The smallest element in the heap will be the Kth largest element found so far.",
      fullCode: `def find_kth_largest(nums, k):
    [[core|pq = []|Min-heap to store the K largest elements seen.|用於儲存目前所見 K 個最大元素的最小堆積。]]
    for n in nums:
        heapq.heappush(pq, n)
        [[mod|if len(pq) > k: heapq.heappop(pq)|Maintain size K.|維持大小為 K。]]
    return pq[0]`
    },
    {
      id: "merge-k-sorted-lists",
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
      description: "Merge K sorted linked lists into one sorted linked list.",
      coreLogic: `for head in lists: heappush(pq, (head.val, id, head))
while pq:
    val, _, node = heappop(pq)
    curr.next = node; if node.next: heappush(pq, (...))`,
      adaptationLogic: ``,
      explanation: "Use a min-heap to always pick the smallest available node across all K lists. Push the next node from the same list back into the heap.",
      fullCode: `def merge_k_lists(lists):
    pq = []
    [[core|for i, l in enumerate(lists):|Add heads of all lists to heap.|將所有列表的頭部加入堆積。]]
        if l: heapq.heappush(pq, (l.val, i, l))
    
    dummy = curr = ListNode(0)
    while pq:
        val, i, node = heapq.heappop(pq)
        curr.next = node; curr = curr.next
        [[mod|if node.next:|Add replacement from the same list.|從同一列表中加入替換節點。]]
            heapq.heappush(pq, (node.next.val, i, node.next))
    return dummy.next`
    },
    {
      id: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
      description: "Find the K most frequent elements in an array.",
      coreLogic: `counts = Counter(nums)
heappush(pq, (freq, val))
if len(pq) > k: heappop(pq)`,
      adaptationLogic: `Heap of (frequency, value) pairs`,
      explanation: "Calculate frequencies using a hashmap, then use a min-heap of size K to keep the elements with the highest frequencies.",
      fullCode: `def top_k_frequent(nums, k):
    count = collections.Counter(nums)
    [[core|pq = []|Heap stores (frequency, value).|堆積儲存 (頻率, 數值)。]]
    for val, freq in count.items():
        heapq.heappush(pq, (freq, val))
        if len(pq) > k: heapq.heappop(pq)
        
    return [val for freq, val in pq]`
    }
  ]
};
