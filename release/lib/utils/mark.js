"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = function _default(seriesItem, marks) {
  Object.keys(marks).forEach(function (key) {
    if (marks[key]) seriesItem[key] = marks[key];
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "src/utils/mark.js");
}();

;