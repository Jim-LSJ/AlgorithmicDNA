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
  coreTemplateCpp: `#include <queue>
void heapDemo(vector<int>& nums) {
    [[core|priority_queue<int, vector<int>, greater<int>> pq(nums.begin(), nums.end());|Construct a min-heap from a vector.|從 vector 構建最小堆積。]]
    [[mod|int minVal = pq.top(); pq.pop();|Access and remove the smallest element.|存取並移除最小元素。]]
    [[mod|pq.push(x);|Insert element - O(log N) time.|插入元素 - 需時 O(log N)。]]
}`,
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
      coreLogicCpp: `priority_queue<int, vector<int>, greater<int>> pq;
for (int n : nums) {
    pq.push(n);
    if (pq.size() > k) pq.pop();
}
return pq.top();`,
      adaptationLogic: `Min-heap of size K`,
      explanation: "Keep a min-heap of size K. The smallest element in the heap will be the Kth largest element found so far.",
      fullCode: `def find_kth_largest(nums, k):
    [[core|pq = []|Min-heap to store the K largest elements seen.|用於儲存目前所見 K 個最大元素的最小堆積。]]
    for n in nums:
        heapq.heappush(pq, n)
        [[mod|if len(pq) > k: heapq.heappop(pq)|Maintain size K.|維持大小為 K。]]
    return pq[0]`,
      fullCodeCpp: `int findKthLargest(vector<int>& nums, int k) {
    [[core|priority_queue<int, vector<int>, greater<int>> pq;|C++ priority_queue is a max-heap by default.|C++ 的 priority_queue 預設為最大堆積。]]
    for (int n : nums) {
        pq.push(n);
        [[mod|if (pq.size() > k) pq.pop();|Eject the smallest if size exceeds K.|若大小超過 K，則彈出最小值。]]
    }
    return pq.top();
}`
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
      coreLogicCpp: `auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
for (auto l : lists) if (l) pq.push(l);`,
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
    return dummy.next`,
      fullCodeCpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    [[core|priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);|Custom comparator for min-heap of nodes.|用於節點最小堆積的自定義比較器。]]
    
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy(0); ListNode* curr = &dummy;
    
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        curr->next = node; curr = curr->next;
        [[mod|if (node->next) pq.push(node->next);|Push successor if exists.|若存在後繼節點則將其壓入。]]
    }
    return dummy.next;
}`
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
      coreLogicCpp: `unordered_map<int, int> count;
for (int n : nums) count[n]++;
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;`,
      adaptationLogic: `Heap of (frequency, value) pairs`,
      explanation: "Calculate frequencies using a hashmap, then use a min-heap of size K to keep the elements with the highest frequencies.",
      fullCode: `def top_k_frequent(nums, k):
    count = collections.Counter(nums)
    [[core|pq = []|Heap stores (frequency, value).|堆積儲存 (頻率, 數值)。]]
    for val, freq in count.items():
        heapq.heappush(pq, (freq, val))
        if len(pq) > k: heapq.heappop(pq)
        
    return [val for freq, val in pq]`,
      fullCodeCpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;
    
    [[core|priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;|Heap of pairs {frequency, value}.|{頻率, 數值} 的配對堆積。]]
    for (auto& [val, freq] : count) {
        pq.push({freq, val});
        if (pq.size() > k) pq.pop();
    }
    
    vector<int> res;
    while (!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }
    return res;
}`
    }
  ]
};
