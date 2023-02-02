import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
  // operators: & (and), | (or), ! (not), = (assignment operator), == (comparison operator)
  function boolInterpreter(expression: string) {
    let characters = expression.trim().split(" ");
    // const variables: String[] = []
    // const operators: String[] = []
    const operands: any[] = [];

    console.log(characters);

    const bracketIndex = [];

    characters.forEach((item) => {
      const isOpeningBrackets = item.includes("(");
      const isClosingBrackets = item.includes(")");
      if (isOpeningBrackets) {
        bracketIndex.push(characters.indexOf(item));
      } else if (isClosingBrackets) {
        bracketIndex.push(characters.indexOf(item));
      }
    });

    const bracketExp = characters.slice(bracketIndex[0], bracketIndex[1] + 1);

    let openingBr = bracketExp[bracketIndex[0]].replace("(", "");
    let closingBr = bracketExp[bracketIndex[1]].replace(")", "");

    bracketExp[bracketIndex[0]] = openingBr;
    bracketExp[bracketIndex[1]] = closingBr;

    console.log(bracketExp);

    for (let char = 0; char < bracketExp.length; char++) {
      if (bracketExp[char] === "&") {
        const char1 = bracketExp[char - 1];
        const char2 = bracketExp[char + 1];
        operands.push(char1 && char2 === "T" ? true : false);
      } else if (bracketExp[char] === "|") {
        const char1 = bracketExp[char - 1];
        const char2 = bracketExp[char + 1];
        operands.push(char1 || char2 === "T" ? true : false);
      } else if (bracketExp[char] === "==") {
        const char1 = bracketExp[char - 1];
        const char2 = bracketExp[char + 1];
        operands.push(char1 === char2);
      } else if (bracketExp[char].includes("!")) {
        operands.push(!bracketExp[char]);
      }
    }

    if (operands[0] === false) {
      characters.splice(
        bracketIndex[0],
        bracketIndex[1] - bracketIndex[0] + 1,
        "F"
      );
    } else {
      characters.splice(
        bracketIndex[0],
        bracketIndex[1] - bracketIndex[0] + 1,
        "T"
      );
    }

    for (let char = 0; char < characters.length; char++) {
      if (characters[char] === "&") {
        const char1 = characters[char - 1];
        const char2 = characters[char + 1];
        operands.push(char1 && char2);
      } else if (characters[char] === "|") {
        const char1 = characters[char - 1];
        const char2 = characters[char + 1];
        operands.push(char1 || char2);
      } else if (characters[char] === "==") {
        const char1 = characters[char - 1];
        const char2 = characters[char + 1];
        operands.push(char1 === char2);
      } else if (characters[char].includes("!")) {
        operands.push(!characters[char]);
      }
    }

    console.log(operands[1]);
  }

  boolInterpreter("(T & T) == F");
};
