import { AlgorithmPattern } from "../../../types";

export const linkedListBasic: AlgorithmPattern = {
  id: "ll-basic",
  name: "LinkedList Traverse & Dummy Node",
  category: "Linked List",
  description: "Basic manipulation and the powerful 'Dummy Node' technique for handling edge cases like head removal.",
  imageUrl: "/patterns/linked-list.png",
  complexity: {
    time: "O(n)",
    space: "O(1) extra space",
  },
  coreTemplate: `def delete_node(head, val):
    [[core|dummy = ListNode(0, head)|Create a dummy node pointing to the head.|創建一個指向頭部的虛擬節點。]]
    [[core|curr = dummy|Start traversal from the dummy node.|從虛擬節點開始遍歷。]]
    while curr.next:
        [[mod|if curr.next.val == val:|If next node matches target, skip it.|如果下一個節點匹配目標，則跳過。]]
            curr.next = curr.next.next
        else:
            curr = curr.next
    return dummy.next`,
  coreTemplateCpp: `ListNode* deleteNode(ListNode* head, int val) {
    [[core|ListNode* dummy = new ListNode(0, head);|Dummy node handles head deletion cases.|虛擬節點處理頭部刪除的情況。]]
    ListNode* curr = dummy;
    while (curr->next) {
        [[mod|if (curr->next->val == val)|Target matched.|符合目標。]]
            curr->next = curr->next->next;
        else
            curr = curr->next;
    }
    return dummy->next;
}`,
  variations: []
};
