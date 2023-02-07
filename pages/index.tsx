import React, { useState, useEffect } from "react";
import { Button, Textarea, Code, Text, Stack, Divider } from "@chakra-ui/react";
import { solveExpression, BooleanVariables } from "../src/utils";

let boolVariables = new BooleanVariables();

const boolInterpreter = (expression: string): string => {
  // break down expression into smaller parts
  let characters = expression.trim().split(" ");

  const operands: boolean[] = [];

  if (characters[0] === "let" && characters.includes("=")) {
    let varExpression = characters.slice(3, characters.length);

    let boolValue = solveExpression(varExpression, operands, boolVariables);

    boolVariables.addVar({
      key: characters[1],
      value: boolValue,
    });
  } else {
    // solve the expression
    let boolValue = solveExpression(characters, operands, boolVariables);
  }

  return operands[0] === undefined
    ? "AN ERROR OCCURRED"
    : operands[0].toString();
};

export default function Home() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call the solve function and return a value
    let solvedExp = boolInterpreter(value);
    if (solvedExp === "true") {
      setResult("T");
    } else if (solvedExp === "false") {
      setResult("F");
    } else {
      setResult(solvedExp);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.target.blur();
      let solvedExp = boolInterpreter(value);
      if (solvedExp === "true") {
        setResult("T");
      } else if (solvedExp === "false") {
        setResult("F");
      } else {
        setResult(solvedExp);
      }
    }
  };

  return (
    <div>
      <Stack
        direction="column"
        align="left"
        margin="30px"
        marginLeft="80px"
        marginRight="80px"
        fontSize="sm"
        spacing="3px"
      >
        <Stack align="center">
          <Text fontWeight="bold" fontSize="lg">
            BOOLEAN INTERPRETER
          </Text>
        </Stack>
        <Text fontWeight="bold">BOOLEAN VALUES:</Text>
        <Text>T --{">"} TRUE</Text>
        <Text>F --{">"} FALSE</Text>
        <Text fontWeight="bold">OPERATORS:</Text>
        <Text>& --{">"} AND</Text>
        <Text>| --{">"} OR</Text>
        <Text>! --{">"} NOT</Text>
        <Text>== --{">"} EQUALS TO</Text>
        <Text>= --{">"} ASSIGNMENT</Text>
        <Text>
          * Variables can be declared using the keyword <Code>let</Code>. For
          Example: <Code>let X = F</Code>
        </Text>
        <Text>
          ** Separate the characters using a single space. This will work:{" "}
          <Code>(T & F) | F</Code>. This will NOT work: <Code>(T&F)|F</Code>.
        </Text>
        <Divider paddingTop="10px" />
        <Text paddingTop="10px" fontWeight="bold">
          Enter your code here:
        </Text>
        <Stack direction="column" align="center">
          <Textarea
            value={value}
            onChange={handleInputChange}
            size="sm"
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSubmit} width="sm" bgColor="green.300">
            RUN
          </Button>
        </Stack>
        <Text fontWeight="bold">OUTPUT:</Text>
        {result !== "" && <Code>{result}</Code>}
      </Stack>
    </div>
  );
}
