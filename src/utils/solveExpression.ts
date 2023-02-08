import { convertToBool } from "./convertToBool";

export const solveExpression = (
  expressionArr: string[],
  operands: boolean[],
  boolVariables
) => {
  // check and solve for parenthesis first
  const bracketIndex = [];

  expressionArr.forEach((item) => {
    const hasOpeningBrackets = item.includes("(");
    const hasClosingBrackets = item.includes(")");
    if (hasOpeningBrackets) {
      bracketIndex.push(expressionArr.indexOf(item));
    } else if (hasClosingBrackets) {
      bracketIndex.push(expressionArr.indexOf(item));
    }
  });

  const allBracketExpressions = bracketIndex.length / 2;

  if (allBracketExpressions > 0) {
    // extract the expression in parenthesis
    for (let i = 0; i < allBracketExpressions; i++) {
      let myBrackets = [];
      let bracketOperands = [];

      expressionArr.forEach((item) => {
        const hasOpeningBrackets = item.includes("(");
        const hasClosingBrackets = item.includes(")");
        if (hasOpeningBrackets) {
          myBrackets.push(expressionArr.indexOf(item));
        } else if (hasClosingBrackets) {
          myBrackets.push(expressionArr.indexOf(item));
        }
      });

      const bracketExp = expressionArr.slice(myBrackets[0], myBrackets[1] + 1);

      bracketExp[0] = bracketExp[0]?.replace("(", "");
      bracketExp[bracketExp.length - 1] = bracketExp[
        bracketExp.length - 1
      ]?.replace(")", "");

      // solve expression in parenthesis
      for (let char = 0; char < bracketExp.length; char++) {
        if (bracketExp[char] === "&") {
          const char1 =
            bracketOperands.length === 0
              ? convertToBool(bracketExp[char - 1], boolVariables)
              : bracketOperands.pop();
          const char2 = convertToBool(bracketExp[char + 1], boolVariables);
          bracketOperands.push(char1 && char2);
        } else if (bracketExp[char] === "|") {
          const char1 =
            bracketOperands.length === 0
              ? convertToBool(bracketExp[char - 1], boolVariables)
              : bracketOperands.pop();
          const char2 = convertToBool(bracketExp[char + 1], boolVariables);
          bracketOperands.push(char1 || char2);
        } else if (bracketExp[char] === "==") {
          const char1 =
            bracketOperands.length === 0
              ? convertToBool(bracketExp[char - 1], boolVariables)
              : bracketOperands.pop();
          const char2 = convertToBool(bracketExp[char + 1], boolVariables);
          bracketOperands.push(char1 === char2);
        } else if (bracketExp[char] === "!==") {
          const char1 =
            bracketOperands.length === 0
              ? convertToBool(bracketExp[char - 1], boolVariables)
              : bracketOperands.pop();
          const char2 = convertToBool(bracketExp[char + 1], boolVariables);
          bracketOperands.push(char1 !== char2);
        }
      }

      // replace parenthesis expression with solved values
      if (bracketOperands.length > 0) {
        if (bracketOperands[bracketOperands.length - 1] === false) {
          expressionArr.splice(
            myBrackets[0],
            myBrackets[1] - myBrackets[0] + 1,
            "F"
          );
        } else if (bracketOperands[bracketOperands.length - 1] === true) {
          expressionArr.splice(
            myBrackets[0],
            myBrackets[1] - myBrackets[0] + 1,
            "T"
          );
        }
      }
    }
  }

  // solve the rest of the expression
  if (expressionArr.length > 1) {
    for (let char = 0; char < expressionArr.length; char++) {
      if (expressionArr[char] === "&") {
        const char1 =
          operands.length === 0
            ? convertToBool(expressionArr[char - 1], boolVariables)
            : operands.pop();
        const char2 = convertToBool(expressionArr[char + 1], boolVariables);
        operands.push(char1 && char2);
      } else if (expressionArr[char] === "|") {
        const char1 =
          operands.length === 0
            ? convertToBool(expressionArr[char - 1], boolVariables)
            : operands.pop();
        const char2 = convertToBool(expressionArr[char + 1], boolVariables);
        operands.push(char1 || char2);
      } else if (expressionArr[char] === "==") {
        const char1 =
          operands.length === 0
            ? convertToBool(expressionArr[char - 1], boolVariables)
            : operands.pop();
        const char2 = convertToBool(expressionArr[char + 1], boolVariables);
        operands.push(char1 === char2);
      } else if (expressionArr[char] === "!==") {
        const char1 =
          operands.length === 0
            ? convertToBool(expressionArr[char - 1], boolVariables)
            : operands.pop();
        const char2 = convertToBool(expressionArr[char + 1], boolVariables);
        operands.push(char1 !== char2);
      } else {
        operands.push();
      }
    }
  } else {
    operands.push(convertToBool(expressionArr[0], boolVariables));
  }

  return operands[operands.length - 1];
};
