import { Stack } from "./stack.ts";

/**
 * Evaluates a mathematical expression written in infix notation.
 * @param string expression
 * @return
 **/

export function evaluateExpression(expression: string): number | undefined {
  const postfix = infixToPostfix(expression);
  if (!postfix) return undefined;

  return evaluatePostfix(postfix);
}

/**
 * Converts an infix mathematical expression to postfix notation.
 * Uses a Stack to handle operator precedence and parentheses.
 * @param string expression - A space-separated infix expression.
 * @returns {string[] | undefined}
 * Returns an array representing postfix notation,
 * else  undefined if the expression contains invalid tokens.
 **/

function infixToPostfix(expression: string): string[] | undefined {
  const output: string[] = [];
  const operators = new Stack<string>();
  if (expression === "") throw new Error("Expression cannot be Empty");

  const tokens = expression.split(" ");

  const precedence = (op: string): number => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  };

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      output.push(token);
    } else if (token === "(") {
      operators.push(token);
    }

    // )
    else if (token === ")") {
      while (!operators.isEmpty && operators.top() !== "(") {
        output.push(operators.pop()!);
      }
      operators.pop();
    } else if (["+", "-", "*", "/"].includes(token)) {
      while (
        !operators.isEmpty &&
        precedence(operators.top()!) >= precedence(token)
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else {
      return undefined;
    }
  }

  while (!operators.isEmpty) {
    output.push(operators.pop()!);
  }

  return output;
}

function evaluatePostfix(postfix: string[]): number | undefined {
  const stack = new Stack<number>();

  for (const token of postfix) {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const right = stack.pop();
      const left = stack.pop();

      if (left === null || right === null) return undefined;

      let result: number;

      switch (token) {
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          if (right === 0) return undefined;
          result = left / right;
          break;
      }

      stack.push(result!);
    }
  }

  return stack.pop() ?? undefined;
}
