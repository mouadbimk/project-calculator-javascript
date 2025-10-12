import * as model from "./model.js";
import btnsView from "./views/btnsView.js";
import histoireView from "./views/histoireView.js";
import resultView from "./views/resultView.js";
const controllBtn = function (expr) {
  const data = model.addToResult(expr);
  resultView.render(data.join(""), true);
};
const calcEqual = function (expr) {
  model.state.operations.expr = expr;
  const ans = model.calcTotal();
  model.state.ans = ans;
  // render total in UI
  resultView.renderTotal(ans);
  // change expr to total
  const id = model.checkId();
  const operation = {
    operation: model.state.operations.expr,
    ans: ans,
    ...(id && { id }),
  };
  controllHistory(operation);
};
const controllDelBtn = function (expr) {
  console.log(expr);
  console.log(model.state.operations);
  // update expr in state
  model.state.operations.expr = expr;
  // update array of operation
  model.state.operations.value = [expr];
  // render new opreation in UI
  resultView.render(expr, true);
};
const controllReset = function () {
  model.state.ans = 0;
  model.state.operations.expr = "";
  model.state.operations.value = [];
  resultView.render("Enter Operation", true);
};
const controllPiVal = function (pi) {
  model.addPiToExpr(pi);
  resultView.render(model.state.operations.value);
};
const controllRadic = function (symbol) {
  model.state.operations.expr += symbol;
  model.state.operations.value.push(symbol);
  resultView.render(model.state.operations.value);
};
const controllHistory = function (expr) {
  let exprObj;
  //check if any operation have same id
  if (expr.id) {
    // if true render in same operation and updated
    exprObj = model.updateOperation(expr);
  } else {
    exprObj = model.addToHistory(expr);
  }
  // if false create new one if history and localStorage
  histoireView.render(exprObj);
};
const controllRenderHistory = function () {
  const historyStorage = JSON.parse(localStorage.getItem("history"));
  if (historyStorage && historyStorage.length > 0) {
    histoireView.clear();
    [...historyStorage].forEach((opr) => histoireView.render(opr));
  }
};
const controllAddHistoryToOperation = function (expr) {
  // render expr in result
  resultView.render(expr.expr, true);
  // add id to button equal
  btnsView.addIdToBtnEqual(expr.id);
  model.state.operations.id = expr.id;
  model.state.operations.date = expr.date;
  model.state.operations.expr = expr.expr;
  model.state.operations.value = expr.expr.split("");
};
const controllCleanHistory = function () {
  model.cleanHistory();
  histoireView.clear();
};

const init = function () {
  btnsView.addHandlerClick(controllBtn);
  resultView.addEqualHandler(calcEqual);
  resultView.addHandlerDel(controllDelBtn);
  resultView.addHandlerReset(controllReset);
  resultView.addHandlerPi(controllPiVal);
  resultView.addHandlerRadic(controllRadic);
  window.addEventListener("load", controllRenderHistory);
  histoireView.addHandlerClick(controllAddHistoryToOperation);
  btnsView.addHandlerClearHistory(controllCleanHistory);
};

init();
