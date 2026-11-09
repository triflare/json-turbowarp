export function jsonLength({ json }) {
  try {
    return Object.keys(JSON.parse(json)).length;
  } catch {
    return " ";
  }
}

export function get({ item, json }) {
  try {
    json = JSON.parse(json);
    if (this._hasOwn(json, item)) {
      const result = json[item] ?? "";
      if (typeof result === "object") {
        return JSON.stringify(result);
      }
      return result;
    }
  } catch {
    // ignore
  }
  return "";
}

export function set({ item, value, json }) {
  try {
    json = JSON.parse(json);
    value = this._fixValue(this._validReturn(value));
    json[item] = value;
    return JSON.stringify(json);
  } catch {
    return "";
  }
}

// Published as the "delete" block; `delete` is not a legal function name.
export function deleteKey({ item, json }) {
  try {
    json = JSON.parse(json);
    delete json[item];
    return JSON.stringify(json);
  } catch {
    return "";
  }
}
