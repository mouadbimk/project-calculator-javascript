import { FILTER_EXPER } from "./helpers";

export const state = {
  operations: {
    expr: "",
    value: [],
  },
  history: [],
  ans: 0,
};

export const addToResult = function (oper) {
  state.operations.value.push(oper);
  state.operations.expr += String(oper);
  return { expr: state.operations.expr, value: state.operations.value };
};
/**
 * Function Calculate Total OF operations
 * @param {String} data take string and transform it to array of chunks
 * @returns
 */
export const calcTotal = function () {
  const expr = state.operations.expr;
  const exprArr = FILTER_EXPER(expr);
  if (!exprArr.length) return 0;
  const stack = [Number(exprArr[0])];
  let i = 0;
  while (i < exprArr.length) {
    if (exprArr[i] === "√") {
      const n = Number(exprArr[i + 1]);
      if (!Number.isFinite(n)) return "Error";
      exprArr.splice(i, 2, Math.sqrt(n));
      continue;
    }
    i++;
  }

  for (let j = 1; j < exprArr.length; j += 2) {
    const op = exprArr[j];
    const n = Number(exprArr[j + 1]);
    if (op === "*" || op === "/" || op === "%") {
      const a = stack.pop();
      if (!Number.isFinite(a) || !Number.isFinite(n)) return "Error";
      if (op === "/" && n === 0) return "Error";
      const r = op === "*" ? a * n : op === "/" ? a / n : a % n;
      stack.push(r);
    } else {
      stack.push(op, n);
    }
  }

  let total = stack[0];
  for (let k = 1; k < stack.length; k += 2) {
    const op = stack[k];
    const n = stack[k + 1];
    total = op === "+" ? total + n : total - n;
  }
  state.ans = total;
  return total;
};
export const addPiToExpr = function (piVal) {
  state.operations.expr += piVal;
  state.operations.value.push(piVal);
};
export const addToHistory = function (expr) {
  const date = new Date();
  let id = date.getTime();
  const iso = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const exprObj = {
    id,
    expr: expr.operation,
    ans: expr.ans,
    date: iso,
  };
  state.history.push(exprObj);
  saveInLocal();
  return exprObj;
};
const saveInLocal = function () {
  localStorage.setItem("history", JSON.stringify(state.history));
};
export const cleanHistory = function () {
  localStorage.removeItem("history");
  state.history = [];
};
export const updateOperation = function (operation) {
  if (!state.history.length) return;
  const index = state.history.findIndex((item) => item.id === operation.id);
  if (index === -1) return;
  state.history[index] = {
    id: operation.id,
    expr: operation.expr ?? state.history[index].operation,
    ans: operation.ans ?? state.history[index].ans,
    date: operation.date ?? state.history[index].date,
  };
  saveInLocal();
};
const init = function () {
  try {
    const historyStorage = localStorage.getItem("history");
    state.history = historyStorage ? JSON.parse(historyStorage) : [];
    if (!Array.isArray(state.history)) state.history = [];
  } catch (err) {
    state.history = [];
  }
};
init();
