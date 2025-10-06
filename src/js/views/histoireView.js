import View from "./View.js";
class HistoireView extends View {
  _parentEl = document.querySelector(".operations");
  render(data) {
    if (!data) return;
    const html = this._generateMarkup(data);
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }
  clear() {
    this._parentEl.innerHTML = "";
  }
  _generateMarkup(operation) {
    const markup = `<div class="opration-line" data-key="${operation.id}">
                      <span class="operation">${operation.operation}</span>
                      <span class="result-opearation">=${operation.ans}</span>
                   </div>`;
    return markup;
  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const containerOper = e.target.closest(".opration-line");
      [...this._parentEl.children].forEach((child) => {
        child.classList.remove("active");
      });
      containerOper.classList.add("active");
      if (!containerOper) return;
      const expr = containerOper.querySelector(".operation").textContent;
      const { key } = containerOper.dataset;
      const exprObj = {
        expr,
        id: key,
      };
      handler(exprObj);
    });
  }
}
export default new HistoireView();
