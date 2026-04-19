// Binary Search
import { standardBinarySearch } from './binary-search/standard';
import { lowerUpperBound } from './binary-search/lower-upper-bound';
import { rotatedArrayBS } from './binary-search/rotated-array';
import { binarySearchSolutionSpace } from './binary-search/solution-space';

// Interval
import { mergeIntervals } from './interval/merge';
import { maxNonOverlappingIntervals } from './interval/max-non-overlapping';
import { maxOverlapIntervals } from './interval/max-overlap';
import { intervalCoverage } from './interval/min-cover';

// Sliding Window
import { fixedSlidingWindow } from './sliding-window/fixed';
import { variableSlidingWindow } from './sliding-window/variable';

// DP
import { lcsPattern } from './dp/lcs';
import { lisPattern } from './dp/lis';
import { stateMachineStocks } from './dp/state-machine';
import { knapsack01 } from './dp/knapsack-01';
import { bitmaskDP } from './dp/bitmask';
import { treeDP } from './dp/tree-dp';
import { coinChange } from './dp/coin-change';
import { digitDP } from './dp/digit-dp';

// Graph
import { bfsPattern } from './graph/bfs';
import { dfsPattern } from './graph/dfs';
import { unionFind } from './graph/union-find';
import { topologicalSort } from './graph/topological-sort';
import { dijkstra } from './graph/dijkstra';
import { mstPattern } from './graph/mst';
import { bellmanFord } from './graph/bellman-ford';

// Binary Tree
import { treeTraversal } from './binary-tree/traversal';
import { treeConstruction } from './binary-tree/construction';
import { lcaPattern } from './binary-tree/lca';
import { pathSum } from './binary-tree/path-sum';
import { bstPattern } from './binary-tree/bst';

// Linked List
import { linkedListBasic } from './linked-list/basic';
import { linkedListReverse } from './linked-list/reverse';
import { linkedListMergeSort } from './linked-list/merge-sort';
import { slowFastPointers } from './linked-list/slow-fast-pointers';
import { cycleDetection } from './linked-list/cycle-detection';

// Backtracking
import { permutations } from './backtracking/permutations';
import { combinations } from './backtracking/combinations';
import { subsets } from './backtracking/subsets';
import { gridBacktracking } from './backtracking/grid';

// Greedy
import { greedyPattern } from './greedy/basic';

// Monotonic Stack
import { nextGreaterElement } from './monotonic-stack/next-greater';
import { slidingWindowMax } from './monotonic-stack/sliding-window-max';

// Prefix Sum
import { prefixSum1D } from './prefix-sum/prefix-sum-1d';
import { differenceArray } from './prefix-sum/difference-array';

// Advanced Structures
import { triePattern } from './trie/basic';
import { designCache } from './design/lru-cache';
import { segmentTree } from './segment-tree/basic';
import { minHeapPattern } from './heap/basic';
import { hashmapBasic } from './hashmap/basic';

// Sorting & Math
import { quickSelect } from './sorting/quick-select';
import { mathGeneral } from './math/general';
import { divideConquerBasic } from './divide-and-conquer/basic';

export const allPatterns = [
  // Binary Search
  standardBinarySearch,
  lowerUpperBound,
  rotatedArrayBS,
  binarySearchSolutionSpace,
  
  // Interval
  mergeIntervals,
  maxNonOverlappingIntervals,
  maxOverlapIntervals,
  intervalCoverage,
  
  // Sliding Window
  fixedSlidingWindow,
  variableSlidingWindow,
  
  // DP
  lisPattern,
  lcsPattern,
  stateMachineStocks,
  knapsack01,
  bitmaskDP,
  treeDP,
  coinChange,
  digitDP,
  
  // Graph
  bfsPattern,
  dfsPattern,
  unionFind,
  topologicalSort,
  dijkstra,
  mstPattern,
  bellmanFord,
  
  // Binary Tree
  treeTraversal,
  treeConstruction,
  lcaPattern,
  pathSum,
  bstPattern,
  
  // Linked List
  linkedListBasic,
  linkedListReverse,
  linkedListMergeSort,
  slowFastPointers,
  cycleDetection,
  
  // Backtracking
  permutations,
  combinations,
  subsets,
  gridBacktracking,
  
  // Greedy
  greedyPattern,
  
  // Monotonic Stack
  nextGreaterElement,
  slidingWindowMax,
  
  // Prefix Sum
  prefixSum1D,
  differenceArray,
  
  // Advanced Structures
  triePattern,
  designCache,
  segmentTree,
  minHeapPattern,
  hashmapBasic,
  
  // Sorting & Math
  quickSelect,
  mathGeneral,
  divideConquerBasic,
];

export function getPatternById(id: string) {
  return allPatterns.find(p => p.id === id);
}
