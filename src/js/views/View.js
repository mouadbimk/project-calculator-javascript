export default class View {
  _data;
  /**
   * Render the operation in UI
   * @param {Object | Object[]} data the data to be rendered (e.g Operation)
   * @returns {String | Number | undefined} return A string if this calculate Result Or Number Of Operation
   * @this {Object} ResultView Object
   * @author Mouad Bimekliouen
   */
  render(data) {
    if (!data) return;
    const expr = data.join("");
    this._parentEl.textContent = expr;
  }
}
new View();
