import * as model from "./model.js";
import btnsView from "./views/btnsView.js";
import resultView from "./views/resultView.js";
const controllBtn = function (value) {
  const data = model.addToResult(value);
  resultView.render(data);
};
const calcEqual = function (expr) {
  model.state.operations.expr = expr;
  const ans = model.calcTotal();
  model.state.ans = ans;
  // render total in UI
  resultView.renderTotal(model.state.ans);
};
const init = function () {
  btnsView.addHandlerClick(controllBtn);
  resultView.addEqualHandler(calcEqual);
};

init();
