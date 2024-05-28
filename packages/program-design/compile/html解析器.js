// 节点类型
const NodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
};

// 简单的节点构造器
class Node {
  constructor(type, tagName = "", textContent = "") {
    this.type = type;
    this.tagName = tagName;
    this.textContent = textContent;
    this.children = [];
  }
}

// 词法分析器
function tokenize(html) {
  const tokens = [];
  const tagRegex = /<\/?[a-z]+>/i;
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const index = match.index;
    const text = html.slice(lastIndex, index).trim();
    if (text) {
      tokens.push({ type: "Text", content: text });
    }
    tokens.push({ type: "Tag", content: match[0] });
    lastIndex = index + match[0].length;
  }

  // 处理剩余的文本
  const remainingText = html.slice(lastIndex).trim();
  if (remainingText) {
    tokens.push({ type: "Text", content: remainingText });
  }

  return tokens;
}

// 解析器
function parse(tokens) {
  const root = new Node(NodeType.ELEMENT_NODE, "root");
  const stack = [root];

  for (const token of tokens) {
    const currentNode = stack[stack.length - 1];

    if (token.type === "Tag") {
      if (token.content.startsWith("</")) {
        // 结束标签，弹出节点
        stack.pop();
      } else {
        // 开始标签，创建新节点并入栈
        const tagName = token.content.replace(/<\/?([a-z]+)>/i, "$1");
        const newNode = new Node(NodeType.ELEMENT_NODE, tagName);
        currentNode.children.push(newNode);
        stack.push(newNode);
      }
    } else if (token.type === "Text") {
      // 文本节点，创建并添加到当前节点
      const textNode = new Node(NodeType.TEXT_NODE, "", token.content);
      currentNode.children.push(textNode);
    }
  }

  return root;
}

// HTML 解析器
function parseHTML(html) {
  const tokens = tokenize(html);
  const dom = parse(tokens);
  return dom;
}

// 使用示例
const html = "<div>Hello <span>world</span>!</div>";
const dom = parseHTML(html);
console.log(dom);
