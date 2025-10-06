import View from "./View.js";

class BtnsView extends View {
  _parentEl = document.querySelector(".calculator");
  _btnEqual = document.querySelector("button.btn-equal");
  _cleanBtn = document.querySelector("button.btn-clear");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button.btn-calc");
      if (!btn) return;
      const value = btn.dataset.value;
      if (!value) return;
      handler(value.trim());
    });
  }
  addIdToBtnEqual(id) {
    return (this._btnEqual.dataset.id = id);
  }
  addHandlerClearHistory(handler) {
    this._cleanBtn.addEventListener("click", handler);
  }
  checkId() {
    const { id } = this._btnEqual.dataset;
    return id ? id : false;
  }
}
export default new BtnsView();
