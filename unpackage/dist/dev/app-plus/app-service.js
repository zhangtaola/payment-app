if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  var _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
  "use strict";
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$A = {
    data() {
      return {
        value: 0
      };
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 这是首页111 ");
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/index.vue"]]);
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const mpMixin = {};
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value2);
  }
  function url(value2) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value2);
  }
  function date$1(value2) {
    if (!value2)
      return false;
    if (number$1(value2))
      value2 = +value2;
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number$1(value2) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value2);
  }
  function string$1(value2) {
    return typeof value2 === "string";
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    }
    if (value2.length === 8) {
      return xreg.test(value2);
    }
    return false;
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range$2(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (value2 === 0 || isNaN(value2))
          return true;
        break;
      case "object":
        if (value2 === null || value2.length === 0)
          return true;
        for (const i in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 === "string") {
      try {
        const obj = JSON.parse(value2);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array$1(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    }
    return Object.prototype.toString.call(value2) === "[object Array]";
  }
  function object$1(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  function func(value2) {
    return typeof value2 === "function";
  }
  function promise(value2) {
    return object$1(value2) && func(value2.then) && func(value2.catch);
  }
  function image(value2) {
    const newValue = value2.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value2) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value2);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array: array$1,
    carNo,
    chinese,
    code,
    contains,
    date: date$1,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number: number$1,
    object: object$1,
    promise,
    range: range$2,
    rangeLength,
    regExp,
    string: string$1,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range$1(min = 0, max = 0, value2 = 0) {
    return Math.max(min, Math.min(max, Number(value2)));
  }
  function getPx(value2, unit = false) {
    if (number$1(value2)) {
      return unit ? `${value2}px` : Number(value2);
    }
    if (/(rpx|upx)$/.test(value2)) {
      return unit ? `${uni.upx2px(parseInt(value2))}px` : Number(uni.upx2px(parseInt(value2)));
    }
    return unit ? `${parseInt(value2)}px` : parseInt(value2);
  }
  function sleep(value2 = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value2);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value2 = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value2 = String(value2);
    return number$1(value2) ? `${value2}${unit}` : value2;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value2]) => [key, deepClone(value2, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value2) => deepClone(value2, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value2) => deepClone(value2, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value2] of Object.entries(obj)) {
        clone[key] = deepClone(value2, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge$1(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge$1(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format2 = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value2.length; i++) {
              _result.push(`${key}[${i}]=${value2[i]}`);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value2}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value2, unit = true) {
    const valueNum = parseInt(value2);
    if (unit) {
      if (/s$/.test(value2))
        return value2;
      return value2 > 30 ? `${value2}ms` : `${value2}s`;
    }
    if (/ms$/.test(value2))
      return valueNum;
    if (/s$/.test(value2))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value2) {
    return `00${value2}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value2) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value2);
    } else {
      obj[key] = value2;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route2 = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route2 ? route2 : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range: range$1,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false,
        // 是否需要拦截
        events: {}
        // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = deepMerge$1(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === page())
        return;
      if (params.intercept) {
        mergeConfig.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = deepMerge$1(this.config, mergeConfig);
      if (typeof mergeConfig.intercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          mergeConfig.intercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration,
        events
      } = config;
      if (config.type == "navigateTo" || config.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration,
          events
        });
      }
      if (config.type == "redirectTo" || config.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config.type == "switchTab" || config.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config.type == "reLaunch" || config.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config.type == "navigateBack" || config.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        var _a, _b;
        return {
          ...index,
          test,
          route,
          debounce,
          throttle,
          unit: (_b = (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config) == null ? void 0 : _b.unit
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array$1(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    },
    // 兼容vue3
    unmounted() {
      if (this.parent && array$1(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const props$g = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字样式
      textStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.loadingIcon
    }
  };
  const _sfc_main$z = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$g],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle([{
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            }, _ctx.$uv.addStyle(_ctx.textStyle)])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const icons = {
    "uvicon-level": "e68f",
    "uvicon-checkbox-mark": "e659",
    "uvicon-folder": "e694",
    "uvicon-movie": "e67c",
    "uvicon-star-fill": "e61e",
    "uvicon-star": "e618",
    "uvicon-phone-fill": "e6ac",
    "uvicon-phone": "e6ba",
    "uvicon-apple-fill": "e635",
    "uvicon-backspace": "e64d",
    "uvicon-attach": "e640",
    "uvicon-empty-data": "e671",
    "uvicon-empty-address": "e68a",
    "uvicon-empty-favor": "e662",
    "uvicon-empty-car": "e657",
    "uvicon-empty-order": "e66b",
    "uvicon-empty-list": "e672",
    "uvicon-empty-search": "e677",
    "uvicon-empty-permission": "e67d",
    "uvicon-empty-news": "e67e",
    "uvicon-empty-history": "e685",
    "uvicon-empty-coupon": "e69b",
    "uvicon-empty-page": "e60e",
    "uvicon-empty-wifi-off": "e6cc",
    "uvicon-reload": "e627",
    "uvicon-order": "e695",
    "uvicon-server-man": "e601",
    "uvicon-search": "e632",
    "uvicon-more-dot-fill": "e66f",
    "uvicon-scan": "e631",
    "uvicon-map": "e665",
    "uvicon-map-fill": "e6a8",
    "uvicon-tags": "e621",
    "uvicon-tags-fill": "e613",
    "uvicon-eye": "e664",
    "uvicon-eye-fill": "e697",
    "uvicon-eye-off": "e69c",
    "uvicon-eye-off-outline": "e688",
    "uvicon-mic": "e66d",
    "uvicon-mic-off": "e691",
    "uvicon-calendar": "e65c",
    "uvicon-trash": "e623",
    "uvicon-trash-fill": "e6ce",
    "uvicon-play-left": "e6bf",
    "uvicon-play-right": "e6b3",
    "uvicon-minus": "e614",
    "uvicon-plus": "e625",
    "uvicon-info-circle": "e69f",
    "uvicon-info-circle-fill": "e6a7",
    "uvicon-question-circle": "e622",
    "uvicon-question-circle-fill": "e6bc",
    "uvicon-close": "e65a",
    "uvicon-checkmark": "e64a",
    "uvicon-checkmark-circle": "e643",
    "uvicon-checkmark-circle-fill": "e668",
    "uvicon-setting": "e602",
    "uvicon-setting-fill": "e6d0",
    "uvicon-heart": "e6a2",
    "uvicon-heart-fill": "e68b",
    "uvicon-camera": "e642",
    "uvicon-camera-fill": "e650",
    "uvicon-more-circle": "e69e",
    "uvicon-more-circle-fill": "e684",
    "uvicon-chat": "e656",
    "uvicon-chat-fill": "e63f",
    "uvicon-bag": "e647",
    "uvicon-error-circle": "e66e",
    "uvicon-error-circle-fill": "e655",
    "uvicon-close-circle": "e64e",
    "uvicon-close-circle-fill": "e666",
    "uvicon-share": "e629",
    "uvicon-share-fill": "e6bb",
    "uvicon-share-square": "e6c4",
    "uvicon-shopping-cart": "e6cb",
    "uvicon-shopping-cart-fill": "e630",
    "uvicon-bell": "e651",
    "uvicon-bell-fill": "e604",
    "uvicon-list": "e690",
    "uvicon-list-dot": "e6a9",
    "uvicon-zhifubao-circle-fill": "e617",
    "uvicon-weixin-circle-fill": "e6cd",
    "uvicon-weixin-fill": "e620",
    "uvicon-qq-fill": "e608",
    "uvicon-qq-circle-fill": "e6b9",
    "uvicon-moments-circel-fill": "e6c2",
    "uvicon-moments": "e6a0",
    "uvicon-car": "e64f",
    "uvicon-car-fill": "e648",
    "uvicon-warning-fill": "e6c7",
    "uvicon-warning": "e6c1",
    "uvicon-clock-fill": "e64b",
    "uvicon-clock": "e66c",
    "uvicon-edit-pen": "e65d",
    "uvicon-edit-pen-fill": "e679",
    "uvicon-email": "e673",
    "uvicon-email-fill": "e683",
    "uvicon-minus-circle": "e6a5",
    "uvicon-plus-circle": "e603",
    "uvicon-plus-circle-fill": "e611",
    "uvicon-file-text": "e687",
    "uvicon-file-text-fill": "e67f",
    "uvicon-pushpin": "e6d1",
    "uvicon-pushpin-fill": "e6b6",
    "uvicon-grid": "e68c",
    "uvicon-grid-fill": "e698",
    "uvicon-play-circle": "e6af",
    "uvicon-play-circle-fill": "e62a",
    "uvicon-pause-circle-fill": "e60c",
    "uvicon-pause": "e61c",
    "uvicon-pause-circle": "e696",
    "uvicon-gift-fill": "e6b0",
    "uvicon-gift": "e680",
    "uvicon-kefu-ermai": "e660",
    "uvicon-server-fill": "e610",
    "uvicon-coupon-fill": "e64c",
    "uvicon-coupon": "e65f",
    "uvicon-integral": "e693",
    "uvicon-integral-fill": "e6b1",
    "uvicon-home-fill": "e68e",
    "uvicon-home": "e67b",
    "uvicon-account": "e63a",
    "uvicon-account-fill": "e653",
    "uvicon-thumb-down-fill": "e628",
    "uvicon-thumb-down": "e60a",
    "uvicon-thumb-up": "e612",
    "uvicon-thumb-up-fill": "e62c",
    "uvicon-lock-fill": "e6a6",
    "uvicon-lock-open": "e68d",
    "uvicon-lock-opened-fill": "e6a1",
    "uvicon-lock": "e69d",
    "uvicon-red-packet": "e6c3",
    "uvicon-photo-fill": "e6b4",
    "uvicon-photo": "e60d",
    "uvicon-volume-off-fill": "e6c8",
    "uvicon-volume-off": "e6bd",
    "uvicon-volume-fill": "e624",
    "uvicon-volume": "e605",
    "uvicon-download": "e670",
    "uvicon-arrow-up-fill": "e636",
    "uvicon-arrow-down-fill": "e638",
    "uvicon-play-left-fill": "e6ae",
    "uvicon-play-right-fill": "e6ad",
    "uvicon-arrow-downward": "e634",
    "uvicon-arrow-leftward": "e63b",
    "uvicon-arrow-rightward": "e644",
    "uvicon-arrow-upward": "e641",
    "uvicon-arrow-down": "e63e",
    "uvicon-arrow-right": "e63c",
    "uvicon-arrow-left": "e646",
    "uvicon-arrow-up": "e633",
    "uvicon-skip-back-left": "e6c5",
    "uvicon-skip-forward-right": "e61f",
    "uvicon-arrow-left-double": "e637",
    "uvicon-man": "e675",
    "uvicon-woman": "e626",
    "uvicon-en": "e6b8",
    "uvicon-twitte": "e607",
    "uvicon-twitter-circle-fill": "e6cf"
  };
  const props$f = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "aspectFit"
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.icon
    }
  };
  const _sfc_main$y = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$f],
    data() {
      return {
        colorType: [
          "primary",
          "success",
          "info",
          "error",
          "warning"
        ]
      };
    },
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && this.colorType.includes(this.color))
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color && !this.colorType.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
        return this.name.indexOf("/") !== -1 || isBase64;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        const code2 = icons["uvicon-" + this.name];
        return code2 ? unescape(`%u${code2}`) : ["uvicon"].indexOf(this.customPrefix) > -1 ? this.name : "";
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const button = {
    props: {
      lang: String,
      sessionFrom: String,
      sendMessageTitle: String,
      sendMessagePath: String,
      sendMessageImg: String,
      showMessageCard: Boolean,
      appParameter: String,
      formType: String,
      openType: String
    }
  };
  const openType = {
    props: {
      openType: String
    },
    emits: ["getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "contact", "chooseavatar", "addgroupapp", "chooseaddress", "subscribe", "login", "im"],
    methods: {
      onGetPhoneNumber(event) {
        this.$emit("getphonenumber", event.detail);
      },
      onGetUserInfo(event) {
        this.$emit("getuserinfo", event.detail);
      },
      onError(event) {
        this.$emit("error", event.detail);
      },
      onOpenSetting(event) {
        this.$emit("opensetting", event.detail);
      },
      onLaunchApp(event) {
        this.$emit("launchapp", event.detail);
      },
      onContact(event) {
        this.$emit("contact", event.detail);
      },
      onChooseavatar(event) {
        this.$emit("chooseavatar", event.detail);
      },
      onAgreeprivacyauthorization(event) {
        this.$emit("agreeprivacyauthorization", event.detail);
      },
      onAddgroupapp(event) {
        this.$emit("addgroupapp", event.detail);
      },
      onChooseaddress(event) {
        this.$emit("chooseaddress", event.detail);
      },
      onSubscribe(event) {
        this.$emit("subscribe", event.detail);
      },
      onLogin(event) {
        this.$emit("login", event.detail);
      },
      onIm(event) {
        this.$emit("im", event.detail);
      }
    }
  };
  const props$e = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: "info"
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: "normal"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: ""
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: "spinner"
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: 14
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: true
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: true
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 0
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 0
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 200
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标
      icon: {
        type: String,
        default: ""
      },
      // 按钮图标大小
      iconSize: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标颜色
      iconColor: {
        type: String,
        default: "#000000"
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: ""
      },
      // 自定义按钮文本样式
      customTextStyle: {
        type: [Object, String],
        default: ""
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.button
    }
  };
  const _sfc_main$x = {
    name: "uv-button",
    mixins: [mpMixin, mixin, props$e],
    emits: ["click"],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : "#3c9cff";
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      },
      // 设置图标大小
      getIconSize() {
        const size = this.iconSize ? this.iconSize : this.textSize * 1.35;
        return this.$uv.addUnit(size);
      },
      // 设置外层盒子的宽度，其他样式不需要
      btnWrapperStyle() {
        const style = {};
        const customStyle = this.$uv.addStyle(this.customStyle);
        if (customStyle.width)
          style.width = customStyle.width;
        return style;
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$4);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-button-wrapper",
        style: vue.normalizeStyle([$options.btnWrapperStyle])
      },
      [
        vue.createElementVNode("button", {
          "hover-start-time": Number(_ctx.hoverStartTime),
          "hover-stay-time": Number(_ctx.hoverStayTime),
          "form-type": _ctx.formType,
          "open-type": _ctx.openType,
          "app-parameter": _ctx.appParameter,
          "hover-stop-propagation": _ctx.hoverStopPropagation,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          lang: _ctx.lang,
          "data-name": _ctx.dataName,
          "session-from": _ctx.sessionFrom,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "hover-class": !_ctx.disabled && !_ctx.loading ? "uv-button--active" : "",
          class: vue.normalizeClass(["uv-button uv-reset-button", $options.bemClass]),
          style: vue.normalizeStyle([$options.baseColor, _ctx.$uv.addStyle(_ctx.customStyle)]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
        }, [
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createVNode(_component_uv_loading_icon, {
                mode: _ctx.loadingMode,
                size: _ctx.loadingSize * 1.15,
                color: $options.loadingColor
              }, null, 8, ["mode", "size", "color"]),
              vue.createElementVNode(
                "text",
                {
                  class: "uv-button__loading-text",
                  style: vue.normalizeStyle([
                    { fontSize: $options.textSize + "px" },
                    _ctx.$uv.addStyle(_ctx.customTextStyle)
                  ])
                },
                vue.toDisplayString(_ctx.loadingText || _ctx.text),
                5
                /* TEXT, STYLE */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.icon,
                color: $options.iconColorCom,
                size: $options.getIconSize,
                customStyle: { marginRight: "2px" }
              }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createElementVNode(
                  "text",
                  {
                    class: "uv-button__text",
                    style: vue.normalizeStyle([
                      { fontSize: $options.textSize + "px" },
                      _ctx.$uv.addStyle(_ctx.customTextStyle)
                    ])
                  },
                  vue.toDisplayString(_ctx.text),
                  5
                  /* TEXT, STYLE */
                )
              ], true),
              vue.renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ], 14, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-ae8e42c7"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-button/components/uv-button/uv-button.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type2, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type2)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type2 === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type2}(${args + unit}) `;
      } else {
        styles.styles[type2] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type2) => {
    MPAnimation.prototype[type2] = function(...args) {
      this.animation[type2](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$w = {
    name: "uv-transition",
    mixins: [mpMixin, mixin],
    emits: ["click", "change"],
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [Array, String, null],
        default() {
          return "fade";
        }
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      customClass: {
        type: String,
        default: ""
      },
      // nvue模式下 是否直接显示，在uv-list等cell下面使用就需要设置
      cellChild: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 初始化动画条件
      transformStyles() {
        const style = {
          transform: this.transform,
          opacity: this.opacity,
          ...this.$uv.addStyle(this.customStyle),
          "transition-duration": `${this.duration / 1e3}s`
        };
        return this.$uv.addStyle(style, "string");
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:166", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过渡动画
      close(type2) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type2) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type3, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type3)[mode];
          } else {
            styles.transform += this.animationType(type3)[mode] + " ";
          }
        };
        if (typeof this.mode === "string") {
          buildStyle(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildStyle(type2, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type2) {
        let buildTranfrom = (type3, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type3 ? 0 : 1;
          } else {
            aniNum = type3 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type3 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type3 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type3 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type3 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.mode === "string") {
          buildTranfrom(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildTranfrom(type2, mode);
          });
        }
        return this.animation;
      },
      animationType(type2) {
        return {
          fade: type2 ? 1 : 0,
          "slide-top": `translateY(${type2 ? "0" : "-100%"})`,
          "slide-right": `translateX(${type2 ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type2 ? "0" : "100%"})`,
          "slide-left": `translateX(${type2 ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type2 ? 1 : 0.8}) scaleY(${type2 ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type2 ? 1 : 1.2}) scaleY(${type2 ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$d = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: 10070
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: 0.5
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.overlay
    }
  };
  const _sfc_main$v = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$d],
    watch: {
      show(newVal) {
      }
    },
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      },
      clear() {
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$6);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: _ctx.show,
      mode: "fade",
      "custom-class": "uv-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler,
      onTouchmove: vue.withModifiers($options.clear, ["stop", "prevent"])
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick", "onTouchmove"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-7303e1aa"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
  const props$c = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$u = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else {
            style.background = this.bgColor;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "uv-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const _sfc_main$t = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-560f16b2"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$s = {
    name: "uv-popup",
    components: {},
    mixins: [mpMixin, mixin],
    emits: ["change", "maskClick"],
    props: {
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      mode: {
        type: String,
        default: "center"
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: 0.4
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: ""
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: true
      },
      round: {
        type: [Number, String],
        default: 0
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.popup
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type2) {
          if (!this.config[type2])
            return;
          this[this.config[type2]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.mode]](true);
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        transitionStyle: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupClass: this.isDesktop ? "fixforpc-top" : "top",
        direction: ""
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.bgColor === "" || this.bgColor === "none" || this.$uv.getPx(this.round) > 0) {
          return "transparent";
        }
        return this.bgColor;
      },
      contentStyle() {
        const style = {};
        if (this.bgColor) {
          style.backgroundColor = this.bg;
        }
        if (this.round) {
          const value2 = this.$uv.addUnit(this.round);
          const mode = this.direction ? this.direction : this.mode;
          style.backgroundColor = this.bgColor;
          if (mode === "top") {
            style.borderBottomLeftRadius = value2;
            style.borderBottomRightRadius = value2;
          } else if (mode === "bottom") {
            style.borderTopLeftRadius = value2;
            style.borderTopRightRadius = value2;
          } else if (mode === "center") {
            style.borderRadius = value2;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      this.messageChild = null;
      this.clearPropagation = false;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.mode;
        } else {
          this.direction = direction;
        }
        if (!this.config[direction]) {
          return this.$uv.error(`缺少类型：${direction}`);
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type2) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.mode
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.closeOnClickOverlay)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type2) {
        this.popupClass = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.mode === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type2) {
        this.popupClass = "bottom";
        this.ani = ["slide-bottom"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type2) {
        this.popupClass = "center";
        this.ani = this.zoom ? ["zoom-in", "fade"] : ["fade"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type2) {
        this.popupClass = "left";
        this.ani = ["slide-left"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type2) {
        this.popupClass = "right";
        this.ani = ["slide-right"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$2);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1$5);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_2$3);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$6);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-popup", [$data.popupClass, $options.isDesktop ? "fixforpc-z-index" : ""]]),
        style: vue.normalizeStyle([{ zIndex: $props.zIndex }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            vue.createCommentVNode(" 遮罩层 "),
            $data.maskShow && $props.overlay ? (vue.openBlock(), vue.createBlock(_component_uv_overlay, {
              key: "1",
              show: $data.showTrans,
              duration: $props.duration,
              "custom-style": $props.overlayStyle,
              opacity: $props.overlayOpacity,
              zIndex: $props.zIndex,
              onClick: $options.onTap
            }, null, 8, ["show", "duration", "custom-style", "opacity", "zIndex", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uv_transition, {
              key: "2",
              mode: $data.ani,
              name: "content",
              "custom-style": $data.transitionStyle,
              duration: $props.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-popup__content", [$data.popupClass]]),
                    style: vue.normalizeStyle([$options.contentStyle]),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    $props.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    $props.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 1 })) : vue.createCommentVNode("v-if", true),
                    $props.closeable ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                        class: vue.normalizeClass(["uv-popup__content__close", ["uv-popup__content__close--" + $props.closeIconPos]]),
                        "hover-class": "uv-popup__content__close--hover",
                        "hover-stay-time": "150"
                      },
                      [
                        vue.createVNode(_component_uv_icon, {
                          name: "close",
                          color: "#909399",
                          size: "18",
                          bold: ""
                        })
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode", "custom-style", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-01a3ad6e"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  const _sfc_main$r = {
    data() {
      return {
        //店铺名称
        storeName: "lala便利店",
        //商户id
        storeId: "454654654564656",
        //待审核金额
        auditingMoney: "500000",
        //可提现金额
        withdrawableMoney: "50000",
        inputValue_store: "",
        candidates_store: [{
          id: "1",
          name: "选项一"
        }, {
          id: "2",
          name: "选项二",
          disabled: true
          // 单独设置disabled后即可禁用该选项
        }, {
          id: "3",
          name: "选项三"
        }, {
          id: "4",
          name: "选项四"
        }, {
          id: "5",
          name: "选项五",
          disabled: true
          // 单独设置disabled后即可禁用该选项
        }, {
          id: "6",
          name: "..."
        }]
      };
    },
    onLoad() {
    },
    methods: {
      input_store(e) {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:193", e);
      },
      select_store(e) {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:196", e);
      },
      exitApp() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      //确认退出系统
      confirm() {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:206", "退出的逻辑");
        this.$refs.popup.close();
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "header" }, [
      vue.createElementVNode("view", { class: "uesr" }, [
        vue.createElementVNode("view", { class: "top-xh" }, [
          vue.createElementVNode("view")
        ]),
        vue.createElementVNode("view", { class: "fot-xh" }, [
          vue.createCommentVNode(' <navigator url="" hover-class="none"> '),
          vue.createElementVNode("view", { class: "pic" }, [
            vue.createElementVNode("image", {
              src: "/static/personalCenter/people.png",
              style: { "width": "130rpx" },
              mode: "widthFix"
            })
          ]),
          vue.createElementVNode("view", { class: "txt" }, [
            vue.createElementVNode("view", { class: "name" }, [
              vue.createElementVNode(
                "view",
                { class: "h3" },
                " 店铺名：" + vue.toDisplayString($data.storeName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "storeId" },
                " 商户ID：" + vue.toDisplayString($data.storeId),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createCommentVNode(" </navigator> ")
        ])
      ]),
      vue.createElementVNode("view", { class: "money" }, [
        vue.createElementVNode("view", { class: "m-a1" }, [
          vue.createElementVNode("view", { class: "money-box" }, [
            vue.createElementVNode("navigator", {
              url: "/pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney",
              "hover-class": "none"
            }, [
              vue.createElementVNode("view", { class: "storeMoney" }, [
                vue.createElementVNode("view", { class: "pic" }, [
                  vue.createElementVNode("image", {
                    src: "/static/personalCenter/daishenghe.png",
                    style: { "width": "76rpx" },
                    mode: "widthFix"
                  })
                ]),
                vue.createElementVNode("view", { class: "txt" }, [
                  vue.createElementVNode("text", { class: "s1" }, "待审核"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString($data.auditingMoney) + "元",
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("navigator", {
              url: "/pages/personalCenter/showCashOutStore/showCashOutStore",
              "hover-class": "none"
            }, [
              vue.createElementVNode("view", { class: "storeMoney" }, [
                vue.createElementVNode("view", { class: "pic" }, [
                  vue.createElementVNode("image", {
                    src: "/static/personalCenter/ketixian.png",
                    style: { "width": "76rpx" },
                    mode: "widthFix"
                  })
                ]),
                vue.createElementVNode("view", { class: "txt" }, [
                  vue.createElementVNode("text", { class: "s1" }, "可提现"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString($data.withdrawableMoney) + "元",
                    1
                    /* TEXT */
                  )
                ])
              ])
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "ul-list1-xh" }, [
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/storeManagement/storeManagement",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/dianpu.png",
                style: { "width": "40rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", { class: "txt" }, [
              vue.createElementVNode("text", null, "店铺管理")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/application/applicationAll",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/shengqingjindu.png",
                style: { "width": "35rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", { class: "txt" }, [
              vue.createElementVNode("text", null, "申请进度")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/userOpinion/userOpinion",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/yijian.png",
                style: { "width": "35rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", { class: "txt" }, [
              vue.createElementVNode("text", null, "意见反馈")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/contactUs/contactUs",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/lianxiwomen.png",
                style: { "width": "35rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", { class: "txt" }, [
              vue.createElementVNode("text", null, "联系我们")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/unsubscribe/unsubscribe",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/zhuxiaozhanghu.png",
                style: { "width": "35rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", {
              class: "txt",
              style: { "border-bottom": "none" }
            }, [
              vue.createElementVNode("text", null, "注销账户")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "li" }, [
          vue.createElementVNode("navigator", {
            url: "/pages/personalCenter/changePassword/changePassword",
            "hover-class": "none"
          }, [
            vue.createElementVNode("view", { class: "pic" }, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/xiugaimima.png",
                style: { "width": "35rpx" },
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", {
              class: "txt",
              style: { "border-bottom": "none" }
            }, [
              vue.createElementVNode("text", null, "修改密码")
            ])
          ])
        ]),
        vue.createElementVNode("view", null, [
          vue.createVNode(
            _component_uv_popup,
            {
              ref: "popup",
              mode: "center"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { style: { "width": "600rpx" } }, [
                  vue.createElementVNode("text", { style: { "display": "block", "text-align": "center", "width": "300px", "margin-top": "20px", "margin-bottom": "50px", "color": "rgb(231 36 36)" } }, " 确认要退出吗？ "),
                  vue.createVNode(_component_uv_button, {
                    type: "default",
                    text: "确认退出",
                    onClick: $options.confirm,
                    style: { "margin-top": "20px", "background-color": "#ccdade36", "margin": "20px 5px 10px 5px" }
                  }, null, 8, ["onClick"]),
                  vue.createVNode(_component_uv_button, {
                    type: "default",
                    text: "取消",
                    onClick: $options.close,
                    style: { "margin-top": "30px", "background-color": "#ccdade36", "margin": "0px 5px 10px 5px" }
                  }, null, 8, ["onClick"])
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(_component_uv_button, {
            type: "error",
            text: "退出登录",
            onClick: $options.exitApp,
            style: { "margin-top": "100rpx" }
          }, null, 8, ["onClick"])
        ])
      ])
    ]);
  }
  const PagesPersonalCenterPersonalCenter = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/personalCenter.vue"]]);
  const _sfc_main$q = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 账单页面 ");
  }
  const PagesBillBill = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/bill/bill.vue"]]);
  const _sfc_main$p = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 报表页面 ");
  }
  const PagesReportFormsReportForms = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/reportForms/reportForms.vue"]]);
  const props$b = {
    props: {
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示下划线
      underLine: {
        type: Boolean,
        default: false
      },
      // 要跳转的链接
      href: {
        type: String,
        default: ""
      },
      // 小程序中复制到粘贴板的提示语
      mpTips: {
        type: String,
        default: "链接已复制，请在浏览器打开"
      },
      // 下划线颜色
      lineColor: {
        type: String,
        default: ""
      },
      // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
      text: {
        type: String,
        default: ""
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.link
    }
  };
  const _sfc_main$o = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$b],
    computed: {
      linkStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          // line-height设置为比字体大小多2px
          lineHeight: this.$uv.addUnit(this.$uv.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
        return style;
      }
    },
    methods: {
      openLink() {
        plus.runtime.openURL(this.href);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: "uv-link",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.openLink && $options.openLink(...args), ["stop"])),
        style: vue.normalizeStyle([$options.linkStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      vue.toDisplayString(_ctx.text),
      5
      /* TEXT, STYLE */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-86e87617"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
  const value = {
    computed: {
      // 经处理后需要显示的值
      value() {
        const {
          text,
          mode,
          format: format2,
          href
        } = this;
        if (mode === "price") {
          if (!/^\d+(\.\d+)?$/.test(text)) {
            error("金额模式下，text参数需要为金额格式");
          }
          if (func(format2)) {
            return format2(text);
          }
          return priceFormat(text, 2);
        }
        if (mode === "date") {
          !date$1(text) && error("日期模式下，text参数需要为日期或时间戳格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2) {
            return timeFormat(text, format2);
          }
          return timeFormat(text, "yyyy-mm-dd");
        }
        if (mode === "phone") {
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return `${text.substr(0, 3)}****${text.substr(7)}`;
          }
          return text;
        }
        if (mode === "name") {
          !(typeof text === "string") && error("姓名模式下，text参数需要为字符串格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return this.formatName(text);
          }
          return text;
        }
        if (mode === "link") {
          !url(href) && error("超链接模式下，href参数需要为URL格式");
          return text;
        }
        return text;
      }
    },
    methods: {
      // 默认的姓名脱敏规则
      formatName(name) {
        let value2 = "";
        if (name.length === 2) {
          value2 = name.substr(0, 1) + "*";
        } else if (name.length > 2) {
          let char = "";
          for (let i = 0, len = name.length - 2; i < len; i++) {
            char += "*";
          }
          value2 = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
          value2 = name;
        }
        return value2;
      }
    }
  };
  const props$a = {
    props: {
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 显示的值
      text: {
        type: [String, Number],
        default: ""
      },
      // 前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 文本处理的匹配模式
      // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
      mode: {
        type: String,
        default: ""
      },
      // mode=link下，配置的链接
      href: {
        type: String,
        default: ""
      },
      // 格式化规则
      format: {
        type: [String, Function],
        default: ""
      },
      // mode=phone时，点击文本是否拨打电话
      call: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 是否粗体，默认normal
      bold: {
        type: Boolean,
        default: false
      },
      // 是否块状
      block: {
        type: Boolean,
        default: false
      },
      // 文本显示的行数，如果设置，超出此行数，将会显示省略号
      lines: {
        type: [String, Number],
        default: ""
      },
      // 文本颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 字体大小
      size: {
        type: [String, Number],
        default: 15
      },
      // 图标的样式
      iconStyle: {
        type: [Object, String],
        default: () => ({
          fontSize: "15px"
        })
      },
      // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
      decoration: {
        type: String,
        default: "none"
      },
      // 外边距，对象、字符串，数值形式均可
      margin: {
        type: [Object, String, Number],
        default: 0
      },
      // 文本行高
      lineHeight: {
        type: [String, Number],
        default: ""
      },
      // 文本对齐方式，可选值left|center|right
      align: {
        type: String,
        default: "left"
      },
      // 文字换行，可选值break-word|normal|anywhere
      wordWrap: {
        type: String,
        default: "normal"
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.text
    }
  };
  const _sfc_main$n = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$a],
    computed: {
      valueStyle() {
        const style = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: this.$uv.addUnit(this.size)
        };
        !this.type && (style.color = this.color);
        this.isNvue && this.lines && (style.lines = this.lines);
        if (this.isNvue && this.mode != "price" && !this.prefixIcon && !this.suffixIcon) {
          style.flex = 1;
          style.textAlign = this.align === "left" ? "flex-start" : this.align === "center" ? "center" : "right";
        }
        this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
        !this.isNvue && this.block && (style.display = "block");
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      isNvue() {
        let nvue = false;
        return nvue;
      },
      isMp() {
        let mp = false;
        return mp;
      }
    },
    data() {
      return {};
    },
    methods: {
      clickHandler() {
        if (this.call && this.mode === "phone") {
          uni.makePhoneCall({
            phoneNumber: this.text
          });
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$4);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-text", []]),
        style: vue.normalizeStyle({
          margin: _ctx.margin,
          justifyContent: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end"
        }),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        _ctx.mode === "price" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uv-text__price", _ctx.type && `uv-text__value--${_ctx.type}`]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          "￥",
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uv-text__prefix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.prefixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_link, {
          key: 2,
          text: _ctx.value,
          href: _ctx.href,
          underLine: ""
        }, null, 8, ["text", "href"])) : _ctx.openType && $options.isMp ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 3,
          class: "uv-reset-button uv-text__value",
          style: vue.normalizeStyle([$options.valueStyle]),
          openType: _ctx.openType,
          onGetuserinfo: _cache[0] || (_cache[0] = (...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
          onContact: _cache[1] || (_cache[1] = (...args) => _ctx.onContact && _ctx.onContact(...args)),
          onGetphonenumber: _cache[2] || (_cache[2] = (...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
          onError: _cache[3] || (_cache[3] = (...args) => _ctx.onError && _ctx.onError(...args)),
          onLaunchapp: _cache[4] || (_cache[4] = (...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
          onOpensetting: _cache[5] || (_cache[5] = (...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
          lang: _ctx.lang,
          "session-from": _ctx.sessionFrom,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "app-parameter": _ctx.appParameter
        }, vue.toDisplayString(_ctx.value), 45, ["openType", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "app-parameter"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 4,
            class: vue.normalizeClass(["uv-text__value", [
              _ctx.type && `uv-text__value--${_ctx.type}`,
              _ctx.lines && `uv-line-${_ctx.lines}`
            ]]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          vue.toDisplayString(_ctx.value),
          7
          /* TEXT, CLASS, STYLE */
        )),
        _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "uv-text__suffix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.suffixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$9 = {
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 描述文本
      desc: {
        type: [String, Number],
        default: ""
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 17
      },
      // 当前步骤是否处于失败状态
      error: {
        type: Boolean,
        default: false
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.stepsItem
    }
  };
  const _sfc_main$m = {
    name: "uv-steps-item",
    mixins: [mpMixin, mixin, props$9],
    data() {
      return {
        index: 0,
        childLength: 0,
        showLine: false,
        size: {
          height: 0,
          width: 0
        },
        parentData: {
          direction: "row",
          current: 0,
          activeColor: "",
          inactiveColor: "",
          activeIcon: "",
          inactiveIcon: "",
          dot: false
        }
      };
    },
    watch: {
      "parentData"(newValue, oldValue) {
      }
    },
    created() {
      this.init();
    },
    computed: {
      lineStyle() {
        var _a, _b;
        const style = {};
        if (this.parentData.direction === "row") {
          style.width = this.size.width + "px";
          style.left = this.size.width / 2 + "px";
        } else {
          style.height = this.size.height + "px";
        }
        style.backgroundColor = ((_b = (_a = this.parent.children) == null ? void 0 : _a[this.index + 1]) == null ? void 0 : _b.error) ? "#f56c6c" : this.index < this.parentData.current ? this.parentData.activeColor : this.parentData.inactiveColor;
        return style;
      },
      statusClass() {
        const {
          index: index2,
          error: error2
        } = this;
        const {
          current
        } = this.parentData;
        if (current == index2) {
          return error2 === true ? "error" : "process";
        } else if (error2) {
          return "error";
        } else if (current > index2) {
          return "finish";
        } else {
          return "wait";
        }
      },
      statusColor() {
        let color = "";
        switch (this.statusClass) {
          case "finish":
            color = this.parentData.activeColor;
            break;
          case "error":
            color = "#f56c6c";
            break;
          case "process":
            color = this.parentData.dot ? this.parentData.activeColor : "transparent";
            break;
          default:
            color = this.parentData.inactiveColor;
            break;
        }
        return color;
      },
      contentStyle() {
        const style = {};
        if (this.parentData.direction === "column") {
          style.marginLeft = this.parentData.dot ? "2px" : "6px";
          style.marginTop = this.parentData.dot ? "0px" : "6px";
        } else {
          style.marginTop = this.parentData.dot ? "2px" : "6px";
          style.marginLeft = this.parentData.dot ? "2px" : "6px";
        }
        return style;
      }
    },
    mounted() {
      this.parent && this.parent.updateFromChild();
      this.$uv.sleep().then(() => {
        this.getStepsItemRect();
      });
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          return this.$uv.error("uv-steps-item必须要搭配uv-steps组件使用");
        }
        this.index = this.parent.children.indexOf(this);
        this.childLength = this.parent.children.length;
      },
      updateParentData() {
        this.getParentData("uv-steps");
      },
      // 父组件数据发生变化
      updateFromParent() {
        this.init();
      },
      // 获取组件的尺寸，用于设置横线的位置
      getStepsItemRect() {
        this.$uvGetRect(".uv-steps-item").then((size) => {
          this.size = size;
        });
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-steps-item", [`uv-steps-item--${$data.parentData.direction}`]]),
        ref: "uv-steps-item",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        $data.index + 1 < $data.childLength ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-steps-item__line", [`uv-steps-item__line--${$data.parentData.direction}`]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([
              "uv-steps-item__wrapper",
              `uv-steps-item__wrapper--${$data.parentData.direction}`,
              $data.parentData.dot && `uv-steps-item__wrapper--${$data.parentData.direction}--dot`
            ])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              $data.parentData.dot ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "uv-steps-item__wrapper__dot",
                  style: vue.normalizeStyle({
                    backgroundColor: $options.statusColor
                  })
                },
                null,
                4
                /* STYLE */
              )) : $data.parentData.activeIcon || $data.parentData.inactiveIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uv-steps-item__wrapper__icon"
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: $data.index <= $data.parentData.current ? $data.parentData.activeIcon : $data.parentData.inactiveIcon,
                  size: _ctx.iconSize,
                  color: $data.index <= $data.parentData.current ? $data.parentData.activeColor : $data.parentData.inactiveColor
                }, null, 8, ["name", "size", "color"])
              ])) : (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 2,
                  style: vue.normalizeStyle({
                    backgroundColor: $options.statusClass === "process" ? $data.parentData.activeColor : "transparent",
                    borderColor: $options.statusColor
                  }),
                  class: "uv-steps-item__wrapper__circle"
                },
                [
                  $options.statusClass === "process" || $options.statusClass === "wait" ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "uv-steps-item__wrapper__circle__text",
                      style: vue.normalizeStyle({
                        color: $data.index == $data.parentData.current ? "#ffffff" : $data.parentData.inactiveColor
                      })
                    },
                    vue.toDisplayString($data.index + 1),
                    5
                    /* TEXT, STYLE */
                  )) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 1,
                    color: $options.statusClass === "error" ? "error" : $data.parentData.activeColor,
                    size: "12",
                    name: $options.statusClass === "error" ? "close" : "checkmark"
                  }, null, 8, ["color", "name"]))
                ],
                4
                /* STYLE */
              ))
            ], true)
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([
              "uv-steps-item__content",
              `uv-steps-item__content--${$data.parentData.direction}`
            ]),
            style: vue.normalizeStyle([$options.contentStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createVNode(_component_uv_text, {
                text: _ctx.title,
                type: $data.parentData.current == $data.index ? "main" : "content",
                lineHeight: "20px",
                size: $data.parentData.current == $data.index ? 14 : 13
              }, null, 8, ["text", "type", "size"])
            ], true),
            vue.renderSlot(_ctx.$slots, "desc", {}, () => [
              vue.createVNode(_component_uv_text, {
                text: _ctx.desc,
                type: "tips",
                size: "12"
              }, null, 8, ["text"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-87a44040"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-steps/components/uv-steps-item/uv-steps-item.vue"]]);
  const props$8 = {
    props: {
      // 排列方向
      direction: {
        type: String,
        default: "row"
      },
      // 设置第几个步骤
      current: {
        type: [String, Number],
        default: 0
      },
      // 激活状态颜色
      activeColor: {
        type: String,
        default: "#3c9cff"
      },
      // 未激活状态颜色
      inactiveColor: {
        type: String,
        default: "#969799"
      },
      // 激活状态的图标
      activeIcon: {
        type: String,
        default: ""
      },
      // 未激活状态图标
      inactiveIcon: {
        type: String,
        default: ""
      },
      // 是否显示点类型
      dot: {
        type: Boolean,
        default: false
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.steps
    }
  };
  const _sfc_main$l = {
    name: "uv-steps",
    mixins: [mpMixin, mixin, props$8],
    data() {
      return {};
    },
    watch: {
      children() {
        this.updateChildData();
      },
      parentData() {
        this.updateChildData();
      }
    },
    computed: {
      // 监听参数的变化，通过watch中，手动去更新子组件的数据，否则子组件不会自动变化
      parentData() {
        return [this.current, this.direction, this.activeColor, this.inactiveColor, this.activeIcon, this.inactiveIcon, this.dot];
      }
    },
    methods: {
      // 更新子组件的数据
      updateChildData() {
        this.children.map((child) => {
          func((child || {}).updateFromParent()) && child.updateFromParent();
        });
      },
      // 接受子组件的通知，去修改其他子组件的数据
      updateFromChild() {
        this.updateChildData();
      }
    },
    created() {
      this.children = [];
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-steps", `uv-steps--${_ctx.direction}`]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-f7a17f77"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-steps/components/uv-steps/uv-steps.vue"]]);
  const _sfc_main$k = {
    data() {
      return {
        currentStep: 1,
        // 审核的进度
        isOutOfStock: false,
        // 审核是否错误
        applicationTitle: "审核中",
        applicationStatus: "",
        //审核的状态，用来渲染不同的提示信息
        applicationMsg: "",
        modifyApplicationMsg: "店铺名称错误，资质内容与营业执照冲突"
      };
    },
    mounted() {
      const applicationMsg = uni.getStorageSync("applicationMsg");
      this.applicationMsg = applicationMsg;
      formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:56", "参数:", applicationMsg);
      this.applicationStatus = applicationMsg.applicationUnit;
      if (applicationMsg.applicationUnit === "审核失败") {
        this.applicationTitle = "审核失败";
        this.isOutOfStock = true;
      }
      if (applicationMsg.applicationUnit === "审核通过") {
        this.currentStep = 3;
      }
    },
    methods: {
      modifyApplication() {
        formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:72", "参数:", this.applicationMsg);
        uni.switchTab({
          //保留当前页面，跳转到应用内的某个页面
          url: "/pages/personalCenter/personalCenter"
        });
      },
      cancellationApplication() {
        formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:79", "取消申请的逻辑代码");
        formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:81", "参数:", this.applicationMsg);
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_steps_item = resolveEasycom(vue.resolveDynamicComponent("uv-steps-item"), __easycom_0$1);
    const _component_uv_steps = resolveEasycom(vue.resolveDynamicComponent("uv-steps"), __easycom_1$2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_uv_steps, {
            current: $data.currentStep,
            style: { "margin-top": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_steps_item, { title: "已提交" }),
              vue.createVNode(_component_uv_steps_item, {
                error: $data.isOutOfStock,
                title: $data.applicationTitle
              }, null, 8, ["error", "title"]),
              vue.createVNode(_component_uv_steps_item, { title: "审核通过" })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["current"])
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "applicationStatusTitle" },
          [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/applicitionWait.png",
                class: "applicationImg"
              })
            ]),
            vue.createTextVNode(" 您的申请已提交，管理员审核中，请耐心等待！ "),
            vue.createVNode(_component_uv_button, {
              type: "error",
              text: "取消申请",
              onClick: $options.cancellationApplication,
              style: { "margin-top": "480rpx" }
            }, null, 8, ["onClick"])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.applicationStatus === "审核中"]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "applicationStatusTitle" },
          [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/applicitionSuccess.png",
                class: "applicationImg"
              })
            ]),
            vue.createTextVNode(" 恭喜你，审核通过了！ ")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.applicationStatus === "审核通过"]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "applicationStatusTitle" },
          [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("image", {
                src: "/static/personalCenter/applicitionError.png",
                class: "applicationImg"
              })
            ]),
            vue.createElementVNode("text", null, [
              vue.createTextVNode(" 抱歉，您的审核未通过，请根据提示进行修改后再次提交！"),
              vue.createElementVNode("br"),
              vue.createTextVNode(" 如有疑问，可联系客服电话：404-1234567！ ")
            ]),
            vue.createElementVNode("h4", { style: { "text-align": "left", "margin-top": "30rpx", "margin-bottom": "20rpx" } }, "修改意见："),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "color": "red" } },
                vue.toDisplayString($data.modifyApplicationMsg),
                1
                /* TEXT */
              )
            ]),
            vue.createVNode(_component_uv_button, {
              type: "error",
              text: "修改申请",
              onClick: $options.modifyApplication,
              style: { "margin-top": "300rpx" }
            }, null, 8, ["onClick"])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.applicationStatus === "审核失败"]
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesPersonalCenterApplicationApplicationStatus = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/application/applicationStatus.vue"]]);
  const _sfc_main$j = {
    components: {},
    data() {
      return {
        // 列表数组
        productList: []
      };
    },
    onLoad() {
      this.requestData();
    },
    methods: {
      // 列表条目点击事件
      goProDetail(item) {
        uni.setStorageSync("applicationMsg", item);
        uni.navigateTo({
          //保留当前页面，跳转到应用内的某个页面
          url: "/pages/personalCenter/application/applicationStatus"
        });
      },
      bindTag(item) {
        return [item.applicationTime];
      },
      bindColor(index2) {
        let colorArr = ["rgb(131 153 218)"];
        return colorArr[index2 % 3];
      },
      bindBgColor(index2) {
        let bgColorArr = ["#F1F4FA"];
        return bgColorArr[index2 % 3];
      },
      requestData() {
        this.productList = [];
        for (let i = 0; i < 6; i++) {
          if (i < 3) {
            this.productList.push({
              "storeName": "店铺名称" + i,
              "applicationUnit": "审核通过",
              "applicationTime": "申请时间：2024-4-9",
              "id": i + ""
            });
          } else if (i == 4) {
            this.productList.push({
              "storeName": "店铺名称" + i,
              "applicationUnit": "审核中",
              "applicationTime": "申请时间：2024-4-9",
              "id": i + ""
            });
          } else {
            this.productList.push({
              "storeName": "店铺名称" + i,
              "applicationUnit": "审核失败",
              "applicationTime": "申请时间：2024-4-9",
              "id": i + ""
            });
          }
        }
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", null, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.productList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "uni-list-cell",
              "hover-class": "uni-list-cell-hover",
              key: item.id,
              onClick: ($event) => $options.goProDetail(item)
            }, [
              vue.createElementVNode(
                "view",
                { class: "topTitleV" },
                vue.toDisplayString(item.storeName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "topTitleV unitV",
                  style: vue.normalizeStyle({
                    color: item.applicationUnit === "审核通过" ? "green" : item.applicationUnit === "审核中" ? "blue" : "red"
                  })
                },
                vue.toDisplayString(item.applicationUnit),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { style: { "display": "flex", "flex": "1", "flex-wrap": "wrap", "margin-top": "0rpx", "margin-left": "-8rpx", "height": "100rpx", "width": "calc(100vw-62rpx)" } }, [
                vue.createCommentVNode(" 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类"),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.bindTag(item), (tagItem, index3) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: "cellView",
                        style: vue.normalizeStyle({ color: $options.bindColor(index3), backgroundColor: $options.bindBgColor(index3) }),
                        key: index3
                      },
                      vue.toDisplayString(tagItem),
                      5
                      /* TEXT, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesPersonalCenterApplicationApplicationAll = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/application/applicationAll.vue"]]);
  const _sfc_main$i = {
    components: {},
    data() {
      return {
        // 列表数组
        productList: []
      };
    },
    onLoad() {
      this.requestData();
    },
    methods: {
      // 列表条目点击事件
      goProDetail(item) {
        uni.setStorageSync("storeMsg", item);
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeManagement.vue:44", uni.getStorageSync("storeMsg"));
        uni.navigateTo({
          //保留当前页面，跳转到应用内的某个页面
          url: "/pages/personalCenter/storeManagement/storeDetails/storeDetails"
        });
      },
      requestData() {
        this.productList = [];
        for (let i = 0; i < 6; i++) {
          this.productList.push({
            "storeName": "开心麻辣烫" + i,
            "storeId": "md1234564654654654",
            "storeAddress": "香港特别行政区油尖旺区尖沙咀金马伦道22-24号东丽中心",
            "storeImg": "../../../static/personalCenter/store.jpg",
            "id": i + ""
          });
        }
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", null, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.productList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "uni-list-cell",
              "hover-class": "uni-list-cell-hover",
              key: item.id,
              onClick: ($event) => $options.goProDetail(item)
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "view",
                  { class: "storeMsg" },
                  "店铺名：" + vue.toDisplayString(item.storeName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "storeMsg" },
                  " 商铺ID：" + vue.toDisplayString(item.storeId),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "storeMsg",
                    style: { "margin-bottom": "30rpx" }
                  },
                  " 地址：" + vue.toDisplayString(item.storeAddress),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("image", {
                  class: "storeImg",
                  src: item.storeImg
                }, null, 8, ["src"])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesPersonalCenterStoreManagementStoreManagement = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/storeManagement/storeManagement.vue"]]);
  const props$7 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框为空时占位符
      placeholder: {
        type: [String, Number],
        default: ""
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "textarea-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 输入框高度
      height: {
        type: [String, Number],
        default: 70
      },
      // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
      confirmType: {
        type: String,
        default: "return"
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示统计字数
      count: {
        type: Boolean,
        default: false
      },
      // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
      focus: {
        type: Boolean,
        default: false
      },
      // 是否自动增加高度
      autoHeight: {
        type: Boolean,
        default: false
      },
      // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
      fixed: {
        type: Boolean,
        default: false
      },
      // 指定光标与键盘的距离
      cursorSpacing: {
        type: Number,
        default: 0
      },
      // 指定focus时的光标位置
      cursor: {
        type: [String, Number],
        default: ""
      },
      // 是否显示键盘上方带有”完成“按钮那一栏，
      showConfirmBar: {
        type: Boolean,
        default: true
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: Number,
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: Number,
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 是否去掉 iOS 下的默认内边距，只微信小程序有效
      disableDefaultPadding: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，只微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: 140
      },
      // 边框类型，surround-四周边框，bottom-底部边框
      border: {
        type: String,
        default: "surround"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      // 是否忽略组件内对文本合成系统事件的处理
      confirmHold: {
        type: Boolean,
        default: false
      },
      // 文本样式
      textStyle: {
        type: [Object, String],
        default: () => {
        }
      },
      // 统计数字的样式
      countStyle: {
        type: [Object, String],
        default: () => {
        }
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.textarea
    }
  };
  const _sfc_main$h = {
    name: "uv-textarea",
    mixins: [mpMixin, mixin, props$7],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    created() {
      this.innerValue = this.modelValue;
    },
    watch: {
      value(newVal) {
        this.innerValue = newVal;
      },
      modelValue(newVal) {
        this.innerValue = newVal;
      }
    },
    computed: {
      // 组件的类名
      textareaClass() {
        let classes = [], { border, disabled } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-textarea--radius"]));
        border === "bottom" && (classes = classes.concat(["uv-border-bottom", "uv-textarea--no-radius"]));
        disabled && classes.push("uv-textarea--disabled");
        return classes.join(" ");
      },
      // 组件的样式
      textareaStyle() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      maxlen() {
        return this.maxlength < 0 ? this.maxlength < 0 ? -1 : 140 : this.maxlength;
      },
      getCount() {
        try {
          return this.innerValue.length > this.maxlen ? this.maxlen : this.innerValue.length;
        } catch (e) {
          return 0;
        }
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      onFocus(e) {
        this.$emit("focus", e);
      },
      onBlur(e) {
        this.$emit("blur", e);
        this.$uv.formValidate(this, "blur");
      },
      onLinechange(e) {
        this.$emit("linechange", e);
      },
      onInput(e) {
        let { value: value2 = "" } = e.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("input", value2);
          this.$emit("update:modelValue", value2);
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      onConfirm(e) {
        this.$emit("confirm", e);
      },
      onKeyboardheightchange(e) {
        this.$emit("keyboardheightchange", e);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-textarea", $options.textareaClass]),
        style: vue.normalizeStyle([$options.textareaStyle])
      },
      [
        vue.createElementVNode("textarea", {
          class: "uv-textarea__field",
          value: $data.innerValue,
          style: vue.normalizeStyle([
            { height: _ctx.autoHeight ? "auto" : _ctx.$uv.addUnit(_ctx.height) },
            _ctx.$uv.addStyle(_ctx.textStyle)
          ]),
          placeholder: _ctx.placeholder,
          "placeholder-style": _ctx.$uv.addStyle(_ctx.placeholderStyle, "string"),
          "placeholder-class": _ctx.placeholderClass,
          disabled: _ctx.disabled,
          focus: _ctx.focus,
          autoHeight: _ctx.autoHeight,
          fixed: _ctx.fixed,
          cursorSpacing: _ctx.cursorSpacing,
          cursor: _ctx.cursor,
          showConfirmBar: _ctx.showConfirmBar,
          selectionStart: _ctx.selectionStart,
          selectionEnd: _ctx.selectionEnd,
          adjustPosition: _ctx.adjustPosition,
          disableDefaultPadding: _ctx.disableDefaultPadding,
          holdKeyboard: _ctx.holdKeyboard,
          maxlength: $options.maxlen,
          confirmType: _ctx.confirmType,
          ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
          "confirm-hold": _ctx.confirmHold,
          onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onLinechange: _cache[2] || (_cache[2] = (...args) => $options.onLinechange && $options.onLinechange(...args)),
          onInput: _cache[3] || (_cache[3] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args))
        }, null, 44, ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "focus", "autoHeight", "fixed", "cursorSpacing", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "adjustPosition", "disableDefaultPadding", "holdKeyboard", "maxlength", "confirmType", "ignoreCompositionEvent", "confirm-hold"]),
        _ctx.count && $options.maxlen != -1 ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-textarea__count",
            style: vue.normalizeStyle([{
              "background-color": _ctx.disabled ? "transparent" : "#fff"
            }, _ctx.$uv.addStyle(_ctx.countStyle)])
          },
          vue.toDisplayString($options.getCount) + "/" + vue.toDisplayString($options.maxlen),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-d5a7e73a"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        value: ""
      };
    },
    methods: {
      submit() {
        formatAppLog("log", "at pages/personalCenter/userOpinion/userOpinion.vue:27", this.value);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_textarea = resolveEasycom(vue.resolveDynamicComponent("uv-textarea"), __easycom_2$2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "input-box" }, [
        vue.createElementVNode("view", { class: "title" }, "意见反馈"),
        vue.createVNode(_component_uv_textarea, {
          count: "",
          modelValue: $data.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
          placeholder: "您的反馈对我们非常重要,请在此输入!",
          height: "10rem",
          maxlength: "200"
        }, null, 8, ["modelValue"])
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_button, {
          type: "warning",
          text: "提交反馈",
          onClick: $options.submit,
          style: { "width": "660rpx", "margin": "auto", "margin-top": "200rpx" }
        }, null, 8, ["onClick"])
      ])
    ]);
  }
  const PagesPersonalCenterUserOpinionUserOpinion = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-226f5526"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/userOpinion/userOpinion.vue"]]);
  const props$6 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框类型
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: "text"
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: "#f5f7fa"
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: false
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: null
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "input-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: "done"
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: false
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: -1
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: 30
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: -1
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: "14px"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: "surround"
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: false
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.input
    }
  };
  const _sfc_main$f = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    created() {
      this.innerValue = this.modelValue;
    },
    watch: {
      value(newVal) {
        this.innerValue = newVal;
      },
      modelValue(newVal) {
        this.innerValue = newVal;
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-input--radius"]));
        classes.push(`uv-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "uv-border-bottom",
          "uv-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        if (this.disabled || this.readonly) {
          style["pointer-events"] = "none";
        }
        return style;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // 当键盘输入时，触发input事件
      onInput(e) {
        let { value: value2 = "" } = e.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        this.$uv.sleep(100).then(() => {
          this.focused = false;
        });
        this.$uv.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange(e) {
        this.$emit("keyboardheightchange", e);
      },
      // 内容发生变化，进行处理
      valueChange() {
        if (this.isClear)
          this.innerValue = "";
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("input", value2);
          this.$emit("update:modelValue", value2);
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.isClear = true;
        this.$uv.sleep(200).then((res) => {
          this.isClear = false;
        });
        this.$nextTick(() => {
          this.$emit("clear");
          this.valueChange();
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听uv-from-item的点击事件，此时会导致点击uv-form-item内的uv-input后
       * 无法触发uv-form-item的点击事件，这里通过手动调用uv-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "uv-input__content" }, [
          vue.createElementVNode("view", { class: "uv-input__content__prefix-icon" }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            class: "uv-input__content__field-wrapper",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\r\n				为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\r\n			 "),
            vue.createElementVNode("input", {
              class: "uv-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-input__content__clear",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uv-input__content__subfix-icon" }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ])
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-651602aa"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  const props$5 = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.line
    }
  };
  const _sfc_main$e = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$5],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props$4 = {
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [Boolean],
        default: false
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      leftIconStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.formItem
    }
  };
  const _sfc_main$d = {
    name: "uv-form-item",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {
        // 错误提示语
        message: "",
        parentData: {
          // 提示文本的位置
          labelPosition: "left",
          // 提示文本对齐方式
          labelAlign: "left",
          // 提示文本的样式
          labelStyle: {},
          // 提示文本的宽度
          labelWidth: 45,
          // 错误提示方式
          errorType: "message"
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-form-item需要结合uv-form组件使用");
        }
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-form");
      },
      // 移除uv-form-item的校验结果
      clearValidate() {
        this.message = null;
      },
      // 清空当前的组件的校验结果，并重置为初始值
      resetField() {
        const value2 = this.$uv.getProperty(this.parent.originalModel, this.prop);
        this.$uv.setProperty(this.parent.model, this.prop, value2);
        this.message = null;
      },
      // 点击组件
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$6);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form-item" }, [
      vue.createElementVNode(
        "view",
        {
          class: "uv-form-item__body",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
          style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), {
            flexDirection: (_ctx.labelPosition || $data.parentData.labelPosition) === "left" ? "row" : "column"
          }])
        },
        [
          vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
          vue.renderSlot(_ctx.$slots, "label", {}, () => [
            _ctx.required || _ctx.leftIcon || _ctx.label ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "uv-form-item__body__left",
                style: vue.normalizeStyle({
                  width: _ctx.$uv.addUnit(_ctx.labelWidth || $data.parentData.labelWidth),
                  marginBottom: $data.parentData.labelPosition === "left" ? 0 : "5px"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                vue.createElementVNode("view", { class: "uv-form-item__body__left__content" }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  _ctx.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "uv-form-item__body__left__content__required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-form-item__body__left__content__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: _ctx.leftIcon,
                      "custom-style": _ctx.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "uv-form-item__body__left__content__label",
                      style: vue.normalizeStyle([$data.parentData.labelStyle, {
                        justifyContent: $data.parentData.labelAlign === "left" ? "flex-start" : $data.parentData.labelAlign === "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString(_ctx.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode("view", { class: "uv-form-item__body__right" }, [
            vue.createElementVNode("view", { class: "uv-form-item__body__right__content" }, [
              vue.createElementVNode("view", { class: "uv-form-item__body__right__content__slot" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "item__body__right__content__icon" }, [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ])
            ])
          ])
        ],
        4
        /* STYLE */
      ),
      vue.renderSlot(_ctx.$slots, "error", {}, () => [
        !!$data.message && $data.parentData.errorType === "message" ? (vue.openBlock(), vue.createBlock(_component_uv_transition, {
          key: 0,
          show: true,
          duration: 100,
          mode: "fade"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "text",
              {
                class: "uv-form-item__body__right__message",
                style: vue.normalizeStyle({
                  marginLeft: _ctx.$uv.addUnit($data.parentData.labelPosition === "top" ? 0 : _ctx.labelWidth || $data.parentData.labelWidth)
                })
              },
              vue.toDisplayString($data.message),
              5
              /* TEXT, STYLE */
            )
          ]),
          _: 1
          /* STABLE */
        })) : vue.createCommentVNode("v-if", true)
      ], true),
      _ctx.borderBottom ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
        key: 0,
        color: $data.message && $data.parentData.errorType === "border-bottom" ? "#f56c6c" : "#d6d7d9"
      }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-d1e73275"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);
  const _sfc_main$c = {
    props: {
      src: {
        type: String,
        default: ""
      },
      autoplay: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        videoSrc: "",
        show: false
      };
    },
    computed: {
      getSec() {
        return this.src || this.videoSrc;
      }
    },
    methods: {
      open(url2) {
        this.videoSrc = url2;
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      change(e) {
        this.show = e.show;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "popup",
      onChange: $options.change
    }, {
      default: vue.withCtx(() => [
        $data.show ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "video-view"
        }, [
          vue.createElementVNode("video", {
            class: "video",
            src: $options.getSec,
            autoplay: $props.autoplay
          }, null, 8, ["src", "autoplay"])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    }, 8, ["onChange"]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-0e12a980"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-upload/components/uv-preview-video/uv-preview-video.vue"]]);
  function pickExclude(obj, keys) {
    if (!["[object Object]", "[object File]"].includes(Object.prototype.toString.call(obj))) {
      return {};
    }
    return Object.keys(obj).reduce((prev, key) => {
      if (!keys.includes(key)) {
        prev[key] = obj[key];
      }
      return prev;
    }, {});
  }
  function formatImage(res) {
    return res.tempFiles.map((item) => ({
      ...pickExclude(item, ["path"]),
      type: "image",
      url: item.path,
      thumb: item.path,
      size: item.size
    }));
  }
  function formatVideo(res) {
    return [
      {
        ...pickExclude(res, ["tempFilePath", "thumbTempFilePath", "errMsg"]),
        type: "video",
        url: res.tempFilePath,
        thumb: res.thumbTempFilePath,
        size: res.size
      }
    ];
  }
  function chooseFile({
    accept,
    multiple,
    capture,
    compressed,
    maxDuration,
    sizeType,
    camera,
    maxCount
  }) {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case "image":
          uni.chooseImage({
            count: multiple ? Math.min(maxCount, 9) : 1,
            sourceType: capture,
            sizeType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
          break;
        case "video":
          uni.chooseVideo({
            sourceType: capture,
            compressed,
            maxDuration,
            camera,
            success: (res) => resolve(formatVideo(res)),
            fail: reject
          });
          break;
      }
    });
  }
  const mixin_accept = {
    watch: {
      // 监听accept的变化，判断是否符合个平台要求
      // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
      accept: {
        immediate: true,
        handler(val) {
          if (val === "all" || val === "media") {
            error("只有微信小程序才支持把accept配置为all、media之一");
          }
          if (val === "file") {
            error("只有微信小程序和H5(HX2.9.9)才支持把accept配置为file");
          }
        }
      }
    }
  };
  const props$3 = {
    props: {
      // 接受的文件类型, 可选值为all media image file video
      accept: {
        type: String,
        default: "image"
      },
      // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
      capture: {
        type: [String, Array],
        default: () => ["album", "camera"]
      },
      // 当accept为video时生效，是否压缩视频，默认为true
      compressed: {
        type: Boolean,
        default: true
      },
      // 当accept为video时生效，可选值为back或front
      camera: {
        type: String,
        default: "back"
      },
      // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
      maxDuration: {
        type: Number,
        default: 60
      },
      // 上传区域的图标，只能内置图标
      uploadIcon: {
        type: String,
        default: "camera-fill"
      },
      // 上传区域的图标的颜色，默认
      uploadIconColor: {
        type: String,
        default: "#D3D4D6"
      },
      // 是否开启文件读取前事件
      useBeforeRead: {
        type: Boolean,
        default: false
      },
      // 读取后的处理函数
      afterRead: {
        type: Function,
        default: null
      },
      // 读取前的处理函数
      beforeRead: {
        type: Function,
        default: null
      },
      // 是否开启图片预览功能
      previewFullImage: {
        type: Boolean,
        default: true
      },
      // 是否开启视频预览功能
      previewFullVideo: {
        type: Boolean,
        default: true
      },
      // 最大上传数量
      maxCount: {
        type: [String, Number],
        default: 52
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 预览上传的图片时的裁剪模式，和image组件mode属性一致
      imageMode: {
        type: String,
        default: "aspectFill"
      },
      // 标识符，可以在回调函数的第二项参数中获取
      name: {
        type: String,
        default: ""
      },
      // 所选的图片的尺寸, 可选值为original compressed
      sizeType: {
        type: Array,
        default: () => ["original", "compressed"]
      },
      // 是否开启图片多选，部分安卓机型不支持
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否展示删除按钮
      deletable: {
        type: Boolean,
        default: true
      },
      // 文件大小限制，单位为byte
      maxSize: {
        type: [String, Number],
        default: Number.MAX_VALUE
      },
      // 显示已上传的文件列表
      fileList: {
        type: Array,
        default: () => []
      },
      // 上传区域的提示文字
      uploadText: {
        type: String,
        default: ""
      },
      // 内部预览图片区域和选择图片按钮的区域宽度
      width: {
        type: [String, Number],
        default: 80
      },
      // 内部预览图片区域和选择图片按钮的区域高度
      height: {
        type: [String, Number],
        default: 80
      },
      // 是否在上传完成后展示预览图
      previewImage: {
        type: Boolean,
        default: true
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.upload
    }
  };
  const _sfc_main$b = {
    name: "uv-upload",
    emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
    mixins: [mpMixin, mixin, mixin_accept, props$3],
    data() {
      return {
        lists: [],
        isInCount: true
      };
    },
    watch: {
      // 监听文件列表的变化，重新整理内部数据
      fileList: {
        deep: true,
        immediate: true,
        handler() {
          this.formatFileList();
        }
      },
      deletable(newVal) {
        if (!newVal) {
          this.lists.map((item) => {
            item.deletable = this.deletable;
          });
        }
      }
    },
    methods: {
      formatFileList() {
        const {
          fileList = [],
          maxCount
        } = this;
        const lists = fileList.map(
          (item) => Object.assign(Object.assign({}, item), {
            // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
            isImage: this.accept === "image" || image(item.url || item.thumb),
            isVideo: this.accept === "video" || video(item.url || item.thumb),
            deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
          })
        );
        this.lists = lists;
        this.isInCount = lists.length < maxCount;
      },
      chooseFile() {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          const {
            maxCount,
            multiple,
            lists,
            disabled
          } = this;
          if (disabled)
            return;
          let capture;
          try {
            capture = array$1(this.capture) ? this.capture : this.capture.split(",");
          } catch (e) {
            capture = [];
          }
          chooseFile(
            Object.assign({
              accept: this.accept,
              multiple: this.multiple,
              capture,
              compressed: this.compressed,
              maxDuration: this.maxDuration,
              sizeType: this.sizeType,
              camera: this.camera
            }, {
              maxCount: maxCount - lists.length
            })
          ).then((res) => {
            this.onBeforeRead(multiple ? res : res[0]);
          }).catch((error2) => {
            this.$emit("error", error2);
          });
        }, 100);
      },
      // 文件读取之前
      onBeforeRead(file) {
        const {
          beforeRead,
          useBeforeRead
        } = this;
        let res = true;
        if (func(beforeRead)) {
          res = beforeRead(file, this.getDetail());
        }
        if (useBeforeRead) {
          res = new Promise((resolve, reject) => {
            this.$emit(
              "beforeRead",
              Object.assign(Object.assign({
                file
              }, this.getDetail()), {
                callback: (ok) => {
                  ok ? resolve() : reject();
                }
              })
            );
          });
        }
        if (!res) {
          return;
        }
        if (promise(res)) {
          res.then((data) => this.onAfterRead(data || file));
        } else {
          this.onAfterRead(file);
        }
      },
      getDetail(index2) {
        return {
          name: this.name,
          index: index2 == null ? this.fileList.length : index2
        };
      },
      onAfterRead(file) {
        const {
          maxSize,
          afterRead
        } = this;
        const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
        if (oversize) {
          this.$emit("oversize", Object.assign({
            file
          }, this.getDetail()));
          return;
        }
        if (typeof afterRead === "function") {
          afterRead(file, this.getDetail());
        }
        this.$emit("afterRead", Object.assign({
          file
        }, this.getDetail()));
      },
      deleteItem(index2) {
        this.$emit(
          "delete",
          Object.assign(Object.assign({}, this.getDetail(index2)), {
            file: this.fileList[index2]
          })
        );
      },
      // 预览图片
      onPreviewImage(item, index2) {
        const lists = this.$uv.deepClone(this.lists);
        lists.map((i, j) => {
          if (j == index2) {
            i.current = true;
          }
        });
        const filters = lists.filter((i) => i.isImage);
        const findIndex = filters.findIndex((i) => i.current);
        this.onClickPreview(item, index2);
        if (!item.isImage || !this.previewFullImage)
          return;
        uni.previewImage({
          // 先filter找出为图片的item，再返回filter结果中的图片url
          urls: this.lists.filter((item2) => this.accept === "image" || image(item2.url || item2.thumb)).map((item2) => item2.url || item2.thumb),
          current: findIndex,
          fail() {
            this.$uv.toast("预览图片失败");
          }
        });
      },
      onPreviewVideo(item, index2) {
        this.onClickPreview(item, index2);
        if (!this.previewFullVideo || !item.isVideo)
          return;
        this.$refs.previewVideo.open(item.url);
      },
      onClickPreview(item, index2) {
        this.$emit(
          "clickPreview",
          Object.assign(Object.assign({}, item), this.getDetail(index2))
        );
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$4);
    const _component_uv_preview_video = resolveEasycom(vue.resolveDynamicComponent("uv-preview-video"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-upload",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode("view", { class: "uv-upload__wrap" }, [
          _ctx.previewImage ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList($data.lists, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "uv-upload__wrap__preview",
                key: index2
              }, [
                item.isImage || item.type && item.type === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: item.thumb || item.url,
                  mode: _ctx.imageMode,
                  class: "uv-upload__wrap__preview__image",
                  onClick: ($event) => $options.onPreviewImage(item, index2),
                  style: vue.normalizeStyle([{
                    width: _ctx.$uv.addUnit(_ctx.width),
                    height: _ctx.$uv.addUnit(_ctx.height)
                  }])
                }, null, 12, ["src", "mode", "onClick"])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "uv-upload__wrap__preview__other",
                  onClick: ($event) => $options.onPreviewVideo(item, index2),
                  style: vue.normalizeStyle([{
                    width: _ctx.$uv.addUnit(_ctx.width),
                    height: _ctx.$uv.addUnit(_ctx.height)
                  }])
                }, [
                  vue.createVNode(_component_uv_icon, {
                    color: "#80CBF9",
                    size: "26",
                    name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
                  }, null, 8, ["name"]),
                  vue.createElementVNode(
                    "text",
                    { class: "uv-upload__wrap__preview__other__text" },
                    vue.toDisplayString(item.isVideo || item.type && item.type === "video" ? "视频" : "文件"),
                    1
                    /* TEXT */
                  )
                ], 12, ["onClick"])),
                item.status === "uploading" || item.status === "failed" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "uv-upload__status"
                }, [
                  vue.createElementVNode("view", { class: "uv-upload__status__icon" }, [
                    item.status === "failed" ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                      key: 0,
                      name: "close-circle",
                      color: "#ffffff",
                      size: "25"
                    })) : (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
                      key: 1,
                      size: "22",
                      mode: "circle"
                    }))
                  ]),
                  item.message ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "uv-upload__status__message"
                    },
                    vue.toDisplayString(item.message),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ])) : vue.createCommentVNode("v-if", true),
                item.status !== "uploading" && (_ctx.deletable || item.deletable) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 3,
                  class: "uv-upload__deletable",
                  onClick: vue.withModifiers(($event) => $options.deleteItem(index2), ["stop"])
                }, [
                  vue.createElementVNode("view", { class: "uv-upload__deletable__icon" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "close",
                      color: "#ffffff",
                      size: "10"
                    })
                  ])
                ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                item.status === "success" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 4,
                  class: "uv-upload__success"
                }, [
                  vue.createElementVNode("view", { class: "uv-upload__success__icon" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "checkmark",
                      color: "#ffffff",
                      size: "12"
                    })
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          $data.isInCount ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.chooseFile && $options.chooseFile(...args))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["uv-upload__button", [_ctx.disabled && "uv-upload__button--disabled"]]),
                "hover-class": !_ctx.disabled ? "uv-upload__button--hover" : "",
                "hover-stay-time": "150",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.chooseFile && $options.chooseFile(...args), ["stop"])),
                style: vue.normalizeStyle([{
                  width: _ctx.$uv.addUnit(_ctx.width),
                  height: _ctx.$uv.addUnit(_ctx.height)
                }])
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: _ctx.uploadIcon,
                  size: "26",
                  color: _ctx.uploadIconColor
                }, null, 8, ["name", "color"]),
                _ctx.uploadText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uv-upload__button__text"
                  },
                  vue.toDisplayString(_ctx.uploadText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ], 14, ["hover-class"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createVNode(
          _component_uv_preview_video,
          { ref: "previewVideo" },
          null,
          512
          /* NEED_PATCH */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-822c46b5"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-upload/components/uv-upload/uv-upload.vue"]]);
  const props$2 = {
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default: () => ({})
      },
      // 验证规则
      rules: {
        type: [Object, Function, Array],
        default: () => ({})
      },
      // 有错误时的提示方式，message-提示信息，toast-进行toast提示
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: String,
        default: "message"
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: 45
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default: () => ({})
      },
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.form
    }
  };
  const formatRegExp = /%[sdj%]/g;
  let warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every((e) => typeof e === "string")) {
          formatAppLog("warn", "at uni_modules/uv-form/components/uv-form/valid.js:28", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    const fields = {};
    errors.forEach((error2) => {
      const { field } = error2;
      fields[field] = fields[field] || [];
      fields[field].push(error2);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let i = 1;
    const f = args[0];
    const len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      let str = String(f).replace(formatRegExp, (x) => {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (let arg = args[i]; i < len; arg = args[++i]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value2 === "string" && !value2) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    const results = [];
    let total = 0;
    const arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach((a) => {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    let index2 = 0;
    const arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      const original = index2;
      index2 += 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    const ret = [];
    Object.keys(objArr).forEach((k) => {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      const _pending = new Promise((resolve, reject) => {
        const next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        const flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending.catch((e) => e);
      return _pending;
    }
    let firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    const objArrKeys = Object.keys(objArr);
    const objArrLength = objArrKeys.length;
    let total = 0;
    const results = [];
    const pending = new Promise((resolve, reject) => {
      const next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach((key) => {
        const arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending.catch((e) => e);
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (const s in source) {
        if (source.hasOwnProperty(s)) {
          const value2 = source[s];
          if (typeof value2 === "object" && typeof target[s] === "object") {
            target[s] = { ...target[s], ...value2 };
          } else {
            target[s] = value2;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value2, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value2, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value2, source, errors, options) {
    if (/^\s+$/.test(value2) || value2 === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  const pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value2) {
      return /^(-)?\d+$/.test(value2);
    },
    float: function float(value2) {
      return /^(-)?\d+(\.\d+)?$/.test(value2);
    },
    array: function array2(value2) {
      return Array.isArray(value2);
    },
    regexp: function regexp2(value2) {
      if (value2 instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value2);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value2) {
      return typeof value2.getTime === "function" && typeof value2.getMonth === "function" && typeof value2.getYear === "function";
    },
    number: function number2(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof +value2 === "number";
    },
    object: function object2(value2) {
      return typeof value2 === "object" && !types.array(value2);
    },
    method: function method2(value2) {
      return typeof value2 === "function";
    },
    email: function email2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.email) && value2.length < 255;
    },
    url: function url2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.url);
    },
    hex: function hex(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.hex);
    }
  };
  function type(rule, value2, source, errors, options) {
    if (rule.required && value2 === void 0) {
      required(rule, value2, source, errors, options);
      return;
    }
    const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    const ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value2)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value2 !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range(rule, value2, source, errors, options) {
    const len = typeof rule.len === "number";
    const min = typeof rule.min === "number";
    const max = typeof rule.max === "number";
    const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    let val = value2;
    let key = null;
    const num = typeof value2 === "number";
    const str = typeof value2 === "string";
    const arr = Array.isArray(value2);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value2.length;
    }
    if (str) {
      val = value2.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  const ENUM = "enum";
  function enumerable(rule, value2, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value2) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value2, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        const _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      }
    }
  }
  const rules = {
    required,
    whitespace,
    type,
    range,
    enum: enumerable,
    pattern: pattern$1
  };
  function string(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "string");
      if (!isEmptyValue(value2, "string")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
        rules.pattern(rule, value2, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value2, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function number(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value2 === "") {
        value2 = void 0;
      }
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function array(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "array");
      if (!isEmptyValue(value2, "array")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function object(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  const ENUM$1 = "enum";
  function enumerable$1(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules[ENUM$1](rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2, "string")) {
        rules.pattern(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function date(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2)) {
        let dateObject;
        if (typeof value2 === "number") {
          dateObject = new Date(value2);
        } else {
          dateObject = value2;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value2, callback, source, options) {
    const errors = [];
    const type2 = Array.isArray(value2) ? "array" : typeof value2;
    rules.required(rule, value2, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value2, callback, source, options) {
    const ruleType = rule.type;
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, ruleType);
      if (!isEmptyValue(value2, ruleType)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
    }
    callback(errors);
  }
  const validators = {
    string,
    method,
    number,
    boolean: _boolean,
    regexp,
    integer,
    float: floatFn,
    array,
    object,
    enum: enumerable$1,
    pattern: pattern$2,
    date,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      default: "Validation error on field %s",
      required: "%s is required",
      enum: "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        boolean: "%s is not a %s",
        integer: "%s is not an %s",
        float: "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        const cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  const messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      let z;
      let item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      const _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      let source = source_;
      let options = o;
      let callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        let i;
        let errors = [];
        let fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            let _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        let messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      let arr;
      let value2;
      const series = {};
      const keys = options.keys || Object.keys(this.rules);
      keys.forEach((z) => {
        arr = _this.rules[z];
        value2 = source[z];
        arr.forEach((r) => {
          let rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = { ...source };
            }
            value2 = source[z] = rule.transform(value2);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = { ...rule };
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value: value2,
            source,
            field: z
          });
        });
      });
      const errorFields = {};
      return asyncMap(series, options, (data, doIt) => {
        const { rule } = data;
        let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return { ...schema, fullField: `${rule.fullField}.${key}` };
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          let errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            let fieldsSchema = {};
            if (rule.defaultField) {
              for (const k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
            for (const f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                const fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            const schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, (errs) => {
              const finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        let res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || `${rule.field} fails`);
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(() => cb(), (e) => cb(e));
        }
      }, (results) => {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      const keys = Object.keys(rule);
      const messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$a = {
    name: "uv-form",
    mixins: [mpMixin, mixin, props$2],
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        formRules: {},
        // 规则校验器
        validator: {},
        // 原始的model快照，用于resetFields方法重置表单时使用
        originalModel: null
      };
    },
    watch: {
      // 监听规则的变化
      rules: {
        immediate: true,
        handler(n) {
          this.setRules(n);
        }
      },
      // 监听属性的变化，通知子组件uv-form-item重新获取信息
      propsChange(n) {
        var _a;
        if ((_a = this.children) == null ? void 0 : _a.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      },
      // 监听model的初始值作为重置表单的快照
      model: {
        immediate: true,
        handler(n) {
          if (!this.originalModel) {
            this.originalModel = this.$uv.deepClone(n);
          }
        }
      }
    },
    computed: {
      propsChange() {
        return [
          this.errorType,
          this.borderBottom,
          this.labelPosition,
          this.labelWidth,
          this.labelAlign,
          this.labelStyle
        ];
      }
    },
    created() {
      this.children = [];
    },
    methods: {
      // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
      setRules(rules2) {
        if (Object.keys(rules2).length === 0)
          return;
        if (Object.keys(this.model).length === 0) {
          this.$uv.error("设置rules，model必须设置！如果已经设置，请刷新页面。");
          return;
        }
        this.formRules = rules2;
        this.validator = new Schema(rules2);
      },
      // 清空所有uv-form-item组件的内容，本质上是调用了uv-form-item组件中的resetField()方法
      resetFields() {
        this.resetModel();
      },
      // 重置model为初始值的快照
      resetModel(obj) {
        this.children.map((child) => {
          const prop = child == null ? void 0 : child.prop;
          const value2 = this.$uv.getProperty(this.originalModel, prop);
          this.$uv.setProperty(this.model, prop, value2);
        });
      },
      // 清空校验结果
      clearValidate(props2) {
        props2 = [].concat(props2);
        this.children.map((child) => {
          if (props2[0] === void 0 || props2.includes(child.prop)) {
            child.message = null;
          }
        });
      },
      // 对部分表单字段进行校验
      async validateField(value2, callback, event = null) {
        this.$nextTick(() => {
          const errorsRes = [];
          value2 = [].concat(value2);
          this.children.map((child) => {
            const childErrors = [];
            if (value2.includes(child.prop)) {
              const propertyVal = this.$uv.getProperty(
                this.model,
                child.prop
              );
              const propertyChain = child.prop.split(".");
              const propertyName = propertyChain[propertyChain.length - 1];
              const rule = this.formRules[child.prop];
              if (!rule)
                return;
              const rules2 = [].concat(rule);
              for (let i = 0; i < rules2.length; i++) {
                const ruleItem = rules2[i];
                const trigger = [].concat(ruleItem == null ? void 0 : ruleItem.trigger);
                if (event && !trigger.includes(event))
                  continue;
                const validator = new Schema({
                  [propertyName]: ruleItem
                });
                validator.validate(
                  {
                    [propertyName]: propertyVal
                  },
                  (errors, fields) => {
                    if (this.$uv.test.array(errors)) {
                      errorsRes.push(...errors);
                      childErrors.push(...errors);
                    }
                    this.$nextTick(() => {
                      var _a, _b;
                      child.message = ((_a = childErrors[0]) == null ? void 0 : _a.message) ? (_b = childErrors[0]) == null ? void 0 : _b.message : null;
                    });
                  }
                );
              }
            }
          });
          typeof callback === "function" && callback(errorsRes);
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            const formItemProps = this.children.map(
              (item) => item.prop
            );
            this.validateField(formItemProps, (errors) => {
              if (errors.length) {
                this.errorType === "toast" && this.$uv.toast(errors[0].message);
                reject(errors);
              } else {
                resolve(true);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-form/components/uv-form/uv-form.vue"]]);
  const props$1 = {
    props: {
      // 背景颜色（默认transparent）
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 分割槽高度，单位px（默认20）
      height: {
        type: [String, Number],
        default: 20
      },
      // 与上一个组件的距离
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 与下一个组件的距离
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      ...(_J = (_I = uni.$uv) == null ? void 0 : _I.props) == null ? void 0 : _J.gap
    }
  };
  const _sfc_main$9 = {
    name: "uv-gap",
    mixins: [mpMixin, mixin, props$1],
    computed: {
      gapStyle() {
        const style = {
          backgroundColor: this.bgColor,
          height: this.$uv.addUnit(this.height),
          marginTop: this.$uv.addUnit(this.marginTop),
          marginBottom: this.$uv.addUnit(this.marginBottom)
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-gap",
        style: vue.normalizeStyle([$options.gapStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-gap/components/uv-gap/uv-gap.vue"]]);
  const props = {
    props: {
      // 标题，有值则显示，同时会显示关闭按钮
      title: {
        type: String,
        default: ""
      },
      // 选项上方的描述信息
      description: {
        type: String,
        default: ""
      },
      // 数据
      actions: {
        type: Array,
        default: () => []
      },
      // 取消按钮的文字，不为空时显示按钮
      cancelText: {
        type: String,
        default: ""
      },
      // 点击某个菜单项时是否关闭弹窗
      closeOnClickAction: {
        type: Boolean,
        default: true
      },
      // 处理底部安全区（默认true）
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 点击遮罩是否允许关闭 (默认true)
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 圆角值
      round: {
        type: [Boolean, String, Number],
        default: 0
      },
      ...(_L = (_K = uni.$uv) == null ? void 0 : _K.props) == null ? void 0 : _L.actionSheet
    }
  };
  const _sfc_main$8 = {
    name: "uv-action-sheet",
    mixins: [openType, button, mpMixin, mixin, props],
    emits: ["close", "select"],
    computed: {
      // 操作项目的样式
      itemStyle() {
        return (index2) => {
          let style = {};
          if (this.actions[index2].color)
            style.color = this.actions[index2].color;
          if (this.actions[index2].fontSize)
            style.fontSize = this.$uv.addUnit(this.actions[index2].fontSize);
          if (this.actions[index2].disabled)
            style.color = "#c0c4cc";
          return style;
        };
      }
    },
    methods: {
      open() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      popupChange(e) {
        if (!e.show)
          this.$emit("close");
      },
      // 点击取消按钮
      cancel() {
        this.close();
      },
      selectHandler(index2) {
        const item = this.actions[index2];
        if (item && !item.disabled && !item.loading) {
          this.$emit("select", item);
          if (this.closeOnClickAction) {
            this.close();
          }
        }
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$3);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_1$1);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$4);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "popup",
      mode: "bottom",
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-action-sheet" }, [
          _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-action-sheet__header"
          }, [
            vue.createElementVNode(
              "text",
              { class: "uv-action-sheet__header__title uv-line-1" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "uv-action-sheet__header__icon-wrap",
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.cancel && $options.cancel(...args), ["stop"]))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "17",
                color: "#c8c9cc",
                bold: ""
              })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.description ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "uv-action-sheet__description",
              style: vue.normalizeStyle([{
                marginTop: `${_ctx.title && _ctx.description ? 0 : "18px"}`
              }])
            },
            vue.toDisplayString(_ctx.description),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.description ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uv-action-sheet__item-wrap" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.actions, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
                    vue.createElementVNode("view", {
                      class: "uv-action-sheet__item-wrap__item",
                      onClick: vue.withModifiers(($event) => $options.selectHandler(index2), ["stop"]),
                      "hover-class": !item.disabled && !item.loading ? "uv-action-sheet--hover" : "",
                      "hover-stay-time": 150
                    }, [
                      !item.loading ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              class: "uv-action-sheet__item-wrap__item__name",
                              style: vue.normalizeStyle([$options.itemStyle(index2)])
                            },
                            vue.toDisplayString(item.name),
                            5
                            /* TEXT, STYLE */
                          ),
                          item.subname ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 0,
                              class: "uv-action-sheet__item-wrap__item__subname"
                            },
                            vue.toDisplayString(item.subname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
                        key: 1,
                        "custom-class": "van-action-sheet__loading",
                        size: "18",
                        mode: "circle"
                      }))
                    ], 8, ["onClick", "hover-class"]),
                    index2 !== _ctx.actions.length - 1 ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], true),
          _ctx.cancelText ? (vue.openBlock(), vue.createBlock(_component_uv_gap, {
            key: 2,
            bgColor: "#eaeaec",
            height: "6"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { "hover-class": "uv-action-sheet--hover" }, [
            _ctx.cancelText ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                "hover-stay-time": 150,
                class: "uv-action-sheet__cancel-text",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.cancel && $options.cancel(...args))
              },
              vue.toDisplayString(_ctx.cancelText),
              33
              /* TEXT, NEED_HYDRATION */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["safeAreaInsetBottom", "round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-39528ed0"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        storeInfo: {
          name: "幸福刀削面",
          id: "46545646545646546544",
          addres: "香港特别行政区油尖旺区尖沙咀金马伦道22-24号东丽中心",
          sonName: "刘德华",
          sonAccount: 18099996932,
          sonPassword: "Zt486453154681",
          registrationNo: 911101083066224900
        },
        popUpWindow: [{
          name: "确定"
        }, {
          name: "取消"
        }],
        //输入框是否是密码类型
        inputTypeIsPwd: true,
        passwordTitle: "查看密码",
        fileList1: [{
          url: "https://cdn.uviewui.com/uview/swiper/1.jpg"
        }],
        closeTitle: "",
        //选择的按钮，总共有三个提交的按钮，0代表是提交店铺修改，1是注销店铺，2是修改子账号
        chooseBtn: 0
      };
    },
    methods: {
      // 提交
      submitStoreMsg() {
        this.closeTitle = "确定提交店铺修改吗？";
        this.chooseBtn = 0;
        this.$refs.actionSheet.open();
      },
      logOff() {
        this.closeTitle = "这是一个危险操作，确定要注销店铺吗？";
        this.chooseBtn = 1;
        this.$refs.actionSheet.open();
      },
      submitSonMsg() {
        this.chooseBtn = 2;
        this.closeTitle = "此操作会注销原先账号，要继续吗？";
        this.$refs.actionSheet.open();
      },
      chooseModify(e) {
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:147", this.chooseBtn);
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:148", "选中该项：", e);
      },
      close() {
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:151", "关闭");
      },
      showPassword() {
        this.inputTypeIsPwd = !this.inputTypeIsPwd;
        if (this.inputTypeIsPwd == false) {
          this.passwordTitle = "隐藏密码";
        } else {
          this.passwordTitle = "查看密码";
        }
      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1);
      },
      // 新增图片
      async afterRead(event) {
        let lists = [].concat(event.file);
        let fileListLen = this[`fileList${event.name}`].length;
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: "uploading",
            message: "上传中"
          });
        });
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url);
          let item = this[`fileList${event.name}`][fileListLen];
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: "success",
            message: "",
            url: result
          }));
          fileListLen++;
        }
      },
      uploadFilePromise(url2) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "http://127.0.0.1:8081/api/file/uploadCommodityMsg",
            // 仅为示例，非真实的接口地址
            filePath: url2,
            name: "multipartFile",
            formData: {
              user: "test"
            },
            success: (res) => {
              setTimeout(() => {
                resolve(res.data.data);
              }, 1e3);
            }
          });
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1);
    const _component_uv_textarea = resolveEasycom(vue.resolveDynamicComponent("uv-textarea"), __easycom_2$2);
    const _component_uv_upload = resolveEasycom(vue.resolveDynamicComponent("uv-upload"), __easycom_3$1);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "storeMsg-box" }, [
        vue.createElementVNode("view", { class: "title" }, "商户基本信息"),
        vue.createVNode(_component_uv_form, {
          labelPosition: "left",
          model: $data.storeInfo,
          ref: "form"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_form_item, {
              label: "商铺名:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.name,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.storeInfo.name = $event),
                  border: "none",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, {
              label: "商户号:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.id,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.storeInfo.id = $event),
                  border: "none",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, {
              label: "商铺地址:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { style: { "width": "470rpx", "margin-left": "140rpx" } }, [
                  vue.createVNode(_component_uv_textarea, {
                    modelValue: $data.storeInfo.addres,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.storeInfo.addres = $event),
                    placeholder: "请输入内容",
                    height: "5rem",
                    maxlength: "100"
                  }, null, 8, ["modelValue"])
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, { label: "商铺照片:" }),
            vue.createVNode(_component_uv_upload, {
              fileList: $data.fileList1,
              name: "1",
              multiple: "",
              maxCount: 3,
              onAfterRead: $options.afterRead,
              onDelete: $options.deletePic,
              style: { "margin-left": "50rpx" }
            }, null, 8, ["fileList", "onAfterRead", "onDelete"]),
            vue.createVNode(_component_uv_form_item, {
              label: "执照注册号:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.registrationNo,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.storeInfo.registrationNo = $event),
                  border: "none",
                  clearable: "",
                  style: { "margin-left": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, { label: "营业执照:" }),
            vue.createVNode(_component_uv_upload, {
              fileList: $data.fileList1,
              name: "1",
              multiple: "",
              maxCount: 3,
              onAfterRead: $options.afterRead,
              onDelete: $options.deletePic,
              style: { "margin-left": "50rpx" }
            }, null, 8, ["fileList", "onAfterRead", "onDelete"]),
            vue.createElementVNode("view", { class: "submitBtn" }, [
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "提交修改",
                onClick: $options.submitStoreMsg
              }, null, 8, ["onClick"]),
              vue.createVNode(_component_uv_button, {
                type: "error",
                text: "注销店铺",
                onClick: $options.logOff,
                style: { "margin-top": "1rem" }
              }, null, 8, ["onClick"])
            ]),
            vue.createElementVNode("view", { style: { "height": "50rpx" } })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"])
      ]),
      vue.createElementVNode("view", { class: "storeMsg-box" }, [
        vue.createElementVNode("view", { class: "title" }, "店铺账号信息"),
        vue.createVNode(_component_uv_form, {
          labelPosition: "left",
          model: $data.storeInfo,
          ref: "form"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_form_item, {
              label: "负责人:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.sonName,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.storeInfo.sonName = $event),
                  border: "none",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, {
              label: "店铺账号:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.sonAccount,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.storeInfo.sonAccount = $event),
                  border: "none",
                  clearable: "",
                  style: { "margin-left": "0.5rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_form_item, {
              label: "店铺密码:",
              prop: "name",
              borderBottom: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  modelValue: $data.storeInfo.sonPassword,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.storeInfo.sonPassword = $event),
                  border: "none",
                  clearable: "",
                  password: $data.inputTypeIsPwd,
                  style: { "margin-left": "0.5rem" }
                }, {
                  suffix: vue.withCtx(() => [
                    vue.createVNode(_component_uv_button, {
                      onClick: $options.showPassword,
                      text: $data.passwordTitle,
                      type: "warning",
                      style: { "margin-right": "10rpx" }
                    }, null, 8, ["onClick", "text"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "password"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", { class: "submitBtn" }, [
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "提交修改",
                onClick: $options.submitSonMsg
              }, null, 8, ["onClick"])
            ]),
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_uv_action_sheet, {
                ref: "actionSheet",
                actions: $data.popUpWindow,
                title: $data.closeTitle,
                onSelect: $options.chooseModify,
                onClose: $options.close
              }, null, 8, ["actions", "title", "onSelect", "onClose"])
            ]),
            vue.createElementVNode("view", { style: { "height": "50rpx" } })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"])
      ]),
      vue.createElementVNode("view", { style: { "height": "50rpx" } })
    ]);
  }
  const PagesPersonalCenterStoreManagementStoreDetailsStoreDetails = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-ef0f9e43"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/storeManagement/storeDetails/storeDetails.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {};
    },
    methods: {
      confirmCancellation() {
        formatAppLog("log", "at pages/personalCenter/unsubscribe/unsubscribe.vue:70", "这里执行一些注销条件的判断");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
      vue.createElementVNode("view", { class: "title" }, "注销须知"),
      vue.createElementVNode("text", null, "在你提交注销申请之前，请先确认以下信息，以保证你的账号、财产安全："),
      vue.createElementVNode("br"),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/personalCenter/shuzi1.png",
            class: "tipImg"
          }),
          vue.createElementVNode("text", { class: "tip" }, "账号处于安全状态")
        ]),
        vue.createElementVNode("br"),
        vue.createElementVNode("text", { class: "tellUserMsg" }, " 账号未发生过被盗、被封等风险，且在最近一个月内没有进行修改密码、换绑手机等敏感信息变更的操作。 ")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/personalCenter/shuzi2.png",
            class: "tipImg"
          }),
          vue.createElementVNode("text", { class: "tip" }, "微博支付财产已结清")
        ]),
        vue.createElementVNode("br"),
        vue.createElementVNode("text", { class: "tellUserMsg" }, " 微博钱包内余额、红包已清空，各类微博卡券已清空，与支付宝的绑定关系已解绑。 ")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/personalCenter/shuzi3.png",
            class: "tipImg"
          }),
          vue.createElementVNode("text", { class: "tip" }, "其他APP，网站的账号已解绑")
        ]),
        vue.createElementVNode("br"),
        vue.createElementVNode("text", { class: "tellUserMsg" }, " 已解除与第三方账号的绑定关系，如淘宝、微信、QQ、百度、UC浏览器、天翼、360账号等。 ")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/personalCenter/shuzi4.png",
            class: "tipImg"
          }),
          vue.createElementVNode("text", { class: "tip" }, "微博账号的站外授权关系已清空")
        ]),
        vue.createElementVNode("br"),
        vue.createElementVNode("text", { class: "tellUserMsg" }, " 已清空对所有第三方APP、网站的授权， 如滴滴出行、今日头条、京东、网易云音乐、大众点评、聚美优品等等。 ")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/personalCenter/shuzi5.png",
            class: "tipImg"
          }),
          vue.createElementVNode("text", { class: "tip" }, "开发者权限解除已解除")
        ]),
        vue.createElementVNode("br"),
        vue.createElementVNode("text", { class: "tellUserMsg" }, " 微博开放平台的开发者账号身份与相应权限， 无接入的第三方服务， 如APP、网站、链接等。 ")
      ]),
      vue.createVNode(_component_uv_button, {
        type: "error",
        text: "以了解,确认注销",
        onClick: $options.confirmCancellation,
        style: { "margin-top": "250rpx" }
      }, null, 8, ["onClick"])
    ]);
  }
  const PagesPersonalCenterUnsubscribeUnsubscribe = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-62535ee6"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/unsubscribe/unsubscribe.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        passwordInfo: {
          oldPwd: "",
          newPwd: "",
          confirmPwd: ""
        },
        rules: {
          pwd: {
            type: "string",
            required: true,
            message: "请填写姓名",
            trigger: ["blur", "change"]
          }
        }
      };
    },
    methods: {
      submit() {
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_form, {
          labelPosition: "left",
          model: $data.passwordInfo,
          rules: $data.rules,
          ref: "form"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "uni-input-input" }, [
              vue.createVNode(_component_uv_form_item, {
                label: "原密码:",
                prop: "pwd",
                borderBottom: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.passwordInfo.oldPwd,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.passwordInfo.oldPwd = $event),
                    border: "none",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createElementVNode("view", { class: "uni-input-input" }, [
              vue.createVNode(_component_uv_form_item, {
                label: "新密码:",
                prop: "pwd",
                borderBottom: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.passwordInfo.newPwd,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.passwordInfo.newPwd = $event),
                    border: "none",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createElementVNode("view", { class: "uni-input-input" }, [
              vue.createVNode(_component_uv_form_item, {
                label: "确认密码:",
                prop: "pwd",
                borderBottom: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.passwordInfo.confirmPwd,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.passwordInfo.confirmPwd = $event),
                    border: "none",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model", "rules"])
      ]),
      vue.createVNode(_component_uv_button, {
        type: "error",
        text: "提交修改",
        onClick: $options.submit,
        style: { "margin-top": "100rpx" }
      }, null, 8, ["onClick"])
    ]);
  }
  const PagesPersonalCenterChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-a7bc368c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/changePassword/changePassword.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesPersonalCenterContactUsContactUs = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/contactUs/contactUs.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        stores: [
          {
            storeId: 1,
            storeName: "幸福刀削面",
            storeMoney: "1234",
            storeImage: "../../../static/personalCenter/store.jpg"
          },
          {
            storeId: 2,
            storeName: "必胜客",
            storeMoney: "123",
            storeImage: "../../../static/personalCenter/store.jpg"
          }
        ]
      };
    },
    methods: {
      choseStore(storeId) {
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/showCashOutStore.vue:46", storeId);
        uni.setStorageSync("storeId", storeId);
        uni.navigateTo({
          url: "/pages/personalCenter/showCashOutStore/cashOut/cashOut",
          "animationType": "slide-in-right",
          "animationDuration": 200
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.stores, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "storeContainer",
            key: index2,
            onClick: ($event) => $options.choseStore(item.storeId)
          }, [
            vue.createElementVNode("view", { class: "leftContainer" }, [
              vue.createElementVNode("view", { class: "top" }, [
                vue.createTextVNode(" 店铺名: "),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "mid" }, " 不知道写啥 "),
              vue.createElementVNode("view", { class: "foot" }, [
                vue.createTextVNode(" 可提现金额: ¥"),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeMoney),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "rightContainer" }, [
              vue.createElementVNode("view", { class: "imageContainer" }, [
                vue.createElementVNode("image", {
                  src: item.storeImage,
                  class: "storeImage"
                }, null, 8, ["src"])
              ])
            ])
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesPersonalCenterShowCashOutStoreShowCashOutStore = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showCashOutStore/showCashOutStore.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        isEmpty: true,
        store: {
          money: "200",
          bossAccount: "123415312",
          feilv: 0.06
          //提现费率 抽成
        },
        cashOut: {
          tixianMoney: "",
          choucheng: ""
          // 抽成的钱
        }
      };
    },
    methods: {
      change(e) {
        this.isEmpty = false;
        this.cashOut.tixianMoney = e;
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:72", this.cashOut);
        this.cashOut.choucheng = this.cashOut.tixianMoney * this.store.feilv;
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:75", this.cashOut);
      },
      confirm() {
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:79", "confirm");
        this.cashOut.choucheng = this.cashOut.tixianMoney * this.store.feilv;
      },
      submit() {
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:83", "提现");
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_1$7);
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode(
          "h2",
          { class: "money" },
          "￥ " + vue.toDisplayString($data.store.money),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("span", null, "可提现金额")
        ]),
        vue.createElementVNode("view", { class: "tips" }, [
          vue.createElementVNode("span", null, "￥ 0不可提现")
        ])
      ]),
      vue.createElementVNode("view", { class: "body" }, [
        vue.createElementVNode("view", { class: "left" }, [
          vue.createElementVNode("view", { class: "infoContainer" }, [
            vue.createElementVNode("span", { class: "showInfo" }, "提现金额")
          ]),
          vue.createElementVNode("view", { class: "infoContainer infoContainer_next" }, [
            vue.createElementVNode("span", { class: "showInfo showInfo_next" }, "收款账户")
          ]),
          vue.createElementVNode("view", { class: "infoContainer infoContainer_third" }, [
            vue.createElementVNode("span", { class: "showInfo showInfo_third" }, "服务费")
          ])
        ]),
        vue.createElementVNode("view", { class: "right" }, [
          vue.createElementVNode("view", { class: "inputContainer" }, [
            vue.createVNode(_component_uv_input, {
              style: { "margin-top": "30rpx", "width": "80%", "margin-left": "23rpx" },
              placeholder: "最多可提 ¥ " + $data.store.money,
              modelValue: $data.cashOut.tixianMoney,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.cashOut.tixianMoney = $event),
              type: "number",
              onChange: $options.change,
              clearable: ""
            }, null, 8, ["placeholder", "modelValue", "onChange"])
          ]),
          vue.createElementVNode("view", { class: "inputContainer" }, [
            vue.createVNode(_component_uv_input, {
              style: { "margin-top": "60rpx", "width": "80%", "margin-left": "23rpx" },
              placeholder: $data.store.bossAccount,
              disabled: ""
            }, null, 8, ["placeholder"])
          ]),
          vue.createElementVNode("view", { class: "inputContainer" }, [
            $data.isEmpty == true ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: "chouchengInfo"
            }, " - ")) : vue.createCommentVNode("v-if", true),
            $data.isEmpty == false ? (vue.openBlock(), vue.createElementBlock(
              "span",
              {
                key: 1,
                class: "chouchengInfo"
              },
              "¥ " + vue.toDisplayString(this.cashOut.choucheng),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "foot" }, [
        vue.createVNode(_component_uv_button, {
          type: "primary",
          text: "确定",
          style: { "width": "90%", "margin": "0 auto", "margin-top": "50rpx" },
          onClick: $options.submit
        }, null, 8, ["onClick"])
      ])
    ]);
  }
  const PagesPersonalCenterShowCashOutStoreCashOutCashOut = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showCashOutStore/cashOut/cashOut.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        stores: [
          {
            storeId: 1,
            storeName: "幸福刀削面",
            storeMoney: "1234",
            storeImage: "../../../static/personalCenter/store.jpg"
          },
          {
            storeId: 2,
            storeName: "必胜客",
            storeMoney: "123",
            storeImage: "../../../static/personalCenter/store.jpg"
          }
        ]
      };
    },
    methods: {
      // choseStore(storeId){
      // 	__f__('log','at pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue:46',storeId)
      // 	uni.setStorageSync("storeId",storeId)
      // 	uni.navigateTo({
      // 		url: "/pages/personalCenter/showCashOutStore/cashOut/cashOut",
      // 		"animationType":"slide-in-right",
      // 		"animationDuration": 200
      // 	})
      // }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.stores, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "storeContainer",
            key: index2
          }, [
            vue.createElementVNode("view", { class: "leftContainer" }, [
              vue.createElementVNode("view", { class: "top" }, [
                vue.createTextVNode(" 店铺名: "),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "mid" }, " 不知道写啥 "),
              vue.createElementVNode("view", { class: "foot" }, [
                vue.createTextVNode(" 待审核金额: ¥"),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeMoney),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "rightContainer" }, [
              vue.createElementVNode("view", { class: "imageContainer" }, [
                vue.createElementVNode("image", {
                  src: item.storeImage,
                  class: "storeImage"
                }, null, 8, ["src"])
              ])
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesPersonalCenterShowAuditStoreMoneyShowAuditStoreMoney = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/personalCenter/personalCenter", PagesPersonalCenterPersonalCenter);
  __definePage("pages/bill/bill", PagesBillBill);
  __definePage("pages/reportForms/reportForms", PagesReportFormsReportForms);
  __definePage("pages/personalCenter/application/applicationStatus", PagesPersonalCenterApplicationApplicationStatus);
  __definePage("pages/personalCenter/application/applicationAll", PagesPersonalCenterApplicationApplicationAll);
  __definePage("pages/personalCenter/storeManagement/storeManagement", PagesPersonalCenterStoreManagementStoreManagement);
  __definePage("pages/personalCenter/userOpinion/userOpinion", PagesPersonalCenterUserOpinionUserOpinion);
  __definePage("pages/personalCenter/storeManagement/storeDetails/storeDetails", PagesPersonalCenterStoreManagementStoreDetailsStoreDetails);
  __definePage("pages/personalCenter/unsubscribe/unsubscribe", PagesPersonalCenterUnsubscribeUnsubscribe);
  __definePage("pages/personalCenter/changePassword/changePassword", PagesPersonalCenterChangePasswordChangePassword);
  __definePage("pages/personalCenter/contactUs/contactUs", PagesPersonalCenterContactUsContactUs);
  __definePage("pages/personalCenter/showCashOutStore/showCashOutStore", PagesPersonalCenterShowCashOutStoreShowCashOutStore);
  __definePage("pages/personalCenter/showCashOutStore/cashOut/cashOut", PagesPersonalCenterShowCashOutStoreCashOutCashOut);
  __definePage("pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney", PagesPersonalCenterShowAuditStoreMoneyShowAuditStoreMoney);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HBuilderX/aggregated payment/payment-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
