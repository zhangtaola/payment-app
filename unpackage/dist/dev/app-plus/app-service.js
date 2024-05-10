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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  var _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s2, _t2, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va;
  "use strict";
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
        for (const i2 in value2) {
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
      } catch (e2) {
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
  function regExp(o2) {
    return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
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
  function os$1() {
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
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars[0 | Math.random() * radix];
    } else {
      let r2;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r2 = 0 | Math.random() * 16;
          uuid[i2] = chars[i2 == 19 ? r2 & 3 | 8 : r2];
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
      for (let i2 = 0; i2 < styleArray.length; i2++) {
        if (styleArray[i2]) {
          const item = styleArray[i2].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i2 in customStyle) {
      const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i2]};`;
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
            for (let i2 = 0; i2 < value2.length; i2++) {
              _result.push(`${key}[${i2}]=${value2[i2]}`);
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
    const n2 = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s2 = "";
    s2 = (prec ? round(n2, prec) + "" : `${Math.round(n2)}`).split(".");
    const re2 = /(-?\d+)(\d{3})/;
    while (re2.test(s2[0])) {
      s2[0] = s2[0].replace(re2, `$1${sep}$2`);
    }
    if ((s2[1] || "").length < prec) {
      s2[1] = s2[1] || "";
      s2[1] += new Array(prec - s2[1].length + 1).join("0");
    }
    return s2.join(dec);
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
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (firstObj) {
          firstObj = firstObj[keys[i2]];
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
    const inFn = function(_obj, keys, v2) {
      if (keys.length === 1) {
        _obj[keys[0]] = v2;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v2);
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
  function pages$1() {
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
    color: color2 = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color2);
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
    os: os$1,
    padZero,
    page,
    pages: pages$1,
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
      preventEvent(e2) {
        e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
      },
      // 空操作
      noop(e2) {
        this.preventEvent(e2);
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
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1h = {
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
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:166", `方法 ${i2} 不存在`);
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
  function _sfc_render$1g(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$a = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["render", _sfc_render$1g], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$y = {
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
      ...(_f = (_e2 = uni.$uv) == null ? void 0 : _e2.props) == null ? void 0 : _f.overlay
    }
  };
  const _sfc_main$1g = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$y],
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
  function _sfc_render$1f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_2$a);
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
  const __easycom_0$d = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["render", _sfc_render$1f], ["__scopeId", "data-v-7303e1aa"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
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
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
      if (i2 === 0)
        hex = rgbToHex(startColor);
      if (i2 === step - 1)
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
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
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
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
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
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$x = {
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
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.loadingIcon
    }
  };
  const _sfc_main$1f = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$x],
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
      show(n2) {
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
  function _sfc_render$1e(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$9 = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["render", _sfc_render$1e], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
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
  const props$w = {
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
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.icon
    }
  };
  const _sfc_main$1e = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$w],
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
      clickHandler(e2) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e2);
      }
    }
  };
  function _sfc_render$1d(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$c = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["render", _sfc_render$1d], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const props$v = {
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
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.gap
    }
  };
  const _sfc_main$1d = {
    name: "uv-gap",
    mixins: [mpMixin, mixin, props$v],
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
  function _sfc_render$1c(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_3$3 = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["render", _sfc_render$1c], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-gap/components/uv-gap/uv-gap.vue"]]);
  const _sfc_main$1c = {
    name: "uv-toast",
    mixins: [mpMixin, mixin],
    data() {
      return {
        isShow: false,
        timer: null,
        // 定时器
        config: {
          message: "",
          // 显示文本
          type: "",
          // 主题类型，primary，success，error，warning，black
          duration: 2e3,
          // 显示的时间，毫秒
          icon: true,
          // 显示的图标
          position: "center",
          // toast出现的位置
          complete: null,
          // 执行完后的回调函数
          overlay: true,
          // 是否防止触摸穿透
          loading: false,
          // 是否加载中状态
          zIndex: 10090
          //弹出的层级
        },
        tmpConfig: {},
        // 将用户配置和内置配置合并后的临时配置变量
        rect: {},
        opacity: 0
      };
    },
    computed: {
      iconName() {
        if (!this.tmpConfig.icon || this.tmpConfig.icon == "none") {
          return "";
        }
        if (["error", "warning", "success", "primary"].includes(this.tmpConfig.type)) {
          return this.$uv.type2icon(this.tmpConfig.type);
        } else {
          return "";
        }
      },
      overlayStyle() {
        const style = {
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          zIndex: this.tmpConfig.zIndex
        };
        style.backgroundColor = "rgba(0, 0, 0, 0)";
        return style;
      },
      iconStyle() {
        const style = {};
        style.marginRight = "4px";
        return style;
      },
      aniStyle() {
        const style = {
          position: "fixed",
          zIndex: this.tmpConfig.zIndex
        };
        return style;
      },
      // 内容盒子的样式
      contentStyle() {
        this.$uv.sys();
        const style = {
          position: "fixed",
          top: "50%",
          left: "50%"
        };
        let value2 = 0;
        if (this.tmpConfig.position === "top") {
          style.top = "25%";
        } else if (this.tmpConfig.position === "bottom") {
          style.top = "75%";
        } else {
          value2 = "-50%";
        }
        style.transform = `translate(-50%,${value2})`;
        return style;
      }
    },
    created() {
      ["primary", "success", "error", "warning", "default", "loading"].map((item) => {
        this[item] = (message) => this.show({
          type: item,
          message
        });
      });
    },
    methods: {
      // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
      show(options) {
        this.tmpConfig = this.$uv.deepMerge(this.config, options);
        this.clearTimer();
        this.isShow = true;
        this.timer = setTimeout(() => {
          this.clearTimer();
          typeof this.tmpConfig.complete === "function" && this.tmpConfig.complete();
        }, this.tmpConfig.duration);
      },
      // 查询内容高度
      queryRect() {
        return new Promise((resolve) => {
          const ref = this.$refs["uvToastContent"];
          dom.getComponentRect(ref, (res) => {
            resolve(res.size);
          });
        });
      },
      // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
      hide() {
        this.clearTimer();
      },
      clearTimer() {
        this.isShow = false;
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    unmounted() {
      this.clearTimer();
    }
  };
  function _sfc_render$1b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$d);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_2$a);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-toast" }, [
      vue.createVNode(_component_uv_overlay, {
        show: $data.isShow && $data.tmpConfig.overlay,
        "custom-style": $options.overlayStyle
      }, null, 8, ["show", "custom-style"]),
      vue.createVNode(_component_uv_transition, {
        show: $data.isShow,
        mode: "fade",
        "custom-style": $options.aniStyle
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-toast__content", ["uv-type-" + $data.tmpConfig.type, $data.tmpConfig.type === "loading" || $data.tmpConfig.loading ? "uv-toast__content--loading" : ""]]),
              ref: "uvToastContent",
              style: vue.normalizeStyle([$options.contentStyle])
            },
            [
              $data.tmpConfig.type === "loading" ? (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
                key: 0,
                mode: "circle",
                color: "rgb(255, 255, 255)",
                inactiveColor: "rgb(120, 120, 120)",
                size: "25"
              })) : $data.tmpConfig.type !== "defalut" && $options.iconName ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 1,
                name: $options.iconName,
                size: "17",
                color: $data.tmpConfig.type,
                customStyle: $options.iconStyle
              }, null, 8, ["name", "color", "customStyle"])) : vue.createCommentVNode("v-if", true),
              $data.tmpConfig.type === "loading" || $data.tmpConfig.loading ? (vue.openBlock(), vue.createBlock(_component_uv_gap, {
                key: 2,
                height: "12",
                bgColor: "transparent"
              })) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["uv-toast__content__text", ["uv-toast__content__text--" + $data.tmpConfig.type]]),
                  style: { "max-width": "400rpx" }
                },
                vue.toDisplayString($data.tmpConfig.message),
                3
                /* TEXT, CLASS */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "custom-style"])
    ]);
  }
  const __easycom_0$b = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["render", _sfc_render$1b], ["__scopeId", "data-v-70f56d7c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-toast/components/uv-toast/uv-toast.vue"]]);
  const props$u = {
    props: {
      // 倒计时总秒数
      seconds: {
        type: [String, Number],
        default: 60
      },
      // 尚未开始时提示
      startText: {
        type: String,
        default: "获取验证码"
      },
      // 正在倒计时中的提示
      changeText: {
        type: String,
        default: "X秒重新获取"
      },
      // 倒计时结束时的提示
      endText: {
        type: String,
        default: "重新获取"
      },
      // 是否在H5刷新或各端返回再进入时继续倒计时
      keepRunning: {
        type: Boolean,
        default: false
      },
      // 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
      uniqueKey: {
        type: String,
        default: ""
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.code
    }
  };
  const _sfc_main$1b = {
    name: "uv-code",
    mixins: [mpMixin, mixin, props$u],
    data() {
      return {
        secNum: this.seconds,
        timer: null,
        canGetCode: true
        // 是否可以执行验证码操作
      };
    },
    mounted() {
      this.checkKeepRunning();
    },
    watch: {
      seconds: {
        immediate: true,
        handler(n2) {
          this.secNum = n2;
        }
      }
    },
    methods: {
      checkKeepRunning() {
        let lastTimestamp = Number(uni.getStorageSync(this.uniqueKey + "_$uCountDownTimestamp"));
        if (!lastTimestamp)
          return this.changeEvent(this.startText);
        let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
        if (this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
          this.secNum = lastTimestamp - nowTimestamp;
          uni.removeStorageSync(this.uniqueKey + "_$uCountDownTimestamp");
          this.start();
        } else {
          this.changeEvent(this.startText);
        }
      },
      // 开始倒计时
      start() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.$emit("start");
        this.canGetCode = false;
        this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
        this.timer = setInterval(() => {
          if (--this.secNum) {
            this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.changeEvent(this.endText);
            this.secNum = this.seconds;
            this.$emit("end");
            this.canGetCode = true;
          }
        }, 1e3);
        this.setTimeToStorage();
      },
      // 重置，可以让用户再次获取验证码
      reset() {
        this.canGetCode = true;
        clearInterval(this.timer);
        this.secNum = this.seconds;
        this.changeEvent(this.endText);
      },
      changeEvent(text) {
        this.$emit("change", text);
      },
      // 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
      setTimeToStorage() {
        if (!this.keepRunning || !this.timer)
          return;
        if (this.secNum > 0 && this.secNum <= this.seconds) {
          let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
          uni.setStorage({
            key: this.uniqueKey + "_$uCountDownTimestamp",
            data: nowTimestamp + Number(this.secNum)
          });
        }
      }
    },
    // 组件销毁，兼容vue3
    unmounted() {
      this.setTimeToStorage();
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
  function _sfc_render$1a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-code" }, [
      vue.createCommentVNode(" 此组件功能由js完成，无需写html逻辑 ")
    ]);
  }
  const __easycom_1$c = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["render", _sfc_render$1a], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-code/components/uv-code/uv-code.vue"]]);
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
  const props$t = {
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
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.button
    }
  };
  const _sfc_main$1a = {
    name: "uv-button",
    mixins: [mpMixin, mixin, props$t],
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
  function _sfc_render$19(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
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
  const __easycom_2$8 = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["render", _sfc_render$19], ["__scopeId", "data-v-ae8e42c7"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-button/components/uv-button/uv-button.vue"]]);
  const _sfc_main$19 = {
    data() {
      return {
        gouxSta: false,
        tips: "",
        seconds: 60,
        user: {
          account: "",
          pwd: "",
          code: ""
        },
        isShwoPwdLogin: true,
        isShowMessageCodeLogin: false,
        isABC: true,
        loginWay: 0
        // 0账号密码登录，1短信验证码登录
      };
    },
    methods: {
      moutcl() {
        if (this.gouxSta == false) {
          this.gouxSta = true;
        } else {
          this.gouxSta = false;
        }
      },
      denglu() {
        if (this.gouxSta == false) {
          uni.showToast({
            "title": "请阅读并勾选用户协议",
            "icon": "none"
          });
        } else {
          if (this.loginWay == 0) {
            this.$request("/user/accountLogin", "POST", this.user).then((res) => {
              formatAppLog("log", "at pages/login/login.vue:130", res);
              if (res.data.code == 200) {
                uni.showToast({
                  "title": "登录成功",
                  "icon": "none"
                });
                var now = Date.now();
                var expiredTime = now + 30 * 1e4;
                uni.setStorageSync("userMsg", res.data.data);
                uni.setStorageSync("userMsgExpiredTime", expiredTime);
                formatAppLog("log", "at pages/login/login.vue:141", expiredTime);
                uni.switchTab({
                  url: "/pages/index/index"
                });
              } else {
                uni.showToast({
                  "title": res.data.msg,
                  "icon": "none"
                });
              }
            }).catch((err) => {
              uni.showToast({
                "title": "服务器出错，请稍后再试",
                "icon": "none"
              });
            });
          } else {
            this.$request("/user/messageCodeLogin", "POST", this.user).then((res) => {
              formatAppLog("log", "at pages/login/login.vue:159", res);
              if (res.data.code == 200) {
                uni.showToast({
                  "title": "登录成功",
                  "icon": "none"
                });
                uni.switchTab({
                  url: "/pages/index/index"
                });
              }
            }).catch((err) => {
              uni.showToast({
                "title": "服务器出错，请稍后再试",
                "icon": "none"
              });
            });
          }
        }
      },
      goRegist() {
        formatAppLog("log", "at pages/login/login.vue:180", "注册");
        uni.navigateTo({
          url: "/pages/login/regist/regist"
        });
      },
      doMessageLogin() {
        formatAppLog("log", "at pages/login/login.vue:186", "短信登录");
        this.isShwoPwdLogin = false;
        this.isShowMessageCodeLogin = true;
        this.loginWay = 1;
        formatAppLog("log", "at pages/login/login.vue:190", this.loginWay);
        this.user.account = "";
        this.user.pwd = "";
        this.user.messageCode = "";
        this.gouxSta = false;
      },
      doPwdLogin() {
        formatAppLog("log", "at pages/login/login.vue:197", "密码登录");
        this.isShowMessageCodeLogin = false;
        this.isShwoPwdLogin = true;
        this.loginWay = 0;
        formatAppLog("log", "at pages/login/login.vue:201", this.loginWay);
        this.user.account = "";
        this.user.pwd = "";
        this.user.messageCode = "";
        this.gouxSta = false;
      },
      forgetPwd() {
        formatAppLog("log", "at pages/login/login.vue:208", "忘记密码");
        uni.navigateTo({
          url: "/pages/login/forgetPwd/forgetPwd"
        });
      },
      sendMessage() {
        formatAppLog("log", "at pages/login/login.vue:214", "发送短信验证码");
      },
      codeChange(text) {
        this.tips = text;
      },
      getCode() {
        const rule = /^1[3-9]\d{9}$/;
        if (rule.test(this.user.account) == true) {
          if (this.$refs.code.canGetCode && this.gouxSta == true) {
            uni.showLoading({
              title: "正在获取验证码"
            });
            setTimeout(() => {
              uni.hideLoading();
              uni.showToast({
                "title": "验证码已发送"
              });
              this.$refs.code.start();
            }, 2e3);
            this.$request("/messageCode/send/" + this.user.account + "/interAspect", "POST", null).then((res) => {
              formatAppLog("log", "at pages/login/login.vue:238", res);
            }).catch((err) => {
              formatAppLog("log", "at pages/login/login.vue:240", err);
            });
          } else {
            if (!this.$refs.code.canGetCode) {
              uni.showToast({
                "title": "倒计时结束后再发送"
              });
            } else if (this.gouxSta == false) {
              uni.showToast({
                "title": "请阅读并勾选用户协议",
                "icon": "none"
              });
            }
          }
        } else {
          uni.showToast({
            "title": "输入的手机号不规范,请重新输入",
            "icon": "none"
          });
        }
      },
      end() {
        uni.showToast({
          "title": "倒计时结束"
        });
      },
      start() {
        uni.showToast({
          "title": "倒计时开始"
        });
      }
    },
    mounted() {
      var userMsgExpiredTime = uni.getStorageSync("userMsgExpiredTime");
      formatAppLog("log", "at pages/login/login.vue:276", "userMsgExpiredTime", userMsgExpiredTime);
      if (userMsgExpiredTime != null && Date.now() > userMsgExpiredTime)
        ;
      else {
        var now = Date.now();
        var expiredTime = now + 30 * 1e3;
        uni.setStorageSync("userMsgExpiredTime", expiredTime);
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  };
  function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_toast = resolveEasycom(vue.resolveDynamicComponent("uv-toast"), __easycom_0$b);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_1$c);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "content" },
          [
            vue.createElementVNode("view", { class: "login_img" }, [
              vue.createElementVNode("image", {
                mode: "aspectFill",
                src: "/static/icon/yonghu.png"
              })
            ]),
            vue.createElementVNode("view", { class: "login_from" }, [
              vue.createElementVNode("view", { class: "login_from_input" }, [
                vue.createElementVNode("view", { class: "login_from_name" }, "账号"),
                vue.createElementVNode("view", { class: "login_from_fun" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "number",
                      placeholder: "请输入手机号码",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.user.account = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.user.account]
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "login_from_input" }, [
                vue.createElementVNode("view", { class: "login_from_name" }, "密码"),
                vue.createElementVNode("view", { class: "login_from_fun" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "text",
                      ref: "pwdInput",
                      password: "true",
                      placeholder: "请输入密码",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.user.pwd = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.user.pwd]
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "choseContainer" }, [
                vue.createElementVNode("view", { class: "forgetPwd" }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.forgetPwd())
                  }, "忘记密码？")
                ]),
                vue.createElementVNode("view", { class: "messageLogin" }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[3] || (_cache[3] = ($event) => $options.doMessageLogin())
                  }, "短信登录")
                ])
              ]),
              vue.createElementVNode("view", { class: "login_from_dl" }, [
                vue.createElementVNode("button", {
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.denglu && $options.denglu(...args))
                }, "登录")
              ]),
              vue.createElementVNode("view", { class: "logo_xieyi" }, [
                vue.createElementVNode(
                  "label",
                  {
                    onClick: _cache[5] || (_cache[5] = (...args) => $options.moutcl && $options.moutcl(...args)),
                    class: vue.normalizeClass($data.gouxSta ? "cuIcon-squarecheckfill" : "cuIcon-square")
                  },
                  null,
                  2
                  /* CLASS */
                ),
                vue.createElementVNode("view", { class: "logo_text" }, [
                  vue.createTextVNode("请勾选并阅读"),
                  vue.createElementVNode("text", null, "《注册协议》"),
                  vue.createTextVNode("及"),
                  vue.createElementVNode("text", null, "《隐私协议》")
                ])
              ]),
              vue.createElementVNode("view", { class: "logo_xieyi" }, [
                vue.createElementVNode("view", { class: "logo_text" }, [
                  vue.createTextVNode(" 没有账号？"),
                  vue.createElementVNode("text", {
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.goRegist && $options.goRegist(...args))
                  }, "去注册")
                ])
              ])
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.isShwoPwdLogin]
        ]),
        vue.createCommentVNode(" 短信登录 "),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "content messageLoginContainer" },
          [
            vue.createElementVNode("view", { class: "login_img" }, [
              vue.createElementVNode("image", {
                mode: "aspectFill",
                src: "/static/icon/yonghu.png"
              })
            ]),
            vue.createElementVNode("view", { class: "login_from" }, [
              vue.createElementVNode("view", { class: "login_from_input" }, [
                vue.createElementVNode("view", { class: "login_from_name" }, "账号"),
                vue.createElementVNode("view", { class: "login_from_fun" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "number",
                      placeholder: "请输入手机号码",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.user.account = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.user.account]
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "login_from_input" }, [
                vue.createVNode(
                  _component_uv_toast,
                  { ref: "toast" },
                  null,
                  512
                  /* NEED_PATCH */
                ),
                vue.createVNode(_component_uv_code, {
                  seconds: $data.seconds,
                  onEnd: $options.end,
                  onStart: $options.start,
                  ref: "code",
                  onChange: $options.codeChange
                }, null, 8, ["seconds", "onEnd", "onStart", "onChange"]),
                vue.createVNode(_component_uv_button, { onClick: $options.getCode }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString($data.tips),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ]),
              vue.createElementVNode("view", { class: "login_from_input" }, [
                vue.createElementVNode("view", { class: "login_from_name" }, "验证码"),
                vue.createElementVNode("view", { class: "login_from_fun" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "number",
                      password: "true",
                      placeholder: "请输入短信验证码",
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.user.code = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.user.code]
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "choseContainer" }, [
                vue.createElementVNode("view", { class: "forgetPwd" }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[9] || (_cache[9] = ($event) => $options.forgetPwd())
                  }, "忘记密码？")
                ]),
                vue.createElementVNode("view", { class: "pwdLogin" }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[10] || (_cache[10] = ($event) => $options.doPwdLogin())
                  }, "密码登录")
                ])
              ]),
              vue.createElementVNode("view", { class: "login_from_dl" }, [
                vue.createElementVNode("button", {
                  onClick: _cache[11] || (_cache[11] = (...args) => $options.denglu && $options.denglu(...args))
                }, "登录")
              ]),
              vue.createElementVNode("view", { class: "logo_xieyi" }, [
                vue.createElementVNode(
                  "label",
                  {
                    onClick: _cache[12] || (_cache[12] = (...args) => $options.moutcl && $options.moutcl(...args)),
                    class: vue.normalizeClass($data.gouxSta ? "cuIcon-squarecheckfill" : "cuIcon-square")
                  },
                  null,
                  2
                  /* CLASS */
                ),
                vue.createElementVNode("view", { class: "logo_text" }, [
                  vue.createTextVNode("请勾选并阅读"),
                  vue.createElementVNode("text", null, "《注册协议》"),
                  vue.createTextVNode("及"),
                  vue.createElementVNode("text", null, "《隐私协议》")
                ])
              ]),
              vue.createElementVNode("view", { class: "logo_xieyi" }, [
                vue.createElementVNode("view", { class: "logo_text" }, [
                  vue.createTextVNode(" 没有账号？"),
                  vue.createElementVNode("text", {
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.goRegist && $options.goRegist(...args))
                  }, "去注册")
                ])
              ])
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.isShowMessageCodeLogin]
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["render", _sfc_render$18], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/login/login.vue"]]);
  const props$s = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$18 = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$s],
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
  function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$17], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const props$r = {
    props: {
      // 是否开启顶部安全区适配
      safeAreaInsetTop: {
        type: Boolean,
        default: true
      },
      // 固定在顶部时，是否生成一个等高元素，以防止塌陷
      placeholder: {
        type: Boolean,
        default: false
      },
      // 是否固定在顶部
      fixed: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: false
      },
      // 左边的图标
      leftIcon: {
        type: String,
        default: "arrow-left"
      },
      // 左边的提示文字
      leftText: {
        type: String,
        default: ""
      },
      // 左右的提示文字
      rightText: {
        type: String,
        default: ""
      },
      // 右边的图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 标题的宽度
      titleWidth: {
        type: [String, Number],
        default: "400rpx"
      },
      // 导航栏高度
      height: {
        type: [String, Number],
        default: "44px"
      },
      // 左侧返回图标的大小
      leftIconSize: {
        type: [String, Number],
        default: 20
      },
      // 左侧返回图标的颜色
      leftIconColor: {
        type: String,
        default: "#303133"
      },
      // 点击左侧区域(返回图标)，是否自动返回上一页
      autoBack: {
        type: Boolean,
        default: false
      },
      // 标题的样式，对象或字符串
      titleStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.navbar
    }
  };
  const _sfc_main$17 = {
    name: "uv-navbar",
    mixins: [mpMixin, mixin, props$r],
    data() {
      return {};
    },
    computed: {
      getBgColor() {
        const style = {};
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else if (this.isImg) {
            style.background = "transparent";
          } else {
            style.background = this.bgColor;
          }
        }
        return style;
      },
      getStatusbgColor() {
        if (this.bgColor) {
          if (this.isImg) {
            return "transparent";
          } else {
            return this.bgColor;
          }
        }
      },
      // 判断传入的bgColor属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.bgColor.indexOf("data:") > -1 && this.bgColor.indexOf("base64") > -1;
        return this.bgColor.indexOf("/") !== -1 || isBase64;
      },
      bgImgStyle() {
        const style = {};
        if (this.safeAreaInsetTop) {
          style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight + 44, "px");
        } else {
          style.height = "44px";
        }
        return style;
      }
    },
    methods: {
      // 点击左侧区域
      leftClick() {
        this.$emit("leftClick");
        if (this.autoBack) {
          uni.navigateBack();
        }
      },
      // 点击右侧区域
      rightClick() {
        this.$emit("rightClick");
      }
    }
  };
  function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_0$a);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-navbar" }, [
      _ctx.fixed && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "uv-navbar__placeholder",
          style: vue.normalizeStyle({
            height: _ctx.$uv.addUnit(_ctx.$uv.getPx(_ctx.height) + _ctx.$uv.sys().statusBarHeight, "px")
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([_ctx.fixed && "uv-navbar--fixed"])
        },
        [
          $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "uv-navbar--bgimg",
            src: _ctx.bgColor,
            mode: _ctx.imgMode,
            style: vue.normalizeStyle([$options.bgImgStyle])
          }, null, 12, ["src", "mode"])) : vue.createCommentVNode("v-if", true),
          _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, {
            key: 1,
            bgColor: $options.getStatusbgColor
          }, null, 8, ["bgColor"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-navbar__content", [_ctx.border && "uv-border-bottom"]]),
              style: vue.normalizeStyle([{
                height: _ctx.$uv.addUnit(_ctx.height)
              }, $options.getBgColor])
            },
            [
              vue.createElementVNode("view", {
                class: "uv-navbar__content__left",
                "hover-class": "uv-navbar__content__left--hover",
                "hover-start-time": "150",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "left", {}, () => [
                  _ctx.leftIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 0,
                    name: _ctx.leftIcon,
                    size: _ctx.leftIconSize,
                    color: _ctx.leftIconColor
                  }, null, 8, ["name", "size", "color"])) : vue.createCommentVNode("v-if", true),
                  _ctx.leftText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      style: vue.normalizeStyle({
                        color: _ctx.leftIconColor
                      }),
                      class: "uv-navbar__content__left__text"
                    },
                    vue.toDisplayString(_ctx.leftText),
                    5
                    /* TEXT, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ]),
              vue.renderSlot(_ctx.$slots, "center", {}, () => [
                vue.createElementVNode(
                  "text",
                  {
                    class: "uv-line-1 uv-navbar__content__title",
                    style: vue.normalizeStyle([{
                      width: _ctx.$uv.addUnit(_ctx.titleWidth),
                      flex: "0 1 auto"
                    }, _ctx.$uv.addStyle(_ctx.titleStyle)])
                  },
                  vue.toDisplayString(_ctx.title),
                  5
                  /* TEXT, STYLE */
                )
              ], true),
              vue.createElementVNode("view", {
                class: "uv-navbar__content__right",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.rightClick && $options.rightClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "right", {}, () => [
                  _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 0,
                    name: _ctx.rightIcon,
                    size: "20"
                  }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true),
                  _ctx.rightText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      class: "uv-navbar__content__right__text"
                    },
                    vue.toDisplayString(_ctx.rightText),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ])
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$16], ["__scopeId", "data-v-16f3e502"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue"]]);
  const props$q = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: false
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: 999
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: [String, void 0, null],
        default: "error"
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: false
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: null
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: null
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: [String, void 0, null],
        default: "circle"
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: [String, void 0, null],
        default: "overflow"
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: () => []
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: false
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: false
      },
      ...(_t2 = (_s2 = uni.$uv) == null ? void 0 : _s2.props) == null ? void 0 : _t2.badge
    }
  };
  const _sfc_main$16 = {
    name: "uv-badge",
    mixins: [mpMixin, mixin, props$q],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = this.$uv.addUnit(top);
            style.right = this.$uv.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      },
      propsType() {
        return this.type || "error";
      }
    }
  };
  function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "uv-badge--dot" : "uv-badge--not-dot", _ctx.inverted && "uv-badge--inverted", _ctx.shape === "horn" && "uv-badge--horn", `uv-badge--${$options.propsType}${_ctx.inverted ? "--inverted" : ""}`], "uv-badge"]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$b = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$15], ["__scopeId", "data-v-91e4945b"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-badge/components/uv-badge/uv-badge.vue"]]);
  const props$p = {
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      modelValue: {
        type: [Boolean, String, Number],
        default: false
      },
      // 是否为加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 是否为禁用装填
      disabled: {
        type: Boolean,
        default: false
      },
      // 开关尺寸，单位px
      size: {
        type: [String, Number],
        default: 25
      },
      // 打开时的背景颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 关闭时的背景颜色
      inactiveColor: {
        type: String,
        default: "#fff"
      },
      // switch打开时的值
      activeValue: {
        type: [String, Number, Boolean],
        default: true
      },
      // switch关闭时的值
      inactiveValue: {
        type: [String, Number, Boolean],
        default: false
      },
      // 是否开启异步变更，开启后需要手动控制输入值
      asyncChange: {
        type: Boolean,
        default: false
      },
      // 圆点与外边框的距离
      space: {
        type: [String, Number],
        default: 0
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.switch
    }
  };
  const _sfc_main$15 = {
    name: "uv-switch",
    mixins: [mpMixin, mixin, props$p],
    data() {
      return {
        bgColor: "#ffffff",
        innerValue: false
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (newVal !== this.inactiveValue && newVal !== this.activeValue) {
            return this.$uv.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
          }
          this.innerValue = newVal;
        }
      }
    },
    created() {
      this.innerValue = this.value || this.modelValue;
    },
    computed: {
      isActive() {
        return this.innerValue === this.activeValue;
      },
      switchStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 + 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) + 2);
        if (this.customInactiveColor) {
          style.borderColor = "rgba(0, 0, 0, 0)";
        }
        style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
        return style;
      },
      nodeStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        const translateX = this.isActive ? this.$uv.addUnit(this.space) : this.$uv.addUnit(this.$uv.getPx(this.size));
        style.transform = `translateX(-${translateX})`;
        return style;
      },
      bgStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 - this.$uv.getPx(this.size) / 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size));
        style.backgroundColor = this.inactiveColor;
        style.transform = `scale(${this.isActive ? 0 : 1})`;
        return style;
      },
      customInactiveColor() {
        return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
          if (!this.asyncChange) {
            this.$emit("input", oldValue);
            this.$emit("update:modelValue", oldValue);
          }
          this.$nextTick(() => {
            this.$emit("change", oldValue);
          });
        }
      }
    }
  };
  function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-switch", [_ctx.disabled && "uv-switch--disabled"]]),
        style: vue.normalizeStyle([$options.switchStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-switch__bg",
            style: vue.normalizeStyle([$options.bgStyle])
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-switch__node", [$data.innerValue && "uv-switch__node--on"]]),
            style: vue.normalizeStyle([$options.nodeStyle]),
            ref: "uv-switch__node"
          },
          [
            vue.createVNode(_component_uv_loading_icon, {
              show: _ctx.loading,
              mode: "circle",
              timingFunction: "linear",
              color: $data.innerValue ? _ctx.activeColor : "#AAABAD",
              size: _ctx.size * 0.6
            }, null, 8, ["show", "color", "size"])
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$7 = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$14], ["__scopeId", "data-v-c713e4c9"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-switch/components/uv-switch/uv-switch.vue"]]);
  const _sfc_main$14 = {
    name: "uv-list-item",
    mixins: [mpMixin, mixin],
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      badge: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            name: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: false
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      directionData() {
        return this.direction ? this.direction : this.parentData.direction ? this.parentData.direction : "row";
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (padding)
            this.setPadding(padding);
        },
        immediate: true
      }
    },
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        },
        parentData: {
          direction: "row",
          padding: 0
        }
      };
    },
    created() {
      this.updateParentData();
    },
    mounted() {
      this.init();
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      init() {
        if (!this.parent) {
          this.$uv.error("uv-list-item必须搭配uv-list组件使用");
        }
        this.$nextTick(() => {
          if (!(this.padding.top || this.padding.right || this.padding.bottom || this.padding.left)) {
            this.setPadding(this.parentData.padding);
          }
        });
      },
      updateParentData() {
        this.getParentData("uv-list");
      },
      setPadding(padding) {
        if (typeof padding == "number") {
          padding += "";
        }
        let paddingArr = padding.split(" ");
        if (paddingArr.length === 1) {
          const allPadding = paddingArr[0];
          this.padding = {
            "top": allPadding,
            "right": allPadding,
            "bottom": allPadding,
            "left": allPadding
          };
        } else if (paddingArr.length === 2) {
          const [verticalPadding, horizontalPadding] = paddingArr;
          this.padding = {
            "top": verticalPadding,
            "right": horizontalPadding,
            "bottom": verticalPadding,
            "left": horizontalPadding
          };
        } else if (paddingArr.length === 4) {
          const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
          this.padding = {
            "top": topPadding,
            "right": rightPadding,
            "bottom": bottomPadding,
            "left": leftPadding
          };
        }
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e2) {
        this.$emit("switchChange", e2);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_1$b);
    const _component_uv_switch = resolveEasycom(vue.resolveDynamicComponent("uv-switch"), __easycom_2$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uv-list-item--disabled": $props.disabled }, "uv-list-item"]),
      style: vue.normalizeStyle([_ctx.$uv.addStyle($props.customStyle), { "background-color": $props.customStyle.backgroundColor ? $props.customStyle.backgroundColor : "#fff" }]),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uv-list-item--hover",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uv-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "uv-list-item__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $options.directionData === "column" }]),
              style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
            },
            [
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createElementVNode("view", { class: "uv-list-item__header" }, [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "uv-list-item__icon"
                  }, [
                    vue.createElementVNode("image", {
                      src: $props.thumb,
                      class: vue.normalizeClass(["uv-list-item__icon-img", ["uv-list--" + $props.thumbSize]])
                    }, null, 10, ["src"])
                  ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-list-item__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: $props.extraIcon.icon,
                      customPrefix: $props.extraIcon.customPrefix,
                      color: $props.extraIcon.color,
                      size: $props.extraIcon.size
                    }, null, 8, ["name", "customPrefix", "color", "size"])
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ], true),
              vue.renderSlot(_ctx.$slots, "body", {}, () => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-list-item__content", { "uv-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
                  },
                  [
                    $props.title ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: vue.normalizeClass(["uv-list-item__content-title", [$props.ellipsis && `uv-line-${$props.ellipsis}`]])
                      },
                      vue.toDisplayString($props.title),
                      3
                      /* TEXT, CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    $props.note ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        class: "uv-list-item__content-note"
                      },
                      vue.toDisplayString($props.note),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ], true),
              vue.renderSlot(_ctx.$slots, "footer", {}, () => [
                $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uv-list-item__extra", { "flex--justify": $options.directionData === "column" }])
                  },
                  [
                    $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "uv-list-item__extra-text"
                      },
                      vue.toDisplayString($props.rightText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uv_badge, {
                      key: 1,
                      show: !!($props.badge.show || $props.badge.isDot || $props.badge.value),
                      isDot: $props.badge.isDot,
                      value: $props.badge.value,
                      max: $props.badge.max,
                      type: $props.badge.type,
                      showZero: $props.badge.showZero,
                      bgColor: $props.badge.bgColor,
                      color: $props.badge.color,
                      shape: $props.badge.shape,
                      numberType: $props.badge.numberType,
                      inverted: $props.badge.inverted,
                      customStyle: "margin-left: 4px;"
                    }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])) : vue.createCommentVNode("v-if", true),
                    $props.showSwitch ? (vue.openBlock(), vue.createBlock(_component_uv_switch, {
                      key: 2,
                      value: $props.switchChecked,
                      disabled: $props.disabled,
                      onChange: $options.onSwitchChange
                    }, null, 8, ["value", "disabled", "onChange"])) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ],
            6
            /* CLASS, STYLE */
          )
        ], true)
      ]),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
        key: 1,
        size: "34rpx",
        class: "uv-icon-wrapper",
        color: "#bbb",
        name: "arrow-right"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_1$a = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$13], ["__scopeId", "data-v-d568ce32"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-list/components/uv-list-item/uv-list-item.vue"]]);
  const _sfc_main$13 = {
    name: "uv-list",
    mixins: [mpMixin, mixin],
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      border: {
        type: Boolean,
        default: false
      },
      borderColor: {
        type: String,
        default: "#dadbde"
      },
      // 排版方向，默认row，列表里面使用其他组件  最好设置成column
      direction: {
        type: String,
        default: "row"
      },
      // 内边距
      padding: {
        type: [String, Number],
        default: "20rpx 30rpx"
      }
    },
    created() {
      this.firstChildAppend = false;
    },
    computed: {
      parentData() {
        return [this.direction, this.padding];
      }
    },
    methods: {
      loadMore(e2) {
        this.$emit("scrolltolower");
      },
      scroll(e2) {
        this.$emit("scroll", e2);
      }
    }
  };
  function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-list",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        $props.border ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "uv-list--border-top",
            style: vue.normalizeStyle([{ "background-color": $props.borderColor }])
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        $props.border ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "uv-list--border-bottom",
            style: vue.normalizeStyle([{ "background-color": $props.borderColor }])
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2$6 = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$12], ["__scopeId", "data-v-53ea9bef"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-list/components/uv-list/uv-list.vue"]]);
  const props$o = {
    props: {
      // 显示的内容，字符串
      text: {
        type: [Array],
        default: ""
      },
      // 是否显示左侧的音量图标
      icon: {
        type: [String, Boolean, null],
        default: "volume"
      },
      // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
      mode: {
        type: String,
        default: ""
      },
      // 文字颜色，各图标也会使用文字颜色
      color: {
        type: String,
        default: "#f9ae3d"
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#fdf6ec"
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
      speed: {
        type: [String, Number],
        default: 80
      },
      // direction = row时，是否使用步进形式滚动
      step: {
        type: Boolean,
        default: false
      },
      // 滚动一个周期的时间长，单位ms
      duration: {
        type: [String, Number],
        default: 1500
      },
      // 是否禁止用手滑动切换，仅`direction="column"生效`
      // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
      disableTouch: {
        type: Boolean,
        default: true
      },
      // 是否禁止滚动，仅`direction="column"生效`
      disableScroll: {
        type: Boolean,
        default: false
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.columnNotice
    }
  };
  const _sfc_main$12 = {
    emits: ["click", "close", "change"],
    mixins: [mpMixin, mixin, props$o],
    watch: {
      text: {
        immediate: true,
        handler(newValue, oldValue) {
          if (!this.$uv.test.array(newValue)) {
            this.$uv.error("noticebar组件direction为column时，要求text参数为数组形式");
          }
        }
      }
    },
    computed: {
      // 文字内容的样式
      textStyle() {
        let style = {};
        style.color = this.color;
        style.fontSize = this.$uv.addUnit(this.fontSize);
        return style;
      },
      // 垂直或者水平滚动
      vertical() {
        if (this.mode == "horizontal")
          return false;
        else
          return true;
      },
      // NVUE中的swiper在css中样式不生效
      swiperStyle() {
        const style = {};
        return style;
      }
    },
    data() {
      return {
        index: 0
      };
    },
    methods: {
      noticeChange(e2) {
        this.index = e2.detail.current;
        this.$emit("change", this.index);
      },
      // 点击通告栏
      clickHandler() {
        this.$emit("click", this.index);
      },
      // 点击关闭按钮
      close() {
        this.$emit("close");
      }
    }
  };
  function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uv-notice",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "icon", {}, () => [
        _ctx.icon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-notice__left-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.icon,
            color: _ctx.color,
            size: "19"
          }, null, 8, ["name", "color"])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.createElementVNode("swiper", {
        "disable-touch": _ctx.disableTouch,
        vertical: _ctx.step ? false : true,
        circular: "",
        interval: _ctx.duration,
        autoplay: !_ctx.disableScroll,
        class: "uv-notice__swiper",
        style: vue.normalizeStyle([$options.swiperStyle]),
        onChange: _cache[0] || (_cache[0] = (...args) => $options.noticeChange && $options.noticeChange(...args))
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.text, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", {
              key: index2,
              class: "uv-notice__swiper__item"
            }, [
              vue.createElementVNode(
                "text",
                {
                  class: "uv-notice__swiper__item__text uv-line-1",
                  style: vue.normalizeStyle([$options.textStyle])
                },
                vue.toDisplayString(item),
                5
                /* TEXT, STYLE */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 44, ["disable-touch", "vertical", "interval", "autoplay"]),
      ["link", "closable"].includes(_ctx.mode) ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uv-notice__right-icon"
      }, [
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
          key: 0,
          name: "arrow-right",
          size: 17,
          color: _ctx.color
        }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "closable" ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
          key: 1,
          name: "close",
          size: 16,
          color: _ctx.color,
          onClick: $options.close
        }, null, 8, ["color", "onClick"])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$11], ["__scopeId", "data-v-243b8fd9"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-notice-bar/components/uv-column-notice/uv-column-notice.vue"]]);
  const props$n = {
    props: {
      // 显示的内容，字符串
      text: {
        type: String,
        default: ""
      },
      // 是否显示左侧的音量图标
      icon: {
        type: [String, Boolean, null],
        default: "volume"
      },
      // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
      mode: {
        type: String,
        default: ""
      },
      // 文字颜色，各图标也会使用文字颜色
      color: {
        type: String,
        default: "#f9ae3d"
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#fdf6ec"
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度
      speed: {
        type: [String, Number],
        default: 80
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.rowNotice
    }
  };
  const _sfc_main$11 = {
    name: "uv-row-notice",
    emits: ["click", "close"],
    mixins: [mpMixin, mixin, props$n],
    data() {
      return {
        animationDuration: "0",
        // 动画执行时间
        animationPlayState: "paused",
        // 动画的开始和结束执行
        // nvue下，内容发生变化，导致滚动宽度也变化，需要标志为是否需要重新计算宽度
        // 不能在内容变化时直接重新计算，因为nvue的animation模块上一次的滚动不是刚好结束，会有影响
        nvueInit: true,
        show: true
      };
    },
    watch: {
      text: {
        immediate: true,
        handler(newValue, oldValue) {
          this.vue();
          if (!this.$uv.test.string(newValue)) {
            this.$uv.error("noticebar组件direction为row时，要求text参数为字符串形式");
          }
        }
      },
      fontSize() {
        this.vue();
      },
      speed() {
        this.vue();
      }
    },
    computed: {
      // 文字内容的样式
      textStyle() {
        let style = {};
        style.color = this.color;
        style.fontSize = this.$uv.addUnit(this.fontSize);
        return style;
      },
      animationStyle() {
        let style = {};
        style.animationDuration = this.animationDuration;
        style.animationPlayState = this.animationPlayState;
        return style;
      },
      // 内部对用户传入的数据进一步分割，放到多个text标签循环，否则如果用户传入的字符串很长（100个字符以上）
      // 放在一个text标签中进行滚动，在低端安卓机上，动画可能会出现抖动现象，需要分割到多个text中可解决此问题
      innerText() {
        let result = [], len = 20;
        const textArr = this.text ? this.text.split("") : [];
        for (let i2 = 0; i2 < textArr.length; i2 += len) {
          result.push(textArr.slice(i2, i2 + len).join(""));
        }
        return result;
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page2 = pages2[pages2.length - 1];
      var currentWebview = page2.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
      this.init();
    },
    methods: {
      init() {
        this.vue();
        if (!this.$uv.test.string(this.text)) {
          this.$uv.error("noticebar组件direction为row时，要求text参数为字符串形式");
        }
      },
      // vue版处理
      async vue() {
        let textWidth = 0;
        await this.$uv.sleep();
        textWidth = (await this.$uvGetRect(".uv-notice__content__text")).width;
        (await this.$uvGetRect(".uv-notice__content")).width;
        this.animationDuration = `${textWidth / this.$uv.getPx(this.speed)}s`;
        this.animationPlayState = "paused";
        setTimeout(() => {
          this.animationPlayState = "running";
        }, 10);
      },
      // nvue版处理
      async nvue() {
      },
      loopAnimation(textWidth, boxWidth) {
      },
      getNvueRect(el) {
      },
      // 点击通告栏
      clickHandler(index2) {
        this.$emit("click");
      },
      // 点击右侧按钮，需要判断点击的是关闭图标还是箭头图标
      close() {
        this.$emit("close");
      }
    }
  };
  function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uv-notice",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "icon", {}, () => [
        _ctx.icon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-notice__left-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.icon,
            color: _ctx.color,
            size: "19"
          }, null, 8, ["name", "color"])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.createElementVNode(
        "view",
        {
          class: "uv-notice__content",
          ref: "uv-notice__content"
        },
        [
          vue.createElementVNode(
            "view",
            {
              ref: "uv-notice__content__text",
              class: "uv-notice__content__text",
              style: vue.normalizeStyle([$options.animationStyle])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($options.innerText, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: index2,
                      style: vue.normalizeStyle([$options.textStyle])
                    },
                    vue.toDisplayString(item),
                    5
                    /* TEXT, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            4
            /* STYLE */
          )
        ],
        512
        /* NEED_PATCH */
      ),
      ["link", "closable"].includes(_ctx.mode) ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uv-notice__right-icon"
      }, [
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
          key: 0,
          name: "arrow-right",
          size: 17,
          color: _ctx.color
        }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "closable" ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
          key: 1,
          onClick: $options.close,
          name: "close",
          size: 16,
          color: _ctx.color
        }, null, 8, ["onClick", "color"])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$9 = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$10], ["__scopeId", "data-v-8e15132c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-notice-bar/components/uv-row-notice/uv-row-notice.vue"]]);
  const props$m = {
    props: {
      // 显示的内容，数组
      text: {
        type: [Array, String],
        default: () => []
      },
      // 通告滚动模式，row-横向滚动，column-竖向滚动
      direction: {
        type: String,
        default: "row"
      },
      // direction = row时，是否使用步进形式滚动
      step: {
        type: Boolean,
        default: false
      },
      // 是否显示左侧的音量图标
      icon: {
        type: [String, Boolean, null],
        default: "volume"
      },
      // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
      mode: {
        type: String,
        default: ""
      },
      // 文字颜色，各图标也会使用文字颜色
      color: {
        type: String,
        default: "#f9ae3d"
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#fdf6ec"
      },
      // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
      speed: {
        type: [String, Number],
        default: 80
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 滚动一个周期的时间长，单位ms
      duration: {
        type: [String, Number],
        default: 2e3
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
      },
      // 是否禁止用手滑动切换
      // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
      disableTouch: {
        type: Boolean,
        default: true
      },
      // 是否禁止滚动，仅`direction="column"生效`
      disableScroll: {
        type: Boolean,
        default: false
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.noticeBar
    }
  };
  const _sfc_main$10 = {
    name: "uv-notice-bar",
    emits: ["click", "close", "change"],
    mixins: [mpMixin, mixin, props$m],
    data() {
      return {
        show: true
      };
    },
    methods: {
      // 点击通告栏
      click(index2) {
        this.$emit("click", index2);
        if (this.url && this.linkType) {
          this.openPage();
        }
      },
      // 点击关闭按钮
      close() {
        this.show = false;
        this.$emit("close");
      },
      // 竖向滚动时触发
      change(index2) {
        this.$emit("change", index2);
      }
    }
  };
  function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_column_notice = resolveEasycom(vue.resolveDynamicComponent("uv-column-notice"), __easycom_0$8);
    const _component_uv_row_notice = resolveEasycom(vue.resolveDynamicComponent("uv-row-notice"), __easycom_1$9);
    return $data.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "uv-notice-bar",
        style: vue.normalizeStyle([{
          backgroundColor: _ctx.bgColor
        }, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        _ctx.direction === "column" || _ctx.direction === "row" && _ctx.step ? (vue.openBlock(), vue.createBlock(_component_uv_column_notice, {
          key: 0,
          color: _ctx.color,
          bgColor: _ctx.bgColor,
          text: _ctx.text,
          mode: _ctx.mode,
          step: _ctx.step,
          icon: _ctx.icon,
          "disable-touch": _ctx.disableTouch,
          "disable-scroll": _ctx.disableScroll,
          fontSize: _ctx.fontSize,
          duration: _ctx.duration,
          onClose: $options.close,
          onClick: $options.click,
          onChange: $options.change
        }, null, 8, ["color", "bgColor", "text", "mode", "step", "icon", "disable-touch", "disable-scroll", "fontSize", "duration", "onClose", "onClick", "onChange"])) : (vue.openBlock(), vue.createBlock(_component_uv_row_notice, {
          key: 1,
          color: _ctx.color,
          bgColor: _ctx.bgColor,
          text: _ctx.text,
          mode: _ctx.mode,
          fontSize: _ctx.fontSize,
          speed: _ctx.speed,
          url: _ctx.url,
          linkType: _ctx.linkType,
          icon: _ctx.icon,
          onClose: $options.close,
          onClick: $options.click
        }, null, 8, ["color", "bgColor", "text", "mode", "fontSize", "speed", "url", "linkType", "icon", "onClose", "onClick"]))
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$$], ["__scopeId", "data-v-ecf69ee0"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-notice-bar/components/uv-notice-bar/uv-notice-bar.vue"]]);
  const props$l = {
    props: {
      // 轮播的长度
      length: {
        type: [String, Number],
        default: 0
      },
      // 当前处于活动状态的轮播的索引
      current: {
        type: [String, Number],
        default: 0
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: ""
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: ""
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: ""
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.swiperIndicator
    }
  };
  const _sfc_main$$ = {
    name: "uv-swiper-indicator",
    mixins: [mpMixin, mixin, props$l],
    data() {
      return {
        lineWidth: 22
      };
    },
    computed: {
      // 指示器为线型的样式
      lineStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.lineWidth);
        style.transform = `translateX(${this.$uv.addUnit(this.current * this.lineWidth)})`;
        style.backgroundColor = this.indicatorActiveColor;
        return style;
      },
      // 指示器为点型的样式
      dotStyle() {
        return (index2) => {
          let style = {};
          style.backgroundColor = index2 === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
          return style;
        };
      }
    }
  };
  function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-swiper-indicator" }, [
      _ctx.indicatorMode === "line" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["uv-swiper-indicator__wrapper", [`uv-swiper-indicator__wrapper--${_ctx.indicatorMode}`]]),
          style: vue.normalizeStyle({
            width: _ctx.$uv.addUnit($data.lineWidth * _ctx.length),
            backgroundColor: _ctx.indicatorInactiveColor
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uv-swiper-indicator__wrapper--line__bar",
              style: vue.normalizeStyle([$options.lineStyle])
            },
            null,
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      _ctx.indicatorMode === "dot" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uv-swiper-indicator__wrapper"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.length, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                class: vue.normalizeClass(["uv-swiper-indicator__wrapper__dot", [index2 === _ctx.current && "uv-swiper-indicator__wrapper__dot--active"]]),
                key: index2,
                style: vue.normalizeStyle([$options.dotStyle(index2)])
              },
              null,
              6
              /* CLASS, STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$8 = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$_], ["__scopeId", "data-v-09034092"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-swiper/components/uv-swiper-indicator/uv-swiper-indicator.vue"]]);
  const props$k = {
    props: {
      // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
      list: {
        type: Array,
        default: () => []
      },
      // 是否显示面板指示器
      indicator: {
        type: Boolean,
        default: false
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: "#fff"
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: "rgba(255, 255, 255, 0.35)"
      },
      // 指示器样式，可通过bottom，left，right进行定位
      indicatorStyle: {
        type: [String, Object],
        default: ""
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: "line"
      },
      // 是否自动切换
      autoplay: {
        type: Boolean,
        default: true
      },
      // 当前所在滑块的 index
      current: {
        type: [String, Number],
        default: 0
      },
      // 当前所在滑块的 item-id ，不能与 current 被同时指定
      currentItemId: {
        type: String,
        default: ""
      },
      // 滑块自动切换时间间隔
      interval: {
        type: [String, Number],
        default: 3e3
      },
      // 滑块切换过程所需时间
      duration: {
        type: [String, Number],
        default: 300
      },
      // 播放到末尾后是否重新回到开头
      circular: {
        type: Boolean,
        default: false
      },
      // 滑动方向是否为纵向
      vertical: {
        type: Boolean,
        default: false
      },
      // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
      previousMargin: {
        type: [String, Number],
        default: 0
      },
      // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
      nextMargin: {
        type: [String, Number],
        default: 0
      },
      // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
      acceleration: {
        type: Boolean,
        default: false
      },
      // 同时显示的滑块数量，nvue、支付宝小程序不支持
      displayMultipleItems: {
        type: Number,
        default: 1
      },
      // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
      // 只对微信小程序有效
      easingFunction: {
        type: String,
        default: "default"
      },
      // list数组中指定对象的目标属性名
      keyName: {
        type: String,
        default: "url"
      },
      // 图片的裁剪模式
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 组件高度
      height: {
        type: [String, Number],
        default: 130
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#f3f4f6"
      },
      // 组件圆角，数值或带单位的字符串
      radius: {
        type: [String, Number],
        default: 4
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 是否显示标题，要求数组对象中有title属性
      showTitle: {
        type: Boolean,
        default: false
      },
      // 显示的标题样式
      titleStyle: {
        type: [Object, String],
        default: ""
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.swiper
    }
  };
  const _sfc_main$_ = {
    name: "uv-swiper",
    mixins: [mpMixin, mixin, props$k],
    emits: ["click", "change"],
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val, preVal) {
        if (val === preVal)
          return;
        this.currentIndex = val;
      }
    },
    computed: {
      itemStyle() {
        return (index2) => {
          const style = {};
          if (this.nextMargin && this.previousMargin) {
            style.borderRadius = this.$uv.addUnit(this.radius);
            if (index2 !== this.currentIndex)
              style.transform = "scale(0.92)";
          }
          return style;
        };
      }
    },
    methods: {
      getItemType(item) {
        if (typeof item === "string")
          return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
        if (typeof item === "object" && this.keyName) {
          if (!item.type)
            return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
          if (item.type === "image")
            return "image";
          if (item.type === "video")
            return "video";
          return "image";
        }
      },
      // 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
      getSource(item) {
        if (typeof item === "string")
          return item;
        if (typeof item === "object" && this.keyName)
          return item[this.keyName];
        else
          this.$uv.error("请按格式传递列表参数");
        return "";
      },
      // 轮播切换事件
      change(e2) {
        const {
          current
        } = e2.detail;
        this.pauseVideo(this.currentIndex);
        this.currentIndex = current;
        this.$emit("change", e2.detail);
      },
      // 切换轮播时，暂停视频播放
      pauseVideo(index2) {
        const lastItem = this.getSource(this.list[index2]);
        if (this.$uv.test.video(lastItem)) {
          const video2 = uni.createVideoContext(`video-${index2}`, this);
          video2.pause();
        }
      },
      // 当一个轮播item为视频时，获取它的视频海报
      getPoster(item) {
        return typeof item === "object" && item.poster ? item.poster : "";
      },
      // 点击某个item
      clickHandler(index2) {
        this.$emit("click", index2);
      }
    }
  };
  function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_swiper_indicator = resolveEasycom(vue.resolveDynamicComponent("uv-swiper-indicator"), __easycom_1$8);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-swiper",
        style: vue.normalizeStyle({
          backgroundColor: _ctx.bgColor,
          height: _ctx.$uv.addUnit(_ctx.height),
          borderRadius: _ctx.$uv.addUnit(_ctx.radius)
        })
      },
      [
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-swiper__loading"
        }, [
          vue.createVNode(_component_uv_loading_icon, { mode: "circle" })
        ])) : (vue.openBlock(), vue.createElementBlock("swiper", {
          key: 1,
          class: "uv-swiper__wrapper",
          style: vue.normalizeStyle({
            height: _ctx.$uv.addUnit(_ctx.height),
            flex: 1
          }),
          onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
          circular: _ctx.circular,
          vertical: _ctx.vertical,
          interval: _ctx.interval,
          duration: _ctx.duration,
          autoplay: _ctx.autoplay,
          current: _ctx.current,
          currentItemId: _ctx.currentItemId,
          previousMargin: _ctx.$uv.addUnit(_ctx.previousMargin),
          nextMargin: _ctx.$uv.addUnit(_ctx.nextMargin),
          acceleration: _ctx.acceleration,
          displayMultipleItems: _ctx.displayMultipleItems,
          easingFunction: _ctx.easingFunction
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.list, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                class: "uv-swiper__wrapper__item",
                key: index2
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "uv-swiper__wrapper__item__wrapper",
                    style: vue.normalizeStyle([$options.itemStyle(index2)])
                  },
                  [
                    vue.createCommentVNode(" 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 "),
                    $options.getItemType(item) === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "uv-swiper__wrapper__item__wrapper__image",
                      src: $options.getSource(item),
                      mode: _ctx.imgMode,
                      onClick: ($event) => $options.clickHandler(index2),
                      style: vue.normalizeStyle({
                        height: _ctx.$uv.addUnit(_ctx.height),
                        borderRadius: _ctx.$uv.addUnit(_ctx.radius)
                      })
                    }, null, 12, ["src", "mode", "onClick"])) : vue.createCommentVNode("v-if", true),
                    $options.getItemType(item) === "video" ? (vue.openBlock(), vue.createElementBlock("video", {
                      key: 1,
                      class: "uv-swiper__wrapper__item__wrapper__video",
                      id: `video-${index2}`,
                      "enable-progress-gesture": false,
                      src: $options.getSource(item),
                      poster: $options.getPoster(item),
                      title: _ctx.showTitle && _ctx.$uv.test.object(item) && item.title ? item.title : "",
                      style: vue.normalizeStyle({
                        height: _ctx.$uv.addUnit(_ctx.height)
                      }),
                      controls: "",
                      onClick: ($event) => $options.clickHandler(index2)
                    }, null, 12, ["id", "src", "poster", "title", "onClick"])) : vue.createCommentVNode("v-if", true),
                    _ctx.showTitle && _ctx.$uv.test.object(item) && item.title ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 2,
                        class: "uv-swiper__wrapper__item__wrapper__title uv-line-1",
                        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.titleStyle)])
                      },
                      vue.toDisplayString(item.title),
                      5
                      /* TEXT, STYLE */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 44, ["circular", "vertical", "interval", "duration", "autoplay", "current", "currentItemId", "previousMargin", "nextMargin", "acceleration", "displayMultipleItems", "easingFunction"])),
        vue.createElementVNode(
          "view",
          {
            class: "uv-swiper__indicator",
            style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.indicatorStyle)])
          },
          [
            vue.renderSlot(_ctx.$slots, "indicator", {}, () => [
              !_ctx.loading && _ctx.indicator && !_ctx.showTitle ? (vue.openBlock(), vue.createBlock(_component_uv_swiper_indicator, {
                key: 0,
                indicatorActiveColor: _ctx.indicatorActiveColor,
                indicatorInactiveColor: _ctx.indicatorInactiveColor,
                length: _ctx.list.length,
                current: $data.currentIndex,
                indicatorMode: _ctx.indicatorMode
              }, null, 8, ["indicatorActiveColor", "indicatorInactiveColor", "length", "current", "indicatorMode"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_4$3 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Z], ["__scopeId", "data-v-7522af0b"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-swiper/components/uv-swiper/uv-swiper.vue"]]);
  const _sfc_main$Z = {
    data() {
      const d2 = /* @__PURE__ */ new Date();
      const year = d2.getFullYear();
      let month = d2.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      const date2 = d2.getDate();
      return {
        money: [],
        storeId: 0,
        listData: [`${year}-${month}-${date2}`, `${year}-${month}-${date2}`],
        value: 0,
        orderList: [],
        list: [
          "https://cdn.uviewui.com/uview/swiper/swiper3.png",
          "https://cdn.uviewui.com/uview/swiper/swiper2.png",
          "https://cdn.uviewui.com/uview/swiper/swiper1.png"
        ],
        asd: {}
      };
    },
    methods: {
      leftClick() {
        formatAppLog("log", "at pages/index/index.vue:130", "leftClick");
      },
      goToPay() {
        uni.navigateTo({
          url: "/pages/index/pay/pay"
        });
      },
      goToMechantSettled() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/index/index.vue:140", userMsg);
        var userIsAuthentication = userMsg.userIsAuthentication;
        formatAppLog("log", "at pages/index/index.vue:142", userIsAuthentication);
        if (userIsAuthentication === 0) {
          uni.showToast({
            title: "请先去个人中心完成实名认证哦!",
            icon: "none"
          });
        } else {
          uni.navigateTo({
            url: "/pages/index/merchantSettled/merchantSettled"
          });
        }
      },
      goToTrade() {
        uni.navigateTo({
          url: "/pages/index/trade/trade"
        });
      },
      gotoUnusualOrders() {
        uni.navigateTo({
          url: "/pages/index/unusualOrders/unusualOrders"
        });
      },
      scanCode() {
        uni.scanCode({
          success: function(res) {
            formatAppLog("log", "at pages/index/index.vue:168", "条码类型：" + res.scanType);
            formatAppLog("log", "at pages/index/index.vue:169", "条码内容：" + res.result);
          }
        });
      },
      getOrder() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/index/index.vue:176", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/allOrder",
          "POST",
          {
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/index/index.vue:185", "orderList", res);
          if (res.data.code == 200) {
            this.orderList = res.data.data;
          }
        });
      },
      getMoney() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/index/index.vue:195", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/money",
          "GET",
          {
            data: this.listData,
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/index/index.vue:205", res);
          if (res.data.code == 200) {
            this.money = res.data.data;
          }
        });
      }
    },
    mounted() {
      this.getMoney();
      this.getOrder();
    }
  };
  function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_list_item = resolveEasycom(vue.resolveDynamicComponent("uv-list-item"), __easycom_1$a);
    const _component_uv_list = resolveEasycom(vue.resolveDynamicComponent("uv-list"), __easycom_2$6);
    const _component_uv_notice_bar = resolveEasycom(vue.resolveDynamicComponent("uv-notice-bar"), __easycom_3$2);
    const _component_uv_swiper = resolveEasycom(vue.resolveDynamicComponent("uv-swiper"), __easycom_4$3);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "margin-top": "55rpx" } }),
        vue.createElementVNode("view", { class: "topcolor" }, [
          vue.createElementVNode("view", null, [
            vue.createVNode(_component_uv_navbar, {
              fixed: false,
              title: "聚合支付",
              safeAreaInsetTop: false,
              bgColor: "#FA4848"
            }, {
              left: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "uv-nav-slot" })
              ]),
              right: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "uv-nav-slot" }, [
                  vue.createCommentVNode(' <uv-icon name="scan" size="25" color="white"></uv-icon> ')
                ])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createElementVNode("view", { class: "functionbar" }, [
            vue.createElementVNode("view", {
              class: "functionbar2",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.goToPay && $options.goToPay(...args))
            }, [
              vue.createElementVNode("image", {
                src: "/static/icon/collection1.png",
                style: { "width": "100rpx", "height": "100rpx" }
              }),
              vue.createElementVNode("span", null, "收款码")
            ]),
            vue.createElementVNode("view", {
              class: "functionbar2",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.scanCode())
            }, [
              vue.createElementVNode("image", {
                src: "/static/icon/scanpay1.png",
                style: { "width": "100rpx", "height": "100rpx" }
              }),
              vue.createElementVNode("span", null, "扫码收款")
            ]),
            vue.createElementVNode("view", {
              class: "functionbar2",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.goToMechantSettled && $options.goToMechantSettled(...args))
            }, [
              vue.createElementVNode("image", {
                src: "/static/icon/merchant.png",
                style: { "width": "100rpx", "height": "100rpx" }
              }),
              vue.createElementVNode("span", null, "商家入驻")
            ]),
            vue.createElementVNode("view", {
              class: "functionbar2",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.gotoUnusualOrders && $options.gotoUnusualOrders(...args))
            }, [
              vue.createElementVNode("image", {
                src: "/static/icon/unusual.png",
                style: { "width": "100rpx", "height": "100rpx" }
              }),
              vue.createElementVNode("span", null, "异常订单")
            ])
          ]),
          vue.createCommentVNode(" 今日营业额 "),
          vue.createElementVNode("view", { class: "paybar" }, [
            vue.createElementVNode("span", { style: { "padding-left": "10px", "line-height": "2", "color": "#C8C7CD", "font-size": "15px" } }, "今日营业额"),
            vue.createElementVNode("view", { class: "paybar-container" }, [
              vue.createElementVNode("view", { class: "paybar-left" }, [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString($data.money.sum),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("p", null, "收款汇总(元)")
              ]),
              vue.createElementVNode("view", { class: "paybar_right" }, [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString($data.money.count),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("p", null, "笔数(笔)")
              ])
            ])
          ])
        ]),
        vue.createCommentVNode(" 最新交易 "),
        vue.createElementVNode("view", { class: "tradebar" }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("navigator", {
              url: "",
              "hover-class": "none",
              class: "tradebar-top"
            }, [
              vue.createElementVNode("view", { class: "txt" }, [
                vue.createElementVNode("text", null, "最新交易"),
                vue.createElementVNode("text", {
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.goToTrade && $options.goToTrade(...args))
                }, "更多")
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "tradebar-bottom" }, [
            vue.createVNode(_component_uv_list, null, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.orderList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", null, [
                      index2 < 3 && item.orderPayway == "支付宝" && item.orderReback == 0 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                        key: 0,
                        title: "支付成功",
                        note: item.orderCreatetime,
                        thumb: "/static/icon/alipay.png",
                        "thumb-size": "lg",
                        rightText: item.orderMoney.toString(),
                        clickable: true,
                        style: { "font-weight": "bold" }
                      }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                      index2 < 3 && item.orderPayway == "支付宝" && item.orderReback == 1 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                        key: 1,
                        title: "退款成功",
                        note: item.orderCreatetime,
                        thumb: "/static/icon/alipay.png",
                        "thumb-size": "lg",
                        rightText: item.orderMoney.toString(),
                        clickable: true,
                        style: { "font-weight": "bold" }
                      }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                      index2 < 3 && item.orderPayway == "微信" && item.orderReback == 0 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                        key: 2,
                        title: "支付成功",
                        note: item.orderCreatetime,
                        thumb: "/static/icon/wechat.png",
                        "thumb-size": "lg",
                        rightText: item.orderMoney.toString(),
                        clickable: true,
                        style: { "font-weight": "bold" }
                      }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                      index2 < 3 && item.orderPayway == "微信" && item.orderReback == 1 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                        key: 3,
                        title: "退款成功",
                        note: item.orderCreatetime,
                        thumb: "/static/icon/wechat.png",
                        "thumb-size": "lg",
                        rightText: item.orderMoney.toString(),
                        clickable: true,
                        style: { "font-weight": "bold" }
                      }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]),
        vue.createCommentVNode(" 结算出款通知 "),
        vue.createElementVNode("view", { class: "settlementbar" }, [
          vue.createElementVNode("view", null, [
            vue.createVNode(_component_uv_notice_bar, {
              text: "结算出款通知",
              bgColor: "#E75650",
              style: { "border-radius": "20rpx" },
              color: "white"
            })
          ])
        ]),
        vue.createCommentVNode(" 广告栏 "),
        vue.createElementVNode("view", { class: "uv-demo-block" }, [
          vue.createCommentVNode(' <text class="uv-demo-block__title">卡片式</text> '),
          vue.createVNode(_component_uv_swiper, {
            list: $data.list,
            previousMargin: "30",
            nextMargin: "30",
            circular: "",
            autoplay: false,
            radius: "5",
            gColor: "#ffffff",
            height: "350rpx"
          }, null, 8, ["list"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Y], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/index.vue"]]);
  const _sfc_main$Y = {
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
  function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$5 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$X], ["__scopeId", "data-v-560f16b2"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$X = {
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
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.popup
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
      clear(e2) {
        e2.stopPropagation();
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
  function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$d);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_0$a);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_2$5);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_2$a);
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
  const __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$W], ["__scopeId", "data-v-01a3ad6e"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  const _sfc_main$W = {
    data() {
      return {
        triggered: false,
        userId: "",
        //店铺名称
        userNickname: "",
        //商户id
        userAccountType: "",
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
      this._freshing = false;
      setTimeout(() => {
        this.triggered = true;
      }, 100);
    },
    mounted() {
      var userMsg = uni.getStorageSync("userMsg");
      this.userNickname = userMsg.userNickname;
      this.userId = userMsg.userId;
      if (userMsg.userAccountType === 0) {
        this.userAccountType = "普通账号";
      } else if (userMsg.userAccountType === 1) {
        this.userAccountType = "商家主账号";
      } else {
        this.userAccountType = "商家子账号";
      }
      this.getCashOutMoney();
    },
    methods: {
      input_store(e2) {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:228", e2);
      },
      select_store(e2) {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:231", e2);
      },
      exitApp() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      //确认退出系统
      confirm() {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:241", "退出的逻辑");
        this.$refs.popup.close();
        uni.removeStorageSync("userMsg");
        uni.removeStorageSync("userMsgExpiredTime");
        uni.redirectTo({
          // 不保留当前页面，跳转到应用内的某个页面
          url: "/pages/login/login"
        });
      },
      getCashOutMoney() {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:252", this.userId);
        this.$request("/user/getCashOutMoney", "POST", { userId: this.userId }).then((res) => {
          formatAppLog("log", "at pages/personalCenter/personalCenter.vue:254", res);
          this.withdrawableMoney = res.data.data.cashOutMoney;
          this.auditingMoney = res.data.data.auditMoney;
        }).catch((err) => {
          uni.showToast({
            "title": "服务器错误，请稍后再试",
            "icon": "none"
          });
        });
      },
      showCashOutStore() {
        uni.navigateTo({
          url: "/pages/personalCenter/showCashOutStore/showCashOutStore"
        });
      },
      onPulling(e2) {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:270", "onpulling", e2);
      },
      onRefresh() {
        if (this._freshing)
          return;
        this._freshing = true;
        setTimeout(() => {
          this.triggered = false;
          this._freshing = false;
        }, 1e3);
      },
      onRestore() {
        this.triggered = "restore";
        this.getCashOutMoney();
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:283", "onRestore");
      },
      onAbort() {
        formatAppLog("log", "at pages/personalCenter/personalCenter.vue:286", "onAbort");
      }
    }
  };
  function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("scroll-view", {
        style: { "height": "100%" },
        "scroll-y": "true",
        "refresher-enabled": "true",
        "refresher-triggered": $data.triggered,
        "refresher-threshold": 100,
        "refresher-background": "lightgrey",
        onRefresherpulling: _cache[0] || (_cache[0] = (...args) => $options.onPulling && $options.onPulling(...args)),
        onRefresherrefresh: _cache[1] || (_cache[1] = (...args) => $options.onRefresh && $options.onRefresh(...args)),
        onRefresherrestore: _cache[2] || (_cache[2] = (...args) => $options.onRestore && $options.onRestore(...args)),
        onRefresherabort: _cache[3] || (_cache[3] = (...args) => $options.onAbort && $options.onAbort(...args))
      }, [
        vue.createElementVNode("view", { class: "header" }, [
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
                    " 昵称：" + vue.toDisplayString($data.userNickname),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "storeId" },
                    " 账号类型：" + vue.toDisplayString($data.userAccountType),
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
                url: "/pages/personalCenter/chatWindow/chatWindow",
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
                url: "/pages/identify/identify",
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
                  vue.createElementVNode("text", null, "实名认证")
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
                style: { "margin-top": "70rpx" }
              }, null, 8, ["onClick"])
            ])
          ])
        ])
      ], 40, ["refresher-triggered"])
    ]);
  }
  const PagesPersonalCenterPersonalCenter = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$V], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/personalCenter.vue"]]);
  const props$j = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      showBorder: {
        type: Boolean,
        default: false
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 标题文字
      title: {
        type: String,
        default: ""
      },
      ...(_J = (_I = uni.$uv) == null ? void 0 : _I.props) == null ? void 0 : _J.toolbar
    }
  };
  const _sfc_main$V = {
    name: "uv-toolbar",
    emits: ["confirm", "cancel"],
    mixins: [mpMixin, mixin, props$j],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-toolbar", { "uv-border-bottom": _ctx.showBorder }]),
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "uv-toolbar__cancel__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-toolbar__title uv-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uv-toolbar__confirm__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$U], ["__scopeId", "data-v-298cf9e4"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-toolbar/components/uv-toolbar/uv-toolbar.vue"]]);
  const props$i = {
    props: {
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 弹窗圆角
      round: {
        type: [String, Number],
        default: 0
      },
      // 对象数组，设置每一列的数据
      columns: {
        type: Array,
        default: () => []
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: 44
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 选中文字的颜色
      activeColor: {
        type: String,
        default: ""
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: 5
      },
      // 选项对象中，需要展示的属性键名
      keyName: {
        type: String,
        default: "text"
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认关闭选择器
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: () => []
      },
      // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
      immediateChange: {
        type: Boolean,
        default: true
      },
      ...(_L = (_K = uni.$uv) == null ? void 0 : _K.props) == null ? void 0 : _L.picker
    }
  };
  const _sfc_main$U = {
    name: "uv-picker",
    emits: ["confirm", "cancel", "close", "change"],
    mixins: [mpMixin, mixin, props$i],
    computed: {
      // 为了解决支付宝不生效
      textStyle() {
        return (index2, index1) => {
          const style = {};
          style.display = "block";
          if (this.color) {
            style.color = this.color;
          }
          if (this.activeColor && index1 === this.innerIndex[index2]) {
            style.color = this.activeColor;
          }
          return style;
        };
      }
    },
    data() {
      return {
        // 上一次选择的列索引
        lastIndex: [],
        // 索引值 ，对应picker-view的value
        innerIndex: [],
        // 各列的值
        innerColumns: [],
        // 上一次的变化列索引
        columnIndex: 0
      };
    },
    watch: {
      // 监听默认索引的变化，重新设置对应的值
      defaultIndex: {
        immediate: true,
        handler(n2) {
          this.setIndexs(n2, true);
        }
      },
      // 监听columns参数的变化
      columns: {
        deep: true,
        immediate: true,
        handler(n2) {
          this.setColumns(n2);
        }
      }
    },
    methods: {
      open() {
        this.$refs.pickerPopup.open();
      },
      close() {
        this.$refs.pickerPopup.close();
      },
      popupChange(e2) {
        if (!e2.show)
          this.$emit("close");
      },
      // 获取item需要显示的文字，判别为对象还是文本
      getItemText(item) {
        if (this.$uv.test.object(item)) {
          return item[this.keyName];
        } else {
          return item;
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
        this.close();
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", this.$uv.deepClone({
          indexs: this.innerIndex,
          value: this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]),
          values: this.innerColumns
        }));
        if (this.closeOnClickConfirm) {
          this.close();
        }
      },
      // 选择器某一列的数据发生变化时触发
      changeHandler(e2) {
        const {
          value: value2
        } = e2.detail;
        let index2 = 0, columnIndex = 0;
        for (let i2 = 0; i2 < value2.length; i2++) {
          let item = value2[i2];
          if (item !== (this.lastIndex[i2] || 0)) {
            columnIndex = i2;
            index2 = item;
            break;
          }
        }
        this.columnIndex = columnIndex;
        const values = this.innerColumns;
        this.setLastIndex(value2);
        this.setIndexs(value2);
        this.$emit("change", {
          value: this.innerColumns.map((item, index3) => item[value2[index3]]),
          index: index2,
          indexs: value2,
          // values为当前变化列的数组内容
          values,
          columnIndex
        });
      },
      // 设置index索引，此方法可被外部调用设置
      setIndexs(index2, setLastIndex) {
        this.innerIndex = this.$uv.deepClone(index2);
        if (setLastIndex) {
          this.setLastIndex(index2);
        }
      },
      // 记录上一次的各列索引位置
      setLastIndex(index2) {
        this.lastIndex = this.$uv.deepClone(index2);
      },
      // 设置对应列选项的所有值
      setColumnValues(columnIndex, values) {
        this.innerColumns.splice(columnIndex, 1, values);
        let tmpIndex = this.$uv.deepClone(this.innerIndex);
        for (let i2 = 0; i2 < this.innerColumns.length; i2++) {
          if (i2 > this.columnIndex) {
            tmpIndex[i2] = 0;
          }
        }
        this.setIndexs(tmpIndex);
      },
      // 获取对应列的所有选项
      getColumnValues(columnIndex) {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns[columnIndex];
      },
      // 设置整体各列的columns的值
      setColumns(columns) {
        this.innerColumns = this.$uv.deepClone(columns);
        if (this.innerIndex.length === 0) {
          this.innerIndex = new Array(columns.length).fill(0);
        }
      },
      // 获取各列选中值对应的索引
      getIndexs() {
        return this.innerIndex;
      },
      // 获取各列选中的值
      getValues() {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]);
      }
    }
  };
  function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_toolbar = resolveEasycom(vue.resolveDynamicComponent("uv-toolbar"), __easycom_0$7);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "pickerPopup",
      mode: "bottom",
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-picker" }, [
          _ctx.showToolbar ? (vue.openBlock(), vue.createBlock(_component_uv_toolbar, {
            key: 0,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            onCancel: $options.cancel,
            onConfirm: $options.confirm
          }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("picker-view", {
            class: "uv-picker__view",
            indicatorStyle: `height: ${_ctx.$uv.addUnit(_ctx.itemHeight)}`,
            value: $data.innerIndex,
            immediateChange: _ctx.immediateChange,
            style: vue.normalizeStyle({
              height: `${_ctx.$uv.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`
            }),
            onChange: _cache[0] || (_cache[0] = (...args) => $options.changeHandler && $options.changeHandler(...args))
          }, [
            vue.createCommentVNode(" @pickend在这里为了解决抖音等滚到底不触发change兼容性问题 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.innerColumns, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", {
                  key: index2,
                  class: "uv-picker__view__column"
                }, [
                  _ctx.$uv.test.array(item) ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(item, (item1, index1) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          class: "uv-picker__view__column__item uv-line-1",
                          key: index1,
                          style: vue.normalizeStyle([{
                            height: _ctx.$uv.addUnit(_ctx.itemHeight),
                            lineHeight: _ctx.$uv.addUnit(_ctx.itemHeight),
                            fontWeight: index1 === $data.innerIndex[index2] ? "bold" : "normal"
                          }, $options.textStyle(index2, index1)])
                        },
                        vue.toDisplayString($options.getItemText(item1)),
                        5
                        /* TEXT, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["indicatorStyle", "value", "immediateChange"]),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uv-picker--loading"
          }, [
            vue.createVNode(_component_uv_loading_icon, { mode: "circle" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$T], ["__scopeId", "data-v-f74a1703"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-picker/components/uv-picker/uv-picker.vue"]]);
  var calendar = {
    /**
        * 农历1900-2100的润大小信息表
        * @Array Of Property
        * @return Hex
        */
    lunarInfo: [
      19416,
      19168,
      42352,
      21717,
      53856,
      55632,
      91476,
      22176,
      39632,
      21970,
      // 1900-1909
      19168,
      42422,
      42192,
      53840,
      119381,
      46400,
      54944,
      44450,
      38320,
      84343,
      // 1910-1919
      18800,
      42160,
      46261,
      27216,
      27968,
      109396,
      11104,
      38256,
      21234,
      18800,
      // 1920-1929
      25958,
      54432,
      59984,
      28309,
      23248,
      11104,
      100067,
      37600,
      116951,
      51536,
      // 1930-1939
      54432,
      120998,
      46416,
      22176,
      107956,
      9680,
      37584,
      53938,
      43344,
      46423,
      // 1940-1949
      27808,
      46416,
      86869,
      19872,
      42416,
      83315,
      21168,
      43432,
      59728,
      27296,
      // 1950-1959
      44710,
      43856,
      19296,
      43748,
      42352,
      21088,
      62051,
      55632,
      23383,
      22176,
      // 1960-1969
      38608,
      19925,
      19152,
      42192,
      54484,
      53840,
      54616,
      46400,
      46752,
      103846,
      // 1970-1979
      38320,
      18864,
      43380,
      42160,
      45690,
      27216,
      27968,
      44870,
      43872,
      38256,
      // 1980-1989
      19189,
      18800,
      25776,
      29859,
      59984,
      27480,
      23232,
      43872,
      38613,
      37600,
      // 1990-1999
      51552,
      55636,
      54432,
      55888,
      30034,
      22176,
      43959,
      9680,
      37584,
      51893,
      // 2000-2009
      43344,
      46240,
      47780,
      44368,
      21977,
      19360,
      42416,
      86390,
      21168,
      43312,
      // 2010-2019
      31060,
      27296,
      44368,
      23378,
      19296,
      42726,
      42208,
      53856,
      60005,
      54576,
      // 2020-2029
      23200,
      30371,
      38608,
      19195,
      19152,
      42192,
      118966,
      53840,
      54560,
      56645,
      // 2030-2039
      46496,
      22224,
      21938,
      18864,
      42359,
      42160,
      43600,
      111189,
      27936,
      44448,
      // 2040-2049
      /** Add By JJonline@JJonline.Cn**/
      84835,
      37744,
      18936,
      18800,
      25776,
      92326,
      59984,
      27424,
      108228,
      43744,
      // 2050-2059
      41696,
      53987,
      51552,
      54615,
      54432,
      55888,
      23893,
      22176,
      42704,
      21972,
      // 2060-2069
      21200,
      43448,
      43344,
      46240,
      46758,
      44368,
      21920,
      43940,
      42416,
      21168,
      // 2070-2079
      45683,
      26928,
      29495,
      27296,
      44368,
      84821,
      19296,
      42352,
      21732,
      53600,
      // 2080-2089
      59752,
      54560,
      55968,
      92838,
      22224,
      19168,
      43476,
      41680,
      53584,
      62034,
      // 2090-2099
      54560
    ],
    // 2100
    /**
        * 公历每个月份的天数普通表
        * @Array Of Property
        * @return Number
        */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /**
        * 天干地支之天干速查表
        * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
        * @return Cn string
        */
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
        * 天干地支之地支速查表
        * @Array Of Property
        * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
        * @return Cn string
        */
    Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    /**
        * 天干地支之地支速查表<=>生肖
        * @Array Of Property
        * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
        * @return Cn string
        */
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    /**
        * 24节气速查表
        * @Array Of Property
        * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
        * @return Cn string
        */
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    /**
        * 1900-2100各年的24节气日期速查表
        * @Array Of Property
        * @return 0x string For splice
        */
    sTermInfo: [
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "9778397bd19801ec9210c965cc920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd197c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bcf97c3598082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd19801ec9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bd07f1487f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b97bd197c36c9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b70c9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "977837f0e37f149b0723b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0723b06bd",
      "7f07e7f0e37f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e37f14998083b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14898082b0723b02d5",
      "7f07e7f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66aa89801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e26665b66a449801e9808297c35",
      "665f67f0e37f1489801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722"
    ],
    /**
        * 数字转中文速查表
        * @Array Of Property
        * @trans ['日','一','二','三','四','五','六','七','八','九','十']
        * @return Cn string
        */
    nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    /**
        * 日期转农历称呼速查表
        * @Array Of Property
        * @trans ['初','十','廿','卅']
        * @return Cn string
        */
    nStr2: ["初", "十", "廿", "卅"],
    /**
        * 月份转农历称呼速查表
        * @Array Of Property
        * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
        * @return Cn string
        */
    nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
    /**
        * 返回农历y年一整年的总天数
        * @param lunar Year
        * @return Number
        * @eg:var count = calendar.lYearDays(1987) ;//count=387
        */
    lYearDays: function(y2) {
      var i2;
      var sum = 348;
      for (i2 = 32768; i2 > 8; i2 >>= 1) {
        sum += this.lunarInfo[y2 - 1900] & i2 ? 1 : 0;
      }
      return sum + this.leapDays(y2);
    },
    /**
        * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
        * @param lunar Year
        * @return Number (0-12)
        * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
        */
    leapMonth: function(y2) {
      return this.lunarInfo[y2 - 1900] & 15;
    },
    /**
        * 返回农历y年闰月的天数 若该年没有闰月则返回0
        * @param lunar Year
        * @return Number (0、29、30)
        * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
        */
    leapDays: function(y2) {
      if (this.leapMonth(y2)) {
        return this.lunarInfo[y2 - 1900] & 65536 ? 30 : 29;
      }
      return 0;
    },
    /**
        * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
        * @param lunar Year
        * @return Number (-1、29、30)
        * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
        */
    monthDays: function(y2, m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      return this.lunarInfo[y2 - 1900] & 65536 >> m2 ? 30 : 29;
    },
    /**
        * 返回公历(!)y年m月的天数
        * @param solar Year
        * @return Number (-1、28、29、30、31)
        * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
        */
    solarDays: function(y2, m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      var ms2 = m2 - 1;
      if (ms2 == 1) {
        return y2 % 4 == 0 && y2 % 100 != 0 || y2 % 400 == 0 ? 29 : 28;
      } else {
        return this.solarMonth[ms2];
      }
    },
    /**
       * 农历年份转换为干支纪年
       * @param  lYear 农历年的年份数
       * @return Cn string
       */
    toGanZhiYear: function(lYear) {
      var ganKey = (lYear - 3) % 10;
      var zhiKey = (lYear - 3) % 12;
      if (ganKey == 0)
        ganKey = 10;
      if (zhiKey == 0)
        zhiKey = 12;
      return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
    },
    /**
       * 公历月、日判断所属星座
       * @param  cMonth [description]
       * @param  cDay [description]
       * @return Cn string
       */
    toAstro: function(cMonth, cDay) {
      var s2 = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s2.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "座";
    },
    /**
        * 传入offset偏移量返回干支
        * @param offset 相对甲子的偏移量
        * @return Cn string
        */
    toGanZhi: function(offset) {
      return this.Gan[offset % 10] + this.Zhi[offset % 12];
    },
    /**
        * 传入公历(!)y年获得该年第n个节气的公历日期
        * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
        * @return day Number
        * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
        */
    getTerm: function(y2, n2) {
      if (y2 < 1900 || y2 > 2100) {
        return -1;
      }
      if (n2 < 1 || n2 > 24) {
        return -1;
      }
      var _table = this.sTermInfo[y2 - 1900];
      var _info = [
        parseInt("0x" + _table.substr(0, 5)).toString(),
        parseInt("0x" + _table.substr(5, 5)).toString(),
        parseInt("0x" + _table.substr(10, 5)).toString(),
        parseInt("0x" + _table.substr(15, 5)).toString(),
        parseInt("0x" + _table.substr(20, 5)).toString(),
        parseInt("0x" + _table.substr(25, 5)).toString()
      ];
      var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),
        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),
        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),
        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),
        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),
        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2)
      ];
      return parseInt(_calday[n2 - 1]);
    },
    /**
        * 传入农历数字月份返回汉语通俗表示法
        * @param lunar month
        * @return Cn string
        * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
        */
    toChinaMonth: function(m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      var s2 = this.nStr3[m2 - 1];
      s2 += "月";
      return s2;
    },
    /**
        * 传入农历日期数字返回汉字表示法
        * @param lunar day
        * @return Cn string
        * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
        */
    toChinaDay: function(d2) {
      var s2;
      switch (d2) {
        case 10:
          s2 = "初十";
          break;
        case 20:
          s2 = "二十";
          break;
        case 30:
          s2 = "三十";
          break;
        default:
          s2 = this.nStr2[Math.floor(d2 / 10)];
          s2 += this.nStr1[d2 % 10];
      }
      return s2;
    },
    /**
        * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
        * @param y year
        * @return Cn string
        * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
        */
    getAnimal: function(y2) {
      return this.Animals[(y2 - 4) % 12];
    },
    /**
        * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
        * @param y  solar year
        * @param m  solar month
        * @param d  solar day
        * @return JSON object
        * @eg:__f__('log','at uni_modules/uv-calendars/components/uv-calendars/calendar.js:381',calendar.solar2lunar(1987,11,01));
        */
    solar2lunar: function(y2, m2, d2) {
      if (y2 < 1900 || y2 > 2100) {
        return -1;
      }
      if (y2 == 1900 && m2 == 1 && d2 < 31) {
        return -1;
      }
      if (!y2) {
        var objDate = /* @__PURE__ */ new Date();
      } else {
        var objDate = new Date(y2, parseInt(m2) - 1, d2);
      }
      var i2;
      var leap = 0;
      var temp = 0;
      var y2 = objDate.getFullYear();
      var m2 = objDate.getMonth() + 1;
      var d2 = objDate.getDate();
      var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
      for (i2 = 1900; i2 < 2101 && offset > 0; i2++) {
        temp = this.lYearDays(i2);
        offset -= temp;
      }
      if (offset < 0) {
        offset += temp;
        i2--;
      }
      var isTodayObj = /* @__PURE__ */ new Date();
      var isToday = false;
      if (isTodayObj.getFullYear() == y2 && isTodayObj.getMonth() + 1 == m2 && isTodayObj.getDate() == d2) {
        isToday = true;
      }
      var nWeek = objDate.getDay();
      var cWeek = this.nStr1[nWeek];
      if (nWeek == 0) {
        nWeek = 7;
      }
      var year = i2;
      var leap = this.leapMonth(i2);
      var isLeap = false;
      for (i2 = 1; i2 < 13 && offset > 0; i2++) {
        if (leap > 0 && i2 == leap + 1 && isLeap == false) {
          --i2;
          isLeap = true;
          temp = this.leapDays(year);
        } else {
          temp = this.monthDays(year, i2);
        }
        if (isLeap == true && i2 == leap + 1) {
          isLeap = false;
        }
        offset -= temp;
      }
      if (offset == 0 && leap > 0 && i2 == leap + 1) {
        if (isLeap) {
          isLeap = false;
        } else {
          isLeap = true;
          --i2;
        }
      }
      if (offset < 0) {
        offset += temp;
        --i2;
      }
      var month = i2;
      var day = offset + 1;
      var sm = m2 - 1;
      var gzY = this.toGanZhiYear(year);
      var firstNode = this.getTerm(y2, m2 * 2 - 1);
      var secondNode = this.getTerm(y2, m2 * 2);
      var gzM = this.toGanZhi((y2 - 1900) * 12 + m2 + 11);
      if (d2 >= firstNode) {
        gzM = this.toGanZhi((y2 - 1900) * 12 + m2 + 12);
      }
      var isTerm = false;
      var Term = null;
      if (firstNode == d2) {
        isTerm = true;
        Term = this.solarTerm[m2 * 2 - 2];
      }
      if (secondNode == d2) {
        isTerm = true;
        Term = this.solarTerm[m2 * 2 - 1];
      }
      var dayCyclical = Date.UTC(y2, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
      var gzD = this.toGanZhi(dayCyclical + d2 - 1);
      var astro = this.toAstro(m2, d2);
      return { "lYear": year, "lMonth": month, "lDay": day, "Animal": this.getAnimal(year), "IMonthCn": (isLeap ? "闰" : "") + this.toChinaMonth(month), "IDayCn": this.toChinaDay(day), "cYear": y2, "cMonth": m2, "cDay": d2, "gzYear": gzY, "gzMonth": gzM, "gzDay": gzD, "isToday": isToday, "isLeap": isLeap, "nWeek": nWeek, "ncWeek": "星期" + cWeek, "isTerm": isTerm, "Term": Term, "astro": astro };
    },
    /**
        * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
        * @param y  lunar year
        * @param m  lunar month
        * @param d  lunar day
        * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
        * @return JSON object
        * @eg:__f__('log','at uni_modules/uv-calendars/components/uv-calendars/calendar.js:500',calendar.lunar2solar(1987,9,10));
        */
    lunar2solar: function(y2, m2, d2, isLeapMonth) {
      var isLeapMonth = !!isLeapMonth;
      var leapMonth = this.leapMonth(y2);
      this.leapDays(y2);
      if (isLeapMonth && leapMonth != m2) {
        return -1;
      }
      if (y2 == 2100 && m2 == 12 && d2 > 1 || y2 == 1900 && m2 == 1 && d2 < 31) {
        return -1;
      }
      var day = this.monthDays(y2, m2);
      var _day = day;
      if (isLeapMonth) {
        _day = this.leapDays(y2, m2);
      }
      if (y2 < 1900 || y2 > 2100 || d2 > _day) {
        return -1;
      }
      var offset = 0;
      for (var i2 = 1900; i2 < y2; i2++) {
        offset += this.lYearDays(i2);
      }
      var leap = 0;
      var isAdd = false;
      for (var i2 = 1; i2 < m2; i2++) {
        leap = this.leapMonth(y2);
        if (!isAdd) {
          if (leap <= i2 && leap > 0) {
            offset += this.leapDays(y2);
            isAdd = true;
          }
        }
        offset += this.monthDays(y2, i2);
      }
      if (isLeapMonth) {
        offset += day;
      }
      var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
      var calObj = new Date((offset + d2 - 31) * 864e5 + stmap);
      var cY = calObj.getUTCFullYear();
      var cM = calObj.getUTCMonth() + 1;
      var cD = calObj.getUTCDate();
      return this.solar2lunar(cY, cM, cD);
    }
  };
  class Calendar {
    constructor({
      date: date2,
      selected,
      startDate,
      endDate,
      range: range2,
      multiple,
      allowSameDay
    } = {}) {
      this.date = this.getDate(/* @__PURE__ */ new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range2;
      this.multiple = multiple;
      this.allowSameDay = allowSameDay;
      this.cleanRangeStatus();
      this.cleanMultipleStatus();
      this.weeks = {};
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date2, status) {
      if (this.range && status == "init") {
        this.cleanRangeStatus();
        if (Array.isArray(date2)) {
          this.rangeStatus.before = date2[0];
          this.rangeStatus.after = date2.length > 1 ? date2[date2.length - 1] : "";
          if (this.rangeStatus.after && this.dateCompare(this.rangeStatus.before, this.rangeStatus.after)) {
            this.rangeStatus.data = this.geDateAll(this.rangeStatus.before, this.rangeStatus.after);
          }
          this.selectDate = this.getDate(date2[0]);
          this._getWeek(this.selectDate.fullDate);
        } else {
          this.selectDate = this.getDate(date2);
          this.rangeStatus.before = this.selectDate.fullDate;
          this._getWeek(this.selectDate.fullDate);
        }
      } else if (this.multiple && status == "init") {
        this.cleanMultipleStatus();
        if (Array.isArray(date2)) {
          this.multipleStatus.data = date2;
          this.selectDate = this.getDate(date2[0]);
          this._getWeek(this.selectDate.fullDate);
        } else {
          this.selectDate = this.getDate(date2);
          this.multipleStatus.data = [this.selectDate.fullDate];
          this._getWeek(this.selectDate.fullDate);
        }
      } else {
        if (Array.isArray(date2)) {
          this.selectDate = this.getDate(date2[0]);
          this._getWeek(this.selectDate.fullDate);
        } else {
          this.selectDate = this.getDate(date2);
          this._getWeek(this.selectDate.fullDate);
        }
      }
    }
    /**
     * 清理多选状态
     */
    cleanRangeStatus() {
      this.rangeStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        data: []
      };
    }
    /**
     * 重置开始日期
     */
    resetSatrtDate(startDate) {
      this.startDate = startDate;
    }
    /**
     * 重置结束日期
     */
    resetEndDate(endDate) {
      this.endDate = endDate;
    }
    /**
     * 获取任意时间
     */
    getDate(date2, AddDayCount = 0, str = "day") {
      if (!date2) {
        date2 = /* @__PURE__ */ new Date();
      }
      if (typeof date2 !== "object") {
        date2 = date2.replace(/-/g, "/");
      }
      const dd = new Date(date2);
      switch (str) {
        case "day":
          dd.setDate(dd.getDate() + AddDayCount);
          break;
        case "month":
          if (dd.getDate() === 31 && AddDayCount > 0) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            const preMonth = dd.getMonth();
            dd.setMonth(preMonth + AddDayCount);
            const nextMonth = dd.getMonth();
            if (AddDayCount < 0 && preMonth !== 0 && nextMonth - preMonth > AddDayCount) {
              dd.setMonth(nextMonth + (nextMonth - preMonth + AddDayCount));
            }
            if (AddDayCount > 0 && nextMonth - preMonth > AddDayCount) {
              dd.setMonth(nextMonth - (nextMonth - preMonth - AddDayCount));
            }
          }
          break;
        case "year":
          dd.setFullYear(dd.getFullYear() + AddDayCount);
          break;
      }
      const y2 = dd.getFullYear();
      const m2 = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      const d2 = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return {
        fullDate: y2 + "-" + m2 + "-" + d2,
        year: y2,
        month: m2,
        date: d2,
        day: dd.getDay()
      };
    }
    /**
     * 获取上月剩余天数
     */
    _getLastMonthDays(firstDay, full) {
      let dateArr = [];
      for (let i2 = firstDay; i2 > 0; i2--) {
        const beforeDate = new Date(full.year, full.month - 1, -i2 + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取本月天数
     */
    _currentMonthDys(dateData, full) {
      let dateArr = [];
      let fullDate = this.date.fullDate;
      for (let i2 = 1; i2 <= dateData; i2++) {
        let nowDate = full.year + "-" + (full.month < 10 ? full.month : full.month) + "-" + (i2 < 10 ? "0" + i2 : i2);
        let isDay = fullDate === nowDate;
        let info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });
        let disableBefore = true;
        let disableAfter = true;
        if (this.startDate) {
          disableBefore = this.dateCompare(this.startDate, nowDate);
        }
        if (this.endDate) {
          disableAfter = this.dateCompare(nowDate, this.endDate);
        }
        let ranges = this.rangeStatus.data;
        let checked = false;
        let rangesStatus = -1;
        if (this.range) {
          if (ranges) {
            rangesStatus = ranges.findIndex((item) => {
              return this.dateEqual(item, nowDate);
            });
          }
          if (rangesStatus !== -1) {
            checked = true;
          }
        }
        let multiples = this.multipleStatus.data;
        let checked_multiple = false;
        let multiplesStatus = -1;
        if (this.multiple) {
          if (multiples) {
            multiplesStatus = multiples.findIndex((item) => {
              return this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked_multiple = true;
          }
        }
        let data = {
          fullDate: nowDate,
          year: full.year,
          date: i2,
          range: this.range ? checked : false,
          multiple: this.multiple ? checked_multiple : false,
          beforeRange: this.dateEqual(this.rangeStatus.before, nowDate),
          afterRange: this.dateEqual(this.rangeStatus.after, nowDate),
          dateEqual: this.range && checked && this.dateEqual(this.rangeStatus.before, this.rangeStatus.after),
          month: full.month,
          lunar: this.getlunar(full.year, full.month, i2),
          disable: !(disableBefore && disableAfter),
          isDay
        };
        if (info) {
          data.extraInfo = info;
        }
        dateArr.push(data);
      }
      return dateArr;
    }
    /**
     * 获取下月天数
     */
    _getNextMonthDays(surplus, full) {
      let dateArr = [];
      for (let i2 = 1; i2 < surplus + 1; i2++) {
        dateArr.push({
          date: i2,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i2),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date2) {
      if (!date2) {
        date2 = /* @__PURE__ */ new Date();
      } else if (Array.isArray(date2)) {
        date2 = date2[0];
      }
      const dateInfo = this.canlender.find((item) => item.fullDate === this.getDate(date2).fullDate);
      return dateInfo;
    }
    /**
     * 比较时间大小
     */
    dateCompare(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(before.replace("-", "/").replace("-", "/"));
      after = new Date(after.replace("-", "/").replace("-", "/"));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 比较after时间是否大于before时间
     */
    dateAfterLgBefore(before, after) {
      before = new Date(before.replace("-", "/").replace("-", "/"));
      after = new Date(after.replace("-", "/").replace("-", "/"));
      if (after.getTime() - before.getTime() > 0) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae2 = end.split("-");
      var db = /* @__PURE__ */ new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de2 = /* @__PURE__ */ new Date();
      de2.setFullYear(ae2[0], ae2[1] - 1, ae2[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de2.getTime() - 24 * 60 * 60 * 1e3;
      for (var k = unixDb; k <= unixDe; ) {
        k = k + 24 * 60 * 60 * 1e3;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
     * 计算阴历日期显示
     */
    getlunar(year, month, date2) {
      return calendar.solar2lunar(year, month, date2);
    }
    /**
     * 设置打点
     */
    setSelectInfo(data, value2) {
      this.selected = value2;
      this._getWeek(data);
    }
    /**
     * 获取多选状态
     */
    setMultiple(fullDate) {
      if (!this.multiple)
        return;
      let multiples = this.multipleStatus.data;
      const findIndex = multiples.findIndex((item) => this.dateEqual(fullDate, item));
      if (findIndex < 0) {
        this.multipleStatus.data = this.multipleStatus.data.concat([fullDate]);
      } else {
        this.multipleStatus.data.splice(findIndex, 1);
      }
      this._getWeek(fullDate);
    }
    /**
     *  获取范围状态
     */
    setRange(fullDate) {
      let {
        before,
        after
      } = this.rangeStatus;
      if (!this.range)
        return;
      if (before && after) {
        this.cleanRangeStatus();
        this.rangeStatus.before = fullDate;
      } else {
        if (!before) {
          this.rangeStatus.before = fullDate;
        } else {
          if (this.allowSameDay && this.dateEqual(before, fullDate)) {
            this.rangeStatus.after = fullDate;
          } else if (!this.dateAfterLgBefore(this.rangeStatus.before, fullDate)) {
            this.cleanRangeStatus();
            this.rangeStatus.before = fullDate;
            this._getWeek(fullDate);
            return;
          }
          this.rangeStatus.after = fullDate;
          if (this.dateCompare(this.rangeStatus.before, this.rangeStatus.after)) {
            this.rangeStatus.data = this.geDateAll(this.rangeStatus.before, this.rangeStatus.after);
          } else {
            this.rangeStatus.data = this.geDateAll(this.rangeStatus.after, this.rangeStatus.before);
          }
        }
      }
      this._getWeek(fullDate);
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    _getWeek(dateData) {
      const {
        year,
        month
      } = this.getDate(dateData);
      let firstDay = new Date(year, month - 1, 1).getDay();
      let currentDay = new Date(year, month, 0).getDate();
      let dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
        // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        weeks: []
      };
      let canlender = [];
      const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      let weeks = {};
      for (let i2 = 0; i2 < canlender.length; i2++) {
        if (i2 % 7 === 0) {
          weeks[parseInt(i2 / 7)] = new Array(7);
        }
        weeks[parseInt(i2 / 7)][i2 % 7] = canlender[i2];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }
    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format2, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format2.length) {
      let char = format2[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format2[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format2[position++];
        }
        const isClosed = char === endDelimiter;
        const type2 = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type: type2 });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index2 = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index2 < tokens.length) {
      const token = tokens[index2];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index2++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index2 = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index2, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uv-calender.ok": "ok",
    "uv-calender.cancel": "cancel",
    "uv-calender.today": "today",
    "uv-calender.MON": "MON",
    "uv-calender.TUE": "TUE",
    "uv-calender.WED": "WED",
    "uv-calender.THU": "THU",
    "uv-calender.FRI": "FRI",
    "uv-calender.SAT": "SAT",
    "uv-calender.SUN": "SUN"
  };
  const zhHans = {
    "uv-calender.ok": "确定",
    "uv-calender.cancel": "取消",
    "uv-calender.today": "今日",
    "uv-calender.SUN": "日",
    "uv-calender.MON": "一",
    "uv-calender.TUE": "二",
    "uv-calender.WED": "三",
    "uv-calender.THU": "四",
    "uv-calender.FRI": "五",
    "uv-calender.SAT": "六"
  };
  const zhHant = {
    "uv-calender.ok": "確定",
    "uv-calender.cancel": "取消",
    "uv-calender.today": "今日",
    "uv-calender.SUN": "日",
    "uv-calender.MON": "一",
    "uv-calender.TUE": "二",
    "uv-calender.WED": "三",
    "uv-calender.THU": "四",
    "uv-calender.FRI": "五",
    "uv-calender.SAT": "六"
  };
  const i18nMessages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t: t$3 } = initVueI18n(i18nMessages);
  const _sfc_main$T = {
    emits: ["change"],
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: "#3c9cff"
      },
      range: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      todayText() {
        return t$3("uv-calender.today");
      },
      itemBoxStyle() {
        const style = {};
        if (this.multiple) {
          if (this.weeks.multiple) {
            style.backgroundColor = this.color;
            style.color = "#fff";
          } else if (this.weeks.isDay) {
            style.color = this.color;
          }
        } else if (this.range) {
          if (this.weeks.beforeRange || this.weeks.afterRange) {
            style.backgroundColor = this.color;
          } else if (this.weeks.range) {
            style.backgroundColor = colorGradient(this.color, "#ffffff", 100)[90];
            style.color = this.color;
            style.opacity = 0.8;
            style.borderRadius = 0;
          }
        } else {
          if (this.weeks.isDay) {
            style.color = this.color;
          }
          if (this.calendar.fullDate === this.weeks.fullDate) {
            style.backgroundColor = this.color;
            style.color = "#fff";
          }
        }
        return style;
      },
      infoStyle(val) {
        return (val2) => {
          const style = {};
          if (!this.weeks.multiple) {
            if (val2 == "top") {
              style.color = this.weeks.extraInfo.topinfoColor ? this.weeks.extraInfo.topinfoColor : "#606266";
            } else if (val2 == "bottom") {
              style.color = this.weeks.extraInfo.infoColor ? this.weeks.extraInfo.infoColor : "#f56c6c";
            }
            if (this.weeks.range) {
              style.color = this.color;
            }
            if (this.calendar.fullDate === this.weeks.fullDate || this.weeks.beforeRange || this.weeks.afterRange) {
              style.color = this.multiple ? style.color : "#fff";
            }
          } else {
            style.color = "#fff";
          }
          return style;
        };
      }
    },
    methods: {
      choiceDate(weeks) {
        if (this.weeks.extraInfo && this.weeks.extraInfo.disable)
          return;
        this.$emit("change", weeks);
      }
    }
  };
  function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-calendar-item__weeks-box", {
          "uv-calendar-item--disable": $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable,
          "uv-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple,
          "uv-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple,
          "uv-calendar-item--before-checked": $props.weeks.beforeRange,
          "uv-calendar-item--range": $props.weeks.range,
          "uv-calendar-item--after-checked": $props.weeks.afterRange,
          "uv-calendar-item--multiple": $props.weeks.multiple
        }]),
        style: vue.normalizeStyle([$options.itemBoxStyle]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks))
      },
      [
        vue.createElementVNode("view", { class: "uv-calendar-item__weeks-box-item" }, [
          $props.selected && $props.weeks.extraInfo && $props.weeks.extraInfo.badge ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "uv-calendar-item__weeks-box-circle"
          })) : vue.createCommentVNode("v-if", true),
          $props.weeks.extraInfo && $props.weeks.extraInfo.topinfo ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "uv-calendar-item__weeks-top-text",
              style: vue.normalizeStyle([$options.infoStyle("top")])
            },
            vue.toDisplayString($props.weeks.extraInfo && $props.weeks.extraInfo.topinfo),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["uv-calendar-item__weeks-box-text", {
                "uv-calendar-item--isDay-text": $props.weeks.isDay,
                "uv-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--before-checked": $props.weeks.beforeRange,
                "uv-calendar-item--range": $props.weeks.range,
                "uv-calendar-item--after-checked": $props.weeks.afterRange,
                "uv-calendar-item--multiple": $props.weeks.multiple,
                "uv-calendar-item--disable": $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable
              }]),
              style: vue.normalizeStyle([$options.itemBoxStyle])
            },
            vue.toDisplayString($props.weeks.date),
            7
            /* TEXT, CLASS, STYLE */
          ),
          !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 2,
              class: vue.normalizeClass(["uv-calendar-item__weeks-lunar-text", {
                "uv-calendar-item--isDay-text": $props.weeks.isDay,
                "uv-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--before-checked": $props.weeks.beforeRange,
                "uv-calendar-item--range": $props.weeks.range,
                "uv-calendar-item--after-checked": $props.weeks.afterRange,
                "uv-calendar-item--multiple": $props.weeks.multiple
              }]),
              style: vue.normalizeStyle([$options.itemBoxStyle])
            },
            vue.toDisplayString($options.todayText),
            7
            /* TEXT, CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          $props.lunar && !$props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 3,
              class: vue.normalizeClass(["uv-calendar-item__weeks-lunar-text", {
                "uv-calendar-item--isDay-text": $props.weeks.isDay,
                "uv-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple,
                "uv-calendar-item--before-checked": $props.weeks.beforeRange,
                "uv-calendar-item--range": $props.weeks.range,
                "uv-calendar-item--after-checked": $props.weeks.afterRange,
                "uv-calendar-item--multiple": $props.weeks.multiple,
                "uv-calendar-item--disable": $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable
              }]),
              style: vue.normalizeStyle([$options.itemBoxStyle])
            },
            vue.toDisplayString($props.weeks.isDay ? $options.todayText : $props.weeks.lunar.IDayCn === "初一" ? $props.weeks.lunar.IMonthCn : $props.weeks.lunar.IDayCn),
            7
            /* TEXT, CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          $props.weeks.extraInfo && $props.weeks.extraInfo.info ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 4,
              class: vue.normalizeClass(["uv-calendar-item__weeks-lunar-text", {
                "uv-calendar-item__weeks-lunar-text--equal": $props.weeks.dateEqual
              }]),
              style: vue.normalizeStyle([$options.infoStyle("bottom")])
            },
            vue.toDisplayString($props.weeks.extraInfo.info),
            7
            /* TEXT, CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const CalendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$S], ["__scopeId", "data-v-68116d39"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-calendars/components/uv-calendars/calendar-item.vue"]]);
  const { t: t$2 } = initVueI18n(i18nMessages);
  const _sfc_main$S = {
    mixins: [mpMixin, mixin],
    components: {
      CalendarItem
    },
    props: {
      date: {
        type: [String, Array],
        default: ""
      },
      nowDate: {
        type: [String, Object],
        default: ""
      },
      weeks: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      calendar: {
        type: Object,
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: "#3c9cff"
      },
      startText: {
        type: String,
        default: "开始"
      },
      endText: {
        type: String,
        default: "结束"
      },
      range: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否允许日期范围的起止时间为同一天，mode = range时有效
      allowSameDay: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getDate() {
        return Array.isArray(this.date) ? this.date[0] : this.date;
      },
      /**
       * for i18n
       */
      todayText() {
        return t$2("uv-calender.today");
      },
      monText() {
        return t$2("uv-calender.MON");
      },
      TUEText() {
        return t$2("uv-calender.TUE");
      },
      WEDText() {
        return t$2("uv-calender.WED");
      },
      THUText() {
        return t$2("uv-calender.THU");
      },
      FRIText() {
        return t$2("uv-calender.FRI");
      },
      SATText() {
        return t$2("uv-calender.SAT");
      },
      SUNText() {
        return t$2("uv-calender.SUN");
      },
      rangeInfoText(weeks) {
        return (weeks2) => {
          var _a, _b;
          if (this.allowSameDay && weeks2.beforeRange && weeks2.afterRange && weeks2.dateEqual) {
            return this.setInfo(weeks2, `${this.startText}/${this.endText}`);
          }
          if (weeks2.beforeRange) {
            return this.setInfo(weeks2, this.startText);
          }
          if (weeks2.afterRange) {
            return this.setInfo(weeks2, this.endText);
          }
          if (((_a = weeks2.extraInfo) == null ? void 0 : _a.info_old) == " ") {
            weeks2.extraInfo.info = null;
          } else if ((_b = weeks2.extraInfo) == null ? void 0 : _b.info_old) {
            weeks2.extraInfo.info = weeks2.extraInfo.info_old;
          }
        };
      }
    },
    methods: {
      setInfo(weeks, text) {
        this.setInfoOld(weeks);
        if (weeks.extraInfo) {
          weeks.extraInfo.info = text;
        } else {
          weeks.extraInfo = {
            info: text
          };
        }
      },
      setInfoOld(weeks) {
        if (weeks.extraInfo) {
          weeks.extraInfo.info_old = weeks.extraInfo.info ? weeks.extraInfo.info_old || weeks.extraInfo.info : " ";
        }
      },
      bindDateChange(e2) {
        this.$emit("bindDateChange", e2);
      },
      backToday() {
        this.$emit("backToday");
      },
      pre() {
        this.$emit("pre");
      },
      next() {
        this.$emit("next");
      },
      choiceDate(e2) {
        this.$emit("choiceDate", e2);
      }
    }
  };
  function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-calendar-body" }, [
      vue.createElementVNode("view", { class: "uv-calendar__header" }, [
        vue.createElementVNode("view", {
          class: "uv-calendar__header-btn-box",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.pre && $options.pre(...args), ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "uv-calendar__header-btn uv-calendar--left" })
        ]),
        vue.createElementVNode("picker", {
          mode: "date",
          value: $options.getDate,
          fields: "month",
          onChange: _cache[1] || (_cache[1] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uv-calendar__header-text" },
            vue.toDisplayString(($props.nowDate.year || "") + " / " + ($props.nowDate.month || "")),
            1
            /* TEXT */
          )
        ], 40, ["value"]),
        vue.createElementVNode("view", {
          class: "uv-calendar__header-btn-box",
          onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.next && $options.next(...args), ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "uv-calendar__header-btn uv-calendar--right" })
        ]),
        vue.createElementVNode(
          "text",
          {
            class: "uv-calendar__backtoday",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.backToday && $options.backToday(...args))
          },
          vue.toDisplayString($options.todayText),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "uv-calendar__box" }, [
        $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-calendar__box-bg"
        }, [
          vue.createElementVNode(
            "text",
            { class: "uv-calendar__box-bg-text" },
            vue.toDisplayString($props.nowDate.month),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "uv-calendar__weeks uv-calendar__weeks-week" }, [
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.SUNText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.monText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.TUEText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.WEDText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.THUText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.FRIText),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uv-calendar__weeks-day" }, [
            vue.createElementVNode(
              "text",
              { class: "uv-calendar__weeks-day-text" },
              vue.toDisplayString($options.SATText),
              1
              /* TEXT */
            )
          ])
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.weeks, (item, weekIndex) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "uv-calendar__weeks",
              key: weekIndex
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(item, (weeks, weeksIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uv-calendar__weeks-item",
                    key: weeksIndex
                  }, [
                    vue.createVNode(_component_calendar_item, {
                      class: "uv-calendar-item--hook",
                      weeks,
                      rangeInfoText: $options.rangeInfoText(weeks),
                      multiple: $props.multiple,
                      range: $props.range,
                      calendar: $props.calendar,
                      selected: $props.selected,
                      lunar: $props.lunar,
                      color: $props.color,
                      onChange: $options.choiceDate
                    }, null, 8, ["weeks", "rangeInfoText", "multiple", "range", "calendar", "selected", "lunar", "color", "onChange"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const calendarBody = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$R], ["__scopeId", "data-v-d658b772"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-calendars/components/uv-calendars/calendar-body.vue"]]);
  const { t: t$1 } = initVueI18n(i18nMessages);
  const _sfc_main$R = {
    components: {
      calendarBody
    },
    mixins: [mpMixin, mixin],
    emits: ["close", "confirm", "change", "monthSwitch"],
    props: {
      // 取消按钮颜色
      cancelColor: {
        type: String,
        default: ""
      },
      // 确认按钮颜色，range模式下未选全显示灰色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 标题
      title: {
        type: String,
        default: ""
      },
      // 主题色
      color: {
        type: String,
        default: "#3c9cff"
      },
      // 默认显示日期
      date: {
        type: [String, Array],
        default: ""
      },
      // 打点等设置
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否显示农历
      lunar: {
        type: Boolean,
        default: false
      },
      // 可选择的起始日期
      startDate: {
        type: String,
        default: ""
      },
      // 可选择的结束日期
      endDate: {
        type: String,
        default: ""
      },
      // multiple - 选择多日期  range - 选择日期范围
      mode: {
        type: String,
        default: ""
      },
      // 是否插入模式
      insert: {
        type: Boolean,
        default: false
      },
      // 是否显示月份为背景
      showMonth: {
        type: Boolean,
        default: true
      },
      // 弹窗模式是否清空上次选择内容
      clearDate: {
        type: Boolean,
        default: true
      },
      // 弹窗圆角
      round: {
        type: [Number, String],
        default: 8
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // range为true时，第一个日期底部的提示文字
      startText: {
        type: String,
        default: "开始"
      },
      // range为true时，最后一个日期底部的提示文字
      endText: {
        type: String,
        default: "结束"
      },
      // 是否允许日期范围的起止时间为同一天，mode = range时有效
      allowSameDay: {
        type: Boolean,
        default: false
      },
      // 是否禁用
      readonly: {
        type: Boolean,
        default: false
      },
      ...(_N = (_M = uni.$uv) == null ? void 0 : _M.props) == null ? void 0 : _N.calendars
    },
    data() {
      return {
        weeks: [],
        calendar: {},
        nowDate: "",
        allowConfirm: false,
        multiple: false,
        range: false
      };
    },
    computed: {
      /**
       * for i18n
       */
      confirmText() {
        return t$1("uv-calender.ok");
      },
      cancelText() {
        return t$1("uv-calender.cancel");
      },
      getConfirmColor() {
        if (this.range || this.multiple || this.readonly) {
          return this.allowConfirm ? this.confirmColor : "#999";
        } else {
          return this.confirmColor;
        }
      }
    },
    watch: {
      date(newVal) {
        this.init(newVal);
      },
      startDate(val) {
        this.cale.resetSatrtDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        this.cale.resetEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      }
    },
    created() {
      this.setMode();
      this.cale = new Calendar({
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range,
        multiple: this.multiple,
        allowSameDay: this.allowSameDay
      });
      this.init(this.date);
    },
    methods: {
      setMode() {
        switch (this.mode) {
          case "range":
            this.range = true;
            break;
          case "multiple":
            this.multiple = true;
        }
      },
      async open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanRangeStatus();
          this.init(this.date);
        }
        if (!this.insert) {
          this.$refs.popup.open();
        }
      },
      close() {
        this.$refs.popup.close();
        this.$emit("close");
      },
      confirm() {
        if (this.readonly) {
          return;
        } else if (this.range && !this.cale.rangeStatus.after) {
          return;
        } else if (this.multiple && this.cale.multipleStatus.data.length == 0) {
          return;
        }
        this.setEmit("confirm");
        this.close();
      },
      maskClick() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      bindDateChange(e2) {
        const value2 = e2.detail.value + "-1";
        this.setDate(value2);
        const { year, month } = this.cale.getDate(value2);
        this.$emit("monthSwitch", {
          year,
          month
        });
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date2) {
        if (this.range) {
          this.cale.cleanRangeStatus();
        } else if (this.multiple) {
          this.cale.cleanMultipleStatus();
        }
        this.cale.setDate(date2, "init");
        this.weeks = this.cale.weeks;
        this.nowDate = this.calendar = this.cale.getInfo(date2);
        this.changeConfirmStatus();
      },
      /**
       * 变化触发
       */
      change() {
        this.changeConfirmStatus();
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      changeConfirmStatus() {
        if (this.readonly) {
          this.allowConfirm = false;
        } else if (this.range) {
          this.allowConfirm = this.cale.rangeStatus.after ? true : false;
        } else if (this.multiple) {
          this.allowConfirm = this.cale.multipleStatus.data.length > 0 ? true : false;
        }
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        let {
          year,
          month,
          date: date2,
          fullDate,
          lunar,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.rangeStatus,
          multiple: this.cale.multipleStatus,
          year,
          month,
          date: date2,
          fulldate: fullDate,
          lunar,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable || this.readonly)
          return;
        this.calendar = weeks;
        this.cale.setRange(this.calendar.fullDate);
        this.cale.setMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        this.change();
      },
      /**
       * 回到今天
       */
      backToday() {
        const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`;
        const date2 = this.cale.getDate(/* @__PURE__ */ new Date());
        const todayYearMonth = `${date2.year}-${date2.month}`;
        this.init(date2.fullDate);
        if (nowYearMonth !== todayYearMonth) {
          this.monthSwitch();
        }
        this.change();
      },
      /**
       * 上个月
       */
      pre() {
        const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
        this.setDate(preDate);
        this.monthSwitch();
      },
      /**
       * 下个月
       */
      next() {
        const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
        this.setDate(nextDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date2) {
        this.cale.setDate(date2);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date2);
      }
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_body = vue.resolveComponent("calendar-body");
    const _component_uv_toolbar = resolveEasycom(vue.resolveDynamicComponent("uv-toolbar"), __easycom_0$7);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-calendar" }, [
      $props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uv-calendar__content"
      }, [
        vue.createVNode(_component_calendar_body, {
          date: $props.date,
          nowDate: $data.nowDate,
          weeks: $data.weeks,
          calendar: $data.calendar,
          selected: $props.selected,
          lunar: $props.lunar,
          showMonth: $props.showMonth,
          color: $props.color,
          startText: $props.startText,
          endText: $props.endText,
          range: $data.range,
          multiple: $data.multiple,
          allowSameDay: $props.allowSameDay,
          onBindDateChange: $options.bindDateChange,
          onPre: $options.pre,
          onNext: $options.next,
          onBackToday: $options.backToday,
          onChoiceDate: $options.choiceDate
        }, null, 8, ["date", "nowDate", "weeks", "calendar", "selected", "lunar", "showMonth", "color", "startText", "endText", "range", "multiple", "allowSameDay", "onBindDateChange", "onPre", "onNext", "onBackToday", "onChoiceDate"])
      ])) : (vue.openBlock(), vue.createBlock(_component_uv_popup, {
        key: 1,
        ref: "popup",
        mode: "bottom",
        round: $props.round,
        "z-index": "998",
        "close-on-click-overlay": $props.closeOnClickOverlay,
        onMaskClick: $options.maskClick
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { style: { "min-height": "100px" } }, [
            vue.createVNode(_component_uv_toolbar, {
              show: true,
              cancelColor: $props.cancelColor,
              confirmColor: $options.getConfirmColor,
              cancelText: $options.cancelText,
              confirmText: $options.confirmText,
              title: $props.title,
              onCancel: $options.close,
              onConfirm: $options.confirm
            }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"]),
            vue.createElementVNode("view", { class: "line" }),
            vue.createVNode(_component_calendar_body, {
              nowDate: $data.nowDate,
              weeks: $data.weeks,
              calendar: $data.calendar,
              selected: $props.selected,
              lunar: $props.lunar,
              showMonth: $props.showMonth,
              color: $props.color,
              startText: $props.startText,
              endText: $props.endText,
              range: $data.range,
              multiple: $data.multiple,
              allowSameDay: $props.allowSameDay,
              onBindDateChange: $options.bindDateChange,
              onPre: $options.pre,
              onNext: $options.next,
              onBackToday: $options.backToday,
              onChoiceDate: $options.choiceDate
            }, null, 8, ["nowDate", "weeks", "calendar", "selected", "lunar", "showMonth", "color", "startText", "endText", "range", "multiple", "allowSameDay", "onBindDateChange", "onPre", "onNext", "onBackToday", "onChoiceDate"])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["round", "close-on-click-overlay", "onMaskClick"]))
    ]);
  }
  const __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$Q], ["__scopeId", "data-v-4990eb9c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-calendars/components/uv-calendars/uv-calendars.vue"]]);
  const _sfc_main$Q = {
    data() {
      return {
        storeName: "",
        storeOrder: [],
        // orders:[],
        columns: [],
        storeId: 0,
        info: {},
        listData: []
      };
    },
    methods: {
      showDateTime() {
        this.$refs.calendars.open();
      },
      // 日期选择，axios请求，重新复制渲染
      confirm(e2) {
        formatAppLog("log", "at pages/bill/bill.vue:77", "日历选择：", e2);
        this.listData = [e2.range.before, e2.range.after];
        this.getAllOrder();
      },
      check(e2) {
        formatAppLog("log", "at pages/bill/bill.vue:82", "check", e2);
        this.storeName = e2.value[0];
        const item = this.info.find((obj) => obj.storeName === this.storeName);
        this.storeId = item.storeId;
        this.getAllOrder();
      },
      getDailyOrderDetail(index2, storeId) {
        uni.setStorageSync("orderDailyTime", index2);
        uni.setStorageSync("storeId", storeId);
        uni.navigateTo({
          url: "/pages/bill/getDailyOrder/getDailyOrder",
          "animationType": "slide-in-right",
          "animationDuration": 200
        });
      },
      // 页面初始化
      // init() {
      // 	const now = new Date();
      // 	const year = now.getFullYear(); // 获取年份
      // 	const month = now.getMonth() + 1; // 获取月份，月份需要+1
      // 	const day = now.getDate(); // 获取日
      // 	const hours = now.getHours(); // 获取小时
      // 	const minutes = now.getMinutes(); // 获取分钟
      // 	const seconds = now.getSeconds(); // 获取秒钟
      // 	// 格式化为两位数时间
      // 	const formatNumber = (n) => {
      // 		n = n.toString();
      // 		return n[1] ? n : '0' + n;
      // 	};
      // 	this.$request("/storeOrder/getStoreMonthOrder","POST",this.storeId).then(res => {
      // 		var length = res.data.data.profitMoney.length
      // 		length -= 1
      // 		for(var i = length;i >= 0;i--){
      // 			this.storeOrder.push({
      // 				profitMoney: res.data.data.profitMoney[i],
      // 				profitOrderCount: res.data.data.profitOrderCount[i],
      // 				rebackMoney: res.data.data.rebackMoney[i],
      // 				rebackOrderCount: res.data.data.rebackOrderCount[i],
      // 				dateTime: month + "月" + (i+1) + "日",
      // 				totalDateTime: year + "-" + month + "-" + (i+1)
      // 			})
      // 		}
      // 	}).catch(err => {
      // 		uni.showToast({
      // 			"title":"服务器出错，请稍后再试",
      // 			"icon":"none"
      // 		})
      // 	})
      // },
      changeStore() {
        formatAppLog("log", "at pages/bill/bill.vue:133", "切换按钮");
        this.$refs.picker.open();
      },
      getAllOrder() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/bill/bill.vue:139", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/order",
          "POST",
          {
            data: this.listData,
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/bill/bill.vue:149", "storeOrder", res);
          if (res.data.code == 200) {
            this.storeOrder = res.data.data;
          }
        });
      },
      getStoreName() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/bill/bill.vue:158", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/storeName",
          "GET",
          { userId }
        ).then((res) => {
          if (res.data.code == 200) {
            this.info = res.data.data;
            const col = [];
            res.data.data.forEach((item) => {
              col.push(
                item.storeName
              );
            });
            this.columns.push(col);
            formatAppLog("log", "at pages/bill/bill.vue:174", "this.info", this.info[0].storeId);
            this.storeName = this.columns[0][0];
            this.storeId = this.info[0].storeId;
          }
        });
      }
    },
    onLoad() {
      this.getStoreName();
      setTimeout(() => this.getAllOrder(), 1e3);
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$6);
    const _component_uv_calendars = resolveEasycom(vue.resolveDynamicComponent("uv-calendars"), __easycom_2$4);
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      vue.createCommentVNode(" 头部店铺名 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "store_name" }, [
          vue.createElementVNode(
            "h1",
            null,
            vue.toDisplayString($data.storeName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "changeButtonContainer" }, [
          vue.createElementVNode("image", {
            src: "/static/icon/changebutton.png",
            class: "changeButton",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.changeStore && $options.changeStore(...args))
          })
        ]),
        vue.createElementVNode("view", { class: "selectContainer" }, [
          vue.createElementVNode("image", {
            src: "/static/icon/shaixuan.png",
            class: "selectImage",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.showDateTime && $options.showDateTime(...args))
          })
        ])
      ]),
      vue.createCommentVNode(" 店面选择 "),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_picker, {
          ref: "picker",
          columns: $data.columns,
          onConfirm: $options.check,
          closeOnClickOverlay: false
        }, null, 8, ["columns", "onConfirm"])
      ]),
      vue.createCommentVNode(" 日期选择 "),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_calendars, {
          ref: "calendars",
          color: "#ff0000",
          mode: "range",
          onConfirm: $options.confirm
        }, null, 8, ["onConfirm"])
      ]),
      vue.createCommentVNode(" 显示金额 "),
      vue.createElementVNode("view", { class: "container" }, [
        $data.storeOrder.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          style: { "margin": "100rpx auto" }
        }, [
          vue.createElementVNode("text", { style: { "font-size": "100rpx", "font-weight": "bold" } }, "暂无数据")
        ])) : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.storeOrder, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "moneyContainer",
              key: index2,
              onClick: ($event) => $options.getDailyOrderDetail(item.date, $data.storeId)
            }, [
              vue.createElementVNode("view", { class: "moneyContainerHeader" }, [
                vue.createElementVNode(
                  "h2",
                  { class: "moneyContainerDate" },
                  vue.toDisplayString(item.date),
                  1
                  /* TEXT */
                ),
                vue.createCommentVNode(' <span class="moneyContainerBetween">(自00:00:00至23:59:59)</span> '),
                vue.createCommentVNode(' <image src="../../static/icon/a-xiala2.png" class="xiala"></image> ')
              ]),
              vue.createElementVNode("view", { class: "moneyContainerBody" }, [
                vue.createElementVNode("view", { class: "acceptOrder" }, [
                  vue.createElementVNode("span", { class: "orderStatus" }, "收款成功"),
                  vue.createElementVNode(
                    "span",
                    { class: "orderMoney" },
                    vue.toDisplayString(item.sum) + "元",
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(' <span class="orderMoney" v-if="item.profitMoney == null">0元</span> '),
                  vue.createElementVNode(
                    "span",
                    { class: "orderCount" },
                    vue.toDisplayString(item.count) + "笔",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "rebackOrder" }, [
                  vue.createElementVNode("span", { class: "orderStatus" }, "退款成功"),
                  item.refund != 0 ? (vue.openBlock(), vue.createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: "orderMoney"
                    },
                    "-" + vue.toDisplayString(item.refund) + "元",
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  item.refund == 0 ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 1,
                    class: "orderMoney"
                  }, "0元")) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "span",
                    { class: "orderCount" },
                    vue.toDisplayString(item.refundSum) + "笔",
                    1
                    /* TEXT */
                  )
                ])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesBillBill = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$P], ["__scopeId", "data-v-2ed368b2"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/bill/bill.vue"]]);
  const pages = [
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "登录",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "首页",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/personalCenter/personalCenter",
      style: {
        navigationBarTitleText: "我的",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/bill/bill",
      style: {
        navigationBarTitleText: "账单",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/reportForms/reportForms",
      style: {
        navigationBarTitleText: "报表",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/personalCenter/application/applicationStatus",
      style: {
        navigationBarTitleText: "申请状态",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/application/applicationAll",
      style: {
        navigationBarTitleText: "所有申请",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/storeManagement/storeManagement",
      style: {
        navigationBarTitleText: "商铺管理",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/userOpinion/userOpinion",
      style: {
        navigationBarTitleText: "意见反馈",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/storeManagement/storeDetails/storeDetails",
      style: {
        navigationBarTitleText: "店铺详情",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/unsubscribe/unsubscribe",
      style: {
        navigationBarTitleText: "注销账户",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/changePassword/changePassword",
      style: {
        navigationBarTitleText: "修改密码",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/chatWindow/chatWindow",
      style: {
        navigationBarTitleText: "联系我们",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/showCashOutStore/showCashOutStore",
      style: {
        navigationBarTitleText: "可提现",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/showCashOutStore/cashOut/cashOut",
      style: {
        navigationBarTitleText: "提现",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney",
      style: {
        navigationBarTitleText: "待审核",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/bill/getDailyOrder/getDailyOrder",
      style: {
        navigationBarTitleText: "当天订单",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/bill/getDailyOrder/orderDetail/orderDetail",
      style: {
        navigationBarTitleText: "订单详情",
        enablePullDownRefresh: true,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/login/regist/regist",
      style: {
        navigationBarTitleText: "注册",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/login/forgetPwd/forgetPwd",
      style: {
        navigationBarTitleText: "重置密码",
        enablePullDownRefresh: false,
        navigationStyle: "default"
      }
    },
    {
      path: "pages/index/merchantSettled/merchantSettled",
      style: {
        navigationBarTitleText: "商家入驻",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/trade/trade",
      style: {
        navigationBarTitleText: "最新交易",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/unusualOrders/unusualOrders",
      style: {
        navigationBarTitleText: "异常订单",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/pay/pay",
      style: {
        navigationBarTitleText: "支付",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/message/message",
      style: {
        navigationBarTitleText: "聊天框",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/identify/identify",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    navigationStyle: "custom"
  };
  const uniIdRouter = {};
  const tabBar = {
    borderStyle: "white",
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "static/icon/shouye1.png",
        selectedIconPath: "static/icon/shouye2.png"
      },
      {
        text: "账单",
        pagePath: "pages/bill/bill",
        iconPath: "static/icon/zhangdang1.png",
        selectedIconPath: "static/icon/zhangdang2.png"
      },
      {
        text: "报表",
        pagePath: "pages/reportForms/reportForms",
        iconPath: "static/icon/baobiao1.png",
        selectedIconPath: "static/icon/baobiao2.png"
      },
      {
        text: "我的",
        pagePath: "pages/personalCenter/personalCenter",
        iconPath: "static/icon/wode1.png",
        selectedIconPath: "static/icon/wode2.png"
      }
    ]
  };
  const e = {
    pages,
    globalStyle,
    uniIdRouter,
    tabBar
  };
  function t(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k = e4[t4 + 13], A2 = e4[t4 + 14], P2 = e4[t4 + 15], T2 = i3[0], C2 = i3[1], x = i3[2], O2 = i3[3];
        T2 = u2(T2, C2, x, O2, o3, 7, a2[0]), O2 = u2(O2, T2, C2, x, c3, 12, a2[1]), x = u2(x, O2, T2, C2, p2, 17, a2[2]), C2 = u2(C2, x, O2, T2, f2, 22, a2[3]), T2 = u2(T2, C2, x, O2, g2, 7, a2[4]), O2 = u2(O2, T2, C2, x, m2, 12, a2[5]), x = u2(x, O2, T2, C2, y2, 17, a2[6]), C2 = u2(C2, x, O2, T2, _2, 22, a2[7]), T2 = u2(T2, C2, x, O2, w2, 7, a2[8]), O2 = u2(O2, T2, C2, x, v2, 12, a2[9]), x = u2(x, O2, T2, C2, I2, 17, a2[10]), C2 = u2(C2, x, O2, T2, S2, 22, a2[11]), T2 = u2(T2, C2, x, O2, b2, 7, a2[12]), O2 = u2(O2, T2, C2, x, k, 12, a2[13]), x = u2(x, O2, T2, C2, A2, 17, a2[14]), T2 = h2(T2, C2 = u2(C2, x, O2, T2, P2, 22, a2[15]), x, O2, c3, 5, a2[16]), O2 = h2(O2, T2, C2, x, y2, 9, a2[17]), x = h2(x, O2, T2, C2, S2, 14, a2[18]), C2 = h2(C2, x, O2, T2, o3, 20, a2[19]), T2 = h2(T2, C2, x, O2, m2, 5, a2[20]), O2 = h2(O2, T2, C2, x, I2, 9, a2[21]), x = h2(x, O2, T2, C2, P2, 14, a2[22]), C2 = h2(C2, x, O2, T2, g2, 20, a2[23]), T2 = h2(T2, C2, x, O2, v2, 5, a2[24]), O2 = h2(O2, T2, C2, x, A2, 9, a2[25]), x = h2(x, O2, T2, C2, f2, 14, a2[26]), C2 = h2(C2, x, O2, T2, w2, 20, a2[27]), T2 = h2(T2, C2, x, O2, k, 5, a2[28]), O2 = h2(O2, T2, C2, x, p2, 9, a2[29]), x = h2(x, O2, T2, C2, _2, 14, a2[30]), T2 = l2(T2, C2 = h2(C2, x, O2, T2, b2, 20, a2[31]), x, O2, m2, 4, a2[32]), O2 = l2(O2, T2, C2, x, w2, 11, a2[33]), x = l2(x, O2, T2, C2, S2, 16, a2[34]), C2 = l2(C2, x, O2, T2, A2, 23, a2[35]), T2 = l2(T2, C2, x, O2, c3, 4, a2[36]), O2 = l2(O2, T2, C2, x, g2, 11, a2[37]), x = l2(x, O2, T2, C2, _2, 16, a2[38]), C2 = l2(C2, x, O2, T2, I2, 23, a2[39]), T2 = l2(T2, C2, x, O2, k, 4, a2[40]), O2 = l2(O2, T2, C2, x, o3, 11, a2[41]), x = l2(x, O2, T2, C2, f2, 16, a2[42]), C2 = l2(C2, x, O2, T2, y2, 23, a2[43]), T2 = l2(T2, C2, x, O2, v2, 4, a2[44]), O2 = l2(O2, T2, C2, x, b2, 11, a2[45]), x = l2(x, O2, T2, C2, P2, 16, a2[46]), T2 = d2(T2, C2 = l2(C2, x, O2, T2, p2, 23, a2[47]), x, O2, o3, 6, a2[48]), O2 = d2(O2, T2, C2, x, _2, 10, a2[49]), x = d2(x, O2, T2, C2, A2, 15, a2[50]), C2 = d2(C2, x, O2, T2, m2, 21, a2[51]), T2 = d2(T2, C2, x, O2, b2, 6, a2[52]), O2 = d2(O2, T2, C2, x, f2, 10, a2[53]), x = d2(x, O2, T2, C2, I2, 15, a2[54]), C2 = d2(C2, x, O2, T2, c3, 21, a2[55]), T2 = d2(T2, C2, x, O2, w2, 6, a2[56]), O2 = d2(O2, T2, C2, x, P2, 10, a2[57]), x = d2(x, O2, T2, C2, y2, 15, a2[58]), C2 = d2(C2, x, O2, T2, k, 21, a2[59]), T2 = d2(T2, C2, x, O2, g2, 6, a2[60]), O2 = d2(O2, T2, C2, x, S2, 10, a2[61]), x = d2(x, O2, T2, C2, p2, 15, a2[62]), C2 = d2(C2, x, O2, T2, v2, 21, a2[63]), i3[0] = i3[0] + T2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== l;
      }
    }
    exec() {
      return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", A = I([]), P = b, T = I(""), C = I("[]") || [];
  let O = "";
  try {
    O = "__UNI__06810F4";
  } catch (e2) {
  }
  let E = {};
  function L(e2, t2 = {}) {
    var n2, s2;
    return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
  }
  E = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
  function N(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = U[e3][t3];
        s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function D(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = U[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete U[e2];
  }
  function M(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function q(e2, t2) {
    return U[e2] && U[e2][t2] || [];
  }
  function F(e2) {
    N("callObject", e2);
  }
  const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", z = "cloudobject";
  function J(e2) {
    return K[e2] || (K[e2] = []), K[e2];
  }
  function G(e2, t2) {
    const n2 = J(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function V(e2, t2) {
    const n2 = J(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e2, t2) {
    const n2 = J(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Q, X = false;
  function Z() {
    return Q || (Q = new Promise((e2) => {
      X && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (X = true, e2());
        }
        X || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Q);
  }
  function ee(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class te extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync() };
  function se(e2) {
    return e2 && se(e2.__v_raw) || e2;
  }
  function re() {
    return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
  }
  function ie({ token: e2, tokenExpired: t2 } = {}) {
    e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
  }
  let oe, ae;
  function ce() {
    return oe || (oe = uni.getSystemInfoSync()), oe;
  }
  function ue() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  function he() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ae)
      return { ...ae, locale: e2, LOCALE: e2 };
    const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e3 = 0; e3 < o2.length; e3++) {
      delete t2[o2[e3]];
    }
    return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...ae, locale: e2, LOCALE: e2 };
  }
  var le = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400)
          return s2(new te({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
        const r2 = e3.data;
        if (r2.error)
          return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var de = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return le.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = le.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = le.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var pe = { init(e2) {
    const t2 = new de(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var ge;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(ge || (ge = {}));
  var me = function() {
  }, ye = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), _e = ye, we = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const ve = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function Ie(e2) {
    return void 0 === e2;
  }
  function Se(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  var be;
  function ke(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(be || (be = {}));
  const Ae = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
  class Te extends me {
    constructor() {
      super(), Ae.adapter.root.tcbObject || (Ae.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Ae.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Ae.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Ae.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Ae.adapter.root.tcbObject;
    }
  }
  function Ce(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Te();
      case "none":
        return new Te();
      default:
        return t2.sessionStorage || new Te();
    }
  }
  class xe {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Ae.adapter.primaryStorage || e2.persistence, this._storage = Ce(this._persistence, Ae.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = Ce(e2, Ae.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Pe.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Oe = {}, Ee = {};
  function Le(e2) {
    return Oe[e2];
  }
  class Re {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ue extends Re {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const Ne = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ue)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new Re(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function De(e2, t2) {
    Ne.on(e2, t2);
  }
  function Me(e2, t2 = {}) {
    Ne.fire(e2, t2);
  }
  function qe(e2, t2) {
    Ne.off(e2, t2);
  }
  const Fe = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", $e = "anonymousConverted", Be = "refreshAccessToken";
  var We;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(We || (We = {}));
  const He = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
  function Je(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function Ge() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...ze, "x-seqid": e2 } };
  }
  class Ve {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Le(this.config.env), this._localCache = (t2 = this.config.env, Ee[t2]), Je(this._reqClass, "post", [Ge]), Je(this._reqClass, "upload", [Ge]), Je(this._reqClass, "download", [Ge]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new te({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Me(Ke), this._cache.removeStore(n2);
        }
        throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Me(Be), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new te({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === He.indexOf(e2)) {
        const { refreshTokenKey: e3 } = this._cache.keys;
        this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new te({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}) {
      const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === He.indexOf(e2)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new te({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new te({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const Ye = {};
  function Qe(e2) {
    return Ye[e2];
  }
  class Xe {
    constructor(e2) {
      this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class Ze {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Le(this._envId), this._request = Qe(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class et {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Le(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === We.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === We.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class tt extends Xe {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
        const e3 = new et(this.config.env);
        return await e3.user.refresh(), e3;
      }
      throw new te({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Me($e, { env: this.config.env }), Me(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new te({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, We.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class nt extends Xe {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
      throw new te({ message: "自定义登录失败" });
    }
  }
  class st extends Xe {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class rt extends Xe {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
    }
  }
  class it {
    constructor(e2) {
      this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new tt(this.config);
    }
    customAuthProvider() {
      return new nt(this.config);
    }
    emailAuthProvider() {
      return new st(this.config);
    }
    usernameAuthProvider() {
      return new rt(this.config);
    }
    async signInAnonymously() {
      return new tt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new st(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new rt(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De($e, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === We.ANONYMOUS)
        throw new te({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Me(Fe), Me(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      De(Fe, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      De(Ke, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      De(Be, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      De($e, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      De(je, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e2 } = this._cache.keys;
      return this._cache.getStore(e2) ? new et(this.config.env) : null;
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new nt(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const ot = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, at = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ct = function({ fileList: e2 }, t2) {
    if (t2 = t2 || ve(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ut = function({ fileList: e2 }, t2) {
    t2 = t2 || ve(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ht = async function({ fileID: e2 }, t2) {
    const n2 = (await ut.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = Qe(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, lt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || ve();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
    return Qe(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
      if (e3.code)
        o2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            o2(new te({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e3) => {
      o2(e3);
    }), o2.promise;
  }, dt = { timeout: 15e3, persistence: "session" }, pt = {};
  class ft {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Ae.adapter || (this.requestClient = new Ae.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new ft(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Ae.adapter.primaryStorage || dt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Oe[t3] = new xe(e3), Ee[t3] = new xe({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
    }
    on(e2, t2) {
      return De.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return qe.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return lt.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return ct.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return ut.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return ht.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return ot.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return at.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      pt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = pt[e2];
      if (!n2)
        throw new te({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = ke(e2) || {};
      t2 && (Ae.adapter = t2), n2 && (Ae.runtime = n2);
    }
  }
  var gt = new ft();
  function mt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class yt {
    post(e2) {
      const { url: t2, data: n2, headers: s2 } = e2;
      return new Promise((e3, r2) => {
        ne.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e3(t3);
        }, fail(e4) {
          r2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const _t = { setItem(e2, t2) {
    ne.setStorageSync(e2, t2);
  }, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
    ne.removeStorageSync(e2);
  }, clear() {
    ne.clearStorageSync();
  } };
  var wt = { genAdapter: function() {
    return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  gt.useAdapters(wt);
  const vt = gt, It = vt.init;
  vt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = It.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ee(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var St = vt;
  var bt = class extends de {
    getAccessToken() {
      return new Promise((e2, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e2(n2);
      });
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret);
      const r2 = he();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = re();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(this.setupRequest(t2)).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(this.setupRequest(n2)).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var kt = { init(e2) {
    const t2 = new bt(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, At = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Pt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e3) {
      var t3 = 16 * Math.random() | 0;
      return ("x" === e3 ? t3 : 3 & t3 | 8).toString(16);
    }), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = _e(e3.body).toString(At), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = _e(r3).toString(At), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = we(o3, e3.secretKey).toString(At);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function Tt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {} }) {
    return new Promise((r2, i2) => {
      ne.request({ url: e2, method: n2, data: t2, header: s2, dataType: "json", complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return i2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        r2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Ct(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Pt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function xt(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function Ot(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  var Et = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn` });
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2 } = e3, r2 = "POST", { url: i2, headers: o2 } = Pt("/functions/invokeFunction", { functionName: n2, data: s2, method: r2, headers: { "x-to-function-name": n2 }, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e4) => ({ errCode: 0, success: true, requestId: e4.requestId, result: e4.data })).catch((e4) => {
          throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Ct({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
        const s2 = [];
        for (const t3 of e2) {
          "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
          const e3 = xt.call(this, t3);
          s2.push({ file_id: e3, expire: 600 });
        }
        Ct({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: Ot.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
  };
  var Lt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Et(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Rt({ data: e2 }) {
    let t2;
    t2 = he();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = re();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Ut({ name: e2, data: t2 } = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
    return new Promise((t3, n3) => {
      ne.request({ method: "POST", url: o2, data: { name: e2, platform: P, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e3 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e3), new Error(e3);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction({ name: e2, data: t2 });
      }
      return new Promise((e3, n4) => {
        const s4 = Rt.call(this, { data: t2 });
        ne.request({ method: "POST", url: a2, data: { provider: r2, platform: P, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new te({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
          n4(new te({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const Nt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var Dt = /[\\^$.*+?()[\]{}|]/g, Mt = RegExp(Dt.source);
  function qt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Mt.test(s2) ? s2.replace(Dt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Kt = "request", jt = "response", $t = "both";
  const An = { code: 2e4, message: "System error" }, Pn = { code: 20101, message: "Invalid client" };
  function xn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || An.code, message: r2 || o2, cause: a2 });
  }
  let En;
  function Dn({ secretType: e2 } = {}) {
    return e2 === Kt || e2 === jt || e2 === $t;
  }
  function Mn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function qn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = A;
      if (!n3)
        return {};
      e3 = function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), xn(Pn);
  }
  function Fn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Kn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Rt.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay" }[this.config.provider], i2 = Dn(n3), o2 = Mn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = qt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = qt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: Nt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Ut), o2 = Ut) : o2 = n2, o2 = o2.bind(e2), Mn(t3))
        a2 = n2.call(e2, t3);
      else if (Dn(t3)) {
        a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (qn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
    };
  }
  En = class {
    constructor() {
      throw xn({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const jn = Symbol("CLIENT_DB_INTERNAL");
  function $n(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = jn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function Bn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Wn = ["db.Geo", "db.command", "command.aggregate"];
  function Hn(e2, t2) {
    return Wn.indexOf(`${e2}.${t2}`) > -1;
  }
  function zn(e2) {
    switch (f(e2 = se(e2))) {
      case "array":
        return e2.map((e3) => zn(e3));
      case "object":
        return e2._internalType === jn || Object.keys(e2).forEach((t2) => {
          e2[t2] = zn(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function Jn(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class Gn {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: zn(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Jn(e2), n2 = Jn(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === Jn(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Jn(e2), n2 = Jn(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return Vn({ $method: e2, $param: zn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: zn(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function Vn(e2, t2, n2) {
    return $n(new Gn(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), Hn(s2, t3) ? Vn({ $method: t3 }, e3, n2) : function() {
        return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function Yn({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function Qn(e2, t2 = {}) {
    return $n(new e2(t2), { get: (e3, t3) => Hn("db", t3) ? Vn({ $method: t3 }, null, e3) : function() {
      return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, null, e3);
    } });
  }
  class Xn extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Bn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Bn(this._dbCallBacks)), this.env = $n({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = $n({}, { get: (e3, t3) => Yn({ path: ["Geo"], method: t3 }) }), this.serverDate = Yn({ path: [], method: "serverDate" }), this.RegExp = Yn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
      }
      const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const Zn = "token无效，跳转登录页面", es = "token过期，跳转登录页面", ts = { TOKEN_INVALID_TOKEN_EXPIRED: es, TOKEN_INVALID_INVALID_CLIENTID: Zn, TOKEN_INVALID: Zn, TOKEN_INVALID_WRONG_TOKEN: Zn, TOKEN_INVALID_ANONYMOUS_USER: Zn }, ns = { "uni-id-token-expired": es, "uni-id-check-token-failed": Zn, "uni-id-token-not-exist": Zn, "uni-id-check-device-feature-failed": Zn };
  function ss(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function rs(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(ss(t2, e3.path)) : false === e3.needLogin && s2.push(ss(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function is(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function os() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function as() {
    return is(os());
  }
  function cs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = is(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const us = !!e.uniIdRouter;
  const { loginPage: hs, routerNeedLogin: ls, resToLogin: ds, needLoginPage: ps, notNeedLoginPage: fs, loginPageInTabBar: gs } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = rs(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = rs(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: cs(i2, r2) };
  }();
  if (ps.indexOf(hs) > -1)
    throw new Error(`Login page [${hs}] should not be "needLogin", please check your pages.json`);
  function ms(e2) {
    const t2 = as();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function ys(e2) {
    const t2 = is(ms(e2));
    return !(fs.indexOf(t2) > -1) && (ps.indexOf(t2) > -1 || ls.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function _s({ redirect: e2 }) {
    const t2 = is(e2), n2 = is(hs);
    return as() !== n2 && t2 !== n2;
  }
  function ws({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !_s({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(hs, t2);
    gs ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    });
  }
  function vs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = re();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: ns[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: ns[e4] };
      }
      return n3;
    }();
    if (ys(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (J($).length > 0)
        return setTimeout(() => {
          Y($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Is() {
    !function() {
      const e3 = os(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = vs({ url: e3 });
      t2 || n2 && ws({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = vs({ url: e3.url });
        return t3 ? e3 : s2 ? (ws({ api: n2, redirect: ms(e3.url) }), false) : e3;
      } });
    }
  }
  function Ss() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ns;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ts;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = J($);
        Z().then(() => {
          const n3 = os();
          if (n3 && _s({ redirect: n3 }))
            return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (hs && ws({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function bs(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        G(j, e4);
      }, e3.offResponse = function(e4) {
        V(j, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        G($, e4);
      }, e3.offNeedLogin = function(e4) {
        V($, e4);
      }, us && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
        Is.call(e3);
      }), ds && Ss.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        G(B, e4);
      }, e3.offRefreshToken = function(e4) {
        V(B, e4);
      };
    }(e2);
  }
  let ks;
  const As = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Ts() {
    const e2 = re().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ks(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ks = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ps.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = As.indexOf(e2.charAt(i2++)) << 18 | As.indexOf(e2.charAt(i2++)) << 12 | (n2 = As.indexOf(e2.charAt(i2++))) << 6 | (s2 = As.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Cs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), xs = t(Cs);
  const Os = "manual";
  function Es(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === Os)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Ls(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...h2) {
          let l2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            l2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, l2 = { result: new te(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...h2);
                }
              }
            const n3 = new te({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
            throw n3.detail = l2.result, Y(j, { type: z, content: n3 }), n3;
          }
          return Y(j, { type: z, content: l2.result }), l2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Rs(e2) {
    return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Us({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Rs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
  }
  async function Ns(e2) {
    const t2 = Rs(this);
    return t2.initPromise || (t2.initPromise = Us.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function Ds(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return Ns.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Ms(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class qs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ms("getSystemInfo")(), Ms("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Fs(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        ne.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Ks(e2) {
    {
      const { osName: e3, osVersion: t3 } = ce();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e3, t3) {
      let n3;
      for (let s3 = 0; s3 < e3.length; s3++) {
        const r3 = e3[s3];
        if (await Fs(r3, t3)) {
          n3 = r3;
          break;
        }
      }
      return { address: n3, port: t3 };
    }(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function js(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const $s = { tcb: St, tencent: St, aliyun: pe, private: kt, alipay: Lt };
  let Bs = new class {
    init(e2) {
      let t2 = {};
      const n2 = $s[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === P;
        const n3 = T;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Ks(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), js(t2), Kn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = Qn(Xn, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = Qn(Xn, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Ts, e3.chooseAndUploadFile = xs.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Es(e3);
        } }), e3.SSEChannel = qs, e3.initSecureNetworkByWeixin = Ds(e3), e3.importObject = Ls(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ee(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return h2;
            h2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            });
          };
        }(t2[e3], e3).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = C;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], Bs = Bs.init(t2), Bs._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        Bs[e3] = function() {
          return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Bs, { get mixinDatacom() {
      return Es(Bs);
    } }), bs(Bs), Bs.addInterceptor = N, Bs.removeInterceptor = D, Bs.interceptObject = F;
  })();
  var Ws = Bs;
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$P = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v2) => v2.font_class === this.type);
        if (code2) {
          return code2.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$O], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$O = {
    name: "uni-data-select",
    mixins: [Ws.mixinDatacom || {}],
    props: {
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      emptyTips: {
        type: String,
        default: "无选项"
      },
      clear: {
        type: Boolean,
        default: true
      },
      defItem: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 格式化输出 用法 field="_id as value, version as text, uni_platform as label" format="{label} - {text}"
      format: {
        type: String,
        default: ""
      },
      placement: {
        type: String,
        default: "bottom"
      }
    },
    data() {
      return {
        showSelector: false,
        current: "",
        mixinDatacomResData: [],
        apps: [],
        channels: [],
        cacheKey: "uni-data-select-lastSelectedValue"
      };
    },
    created() {
      this.debounceGet = this.debounce(() => {
        this.query();
      }, 300);
      if (this.collection && !this.localdata.length) {
        this.debounceGet();
      }
    },
    computed: {
      typePlaceholder() {
        const text = {
          "opendb-stat-app-versions": "版本",
          "opendb-app-channels": "渠道",
          "opendb-app-list": "应用"
        };
        const common = this.placeholder;
        const placeholder = text[this.collection];
        return placeholder ? common + placeholder : common;
      },
      valueCom() {
        return this.modelValue;
      },
      textShow() {
        let text = this.current;
        if (text.length > 10) {
          return text.slice(0, 25) + "...";
        }
        return text;
      },
      getOffsetByPlacement() {
        switch (this.placement) {
          case "top":
            return "bottom:calc(100% + 12px);";
          case "bottom":
            return "top:calc(100% + 12px);";
        }
      }
    },
    watch: {
      localdata: {
        immediate: true,
        handler(val, old) {
          if (Array.isArray(val) && old !== val) {
            this.mixinDatacomResData = val;
          }
        }
      },
      valueCom(val, old) {
        this.initDefVal();
      },
      mixinDatacomResData: {
        immediate: true,
        handler(val) {
          if (val.length) {
            this.initDefVal();
          }
        }
      }
    },
    methods: {
      debounce(fn, time = 100) {
        let timer = null;
        return function(...args) {
          if (timer)
            clearTimeout(timer);
          timer = setTimeout(() => {
            fn.apply(this, args);
          }, time);
        };
      },
      // 执行数据库查询
      query() {
        this.mixinDatacomEasyGet();
      },
      // 监听查询条件变更事件
      onMixinDatacomPropsChange() {
        if (this.collection) {
          this.debounceGet();
        }
      },
      initDefVal() {
        let defValue = "";
        if ((this.valueCom || this.valueCom === 0) && !this.isDisabled(this.valueCom)) {
          defValue = this.valueCom;
        } else {
          let strogeValue;
          if (this.collection) {
            strogeValue = this.getCache();
          }
          if (strogeValue || strogeValue === 0) {
            defValue = strogeValue;
          } else {
            let defItem = "";
            if (this.defItem > 0 && this.defItem <= this.mixinDatacomResData.length) {
              defItem = this.mixinDatacomResData[this.defItem - 1].value;
            }
            defValue = defItem;
          }
          if (defValue || defValue === 0) {
            this.emit(defValue);
          }
        }
        const def = this.mixinDatacomResData.find((item) => item.value === defValue);
        this.current = def ? this.formatItemName(def) : "";
      },
      /**
       * @param {[String, Number]} value
       * 判断用户给的 value 是否同时为禁用状态
       */
      isDisabled(value2) {
        let isDisabled = false;
        this.mixinDatacomResData.forEach((item) => {
          if (item.value === value2) {
            isDisabled = item.disable;
          }
        });
        return isDisabled;
      },
      clearVal() {
        this.emit("");
        if (this.collection) {
          this.removeCache();
        }
      },
      change(item) {
        if (!item.disable) {
          this.showSelector = false;
          this.current = this.formatItemName(item);
          this.emit(item.value);
        }
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
        this.$emit("change", val);
        if (this.collection) {
          this.setCache(val);
        }
      },
      toggleSelector() {
        if (this.disabled) {
          return;
        }
        this.showSelector = !this.showSelector;
      },
      formatItemName(item) {
        let {
          text,
          value: value2,
          channel_code
        } = item;
        channel_code = channel_code ? `(${channel_code})` : "";
        if (this.format) {
          let str = "";
          str = this.format;
          for (let key in item) {
            str = str.replace(new RegExp(`{${key}}`, "g"), item[key]);
          }
          return str;
        } else {
          return this.collection.indexOf("app-list") > 0 ? `${text}(${value2})` : text ? text : `未命名${channel_code}`;
        }
      },
      // 获取当前加载的数据
      getLoadData() {
        return this.mixinDatacomResData;
      },
      // 获取当前缓存key
      getCurrentCacheKey() {
        return this.collection;
      },
      // 获取缓存
      getCache(name = this.getCurrentCacheKey()) {
        let cacheData = uni.getStorageSync(this.cacheKey) || {};
        return cacheData[name];
      },
      // 设置缓存
      setCache(value2, name = this.getCurrentCacheKey()) {
        let cacheData = uni.getStorageSync(this.cacheKey) || {};
        cacheData[name] = value2;
        uni.setStorageSync(this.cacheKey, cacheData);
      },
      // 删除缓存
      removeCache(name = this.getCurrentCacheKey()) {
        let cacheData = uni.getStorageSync(this.cacheKey) || {};
        delete cacheData[name];
        uni.setStorageSync(this.cacheKey, cacheData);
      }
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-stat__select" }, [
      $props.label ? (vue.openBlock(), vue.createElementBlock(
        "span",
        {
          key: 0,
          class: "uni-label-text hide-on-phone"
        },
        vue.toDisplayString($props.label + "："),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-stat-box", { "uni-stat__actived": $data.current }])
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-select", { "uni-select--disabled": $props.disabled }])
            },
            [
              vue.createElementVNode("view", {
                class: "uni-select__input-box",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleSelector && $options.toggleSelector(...args))
              }, [
                $data.current ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "uni-select__input-text"
                  },
                  vue.toDisplayString($options.textShow),
                  1
                  /* TEXT */
                )) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "uni-select__input-text uni-select__input-placeholder"
                  },
                  vue.toDisplayString($options.typePlaceholder),
                  1
                  /* TEXT */
                )),
                $data.current && $props.clear && !$props.disabled ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clearVal && $options.clearVal(...args), ["stop"]))
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "clear",
                    color: "#c0c4cc",
                    size: "24"
                  })
                ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 3 }, [
                  vue.createVNode(_component_uni_icons, {
                    type: $data.showSelector ? "top" : "bottom",
                    size: "14",
                    color: "#999"
                  }, null, 8, ["type"])
                ]))
              ]),
              $data.showSelector ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-select--mask",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleSelector && $options.toggleSelector(...args))
              })) : vue.createCommentVNode("v-if", true),
              $data.showSelector ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "uni-select__selector",
                  style: vue.normalizeStyle($options.getOffsetByPlacement)
                },
                [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass($props.placement == "bottom" ? "uni-popper__arrow_bottom" : "uni-popper__arrow_top")
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("scroll-view", {
                    "scroll-y": "true",
                    class: "uni-select__selector-scroll"
                  }, [
                    $data.mixinDatacomResData.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-select__selector-empty"
                    }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($props.emptyTips),
                        1
                        /* TEXT */
                      )
                    ])) : (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      { key: 1 },
                      vue.renderList($data.mixinDatacomResData, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-select__selector-item",
                          key: index2,
                          onClick: ($event) => $options.change(item)
                        }, [
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass({ "uni-select__selector__disabled": item.disable })
                            },
                            vue.toDisplayString($options.formatItemName(item)),
                            3
                            /* TEXT, CLASS */
                          )
                        ], 8, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ],
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["__scopeId", "data-v-ddf9e0a2"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue"]]);
  const props$h = {
    props: {
      // tab的数据
      list: {
        type: Array,
        default: () => []
      },
      // 当前活动的tab的index
      current: {
        type: [String, Number],
        default: 0
      },
      // 激活的颜色
      activeColor: {
        type: String,
        default: "#3c9cff"
      },
      // 未激活的颜色
      inactiveColor: {
        type: String,
        default: "#303133"
      },
      // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
      mode: {
        type: String,
        default: "button"
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 12
      },
      // 激活tab的字体是否加粗
      bold: {
        type: Boolean,
        default: true
      },
      // mode = button时，组件背景颜色
      bgColor: {
        type: String,
        default: "#eeeeef"
      },
      // 从list元素对象中读取的键名
      keyName: {
        type: String,
        default: "name"
      },
      customItemStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_P = (_O = uni.$uv) == null ? void 0 : _O.props) == null ? void 0 : _P.subsection
    }
  };
  const _sfc_main$N = {
    name: "uv-subsection",
    mixins: [mpMixin, mixin, props$h],
    data() {
      return {
        // 组件尺寸
        itemRect: {
          width: 0,
          height: 0
        }
      };
    },
    watch: {
      list: {
        deep: true,
        handler() {
          this.init();
        }
      },
      current: {
        immediate: true,
        handler(n2) {
        }
      }
    },
    computed: {
      wrapperStyle() {
        const style = {};
        if (this.mode === "button") {
          style.backgroundColor = this.bgColor;
        }
        return style;
      },
      // 滑块的样式
      barStyle() {
        const style = {};
        style.width = `${this.itemRect.width}px`;
        style.height = `${this.itemRect.height}px`;
        style.transform = `translateX(${this.current * this.itemRect.width}px)`;
        if (this.mode === "subsection") {
          style.backgroundColor = this.activeColor;
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customItemStyle));
      },
      // 分段器item的样式
      itemStyle(index2) {
        return (index3) => {
          const style = {};
          if (this.mode === "subsection") {
            style.borderColor = this.activeColor;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
          return style;
        };
      },
      // 分段器文字颜色
      textStyle(index2) {
        return (index3) => {
          const style = {};
          style.fontWeight = this.bold && this.current === index3 ? "bold" : "normal";
          style.fontSize = this.$uv.addUnit(this.fontSize);
          if (this.mode === "subsection") {
            style.color = this.current === index3 ? "#fff" : this.inactiveColor;
          } else {
            style.color = this.current === index3 ? this.activeColor : this.inactiveColor;
          }
          return style;
        };
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.$uv.sleep().then(() => this.getRect());
      },
      // 判断展示文本
      getText(item) {
        return typeof item === "object" ? item[this.keyName] : item;
      },
      // 获取组件的尺寸
      getRect() {
        this.$uvGetRect(".uv-subsection__item--0").then((size) => {
          this.itemRect = size;
        });
      },
      clickHandler(index2) {
        this.$emit("change", index2);
      }
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-subsection", [`uv-subsection--${_ctx.mode}`]]),
        ref: "uv-subsection",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), $options.wrapperStyle])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-subsection__bar", [
              _ctx.mode === "button" && "uv-subsection--button__bar",
              _ctx.current === 0 && _ctx.mode === "subsection" && "uv-subsection__bar--first",
              _ctx.current > 0 && _ctx.current < _ctx.list.length - 1 && _ctx.mode === "subsection" && "uv-subsection__bar--center",
              _ctx.current === _ctx.list.length - 1 && _ctx.mode === "subsection" && "uv-subsection__bar--last"
            ]]),
            ref: "uv-subsection__bar",
            style: vue.normalizeStyle([$options.barStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.list, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["uv-subsection__item", [
                `uv-subsection__item--${index2}`,
                index2 < _ctx.list.length - 1 && "uv-subsection__item--no-border-right",
                index2 === 0 && "uv-subsection__item--first",
                index2 === _ctx.list.length - 1 && "uv-subsection__item--last"
              ]]),
              ref_for: true,
              ref: `uv-subsection__item--${index2}`,
              style: vue.normalizeStyle([$options.itemStyle(index2)]),
              onClick: ($event) => $options.clickHandler(index2),
              key: index2
            }, [
              vue.createElementVNode(
                "text",
                {
                  class: "uv-subsection__item__text",
                  style: vue.normalizeStyle([$options.textStyle(index2)])
                },
                vue.toDisplayString($options.getText(item)),
                5
                /* TEXT, STYLE */
              )
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["__scopeId", "data-v-1f050171"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-subsection/components/uv-subsection/uv-subsection.vue"]]);
  const props$g = {
    props: {
      // 宫格的name
      name: {
        type: [String, Number, null],
        default: null
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      ...(_R = (_Q = uni.$uv) == null ? void 0 : _Q.props) == null ? void 0 : _R.gridItem
    }
  };
  const _sfc_main$M = {
    name: "uv-grid-item",
    mixins: [mpMixin, mixin, props$g],
    emits: ["$uvGridItem", "click"],
    data() {
      return {
        parentData: {
          col: 3,
          // 父组件划分的宫格数
          border: true
          // 是否显示边框，根据父组件决定
        },
        classes: []
        // 类名集合，用于判断是否显示右边和下边框
      };
    },
    created() {
      this.updateParentData();
    },
    mounted() {
      this.init();
    },
    computed: {
      // vue下放到computed中，否则会因为延时造成闪烁
      width() {
        return 100 / Number(this.parentData.col) + "%";
      },
      itemStyle() {
        const style = {
          background: this.bgColor,
          width: this.width
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      init() {
        uni.$on("$uvGridItem", () => {
          this.gridItemClasses();
        });
        uni.$emit("$uvGridItem");
        this.gridItemClasses();
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-grid");
      },
      clickHandler() {
        var _a;
        let name = this.name;
        const children = (_a = this.parent) == null ? void 0 : _a.children;
        if (children && this.name === null) {
          name = children.findIndex((child) => child === this);
        }
        this.parent && this.parent.childClick(name);
        this.$emit("click", name);
      },
      async getItemWidth() {
        let width = 0;
        if (this.parent) {
          const parentWidth = await this.getParentWidth();
          width = parentWidth / Number(this.parentData.col) + "px";
        }
        this.width = width;
      },
      // 获取父元素的尺寸
      getParentWidth() {
      },
      gridItemClasses() {
        if (this.parentData.border) {
          let classes = [];
          this.parent.children.map((child, index2) => {
            if (this === child) {
              const len = this.parent.children.length;
              if ((index2 + 1) % this.parentData.col !== 0 && index2 + 1 !== len) {
                classes.push("uv-border-right");
              }
              const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col;
              if (index2 < len - lessNum) {
                classes.push("uv-border-bottom");
              }
            }
          });
          this.classes = classes;
        }
      }
    },
    unmounted() {
      uni.$off("$uvGridItem");
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-grid-item", $data.classes]),
        "hover-class": "uv-grid-item--hover-class",
        "hover-stay-time": 200,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([$options.itemStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["__scopeId", "data-v-0657340f"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-grid/components/uv-grid-item/uv-grid-item.vue"]]);
  const props$f = {
    props: {
      // 分成几列
      col: {
        type: [String, Number],
        default: 3
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
      align: {
        type: String,
        default: "left"
      },
      ...(_T = (_S = uni.$uv) == null ? void 0 : _S.props) == null ? void 0 : _T.grid
    }
  };
  const _sfc_main$L = {
    name: "uv-grid",
    mixins: [mpMixin, mixin, props$f],
    emits: ["click"],
    data() {
      return {
        index: 0,
        width: 0
      };
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      }
    },
    created() {
      this.children = [];
    },
    computed: {
      // 计算父组件的值是否发生变化
      parentData() {
        return [this.hoverClass, this.col, this.size, this.border];
      },
      // 宫格对齐方式
      gridStyle() {
        let style = {};
        switch (this.align) {
          case "left":
            style.justifyContent = "flex-start";
            break;
          case "center":
            style.justifyContent = "center";
            break;
          case "right":
            style.justifyContent = "flex-end";
            break;
          default:
            style.justifyContent = "flex-start";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      // 此方法由uv-grid-item触发，用于在uv-grid发出事件
      childClick(name) {
        this.$emit("click", name);
      }
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-grid",
        ref: "uv-grid",
        style: vue.normalizeStyle([$options.gridStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K], ["__scopeId", "data-v-fb64a415"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-grid/components/uv-grid/uv-grid.vue"]]);
  const _sfc_main$K = {
    name: "loading1",
    data() {
      return {};
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading1" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading1 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__scopeId", "data-v-0e645258"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/loading1.vue"]]);
  const _sfc_main$J = {
    name: "loading2",
    data() {
      return {};
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading2" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading2 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-3df48dc2"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/loading2.vue"]]);
  const _sfc_main$I = {
    name: "loading3",
    data() {
      return {};
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading3" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading3 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-27a8293c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/loading3.vue"]]);
  const _sfc_main$H = {
    name: "loading5",
    data() {
      return {};
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading5" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading4 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-2e7deb83"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/loading4.vue"]]);
  const _sfc_main$G = {
    name: "loading6",
    data() {
      return {};
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading6" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading5 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-ef674bbb"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/loading5.vue"]]);
  const _sfc_main$F = {
    components: { Loading1, Loading2, Loading3, Loading4, Loading5 },
    name: "qiun-loading",
    props: {
      loadingType: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Loading1 = vue.resolveComponent("Loading1");
    const _component_Loading2 = vue.resolveComponent("Loading2");
    const _component_Loading3 = vue.resolveComponent("Loading3");
    const _component_Loading4 = vue.resolveComponent("Loading4");
    const _component_Loading5 = vue.resolveComponent("Loading5");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $props.loadingType == 1 ? (vue.openBlock(), vue.createBlock(_component_Loading1, { key: 0 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 2 ? (vue.openBlock(), vue.createBlock(_component_Loading2, { key: 1 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 3 ? (vue.openBlock(), vue.createBlock(_component_Loading3, { key: 2 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 4 ? (vue.openBlock(), vue.createBlock(_component_Loading4, { key: 3 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 5 ? (vue.openBlock(), vue.createBlock(_component_Loading5, { key: 4 })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-loading/qiun-loading.vue"]]);
  const _sfc_main$E = {
    name: "qiun-error",
    props: {
      errorMessage: {
        type: String,
        default: null
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "chartsview" }, [
      vue.createElementVNode("view", { class: "charts-error" }),
      vue.createElementVNode(
        "view",
        { class: "charts-font" },
        vue.toDisplayString($props.errorMessage == null ? "请点击重试" : $props.errorMessage),
        1
        /* TEXT */
      )
    ]);
  }
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-a99d579b"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-error/qiun-error.vue"]]);
  const color$1 = ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"];
  const formatDateTime = (timeStamp, returnType) => {
    var date2 = /* @__PURE__ */ new Date();
    date2.setTime(timeStamp * 1e3);
    var y2 = date2.getFullYear();
    var m2 = date2.getMonth() + 1;
    m2 = m2 < 10 ? "0" + m2 : m2;
    var d2 = date2.getDate();
    d2 = d2 < 10 ? "0" + d2 : d2;
    var h2 = date2.getHours();
    h2 = h2 < 10 ? "0" + h2 : h2;
    var minute = date2.getMinutes();
    var second = date2.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    if (returnType == "full") {
      return y2 + "-" + m2 + "-" + d2 + " " + h2 + ":" + minute + ":" + second;
    }
    if (returnType == "y-m-d") {
      return y2 + "-" + m2 + "-" + d2;
    }
    if (returnType == "h:m") {
      return h2 + ":" + minute;
    }
    if (returnType == "h:m:s") {
      return h2 + ":" + minute + ":" + second;
    }
    return [y2, m2, d2, h2, minute, second];
  };
  const cfu = {
    //demotype为自定义图表类型，一般不需要自定义图表类型，只需要改根节点上对应的类型即可
    "type": ["pie", "ring", "rose", "word", "funnel", "map", "arcbar", "line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "tline", "tarea", "scatter", "bubble", "demotype"],
    "range": ["饼状图", "圆环图", "玫瑰图", "词云图", "漏斗图", "地图", "圆弧进度条", "折线图", "柱状图", "山峰图", "条状图", "区域图", "雷达图", "仪表盘", "K线图", "混合图", "时间轴折线", "时间轴区域", "散点图", "气泡图", "自定义类型"],
    //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型，例如最后的"demotype"
    //自定义类型时需要注意"tline","tarea","scatter","bubble"等时间轴（矢量x轴）类图表，没有categories，不需要加入categories
    "categories": ["line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "demotype"],
    //instance为实例变量承载属性，不要删除
    "instance": {},
    //option为opts及eopts承载属性，不要删除
    "option": {},
    //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
    "formatter": {
      "yAxisDemo1": function(val, index2, opts) {
        return val + "元";
      },
      "yAxisDemo2": function(val, index2, opts) {
        return val.toFixed(2);
      },
      "xAxisDemo1": function(val, index2, opts) {
        return val + "年";
      },
      "xAxisDemo2": function(val, index2, opts) {
        return formatDateTime(val, "h:m");
      },
      "seriesDemo1": function(val, index2, series, opts) {
        return val + "元";
      },
      "tooltipDemo1": function(item, category, index2, opts) {
        if (index2 == 0) {
          return "随便用" + item.data + "年";
        } else {
          return "其他我没改" + item.data + "天";
        }
      },
      "pieDemo": function(val, index2, series, opts) {
        if (index2 !== void 0) {
          return series[index2].name + "：" + series[index2].data + "元";
        }
      }
    },
    //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在opts参数，会将demotype与opts中option合并后渲染图表。
    "demotype": {
      //我这里把曲线图当做了自定义图表类型，您可以根据需要随意指定类型或配置
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "curve",
          "width": 2
        }
      }
    },
    //下面是自定义配置，请添加项目所需的通用配置
    "pie": {
      "type": "pie",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "extra": {
        "pie": {
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": true,
          "borderWidth": 3,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "ring": {
      "type": "ring",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "rotate": false,
      "dataLabel": true,
      "legend": {
        "show": true,
        "position": "right",
        "lineHeight": 25
      },
      "title": {
        "name": "收益率",
        "fontSize": 15,
        "color": "#666666"
      },
      "subtitle": {
        "name": "70%",
        "fontSize": 25,
        "color": "#7cb5ec"
      },
      "extra": {
        "ring": {
          "ringWidth": 30,
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": true,
          "borderWidth": 3,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "rose": {
      "type": "rose",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "legend": {
        "show": true,
        "position": "left",
        "lineHeight": 25
      },
      "extra": {
        "rose": {
          "type": "area",
          "minRadius": 50,
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": false,
          "borderWidth": 2,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "word": {
      "type": "word",
      "color": color$1,
      "extra": {
        "word": {
          "type": "normal",
          "autoColors": false
        }
      }
    },
    "funnel": {
      "type": "funnel",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "extra": {
        "funnel": {
          "activeOpacity": 0.3,
          "activeWidth": 10,
          "border": true,
          "borderWidth": 2,
          "borderColor": "#FFFFFF",
          "fillOpacity": 1,
          "labelAlign": "right"
        }
      }
    },
    "map": {
      "type": "map",
      "color": color$1,
      "padding": [0, 0, 0, 0],
      "dataLabel": true,
      "extra": {
        "map": {
          "border": true,
          "borderWidth": 1,
          "borderColor": "#666666",
          "fillOpacity": 0.6,
          "activeBorderColor": "#F04864",
          "activeFillColor": "#FACC14",
          "activeFillOpacity": 1
        }
      }
    },
    "arcbar": {
      "type": "arcbar",
      "color": color$1,
      "title": {
        "name": "百分比",
        "fontSize": 25,
        "color": "#00FF00"
      },
      "subtitle": {
        "name": "默认标题",
        "fontSize": 15,
        "color": "#666666"
      },
      "extra": {
        "arcbar": {
          "type": "default",
          "width": 12,
          "backgroundColor": "#E9E9E9",
          "startAngle": 0.75,
          "endAngle": 0.25,
          "gap": 2
        }
      }
    },
    "line": {
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "straight",
          "width": 2,
          "activeType": "hollow"
        }
      }
    },
    "tline": {
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": false,
        "boundaryGap": "justify"
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2,
        "data": [
          {
            "min": 0,
            "max": 80
          }
        ]
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "curve",
          "width": 2,
          "activeType": "hollow"
        }
      }
    },
    "tarea": {
      "type": "area",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true,
        "boundaryGap": "justify"
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2,
        "data": [
          {
            "min": 0,
            "max": 80
          }
        ]
      },
      "legend": {},
      "extra": {
        "area": {
          "type": "curve",
          "opacity": 0.2,
          "addLine": true,
          "width": 2,
          "gradient": true,
          "activeType": "hollow"
        }
      }
    },
    "column": {
      "type": "column",
      "color": color$1,
      "padding": [15, 15, 0, 5],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "data": [{ "min": 0 }]
      },
      "legend": {},
      "extra": {
        "column": {
          "type": "group",
          "width": 30,
          "activeBgColor": "#000000",
          "activeBgOpacity": 0.08
        }
      }
    },
    "mount": {
      "type": "mount",
      "color": color$1,
      "padding": [15, 15, 0, 5],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "data": [{ "min": 0 }]
      },
      "legend": {},
      "extra": {
        "mount": {
          "type": "mount",
          "widthRatio": 1.5
        }
      }
    },
    "bar": {
      "type": "bar",
      "color": color$1,
      "padding": [15, 30, 0, 5],
      "xAxis": {
        "boundaryGap": "justify",
        "disableGrid": false,
        "min": 0,
        "axisLine": false
      },
      "yAxis": {},
      "legend": {},
      "extra": {
        "bar": {
          "type": "group",
          "width": 30,
          "meterBorde": 1,
          "meterFillColor": "#FFFFFF",
          "activeBgColor": "#000000",
          "activeBgOpacity": 0.08
        }
      }
    },
    "area": {
      "type": "area",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "area": {
          "type": "straight",
          "opacity": 0.2,
          "addLine": true,
          "width": 2,
          "gradient": false,
          "activeType": "hollow"
        }
      }
    },
    "radar": {
      "type": "radar",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "dataLabel": false,
      "legend": {
        "show": true,
        "position": "right",
        "lineHeight": 25
      },
      "extra": {
        "radar": {
          "gridType": "radar",
          "gridColor": "#CCCCCC",
          "gridCount": 3,
          "opacity": 0.2,
          "max": 200,
          "labelShow": true
        }
      }
    },
    "gauge": {
      "type": "gauge",
      "color": color$1,
      "title": {
        "name": "66Km/H",
        "fontSize": 25,
        "color": "#2fc25b",
        "offsetY": 50
      },
      "subtitle": {
        "name": "实时速度",
        "fontSize": 15,
        "color": "#1890ff",
        "offsetY": -50
      },
      "extra": {
        "gauge": {
          "type": "default",
          "width": 30,
          "labelColor": "#666666",
          "startAngle": 0.75,
          "endAngle": 0.25,
          "startNumber": 0,
          "endNumber": 100,
          "labelFormat": "",
          "splitLine": {
            "fixRadius": 0,
            "splitNumber": 10,
            "width": 30,
            "color": "#FFFFFF",
            "childNumber": 5,
            "childWidth": 12
          },
          "pointer": {
            "width": 24,
            "color": "auto"
          }
        }
      }
    },
    "candle": {
      "type": "candle",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "enableScroll": true,
      "enableMarkLine": true,
      "dataLabel": false,
      "xAxis": {
        "labelCount": 4,
        "itemCount": 40,
        "disableGrid": true,
        "gridColor": "#CCCCCC",
        "gridType": "solid",
        "dashLength": 4,
        "scrollShow": true,
        "scrollAlign": "left",
        "scrollColor": "#A6A6A6",
        "scrollBackgroundColor": "#EFEBEF"
      },
      "yAxis": {},
      "legend": {},
      "extra": {
        "candle": {
          "color": {
            "upLine": "#f04864",
            "upFill": "#f04864",
            "downLine": "#2fc25b",
            "downFill": "#2fc25b"
          },
          "average": {
            "show": true,
            "name": ["MA5", "MA10", "MA30"],
            "day": [5, 10, 20],
            "color": ["#1890ff", "#2fc25b", "#facc14"]
          }
        },
        "markLine": {
          "type": "dash",
          "dashLength": 5,
          "data": [
            {
              "value": 2150,
              "lineColor": "#f04864",
              "showLabel": true
            },
            {
              "value": 2350,
              "lineColor": "#f04864",
              "showLabel": true
            }
          ]
        }
      }
    },
    "mix": {
      "type": "mix",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "disabled": false,
        "disableGrid": false,
        "splitNumber": 5,
        "gridType": "dash",
        "dashLength": 4,
        "gridColor": "#CCCCCC",
        "padding": 10,
        "showTitle": true,
        "data": []
      },
      "legend": {},
      "extra": {
        "mix": {
          "column": {
            "width": 20
          }
        }
      }
    },
    "scatter": {
      "type": "scatter",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "dataLabel": false,
      "xAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "splitNumber": 5,
        "boundaryGap": "justify",
        "min": 0
      },
      "yAxis": {
        "disableGrid": false,
        "gridType": "dash"
      },
      "legend": {},
      "extra": {
        "scatter": {}
      }
    },
    "bubble": {
      "type": "bubble",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "splitNumber": 5,
        "boundaryGap": "justify",
        "min": 0,
        "max": 250
      },
      "yAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "data": [{
          "min": 0,
          "max": 150
        }]
      },
      "legend": {},
      "extra": {
        "bubble": {
          "border": 2,
          "opacity": 0.5
        }
      }
    }
  };
  const color = ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"];
  const cfe = {
    //demotype为自定义图表类型
    "type": ["pie", "ring", "rose", "funnel", "line", "column", "area", "radar", "gauge", "candle", "demotype"],
    //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
    "categories": ["line", "column", "area", "radar", "gauge", "candle", "demotype"],
    //instance为实例变量承载属性，option为eopts承载属性，不要删除
    "instance": {},
    "option": {},
    //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
    "formatter": {
      "tooltipDemo1": function(res) {
        let result = "";
        for (let i2 in res) {
          if (i2 == 0) {
            result += res[i2].axisValueLabel + "年销售额";
          }
          let value2 = "--";
          if (res[i2].data !== null) {
            value2 = res[i2].data;
          }
          result += "<br/>" + res[i2].marker + res[i2].seriesName + "：" + value2 + " 万元";
        }
        return result;
      },
      legendFormat: function(name) {
        return "自定义图例+" + name;
      },
      yAxisFormatDemo: function(value2, index2) {
        return value2 + "元";
      },
      seriesFormatDemo: function(res) {
        return res.name + "年" + res.value + "元";
      }
    },
    //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在eopts参数，会将demotype与eopts中option合并后渲染图表。
    "demotype": {
      "color": color
      //在这里填写echarts的option即可
    },
    //下面是自定义配置，请添加项目所需的通用配置
    "column": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "bar",
        "data": [],
        "barwidth": 20,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "line": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "line",
        "data": [],
        "barwidth": 20,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "area": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "line",
        "data": [],
        "areaStyle": {},
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "pie": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "grid": {
        "top": 40,
        "bottom": 30,
        "right": 15,
        "left": 15
      },
      "legend": {
        "bottom": "left"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": "50%",
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "ring": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "grid": {
        "top": 40,
        "bottom": 30,
        "right": 15,
        "left": 15
      },
      "legend": {
        "bottom": "left"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": ["40%", "70%"],
        "avoidLabelOverlap": false,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        },
        "labelLine": {
          "show": true
        }
      }
    },
    "rose": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "legend": {
        "top": "bottom"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": "55%",
        "center": ["50%", "50%"],
        "roseType": "area"
      }
    },
    "funnel": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item",
        "formatter": "{b} : {c}%"
      },
      "legend": {
        "top": "bottom"
      },
      "seriesTemplate": {
        "name": "",
        "type": "funnel",
        "left": "10%",
        "top": 60,
        "bottom": 60,
        "width": "80%",
        "min": 0,
        "max": 100,
        "minSize": "0%",
        "maxSize": "100%",
        "sort": "descending",
        "gap": 2,
        "label": {
          "show": true,
          "position": "inside"
        },
        "labelLine": {
          "length": 10,
          "lineStyle": {
            "width": 1,
            "type": "solid"
          }
        },
        "itemStyle": {
          "bordercolor": "#fff",
          "borderwidth": 1
        },
        "emphasis": {
          "label": {
            "fontSize": 20
          }
        },
        "data": []
      }
    },
    "gauge": {
      "color": color,
      "tooltip": {
        "formatter": "{a} <br/>{b} : {c}%"
      },
      "seriesTemplate": {
        "name": "业务指标",
        "type": "gauge",
        "detail": { "formatter": "{value}%" },
        "data": [{ "value": 50, "name": "完成率" }]
      }
    },
    "candle": {
      "xAxis": {
        "data": []
      },
      "yAxis": {},
      "color": color,
      "title": {
        "text": ""
      },
      "dataZoom": [
        {
          "type": "inside",
          "xAxisIndex": [0, 1],
          "start": 10,
          "end": 100
        },
        {
          "show": true,
          "xAxisIndex": [0, 1],
          "type": "slider",
          "bottom": 10,
          "start": 10,
          "end": 100
        }
      ],
      "seriesTemplate": {
        "name": "",
        "type": "k",
        "data": []
      }
    }
  };
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("rdcharts");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["rdcharts"] = "f9cb76fc";
  };
  function deepCloneAssign(origin = {}, ...args) {
    for (let i2 in args) {
      for (let key in args[i2]) {
        if (args[i2].hasOwnProperty(key)) {
          origin[key] = args[i2][key] && typeof args[i2][key] === "object" ? deepCloneAssign(Array.isArray(args[i2][key]) ? [] : {}, origin[key], args[i2][key]) : args[i2][key];
        }
      }
    }
    return origin;
  }
  function formatterAssign(args, formatter) {
    for (let key in args) {
      if (args.hasOwnProperty(key) && args[key] !== null && typeof args[key] === "object") {
        formatterAssign(args[key], formatter);
      } else if (key === "format" && typeof args[key] === "string") {
        args["formatter"] = formatter[args[key]] ? formatter[args[key]] : void 0;
      }
    }
    return args;
  }
  function getFormatDate(date2) {
    var seperator = "-";
    var year = date2.getFullYear();
    var month = date2.getMonth() + 1;
    var strDate = date2.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator + month + seperator + strDate;
    return currentdate;
  }
  const _sfc_main$D = {
    name: "qiun-data-charts",
    mixins: [Ws.mixinDatacom],
    props: {
      type: {
        type: String,
        default: null
      },
      canvasId: {
        type: String,
        default: "uchartsid"
      },
      canvas2d: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: "rgba(0,0,0,0)"
      },
      animation: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        default() {
          return {
            categories: [],
            series: []
          };
        }
      },
      opts: {
        type: Object,
        default() {
          return {};
        }
      },
      eopts: {
        type: Object,
        default() {
          return {};
        }
      },
      loadingType: {
        type: Number,
        default: 2
      },
      errorShow: {
        type: Boolean,
        default: true
      },
      errorReload: {
        type: Boolean,
        default: true
      },
      errorMessage: {
        type: String,
        default: null
      },
      inScrollView: {
        type: Boolean,
        default: false
      },
      reshow: {
        type: Boolean,
        default: false
      },
      reload: {
        type: Boolean,
        default: false
      },
      disableScroll: {
        type: Boolean,
        default: false
      },
      optsWatch: {
        type: Boolean,
        default: true
      },
      onzoom: {
        type: Boolean,
        default: false
      },
      ontap: {
        type: Boolean,
        default: true
      },
      ontouch: {
        type: Boolean,
        default: false
      },
      onmouse: {
        type: Boolean,
        default: true
      },
      onmovetip: {
        type: Boolean,
        default: false
      },
      echartsH5: {
        type: Boolean,
        default: false
      },
      echartsApp: {
        type: Boolean,
        default: false
      },
      tooltipShow: {
        type: Boolean,
        default: true
      },
      tooltipFormat: {
        type: String,
        default: void 0
      },
      tooltipCustom: {
        type: Object,
        default: void 0
      },
      startDate: {
        type: String,
        default: void 0
      },
      endDate: {
        type: String,
        default: void 0
      },
      textEnum: {
        type: Array,
        default() {
          return [];
        }
      },
      groupEnum: {
        type: Array,
        default() {
          return [];
        }
      },
      pageScrollTop: {
        type: Number,
        default: 0
      },
      directory: {
        type: String,
        default: "/"
      },
      tapLegend: {
        type: Boolean,
        default: true
      },
      menus: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        cid: "uchartsid",
        inWx: false,
        inAli: false,
        inTt: false,
        inBd: false,
        inH5: false,
        inApp: false,
        inWin: false,
        type2d: true,
        disScroll: false,
        openmouse: false,
        pixel: 1,
        cWidth: 375,
        cHeight: 250,
        showchart: false,
        echarts: false,
        echartsResize: {
          state: false
        },
        uchartsOpts: {},
        echartsOpts: {},
        drawData: {},
        lastDrawTime: null
      };
    },
    created() {
      this.cid = this.canvasId;
      if (this.canvasId == "uchartsid" || this.canvasId == "") {
        let t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let len = t2.length;
        let id = "";
        for (let i2 = 0; i2 < 32; i2++) {
          id += t2.charAt(Math.floor(Math.random() * len));
        }
        this.cid = id;
      }
      const systemInfo = uni.getSystemInfoSync();
      if (systemInfo.platform === "windows" || systemInfo.platform === "mac") {
        this.inWin = true;
      }
      this.type2d = false;
      this.disScroll = this.disableScroll;
    },
    mounted() {
      this.inApp = true;
      if (this.echartsApp === true) {
        this.echarts = true;
        this.openmouse = false;
      }
      this.$nextTick(() => {
        this.beforeInit();
      });
    },
    destroyed() {
      if (this.echarts === true) {
        delete cfe.option[this.cid];
        delete cfe.instance[this.cid];
      } else {
        delete cfu.option[this.cid];
        delete cfu.instance[this.cid];
      }
      uni.offWindowResize(() => {
      });
    },
    watch: {
      chartDataProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval)) {
              this._clearChart();
              if (val.series && val.series.length > 0) {
                this.beforeInit();
              } else {
                this.mixinDatacomLoading = true;
                this.showchart = false;
                this.mixinDatacomErrorMessage = null;
              }
            }
          } else {
            this.mixinDatacomLoading = false;
            this._clearChart();
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：chartData数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      localdata: {
        handler(val, oldval) {
          if (JSON.stringify(val) !== JSON.stringify(oldval)) {
            if (val.length > 0) {
              this.beforeInit();
            } else {
              this.mixinDatacomLoading = true;
              this._clearChart();
              this.showchart = false;
              this.mixinDatacomErrorMessage = null;
            }
          }
        },
        immediate: false,
        deep: true
      },
      optsProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval) && this.echarts === false && this.optsWatch == true) {
              this.checkData(this.drawData);
            }
          } else {
            this.mixinDatacomLoading = false;
            this._clearChart();
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：opts数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      eoptsProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval) && this.echarts === true) {
              this.checkData(this.drawData);
            }
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：eopts数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      reshow(val, oldval) {
        if (val === true && this.mixinDatacomLoading === false) {
          setTimeout(() => {
            this.mixinDatacomErrorMessage = null;
            this.echartsResize.state = !this.echartsResize.state;
            this.checkData(this.drawData);
          }, 200);
        }
      },
      reload(val, oldval) {
        if (val === true) {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this.reloading();
        }
      },
      mixinDatacomErrorMessage(val, oldval) {
        if (val) {
          this.emitMsg({ name: "error", params: { type: "error", errorShow: this.errorShow, msg: val, id: this.cid } });
          if (this.errorShow) {
            formatAppLog("log", "at uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue:611", "[秋云图表组件]" + val);
          }
        }
      },
      errorMessage(val, oldval) {
        if (val && this.errorShow && val !== null && val !== "null" && val !== "") {
          this.showchart = false;
          this.mixinDatacomLoading = false;
          this.mixinDatacomErrorMessage = val;
        } else {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this.reloading();
        }
      }
    },
    computed: {
      optsProps() {
        return JSON.parse(JSON.stringify(this.opts));
      },
      eoptsProps() {
        return JSON.parse(JSON.stringify(this.eopts));
      },
      chartDataProps() {
        return JSON.parse(JSON.stringify(this.chartData));
      }
    },
    methods: {
      beforeInit() {
        this.mixinDatacomErrorMessage = null;
        if (typeof this.chartData === "object" && this.chartData != null && this.chartData.series !== void 0 && this.chartData.series.length > 0) {
          this.drawData = deepCloneAssign({}, this.chartData);
          this.mixinDatacomLoading = false;
          this.showchart = true;
          this.checkData(this.chartData);
        } else if (this.localdata.length > 0) {
          this.mixinDatacomLoading = false;
          this.showchart = true;
          this.localdataInit(this.localdata);
        } else if (this.collection !== "") {
          this.mixinDatacomLoading = false;
          this.getCloudData();
        } else {
          this.mixinDatacomLoading = true;
        }
      },
      localdataInit(resdata) {
        if (this.groupEnum.length > 0) {
          for (let i2 = 0; i2 < resdata.length; i2++) {
            for (let j2 = 0; j2 < this.groupEnum.length; j2++) {
              if (resdata[i2].group === this.groupEnum[j2].value) {
                resdata[i2].group = this.groupEnum[j2].text;
              }
            }
          }
        }
        if (this.textEnum.length > 0) {
          for (let i2 = 0; i2 < resdata.length; i2++) {
            for (let j2 = 0; j2 < this.textEnum.length; j2++) {
              if (resdata[i2].text === this.textEnum[j2].value) {
                resdata[i2].text = this.textEnum[j2].text;
              }
            }
          }
        }
        let needCategories = false;
        let tmpData = { categories: [], series: [] };
        let tmpcategories = [];
        let tmpseries = [];
        if (this.echarts === true) {
          needCategories = cfe.categories.includes(this.type);
        } else {
          needCategories = cfu.categories.includes(this.type);
        }
        if (needCategories === true) {
          if (this.chartData && this.chartData.categories && this.chartData.categories.length > 0) {
            tmpcategories = this.chartData.categories;
          } else {
            if (this.startDate && this.endDate) {
              let idate = new Date(this.startDate);
              let edate = new Date(this.endDate);
              while (idate <= edate) {
                tmpcategories.push(getFormatDate(idate));
                idate = idate.setDate(idate.getDate() + 1);
                idate = new Date(idate);
              }
            } else {
              let tempckey = {};
              resdata.map(function(item, index2) {
                if (item.text != void 0 && !tempckey[item.text]) {
                  tmpcategories.push(item.text);
                  tempckey[item.text] = true;
                }
              });
            }
          }
          tmpData.categories = tmpcategories;
        }
        let tempskey = {};
        resdata.map(function(item, index2) {
          if (item.group != void 0 && !tempskey[item.group]) {
            tmpseries.push({ name: item.group, data: [] });
            tempskey[item.group] = true;
          }
        });
        if (tmpseries.length == 0) {
          tmpseries = [{ name: "默认分组", data: [] }];
          if (needCategories === true) {
            for (let j2 = 0; j2 < tmpcategories.length; j2++) {
              let seriesdata = 0;
              for (let i2 = 0; i2 < resdata.length; i2++) {
                if (resdata[i2].text == tmpcategories[j2]) {
                  seriesdata = resdata[i2].value;
                }
              }
              tmpseries[0].data.push(seriesdata);
            }
          } else {
            for (let i2 = 0; i2 < resdata.length; i2++) {
              tmpseries[0].data.push({ "name": resdata[i2].text, "value": resdata[i2].value });
            }
          }
        } else {
          for (let k = 0; k < tmpseries.length; k++) {
            if (tmpcategories.length > 0) {
              for (let j2 = 0; j2 < tmpcategories.length; j2++) {
                let seriesdata = 0;
                for (let i2 = 0; i2 < resdata.length; i2++) {
                  if (tmpseries[k].name == resdata[i2].group && resdata[i2].text == tmpcategories[j2]) {
                    seriesdata = resdata[i2].value;
                  }
                }
                tmpseries[k].data.push(seriesdata);
              }
            } else {
              for (let i2 = 0; i2 < resdata.length; i2++) {
                if (tmpseries[k].name == resdata[i2].group) {
                  tmpseries[k].data.push(resdata[i2].value);
                }
              }
            }
          }
        }
        tmpData.series = tmpseries;
        this.drawData = deepCloneAssign({}, tmpData);
        this.checkData(tmpData);
      },
      reloading() {
        if (this.errorReload === false) {
          return;
        }
        this.showchart = false;
        this.mixinDatacomErrorMessage = null;
        if (this.collection !== "") {
          this.mixinDatacomLoading = false;
          this.onMixinDatacomPropsChange(true);
        } else {
          this.beforeInit();
        }
      },
      checkData(anyData) {
        let cid = this.cid;
        if (this.echarts === true) {
          cfe.option[cid] = deepCloneAssign({}, this.eopts);
          cfe.option[cid].id = cid;
          cfe.option[cid].type = this.type;
        } else {
          if (this.type && cfu.type.includes(this.type)) {
            cfu.option[cid] = deepCloneAssign({}, cfu[this.type], this.opts);
            cfu.option[cid].canvasId = cid;
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：props参数中type类型不正确";
          }
        }
        let newData = deepCloneAssign({}, anyData);
        if (newData.series !== void 0 && newData.series.length > 0) {
          this.mixinDatacomErrorMessage = null;
          if (this.echarts === true) {
            cfe.option[cid].chartData = newData;
            this.$nextTick(() => {
              this.init();
            });
          } else {
            cfu.option[cid].categories = newData.categories;
            cfu.option[cid].series = newData.series;
            this.$nextTick(() => {
              this.init();
            });
          }
        }
      },
      resizeHandler() {
        let currTime = Date.now();
        let lastDrawTime = this.lastDrawTime ? this.lastDrawTime : currTime - 3e3;
        let duration = currTime - lastDrawTime;
        if (duration < 1e3)
          return;
        uni.createSelectorQuery().in(this).select("#ChartBoxId" + this.cid).boundingClientRect((data) => {
          this.showchart = true;
          if (data.width > 0 && data.height > 0) {
            if (data.width !== this.cWidth || data.height !== this.cHeight) {
              this.checkData(this.drawData);
            }
          }
        }).exec();
      },
      getCloudData() {
        if (this.mixinDatacomLoading == true) {
          return;
        }
        this.mixinDatacomLoading = true;
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          this.localdataInit(this.mixinDatacomResData);
        }).catch((err) => {
          this.mixinDatacomLoading = false;
          this.showchart = false;
          this.mixinDatacomErrorMessage = "请求错误：" + err;
        });
      },
      onMixinDatacomPropsChange(needReset, changed) {
        if (needReset == true && this.collection !== "") {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this._clearChart();
          this.getCloudData();
        }
      },
      _clearChart() {
        let cid = this.cid;
        if (this.echarts !== true && cfu.option[cid] && cfu.option[cid].context) {
          const ctx = cfu.option[cid].context;
          if (typeof ctx === "object" && !!!cfu.option[cid].update) {
            ctx.clearRect(0, 0, this.cWidth * this.pixel, this.cHeight * this.pixel);
            ctx.draw();
          }
        }
      },
      init() {
        let cid = this.cid;
        uni.createSelectorQuery().in(this).select("#ChartBoxId" + cid).boundingClientRect((data) => {
          if (data.width > 0 && data.height > 0) {
            this.mixinDatacomLoading = false;
            this.showchart = true;
            this.lastDrawTime = Date.now();
            this.cWidth = data.width;
            this.cHeight = data.height;
            if (this.echarts !== true) {
              cfu.option[cid].background = this.background == "rgba(0,0,0,0)" ? "#FFFFFF" : this.background;
              cfu.option[cid].canvas2d = this.type2d;
              cfu.option[cid].pixelRatio = this.pixel;
              cfu.option[cid].animation = this.animation;
              cfu.option[cid].width = data.width * this.pixel;
              cfu.option[cid].height = data.height * this.pixel;
              cfu.option[cid].onzoom = this.onzoom;
              cfu.option[cid].ontap = this.ontap;
              cfu.option[cid].ontouch = this.ontouch;
              cfu.option[cid].onmouse = this.openmouse;
              cfu.option[cid].onmovetip = this.onmovetip;
              cfu.option[cid].tooltipShow = this.tooltipShow;
              cfu.option[cid].tooltipFormat = this.tooltipFormat;
              cfu.option[cid].tooltipCustom = this.tooltipCustom;
              cfu.option[cid].inScrollView = this.inScrollView;
              cfu.option[cid].lastDrawTime = this.lastDrawTime;
              cfu.option[cid].tapLegend = this.tapLegend;
            }
            if (this.inH5 || this.inApp) {
              if (this.echarts == true) {
                cfe.option[cid].ontap = this.ontap;
                cfe.option[cid].onmouse = this.openmouse;
                cfe.option[cid].tooltipShow = this.tooltipShow;
                cfe.option[cid].tooltipFormat = this.tooltipFormat;
                cfe.option[cid].tooltipCustom = this.tooltipCustom;
                cfe.option[cid].lastDrawTime = this.lastDrawTime;
                this.echartsOpts = deepCloneAssign({}, cfe.option[cid]);
              } else {
                cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                this.uchartsOpts = deepCloneAssign({}, cfu.option[cid]);
              }
            } else {
              cfu.option[cid] = formatterAssign(cfu.option[cid], cfu.formatter);
              this.mixinDatacomErrorMessage = null;
              this.mixinDatacomLoading = false;
              this.showchart = true;
              this.$nextTick(() => {
                if (this.type2d === true) {
                  const query = uni.createSelectorQuery().in(this);
                  query.select("#" + cid).fields({ node: true, size: true }).exec((res) => {
                    if (res[0]) {
                      const canvas = res[0].node;
                      const ctx = canvas.getContext("2d");
                      cfu.option[cid].context = ctx;
                      cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                      if (cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true) {
                        this._updataUChart(cid);
                      } else {
                        canvas.width = data.width * this.pixel;
                        canvas.height = data.height * this.pixel;
                        canvas._width = data.width * this.pixel;
                        canvas._height = data.height * this.pixel;
                        setTimeout(() => {
                          cfu.option[cid].context.restore();
                          cfu.option[cid].context.save();
                          this._newChart(cid);
                        }, 100);
                      }
                    } else {
                      this.showchart = false;
                      this.mixinDatacomErrorMessage = "参数错误：开启2d模式后，未获取到dom节点，canvas-id:" + cid;
                    }
                  });
                } else {
                  if (this.inAli) {
                    cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                  }
                  cfu.option[cid].context = uni.createCanvasContext(cid, this);
                  if (cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true) {
                    this._updataUChart(cid);
                  } else {
                    setTimeout(() => {
                      cfu.option[cid].context.restore();
                      cfu.option[cid].context.save();
                      this._newChart(cid);
                    }, 100);
                  }
                }
              });
            }
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            if (this.reshow == true) {
              this.mixinDatacomErrorMessage = "布局错误：未获取到父元素宽高尺寸！canvas-id:" + cid;
            }
          }
        }).exec();
      },
      saveImage() {
        uni.canvasToTempFilePath({
          canvasId: this.cid,
          success: (res) => {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                uni.showToast({
                  title: "保存成功",
                  duration: 2e3
                });
              }
            });
          }
        }, this);
      },
      getImage() {
        if (this.type2d == false) {
          uni.canvasToTempFilePath({
            canvasId: this.cid,
            success: (res) => {
              this.emitMsg({ name: "getImage", params: { type: "getImage", base64: res.tempFilePath } });
            }
          }, this);
        } else {
          const query = uni.createSelectorQuery().in(this);
          query.select("#" + this.cid).fields({ node: true, size: true }).exec((res) => {
            if (res[0]) {
              const canvas = res[0].node;
              this.emitMsg({ name: "getImage", params: { type: "getImage", base64: canvas.toDataURL("image/png") } });
            }
          });
        }
      },
      _error(e2) {
        this.mixinDatacomErrorMessage = e2.detail.errMsg;
      },
      emitMsg(msg) {
        this.$emit(msg.name, msg.params);
      },
      getRenderType() {
        if (this.echarts === true && this.mixinDatacomLoading === false) {
          this.beforeInit();
        }
      },
      toJSON() {
        return this;
      }
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_qiun_loading = resolveEasycom(vue.resolveDynamicComponent("qiun-loading"), __easycom_0$3);
    const _component_qiun_error = resolveEasycom(vue.resolveDynamicComponent("qiun-error"), __easycom_1$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "chartsview",
      id: "ChartBoxId" + $data.cid
    }, [
      _ctx.mixinDatacomLoading ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createCommentVNode(" 自定义加载状态，请改这里 "),
        vue.createVNode(_component_qiun_loading, { loadingType: $props.loadingType }, null, 8, ["loadingType"])
      ])) : vue.createCommentVNode("v-if", true),
      _ctx.mixinDatacomErrorMessage && $props.errorShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.reloading && $options.reloading(...args))
      }, [
        vue.createCommentVNode(" 自定义错误提示，请改这里 "),
        vue.createVNode(_component_qiun_error, { errorMessage: $props.errorMessage }, null, 8, ["errorMessage"])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" APP和H5采用renderjs渲染图表 "),
      $data.echarts ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        style: vue.normalizeStyle([{ background: $props.background }, { "width": "100%", "height": "100%" }]),
        "data-directory": $props.directory,
        id: "EC" + $data.cid,
        prop: vue.wp($data.echartsOpts),
        "change:prop": _ctx.rdcharts.ecinit,
        resize: vue.wp($data.echartsResize),
        "change:resize": _ctx.rdcharts.ecresize
      }, null, 12, ["data-directory", "id", "prop", "change:prop", "resize", "change:resize"])), [
        [vue.vShow, $data.showchart]
      ]) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.rdcharts.tap && _ctx.rdcharts.tap(...args)),
        onMousemove: _cache[3] || (_cache[3] = (...args) => _ctx.rdcharts.mouseMove && _ctx.rdcharts.mouseMove(...args)),
        onMousedown: _cache[4] || (_cache[4] = (...args) => _ctx.rdcharts.mouseDown && _ctx.rdcharts.mouseDown(...args)),
        onMouseup: _cache[5] || (_cache[5] = (...args) => _ctx.rdcharts.mouseUp && _ctx.rdcharts.mouseUp(...args)),
        onTouchstart: _cache[6] || (_cache[6] = (...args) => _ctx.rdcharts.touchStart && _ctx.rdcharts.touchStart(...args)),
        onTouchmove: _cache[7] || (_cache[7] = (...args) => _ctx.rdcharts.touchMove && _ctx.rdcharts.touchMove(...args)),
        onTouchend: _cache[8] || (_cache[8] = (...args) => _ctx.rdcharts.touchEnd && _ctx.rdcharts.touchEnd(...args)),
        id: "UC" + $data.cid,
        prop: vue.wp($data.uchartsOpts),
        "change:prop": _ctx.rdcharts.ucinit
      }, [
        vue.withDirectives(vue.createElementVNode("canvas", {
          id: $data.cid,
          canvasId: $data.cid,
          style: vue.normalizeStyle({ width: $data.cWidth + "px", height: $data.cHeight + "px", background: $props.background }),
          "disable-scroll": $props.disableScroll,
          onError: _cache[1] || (_cache[1] = (...args) => $options._error && $options._error(...args))
        }, null, 44, ["id", "canvasId", "disable-scroll"]), [
          [vue.vShow, $data.showchart]
        ])
      ], 40, ["id", "prop", "change:prop"])),
      vue.createCommentVNode(" 支付宝小程序 "),
      vue.createCommentVNode(" 其他小程序通过vue渲染图表 ")
    ], 8, ["id"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$D);
  const __easycom_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-0ca34aee"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue"]]);
  const _sfc_main$C = {
    data() {
      const d2 = /* @__PURE__ */ new Date();
      const year = d2.getFullYear();
      let month = d2.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      const date2 = d2.getDate();
      return {
        maxDate: `${year}-${month}-${date2}`,
        minDate: `${year}-${month - 3}-${date2}`,
        value: 0,
        range: [{
          value: 0,
          text: "全部"
        }],
        list: ["今天", "近七天", "自定义"],
        listData: [`${year}-${month}-${date2}`, `${year}-${month}-${date2}`],
        current: 0,
        chartData: {},
        chartData1: {},
        storeId: 0,
        storeName: "",
        count: 0,
        sum: 0,
        refund: 0,
        average: 0,
        //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          enableScroll: true,
          legend: {},
          xAxis: {
            disableGrid: true,
            scrollShow: true,
            itemCount: 5
          },
          yAxis: {
            gridType: "dash",
            dashLength: 1,
            name: "营业额/元"
          },
          extra: {
            line: {
              type: "straight",
              width: 2,
              activeType: "hollow"
            }
          }
        }
      };
    },
    mounted() {
      this.getServerData();
      this.getStoreName();
      this.getMoney();
    },
    watch: {
      value() {
        this.updateChartData();
      }
    },
    methods: {
      updateChartData() {
        if (this.value !== 0) {
          formatAppLog("log", "at pages/reportForms/reportForms.vue:122", "text", this.storeName);
          const selectedSeries = this.chartData1.series.find((series) => series.name === this.storeName);
          formatAppLog("log", "at pages/reportForms/reportForms.vue:124", "selectedSeries", selectedSeries);
          this.chartData = {
            categories: this.chartData1.categories,
            series: [selectedSeries]
          };
        } else {
          this.chartData = JSON.parse(JSON.stringify(this.chartData1));
        }
      },
      getStoreName() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/reportForms/reportForms.vue:136", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/storeName",
          "GET",
          { userId }
        ).then((res) => {
          formatAppLog("log", "at pages/reportForms/reportForms.vue:143", "name", res);
          if (res.data.code == 200) {
            res.data.data.forEach((item) => {
              this.range.push({
                value: item.storeId,
                text: item.storeName
              });
            });
          }
        });
      },
      getMoney() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/reportForms/reportForms.vue:158", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/money",
          "GET",
          {
            data: this.listData,
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/reportForms/reportForms.vue:168", res);
          if (res.data.code == 200) {
            this.count = res.data.data.count;
            this.sum = res.data.data.sum;
            this.refund = res.data.data.refund;
            this.average = res.data.data.average;
          }
        });
      },
      getServerData() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/reportForms/reportForms.vue:204", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/report",
          "GET",
          {
            data: this.listData,
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/reportForms/reportForms.vue:214", res);
          if (res.data.code == 200) {
            this.chartData1 = JSON.parse(JSON.stringify(res.data.data));
            this.chartData = JSON.parse(JSON.stringify(res.data.data));
          }
        });
      },
      change(e2) {
        formatAppLog("log", "at pages/reportForms/reportForms.vue:226", "选择的店铺值：", this.range[e2]);
        const selectedrange = this.range.find((range2) => range2.value === e2);
        this.storeId = selectedrange.value;
        this.storeName = selectedrange.text;
        this.getServerData();
        this.getMoney();
      },
      change1(index2) {
        const d2 = /* @__PURE__ */ new Date();
        const year = d2.getFullYear();
        let month = d2.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        const date2 = d2.getDate() - 6;
        if (index2 === this.list.length - 1) {
          this.$refs.calendars.open();
        } else if (index2 == 1) {
          if (date2 < 1) {
            const lastMonthDate = new Date(year, month - 1, 0);
            const lastMonthDays = lastMonthDate.getDate();
            date2 = lastMonthDays + date2;
            month = month - 1;
            month = month < 10 ? `0${month}` : month;
          }
          const startDate = `${year}-${month < 10 ? `0${month}` : month}-${date2 < 10 ? `0${date2}` : date2}`;
          const endDate = `${year}-${month}-${d2.getDate()}`;
          this.listData = [startDate, endDate];
          this.getServerData();
          this.getMoney();
        } else if (index2 == 0) {
          this.listData = [`${year}-${month}-${d2.getDate()}`, `${year}-${month}-${d2.getDate()}`];
          this.getServerData();
          this.getMoney();
        }
        this.current = index2;
      },
      open() {
        this.$refs.calendar.open();
      },
      confirm(e2) {
        formatAppLog("log", "at pages/reportForms/reportForms.vue:272", "日历选择：", e2);
        this.listData = [e2.range.before, e2.range.after];
        this.getServerData();
        this.getMoney();
      }
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_data_select = resolveEasycom(vue.resolveDynamicComponent("uni-data-select"), __easycom_0$4);
    const _component_uv_subsection = resolveEasycom(vue.resolveDynamicComponent("uv-subsection"), __easycom_1$7);
    const _component_uv_calendars = resolveEasycom(vue.resolveDynamicComponent("uv-calendars"), __easycom_2$4);
    const _component_uv_grid_item = resolveEasycom(vue.resolveDynamicComponent("uv-grid-item"), __easycom_3$1);
    const _component_uv_grid = resolveEasycom(vue.resolveDynamicComponent("uv-grid"), __easycom_4$1);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3$3);
    const _component_qiun_data_charts = resolveEasycom(vue.resolveDynamicComponent("qiun-data-charts"), __easycom_6$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("br"),
      vue.createElementVNode("br"),
      vue.createElementVNode("br"),
      vue.createVNode(_component_uni_data_select, {
        class: "custom-data-select",
        modelValue: $data.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
        localdata: $data.range,
        onChange: $options.change,
        clear: false
      }, null, 8, ["modelValue", "localdata", "onChange"]),
      vue.createVNode(_component_uv_subsection, {
        list: $data.list,
        current: $data.current,
        onChange: $options.change1
      }, null, 8, ["list", "current", "onChange"]),
      vue.createVNode(_component_uv_calendars, {
        ref: "calendars",
        mode: "range",
        endDate: $data.maxDate,
        startDate: $data.minDate,
        allowSameDay: "",
        showLunar: "",
        monthNum: "4",
        onConfirm: $options.confirm
      }, null, 8, ["endDate", "startDate", "onConfirm"]),
      vue.createVNode(_component_uv_grid, { border: false }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_grid_item, { style: { "margin": "50rpx auto" } }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { style: { "color": "rgb(200,200,210)" } }, "收款金额(元)"),
              vue.createElementVNode(
                "text",
                { style: { "font-size": "60rpx", "font-weight": "bold" } },
                vue.toDisplayString($data.sum),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_grid, {
        col: 3,
        style: { "margin-bottom": "30rpx" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_grid_item, null, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "text",
                { style: { "font-size": "40rpx", "font-weight": "bold" } },
                vue.toDisplayString($data.count),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { style: { "color": "blue" } }, "收款笔数(笔)")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_grid_item, null, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "text",
                { style: { "font-size": "40rpx", "font-weight": "bold" } },
                vue.toDisplayString($data.refund),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { style: { "color": "blue" } }, "退款金额(元)")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_grid_item, null, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "text",
                { style: { "font-size": "40rpx", "font-weight": "bold" } },
                vue.toDisplayString($data.average),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { style: { "color": "blue" } }, "客单价(元)")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_gap, {
        height: "20rpx",
        bgColor: "rgb(247,247,245)"
      }),
      vue.createVNode(_component_uv_gap, {
        height: "10rpx",
        bgColor: "#fff"
      }),
      vue.createElementVNode("text", { style: { "font-size": "30rpx", "font-weight": "bold", "margin": "35rpx" } }, "顾客统计"),
      vue.createVNode(_component_uv_grid, {
        col: 2,
        style: { "margin-bottom": "30rpx" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_grid_item, { style: { "background": "rgb(255,247,245)", "margin": "20rpx", "width": "335rpx", "height": "200rpx" } }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { style: { "font-size": "40rpx", "font-weight": "bold" } }, "50"),
              vue.createElementVNode("text", { style: { "color": "blue" } }, "今日到店新顾客(人)")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_grid_item, { style: { "background": "rgb(245,250,255)", "margin": "20rpx", "width": "335rpx", "height": "200rpx" } }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { style: { "font-size": "40rpx", "font-weight": "bold" } }, "20"),
              vue.createElementVNode("text", { style: { "color": "blue" } }, "今日到店回头客(人)")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "charts-box" }, [
        vue.createElementVNode("text", { class: "unit-label" }, "营业额/元"),
        vue.createVNode(_component_qiun_data_charts, {
          type: "line",
          opts: $data.opts,
          chartData: $data.chartData,
          ontouch: true
        }, null, 8, ["opts", "chartData"])
      ])
    ]);
  }
  const PagesReportFormsReportForms = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__scopeId", "data-v-5c25e55e"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/reportForms/reportForms.vue"]]);
  const props$e = {
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
      ...(_V = (_U = uni.$uv) == null ? void 0 : _U.props) == null ? void 0 : _V.link
    }
  };
  const _sfc_main$B = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$e],
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
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-86e87617"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
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
          for (let i2 = 0, len = name.length - 2; i2 < len; i2++) {
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
  const props$d = {
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
      ...(_X = (_W = uni.$uv) == null ? void 0 : _W.props) == null ? void 0 : _X.text
    }
  };
  const _sfc_main$A = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$d],
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
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$5);
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
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$c = {
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
      ...(_Z = (_Y = uni.$uv) == null ? void 0 : _Y.props) == null ? void 0 : _Z.stepsItem
    }
  };
  const _sfc_main$z = {
    name: "uv-steps-item",
    mixins: [mpMixin, mixin, props$c],
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
        let color2 = "";
        switch (this.statusClass) {
          case "finish":
            color2 = this.parentData.activeColor;
            break;
          case "error":
            color2 = "#f56c6c";
            break;
          case "process":
            color2 = this.parentData.dot ? this.parentData.activeColor : "transparent";
            break;
          default:
            color2 = this.parentData.inactiveColor;
            break;
        }
        return color2;
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
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$4);
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
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-87a44040"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-steps/components/uv-steps-item/uv-steps-item.vue"]]);
  const props$b = {
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
      ...(_$ = (__ = uni.$uv) == null ? void 0 : __.props) == null ? void 0 : _$.steps
    }
  };
  const _sfc_main$y = {
    name: "uv-steps",
    mixins: [mpMixin, mixin, props$b],
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
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-f7a17f77"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-steps/components/uv-steps/uv-steps.vue"]]);
  const _sfc_main$x = {
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
        modifyApplicationMsg: "",
        cancellationApplicationBtn: true
      };
    },
    mounted() {
      const applicationMsg = uni.getStorageSync("applicationMsg");
      this.applicationMsg = applicationMsg;
      formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:95", "参数:", applicationMsg);
      this.applicationStatus = applicationMsg.auditStatus;
      this.modifyApplicationMsg = applicationMsg.auditSuggestion;
      if (applicationMsg.auditStatus === 1) {
        this.applicationTitle = "驳回修改";
        this.isOutOfStock = true;
      }
      if (applicationMsg.auditStatus === 2) {
        this.currentStep = 3;
      }
      if (applicationMsg.auditStatus === 3) {
        this.applicationTitle = "取消申请";
        this.isOutOfStock = true;
      }
    },
    methods: {
      modifyApplication() {
        formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:113", "参数:", this.applicationMsg);
        uni.switchTab({
          //保留当前页面，跳转到应用内的某个页面
          url: "/pages/personalCenter/personalCenter"
        });
      },
      cancellationApplication() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      //取消申请
      confirm() {
        formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:127", "退出的逻辑", this.applicationMsg.auditId);
        this.cancellationApplicationBtn = false;
        this.$request(
          "/application/cancellationApplication",
          "GET",
          { auditId: this.applicationMsg.auditId }
        ).then((res) => {
          formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:134", "name", res);
          if (res.data.code == 200) {
            this.productList = res.data.data;
            formatAppLog("log", "at pages/personalCenter/application/applicationStatus.vue:137", res.data.data);
          }
        });
        uni.removeStorageSync("applicationMsg");
        this.$refs.popup.close();
        uni.switchTab({
          // 保留当前页面，跳转到应用内的某个页面
          url: "/pages/personalCenter/personalCenter"
        });
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_steps_item = resolveEasycom(vue.resolveDynamicComponent("uv-steps-item"), __easycom_0$2);
    const _component_uv_steps = resolveEasycom(vue.resolveDynamicComponent("uv-steps"), __easycom_1$3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
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
                      vue.createElementVNode("text", { style: { "display": "block", "text-align": "center", "width": "300px", "margin-top": "20px", "margin-bottom": "50px", "color": "rgb(231 36 36)" } }, " 确认取消申请吗？ "),
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
              )
            ]),
            vue.withDirectives(vue.createVNode(_component_uv_button, {
              type: "error",
              text: "取消申请",
              onClick: $options.cancellationApplication,
              style: { "margin-top": "480rpx" }
            }, null, 8, ["onClick"]), [
              [vue.vShow, $data.cancellationApplicationBtn]
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.applicationStatus === 0]
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
          [vue.vShow, $data.applicationStatus === 1]
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
          [vue.vShow, $data.applicationStatus === 2]
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
            vue.createTextVNode(" 已取消申请！ ")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.applicationStatus === 3]
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesPersonalCenterApplicationApplicationStatus = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/application/applicationStatus.vue"]]);
  const _sfc_main$w = {
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
        return [item.auditStoreCreateTime];
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
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/personalCenter/application/applicationAll.vue:70", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/application/selectAllApplication",
          "GET",
          { userId }
        ).then((res) => {
          formatAppLog("log", "at pages/personalCenter/application/applicationAll.vue:77", res);
          if (res.data.code == 200) {
            this.productList = res.data.data;
            formatAppLog("log", "at pages/personalCenter/application/applicationAll.vue:80", res.data.data);
          }
        });
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", null, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.productList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "uni-list-cell",
              "hover-class": "uni-list-cell-hover",
              key: item.auditId,
              onClick: ($event) => $options.goProDetail(item)
            }, [
              vue.createElementVNode(
                "view",
                { class: "topTitleV" },
                vue.toDisplayString(item.auditStoreName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "topTitleV unitV",
                  style: vue.normalizeStyle({
                    color: item.auditStatus === 2 ? "green" : item.auditStatus === 0 ? "blue" : "red"
                  })
                },
                vue.toDisplayString(item.auditStatus === 0 ? "待审核" : item.auditStatus === 1 ? "驳回修改" : item.auditStatus === 2 ? "审核通过" : item.auditStatus === 3 ? "取消申请" : "未知状态"),
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
  const PagesPersonalCenterApplicationApplicationAll = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/application/applicationAll.vue"]]);
  const _sfc_main$v = {
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
        for (let i2 = 0; i2 < 6; i2++) {
          this.productList.push({
            "storeName": "开心麻辣烫" + i2,
            "storeId": "md1234564654654654",
            "storeAddress": "香港特别行政区油尖旺区尖沙咀金马伦道22-24号东丽中心",
            "storeImg": "../../../static/personalCenter/store.jpg",
            "id": i2 + ""
          });
        }
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesPersonalCenterStoreManagementStoreManagement = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/storeManagement/storeManagement.vue"]]);
  const props$a = {
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
      ...(_ba = (_aa = uni.$uv) == null ? void 0 : _aa.props) == null ? void 0 : _ba.textarea
    }
  };
  const _sfc_main$u = {
    name: "uv-textarea",
    mixins: [mpMixin, mixin, props$a],
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
        } catch (e2) {
          return 0;
        }
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      onFocus(e2) {
        this.$emit("focus", e2);
      },
      onBlur(e2) {
        this.$emit("blur", e2);
        this.$uv.formValidate(this, "blur");
      },
      onLinechange(e2) {
        this.$emit("linechange", e2);
      },
      onInput(e2) {
        let { value: value2 = "" } = e2.detail || {};
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
      onConfirm(e2) {
        this.$emit("confirm", e2);
      },
      onKeyboardheightchange(e2) {
        this.$emit("keyboardheightchange", e2);
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-d5a7e73a"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue"]]);
  const _sfc_main$t = {
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
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_textarea = resolveEasycom(vue.resolveDynamicComponent("uv-textarea"), __easycom_2$3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
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
  const PagesPersonalCenterUserOpinionUserOpinion = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-226f5526"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/userOpinion/userOpinion.vue"]]);
  const props$9 = {
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
      ...(_da = (_ca = uni.$uv) == null ? void 0 : _ca.props) == null ? void 0 : _da.input
    }
  };
  const _sfc_main$s = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$9],
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
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      // 当键盘输入时，触发input事件
      onInput(e2) {
        let { value: value2 = "" } = e2.detail || {};
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
      onkeyboardheightchange(e2) {
        this.$emit("keyboardheightchange", e2);
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
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
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
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-651602aa"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  const props$8 = {
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
      ...(_fa = (_ea = uni.$uv) == null ? void 0 : _ea.props) == null ? void 0 : _fa.line
    }
  };
  const _sfc_main$r = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$8],
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
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props$7 = {
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
      ...(_ha = (_ga = uni.$uv) == null ? void 0 : _ga.props) == null ? void 0 : _ha.formItem
    }
  };
  const _sfc_main$q = {
    name: "uv-form-item",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$7],
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
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_2$a);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$1);
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
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-d1e73275"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);
  const _sfc_main$p = {
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
      change(e2) {
        this.show = e2.show;
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
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
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-0e12a980"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-upload/components/uv-preview-video/uv-preview-video.vue"]]);
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
  const props$6 = {
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
      ...(_ja = (_ia = uni.$uv) == null ? void 0 : _ia.props) == null ? void 0 : _ja.upload
    }
  };
  const _sfc_main$o = {
    name: "uv-upload",
    emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
    mixins: [mpMixin, mixin, mixin_accept, props$6],
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
          } catch (e2) {
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
        lists.map((i2, j2) => {
          if (j2 == index2) {
            i2.current = true;
          }
        });
        const filters = lists.filter((i2) => i2.isImage);
        const findIndex = filters.findIndex((i2) => i2.current);
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
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_preview_video = resolveEasycom(vue.resolveDynamicComponent("uv-preview-video"), __easycom_2$2);
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
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-822c46b5"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-upload/components/uv-upload/uv-upload.vue"]]);
  const props$5 = {
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
      ...(_la = (_ka = uni.$uv) == null ? void 0 : _ka.props) == null ? void 0 : _la.form
    }
  };
  const formatRegExp = /%[sdj%]/g;
  let warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every((e2) => typeof e2 === "string")) {
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
    let i2 = 1;
    const f2 = args[0];
    const len = args.length;
    if (typeof f2 === "function") {
      return f2.apply(null, args.slice(1));
    }
    if (typeof f2 === "string") {
      let str = String(f2).replace(formatRegExp, (x) => {
        if (x === "%%") {
          return "%";
        }
        if (i2 >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i2++]);
          case "%d":
            return Number(args[i2++]);
          case "%j":
            try {
              return JSON.stringify(args[i2++]);
            } catch (_2) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (let arg = args[i2]; i2 < len; arg = args[++i2]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f2;
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
    arr.forEach((a2) => {
      func2(a2, count);
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
      _pending.catch((e2) => e2);
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
    pending.catch((e2) => e2);
    return pending;
  }
  function complementError(rule) {
    return function(oe2) {
      if (oe2 && oe2.message) {
        oe2.field = oe2.field || rule.fullField;
        return oe2;
      }
      return {
        message: typeof oe2 === "function" ? oe2() : oe2,
        field: oe2.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (const s2 in source) {
        if (source.hasOwnProperty(s2)) {
          const value2 = source[s2];
          if (typeof value2 === "object" && typeof target[s2] === "object") {
            target[s2] = { ...target[s2], ...value2 };
          } else {
            target[s2] = value2;
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
      } catch (e2) {
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
      let z2;
      let item;
      for (z2 in rules2) {
        if (rules2.hasOwnProperty(z2)) {
          item = rules2[z2];
          this.rules[z2] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o2, oc) {
      const _this = this;
      if (o2 === void 0) {
        o2 = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      let source = source_;
      let options = o2;
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
        let i2;
        let errors = [];
        let fields = {};
        function add(e2) {
          if (Array.isArray(e2)) {
            let _errors;
            errors = (_errors = errors).concat.apply(_errors, e2);
          } else {
            errors.push(e2);
          }
        }
        for (i2 = 0; i2 < results.length; i2++) {
          add(results[i2]);
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
      keys.forEach((z2) => {
        arr = _this.rules[z2];
        value2 = source[z2];
        arr.forEach((r2) => {
          let rule = r2;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = { ...source };
            }
            value2 = source[z2] = rule.transform(value2);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = { ...rule };
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z2;
          rule.fullField = rule.fullField || z2;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z2] = series[z2] || [];
          series[z2].push({
            rule,
            value: value2,
            source,
            field: z2
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
        function cb(e2) {
          if (e2 === void 0) {
            e2 = [];
          }
          let errors = e2;
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
            for (const f2 in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f2)) {
                const fieldSchema = Array.isArray(fieldsSchema[f2]) ? fieldsSchema[f2] : [fieldsSchema[f2]];
                fieldsSchema[f2] = fieldSchema.map(addFullfield.bind(null, f2));
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
          res.then(() => cb(), (e2) => cb(e2));
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
  const _sfc_main$n = {
    name: "uv-form",
    mixins: [mpMixin, mixin, props$5],
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
        handler(n2) {
          this.setRules(n2);
        }
      },
      // 监听属性的变化，通知子组件uv-form-item重新获取信息
      propsChange(n2) {
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
        handler(n2) {
          if (!this.originalModel) {
            this.originalModel = this.$uv.deepClone(n2);
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
              for (let i2 = 0; i2 < rules2.length; i2++) {
                const ruleItem = rules2[i2];
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
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-form/components/uv-form/uv-form.vue"]]);
  const props$4 = {
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
      ...(_na = (_ma = uni.$uv) == null ? void 0 : _ma.props) == null ? void 0 : _na.actionSheet
    }
  };
  const _sfc_main$m = {
    name: "uv-action-sheet",
    mixins: [openType, button, mpMixin, mixin, props$4],
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
      popupChange(e2) {
        if (!e2.show)
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
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$1);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$9);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3$3);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4$2);
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
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-39528ed0"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.vue"]]);
  const _sfc_main$l = {
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
      chooseModify(e2) {
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:147", this.chooseBtn);
        formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:148", "选中该项：", e2);
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
        for (let i2 = 0; i2 < lists.length; i2++) {
          const result = await this.uploadFilePromise(lists[i2].url);
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
          formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:190", url2);
          uni.uploadFile({
            url: "http://127.0.0.1:8125/ocr/businessLicense",
            // 仅为示例，非真实的接口地址
            filePath: url2,
            name: "file",
            formData: {
              user: "test"
            },
            success: (res) => {
              formatAppLog("log", "at pages/personalCenter/storeManagement/storeDetails/storeDetails.vue:199", res);
              setTimeout(() => {
                resolve(res.data.data);
              }, 1e3);
            }
          });
        });
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_3);
    const _component_uv_textarea = resolveEasycom(vue.resolveDynamicComponent("uv-textarea"), __easycom_2$3);
    const _component_uv_upload = resolveEasycom(vue.resolveDynamicComponent("uv-upload"), __easycom_2$1);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_1$1);
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
  const PagesPersonalCenterStoreManagementStoreDetailsStoreDetails = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-ef0f9e43"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/storeManagement/storeDetails/storeDetails.vue"]]);
  const _sfc_main$k = {
    data() {
      return {
        closeTitle: "确定要注销账号吗？",
        popUpWindow: [{
          name: "确定"
        }, {
          name: "取消"
        }]
      };
    },
    methods: {
      chooseModify(e2) {
        if (e2.name === "确定") {
          this.$request(
            "/user/unsubscribe",
            "GET",
            { userId: "1" }
          ).then((res) => {
            formatAppLog("log", "at pages/personalCenter/unsubscribe/unsubscribe.vue:92", res);
            if (res.data.code == 200) {
              this.$refs.notify.success("密码修改成功");
              this.clearFields();
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/personalCenter/personalCenter"
                });
              }, 2e3);
            } else if (res.data.code == 201) {
              this.$refs.notify.error("修改失败");
            } else if (res.data.code == 202) {
              this.$refs.notify.error("旧密码输入错误，修改失败");
            }
          }).catch((err) => {
            formatAppLog("log", "at pages/personalCenter/unsubscribe/unsubscribe.vue:109", err);
          });
        }
      },
      close() {
      },
      confirmCancellation() {
        this.$refs.actionSheet.open();
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_1$1);
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
      }, null, 8, ["onClick"]),
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
    ]);
  }
  const PagesPersonalCenterUnsubscribeUnsubscribe = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-62535ee6"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/unsubscribe/unsubscribe.vue"]]);
  const props$3 = {
    props: {
      // 到顶部的距离
      top: {
        type: [String, Number],
        default: 0
      },
      // type主题，primary，success，warning，error
      type: {
        type: String,
        default: "primary"
      },
      // 字体颜色
      color: {
        type: String,
        default: "#ffffff"
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: ""
      },
      // 展示的文字内容
      message: {
        type: String,
        default: ""
      },
      // 展示时长，为0时不消失，单位ms
      duration: {
        type: [String, Number],
        default: 3e3
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 15
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      ...(_pa = (_oa = uni.$uv) == null ? void 0 : _oa.props) == null ? void 0 : _pa.notify
    }
  };
  const _sfc_main$j = {
    name: "uv-notify",
    mixins: [mpMixin, mixin, props$3],
    data() {
      return {
        // 是否展示组件
        open: false,
        timer: null,
        config: {
          // 到顶部的距离
          top: this.top,
          // type主题，primary，success，warning，error
          type: this.type,
          // 字体颜色
          color: this.color,
          // 背景颜色
          bgColor: this.bgColor,
          // 展示的文字内容
          message: this.message,
          // 展示时长，为0时不消失，单位ms
          duration: this.duration,
          // 字体大小
          fontSize: this.fontSize,
          // 是否留出顶部安全距离（状态栏高度）
          safeAreaInsetTop: this.safeAreaInsetTop
        },
        // 合并后的配置，避免多次调用组件后，可能会复用之前使用的配置参数
        tmpConfig: {}
      };
    },
    computed: {
      containerStyle() {
        let top = 0;
        if (this.tmpConfig.top === 0)
          ;
        const style = {
          top: this.$uv.addUnit(this.tmpConfig.top === 0 ? top : this.tmpConfig.top),
          // 因为组件底层为uv-transition组件，必须将其设置为fixed定位
          // 让其出现在导航栏底部
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 10076
        };
        return style;
      },
      // 组件背景颜色
      backgroundColor() {
        const style = {};
        if (this.tmpConfig.bgColor) {
          style.backgroundColor = this.tmpConfig.bgColor;
        }
        return style;
      },
      // 默认主题下的图标
      icon() {
        let icon;
        if (this.tmpConfig.type === "success") {
          icon = "checkmark-circle";
        } else if (this.tmpConfig.type === "error") {
          icon = "close-circle";
        } else if (this.tmpConfig.type === "warning") {
          icon = "error-circle";
        }
        return icon;
      }
    },
    created() {
      ["primary", "success", "error", "warning"].map((item) => {
        this[item] = (message) => this.show({
          type: item,
          message
        });
      });
    },
    methods: {
      show(options) {
        this.tmpConfig = this.$uv.deepMerge(this.config, options);
        this.clearTimer();
        this.open = true;
        if (this.tmpConfig.duration > 0) {
          this.timer = setTimeout(() => {
            this.open = false;
            this.clearTimer();
            typeof this.tmpConfig.complete === "function" && this.tmpConfig.complete();
          }, this.tmpConfig.duration);
        }
      },
      // 关闭notify
      close() {
        this.clearTimer();
      },
      clearTimer() {
        this.open = false;
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    unmounted() {
      this.clearTimer();
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_0$a);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_2$a);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      mode: "slide-top",
      customStyle: $options.containerStyle,
      show: $data.open
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-notify", [`uv-notify--${$data.tmpConfig.type}`]]),
            style: vue.normalizeStyle([$options.backgroundColor, _ctx.$uv.addStyle(_ctx.customStyle)])
          },
          [
            $data.tmpConfig.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uv-notify__warpper" }, [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                ["success", "warning", "error"].includes($data.tmpConfig.type) ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                  key: 0,
                  name: $data.tmpConfig.icon,
                  color: $data.tmpConfig.color,
                  size: 1.3 * $data.tmpConfig.fontSize,
                  customStyle: { marginRight: "4px" }
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ], true),
              vue.createElementVNode(
                "text",
                {
                  class: "uv-notify__warpper__text",
                  style: vue.normalizeStyle({
                    fontSize: _ctx.$uv.addUnit($data.tmpConfig.fontSize),
                    color: $data.tmpConfig.color
                  })
                },
                vue.toDisplayString($data.tmpConfig.message),
                5
                /* TEXT, STYLE */
              )
            ])
          ],
          6
          /* CLASS, STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["customStyle", "show"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-f93d0337"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-notify/components/uv-notify/uv-notify.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        passwordInfo: {
          userId: "",
          oldPwd: "",
          newPwd: "",
          confirmPwd: ""
        },
        rules: {
          pwd: {
            type: "string",
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        }
      };
    },
    methods: {
      submit() {
        const { oldPwd, newPwd, confirmPwd } = this.passwordInfo;
        if (oldPwd === "" || newPwd === "" || confirmPwd === "") {
          return this.$refs.notify.warning("请输入完整的信息");
        }
        if (newPwd != confirmPwd) {
          return this.$refs.notify.error("两次密码输入不一致");
        }
        if (newPwd === oldPwd) {
          return this.$refs.notify.error("新密码和旧密码不能一样");
        }
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/personalCenter/changePassword/changePassword.vue:69", userMsg);
        var userId = userMsg.userId;
        this.passwordInfo.userId = userId;
        this.$request(
          "/user/modifyPwd",
          "POST",
          this.passwordInfo
        ).then((res) => {
          formatAppLog("log", "at pages/personalCenter/changePassword/changePassword.vue:77", res);
          if (res.data.code == 200) {
            this.$refs.notify.success("密码修改成功");
            this.clearFields();
            setTimeout(() => {
              uni.switchTab({
                url: "/pages/personalCenter/personalCenter"
              });
            }, 2e3);
          } else if (res.data.code == 201) {
            this.$refs.notify.error("修改失败");
          } else if (res.data.code == 202) {
            this.$refs.notify.error("旧密码输入错误，修改失败");
          }
        }).catch((err) => {
          formatAppLog("log", "at pages/personalCenter/changePassword/changePassword.vue:94", err);
        });
      },
      //清空字段的值，封装起来
      clearFields() {
        this.passwordInfo.oldPwd = "";
        this.passwordInfo.newPwd = "";
        this.passwordInfo.confirmPwd = "";
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_3);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_notify = resolveEasycom(vue.resolveDynamicComponent("uv-notify"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_form, {
          labelPosition: "left",
          model: $data.passwordInfo,
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
                    clearable: "",
                    password: true
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
                    clearable: "",
                    password: true
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
                    clearable: "",
                    password: true,
                    style: { "margin-left": "20rpx" }
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"])
      ]),
      vue.createVNode(_component_uv_button, {
        type: "error",
        text: "提交修改",
        onClick: $options.submit,
        style: { "margin-top": "100rpx" }
      }, null, 8, ["onClick"]),
      vue.createVNode(
        _component_uv_notify,
        { ref: "notify" },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesPersonalCenterChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-a7bc368c"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/changePassword/changePassword.vue"]]);
  const _sfc_main$h = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 客服界面 ");
  }
  const PagesPersonalCenterChatWindowChatWindow = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/chatWindow/chatWindow.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        stores: [],
        info: {
          userId: 0
        }
      };
    },
    methods: {
      choseStore(storeId) {
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/showCashOutStore.vue:36", storeId + "这是传递的店铺id");
        uni.setStorageSync("storeId", storeId);
        uni.setStorageSync("userId", this.info.userId);
        uni.navigateTo({
          url: "/pages/personalCenter/showCashOutStore/cashOut/cashOut",
          "animationType": "slide-in-right",
          "animationDuration": 200
        });
      },
      getCashOutStore() {
        var userMsg = uni.getStorageSync("userMsg");
        this.info.userId = userMsg.userId;
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/showCashOutStore.vue:48", this.info.userId + "接收的用户id");
        this.$request("/user/getCashOutStore", "POST", this.info).then((res) => {
          formatAppLog("log", "at pages/personalCenter/showCashOutStore/showCashOutStore.vue:50", res);
          if (res.data.code == 200) {
            this.stores = res.data.data;
          }
        }).catch((err) => {
          uni.showToast({
            title: "服务器出错，请稍后再试",
            icon: "none"
          });
        });
      }
    },
    mounted() {
      this.getCashOutStore();
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.createElementVNode("view", { class: "mid" }),
              vue.createElementVNode("view", { class: "foot" }, [
                vue.createTextVNode(" 可提现金额: ¥"),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeUsableMoney),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "rightContainer" }, [
              vue.createElementVNode("view", { class: "imageContainer" }, [
                vue.createElementVNode("image", {
                  src: item.storeHeadImage,
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
  const PagesPersonalCenterShowCashOutStoreShowCashOutStore = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showCashOutStore/showCashOutStore.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        isEmpty: true,
        store: {
          money: 0,
          bossAccount: "",
          feilv: 0.06
          //提现费率 抽成
        },
        cashOut: {
          payOutMoney: "",
          choucheng: "",
          // 抽成的钱
          storeId: 0,
          payOutCard: ""
        },
        info: {
          storeId: 0,
          userId: 0
        }
      };
    },
    methods: {
      change(e2) {
        this.isEmpty = false;
        this.cashOut.tixianMoney = e2;
        formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:79", this.cashOut);
        this.cashOut.choucheng = this.cashOut.tixianMoney * this.store.feilv;
      },
      submit() {
        if (this.cashOut.payOutMoney > this.store.money) {
          uni.showToast({
            title: "提现的金额不可大于可提现金额",
            icon: "none"
          });
          this.cashOut.payOutMoney = "";
          this.cashOut.choucheng = "";
        } else if (this.cashOut.payOutMoney < 0) {
          uni.showToast({
            title: "提现金额不可小于0",
            icon: "none"
          });
          this.cashOut.payOutMoney = "";
          this.cashOut.choucheng = "";
        } else if (this.cashOut.payOutMoney == 0) {
          uni.showToast({
            title: "提现金额不可等于0",
            icon: "none"
          });
          this.cashOut.payOutMoney = "";
          this.cashOut.choucheng = "";
        } else {
          formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:105", this.cashOut);
          this.$request("/user/doCashOut", "POST", this.cashOut).then((res) => {
            formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:107", res);
            if (res.data.code == 200) {
              uni.showToast({
                title: "提现成功",
                icon: "none"
              });
            }
            this.cashOut.payOutMoney = "";
            this.cashOut.choucheng = "";
            this.getStoreMoney();
          }).catch((err) => {
            uni.showToast({
              title: "服务器出错了，请稍后再试",
              icon: "none"
            });
          });
        }
      },
      getStoreMoney() {
        this.info.storeId = uni.getStorageSync("storeId");
        this.cashOut.storeId = uni.getStorageSync("storeId");
        this.info.userId = uni.getStorageSync("userId");
        this.cashOut.payoutCard = uni.getStorageSync("userId");
        this.$request("/user/getStoreCashOutMoney", "POST", this.info).then((res) => {
          formatAppLog("log", "at pages/personalCenter/showCashOutStore/cashOut/cashOut.vue:131", res);
          if (res.data.code == 200) {
            this.store.money = res.data.data.paymentStore.storeUsableMoney;
            this.store.bossAccount = res.data.data.userAccount;
          }
        }).catch((err) => {
          uni.showToast({
            title: "服务器出错了，请稍后再试",
            icon: "none"
          });
        });
      }
    },
    mounted() {
      this.getStoreMoney();
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
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
              modelValue: $data.cashOut.payOutMoney,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.cashOut.payOutMoney = $event),
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
      ]),
      vue.createElementVNode("view", { class: "cashOutTips" }, [
        vue.createElementVNode("span", null, "最后的可提现金额为，输入的提现金额减去服务费")
      ])
    ]);
  }
  const PagesPersonalCenterShowCashOutStoreCashOutCashOut = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showCashOutStore/cashOut/cashOut.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        userId: "",
        stores: []
      };
    },
    methods: {
      getStoreAuditMoney() {
        var userMsg = uni.getStorageSync("userMsg");
        this.userId = userMsg.userId;
        formatAppLog("log", "at pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue:37", this.userId);
        this.$request("/user/getCashOutStore", "POST", { userId: this.userId }).then((res) => {
          formatAppLog("log", "at pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue:39", res);
          if (res.data.code == 200) {
            formatAppLog("log", "at pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue:41", res.data.data);
            this.stores = res.data.data;
          }
        }).catch((err) => {
          uni.showToast({
            title: "服务器出错，请稍后再试",
            icon: "none"
          });
        });
      }
    },
    mounted() {
      this.getStoreAuditMoney();
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.createElementVNode("view", { class: "mid" }),
              vue.createElementVNode("view", { class: "foot" }, [
                vue.createTextVNode(" 待审核金额: ¥"),
                vue.createElementVNode(
                  "h2",
                  { class: "info" },
                  vue.toDisplayString(item.storeAuditMoney),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "rightContainer" }, [
              vue.createElementVNode("view", { class: "imageContainer" }, [
                vue.createElementVNode("image", {
                  src: item.storeHeadImage,
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
  const PagesPersonalCenterShowAuditStoreMoneyShowAuditStoreMoney = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney.vue"]]);
  const props$2 = {
    props: {
      // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
      offsetTop: {
        type: [String, Number],
        default: 0
      },
      // 自定义导航栏的高度
      customNavHeight: {
        type: [String, Number],
        default: 0
      },
      // 是否禁用吸顶功能
      disabled: {
        type: Boolean,
        default: false
      },
      // 吸顶区域的背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // z-index值
      zIndex: {
        type: [String, Number],
        default: ""
      },
      // 列表中的索引值
      index: {
        type: [String, Number],
        default: ""
      },
      ...(_ra = (_qa = uni.$uv) == null ? void 0 : _qa.props) == null ? void 0 : _ra.sticky
    }
  };
  const _sfc_main$d = {
    name: "uv-sticky",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        cssSticky: false,
        // 是否使用css的sticky实现
        stickyTop: 0,
        // 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
        elId: "",
        left: 0,
        // js模式时，吸顶的内容因为处于postition: fixed模式，为了和原来保持一致的样式，需要记录并重新设置它的left，height，width属性
        width: "auto",
        height: "auto",
        fixed: false
        // js模式时，是否处于吸顶模式
      };
    },
    computed: {
      style() {
        const style = {};
        if (!this.disabled) {
          if (this.cssSticky) {
            style.position = "sticky";
            style.zIndex = this.uZindex;
            style.top = this.$uv.addUnit(this.stickyTop);
          } else {
            style.height = this.fixed ? this.height + "px" : "auto";
          }
        } else {
          style.position = "static";
        }
        style.backgroundColor = this.bgColor;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 吸顶内容的样式
      stickyContent() {
        const style = {};
        if (!this.cssSticky) {
          style.position = this.fixed ? "fixed" : "static";
          style.top = this.stickyTop + "px";
          style.left = this.left + "px";
          style.width = this.width == "auto" ? "auto" : this.width + "px";
          style.zIndex = this.uZindex;
        }
        return style;
      },
      uZindex() {
        return this.zIndex ? this.zIndex : 970;
      }
    },
    created() {
      this.elId = this.$uv.guid();
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getStickyTop();
        this.checkSupportCssSticky();
        if (!this.cssSticky) {
          !this.disabled && this.initObserveContent();
        }
      },
      initObserveContent() {
        this.$uvGetRect("#" + this.elId).then((res) => {
          this.height = res.height;
          this.left = res.left;
          this.width = res.width;
          this.$nextTick(() => {
            this.observeContent();
          });
        });
      },
      observeContent() {
        this.disconnectObserver("contentObserver");
        const contentObserver = uni.createIntersectionObserver({
          // 检测的区间范围
          thresholds: [0.95, 0.98, 1]
        });
        contentObserver.relativeToViewport({
          top: -this.stickyTop
        });
        contentObserver.observe(`#${this.elId}`, (res) => {
          this.setFixed(res.boundingClientRect.top);
        });
        this.contentObserver = contentObserver;
      },
      setFixed(top) {
        const fixed = top <= this.stickyTop;
        this.fixed = fixed;
      },
      disconnectObserver(observerName) {
        const observer = this[observerName];
        observer && observer.disconnect();
      },
      getStickyTop() {
        this.stickyTop = this.$uv.getPx(this.offsetTop) + this.$uv.getPx(this.customNavHeight);
      },
      async checkSupportCssSticky() {
        if (this.$uv.os() === "android" && Number(this.$uv.sys().system) > 8) {
          this.cssSticky = true;
        }
        this.cssSticky = await this.checkComputedStyle();
        if (this.$uv.os() === "ios") {
          this.cssSticky = true;
        }
      },
      // 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
      checkComputedStyle() {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this).select(".uv-sticky").fields({
            computedStyle: ["position"]
          }).exec((e2) => {
            resolve("sticky" === e2[0].position);
          });
        });
      },
      // H5通过创建元素的形式嗅探是否支持css sticky
      // 判断浏览器是否支持sticky属性
      checkCssStickyForH5() {
      }
    },
    unmounted() {
      this.disconnectObserver("contentObserver");
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uv-sticky",
      id: $data.elId,
      style: vue.normalizeStyle([$options.style])
    }, [
      vue.createElementVNode(
        "view",
        {
          style: vue.normalizeStyle([$options.stickyContent]),
          class: "uv-sticky__content"
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        4
        /* STYLE */
      )
    ], 12, ["id"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-0a817f53"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-sticky/components/uv-sticky/uv-sticky.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        info: {
          startTime: "",
          endTime: "",
          storeId: 1
        },
        orderDailyTime: "",
        items: []
      };
    },
    methods: {
      // 接收日期，渲染当天的订单
      getOrderDailyTime() {
        this.info.storeId = uni.getStorageSync("storeId");
        this.orderDailyTime = uni.getStorageSync("orderDailyTime");
        this.info.startTime = uni.getStorageSync("orderDailyTime") + " 00:00:00";
        this.info.endTime = uni.getStorageSync("orderDailyTime") + " 23:59:59";
        this.$request("/storeOrder/getStoreDailyOrder", "POST", this.info).then((res) => {
          formatAppLog("log", "at pages/bill/getDailyOrder/getDailyOrder.vue:46", res);
          if (res.data.data.length == 0) {
            uni.showToast({
              "title": "当天暂无订单",
              "icon": "none"
            });
          } else {
            this.items = res.data.data;
          }
        }).catch((err) => {
          uni.showToast({
            "title": "服务器出错，请稍后再试",
            "icon": "none"
          });
        });
      },
      // 传订单号，跳转页面
      getOrderDetail(orderNumber) {
        const res = orderNumber;
        formatAppLog("log", "at pages/bill/getDailyOrder/getDailyOrder.vue:65", res);
        uni.setStorageSync("orderNumber", res);
        uni.navigateTo({
          url: "/pages/bill/getDailyOrder/orderDetail/orderDetail",
          "animationType": "slide-in-right",
          "animationDuration": 200
        });
      }
    },
    mounted() {
      this.getOrderDailyTime();
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_sticky = resolveEasycom(vue.resolveDynamicComponent("uv-sticky"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      vue.createVNode(_component_uv_sticky, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode(
              "h2",
              { class: "dailyTime" },
              "选择的时间 : " + vue.toDisplayString($data.orderDailyTime),
              1
              /* TEXT */
            )
          ])
        ]),
        _: 1
        /* STABLE */
      }),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.items, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "dailyOrderContainer",
            key: index2,
            onClick: ($event) => $options.getOrderDetail(item.orderNumber)
          }, [
            vue.createElementVNode("view", { class: "left" }, [
              item.orderReback == 0 ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: "orderWay firstLine"
              }, "收款 - 商品")) : vue.createCommentVNode("v-if", true),
              item.orderReback == 1 ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: "orderWay firstLine"
              }, "退款 - 商品")) : vue.createCommentVNode("v-if", true),
              item.orderReback == 0 ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 2,
                class: "orderWay"
              }, "收款")) : vue.createCommentVNode("v-if", true),
              item.orderReback == 1 ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 3,
                class: "orderWay"
              }, "退款")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "span",
                { class: "orderWay" },
                vue.toDisplayString(item.orderCreatetime),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "right" }, [
              item.orderReback == 0 ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 0,
                  class: "orderMoney"
                },
                "+" + vue.toDisplayString(item.orderMoney) + " 元",
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true),
              item.orderReback == 1 ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 1,
                  class: "orderMoney"
                },
                "-" + vue.toDisplayString(item.orderMoney) + " 元",
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ])
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesBillGetDailyOrderGetDailyOrder = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/bill/getDailyOrder/getDailyOrder.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        // 接收后端数据
        order: {},
        // 上传后端数据
        info: {
          storeId: 1,
          orderNumber: ""
        }
      };
    },
    methods: {
      // 获取的订单详细信息
      getOrderInfo() {
        this.info.orderNumber = uni.getStorageSync("orderNumber");
        formatAppLog("log", "at pages/bill/getDailyOrder/orderDetail/orderDetail.vue:59", this.info.orderNumber + "要渲染的订单号");
        this.$request("/storeOrder/getOrderDetail", "POST", this.info).then((res) => {
          formatAppLog("log", "at pages/bill/getDailyOrder/orderDetail/orderDetail.vue:61", res);
          this.order = res.data.data[0];
        }).catch((err) => {
          uni.showToast({
            "title": "服务器出错，请稍后再试",
            "icon": "none"
          });
        });
      }
    },
    mounted() {
      this.getOrderInfo();
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { id: "box" }, [
      vue.createElementVNode("view", { class: "headContainer" }, [
        vue.createElementVNode("view", { class: "header" }, [
          $data.order.orderReback == 0 ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 0,
              class: "orderMoney"
            },
            " +" + vue.toDisplayString($data.order.orderMoney),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          $data.order.orderReback == 1 ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 1,
              class: "orderMoney"
            },
            " -" + vue.toDisplayString($data.order.orderMoney),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          $data.order.orderReback == 1 ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: "orderStatus"
          }, " 退款成功 ")) : vue.createCommentVNode("v-if", true),
          $data.order.orderReback == 0 ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 3,
            class: "orderStatus"
          }, " 交易成功 ")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "span",
            { class: "orderStatus" },
            " 支付方式：" + vue.toDisplayString($data.order.orderPayway),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "infoContainer" }, [
          vue.createElementVNode("view", { class: "left" }, [
            vue.createElementVNode("span", { class: "payTime" }, "支付时间"),
            vue.createElementVNode("span", { class: "orderNumber" }, "订单号")
          ]),
          vue.createElementVNode("view", { class: "right" }, [
            vue.createElementVNode(
              "span",
              { class: "payTime" },
              vue.toDisplayString($data.order.orderCreatetime),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "span",
              { class: "orderNumber" },
              vue.toDisplayString($data.order.orderNumber),
              1
              /* TEXT */
            )
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "foot" })
    ]);
  }
  const PagesBillGetDailyOrderOrderDetailOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/bill/getDailyOrder/orderDetail/orderDetail.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        gouxSta: false,
        Qztime: "",
        QzyzmStare: false,
        Qztext: "获取验证码",
        user: {
          account: "",
          pwd: "",
          code: "",
          nickName: ""
        }
      };
    },
    methods: {
      moutcl() {
        if (this.gouxSta == false) {
          this.gouxSta = true;
        } else {
          this.gouxSta = false;
        }
      },
      regist() {
        if (this.gouxSta == false) {
          uni.showToast({
            "title": "请阅读并勾选用户协议",
            "icon": "none"
          });
        } else {
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
          if (passwordRegex.test(this.user.pwd)) {
            this.$request("/user/register", "POST", this.user).then((res) => {
              formatAppLog("log", "at pages/login/regist/regist.vue:83", res);
              if (res.data.code == 200) {
                uni.showToast({
                  "title": "注册成功",
                  "icon": "none"
                });
                uni.navigateBack();
              } else {
                uni.showToast({
                  "title": res.data.msg,
                  "icon": "none"
                });
              }
            }).catch((err) => {
              uni.showToast({
                "title": "服务器出错，请稍后再试 ",
                "icon": "none"
              });
            });
          } else {
            uni.showToast({
              "title": "密码不符合要求，请重新输入",
              "icon": "none"
            });
          }
        }
      },
      Qzyzm() {
        const rule = /^1[3-9]\d{9}$/;
        if (rule.test(this.user.account)) {
          if (this.QzyzmStare == false) {
            this.Qztime = "60";
            this.Qztext = "s后重新获取";
            this.QzyzmStare = true;
            var interval = setInterval(() => {
              --this.Qztime;
            }, 1e3);
            setTimeout(() => {
              clearInterval(interval);
              this.Qztext = "获取验证码";
              this.Qztime = "";
              this.QzyzmStare = false;
            }, 6e4);
            this.$request("/messageCode/send/" + this.user.account + "/interAspect", "POST", null).then((res) => {
              formatAppLog("log", "at pages/login/regist/regist.vue:131", res);
            }).catch((err) => {
              uni.showToast({
                "title": "服务器出错，请稍后再试 ",
                "icon": "none"
              });
            });
          }
        } else {
          uni.showToast({
            "title": "输入的手机号不规范,请重新输入",
            "icon": "none"
          });
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "login_from" }, [
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "手机号"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "number",
                placeholder: "请输入手机号码",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.user.account = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.user.account]
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "密码"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "text",
                password: "true",
                placeholder: "请输入登录密码",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.user.pwd = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.user.pwd]
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "验证码"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                style: { "width": "40%", "text-align": "left" },
                type: "number",
                maxlength: "6",
                placeholder: "验证码",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.user.code = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.user.code]
            ]),
            vue.createElementVNode(
              "label",
              {
                class: "regFrom_tom_yzlabel",
                style: vue.normalizeStyle({ color: $data.QzyzmStare ? "#cccccc" : "#2ebbfe" }),
                onClick: _cache[3] || (_cache[3] = (...args) => $options.Qzyzm && $options.Qzyzm(...args))
              },
              vue.toDisplayString($data.Qztime) + vue.toDisplayString($data.Qztext),
              5
              /* TEXT, STYLE */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "昵称"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "test",
                placeholder: "请输入昵称",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.user.nickName = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.user.nickName]
            ])
          ])
        ]),
        vue.createElementVNode("span", { class: "pwdTips" }, "密码必须至少包含一个字母、一个数字和一个特殊字符，并且长度在8到16个字符之间。"),
        vue.createElementVNode("view", { class: "login_from_dl" }, [
          vue.createElementVNode("button", {
            onClick: _cache[5] || (_cache[5] = (...args) => $options.regist && $options.regist(...args))
          }, "注册")
        ]),
        vue.createElementVNode("view", { class: "logo_xieyi" }, [
          vue.createElementVNode(
            "label",
            {
              onClick: _cache[6] || (_cache[6] = (...args) => $options.moutcl && $options.moutcl(...args)),
              class: vue.normalizeClass($data.gouxSta ? "cuIcon-squarecheckfill" : "cuIcon-square")
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode("view", { class: "logo_text" }, [
            vue.createTextVNode("请勾选并阅读"),
            vue.createElementVNode("text", null, "《注册协议》"),
            vue.createTextVNode("及"),
            vue.createElementVNode("text", null, "《隐私协议》")
          ])
        ])
      ])
    ]);
  }
  const PagesLoginRegistRegist = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/login/regist/regist.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        gouxSta: false,
        Qztime: "",
        QzyzmStare: false,
        Qztext: "获取验证码"
      };
    },
    methods: {
      Qzyzm() {
        if (this.QzyzmStare == false) {
          this.Qztime = "60";
          this.Qztext = "s后获取";
          this.QzyzmStare = true;
          var interval = setInterval(() => {
            --this.Qztime;
          }, 1e3);
          setTimeout(() => {
            clearInterval(interval);
            this.Qztext = "获取验证码";
            this.Qztime = "";
            this.QzyzmStare = false;
          }, 6e4);
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "login_from" }, [
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "手机号"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.createElementVNode("input", {
              type: "number",
              placeholder: "请输入手机号码"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "login_from_input" }, [
          vue.createElementVNode("view", { class: "login_from_name" }, "验证码"),
          vue.createElementVNode("view", { class: "login_from_fun" }, [
            vue.createElementVNode("input", {
              style: { "width": "40%", "text-align": "left" },
              type: "number",
              maxlength: "6",
              placeholder: "验证码"
            }),
            vue.createElementVNode(
              "label",
              {
                class: "regFrom_tom_yzlabel",
                style: vue.normalizeStyle({ color: $data.QzyzmStare ? "#cccccc" : "#2ebbfe" }),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.Qzyzm && $options.Qzyzm(...args))
              },
              vue.toDisplayString($data.Qztime) + vue.toDisplayString($data.Qztext),
              5
              /* TEXT, STYLE */
            )
          ])
        ])
      ])
    ]);
  }
  const PagesLoginForgetPwdForgetPwd = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/login/forgetPwd/forgetPwd.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        submitBtnState: false,
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        form: {
          auditStoreName: "",
          merchantAddress: "",
          auditStoreNumber: "",
          username: "",
          userId: "",
          userIdCard: "",
          auditStoreHeadImage: "",
          auditStoreIdentifyImage: "",
          auditStoreIdentifyCardFront: "",
          auditStoreIdentifyCardBack: ""
        }
      };
    },
    methods: {
      goToIndex() {
        uni.switchTab({
          url: "/pages/index/index"
          // 请替换为实际的页面路径
        });
      },
      submit() {
        this.submitBtnState = true;
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:93", userMsg);
        this.form.userId = userMsg.userId;
        if (this.form.auditStoreHeadImage != "" && this.form.auditStoreIdentifyImage != "" && this.form.auditStoreIdentifyCardFront != "" && this.form.auditStoreIdentifyCardBack != "") {
          if (this.form.auditStoreName != "") {
            this.$request(
              "/audit/addMerchant",
              "POST",
              this.form
            ).then((res) => {
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:101", res);
              if (res.data.code == 200) {
                this.$refs.notify.success(res.data.msg + ",请前往个人中心查看");
                setInterval(() => {
                  uni.switchTab({
                    url: "/pages/index/index"
                  });
                }, 2e3);
              } else {
                this.submitBtnState = false;
                this.$refs.notify.error("提交失败，请稍后再试");
              }
            }).catch((err) => {
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:115", err);
            });
          } else {
            this.submitBtnState = false;
            this.$refs.notify.error("商铺名不能为空");
          }
        } else {
          this.submitBtnState = false;
          this.$refs.notify.error("请将信息补充完整");
        }
      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1);
      },
      // 新增图片
      async afterRead(event) {
        [].concat(event.file);
        this[`fileList${event.name}`].length;
        this.$refs.form.validate().then((res) => {
          uni.showToast({
            icon: "success",
            title: "校验通过"
          });
        }).catch((errors) => {
          uni.showToast({
            icon: "error",
            title: "校验失败"
          });
        });
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
        for (let i2 = 0; i2 < lists.length; i2++) {
          try {
            const result = await this.uploadFilePromise(lists[i2].url);
            let item = this[`fileList${event.name}`][fileListLen];
            this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
              status: "success",
              message: "",
              url: result.url
              // 假设result包含URL在url属性中
            }));
            fileListLen++;
          } catch (error2) {
            formatAppLog("error", "at pages/index/merchantSettled/merchantSettled.vue:177", "上传失败", error2);
            this.$refs.notify.error("上传失败");
          }
        }
      },
      uploadFilePromise(filePath) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "http://127.0.0.1:8081/ocr/idcard",
            // 示例URL
            filePath,
            name: "multipartFile",
            formData: {
              user: "test"
            },
            success: (res) => {
              let responseData = JSON.parse(res.data);
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:193", responseData);
              if (responseData.code == 200) {
                this.$refs.notify.success(responseData.msg || "未知错误");
                this.form.userName = responseData.data.idName;
                this.form.userIdCard = responseData.data.idNum;
                this.form.auditStoreIdentifyCardFront = responseData.data.idCardFrontUrl;
                resolve(responseData.data);
              } else if (responseData.code == 201) {
                this.$refs.notify.error("请上传正确的身份证信息面");
                this.fileList2.splice(0, this.fileList2.length);
              } else if (responseData.code == 202) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList2.splice(0, this.fileList2.length);
              } else if (responseData.code == 203) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList2.splice(0, this.fileList2.length);
              } else if (responseData.code == 204) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList2.splice(0, this.fileList2.length);
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      },
      // 新增图片
      async afterRead2(event) {
        let lists = [].concat(event.file);
        let fileListLen = this[`fileList${event.name}`].length;
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: "uploading",
            message: "上传中"
          });
        });
        for (let i2 = 0; i2 < lists.length; i2++) {
          try {
            const result = await this.uploadFilePromise2(lists[i2].url);
            let item = this[`fileList${event.name}`][fileListLen];
            this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
              status: "success",
              message: "",
              url: result.url
              // 假设result包含URL在url属性中
            }));
            fileListLen++;
          } catch (error2) {
            formatAppLog("error", "at pages/index/merchantSettled/merchantSettled.vue:247", "上传失败", error2);
            this.$refs.notify.error("上传失败");
          }
        }
      },
      uploadFilePromise2(filePath) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "http://127.0.0.1:8081/ocr/businessLicense",
            // 示例URL
            filePath,
            name: "multipartFile",
            formData: {
              user: "test"
            },
            success: (res) => {
              let responseData = JSON.parse(res.data);
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:263", responseData);
              if (responseData.code == 200) {
                this.form.auditStoreName = responseData.data.businessName;
                this.form.merchantAddress = responseData.data.address;
                this.form.auditStoreNumber = responseData.data.socialCreditCode;
                this.form.auditStoreIdentifyImage = responseData.data.businessUrl;
                resolve(responseData.data);
              } else {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList3.splice(0, this.fileList3.length);
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      },
      // 新增图片
      async afterRead3(event) {
        let lists = [].concat(event.file);
        let fileListLen = this[`fileList${event.name}`].length;
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: "uploading",
            message: "上传中"
          });
        });
        for (let i2 = 0; i2 < lists.length; i2++) {
          try {
            const result = await this.uploadFilePromise3(lists[i2].url);
            let item = this[`fileList${event.name}`][fileListLen];
            this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
              status: "success",
              message: "",
              url: result.url
              // 假设result包含URL在url属性中
            }));
            fileListLen++;
          } catch (error2) {
            formatAppLog("error", "at pages/index/merchantSettled/merchantSettled.vue:305", "上传失败", error2);
            this.$refs.notify.error("上传失败");
          }
        }
      },
      uploadFilePromise3(filePath) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "http://127.0.0.1:8081/ocr/uploadMerchant",
            // 示例URL
            filePath,
            name: "multipartFile",
            formData: {
              user: "test"
            },
            success: (res) => {
              let responseData = JSON.parse(res.data);
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:321", responseData);
              if (responseData.code == 200) {
                this.form.auditStoreHeadImage = responseData.data.storeHeadImageUrl;
                resolve(responseData.data);
              } else {
                this.fileList4.splice(0, this.fileList4.length);
                this.$refs.notify.error(responseData.msg || "未知错误");
                reject(new Error(responseData.msg || "上传失败"));
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      },
      // 区分正反面
      async afterRead4(event) {
        let lists = [].concat(event.file);
        let fileListLen = this[`fileList${event.name}`].length;
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: "uploading",
            message: "上传中"
          });
        });
        for (let i2 = 0; i2 < lists.length; i2++) {
          try {
            const result = await this.uploadFilePromise4(lists[i2].url);
            let item = this[`fileList${event.name}`][fileListLen];
            this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
              status: "success",
              message: "",
              url: result.url
              // 假设result包含URL在url属性中
            }));
            fileListLen++;
          } catch (error2) {
            formatAppLog("error", "at pages/index/merchantSettled/merchantSettled.vue:363", "上传失败", error2);
            this.$refs.notify.error("上传失败");
          }
        }
      },
      uploadFilePromise4(filePath) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "http://127.0.0.1:8081/ocr/idcard",
            // 示例URL
            filePath,
            name: "multipartFile",
            formData: {
              user: "test"
            },
            success: (res) => {
              let responseData = JSON.parse(res.data);
              formatAppLog("log", "at pages/index/merchantSettled/merchantSettled.vue:379", responseData);
              if (responseData.code == 200) {
                this.$refs.notify.error("请上传正确的身份证国徽面");
                this.fileList1.splice(0, this.fileList1.length);
              } else if (responseData.code == 201) {
                this.form.auditStoreIdentifyCardBack = responseData.data.idCardBackUrl;
                this.idCardBack = true;
                this.$refs.notify.success(responseData.msg || "未知错误");
                resolve(responseData.data);
              } else if (responseData.code == 202) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList1.splice(0, this.fileList1.length);
              } else if (responseData.code == 203) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList1.splice(0, this.fileList1.length);
              } else if (responseData.code == 204) {
                this.$refs.notify.error(responseData.msg || "未知错误");
                this.fileList1.splice(0, this.fileList1.length);
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      }
      // async blobUrlToFile(blobUrl) {
      // 	try {
      // 		// 使用 fetch 获取 Blob 对象
      // 		const response = await fetch(blobUrl);
      // 		const blob = await response.blob();
      // 		// 创建文件对象
      // 		const file = new File([blob], 'filename.png', {
      // 			type: blob.type
      // 		});
      // 		// 返回文件对象
      // 		return file;
      // 	} catch (error) {
      // 		__f__('error','at pages/index/merchantSettled/merchantSettled.vue:423','转换 Blob URL 到文件时出错:', error);
      // 		throw error;
      // 	}
      // },
      // async processBlobUrls(blobUrls) {
      // 	try {
      // 		const files = [];
      // 		// 遍历数组中的每个 Blob URL，并转换为文件对象
      // 		for (const blobUrl of blobUrls) {
      // 			const file = await this.blobUrlToFile(blobUrl);
      // 			files.push(file);
      // 		}
      // 		// 返回文件对象数组
      // 		return files;
      // 	} catch (error) {
      // 		__f__('error','at pages/index/merchantSettled/merchantSettled.vue:440','处理 Blob URL 数组时出错:', error);
      // 		throw error;
      // 	}
      // },
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_upload = resolveEasycom(vue.resolveDynamicComponent("uv-upload"), __easycom_2$1);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_3);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    const _component_uv_notify = resolveEasycom(vue.resolveDynamicComponent("uv-notify"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_uv_navbar, {
            title: "商家入驻",
            onLeftClick: $options.goToIndex
          }, null, 8, ["onLeftClick"])
        ]),
        vue.createElementVNode("view", { style: { "margin-top": "80rpx", "width": "700rpx", "height": "10rpx" } }),
        vue.createElementVNode("view", { class: "formInfo" }, [
          vue.createVNode(_component_uv_form, {
            model: $data.form,
            ref: "form"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_input, {
                placeholder: "商铺基本信息",
                border: "bottom",
                disabled: true
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "店铺图片",
                prop: "pics",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_upload, {
                    fileList: $data.fileList4,
                    name: "4",
                    multiple: "",
                    maxCount: 1,
                    onAfterRead: $options.afterRead3,
                    onDelete: $options.deletePic,
                    style: { "margin-left": "50rpx" }
                  }, null, 8, ["fileList", "onAfterRead", "onDelete"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "营业执照",
                prop: "pics",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_upload, {
                    fileList: $data.fileList3,
                    name: "3",
                    multiple: "",
                    maxCount: 1,
                    onAfterRead: $options.afterRead2,
                    onDelete: $options.deletePic,
                    style: { "margin-left": "50rpx" }
                  }, null, 8, ["fileList", "onAfterRead", "onDelete"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "店铺名称",
                prop: "auditStoreName",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.form.auditStoreName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.auditStoreName = $event),
                    placeholder: "请输入店铺名称",
                    clearable: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "详细地址",
                prop: "merchantAddress",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.form.merchantAddress,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.merchantAddress = $event),
                    placeholder: "请输入详细地址",
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "信用代码",
                prop: "auditStoreNumber",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.form.auditStoreNumber,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.auditStoreNumber = $event),
                    placeholder: "请输入信用代码",
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_input, {
                placeholder: "负责人信息",
                border: "bottom",
                disabled: true
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "身份证国徽面",
                prop: "pics",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_upload, {
                    fileList: $data.fileList1,
                    name: "1",
                    multiple: "",
                    maxCount: 1,
                    onAfterRead: $options.afterRead4,
                    onDelete: $options.deletePic,
                    style: { "margin-left": "50rpx" }
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("image", {
                        src: "/static/index/merchantSettled/opposite.png",
                        mode: "widthFix",
                        style: { "width": "230px", "height": "150px" }
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["fileList", "onAfterRead", "onDelete"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "身份证信息面",
                prop: "pics",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_upload, {
                    fileList: $data.fileList2,
                    name: "2",
                    multiple: "",
                    maxCount: 1,
                    onAfterRead: $options.afterRead,
                    onDelete: $options.deletePic,
                    style: { "margin-left": "50rpx" }
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("image", {
                        src: "/static/index/merchantSettled/positive.png",
                        mode: "widthFix",
                        style: { "width": "230px", "height": "150px" }
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["fileList", "onAfterRead", "onDelete"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "负责人姓名",
                prop: "userName",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.form.userName,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.userName = $event),
                    placeholder: "请输入负责人姓名",
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "负责人身份证",
                prop: "userIdCard",
                "label-width": "180rpx"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.form.userIdCard,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.form.userIdCard = $event),
                    placeholder: "请输入负责人身份证",
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model"]),
          vue.createVNode(_component_uv_button, {
            onClick: $options.submit,
            disabled: $data.submitBtnState,
            type: "primary",
            customStyle: "margin-top: 10px"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("提交")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick", "disabled"]),
          vue.createCommentVNode(' <uv-button type="error" text="重置" customStyle="margin-top: 10px"></uv-button> '),
          vue.createVNode(
            _component_uv_notify,
            { ref: "notify" },
            null,
            512
            /* NEED_PATCH */
          )
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndexMerchantSettledMerchantSettled = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/merchantSettled/merchantSettled.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        orderList: []
      };
    },
    methods: {
      goToIndex() {
        uni.switchTab({
          url: "/pages/index/index"
          // 请替换为实际的页面路径
        });
      },
      change() {
      },
      getOrder() {
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/index/trade/trade.vue:69", userMsg);
        var userId = userMsg.userId;
        this.$request(
          "/form/allOrder",
          "POST",
          {
            storeId: this.storeId,
            userId
          }
        ).then((res) => {
          formatAppLog("log", "at pages/index/trade/trade.vue:78", "orderList", res);
          if (res.data.code == 200) {
            this.orderList = res.data.data;
          }
        });
      }
    },
    mounted() {
      this.getOrder();
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_list_item = resolveEasycom(vue.resolveDynamicComponent("uv-list-item"), __easycom_1$a);
    const _component_uv_list = resolveEasycom(vue.resolveDynamicComponent("uv-list"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_navbar, {
          title: "最新交易",
          onLeftClick: $options.goToIndex
        }, null, 8, ["onLeftClick"])
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "20%" } }),
      vue.createCommentVNode(' <view style="margin-top: 80rpx;width: 780rpx;height: 10rpx;"></view>\r\n		<view class="tradebar">\r\n			<view class="tradebar-container">\r\n				<view style="width: 150rpx;">\r\n					<uv-input placeholder="2024-4-10" border="surround" v-model="value" @change="change" :disabled="true"\r\n						style="width: 150rpx;"></uv-input>\r\n				</view>\r\n				<text>日交易</text>\r\n			</view>\r\n			<view class="tradebar-info">\r\n				<text>收入:￥7823.00.00</text>\r\n			</view>\r\n		</view> '),
      vue.createVNode(_component_uv_list, null, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.orderList, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", null, [
                item.orderPayway == "支付宝" && item.orderReback == 0 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                  key: 0,
                  title: "支付成功",
                  note: item.orderCreatetime,
                  thumb: "/static/icon/alipay.png",
                  "thumb-size": "lg",
                  rightText: item.orderMoney.toString(),
                  customStyle: { borderBottom: "1px solid #F2F2F2" }
                }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                item.orderPayway == "支付宝" && item.orderReback == 1 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                  key: 1,
                  title: "退款成功",
                  note: item.orderCreatetime,
                  thumb: "/static/icon/alipay.png",
                  "thumb-size": "lg",
                  rightText: item.orderMoney.toString(),
                  customStyle: { borderBottom: "1px solid #F2F2F2" }
                }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                item.orderPayway == "微信" && item.orderReback == 0 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                  key: 2,
                  title: "支付成功",
                  note: item.orderCreatetime,
                  thumb: "/static/icon/wechat.png",
                  "thumb-size": "lg",
                  rightText: item.orderMoney.toString(),
                  customStyle: { borderBottom: "1px solid #F2F2F2" }
                }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true),
                item.orderPayway == "微信" && item.orderReback == 1 ? (vue.openBlock(), vue.createBlock(_component_uv_list_item, {
                  key: 3,
                  title: "退款成功",
                  note: item.orderCreatetime,
                  thumb: "/static/icon/wechat.png",
                  "thumb-size": "lg",
                  rightText: item.orderMoney.toString(),
                  customStyle: { borderBottom: "1px solid #F2F2F2" }
                }, null, 8, ["note", "rightText"])) : vue.createCommentVNode("v-if", true)
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          vue.createCommentVNode(' <uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/wechat.png" thumb-size="lg"\r\n				rightText="27.00" custom-style="border-bottom:1px solid #F2F2F2">\r\n			</uv-list-item>\r\n			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"\r\n				rightText="120.00" custom-style="border-bottom:1px solid #F2F2F2">\r\n			</uv-list-item>\r\n			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"\r\n				rightText="130.00" custom-style="border-bottom:1px solid #F2F2F2">\r\n			</uv-list-item> ')
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesIndexTradeTrade = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-a7d4cce9"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/trade/trade.vue"]]);
  const props$1 = {
    props: {
      // 是否虚线
      dashed: {
        type: Boolean,
        default: false
      },
      // 是否细线
      hairline: {
        type: Boolean,
        default: true
      },
      // 是否以点替代文字，优先于text字段起作用
      dot: {
        type: Boolean,
        default: false
      },
      // 内容文本的位置，left-左边，center-中间，right-右边
      textPosition: {
        type: String,
        default: "center"
      },
      // 文本内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 文本大小
      textSize: {
        type: [String, Number],
        default: 14
      },
      // 文本颜色
      textColor: {
        type: String,
        default: "#909399"
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: "#dcdfe6"
      },
      ...(_ta = (_sa = uni.$uv) == null ? void 0 : _sa.props) == null ? void 0 : _ta.divider
    }
  };
  const _sfc_main$6 = {
    name: "uv-divider",
    mixins: [mpMixin, mixin, props$1],
    emits: ["click"],
    computed: {
      textStyle() {
        const style = {};
        style.fontSize = this.$uv.addUnit(this.textSize);
        style.color = this.textColor;
        return style;
      },
      // 左边线条的的样式
      leftLineStyle() {
        const style = {};
        if (this.textPosition === "left") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      },
      // 右边线条的的样式
      rightLineStyle() {
        const style = {};
        if (this.textPosition === "right") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      }
    },
    methods: {
      // divider组件被点击时触发
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-divider",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.leftLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"]),
        _ctx.dot ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "uv-divider__dot"
        }, "●")) : _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-divider__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.rightLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-222d1a38"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-divider/components/uv-divider/uv-divider.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {
      goToIndex() {
        uni.switchTab({
          url: "/pages/index/index"
          // 请替换为实际的页面路径
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_navbar, {
          title: "异常订单",
          onLeftClick: $options.goToIndex
        }, null, 8, ["onLeftClick"])
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "80rpx", "width": "700rpx", "height": "10rpx" } }),
      vue.createElementVNode("view", { class: "unusualOrderbar" }, [
        vue.createElementVNode("view", { class: "unusualOrder-info" }, [
          vue.createElementVNode("view", { class: "unusualOrder-info1" }, [
            vue.createVNode(_component_uv_icon, {
              name: "order",
              size: "50rpx",
              color: "#E47470"
            }),
            vue.createElementVNode("text", null, "退款信息")
          ]),
          vue.createVNode(_component_uv_divider),
          vue.createElementVNode("view", { class: "unusualOrder-info2" }, [
            vue.createElementVNode("text", null, "服务单号"),
            vue.createElementVNode("text", null, "12837192379312")
          ]),
          vue.createElementVNode("view", { class: "unusualOrder-info2" }, [
            vue.createElementVNode("text", null, "申请时间"),
            vue.createElementVNode("text", null, "2024-4-10 23:03:32")
          ]),
          vue.createElementVNode("view", { class: "unusualOrder-info2" }, [
            vue.createElementVNode("text", null, "退款金额"),
            vue.createElementVNode("text", null, "￥28.00")
          ]),
          vue.createElementVNode("view", { class: "unusualOrder-button" }, [
            vue.createVNode(_component_uv_button, {
              type: "error",
              shape: "circle",
              text: "拒绝",
              size: "small"
            }),
            vue.createVNode(_component_uv_button, {
              type: "primary",
              shape: "circle",
              text: "同意退款",
              size: "small"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesIndexUnusualOrdersUnusualOrders = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/unusualOrders/unusualOrders.vue"]]);
  const props = {
    props: {
      // 头像图片路径(不能为相对路径)
      src: {
        type: String,
        default: ""
      },
      // 头像形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "circle"
      },
      // 头像尺寸
      size: {
        type: [String, Number],
        default: 40
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "scaleToFill"
      },
      // 显示的文字
      text: {
        type: String,
        default: ""
      },
      // 背景色
      bgColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#fff"
      },
      // 文字大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 显示的图标
      icon: {
        type: String,
        default: ""
      },
      // 显示小程序头像，只对百度，微信，QQ小程序有效
      mpAvatar: {
        type: Boolean,
        default: false
      },
      // 是否使用随机背景色
      randomBgColor: {
        type: Boolean,
        default: false
      },
      // 加载失败的默认头像(组件有内置默认图片)
      defaultUrl: {
        type: String,
        default: ""
      },
      // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
      colorIndex: {
        type: [String, Number],
        // 校验参数规则，索引在0-19之间
        validator(n2) {
          return range$2(n2, [0, 19]) || n2 === "";
        },
        default: ""
      },
      // 组件标识符
      name: {
        type: String,
        default: ""
      },
      ...(_va = (_ua = uni.$uv) == null ? void 0 : _ua.props) == null ? void 0 : _va.avatar
    }
  };
  const base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$4 = {
    name: "uv-avatar",
    emits: ["click"],
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        // 如果配置randomBgColor参数为true，在图标或者文字的模式下，会随机从中取出一个颜色值当做背景色
        colors: [
          "#ffb34b",
          "#f2bba9",
          "#f7a196",
          "#f18080",
          "#88a867",
          "#bfbf39",
          "#89c152",
          "#94d554",
          "#f19ec2",
          "#afaae4",
          "#e1b0df",
          "#c38cc1",
          "#72dcdc",
          "#9acdcb",
          "#77b1cc",
          "#448aca",
          "#86cefa",
          "#98d1ee",
          "#73d1f1",
          "#80a7dc"
        ],
        avatarUrl: this.src,
        allowMp: false
      };
    },
    watch: {
      // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
      // 而组件内部不能直接修改props的值，所以需要一个中间变量
      src: {
        immediate: true,
        handler(newVal) {
          this.avatarUrl = newVal;
          if (!newVal) {
            this.errorHandler();
          }
        }
      }
    },
    computed: {
      imageStyle() {
        const style = {};
        return style;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.src.indexOf("/") !== -1;
      },
      // 图片加载时失败时触发
      errorHandler() {
        this.avatarUrl = this.defaultUrl || base64Avatar;
      },
      clickHandler() {
        this.$emit("click", this.name);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$c);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-avatar", [`uv-avatar--${_ctx.shape}`]]),
        style: vue.normalizeStyle([{
          backgroundColor: _ctx.text || _ctx.icon ? _ctx.randomBgColor ? $data.colors[_ctx.colorIndex !== "" ? _ctx.colorIndex : _ctx.$uv.random(0, 19)] : _ctx.bgColor : "transparent",
          width: _ctx.$uv.addUnit(_ctx.size),
          height: _ctx.$uv.addUnit(_ctx.size)
        }, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _ctx.mpAvatar && $data.allowMp ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [],
            64
            /* STABLE_FRAGMENT */
          )) : _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: _ctx.icon,
            size: _ctx.fontSize,
            color: _ctx.color
          }, null, 8, ["name", "size", "color"])) : _ctx.text ? (vue.openBlock(), vue.createBlock(_component_uv_text, {
            key: 2,
            text: _ctx.text,
            size: _ctx.fontSize,
            color: _ctx.color,
            align: "center",
            customStyle: "justify-content: center"
          }, null, 8, ["text", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 3,
            class: vue.normalizeClass(["uv-avatar__image", [`uv-avatar__image--${_ctx.shape}`]]),
            src: $data.avatarUrl || _ctx.defaultUrl,
            mode: _ctx.mode,
            onError: _cache[0] || (_cache[0] = (...args) => $options.errorHandler && $options.errorHandler(...args)),
            style: vue.normalizeStyle([{
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size)
            }])
          }, null, 46, ["src", "mode"]))
        ], true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-fa9b0ca7"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        value: "0.0"
      };
    },
    methods: {
      goToIndex() {
        uni.switchTab({
          url: "/pages/index/index"
          // 请替换为实际的页面路径
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_avatar = resolveEasycom(vue.resolveDynamicComponent("uv-avatar"), __easycom_1);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_navbar, {
          title: "支付",
          onLeftClick: $options.goToIndex
        }, null, 8, ["onLeftClick"])
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "80rpx", "width": "780rpx", "height": "10rpx" } }),
      vue.createElementVNode("view", { class: "paybar" }, [
        vue.createElementVNode("view", { class: "paybar-image" }, [
          vue.createVNode(_component_uv_avatar, {
            src: "https://via.placeholder.com/200x200.png/2878ff",
            shape: "circle",
            size: "80"
          }),
          vue.createElementVNode("text", { style: { "margin-top": "30rpx" } }, "超级无敌暴龙神")
        ]),
        vue.createElementVNode("view", { class: "paybar-info" }, [
          vue.createElementVNode("text", { style: { "margin-left": "25rpx" } }, "金额 (元)"),
          vue.createElementVNode("view", { class: "paybar-money" }, [
            vue.createVNode(_component_uv_input, {
              modelValue: $data.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
              border: "bottom",
              "font-size": "50",
              "custom-style": "height:115rpx",
              color: "#C8C7CD"
            }, null, 8, ["modelValue"])
          ]),
          vue.createVNode(_component_uv_input, {
            placeholder: "添加备注(20字内)",
            border: "none",
            "font-size": "18"
          })
        ]),
        vue.createElementVNode("view", { class: "paybar-button" }, [
          vue.createVNode(_component_uv_button, {
            type: "error",
            size: "large",
            text: "付款"
          })
        ])
      ])
    ]);
  }
  const PagesIndexPayPay = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/index/pay/pay.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        content: "",
        list: [],
        top: 0
      };
    },
    onLoad(options) {
      uni.setNavigationBarTitle({
        title: options.name
      });
      this._friendAvatar = options.avatar;
      this._selfAvatar = "/static/avatar/avatar5.jpeg";
      this.list = [
        {
          content: "对方历史回复消息",
          userType: "friend",
          avatar: this._friendAvatar
        },
        {
          content: "历史消息",
          userType: "self",
          avatar: this._selfAvatar
        }
      ];
    },
    methods: {
      send() {
        this.list.push({
          content: this.content,
          userType: "self",
          avatar: this._selfAvatar
        });
        this.content = "";
        this.scrollToBottom();
        setTimeout(() => {
          this.list.push({
            content: "周末什么安排",
            userType: "friend",
            avatar: this._friendAvatar
          });
          this.scrollToBottom();
        }, 1500);
      },
      chooseImage() {
        uni.chooseImage({
          // sourceType: 'album',
          success: (res) => {
            this.list.push({
              content: res.tempFilePaths[0],
              userType: "self",
              messageType: "image",
              avatar: this._selfAvatar
            });
            this.scrollToBottom();
            setTimeout(() => {
              this.list.push({
                content: "你好呀，朋友~",
                userType: "friend",
                avatar: this._friendAvatar
              });
              this.scrollToBottom();
            }, 1500);
          }
        });
      },
      scrollToBottom() {
        this.top = this.list.length * 1e3;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("scroll-view", {
        class: "scroll-view",
        "scroll-y": "",
        "scroll-with-animation": "",
        "scroll-top": $data.top
      }, [
        vue.createElementVNode("view", { style: { "padding": "30rpx 30rpx 240rpx" } }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.list, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["message", [item.userType]]),
                  key: index2
                },
                [
                  item.userType === "friend" ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: item.avatar,
                    class: "avatar",
                    mode: "widthFix"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  item.messageType === "image" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "content"
                  }, [
                    vue.createElementVNode("image", {
                      src: item.content,
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ])) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 2,
                      class: "content"
                    },
                    vue.toDisplayString(item.content),
                    1
                    /* TEXT */
                  )),
                  item.userType === "self" ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 3,
                    src: item.avatar,
                    class: "avatar",
                    mode: "widthFix"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ], 8, ["scroll-top"]),
      vue.createElementVNode("view", { class: "tool" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.content = $event),
            class: "input",
            onConfirm: _cache[1] || (_cache[1] = (...args) => $options.send && $options.send(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.content]
        ]),
        vue.createElementVNode("image", {
          src: "/static/photo.png",
          mode: "widthFix",
          class: "thumb",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.chooseImage && $options.chooseImage(...args))
        })
      ])
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-4c1b26cf"], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/message/message.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        showPage: false,
        info: {
          userName: "",
          userIdCard: "",
          userId: ""
        },
        goToPersonalCenter() {
          uni.switchTab({
            url: "/pages/personalCenter/personalCenter"
            // 请替换为实际的页面路径
          });
        }
      };
    },
    mounted() {
      var userMsg = uni.getStorageSync("userMsg");
      var userIsAuthentication = userMsg.userIsAuthentication;
      if (userIsAuthentication === 0) {
        this.showPage = true;
      } else {
        this.showPage = false;
      }
    },
    methods: {
      submit() {
        formatAppLog("log", "at pages/identify/identify.vue:49", this.info);
        var userMsg = uni.getStorageSync("userMsg");
        formatAppLog("log", "at pages/identify/identify.vue:52", userMsg);
        this.info.userId = userMsg.userId;
        this.$request(
          "/ocr/certification",
          "POST",
          this.info
        ).then((res) => {
          if (res.data.code == 200) {
            userMsg.userIsAuthentication = 1;
            uni.setStorageSync("userMsg", userMsg);
            uni.showToast({
              title: "验证成功!"
            });
            uni.switchTab({
              url: "/pages/personalCenter/personalCenter"
            });
          } else {
            uni.showToast({
              title: "验证失败!",
              icon: "error"
            });
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$9);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_1$2);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_2$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_navbar, {
          title: "实名认证",
          onLeftClick: _cache[0] || (_cache[0] = ($event) => $data.goToPersonalCenter())
        })
      ]),
      $data.showPage ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createElementVNode("view", { style: { "margin-top": "150rpx", "width": "780rpx", "height": "10rpx" } }),
        vue.createVNode(_component_uv_input, {
          placeholder: "请输入姓名",
          border: "bottom",
          modelValue: $data.info.userName,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.info.userName = $event)
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_uv_input, {
          placeholder: "请输入身份证",
          border: "bottom",
          modelValue: $data.info.userIdCard,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.info.userIdCard = $event),
          style: { "margin-top": "50rpx" }
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_uv_button, {
          onClick: $options.submit,
          type: "error",
          text: "提交",
          style: { "margin": "auto", "margin-top": "50rpx", "width": "80%" }
        }, null, 8, ["onClick"])
      ])) : vue.createCommentVNode("v-if", true),
      !$data.showPage ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: { "margin-top": "300rpx" }
      }, [
        vue.createElementVNode("h3", { style: { "margin-left": "25%" } }, "您已经实名认证过了哦！")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIdentifyIdentify = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/HBuilderX/aggregated payment/payment-app/pages/identify/identify.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
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
  __definePage("pages/personalCenter/chatWindow/chatWindow", PagesPersonalCenterChatWindowChatWindow);
  __definePage("pages/personalCenter/showCashOutStore/showCashOutStore", PagesPersonalCenterShowCashOutStoreShowCashOutStore);
  __definePage("pages/personalCenter/showCashOutStore/cashOut/cashOut", PagesPersonalCenterShowCashOutStoreCashOutCashOut);
  __definePage("pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney", PagesPersonalCenterShowAuditStoreMoneyShowAuditStoreMoney);
  __definePage("pages/bill/getDailyOrder/getDailyOrder", PagesBillGetDailyOrderGetDailyOrder);
  __definePage("pages/bill/getDailyOrder/orderDetail/orderDetail", PagesBillGetDailyOrderOrderDetailOrderDetail);
  __definePage("pages/login/regist/regist", PagesLoginRegistRegist);
  __definePage("pages/login/forgetPwd/forgetPwd", PagesLoginForgetPwdForgetPwd);
  __definePage("pages/index/merchantSettled/merchantSettled", PagesIndexMerchantSettledMerchantSettled);
  __definePage("pages/index/trade/trade", PagesIndexTradeTrade);
  __definePage("pages/index/unusualOrders/unusualOrders", PagesIndexUnusualOrdersUnusualOrders);
  __definePage("pages/index/pay/pay", PagesIndexPayPay);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/identify/identify", PagesIdentifyIdentify);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "退出了");
      var now = Date.now();
      var expiredTime = now + 30 * 1e4;
      uni.setStorageSync("userMsgExpiredTime", expiredTime);
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HBuilderX/aggregated payment/payment-app/App.vue"]]);
  const baseUrl = "https://payproject.mynatapp.cc";
  const request = (url2, method2, data) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + url2,
        //拼接请求路径
        data,
        method: method2,
        header: {
          "content-type": "application/json"
          //token: uni.getStorageSync('token')!= null ? uni.getStorageSync('token'): ''//请求头发送token，可选
        },
        success: (res) => {
          resolve(res);
        },
        fail: (error2) => {
          reject(error2);
        }
      });
    });
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.config.globalProperties.$request = request;
    app.config.globalProperties.$request = request;
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
