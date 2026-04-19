import { AlgorithmPattern } from "../../../types";

export const cycleDetection: AlgorithmPattern = {
  id: "cycle-detection",
  name: "Hare and Tortoise (Cycle Detection)",
  category: "Linked List",
  description: "Detecting cycles in a linked list and finding the cycle entrance point.",
  imageUrl: "/patterns/sorting.png",
  complexity: {
    time: "O(n)",
    space: "O(1)",
  },
  coreTemplate: `def has_cycle(head):
    [[core|slow, fast = head, head|Two pointers start at the same position.|雙指標從同等位置開始。]]
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        [[core|if slow == fast: return True|If they meet, there is a cycle.|如果相遇，則存在環。]]
    return False`,
  variations: [
    {
      id: "find-cycle-start",
      title: "LinkedList Cycle II (Entrance)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
      description: "Find the entry point of a loop in a linked list.",
      coreLogic: `while fast and fast.next:
    ...
    if slow == fast:
        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next`,
      adaptationLogic: `return slow`,
      explanation: "Floyd's Cycle Finding Algorithm logic: the distance from head to entrance equals distance from meeting point to entrance.",
      fullCode: `def detect_cycle(head):
    [[core|slow = fast = head|Initial phase to detect collision.|偵測碰撞的第一階段。]]
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast:
            [[new|slow = head|Phase 2: move one pointer back to head.|第二階段：將其中一個指標移回頭部。]]
            while slow != fast:
                [[mod|slow = slow.next|Move both at same speed to meet at entrance.|兩者同速移動，將在入口處相遇。]]
                [[mod|fast = fast.next|Move both at same speed to meet at entrance.|兩者同速移動，將在入口處相遇。]]
            return slow
    return None`
    }
  ]
};
