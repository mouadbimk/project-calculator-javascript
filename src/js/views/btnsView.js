import View from "./View.js";

class BtnsView extends View {
  _parentEl = document.querySelector(".calculator");
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button.btn-calc");
      if (!btn) return;
      const value = btn.dataset.value;
      if (!value) return;
      handler(value.trim());
    });
  }
}
export default new BtnsView();
