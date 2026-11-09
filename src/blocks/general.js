export function isValid({ json }) {
  return this._isValid(json);
}

export function is({ json, types }) {
  if (!this._isValid(json)) return false;
  try {
    json = JSON.parse(json);
    switch (types) {
      case "Object":
        return !Array.isArray(json);
      case "Array":
        return Array.isArray(json);
      default:
        return false;
    }
  } catch {
    return false;
  }
}

export function getAll({ Stype, json }) {
  try {
    json = JSON.parse(json);
    switch (Stype) {
      case "keys":
        return JSON.stringify(Object.keys(json).map((key) => key ?? ""));
      case "values":
        return JSON.stringify(
          Object.keys(json).map((key) => json[key] ?? ""),
        );
      case "datas":
        return JSON.stringify(
          Object.keys(json).map((key) => [key, json[key] ?? ""]),
        );
      default:
        return "";
    }
  } catch {
    return "";
  }
}

// Published as the "new" block; `new` is not a legal function name.
export function createJSON({ json }) {
  switch (json) {
    case "Object":
      return "{}";
    case "Array":
      return "[]";
    default:
      return "";
  }
}
