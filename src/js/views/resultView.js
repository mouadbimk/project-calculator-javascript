import View from "./View.js";
class ResultView extends View {
  _parentEl = document.querySelector(".result");
  _equalBtn = document.querySelector("button.btn-equla");
  _delBtn = document.querySelector("button.btn-del");
  _resetBtn = document.querySelector("button.btn-reset");
  _piBtn = document.querySelector("button.btn-pi");
  _radicBtn = document.querySelector("button.btn-radic");
  renderTotal(total) {
    this._parentEl.textContent = total;
  }
  addEqualHandler(handler) {
    this._equalBtn.addEventListener("click", () => {
      const expr = this._parentEl.textContent.trim();
      if (!expr) return;
      handler(expr);
    });
  }
  addHandlerDel(handler) {
    this._delBtn.addEventListener("click", () => {
      const expr = this._parentEl.textContent;
      if (!expr) return;
      const newOp = expr.substring(0, expr.length - 1).trim();
      // if (newOp === '') return;
      handler(newOp);
    });
  }
  addHandlerReset(handler) {
    this._resetBtn.addEventListener("click", () => {
      handler();
    });
  }
  addHandlerPi(handler) {
    this._piBtn.addEventListener("click", () => {
      const piVal = Math.PI;
      handler(piVal);
    });
  }
  addHandlerRadic(handler) {
    this._radicBtn.addEventListener("click", () => {
      const symbol = "√";
      handler(symbol);
    });
  }
}
export default new ResultView();
