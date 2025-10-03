import View from "./View.js";
class ResultView extends View {
  _parentEl = document.querySelector(".result");
  _equalBtn = document.querySelector("button.btn-equla");
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
}
export default new ResultView();
