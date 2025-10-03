export const FILTER_EXPER = function (expr) {
  return expr.match(/\d+|\+|\-|\*|\//g);
};
