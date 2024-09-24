/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  const m = new Map();

  let cur = head;
  while (cur) {
    m.set(cur, new _Node(cur.val));
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    const cloned = m.get(cur);
    cloned.next = m.get(cur.next);
    cloned.random = m.get(cur.random);
    cur = cur.next;
  }

  return m.get(head) ?? null;
};
