export const FILTER_EXPER = function (expr) {
  // return expr.match(/\d+|\+|\-|\*|\//g);
  // return expr.match(/\d+(\.\d+)?|\+|\-|\*|\//g);
  return expr.match(/-?\d+(\.\d+)?|[+\-*/%√]/g) || [];
};
