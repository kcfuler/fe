/**
 * Vue风格的HTML模板编译器
 *
 * 此模块提供将HTML模板字符串编译成渲染函数的功能，
 * 支持文本插值、属性绑定和事件处理等特性。
 */

import { h } from "./renderer";

// 标记类型
enum TokenType {
  Text,
  TagOpen,
  TagClose,
  Attribute,
  AttributeValue,
}

// 解析标记
interface Token {
  type: TokenType;
  content: string;
}

// AST节点
interface ASTNode {
  type: "Element" | "Text";
  tag?: string;
  props?: Record<string, any>;
  children?: ASTNode[];
  content?: string;
  condition?: {
    type: "if" | "else-if" | "else";
    exp?: string;
  };
}

/**
 * 将HTML字符串编译为渲染函数
 *
 * @param template - HTML模板字符串
 * @returns 返回渲染函数，该函数在执行时会生成虚拟DOM节点
 */
export function compile(template: string): () => any {
  // 解析模板为标记
  const tokens = tokenize(template);

  // 将标记转换为AST
  const ast = parse(tokens);

  // 生成渲染函数
  return generate(ast);
}

/**
 * 将HTML模板分解为标记数组
 *
 * @param template - HTML模板字符串
 * @returns 标记数组
 */
function tokenize(template: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < template.length) {
    const char = template[i];

    if (char === "<") {
      if (template[i + 1] === "/") {
        // 结束标签
        const end = template.indexOf(">", i);
        tokens.push({
          type: TokenType.TagClose,
          content: template.slice(i + 2, end),
        });
        i = end + 1;
      } else {
        // 开始标签
        const end =
          template.indexOf(" ", i) !== -1 &&
          template.indexOf(" ", i) < template.indexOf(">", i)
            ? template.indexOf(" ", i)
            : template.indexOf(">", i);

        tokens.push({
          type: TokenType.TagOpen,
          content: template.slice(i + 1, end),
        });

        i = end;

        // 解析属性
        if (template[i] === " ") {
          let attrStart = i + 1;
          let inQuotes = false;
          let quoteChar = "";
          let attrName = "";

          while (i < template.length && template[i] !== ">") {
            if (!inQuotes && template[i] === "=") {
              attrName = template.slice(attrStart, i).trim();
              tokens.push({
                type: TokenType.Attribute,
                content: attrName,
              });

              // 跳过等号
              i++;

              // 处理引号
              if (template[i] === '"' || template[i] === "'") {
                inQuotes = true;
                quoteChar = template[i];
                i++;
                attrStart = i;
              }
            } else if (inQuotes && template[i] === quoteChar) {
              tokens.push({
                type: TokenType.AttributeValue,
                content: template.slice(attrStart, i),
              });

              inQuotes = false;
              i++;
              attrStart = i;
            } else if (
              !inQuotes &&
              (template[i] === " " || template[i] === ">")
            ) {
              if (i > attrStart) {
                const attrContent = template.slice(attrStart, i).trim();
                if (attrContent) {
                  tokens.push({
                    type: TokenType.Attribute,
                    content: attrContent,
                  });
                }
              }

              attrStart = i + 1;
              i++;
            } else {
              i++;
            }
          }

          if (template[i] === ">") {
            i++;
          }
        } else if (template[i] === ">") {
          i++;
        }
      }
    } else {
      // 文本内容
      const end = template.indexOf("<", i);
      if (end === -1) {
        // 剩余全是文本
        tokens.push({
          type: TokenType.Text,
          content: template.slice(i),
        });
        break;
      }

      const text = template.slice(i, end).trim();
      if (text) {
        tokens.push({
          type: TokenType.Text,
          content: text,
        });
      }

      i = end;
    }
  }

  return tokens;
}

/**
 * 将标记数组解析为AST
 *
 * @param tokens - 标记数组
 * @returns AST根节点
 */
function parse(tokens: Token[]): ASTNode {
  let i = 0;

  function parseElement(): ASTNode {
    const token = tokens[i++];

    if (token.type !== TokenType.TagOpen) {
      throw new Error("Expected tag open");
    }

    const node: ASTNode = {
      type: "Element",
      tag: token.content,
      props: {},
      children: [],
    };

    // 解析属性
    while (i < tokens.length && tokens[i].type === TokenType.Attribute) {
      const attrName = tokens[i++].content;

      // 处理条件指令
      if (
        attrName === "v-if" ||
        attrName === "v-else-if" ||
        attrName === "v-else"
      ) {
        if (attrName === "v-if" || attrName === "v-else-if") {
          if (
            i < tokens.length &&
            tokens[i].type === TokenType.AttributeValue
          ) {
            const exp = tokens[i++].content;
            node.condition = {
              type: attrName === "v-if" ? "if" : "else-if",
              exp,
            };
          } else {
            throw new Error(`${attrName} directive requires an expression`);
          }
        } else {
          // v-else
          node.condition = { type: "else" };
        }
        continue;
      }

      if (i < tokens.length && tokens[i].type === TokenType.AttributeValue) {
        const attrValue = tokens[i++].content;

        // 处理特殊属性（事件、绑定等）
        if (attrName.startsWith("@") || attrName.startsWith("v-on:")) {
          const eventName = attrName.startsWith("@")
            ? attrName.slice(1)
            : attrName.slice(5);

          node.props![`on${eventName[0].toUpperCase()}${eventName.slice(1)}`] =
            new Function("$event", attrValue);
        } else if (attrName.startsWith(":") || attrName.startsWith("v-bind:")) {
          const propName = attrName.startsWith(":")
            ? attrName.slice(1)
            : attrName.slice(7);

          node.props![propName] = new Function(`return ${attrValue}`);
        } else {
          node.props![attrName] = attrValue;
        }
      } else {
        // 布尔属性
        node.props![attrName] = true;
      }
    }

    // 解析子节点
    while (i < tokens.length && tokens[i].type !== TokenType.TagClose) {
      if (tokens[i].type === TokenType.Text) {
        const textContent = tokens[i++].content;
        node.children!.push({
          type: "Text",
          content: textContent,
        });
      } else if (tokens[i].type === TokenType.TagOpen) {
        node.children!.push(parseElement());
      } else {
        throw new Error("Unexpected token");
      }
    }

    // 确认结束标签
    if (i < tokens.length && tokens[i].type === TokenType.TagClose) {
      if (tokens[i].content !== node.tag) {
        throw new Error(
          `Mismatched closing tag: expected ${node.tag}, got ${tokens[i].content}`
        );
      }
      i++;
    }

    return node;
  }

  // 创建根节点
  const root: ASTNode = {
    type: "Element",
    tag: "div",
    props: {},
    children: [],
  };

  // 解析所有顶级元素
  while (i < tokens.length) {
    if (tokens[i].type === TokenType.Text) {
      const textContent = tokens[i++].content;
      root.children!.push({
        type: "Text",
        content: textContent,
      });
    } else if (tokens[i].type === TokenType.TagOpen) {
      root.children!.push(parseElement());
    } else {
      throw new Error("Unexpected token at root level");
    }
  }

  return root;
}

/**
 * 处理插值表达式 {{ expression }}
 *
 * @param text - 包含插值表达式的文本
 * @returns 包含求值函数的数组，用于渲染时求值
 */
function processInterpolation(text: string): (string | (() => any))[] {
  const result: (string | (() => any))[] = [];
  let lastIndex = 0;
  const pattern = /\{\{(.*?)\}\}/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    const expression = match[1].trim();
    result.push(() => {
      try {
        return new Function(`return ${expression}`)();
      } catch (e) {
        console.error(`Error evaluating expression: ${expression}`, e);
        return `[Error: ${e}]`;
      }
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

/**
 * 生成渲染函数
 *
 * @param ast - AST根节点
 * @returns 渲染函数
 */
function generate(ast: ASTNode): () => any {
  // 递归生成节点的渲染代码
  function genNode(node: ASTNode): any {
    if (node.type === "Text") {
      // 处理文本中的插值表达式
      const parts = processInterpolation(node.content || "");

      if (parts.length === 1) {
        const part = parts[0];
        if (typeof part === "function") {
          return () => part();
        }
        return part;
      } else {
        return () => {
          return parts
            .map((part) => {
              if (typeof part === "function") {
                return part();
              }
              return part;
            })
            .join("");
        };
      }
    } else if (node.type === "Element") {
      // 处理条件渲染
      if (node.condition) {
        return () => {
          // 对于v-if/v-else-if，计算条件表达式
          if (
            node.condition &&
            (node.condition.type === "if" || node.condition.type === "else-if")
          ) {
            const exp = node.condition.exp;
            const result = exp ? new Function(`return ${exp}`)() : false;
            if (result) {
              return renderElement();
            }
            return null;
          }
          // 对于v-else，无条件渲染
          else if (node.condition && node.condition.type === "else") {
            return renderElement();
          }

          // 默认情况，不渲染
          return null;
        };
      }

      // 普通元素渲染
      return renderElement;

      // 封装元素渲染逻辑
      function renderElement() {
        const props: Record<string, any> = {};

        // 处理动态属性
        if (node.props) {
          for (const key in node.props) {
            const value = node.props[key];
            props[key] = typeof value === "function" ? value() : value;
          }
        }

        // 处理子节点
        const children = node.children
          ? node.children
              .map((child) => {
                const childFn = genNode(child);
                return typeof childFn === "function" ? childFn() : childFn;
              })
              .filter((child) => child !== null)
          : [];

        return h(node.tag || "div", props, children);
      }
    }

    throw new Error("Unknown node type");
  }

  // 根节点的渲染函数
  return genNode(ast);
}

/**
 * 提供模板挂载功能，结合模板编译和应用创建
 *
 * @param template - HTML模板字符串
 * @param setupFn - 设置响应式状态的函数
 * @param container - 挂载容器
 */
export function createAppFromTemplate(
  template: string,
  setupFn: () => Record<string, any>,
  container: HTMLElement
): void {
  // 编译模板为渲染函数
  const render = compile(template);

  // 设置全局上下文，以便在模板中使用
  const ctx = setupFn();
  (window as any).__VUE_CTX__ = ctx;

  // 使表达式能够访问到setup返回的属性和方法
  // 为Function.prototype注入上下文
  const originalFunction = Function;
  (window as any).Function = function (...args: string[]) {
    const fnBody = args.pop() || "";
    const ctxAccess = Object.keys(ctx)
      .map((key) => `const ${key} = __VUE_CTX__.${key};`)
      .join("\n");
    const newFnBody = `${ctxAccess}\n${fnBody}`;
    return new originalFunction(...args, newFnBody);
  };

  // 创建应用
  const app = () => {
    try {
      return render();
    } catch (e) {
      console.error("Error rendering template:", e);
      return h("div", { class: "error" }, [
        "Template error: " + (e as Error).message,
      ]);
    }
  };

  // 恢复原始Function构造函数
  setTimeout(() => {
    (window as any).Function = originalFunction;
  }, 0);

  // 从renderer导入createApp函数挂载应用
  import("./renderer").then(({ createApp }) => {
    createApp(app, container);
  });
}
