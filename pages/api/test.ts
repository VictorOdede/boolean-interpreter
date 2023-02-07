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

  let boolVariables = new BooleanVariables();

  // operators: & (and), | (or), ! (not), = (assignment operator), == (comparison operator)
  function boolInterpreter(expression: string) {
    // break down expression into smaller parts
    let characters = expression.trim().split(" ");

    const operands: boolean[] = [];

    // convert each token into a boolean value
    const convertToBool = (arg: string) => {
      if (arg.includes("!")) {
        let myVal = arg.slice(1);
        if (myVal === "T" || "F") {
          if (myVal == "T") {
            return false;
          } else {
            return true;
          }
        } else {
          // check if the token is a variable and return its value
          let boolVar = boolVariables.getVar(myVal);
          if (boolVar !== undefined) {
            return !boolVar;
          } else {
            console.log(`ERROR: ${myVal} has not been declared`);
          }
        }
      } else {
        if (arg === "T") {
          return true;
        } else if (arg === "F") {
          return false;
        } else {
          // check if the token is a variable and return its value
          let boolVar = boolVariables.getVar(arg);
          if (boolVar !== undefined) {
            return boolVar;
          } else {
            console.log(`ERROR: ${arg} has not been declared`);
          }
        }
      }
    };

    const solveExpression = (expressionArr: string[]) => {
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
        console.log(bracketIndex);
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

          console.log(myBrackets);

          const bracketExp = expressionArr.slice(
            myBrackets[0],
            myBrackets[1] + 1
          );

          console.log(bracketExp);
          console.log(myBrackets[0]);

          bracketExp[0] = bracketExp[0]?.replace("(", "");
          bracketExp[bracketExp.length - 1] = bracketExp[
            bracketExp.length - 1
          ]?.replace(")", "");

          console.log(bracketExp);

          // solve expression in parenthesis
          for (let char = 0; char < bracketExp.length; char++) {
            if (bracketExp[char] === "&") {
              const char1 =
                bracketOperands.length === 0
                  ? convertToBool(bracketExp[char - 1])
                  : bracketOperands.pop();
              const char2 = convertToBool(bracketExp[char + 1]);
              bracketOperands.push(char1 && char2);
              console.log(`pushing ${char1 && char2} to stack`);
            } else if (bracketExp[char] === "|") {
              const char1 =
                bracketOperands.length === 0
                  ? convertToBool(bracketExp[char - 1])
                  : bracketOperands.pop();
              const char2 = convertToBool(bracketExp[char + 1]);
              bracketOperands.push(char1 || char2);
              console.log(`pushing ${char1 || char2} to stack`);
            } else if (bracketExp[char] === "==") {
              const char1 =
                bracketOperands.length === 0
                  ? convertToBool(bracketExp[char - 1])
                  : bracketOperands.pop();
              const char2 = convertToBool(bracketExp[char + 1]);
              bracketOperands.push(char1 === char2);
            }
          }

          console.log(bracketOperands);

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
          console.log(expressionArr);
        }
      }

      // solve the rest of the expression
      if (expressionArr.length > 1) {
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
          } else {
            operands.push();
          }
        }
      } else {
        operands.push(convertToBool(expressionArr[0]));
      }

      return operands[operands.length - 1];
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

  // boolInterpreter("let X = T");

  // boolInterpreter("(T | F)");

  boolInterpreter("(F & T) | (T | F) & (T | F & !F)");
};
