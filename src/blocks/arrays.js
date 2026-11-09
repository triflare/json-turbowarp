export function length({ json }) {
  try {
    return Object.keys(JSON.parse(json)).length;
  } catch {
    return " ";
  }
}

export function arrayGet({ item, json }) {
  // 1...length : array content, -1...-length : reverse array content, 0 : ERROR
  try {
    item = Scratch.Cast.toNumber(item);
    if (item == 0) return "";
    if (item > 0) {
      item--;
    }
    json = JSON.parse(json);
    let result;
    if (item >= 0) {
      result = json[item];
    } else {
      const arrayLength = Scratch.Cast.toNumber(json.length);
      result = json[arrayLength + item];
    }
    result = result ?? "";
    if (typeof result == "object") {
      return JSON.stringify(result);
    }
    return result;
  } catch {
    return "";
  }
}

export function arrayItemNumber({ item, json }) {
  try {
    json = JSON.parse(json);
    item = this._fixValue(this._validReturn(item));
    return JSON.stringify(json.indexOf(item) + 1);
  } catch {
    return "";
  }
}

export function arrayFrom({ json }) {
  try {
    return JSON.stringify(Array.from(Scratch.Cast.toString(json)));
  } catch {
    return "";
  }
}

export function arrayConcat({ json, json2 }) {
  try {
    json = JSON.parse(json);
    json2 = JSON.parse(json2);
    return JSON.stringify(json.concat(json2));
  } catch {
    return "";
  }
}

export function arrayPush({ item, json }) {
  try {
    json = JSON.parse(json);
    item = this._fixValue(this._validReturn(item));
    json.push(item);
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arrayInsert({ item, pos, json }) {
  try {
    json = JSON.parse(json);
    item = this._fixValue(this._validReturn(item));
    json.splice(pos - 1, 0, item);
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arraySet({ item, pos, json }) {
  try {
    json = JSON.parse(json);
    json[pos - 1] = this._fixValue(this._validReturn(item));
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arrayDelete({ item, json }) {
  try {
    json = JSON.parse(json);
    json.splice(item - 1, 1);
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arrayRemoveAll({ item, json }) {
  try {
    json = JSON.parse(json);
    item = this._fixValue(this._validReturn(item));
    let i = 0;
    while (i < json.length) {
      if (json[i] === item) {
        json.splice(i, 1);
      } else {
        ++i;
      }
    }
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arrayFromTo({ json, item, item2 }) {
  try {
    return JSON.stringify(JSON.parse(json).slice(item - 1, item2));
  } catch {
    return "";
  }
}

export function arrayReverse({ json }) {
  try {
    return JSON.stringify(JSON.parse(json).reverse());
  } catch {
    return "";
  }
}

export function arrayFlat({ json, depth }) {
  try {
    return JSON.stringify(JSON.parse(json).flat(depth));
  } catch {
    return "";
  }
}

export function arrayCreate({ text, d }) {
  return JSON.stringify(Scratch.Cast.toString(text).split(d));
}

export function arrayJoin({ json, d }) {
  try {
    return JSON.parse(json).join(d);
  } catch {
    return "";
  }
}

export function arrayFilter({ key, json }) {
  try {
    json = JSON.parse(json);
    return JSON.stringify(
      json.map((x) => {
        if (this._hasOwn(x, key)) {
          return x[key];
        }
        return null;
      }),
    );
  } catch {
    return "";
  }
}

export function arraySetLength({ json, len }) {
  try {
    json = JSON.parse(json);
    json.length = len;
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

export function arraySort(args) {
  let list;
  try {
    list = JSON.parse(args.list);
  } catch {
    return "";
  }
  if (!Array.isArray(list)) {
    return "";
  }
  list.sort(Scratch.Cast.compare);
  if (args.order === "descending") list.reverse();
  return JSON.stringify(list);
}

export function arrayAnalysis(args) {
  let list;
  try {
    list = JSON.parse(args.list);
  } catch {
    return 0;
  }
  if (!Array.isArray(list)) {
    return 0;
  }
  list = list.map(Scratch.Cast.toNumber);
  const listLength = list.length;
  switch (Scratch.Cast.toString(args.analysis)) {
    case "maximum": {
      let max = -Infinity;
      for (let i = 0; i < list.length; i++)
        if (list[i] > max) max = list[i];
      return max;
    }
    case "minimum": {
      let min = Infinity;
      for (let i = 0; i < list.length; i++)
        if (list[i] < min) min = list[i];
      return min;
    }
    case "sum":
      return list.reduce((a, b) => a + b, 0);
    case "average":
      return list.reduce((a, b) => a + b, 0) / listLength;
    case "median": {
      const list2 = list.sort(Scratch.Cast.compare);
      const list2Length = list2.length;
      const c = Math.floor(list2Length / 2);
      const e = list2Length % 2 === 0;
      if (e) return (list2[c - 1] + list2[c]) / 2;
      return list2[c];
    }
    case "mode": {
      const freqMap = new Map(),
        mode = [0, 0]; // current mode, max
      for (
        let i = 0, num = list[0], count = null;
        i < listLength;
        i++, num = list[i], count = freqMap.get(num)
      ) {
        count ||= 1;
        if (freqMap.has(num)) ++count;
        if (count > mode[1]) ((mode[0] = num), (mode[1] = count));
        freqMap.set(num, count);
      }
      return mode[0];
    }
    case "variance": {
      const average = list.reduce((a, b) => a + b, 0) / listLength;
      const list2 = list.map((a) => (a - average) ** 2);
      return list2.reduce((a, b) => a + b, 0) / listLength;
    }
  }
  return 0;
}
