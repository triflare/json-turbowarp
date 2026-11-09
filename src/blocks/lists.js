export function vmGetList({ list }, util) {
  try {
    const listVariable = this._lookupList(list, util);
    if (listVariable) {
      return JSON.stringify(listVariable.value);
    }
  } catch {
    // ignore
  }
  return "";
}

export function vmSetList({ list, json }, util) {
  try {
    const listVariable = this._lookupList(list, util);
    if (listVariable) {
      const array = JSON.parse(json);
      if (Array.isArray(array)) {
        listVariable.value = array.map((i) => {
          if (typeof i === "object") return JSON.stringify(i);
          return i ?? "";
        });
      }
    }
  } catch {
    // ignore
  }
  return "";
}
