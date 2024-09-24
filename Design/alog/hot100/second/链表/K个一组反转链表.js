/**
 * 核心思路是递归分组
 * 难点在理解递归分组反转之后的连接过程
 * 想象指针在这个过程中指向的调整
 *
 * k个一组旋转和整体旋转的区别
 * 1 -> 2 -> 3 -> 4 -> 5
 * 2个一组：2 -> 1 -> 4 -> 3 -> 5
 * 不分组 : 5 -> 4 -> 3 -> 2 -> 1
 *  */
var reverseKGroup = function (head, k) {
  if (head === null || k === 1) {
    return head;
  }

  let cnt = 0;
  let dummy = head;
  while (dummy && cnt < k) {
    dummy = dummy.next;
    cnt++;
  }

  if (cnt === k) {
    let nextHead = reverseKGroup(dummy, k);
    let prev = nextHead;
    let cur = head;

    while (cnt > 0) {
      let next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;

      cnt--;
    }

    head = prev;
  }

  return head;
};
