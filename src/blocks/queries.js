export function hasKey({ json, key }) {
  try {
    return this._fixValue(this._validReturn(key)) in JSON.parse(json);
  } catch {
    return false;
  }
}

export function hasValue({ json, value }) {
  try {
    json = JSON.parse(json);
    value = this._validReturn(value);
    return json.includes(value);
  } catch {
    return false;
  }
}

export function equal({ json1, equal, json2 }) {
  try {
    json1 = JSON.parse(json1);
    json2 = JSON.parse(json2);

    const keys1 = Object.keys(json1);
    const keys2 = Object.keys(json2);
    const result =
      keys1.length === keys2.length &&
      Object.keys(json1).every((key) => json1[key] === json2[key]);
    if (equal === "=") return result;
    if (equal === "≠") return !result;
  } catch {
    // ignore
  }
  return false;
}
