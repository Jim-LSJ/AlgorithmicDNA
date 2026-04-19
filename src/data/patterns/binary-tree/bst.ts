import { AlgorithmPattern } from "../../../types";

export const bstPattern: AlgorithmPattern = {
  id: "bst-ops",
  name: "Binary Search Tree Operations",
  category: "Binary Tree",
  description: "Operations on trees that maintain the property where every node's left child is smaller and right child is larger.",
  imageUrl: "/patterns/binary-tree.png",
  complexity: {
    time: "O(h) where h is height (O(log n) for balanced trees)",
    space: "O(h) for recursion stack",
  },
  coreTemplate: `def search_bst(root, val):
    if not root or root.val == val: return root
    [[mod|if val < root.val: return search_bst(root.left, val)|Search left if smaller.|若較小則搜尋左側。]]
    else: return search_bst(root.right, val) # Search right if larger`,
  coreTemplateCpp: `TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    [[mod|if (val < root->val) return searchBST(root->left, val);|Recurse left for smaller values.|對較小值遞迴搜尋左側。]]
    else return searchBST(root->right, val);
}`,
  variations: [
    {
      id: "insert-into-bst",
      title: "Insert into a Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      description: "Insert a new value into a BST while maintaining its property.",
      coreLogic: `if val < root.val: root.left = insert(root.left, val)
else: root.right = insert(root.right, val)
return root`,
      coreLogicCpp: `if (val < root->val) root->left = insertIntoBST(root->left, val);
else root->right = insertIntoBST(root->right, val);
return root;`,
      adaptationLogic: `Recursive insertion`,
      explanation: "Navigate down the tree in O(H) time and attach the new node at the first available leaf position that satisfies the BST property.",
      fullCode: `def insert_into_bst(root, val):
    if not root: return TreeNode(val)
    [[mod|if val < root.val: root.left = insert_into_bst(root.left, val)|Go left.|往左走。]]
    else: root.right = insert_into_bst(root.right, val)
    return root`,
      fullCodeCpp: `TreeNode* insertIntoBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    [[mod|if (val < root->val)|Decide which branch to follow.|決定跟隨哪個分支。]]
        root->left = insertIntoBST(root->left, val);
    else
        root->right = insertIntoBST(root->right, val);
    return root;
}`
    },
    {
      id: "delete-node-in-bst",
      title: "Delete Node in a BST",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
      description: "Remove a node from a BST and maintain its order.",
      coreLogic: `if not left: return right
if not right: return left
successor = find_min(right)
root.val = successor.val
root.right = delete(right, successor.val)`,
      coreLogicCpp: `if (!root->left) return root->right;
if (!root->right) return root->left;
TreeNode* temp = getMin(root->right);
root->val = temp->val;
root->right = deleteNode(root->right, temp->val);`,
      adaptationLogic: `Handling three deletion cases`,
      explanation: "Three cases: leaf (easy), one child (link child to parent), two children (replace with successor or predecessor).",
      fullCode: `def delete_node(root, key):
    if not root: return None
    if key < root.val: root.left = delete_node(root.left, key)
    elif key > root.val: root.right = delete_node(root.right, key)
    else:
        [[mod|if not root.left: return root.right|Case 1 & 2: 0 or 1 child.|情況 1 & 2：無或僅有一個子節點。]]
        if not root.right: return root.left
        [[mod|# Case 3: 2 children - find successor|情況 3：兩個子節點 - 尋找繼承者。]]
        successor = root.right
        while successor.left: successor = successor.left
        root.val = successor.val
        root.right = delete_node(root.right, root.val)
    return root`,
      fullCodeCpp: `TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return nullptr;
    if (key < root->val) root->left = deleteNode(root->left, key);
    else if (key > root->val) root->right = deleteNode(root->right, key);
    else {
        [[mod|if (!root->left) return root->right;|Handle nodes with < 2 children.|處理少於 2 個子節點的節點。]]
        if (!root->right) return root->left;
        [[mod|TreeNode* successor = root->right;|Replace with in-order successor.|使用中序繼承者替換。]]
        while (successor->left) successor = successor->left;
        root->val = successor->val;
        root->right = deleteNode(root->right, root->val);
    }
    return root;
}`
    },
    {
      id: "convert-sorted-array-to-bst",
      title: "Convert Sorted Array to Binary Search Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
      description: "Build a height-balanced BST from an ascending sorted array.",
      coreLogic: `mid = (L + R) // 2
root = Node(nums[mid])
root.left = build(L, mid-1)
root.right = build(mid+1, R)`,
      coreLogicCpp: `int mid = L + (R - L) / 2;
TreeNode* root = new TreeNode(nums[mid]);
root->left = solve(nums, L, mid - 1);
root->right = solve(nums, mid + 1, R);`,
      adaptationLogic: `Binary search style recursion`,
      explanation: "Always pick the middle element of the current range as the root to ensure balance, then recursively build left and right subtrees.",
      fullCode: `def sorted_array_to_bst(nums):
    def build(l, r):
        if l > r: return None
        [[mod|mid = (l + r) // 2|Pick middle to ensure balanced tree.|選取中點以確保平衡樹。]]
        root = TreeNode(nums[mid])
        root.left = build(l, mid - 1)
        root.right = build(mid + 1, r)
        return root
    return build(0, len(nums) - 1)`,
      fullCodeCpp: `TreeNode* sortedArrayToBST(vector<int>& nums) {
    return build(nums, 0, nums.size() - 1);
}
TreeNode* build(vector<int>& nums, int l, int r) {
    if (l > r) return nullptr;
    [[mod|int mid = l + (r - l) / 2;|Calculate mid point safely.|安全地計算中點。]]
    TreeNode* root = new TreeNode(nums[mid]);
    root->left = build(nums, l, mid - 1);
    root->right = build(nums, mid + 1, r);
    return root;
}`
    }
  ]
};
