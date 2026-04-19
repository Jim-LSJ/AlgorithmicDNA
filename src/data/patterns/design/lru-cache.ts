import { AlgorithmPattern } from "../../../types";

export const designCache: AlgorithmPattern = {
  id: "lru-cache",
  name: "LRU Cache",
  category: "Design & Cache",
  description: "Design a Least Recently Used (LRU) cache that supports get and put operations in O(1).",
  imageUrl: "/patterns/design.png",
  complexity: {
    time: "O(1) for both get and put",
    space: "O(capacity)",
  },
  coreTemplate: `class LRUCache:
    def __init__(self, capacity):
        [[core|self.cache = OrderedDict()|In Python, OrderedDict can be used for LRU logic.|在 Python 中，可以使用 OrderedDict 實現 LRU 邏輯。]]
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache: return -1
        [[mod|self.cache.move_to_end(key)|Mark as recently used.|標記為最近使用。]]
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        [[mod|if len(self.cache) > self.capacity: self.cache.popitem(last=False)|Evict the least recently used item.|移除最久未使用的項目。]]`,
  variations: [
    {
      id: "lfu-cache",
      title: "LFU Cache (Least Frequently Used)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/lfu-cache/",
      description: "Design a cache that evicts the least frequently used element.",
      coreLogic: `freq_map[count].pop(key)
freq_map[count+1].push(key)`,
      adaptationLogic: `min_freq variable`,
      explanation: "Requires two hashmaps: one for key-value (and frequency) and another frequency-to-OrderedDict to maintain access order within frequencies.",
      fullCode: `class LFUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.min_freq = 0
        self.key_data = {} # key -> (val, freq)
        self.freq_map = collections.defaultdict(OrderedDict) # freq -> OrderedDict

    def get(self, key):
        if key not in self.key_data: return -1
        val, freq = self.key_data[key]
        [[mod|self._update(key, val, freq)|Promotion logic.|晉升邏輯。]]
        return val

    def _update(self, key, val, freq):
        self.freq_map[freq].pop(key)
        if not self.freq_map[freq] and freq == self.min_freq: self.min_freq += 1
        self.key_data[key] = (val, freq + 1)
        self.freq_map[freq + 1][key] = None`
    },
    {
      id: "design-browser-history",
      title: "Design Browser History",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/design-browser-history/",
      description: "Implement a browser history with visit, back, and forward operations.",
      coreLogic: `self.history = self.history[:self.curr + 1]
self.history.append(url)
self.curr += 1`,
      adaptationLogic: `Dynamic array or doubly linked list`,
      explanation: "Maintain a stack/dynamic array of URLs and a pointer to tracks the current position in the history.",
      fullCode: `class BrowserHistory:
    def __init__(self, homepage):
        [[core|self.history = [homepage]|History stack.|歷史記錄棧。]]
        self.curr = 0

    def visit(self, url):
        [[mod|self.history = self.history[:self.curr + 1]|Clear forward history.|清除前進歷史。]]
        self.history.append(url)
        self.curr += 1

    def back(self, steps):
        self.curr = max(0, self.curr - steps)
        return self.history[self.curr]

    def forward(self, steps):
        self.curr = min(len(self.history) - 1, self.curr + steps)
        return self.history[self.curr]`
    },
    {
      id: "all-o-one-data-structure",
      title: "All O`one Data Structure",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/all-oone-data-structure/",
      description: "Design a data structure which supports O(1) ops for inc/dec key count and getting max/min key.",
      coreLogic: `move_key(prev_node, next_node)
remove_empty_nodes()`,
      adaptationLogic: `Doubly linked list of HashSets`,
      explanation: "Combined usage of a HashMap for O(1) lookup and a Doubly Linked List of Sets to keep track of frequencies in sorted order.",
      fullCode: `class AllOne:
    def __init__(self):
        self.root = Node() # Doubly linked list node with count and set of keys
        self.map = {} # key -> node pointer

    def inc(self, key):
        [[mod|# Logic to move key to node with count+1|將 Key 移至計數為 count+1 的節點的邏輯。]]
        pass

    def get_max_key(self):
        return "" if self.root.prev == self.root else next(iter(self.root.prev.keys))`
    }
  ]
};
