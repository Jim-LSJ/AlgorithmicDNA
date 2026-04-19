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
  coreTemplateCpp: `class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        [[mod|l.splice(l.end(), l, m[key]);|Move to end (most recent).|將元素移至末尾（最近使用）。]]
        return m[key]->second;
    }
    void put(int key, int value) {
        if (get(key) != -1) { m[key]->second = value; return; }
        [[mod|if (l.size() == cap) { m.erase(l.front().first); l.pop_front(); }|Evict LRU (front).|移除最久未使用者（前端）。]]
        l.push_back({key, value});
        m[key] = prev(l.end());
    }
};`,
  variations: [
    {
      id: "lfu-cache",
      title: "LFU Cache (Least Frequently Used)",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/lfu-cache/",
      description: "Design a cache that evicts the least frequently used element.",
      coreLogic: `freq_map[count].pop(key)
freq_map[count+1].push(key)`,
      coreLogicCpp: `keyToVal[key] = {val, freq + 1};
freqToList[freq].erase(keyIter[key]);
freqToList[freq + 1].push_back(key);`,
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
        self.freq_map[freq + 1][key] = None`,
      fullCodeCpp: `class LFUCache {
    int minFreq, cap;
    unordered_map<int, pair<int, int>> keyVal; // key -> {val, freq}
    unordered_map<int, list<int>> freqList; // freq -> list of keys
    unordered_map<int, list<int>::iterator> keyIter; // key -> iterator

    void updateFreq(int key) {
        int freq = keyVal[key].second;
        freqList[freq].erase(keyIter[key]);
        if (freqList[freq].empty() && freq == minFreq) minFreq++;
        keyVal[key].second++;
        freqList[freq + 1].push_back(key);
        keyIter[key] = --freqList[freq + 1].end();
    }
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    int get(int key) {
        if (keyVal.find(key) == keyVal.end()) return -1;
        updateFreq(key);
        return keyVal[key].first;
    }
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) { keyVal[key].first = value; return; }
        if (keyVal.size() >= cap) {
            int k = freqList[minFreq].front();
            [[mod|keyVal.erase(k); keyIter.erase(k); freqList[minFreq].pop_front();|Evict LFU.|移除最少使用（LFU）項。]]
        }
        keyVal[key] = {value, 1};
        freqList[1].push_back(key);
        keyIter[key] = --freqList[1].end();
        minFreq = 1;
    }
};`
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
      coreLogicCpp: `history.resize(curr + 1);
history.push_back(url);
curr++;`,
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
        return self.history[self.curr]`,
      fullCodeCpp: `class BrowserHistory {
    vector<string> history;
    int curr;
public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        curr = 0;
    }
    void visit(string url) {
        [[mod|history.resize(curr + 1);|Discard forward history.|捨棄前進歷史紀錄。]]
        history.push_back(url);
        curr++;
    }
    string back(int steps) {
        curr = max(0, curr - steps);
        return history[curr];
    }
    string forward(int steps) {
        curr = min((int)history.size() - 1, curr + steps);
        return history[curr];
    }
};`
    },
    {
      id: "all-o-one-data-structure",
      title: "All O`one Data Structure",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/all-oone-data-structure/",
      description: "Design a data structure which supports O(1) ops for inc/dec key count and getting max/min key.",
      coreLogic: `move_key(prev_node, next_node)
remove_empty_nodes()`,
      coreLogicCpp: `if (countMap[key] == 1) { // create or find node with count 1 }
else { // move key to node with count + 1 }`,
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
