import * as model from "./model.js";
import btnsView from "./views/btnsView.js";
import histoireView from "./views/histoireView.js";
import resultView from "./views/resultView.js";
const controllBtn = function (operation) {
  const data = model.addToResult(operation);
  resultView.render(data);
};
const calcEqual = function (expr) {
  model.state.operations.expr = expr;
  const ans = model.calcTotal();
  model.state.ans = ans;
  // render total in UI
  resultView.renderTotal(ans);
  // change expr to total
  model.state.operations.value = [ans];
  model.state.operations.expr = String(ans);
  model.state.operations.value = [String(ans)];

  const id = btnsView.checkId();
  const op = {
    operation: expr,
    ans,
    ...(id && { id }),
  };
  const wasUpdate = Boolean(id);
  controllHistory(op);
  if (!wasUpdate) histoireView.render(op);
};
const controllDelBtn = function (expr) {
  // update expr in state
  model.state.operations.expr = expr;
  // update array of operation
  model.state.operations.value = [expr];
  // render new opreation in UI
  resultView.render({ expr, value: model.state.operations.value }, true);
};
const controllReset = function () {
  model.state.ans = 0;
  model.state.operations.expr = "";
  model.state.operations.value = [];
  resultView.render({ expr: "Enter Operation", value: [] }, true);
};
const controllPiVal = function (pi) {
  model.addPiToExpr(pi);
  resultView.render({
    expr: model.state.operations.expr,
    value: model.state.operations.value,
  });
};
const controllRadic = function (symbol) {
  model.state.operations.expr += symbol;
  model.state.operations.value.push(symbol);
  resultView.render({
    expr: model.state.operations.expr,
    value: model.state.operations.value,
  });
};
const controllHistory = function (op) {
  //check if any operation have same id
  if (op.id) {
    // if true render in same operation and updated
    model.updateOperation(op);
  } else {
    const saved = model.addToHistory(op);
    // if false create new one if history and localStorage
    return saved;
  }
};
const controllRenderHistory = function () {
  const historyStorage = JSON.parse(localStorage.getItem("history"));
  if (Array.isArray(histoireView) && histoireView.length) {
    histoireView.clear();
    historyStorage.forEach((opr) => histoireView.render(opr));
  }
};
const controllAddHistoryToOperation = function (item) {
  console.log(item);
  resultView.render(item.operation, true);
  btnsView.addIdToBtnEqual(item.id);
  model.state.operations.expr = item.operation;
  model.state.operations.value = [item.operation];
  model.state.ans = item.ans ?? 0;
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
