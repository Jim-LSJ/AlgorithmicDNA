import { AlgorithmPattern } from "../../../types";

export const linkedListMergeSort: AlgorithmPattern = {
  id: "ll-merge-sort",
  name: "LinkedList Merge & Sort",
  category: "Linked List",
  description: "Advanced manipulation like merging sorted lists or sorting a list using Merge Sort.",
  imageUrl: "/patterns/linked-list.png",
  complexity: {
    time: "O(n log n)",
    space: "O(log n) for recursion stack",
  },
  coreTemplate: `def merge_two_lists(l1, l2):
    [[core|dummy = ListNode(0)|Dummy node is essential for building a new list.|虛擬節點對於構建新鏈表至關重要。]]
    curr = dummy
    while l1 and l2:
        if l1.val < l2.val:
            curr.next = l1; l1 = l1.next
        else:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    [[mod|curr.next = l1 if l1 else l2|Attach the remaining nodes.|連接剩餘的節點。]]
    return dummy.next`,
  coreTemplateCpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    [[core|ListNode dummy(0); ListNode* curr = &dummy;|Local dummy node on stack is more efficient.|棧上的局部虛擬節點更有效率。]]
    while (l1 && l2) {
        if (l1->val < l2->val) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    [[mod|curr->next = l1 ? l1 : l2;|Directly attach the tail.|直接連接尾部。]]
    return dummy.next;
}`,
  variations: [
    {
      id: "sort-list",
      title: "Sort List (Merge Sort)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sort-list/",
      description: "Sort a linked list in O(n log n) time using a constant space complexity variant of merge sort.",
      coreLogic: `mid = find_mid(head)
left = sort_list(head)
right = sort_list(mid)
return merge(left, right)`,
      coreLogicCpp: `ListNode* mid = getMid(head);
ListNode* left = sortList(head);
ListNode* right = sortList(mid);
return merge(left, right);`,
      adaptationLogic: `Recursion + merge`,
      explanation: "Classic divide and conquer. Use slow/fast pointers to find the middle, split the list, sort halves, and merge.",
      fullCode: `def sort_list(head):
    if not head or not head.next: return head
    [[core|# Step 1: Find mid|步驟 1：尋找中點]]
    slow, fast = head, head.next
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    mid = slow.next; slow.next = None # Split
    
    [[mod|# Step 2: Sort halves|步驟 2：對兩半進行排序]]
    left = sort_list(head)
    right = sort_list(mid)
    
    [[mod|# Step 3: Merge|步驟 3：合併]]
    return merge(left, right)`,
      fullCodeCpp: `ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;
    [[core|ListNode *slow = head, *fast = head->next;|Find midpoint to split.|尋找中點進行拆分。]]
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* mid = slow->next; slow->next = nullptr;
    
    [[mod|ListNode* left = sortList(head);|Recursive sort left.|遞迴排序左側。]]
    [[mod|ListNode* right = sortList(mid);|Recursive sort right.|遞迴排序右側。]]
    return merge(left, right);
}`
    }
  ]
};
