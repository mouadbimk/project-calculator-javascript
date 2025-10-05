import { FILTER_EXPER } from "./helpers";

export const state = {
  operations: {
    expr: "",
    value: [],
  },
  ans: 0,
};

export const addToResult = function (oper) {
  state.operations.value.push(oper);
  return state.operations.value;
};
/**
 * Function Calculate Total OF operations
 * @param {String} data take string and transform it to array of chunks
 * @returns
 */
export const calcTotal = function () {
  console.log(state);
  const expr = state.operations.expr;
  const exprArr = FILTER_EXPER(expr);
  if (!exprArr.length) return 0;
  const stack = [Number(exprArr[0])];
  for (let i = 0; i < exprArr.length; i++) {
    if (exprArr[i] === "√") {
      const n = Number(exprArr[i + 1]);
      const result = Math.sqrt(n);
      exprArr[i] = result;
      exprArr.splice(i + 1, 1);
    }
  }
  for (let i = 1; i < exprArr.length; i += 2) {
    const op = exprArr[i];
    const n = Number(exprArr[i + 1]);
    if (op === "*" || op === "/" || op === "%") {
      const a = stack.pop();
      const r = op === "*" ? a * n : op === "/" ? a / n : a % n;
      stack.push(r);
    } else {
      stack.push(op, n);
    }
  }

  let total = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    const op = stack[i];
    const n = stack[i + 1];
    total = op === "+" ? total + n : total - n;
  }
  return total;
};
export const addPiToExpr = function (piVal) {
  state.operations.expr += piVal;
  state.operations.value.push(piVal);
};
