// Helpers that used to be private methods on the extension class. They are
// exported here so `methods` can publish them on the generated class; handlers
// call them as `this._name(...)`.

export function _hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function _isValid(json) {
  if (typeof json != "string") {
    return false;
  }
  json = json.trim();
  if (
    (json.slice(0, 1) != "[" || json.slice(-1) != "]") &&
    (json.slice(0, 1) != "{" || json.slice(-1) != "}")
  ) {
    return false;
  }
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

// Return an object if it is JSON, otherwise the string as-is.
export function _validReturn(json) {
  if (typeof json != "string") {
    return json;
  }
  if (
    (json.slice(0, 1) != "[" || json.slice(-1) != "]") &&
    (json.slice(0, 1) != "{" || json.slice(-1) != "}")
  ) {
    return json;
  }
  try {
    return JSON.parse(json) ?? "";
  } catch {
    return json;
  }
}

export function _fixValue(value) {
  // JSON does not support these values, so convert to string.
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  // null and undefined -> empty
  return value ?? "";
}

export function _lookupList(list, util) {
  const byId = util.target.lookupVariableById(list);
  if (byId && byId.type === "list") {
    return byId;
  }
  const byName = util.target.lookupVariableByNameAndType(list, "list");
  if (byName) {
    return byName;
  }
  return null;
}

// Dynamic items for the "get_list" menu, referenced by name from extend.yml.
export function getListMenu() {
  const vm = Scratch.vm;
  const globalLists = Object.values(
    vm.runtime.getTargetForStage().variables,
  ).filter((x) => x.type === "list");
  const localLists = vm.editingTarget
    ? Object.values(vm.editingTarget.variables).filter(
        (x) => x.type === "list",
      )
    : [];
  const uniqueLists = [...new Set([...globalLists, ...localLists])];
  if (uniqueLists.length === 0) {
    return [
      {
        text: Scratch.translate("select a list"),
        value: "select a list",
      },
    ];
  }
  return uniqueLists.map((i) => ({
    text: i.name,
    value: i.id,
  }));
}
