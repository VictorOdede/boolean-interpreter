export class BooleanVariables {
  variables: {};

  constructor() {
    this.variables = {};
    this.addVar = this.addVar.bind(this);
    this.getVar = this.getVar.bind(this);
  }

  addVar(args: { key: string; value: boolean }) {
    this.variables[args.key] = args.value;
  }

  getVar(key: string) {
    return this.variables[key];
  }
}
