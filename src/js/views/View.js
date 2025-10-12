export default class View {
  _data;
  /**
   * Render the operation in UI
   * @param {string | any[] | {expr?: string|number, value?: any[]}} data
   * @param {boolean} asString - إذا true كنعتبر data نص جاهز
   * @returns {string} النص اللي تعرض (مفيد للاختبارات)
   */
  render(data, asStrig = false) {
    this._data = data;
    if (data == null) {
      if (this._parentEl) this._parentEl.textContent = "";
      return "";
    }
    let expr;
    if (asStrig) {
      expr = String(data);
    } else if (Array.isArray(data)) {
      // Array buttons and tokens
      expr = data.map(String).join("");
    } else if (typeof data === "object") {
      if (data.expr != null) expr = String(data.expr);
      else if (Array.isArray(data.value))
        expr = data.value.map(String).join("");
      else expr = String(data);
    } else {
      expr = String(data);
    }
    if (this._parentEl) this._parentEl.textContent = expr;
    return expr;
  }
}
