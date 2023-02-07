export const convertToBool = (arg: string, boolVariables?: any) => {
  if (arg.includes("!")) {
    let myVal = arg.slice(1);
    if (myVal === "T" || myVal === "F") {
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
