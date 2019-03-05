"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = function _default(options, animation) {
  Object.keys(animation).forEach(function (key) {
    options[key] = animation[key];
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "src/chartPackage/modules/animation.js");
}();

;