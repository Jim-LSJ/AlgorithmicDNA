import { AlgorithmPattern } from "../../../types";

export const linkedListMergeSort: AlgorithmPattern = {
  id: "ll-merge-sort",
  name: "LinkedList Merge & Sort",
  category: "Linked List",
  description: "Advanced manipulation like merging sorted lists or sorting a list using Merge Sort.",
  imageUrl: "/patterns/sorting.png",
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
  variations: []
};
