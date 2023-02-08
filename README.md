# Pesapal Developer Challenge: Boolean interpreter

## Overview

This a solution to the Pesapal developer challenge Problem #3. It is a boolean interpreter program that accepts a boolean expression as an input and solves the expression to output a boolean value. The program will solve any arbitrary length of expression and also supports variable declaration. The code is written using **TypeScript** and **NextJS**.

## Installation

If you do not want to run the project locally, I have deployed this code as a serverless app and it can be accessed at https://boolean-interpreter.vercel.app

This app can also be ran locally by following these steps:
* Clone the repository on to your local machine 
* Run `npm install` to set up the node modules 
* Run `npm run dev` to start the app 
* Open `localhost:3000` in your browser to use the interface 

## Approach

I solved this problem by breaking down the expression into parts. Each part is solved and allocated a boolean value in the stack. The boolean value in the stack keeps updating until the expression is fully solved. Once the entire expression is solved we can output the final boolean value in the stack as the result.

## Syntax

The syntax for the input expression should be as follows:

### Boolean values
* T --> TRUE
* F --> FALSE

### Operators
* & --> AND
* | --> OR
* ! --> NOT
* == --> EQUALS TO
* = --> ASSIGNMENT

* Each element of the expression should be separated with a **space**. 
* Use the word `let` to declare variables.

## Examples

### Example #1

**Input:** `let X = F`

**Output:** `X: F`

### Example #2

**Input:** `(T & F) | F`

**Output:** `F`

### Example #3

**Input:** `let Y = (T & F) | (F == X)`

**Output:** `Y: T`

### Example #4

**Input:** `Y == !X`

**Output:** `T`

## Errors

When an error is caught, the output will log this message: `AN ERROR HAS OCCURRED`

The errors could be due to one or more of the following reasons:
* The variable has not been declared
* Invalid operator(s)
* The expression has not been spaced correctly 
