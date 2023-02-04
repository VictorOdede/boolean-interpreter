import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
  class BooleanVariables {
    variables: {};

    constructor() {
      this.variables = {};
    }

    addVar(args: { key: string; value: boolean }) {
      this.variables[args.key] = args.value;
    }

    getVar(key: string) {
      return this.variables[key];
    }
  }

  // operators: & (and), | (or), ! (not), = (assignment operator), == (comparison operator)
  function boolInterpreter(expression: string) {
    let boolVariables = new BooleanVariables();

    // break down expression into smaller parts
    let characters = expression.trim().split(" ");

    const operands: boolean[] = [];

    const convertToBool = (arg: string) => {
      if (arg.includes("!")) {
        let myVal = arg.slice(1, 1);
        if (myVal == "T") {
          return false;
        } else {
          return true;
        }
      } else {
        if (arg === "T") {
          return true;
        } else {
          return false;
        }
      }
    };

    const solveExpression = (expressionArr: string[]) => {
      // check and solve for parenthesis first
      const bracketIndex = [];

      expressionArr.forEach((item) => {
        const isOpeningBrackets = item.includes("(");
        const isClosingBrackets = item.includes(")");
        if (isOpeningBrackets) {
          bracketIndex.push(expressionArr.indexOf(item));
        } else if (isClosingBrackets) {
          bracketIndex.push(expressionArr.indexOf(item));
        }
      });

      const bracketExp = expressionArr.slice(
        bracketIndex[0],
        bracketIndex[1] + 1
      );

      let openingBr = bracketExp[bracketIndex[0]].replace("(", "");
      let closingBr = bracketExp[bracketIndex[1]].replace(")", "");

      bracketExp[bracketIndex[0]] = openingBr;
      bracketExp[bracketIndex[1]] = closingBr;

      console.log(bracketExp);

      for (let char = 0; char < bracketExp.length; char++) {
        if (bracketExp[char] === "&") {
          const char1 =
            operands.length === 0
              ? convertToBool(bracketExp[char - 1])
              : operands.pop();
          const char2 = convertToBool(bracketExp[char + 1]);
          operands.push(char1 && char2);
        } else if (bracketExp[char] === "|") {
          const char1 =
            operands.length === 0
              ? convertToBool(bracketExp[char - 1])
              : operands.pop();
          const char2 = convertToBool(bracketExp[char + 1]);
          operands.push(char1 || char2);
        } else if (bracketExp[char] === "==") {
          const char1 =
            operands.length === 0
              ? convertToBool(bracketExp[char - 1])
              : operands.pop();
          const char2 = convertToBool(bracketExp[char + 1]);
          operands.push(char1 === char2);
        }
      }

      if (operands.length > 0) {
        // replace bracket expression with a value
        if (operands[0] === false) {
          expressionArr.splice(
            bracketIndex[0],
            bracketIndex[1] - bracketIndex[0] + 1,
            "F"
          );
        } else if (operands[0] === true) {
          expressionArr.splice(
            bracketIndex[0],
            bracketIndex[1] - bracketIndex[0] + 1,
            "T"
          );
        }
      }

      console.log(expressionArr);

      // solve the remaining part of the equation
      for (let char = 0; char < expressionArr.length; char++) {
        if (expressionArr[char] === "&") {
          const char1 =
            operands.length === 0
              ? convertToBool(expressionArr[char - 1])
              : operands.pop();
          const char2 = convertToBool(expressionArr[char + 1]);
          operands.push(char1 && char2);
        } else if (expressionArr[char] === "|") {
          const char1 =
            operands.length === 0
              ? convertToBool(expressionArr[char - 1])
              : operands.pop();
          const char2 = convertToBool(expressionArr[char + 1]);
          operands.push(char1 || char2);
        } else if (expressionArr[char] === "==") {
          const char1 =
            operands.length === 0
              ? convertToBool(expressionArr[char - 1])
              : operands.pop();
          const char2 = convertToBool(expressionArr[char + 1]);
          operands.push(char1 === char2);
        }
      }

      return operands[0];
    };

    // check if variable is being declared
    if (characters[0] === "let" && characters.includes("=")) {
      let varExpression = characters.slice(3, characters.length);

      let boolValue = solveExpression(varExpression);

      boolVariables.addVar({
        key: characters[1],
        value: boolValue,
      });
      console.log(boolVariables.variables);
    } else {
      // solve the expression
      let boolValue = solveExpression(characters);
      console.log(boolValue);
    }
  }

  boolInterpreter("(F | T & F) & T");
};
