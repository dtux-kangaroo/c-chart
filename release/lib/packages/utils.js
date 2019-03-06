'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAmap = exports.getBmap = exports.getMapJSON = exports.$get = exports.getStackMap = exports.getFormated = undefined;
exports.setArrayValue = setArrayValue;

var _numerify = require('numerify');

var _numerify2 = _interopRequireDefault(_numerify);

var _utilsLite = require('utils-lite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFormated = exports.getFormated = function getFormated(val, type, digit) {
  var defaultVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

  if (isNaN(val)) return defaultVal;
  if (!type) return val;
  if ((0, _utilsLite.isFunction)(type)) return type(val, _numerify2.default);

  digit = isNaN(digit) ? 0 : ++digit;
  var digitStr = '.[' + new Array(digit).join(0) + ']';
  var formatter = type;
  switch (type) {
    case 'KMB':
      formatter = digit ? '0,0' + digitStr + 'a' : '0,0a';
      break;
    case 'normal':
      formatter = digit ? '0,0' + digitStr : '0,0';
      break;
    case 'percent':
      formatter = digit ? '0,0' + digitStr + '%' : '0,0.[00]%';
      break;
  }
  return (0, _numerify2.default)(val, formatter);
};

var getStackMap = exports.getStackMap = function getStackMap(stack) {
  var stackMap = {};
  Object.keys(stack).forEach(function (item) {
    stack[item].forEach(function (name) {
      stackMap[name] = item;
    });
  });
  return stackMap;
};

var $get = exports.$get = function $get(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onload = function () {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function () {
      reject(JSON.parse(xhr.responseText));
    };
  });
};

var mapPromise = {};

var getMapJSON = exports.getMapJSON = function getMapJSON(_ref) {
  var position = _ref.position,
      positionJsonLink = _ref.positionJsonLink,
      beforeRegisterMapOnce = _ref.beforeRegisterMapOnce,
      mapURLProfix = _ref.mapURLProfix;

  var link = positionJsonLink || '' + mapURLProfix + position + '.json';
  if (!mapPromise[link]) {
    mapPromise[link] = $get(link).then(function (res) {
      if (beforeRegisterMapOnce) res = beforeRegisterMapOnce(res);
      return res;
    });
  }
  return mapPromise[link];
};

var bmapPromise = null;
var amapPromise = null;

var getBmap = exports.getBmap = function getBmap(key, v) {
  if (!bmapPromise) {
    bmapPromise = new Promise(function (resolve, reject) {
      var callbackName = 'bmap' + Date.now();
      window[callbackName] = resolve;
      var script = document.createElement('script');
      script.src = ['https://api.map.baidu.com/api?v=' + (v || '2.0'), 'ak=' + key, 'callback=' + callbackName].join('&');

      document.body.appendChild(script);
    });
  }
  return bmapPromise;
};

var getAmap = exports.getAmap = function getAmap(key, v) {
  if (!amapPromise) {
    amapPromise = new Promise(function (resolve, reject) {
      var callbackName = 'amap' + Date.now();
      window[callbackName] = resolve;
      var script = document.createElement('script');
      script.src = ['https://webapi.amap.com/maps?v=' + (v || '1.4.3'), 'key=' + key, 'callback=' + callbackName].join('&');

      document.body.appendChild(script);
    });
  }
  return amapPromise;
};

function setArrayValue(arr, index, value) {
  if (arr[index] !== undefined) {
    arr[index].push(value);
  } else {
    arr[index] = [value];
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getFormated, 'getFormated', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(getStackMap, 'getStackMap', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register($get, '$get', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(mapPromise, 'mapPromise', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(getMapJSON, 'getMapJSON', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(bmapPromise, 'bmapPromise', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(amapPromise, 'amapPromise', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(getBmap, 'getBmap', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(getAmap, 'getAmap', 'src/packages/utils.js');

  __REACT_HOT_LOADER__.register(setArrayValue, 'setArrayValue', 'src/packages/utils.js');
}();

;