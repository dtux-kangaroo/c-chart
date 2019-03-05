'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilsLite = require('utils-lite');

var _default = function _default(options, extend) {
  Object.keys(extend).forEach(function (attr) {
    var value = extend[attr];
    if (~attr.indexOf('.')) {
      // eg: a.b.c a.1.b
      (0, _utilsLite.set)(options, attr, value);
    } else if (typeof value === 'function') {
      // get callback value
      options[attr] = value(options[attr]);
    } else {
      // mixin extend value
      if ((0, _utilsLite.isArray)(options[attr]) && (0, _utilsLite.isObject)(options[attr][0])) {
        // eg: [{ xx: 1 }, { xx: 2 }]
        options[attr].forEach(function (option, index) {
          options[attr][index] = Object.assign({}, option, value);
        });
      } else if ((0, _utilsLite.isObject)(options[attr])) {
        // eg: { xx: 1, yy: 2 }
        options[attr] = Object.assign({}, options[attr], value);
      } else {
        options[attr] = value;
      }
    }
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/modules/extend.js');
}();

;