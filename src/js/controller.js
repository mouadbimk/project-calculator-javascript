import * as model from "./model.js";
import btnsView from "./views/btnsView.js";
import resultView from "./views/resultView.js";
const controllBtn = function (expr) {
  const data = model.addToResult(expr);
  resultView.render(data);
};
const calcEqual = function (expr) {
  model.state.operations.expr = expr;
  const ans = model.calcTotal();
  model.state.ans = ans;
  // render total in UI
  resultView.renderTotal(model.state.ans);
  // change expr to total
  model.state.operations.value = [ans];
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
  console.log(symbol);
  model.state.operations.expr += symbol;
  model.state.operations.value.push(symbol);
  resultView.render(model.state.operations.value);
};
const init = function () {
  btnsView.addHandlerClick(controllBtn);
  resultView.addEqualHandler(calcEqual);
  resultView.addHandlerDel(controllDelBtn);
  resultView.addHandlerReset(controllReset);
  resultView.addHandlerPi(controllPiVal);
  resultView.addHandlerRadic(controllRadic);
};

init();
