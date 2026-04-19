import { AlgorithmPattern } from "../../../types";

export const slowFastPointers: AlgorithmPattern = {
  id: "slow-fast-pointers",
  name: "Slow and Fast Pointers",
  category: "Linked List",
  description: "Technique involving two pointers moving at different speeds to solve linear data structure problems.",
  imageUrl: "/patterns/linked-list.png",
  complexity: {
    time: "O(n)",
    space: "O(1)",
  },
  coreTemplate: `def find_middle(head):
    [[core|slow, fast = head, head|Initialize both pointers at the head.|將雙指標都初始化在頭部。]]
    while fast and fast.next:
        [[mod|slow = slow.next|Move slow pointer one step.|慢指標走一步。]]
        [[mod|fast = fast.next.next|Move fast pointer two steps.|快指標走兩步。]]
    return slow`,
  coreTemplateCpp: `ListNode* findMiddle(ListNode* head) {
    [[core|ListNode *slow = head, *fast = head;|Pointers start at the same origin.|雙指標從同等起點開始。]]
    while (fast && fast->next) {
        [[mod|slow = slow->next; fast = fast->next->next;|Fast moves twice as fast as slow.|快指標的速度是慢指標的兩倍。]]
    }
    return slow;
}`,
  variations: [
    {
      id: "remove-kth-from-end",
      title: "Remove Nth Node From End",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      description: "Remove the K-th node from the end of a linked list in one pass.",
      coreLogic: `first = dummy; second = dummy
for _ in range(n + 1): first = first.next
while first:
    first = first.next; second = second.next`,
      coreLogicCpp: `for (int i = 0; i <= n; i++) fast = fast->next;
while (fast) { fast = fast->next; slow = slow->next; }
slow->next = slow->next->next;`,
      adaptationLogic: `second.next = second.next.next`,
      explanation: "Uses a fixed gap between two pointers to locate the node to be removed.",
      fullCode: `def remove_nth_from_end(head, n):
    [[core|dummy = ListNode(0, head)|Use dummy to handle removal of head.|使用虛擬節點以便處理刪除頭部的情況。]]
    left = dummy
    right = head
    [[new|for _ in range(n): right = right.next|Advance right pointer N steps.|將右指標先移動 N 步。]]
    
    while right:
        [[mod|left = left.next|Maintain N nodes gap.|維持 N 個節點的間距。]]
        [[mod|right = right.next|Maintain N nodes gap.|維持 N 個節點的間距。]]
        
    left.next = left.next.next
    return dummy.next`,
      fullCodeCpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    [[core|ListNode* dummy = new ListNode(0, head);|Dummy node is necessary for edge cases.|虛擬節點對於邊界情況是必要的。]]
    ListNode *left = dummy, *right = head;
    [[new|while (n--) right = right->next;|Advance right pointer by N nodes.|將右指標提前 N 個節點。]]
    
    while (right) {
        left = left->next;
        right = right->next;
    }
    [[mod|left->next = left->next->next;|Skip the target node.|跳過目標節點。]]
    return dummy->next;
}`
    }
  ]
};
