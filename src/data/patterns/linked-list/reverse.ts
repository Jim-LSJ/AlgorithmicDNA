import { AlgorithmPattern } from "../../../types";

export const linkedListReverse: AlgorithmPattern = {
  id: "ll-reverse",
  name: "LinkedList Reversal",
  category: "Linked List",
  description: "Reverse whole or partial sections of a linked list.",
  imageUrl: "/patterns/linked-list.png",
  complexity: {
    time: "O(n)",
    space: "O(1)",
  },
  coreTemplate: `def reverse(head):
    [[core|prev = None|Previous node starts as None.|前一個節點初始為空。]]
    curr = head
    while curr:
        [[mod|nxt = curr.next|Save the next node first.|先保存下一個節點。]]
        [[mod|curr.next = prev|Reverse the pointer.|反轉指標。]]
        [[mod|prev = curr|Move forward.|步進。]]
        [[mod|curr = nxt|Move forward.|步進。]]
    return prev`,
  coreTemplateCpp: `ListNode* reverseList(ListNode* head) {
    [[core|ListNode *prev = nullptr, *curr = head;|Initialize prev as null.|將 prev 初始為空。]]
    while (curr) {
        [[mod|ListNode* nxt = curr->next;|Store successor.|存儲後繼節點。]]
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}`,
  variations: [
    {
      id: "reverse-between",
      title: "Reverse Linked List II (Range)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/",
      description: "Reverse a linked list from position 'left' to position 'right'.",
      coreLogic: `pre = dummy
for _ in range(left - 1): pre = pre.next
curr = pre.next
for _ in range(right - left):
    nxt = curr.next
    curr.next = nxt.next
    nxt.next = pre.next
    pre.next = nxt`,
      coreLogicCpp: `for (int i = 0; i < left - 1; i++) pre = pre->next;
ListNode* curr = pre->next;
for (int i = 0; i < right - left; i++) {
    ListNode* nxt = curr->next;
    curr->next = nxt->next;
    nxt->next = pre->next;
    pre->next = nxt;
}`,
      adaptationLogic: `dummy = ListNode(0, head)`,
      explanation: "Iteratively moves the next node of 'curr' to the position after 'pre', effectively reversing the segment one node at a time.",
      fullCode: `def reverse_between(head, left, right):
    [[core|dummy = ListNode(0, head)|Standard dummy node usage.|標準虛擬節點應用。]]
    pre = dummy
    for _ in range(left - 1): pre = pre.next
    
    [[core|curr = pre.next|Start of the section to be reversed.|待反轉段的起始位置。]]
    for _ in range(right - left):
        [[mod|nxt = curr.next|Node that will be moved forward.|即將被往前移動的節點。]]
        curr.next = nxt.next
        nxt.next = pre.next
        pre.next = nxt
        
    return dummy.next`,
      fullCodeCpp: `ListNode* reverseBetween(ListNode* head, int left, int right) {
    [[core|ListNode* dummy = new ListNode(0, head);|Use dummy for easier head processing.|使用虛擬節點簡化首節點處理。]]
    ListNode* pre = dummy;
    for (int i = 0; i < left - 1; i++) pre = pre->next;
    
    ListNode* curr = pre->next;
    for (int i = 0; i < right - left; i++) {
        [[mod|ListNode* nxt = curr->next;|Extract node to move forward.|提取要往前移動的節點。]]
        curr->next = nxt->next;
        nxt->next = pre->next;
        pre->next = nxt;
    }
    return dummy->next;
}`
    },
    {
      id: "reverse-k-group",
      title: "Reverse Nodes in K-Group",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      description: "Reverse nodes in groups of size K.",
      coreLogic: `while count < k: ptr = ptr.next
if count == k:
    new_head = reverse(head, k)
    head.next = reverse_k_group(ptr, k)`,
      coreLogicCpp: `if (count == k) {
    ListNode* newHead = reverse(head, k);
    head->next = reverseKGroup(curr, k);
    return newHead;
}`,
      adaptationLogic: `recursion`,
      explanation: "Modular reversal: check if K nodes exist, reverse them, then recursively process the remaining list.",
      fullCode: `def reverse_k_group(head, k):
    curr = head; count = 0
    while curr and count < k:
        curr = curr.next; count += 1
    
    [[core|if count == k:|If we have at least K nodes, proceed to reverse.|如果至少有 K 個節點，則進行反轉。]]
        [[mod|new_head = reverse_n(head, k)|Subroutine to reverse K nodes.|反轉 K 個節點的子程序。]]
        head.next = reverse_k_group(curr, k)
        return new_head
    return head`,
      fullCodeCpp: `ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* curr = head;
    int count = 0;
    while (curr && count < k) { curr = curr->next; count++; }
    [[core|if (count == k) {|Only reverse if K nodes are available.|只有在有 K 個節點時才反轉。]]
        ListNode* newHead = reverse(head, k); // Reverse sub-routine
        head->next = reverseKGroup(curr, k);
        return newHead;
    }
    return head;
}`
    },
    {
      id: "palindrome-linked-list",
      title: "Palindrome Linked List",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
      description: "Check if a linked list is a palindrome.",
      coreLogic: `find_mid(head)
second_half = reverse(mid)
compare(first_half, second_half)`,
      coreLogicCpp: `ListNode *slow = head, *fast = head;
while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
ListNode* rev = reverseList(slow);`,
      adaptationLogic: ``,
      explanation: "Find the middle using slow/fast pointers, reverse the second half, and compare values with the first half.",
      fullCode: `def is_palindrome(head):
    [[core|slow, fast = head, head|Step 1: find middle.|步驟 1：尋找中點。]]
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    
    [[mod|prev = None|Step 2: reverse second half.|步驟 2：反轉後半部。]]
    while slow:
        nxt = slow.next; slow.next = prev; prev = slow; slow = nxt
        
    [[mod|p1, p2 = head, prev|Step 3: compare both halves.|步驟 3：比較前半部與後半部。]]
    while p2:
        if p1.val != p2.val: return False
        p1, p2 = p1.next, p2.next
    return True`,
      fullCodeCpp: `bool isPalindrome(ListNode* head) {
    [[core|ListNode *slow = head, *fast = head;|Find mid point first.|首先尋找中點。]]
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    
    [[mod|ListNode *prev = nullptr, *curr = slow;|Reverse the second half.|反轉後半部。]]
    while (curr) { ListNode* nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }
    
    [[mod|ListNode *p1 = head, *p2 = prev;|Compare first and second half values.|比較前半部與後半部的值。]]
    while (p2) {
        if (p1->val != p2->val) return false;
        p1 = p1->next; p2 = p2->next;
    }
    return true;
}`
    }
  ]
};
